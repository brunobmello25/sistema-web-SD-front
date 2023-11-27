import { type DragableType } from "~/constants/dragable-types";
import { type DragableItem, type DropPosition } from "~/protocols";

export function findDragableIdToBeAfter(
  dragableItems: DragableItem[],
  dropPosition: DropPosition,
  dragableType: DragableType,
): number | null {
  let nearestId = null;
  let minDistance = Infinity;

  dragableItems.forEach((dragable) => {
    const element = document.getElementById(`${dragableType}-${dragable.id}`);
    console.log(`searching for ${dragableType}-${dragable.id}`);

    if (element) {
      const rect = element.getBoundingClientRect();
      const { distance, isBelow } = calculateDistanceToEdge(rect, dropPosition);
      if (distance < minDistance && isBelow) {
        minDistance = distance;
        nearestId = dragable.id;
      }
    }
  });

  return nearestId;
}

function calculateDistanceToEdge(
  rect: DOMRect,
  dropPosition: { x: number; y: number },
): { distance: number; isBelow: boolean } {
  const centerY = rect.top + rect.height / 2;
  const isBelow = dropPosition.y > centerY; // Check if the drop is below the midpoint

  const nearestEdge = isBelow ? rect.bottom : rect.top;
  const distance = Math.abs(nearestEdge - dropPosition.y);

  return { distance, isBelow };
}
