import { Input } from '@/components/ui/input.tsx'
import type { ExperienceTimeData } from '@/components/widgets/widgets-type.d.ts'
import type { ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'

const ExperienceTimeForm = ({
  data,
  onChange,
}: {
  data: ExperienceTimeData
  onChange: (value: ExperienceTimeData) => void
}) => {
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

export { ExperienceTimeForm }
