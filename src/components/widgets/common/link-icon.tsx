import { LogoGithub, LogoGmail, LogoJuejin } from '@/components/common/svg-icons'
import { Cake, Link, Mail, MapPin, Phone } from 'lucide-react'

export function LinkIconComponent(icon: string) {
  const props = { width: '1em', height: '1em' }
  switch (icon) {
    case 'link':
      return <Link {...props} />
    case 'location':
      return <MapPin {...props} />
    case 'cake':
      return <Cake {...props} />
    case 'phone':
      return <Phone {...props} />
    case 'github':
      return <LogoGithub {...props} />
    case 'juejin':
      return <LogoJuejin {...props} />
    case 'mail':
      return <Mail {...props} />
    case 'gmail':
      return <LogoGmail {...props} />
    default:
      return <Link {...props} />
  }
}
