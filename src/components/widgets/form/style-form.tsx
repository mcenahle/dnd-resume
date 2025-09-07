import { useTranslation } from 'react-i18next'

import { Input } from '#ui/input'
import { Slider } from '#ui/slider'
import type { IStyleData } from '#widgets/types'
import { WIDGET_CONSTRAINTS } from '#widgets/constraints'

interface StyleFormProps {
  styleData: IStyleData
  onChange: (styleData: IStyleData) => void
}

export function StyleForm({ styleData, onChange }: StyleFormProps) {
  const { t } = useTranslation()

  function handleChange<K extends keyof IStyleData>(name: K, value: IStyleData[K]) {
    onChange({
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
            type="number"
            min={WIDGET_CONSTRAINTS.style.margin.min}
            max={WIDGET_CONSTRAINTS.style.margin.max}
            value={styleData.marginTop}
            onChange={e => handleChange('marginTop', Number(e.target.value))}
          />
          <Slider
            min={WIDGET_CONSTRAINTS.style.margin.min}
            max={WIDGET_CONSTRAINTS.style.margin.max}
            value={[styleData.marginTop]}
            onValueChange={value => handleChange('marginTop', value[0])}
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
            type="number"
            min={WIDGET_CONSTRAINTS.style.margin.min}
            max={WIDGET_CONSTRAINTS.style.margin.max}
            value={styleData.marginBottom}
            onChange={e => handleChange('marginBottom', Number(e.target.value))}
          />
          <Slider
            min={WIDGET_CONSTRAINTS.style.margin.min}
            max={WIDGET_CONSTRAINTS.style.margin.max}
            value={[styleData.marginBottom]}
            onValueChange={value => handleChange('marginBottom', value[0])}
          />
        </div>
      </li>
    </ul>
  )
}
