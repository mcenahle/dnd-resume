import { Button } from '@/components/ui/button.tsx'
import { BasicInfo } from '@/components/widgets/node/basic-info.tsx'
import { ExperienceTime } from '@/components/widgets/node/experience-time.tsx'
import { ImageSection } from '@/components/widgets/node/image-section.tsx'
import { TextContent } from '@/components/widgets/node/text-content.tsx'
import { TitleSection } from '@/components/widgets/node/title-section.tsx'
import type { WidgetNode } from '@/components/widgets/widgets-type.d.ts'
import { generateWidgetId } from '@/components/widgets/widgets-util.tsx'
import { useWidgetsStore } from '@/store/widgets-store.ts'
import { Copy, Trash } from 'lucide-react'
import type { MouseEvent } from 'react'
import { memo } from 'react'

function DraggableNode({ item, isSelected }: { item: WidgetNode; isSelected: boolean }) {
  /**
   * click to copy widget
   */
  const addWidget = useWidgetsStore(state => state.addWidget)
  const handleClickCopy = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    const newItem = JSON.parse(JSON.stringify(item))
    newItem.id = generateWidgetId()
    addWidget(newItem)
  }

  /**
   * click to remove widget
   */
  const removeWidget = useWidgetsStore(state => state.removeWidget)
  const handleClickRemove = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    removeWidget(item.id)
  }

  const WidgetRenderComponent = () => {
    switch (item.type) {
      case 'BasicInfo':
        return <BasicInfo data={item.data.propsData} />
      case 'TitleSection':
        return <TitleSection data={item.data.propsData} />
      case 'ExperienceTime':
        return <ExperienceTime data={item.data.propsData} />
      case 'TextContent':
        return <TextContent data={item.data.propsData} />
      case 'ImageSection':
        return <ImageSection data={item.data.propsData} />
    }
  }

  const OperationButtons = () =>
    isSelected ? (
      <div className="absolute top-1 right-1 flex items-center gap-2 transition-opacity">
        <Button
          variant="outline"
          size="icon"
          className="h-7 w-7"
          onMouseDown={handleClickCopy}
        >
          <Copy />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-7 w-7"
          onMouseDown={handleClickRemove}
        >
          <Trash />
        </Button>
      </div>
    ) : null

  return (
    <div style={item.data.styleData}>
      <WidgetRenderComponent />
      <OperationButtons />
    </div>
  )
}

const Memorized = memo(DraggableNode)

export { Memorized as DraggableNode }
