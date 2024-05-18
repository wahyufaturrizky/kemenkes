import { openSans } from "@/assets/fonts"
import { Spin } from "@/components"

interface DataCard {
  title: string
  value: JSX.Element
  regional?: JSX.Element
  threshold?: JSX.Element
  isLoading?: boolean
}

interface GraphAddOnProps {
  dataCard: DataCard[]
}

const GraphAddOn: React.FC<GraphAddOnProps> = ({
  dataCard
}) => {
  return (
    <div className={`flex gap-4 ${openSans.className}`}>
      {dataCard.map((r) => (
        <div className="relative flex flex-1 justify-center items-center">
          {r?.isLoading && <Spin />}
          <div key={r.title} className='flex flex-col flex-1 gap-4 px-4 py-3 rounded-xl w-full h-full' style={{ boxShadow: '0px 2px 12px 0px #00000014' }}>
            <div>{r.title}</div>
            <div className='font-bold text-4xl text-primary-3'>
              {r.value}
            </div>
            <div>
              {r.regional}
              {r.threshold}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default GraphAddOn
