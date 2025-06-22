import { Button } from '@/components/ui/button.tsx'
import { Input } from '@/components/ui/input.tsx'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover.tsx'
import { Link } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface LinkInputProps {
  value: string
  onChange: (value: string) => void
  className?: string
}

const LinkInput = ({ value, onChange, className }: LinkInputProps) => {
  const { t } = useTranslation()
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className={className}
          variant="outline"
          size="icon"
        >
          <Link />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-52"
        align="end"
      >
        <div className="flex flex-wrap justify-between">
          <Input
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder={t('form.enterLink')}
          />
        </div>
      </PopoverContent>
    </Popover>
  )
}

export { LinkInput }
