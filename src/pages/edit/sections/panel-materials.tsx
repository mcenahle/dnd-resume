import { Button } from '@/components/ui/button.tsx'
import type { WidgetType } from '@/components/widgets/widgets-type.d.ts'
import { createWidgetsNode, useWidgetMaterialList } from '@/components/widgets/widgets-util.tsx'
import { useWidgetsStore } from '@/store/widgets-store.ts'
import { Plus } from 'lucide-react'

const PanelMaterials = () => {
  const widgetMaterialList = useWidgetMaterialList()
  // click to add widget
  const addWidget = useWidgetsStore(state => state.addWidget)
  const handleClick = (type: WidgetType) => {
    const newWidget = createWidgetsNode(type)
    addWidget(newWidget)
  }

  return (
    <ul className="flex w-full flex-col p-4">
      {widgetMaterialList.map(item => (
        <li
          className="mb-3 grow"
          key={item.type}
        >
          <Button
            variant="outline"
            onClick={() => handleClick(item.type)}
            className="w-full justify-between has-[>svg]:px-4"
          >
            <span className="flex-center">
              {item.icon}
              <span className="ml-2">{item.title}</span>
            </span>
            <Plus style={{ width: 13, height: 13 }} />
          </Button>
        </li>
      ))}
    </ul>
  )
}

export { PanelMaterials }
