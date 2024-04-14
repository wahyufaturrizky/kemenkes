interface DataCard {
  title: string
  value: string
  regional: string
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
        <div key={r.title} className='flex flex-col flex-1 gap-4 rounded-xl px-4 py-3' style={{ boxShadow: '0px 2px 12px 0px #00000014' }}>
          <div>{r.title}</div>
          <div className='text-primary-3 text-4xl font-bold'>
            {r.value}%
          </div>
          {r.regional &&
            <div className='font-bold'>{r.regional}</div>
          }
        </div>
      ))}
    </div>
  )
}

export default GraphAddOn
