import { produce } from 'immer'
import { Upload } from 'lucide-react'
import type { ChangeEvent } from 'react'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import invariant from 'tiny-invariant'

import { Button } from '#ui/button'
import { Input } from '#ui/input'
import { Slider } from '#ui/slider'
import { AvatarRoundedSelect } from '#widgets/form/avatar/avatar-rounded-select'
import { ContactsForm } from '#widgets/form/contacts/contacts-form'
import type { IBasicInfoData, ILinkData } from '#widgets/types'
import { WIDGET_CONSTRAINTS } from '#widgets/constraints'

export function BasicInfoForm({
  data,
  onChange,
}: {
  data: IBasicInfoData
  onChange: (value: IBasicInfoData) => void
}) {
  const { t } = useTranslation()
  const { propsData } = data
  const { avatarUrl, avatarSize, avatarRound, name, jobTitle, linksGroup } = propsData

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
          avatarUrl: objectUrl,
        },
      })
      // revoke old object url to avoid memory leak
      if (propsData.avatarUrl.startsWith('blob:')) {
        URL.revokeObjectURL(propsData.avatarUrl)
      }
    }
  }

  const handleAvatarSizeChange = (value: string | number) => {
    onChange({
      ...data,
      propsData: {
        ...propsData,
        avatarSize: Number(value),
      },
    })
  }

  const handleAvatarRoundChange = (isRound: boolean) => {
    onChange({
      ...data,
      propsData: {
        ...propsData,
        avatarRound: isRound,
      },
    })
  }

  const handleLinkGroupChange = (groupIndex: number, linkGroup: ILinkData[]) => {
    const nextState = produce(linksGroup, draft => {
      draft[groupIndex] = linkGroup
    })
    onChange({
      ...data,
      propsData: {
        ...propsData,
        linksGroup: nextState,
      },
    })
  }

  return (
    <div>
      {/* Avatar URL */}
      <div>
        <div className="form-label">
          <span>{t('form.avatarUrl')}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Input
              className="mr-1 w-32 2xl:mr-2"
              name="avatarUrl"
              value={avatarUrl}
              placeholder={t('form.enterAvatarUrl')}
              onChange={handleChange}
            />
            {/* upload local image */}
            <Button
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
          <AvatarRoundedSelect
            url={avatarUrl}
            rounded={avatarRound}
            onChange={handleAvatarRoundChange}
          />
        </div>
      </div>
      {/* Avatar Size */}
      <div>
        <div className="form-label">
          <span>{t('form.avatarSize')}</span>
        </div>
        <div className="flex items-center">
          <Input
            className="mr-1 w-32 shrink-0 2xl:mr-2"
            name="avatarSize"
            type="number"
            min={WIDGET_CONSTRAINTS.basicInfo.avatar.size.min}
            max={WIDGET_CONSTRAINTS.basicInfo.avatar.size.max}
            value={avatarSize}
            onChange={e => handleAvatarSizeChange(e.target.value)}
          />
          <Slider
            value={[avatarSize]}
            min={WIDGET_CONSTRAINTS.basicInfo.avatar.size.min}
            max={WIDGET_CONSTRAINTS.basicInfo.avatar.size.max}
            step={1}
            onValueChange={val => handleAvatarSizeChange(val[0])}
          />
        </div>
      </div>
      {/* Name */}
      <div>
        <div className="form-label">
          <span>{t('form.name')}</span>
        </div>
        <Input
          name="name"
          value={name}
          placeholder={t('form.enterName')}
          onChange={handleChange}
        />
      </div>
      {/* Position */}
      <div>
        <div className="form-label">
          <span>{t('form.position')}</span>
        </div>
        <Input
          name="jobTitle"
          value={jobTitle}
          placeholder={t('form.enterPosition')}
          onChange={handleChange}
        />
      </div>
      {/* Contact Information */}
      <div>
        <div className="form-label">
          <span>{t('form.contactInfo1')}</span>
        </div>
        <ContactsForm
          data={linksGroup[0]}
          onChange={data => handleLinkGroupChange(0, data)}
        />
        <div className="form-label">
          <span>{t('form.contactInfo2')}</span>
        </div>
        <ContactsForm
          data={linksGroup[1]}
          onChange={data => handleLinkGroupChange(1, data)}
        />
        <div className="form-label">
          <span>{t('form.contactInfo3')}</span>
        </div>
        <ContactsForm
          data={linksGroup[2]}
          onChange={data => handleLinkGroupChange(2, data)}
        />
      </div>
    </div>
  )
}
