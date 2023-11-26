export const dragableTypes = {
  TASK: "task",
  CATEGORY: "category",
} as const;

export type DragableType = (typeof dragableTypes)[keyof typeof dragableTypes];
