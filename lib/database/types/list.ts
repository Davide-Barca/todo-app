import { DB } from "../db";

export type ListDTO = {
  id: string;
  userId: string;
  title: string;
  createdAt: string;
  updatedAt: string;
};

export type TaskDTO = {
  id: string;
  listId: string;
  userId: string;
  title: string;
  description: string | null;
  isDone: number; // 0/1
  createdAt: string;
  updatedAt: string;
};

export type ListDataDTO = {
  list: DB["list"];
  tasks: DB["task"][];
};
