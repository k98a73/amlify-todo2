import {
  Center,
  Flex,
  Heading,
  StackDivider,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import TodoItem from "./TodoItem";

const TodoList: React.VFC = () => {
  const TodoList = [
    { id: "aaa", content: "aaa", idDone: true },
    { id: "bbb", content: "bbb", idDone: false },
    { id: "ccc", content: "ccc", idDone: true },
    { id: "ddd", content: "ddd", idDone: false },
    { id: "eee", content: "eee", idDone: true },
    { id: "fff", content: "fff", idDone: false },
    { id: "ggg", content: "ggg", idDone: true },
    { id: "hhh", content: "hhh", idDone: false },
    { id: "iii", content: "iii", idDone: true },
    { id: "jjj", content: "jjj", idDone: false },
  ];

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
                id={item.id}
                content={item.content}
                isDone={item.idDone}
              />
            );
          })
        )}
      </VStack>
    </Flex>
  );
};

export default TodoList;
