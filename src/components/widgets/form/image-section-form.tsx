import { Button } from '#ui/button'
import { Input } from '#ui/input'
import { Slider } from '#ui/slider'
import type { IImageSectionData } from '#widgets/types'
import { WIDGET_CONSTRAINTS } from '#widgets/constraints'
import { Upload } from 'lucide-react'
import { useRef, type ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'
import invariant from 'tiny-invariant'

type PropsData = IImageSectionData['propsData']

export function ImageSectionForm({
  propsData,
  onChange,
}: {
  propsData: PropsData
  onChange: (value: PropsData) => void
}) {
  const { t } = useTranslation()
  const { url, imageSize, borderRadius } = propsData

  function handleChange<K extends keyof PropsData>(name: K, value: PropsData[K]) {
    onChange({
      ...propsData,
      [name]: value,
    })
  }

  // upload local image
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const handleClickUpload = () => {
    invariant(fileInputRef.current)
    fileInputRef.current.click()
  }
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const objectUrl = URL.createObjectURL(file)
      handleChange('url', objectUrl)
      // revoke old object url to avoid memory leak
      if (propsData.url.startsWith('blob:')) {
        URL.revokeObjectURL(propsData.url)
      }
    }
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
            value={url}
            placeholder={t('form.enterImageUrl')}
            onChange={e => handleChange('url', e.target.value)}
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
            type="number"
            min={WIDGET_CONSTRAINTS.imageSection.sizePercent.min}
            max={WIDGET_CONSTRAINTS.imageSection.sizePercent.max}
            value={imageSize}
            onChange={e => handleChange('imageSize', Number(e.target.value))}
          />
          <Slider
            min={WIDGET_CONSTRAINTS.imageSection.sizePercent.min}
            max={WIDGET_CONSTRAINTS.imageSection.sizePercent.max}
            value={[imageSize]}
            onValueChange={val => handleChange('imageSize', val[0])}
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
            min={WIDGET_CONSTRAINTS.imageSection.borderRadius.min}
            max={WIDGET_CONSTRAINTS.imageSection.borderRadius.max}
            value={borderRadius}
            onChange={e => handleChange('borderRadius', Number(e.target.value))}
          />
          <Slider
            min={WIDGET_CONSTRAINTS.imageSection.borderRadius.min}
            max={WIDGET_CONSTRAINTS.imageSection.borderRadius.max}
            value={[borderRadius]}
            onValueChange={val => handleChange('borderRadius', val[0])}
          />
        </div>
      </div>
    </div>
  )
}
