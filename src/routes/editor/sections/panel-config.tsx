import { produce } from 'immer'
import { useTranslation } from 'react-i18next'
import invariant from 'tiny-invariant'

import { LayoutFill } from '@/components/common/svg-icons'
import { BasicInfoForm } from '#widgets/form/basic-info-form'
import { ExperienceTimeForm } from '#widgets/form/experience-time-form'
import { ImageSectionForm } from '#widgets/form/image-section-form'
import { StyleForm } from '#widgets/form/style-form'
import { TextContentForm } from '#widgets/form/text-content-form'
import { TitleSectionForm } from '#widgets/form/title-section-form'
import type { IStyleData } from '#widgets/types'
import { useWidgetMaterialList } from '#widgets/common'
import type { WidgetsState } from '@/store'
import { useWidgetsStore } from '@/store'

export function PanelConfig() {
  const { t } = useTranslation()
  const widgetMaterialList = useWidgetMaterialList()
  const widgets = useWidgetsStore(state => state.widgets)
  const setWidgets = useWidgetsStore(state => state.setWidgets)

  const activeWidget = useWidgetsStore((state: WidgetsState) => {
    const { widgets, activeId } = state
    return widgets.find(item => item.id === activeId) || null
  })
  if (!activeWidget) return null

  /**
   * widget form
   */
  const widgetMaterialInfo = widgetMaterialList.find(item => item.type === activeWidget.type)
  invariant(widgetMaterialInfo)
  const onDataChange = (data: any) => {
    const newWidgets = widgets.map(item => {
      if (item.id === activeWidget.id) {
        return { ...item, data }
      }
      return item
    })
    setWidgets(newWidgets)
  }
  const FormComponent = (() => {
    switch (activeWidget.type) {
      case 'BasicInfo':
        return (
          <BasicInfoForm
            data={activeWidget.data}
            onChange={onDataChange}
          />
        )
      case 'TitleSection':
        return (
          <TitleSectionForm
            data={activeWidget.data}
            onChange={onDataChange}
          />
        )
      case 'ExperienceTime':
        return (
          <ExperienceTimeForm
            data={activeWidget.data}
            onChange={onDataChange}
          />
        )
      case 'TextContent':
        return (
          <TextContentForm
            data={activeWidget.data}
            onChange={onDataChange}
          />
        )
      case 'ImageSection':
        return (
          <ImageSectionForm
            data={activeWidget.data}
            onChange={onDataChange}
          />
        )
    }
  })()

  /**
   * style form
   */
  const onStyleChange = (styleData: IStyleData) => {
    const nextState = produce(widgets, draft => {
      const widget = draft.find(item => item.id === activeWidget.id)
      invariant(widget)
      widget.data.styleData = styleData
    })
    setWidgets(nextState)
  }

  return (
    <div className="p-4">
      {/* specific widget form */}
      <div className="flex items-center text-xl">
        {widgetMaterialInfo.icon}
        <span className="ml-2 text-xl font-medium">{widgetMaterialInfo.title}</span>
      </div>
      {FormComponent}

      {/* common style form */}
      <div className="mt-4 flex items-center">
        <LayoutFill
          width={20}
          height={20}
        />
        <span className="ml-2 text-xl font-medium">{t('form.styleLayout')}</span>
      </div>
      <StyleForm
        styleData={activeWidget.data.styleData}
        onStyleChange={onStyleChange}
      />
    </div>
  )
}
