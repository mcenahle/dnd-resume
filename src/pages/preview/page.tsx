import { BasicInfo } from '@/components/widgets/node/basic-info.tsx'
import { ExperienceTime } from '@/components/widgets/node/experience-time.tsx'
import { ImageSection } from '@/components/widgets/node/image-section.tsx'
import { TextContent } from '@/components/widgets/node/text-content.tsx'
import { TitleSection } from '@/components/widgets/node/title-section.tsx'
import { widgetsSchema } from '@/components/widgets/widgets-schema.ts'
import type { WidgetNode } from '@/components/widgets/widgets-type.d.ts'
import { t } from '@/i18n/index.ts'
import { decodeFromBase64Url } from '@/lib/utils.ts'
import { useWidgetsStore } from '@/store/widgets-store.ts'
import { useSearchParams } from 'react-router'
import { toast } from 'sonner'

const PagePreview = () => {
  let widgets = useWidgetsStore(state => state.widgets)
  /**
   * Get widgets data from the URL query string.
   */
  const [searchParams] = useSearchParams()
  const data = searchParams.get('data')
  if (data) {
    try {
      const json = decodeFromBase64Url(data)
      const ret = widgetsSchema.safeParse(JSON.parse(json))
      if (ret.success) {
        widgets = ret.data
      } else {
        widgets = []
        console.error(ret.error)
        setTimeout(() => {
          toast.error(t('message.parameterError'))
        }, 100)
      }
    } catch (error) {
      widgets = []
      console.error(error)
      setTimeout(() => {
        toast.error(t('message.parameterError'))
      }, 100)
    }
  }

  const WidgetRenderComponent = (item: WidgetNode) => {
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

  return (
    <div className="bg-zinc-50 lg:min-h-[100vh] lg:py-8">
      <div className="mx-auto shadow-2xl lg:w-[900px] print:w-[900px]">
        <ul className="print-wrapper">
          {widgets.map(item => (
            <li
              key={item.id}
              className="flow-root"
            >
              <div style={item.data.styleData}>{WidgetRenderComponent(item)}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export { PagePreview }
