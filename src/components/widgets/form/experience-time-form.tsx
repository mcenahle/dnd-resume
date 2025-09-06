import { Input } from '#ui/input'
import type { IExperienceTimeData } from '#widgets/types'
import type { ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'

export function ExperienceTimeForm({
  data,
  onChange,
}: {
  data: IExperienceTimeData
  onChange: (value: IExperienceTimeData) => void
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
      <div>
        <div className="form-label">
          <span>{t('form.experienceContent')}</span>
        </div>
        <Input
          name="title"
          value={propsData.title}
          placeholder={t('form.enterExperience')}
          onChange={handleChange}
        />
      </div>

      <div>
        <div className="form-label">
          <span>{t('form.timeRange')}</span>
        </div>
        <Input
          name="dateRange"
          value={propsData.dateRange}
          placeholder={t('form.enterTimeRange')}
          onChange={handleChange}
        />
      </div>
    </div>
  )
}
