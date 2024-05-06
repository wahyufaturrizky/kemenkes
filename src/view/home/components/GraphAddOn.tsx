interface DataCard {
  title: string
  value: JSX.Element
  regional?: JSX.Element
  threshold?: JSX.Element
}

interface GraphAddOnProps {
  dataCard: DataCard[]
}

const GraphAddOn: React.FC<GraphAddOnProps> = ({
  dataCard
}) => {
  return (
    <div className='flex flex-wrap gap-4'>
      {dataCard.map((r) => (
        <div key={r.title} className='flex flex-col flex-1 gap-4 px-4 py-3 rounded-xl' style={{ boxShadow: '0px 2px 12px 0px #00000014' }}>
          <div>{r.title}</div>
          <div className='font-bold text-4xl text-primary-3'>
            {r.value}
          </div>
          <div>
            {r.regional}
            {r.threshold}
          </div>
        </div>
      ))}
    </div>
  )
}

export default GraphAddOn
