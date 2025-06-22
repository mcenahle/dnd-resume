import { Input } from '@/components/ui/input.tsx'
import type { TitleSectionData } from '@/components/widgets/widgets-type.d.ts'
import type { ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'

const TitleSectionForm = ({
  data,
  onChange,
}: {
  data: TitleSectionData
  onChange: (value: TitleSectionData) => void
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

export { TitleSectionForm }
