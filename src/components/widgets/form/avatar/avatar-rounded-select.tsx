import clsx from 'clsx'

interface AvatarRoundedSelectProps {
  url: string
  rounded: boolean
  onChange: (rounded: boolean) => void
}

export function AvatarRoundedSelect({ url, rounded, onChange }: AvatarRoundedSelectProps) {
  const activeCls = 'z-20 shadow-[0_0_12px_2px_rgba(219,99,39,0.8)]'
  return (
    <div className="flex gap-2 2xl:gap-3">
      <button onClick={() => onChange(true)}>
        <img
          src={url}
          alt="avatar"
          className={clsx('h-8 w-8 rounded-full', rounded && activeCls)}
        />
      </button>
      <button onClick={() => onChange(false)}>
        <img
          src={url}
          alt="avatar"
          className={clsx('h-8 w-8', !rounded && activeCls)}
        />
      </button>
    </div>
  )
}
