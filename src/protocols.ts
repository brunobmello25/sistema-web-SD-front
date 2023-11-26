import { type DragableType } from "./constants/dragable-types";

export interface User {
  id: number;
  username: string;
}

export interface Task {
  id: number;
  title: string;
  done: boolean;
  position: number;
}

export interface Category {
  id: number;
  name: string;
  position: number;
  tasks: Task[];
}

export interface DragableItem {
  id: number;
  type: DragableType;
}

export interface DropPosition {
  x: number;
  y: number;
}
