import { Button } from '@/components/ui/button.tsx'
import { Input } from '@/components/ui/input.tsx'
import { Slider } from '@/components/ui/slider.tsx'
import type { ImageSectionData } from '@/components/widgets/widgets-type.d.ts'
import { MAX_IMAGE_BR, MAX_IMAGE_SIZE, MIN_IMAGE_BR, MIN_IMAGE_SIZE } from '@/consts/dom.ts'
import { useT } from '@/i18n/index.ts'
import { Upload } from 'lucide-react'
import { useRef, type ChangeEvent } from 'react'
import invariant from 'tiny-invariant'

const ImageSectionForm = ({
  data,
  onChange,
}: {
  data: ImageSectionData
  onChange: (value: ImageSectionData) => void
}) => {
  const { t } = useT()
  const { propsData } = data
  const { url, imageSize, borderRadius } = propsData

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    onChange({
      ...data,
      propsData: {
        ...propsData,
        [name]: value,
      },
    })
  }

  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const handleClickUpload = () => {
    invariant(fileInputRef.current)
    fileInputRef.current.click()
  }
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const objectUrl = URL.createObjectURL(file)
      onChange({
        ...data,
        propsData: {
          ...propsData,
          url: objectUrl,
        },
      })
    }
  }

  const handleNumberChange = (
    name: keyof ImageSectionData['propsData'],
    value: string | number,
  ) => {
    onChange({
      ...data,
      propsData: {
        ...propsData,
        [name]: Number(value),
      },
    })
  }

  return (
    <div>
      {/* Image URL */}
      <div>
        <div className="form-label">
          <span>{t('form.imageUrl')}</span>
        </div>
        <div className="flex items-center gap-2">
          <Input
            name="url"
            value={url}
            placeholder={t('form.enterImageUrl')}
            onChange={handleChange}
          />
          {/* upload local image */}
          <Button
            className="shrink-0"
            variant="outline"
            size="icon"
            onClick={handleClickUpload}
          >
            <Upload />
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
      </div>
      {/* Image Size */}
      <div>
        <div className="form-label">
          <span>{t('form.imageSize')}</span>
        </div>
        <div className="flex items-center">
          <Input
            className="mr-2 w-32 shrink-0"
            name="imageSize"
            type="number"
            min={MIN_IMAGE_SIZE}
            max={MAX_IMAGE_SIZE}
            value={imageSize}
            onChange={e => handleNumberChange('imageSize', e.target.value)}
          />
          <Slider
            value={[imageSize]}
            min={MIN_IMAGE_SIZE}
            max={MAX_IMAGE_SIZE}
            step={1}
            onValueChange={val => handleNumberChange('imageSize', val[0])}
          />
        </div>
      </div>
      {/* Border Radius */}
      <div>
        <div className="form-label">
          <span>{t('form.borderRadius')}</span>
        </div>
        <div className="flex items-center">
          <Input
            className="mr-2 w-32 shrink-0"
            type="number"
            name="borderRadius"
            value={borderRadius}
            min={MIN_IMAGE_BR}
            max={MAX_IMAGE_BR}
            onChange={e => handleNumberChange('borderRadius', e.target.value)}
          />
          <Slider
            value={[borderRadius]}
            min={MIN_IMAGE_BR}
            max={MAX_IMAGE_BR}
            step={1}
            onValueChange={val => handleNumberChange('borderRadius', val[0])}
          />
        </div>
      </div>
    </div>
  )
}

export { ImageSectionForm }
