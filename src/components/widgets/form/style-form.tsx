import { Input } from '#ui/input'
import { Slider } from '#ui/slider'
import type { IStyleData } from '#widgets/types'
import { WIDGET_CONSTRAINTS } from '#widgets/constraints'
import type { ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'

interface StyleFormProps {
  styleData: IStyleData
  onStyleChange: (styleData: IStyleData) => void
}

export function StyleForm({ styleData, onStyleChange }: StyleFormProps) {
  const { t } = useTranslation()

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    onStyleChange({
      ...styleData,
      [name]: Number(value) || 0,
    })
  }

  const handleSliderChange = (name: string, value: number) => {
    onStyleChange({
      ...styleData,
      [name]: value,
    })
  }

  return (
    <ul>
      <li>
        <div className="form-label">
          <span>{t('form.marginTop')}</span>
        </div>
        <div className="flex items-center">
          <Input
            className="mr-2 w-32 shrink-0"
            name="marginTop"
            type="number"
            min={WIDGET_CONSTRAINTS.style.margin.min}
            max={WIDGET_CONSTRAINTS.style.margin.max}
            value={styleData.marginTop}
            onChange={handleInputChange}
          />
          <Slider
            value={[styleData.marginTop]}
            max={WIDGET_CONSTRAINTS.style.margin.max}
            step={1}
            onValueChange={val => handleSliderChange('marginTop', val[0])}
          />
        </div>
      </li>
      <li>
        <div className="form-label">
          <span>{t('form.marginBottom')}</span>
        </div>
        <div className="flex items-center">
          <Input
            className="mr-2 w-32 shrink-0"
            name="marginBottom"
            type="number"
            min={WIDGET_CONSTRAINTS.style.margin.min}
            max={WIDGET_CONSTRAINTS.style.margin.max}
            value={styleData.marginBottom}
            onChange={handleInputChange}
          />
          <Slider
            value={[styleData.marginBottom]}
            max={WIDGET_CONSTRAINTS.style.margin.max}
            step={1}
            onValueChange={val => handleSliderChange('marginBottom', val[0])}
          />
        </div>
      </li>
    </ul>
  )
}
