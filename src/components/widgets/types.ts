import type { JSX } from 'react'

export type WidgetType =
  | 'BasicInfo'
  | 'TitleSection'
  | 'ExperienceTime'
  | 'TextContent'
  | 'ImageSection'

export interface IWidgetMaterial {
  type: WidgetType
  icon: JSX.Element
  title: string
}

export type IWidgetNode =
  | {
      type: 'BasicInfo'
      id: string
      data: IBasicInfoData
    }
  | {
      type: 'TitleSection'
      id: string
      data: ITitleSectionData
    }
  | {
      type: 'ExperienceTime'
      id: string
      data: IExperienceTimeData
    }
  | {
      type: 'TextContent'
      id: string
      data: ITextContentData
    }
  | {
      type: 'ImageSection'
      id: string
      data: IImageSectionData
    }

export interface IStyleData {
  marginTop: number
  marginBottom: number
}

export interface IBasicInfoData {
  styleData: IStyleData
  propsData: {
    avatarUrl: string
    avatarSize: number
    avatarRound: boolean
    name: string
    jobTitle: string
    linksGroup: [ILinkGroupData, ILinkGroupData, ILinkGroupData]
  }
}
export type ILinkGroupData = ILinkData[]
export interface ILinkData {
  href: string
  content: string
  icon: LinkIconNames
}

export interface ITitleSectionData {
  styleData: IStyleData
  propsData: {
    title: string
  }
}

export interface IExperienceTimeData {
  styleData: IStyleData
  propsData: {
    title: string
    dateRange: string
  }
}

export interface ITextContentData {
  styleData: IStyleData
  propsData: {
    content: string
  }
}

export interface IImageSectionData {
  styleData: IStyleData
  propsData: {
    url: string
    imageSize: number
    borderRadius: number
  }
}

export const linkIconNames = [
  'link',
  'location',
  'cake',
  'phone',
  'github',
  'juejin',
  'mail',
  'gmail',
] as const
export type LinkIconNames = (typeof linkIconNames)[number]
