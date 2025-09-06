import type { IExperienceTimeData } from '#widgets/types'

interface ExperienceTimeProps {
  data: IExperienceTimeData['propsData']
}

export function ExperienceTime({ data }: ExperienceTimeProps) {
  const { title, dateRange } = data

  return (
    <div className="flex flex-wrap items-center justify-between py-1">
      <div className="text-[18px] font-medium">{title}</div>
      <div className="font-mono text-sm text-zinc-600">{dateRange}</div>
    </div>
  )
}
