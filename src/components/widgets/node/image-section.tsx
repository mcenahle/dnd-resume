import { WIDGET_CONSTRAINTS } from '#widgets/constraints'
import type { IImageSectionData } from '#widgets/types'

interface ImageSectionProps {
  data: IImageSectionData['propsData']
}

export function ImageSection({ data }: ImageSectionProps) {
  const { url, imageSize, borderRadius } = data

  let sizeCls = `${imageSize}%`
  // range limit
  if (imageSize < WIDGET_CONSTRAINTS.imageSection.sizePercent.min) {
    sizeCls = `${WIDGET_CONSTRAINTS.imageSection.sizePercent.min}%`
  } else if (imageSize > WIDGET_CONSTRAINTS.imageSection.sizePercent.max) {
    sizeCls = `${WIDGET_CONSTRAINTS.imageSection.sizePercent.max}%`
  }

  return (
    <div className="flex-center drop-shadow-lg">
      <img
        style={{ width: sizeCls, borderRadius }}
        src={url}
        alt="image"
        draggable="false"
      />
    </div>
  )
}
