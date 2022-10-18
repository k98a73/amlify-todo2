import {
  Center,
  Flex,
  Heading,
  StackDivider,
  Text,
  VStack,
} from "@chakra-ui/react";
import { DataStore } from "aws-amplify";
import React, { useEffect } from "react";
import { Todo } from "../../models";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import {
  deleteTodoRealtime,
  fetchTodoAsync,
  fetchTodoRealtime,
  selectTodoList,
  updateTodoRealtime,
} from "../../stores/slices/todo/todoSlice";
import TodoItem from "./TodoItem";

const TodoList: React.VFC = () => {
  const TodoList = useAppSelector(selectTodoList);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // todo一覧の取得
    const fetchTodoList = async () => {
      await dispatch(fetchTodoAsync());
    };
    fetchTodoList();
  }, [dispatch]);

  useEffect(() => {
    // todoテーブルの変更をリアルタイムに検知する
    const subscription = DataStore.observe(Todo).subscribe((msg) => {
      switch (msg.opType) {
        case "INSERT":
          dispatch(fetchTodoRealtime(msg.element));
          break;
        case "UPDATE":
          dispatch(updateTodoRealtime(msg.element));
          break;
        case "DELETE":
          dispatch(deleteTodoRealtime(msg.element));
          break;
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [dispatch]);

  return (
    <Flex flexDir="column" align="center">
      <Center mb={8}>
        <Heading>Todo List</Heading>
      </Center>
      <VStack
        divider={<StackDivider borderColor="gray.200" />}
        align="stretch"
        w={{ base: "90vw", sm: "80vw", md: "70vw", lg: "60vw" }}
        border="2px"
        borderColor="gray.200"
        borderRadius="md"
        p={4}
        maxH="65vh"
        overflow="scroll"
      >
        {TodoList.length === 0 ? (
          <Text align="center" fontWeight="bold" fontSize="lg">
            No Todo
          </Text>
        ) : (
          TodoList.map((item) => {
            return (
              <TodoItem
                key={item.id}
                id={item.id}
                content={item.content}
                isDone={item.isDone}
              />
            );
          })
        )}
      </VStack>
    </Flex>
  );
};

export default TodoList;
