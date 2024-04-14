import { Tab } from "@/components"
import { TabProps } from "./Tab"

interface TabsProps {
  data: TabProps[]
  variant?: 'public' | 'private'
}

const Tabs: React.FC<TabsProps> = ({
  data, variant = 'public'
}) => {
  if (variant === 'private')
    return (
      <div className="flex gap-4 py-8">
        {data.map((r: TabProps, i) => (
          <Tab key={i} {...r} variant='sm' />
        ))}
      </div>
    )
  return (
    <div className="flex justify-center gap-4 py-8">
      {data.map((r: TabProps, i) => (
        <Tab key={i} {...r} />
      ))}
    </div>
  )
}

export default Tabs