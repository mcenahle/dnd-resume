import type { ImageSectionData } from '@/components/widgets/widgets-type.d.ts'
import { MAX_IMAGE_SIZE, MIN_IMAGE_SIZE } from '@/consts/dom.ts'

interface ImageSectionProps {
  data: ImageSectionData['propsData']
}

const ImageSection = ({ data }: ImageSectionProps) => {
  const { url, imageSize, borderRadius } = data

  let sizeCls = `${imageSize}%`
  // range limit
  if (imageSize < MIN_IMAGE_SIZE) {
    sizeCls = `${MIN_IMAGE_SIZE}%`
  } else if (imageSize > MAX_IMAGE_SIZE) {
    sizeCls = `${MAX_IMAGE_SIZE}%`
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

export { ImageSection }
