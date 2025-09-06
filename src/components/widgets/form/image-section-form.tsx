import { Button } from '#ui/button'
import { Input } from '#ui/input'
import { Slider } from '#ui/slider'
import type { IImageSectionData } from '#widgets/types'
import { WIDGET_CONSTRAINTS } from '#widgets/constraints'
import { Upload } from 'lucide-react'
import { useRef, type ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'
import invariant from 'tiny-invariant'

export function ImageSectionForm({
  data,
  onChange,
}: {
  data: IImageSectionData
  onChange: (value: IImageSectionData) => void
}) {
  const { t } = useTranslation()
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
      // revoke old object url to avoid memory leak
      if (propsData.url.startsWith('blob:')) {
        URL.revokeObjectURL(propsData.url)
      }
    }
  }

  const handleNumberChange = (
    name: keyof IImageSectionData['propsData'],
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
            min={WIDGET_CONSTRAINTS.imageSection.sizePercent.min}
            max={WIDGET_CONSTRAINTS.imageSection.sizePercent.max}
            value={imageSize}
            onChange={e => handleNumberChange('imageSize', e.target.value)}
          />
          <Slider
            value={[imageSize]}
            min={WIDGET_CONSTRAINTS.imageSection.sizePercent.min}
            max={WIDGET_CONSTRAINTS.imageSection.sizePercent.max}
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
            min={WIDGET_CONSTRAINTS.imageSection.borderRadius.min}
            max={WIDGET_CONSTRAINTS.imageSection.borderRadius.max}
            onChange={e => handleNumberChange('borderRadius', e.target.value)}
          />
          <Slider
            value={[borderRadius]}
            min={WIDGET_CONSTRAINTS.imageSection.borderRadius.min}
            max={WIDGET_CONSTRAINTS.imageSection.borderRadius.max}
            step={1}
            onValueChange={val => handleNumberChange('borderRadius', val[0])}
          />
        </div>
      </div>
    </div>
  )
}
