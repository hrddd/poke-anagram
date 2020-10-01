import React from "react";
import { useDrop, useDrag } from "react-dnd";
interface DragItem {
  index: number
  id: string
  type: string
}
export type Item = {
  index: number
  id: string
};
export const useSortableItem = ({
  type,
  id,
  index,
  handleDrop
}: {
  type: string
  id: string
  index: number
  handleDrop: ([before, after]: [Item, Item]) => void
}) => {
  const ref = React.useRef<HTMLButtonElement>(null)
  const [, connectDrop] = useDrop({
    accept: type,
    hover(dragItem: DragItem) {
      if (!ref.current) {
        return
      }
    },
    drop(dragItem: DragItem) {
      if (!ref.current || dragItem.index === index) {
        return
      }
      handleDrop([{
        id: dragItem.id,
        index: dragItem.index
      }, {
        id, index
      }])
    }
  })
  const [{ isDragging }, connectDrag] = useDrag({
    item: { type, id, index },
    collect: (monitor) => {
      return {
        isDragging: monitor.isDragging()
      }
    }
  })
  connectDrag(connectDrop(ref))

  return [{
    isDragging,
  }, ref] as const;
};