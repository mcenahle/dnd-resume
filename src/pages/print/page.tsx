import { BasicInfo } from '@/components/widgets/node/basic-info.tsx'
import { ExperienceTime } from '@/components/widgets/node/experience-time.tsx'
import { ImageSection } from '@/components/widgets/node/image-section.tsx'
import { TextContent } from '@/components/widgets/node/text-content.tsx'
import { TitleSection } from '@/components/widgets/node/title-section.tsx'
import type { WidgetNode } from '@/components/widgets/widgets-type.d.ts'
import { getBasename } from '@/components/widgets/widgets-util.tsx'
import { NAME_SHOULD_PRINT } from '@/consts/storage.ts'
import { useWidgetsStore } from '@/store/widgets-store.ts'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'

const PagePrint = () => {
  const widgets = useWidgetsStore(state => state.widgets)

  /**
   * Print the page when the `PRINT` session storage is set.
   */
  const navigate = useNavigate()
  useEffect(() => {
    if (sessionStorage.getItem(NAME_SHOULD_PRINT)) {
      sessionStorage.removeItem(NAME_SHOULD_PRINT)
      setTimeout(() => {
        // print filename
        const originalTitle = document.title
        document.title = getBasename(widgets) || originalTitle

        window.addEventListener(
          'afterprint',
          () => {
            document.title = originalTitle
            navigate(-1)
          },
          { once: true },
        )
        window.print()
      }, 100)
    }
  }, [navigate, widgets])

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
    <div className="mx-auto w-[900px]">
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
  )
}

export { PagePrint }
