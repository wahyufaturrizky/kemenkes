'use client'

import { Tab } from "@/components"
import { TabProps } from "./Tab"
import { useState } from "react"

interface TabsProps {
  data: TabProps[]
  variant?: 'public' | 'private'
  value?: any
  filterState?: any
}

const Tabs: React.FC<TabsProps> = ({
  data, variant = 'public', value, filterState
}) => {
  const [filter, setFilter] = filterState || useState({})

  if (variant === 'private')
    return (
      <div className="flex gap-4 py-8">
        {data.map((r: TabProps, i) => (
          <Tab key={i} {...r} active={value === r?.value} variant='sm' handleClick={() => {
            setFilter({ ...filter, kewilayahan_type: r?.value })
          }} />
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