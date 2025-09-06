import type { TiptapRef } from '#tiptap/editor'
import { TiptapEditor } from '#tiptap/editor'
import { Button } from '#ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '#ui/dialog'
import type { ITextContentData } from '#widgets/types'
import { UserPen } from 'lucide-react'
import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

export function TextContentForm({
  data,
  onChange,
}: {
  data: ITextContentData
  onChange: (value: ITextContentData) => void
}) {
  const { t } = useTranslation()
  const { propsData } = data

  const [content, setContent] = useState('')
  const [open, setOpen] = useState<boolean>(false)
  const handleOpenChange = (open: boolean) => {
    if (open) {
      setOpen(true)
      setContent(propsData.content)
    } else {
      setOpen(false)
      setContent('')
    }
  }
  const editorRef: TiptapRef = useRef(null)
  const handleSave = () => {
    if (editorRef.current) {
      const content = editorRef.current.getHTML()
      onChange({
        ...data,
        propsData: {
          ...propsData,
          content,
        },
      })
    }
    handleOpenChange(false)
  }

  return (
    <div>
      {/* Text Content */}
      <div>
        <div className="form-label">
          <span>{t('form.textContent')}</span>
        </div>

        {/* Edit Rich Text */}
        <Dialog
          open={open}
          onOpenChange={handleOpenChange}
        >
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="w-full"
            >
              <UserPen />
              {t('form.editContent')}
            </Button>
          </DialogTrigger>

          <DialogContent
            className="sm:min-w-[600px] lg:min-w-[800px]"
            onEscapeKeyDown={e => e.preventDefault()}
          >
            <DialogHeader>
              <DialogTitle>{t('form.textContent')}</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>

            {/* Rich Text Editor */}
            <div className="h-[320px]">
              <TiptapEditor
                ref={editorRef}
                content={content}
              />
            </div>
            <DialogFooter>
              <Button onClick={handleSave}>{t('common.save')}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
