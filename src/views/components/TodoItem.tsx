import { Flex, Icon, Text } from "@chakra-ui/react";
import React from "react";
import {
  RiCheckboxBlankCircleLine,
  RiCheckboxCircleFill,
} from "react-icons/ri";
import { BsFillTrashFill } from "react-icons/bs";
import { deleteTodoApi, updateTodoApi } from "../../stores/slices/todo/todoAPI";

type Props = {
  id: string;
  content: string;
  isDone: boolean;
};

const TodoItem: React.VFC<Props> = ({ id, content, isDone }) => {
  const handleUpdate = async () => {
    try {
      const switchIsDone = !isDone;
      const data = { id, isDone: switchIsDone };
      await updateTodoApi(data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleDelete = async () => {
    try {
      const data = { id };
      await deleteTodoApi(data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Flex w="100%" align="center" justify="space-between">
      <Flex align="center">
        <Icon
          as={isDone ? RiCheckboxCircleFill : RiCheckboxBlankCircleLine}
          color="teal"
          cursor="pointer"
          h={6}
          mr={2}
          w={6}
          onClick={handleUpdate}
        />
        <Text fontSize="xl">{content}</Text>
      </Flex>
      <Icon
        as={BsFillTrashFill}
        color="pink"
        cursor="pointer"
        h={5}
        w={5}
        onClick={handleDelete}
      />
    </Flex>
  );
};

export default TodoItem;
