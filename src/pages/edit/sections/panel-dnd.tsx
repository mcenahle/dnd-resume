import { DraggableNodeWrapper } from '@/pages/edit/components/draggable-node-wrapper.tsx'
import { useWidgetsStore } from '@/store/widgets-store.ts'
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import type { DragEndEvent } from '@dnd-kit/core/dist/types'
import { restrictToParentElement, restrictToVerticalAxis } from '@dnd-kit/modifiers'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { useShallow } from 'zustand/react/shallow'

function PanelDnd() {
  const { widgets, setWidgets, setSelectedId } = useWidgetsStore(
    useShallow(state => ({
      widgets: state.widgets,
      setWidgets: state.setWidgets,
      setSelectedId: state.setSelectedId,
    })),
  )

  /**
   * dnd logic
   */
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 2,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over) return
    if (active.id !== over.id) {
      const oldIndex = widgets.findIndex(item => item.id === active.id)
      if (oldIndex === -1) return
      const newIndex = widgets.findIndex(item => item.id === over.id)
      if (newIndex === -1) return
      setWidgets(arrayMove(widgets, oldIndex, newIndex))
      setSelectedId(active.id as string)
    }
  }

  return (
    <ul className="print-wrapper relative basis-[900px] rounded-2xl border">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToParentElement, restrictToVerticalAxis]}
      >
        <SortableContext
          items={widgets}
          strategy={verticalListSortingStrategy}
        >
          {widgets.map(item => (
            <DraggableNodeWrapper
              key={item.id}
              item={item}
            />
          ))}
        </SortableContext>
      </DndContext>
    </ul>
  )
}

export { PanelDnd }
