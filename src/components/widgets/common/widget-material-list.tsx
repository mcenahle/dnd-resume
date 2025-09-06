import { CalendarRange, Heading, Image, Type, User } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import type { IWidgetMaterial } from '#widgets/types'

export function useWidgetMaterialList(): IWidgetMaterial[] {
  const { t } = useTranslation()
  return [
    {
      type: 'BasicInfo',
      icon: <User className="icon-size" />,
      title: t('widgets.basicInfo'),
    },
    {
      type: 'TitleSection',
      icon: <Heading className="icon-size" />,
      title: t('widgets.title'),
    },
    {
      type: 'ExperienceTime',
      icon: <CalendarRange className="icon-size" />,
      title: t('widgets.experience'),
    },
    {
      type: 'TextContent',
      icon: <Type className="icon-size" />,
      title: t('widgets.text'),
    },
    {
      type: 'ImageSection',
      icon: <Image className="icon-size" />,
      title: t('widgets.image'),
    },
  ]
}
