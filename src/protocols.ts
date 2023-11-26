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
  tasks: Task[];
}
