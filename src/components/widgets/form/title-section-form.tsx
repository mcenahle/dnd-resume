import type { ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'

import { Input } from '#ui/input'
import type { ITitleSectionData } from '#widgets/types'

export function TitleSectionForm({
  data,
  onChange,
}: {
  data: ITitleSectionData
  onChange: (value: ITitleSectionData) => void
}) {
  const { t } = useTranslation()
  const { propsData } = data

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

  return (
    <div>
      {/* Title */}
      <div>
        <div className="form-label">
          <span>{t('form.titleContent')}</span>
        </div>
        <Input
          name="title"
          value={propsData.title}
          placeholder={t('form.enterTitle')}
          onChange={handleChange}
        />
      </div>
    </div>
  )
}
