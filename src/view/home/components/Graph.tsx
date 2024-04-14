'use client'

import { dataMonth } from '@/utils/constants'
import styles from '../home.module.css'
import { Button, GraphComposed, GraphEcharts, Select } from "@/components"

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

interface GraphRoutineImmunizationCoverageTrendProps {
  title: JSX.Element
  subTitle: string
  addOn?: JSX.Element
  layout?: 'horizontal' | 'vertical'
  variant?: 'public' | 'private'
  echarts?: boolean
}

const GraphRoutineImmunizationCoverageTrend: React.FC<GraphRoutineImmunizationCoverageTrendProps> = ({
  title, subTitle, addOn, layout, variant = 'public', echarts
}) => {
  return (
    <>
      {variant === 'private' &&
        <div className="flex justify-between items-center flex-wrap gap-4 mb-8 sm:mt-20 md:mt-0 ">
          <div className="flex gap-4">
            <div>
              <Select
                options={options}
                onChange={(e) => { }}
                value={{ value: 'vanilla', label: 'Vanilla' }}
              />
            </div>
            <div>
              <Select
                options={options}
                onChange={(e) => { }}
                value={{ value: 'vanilla', label: 'Vanilla' }}
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div>
              <Button text="Unduh" variant="outlined" />
            </div>
            <div>
              <Button text="Laporkan" variant="outlined" />
            </div>
          </div>
        </div>
      }
      <div className="md:text-2xl font-bold">{title}</div>
      <div>{subTitle}</div>
      <div>
        <div className={`${styles.hGraph} flex flex-wrap sm:flex-nowrap gap-4 relative`}>
          <div className="flex-grow">
            {echarts ? <GraphEcharts dataXAxis={dataMonth} /> : <GraphComposed layout={layout} />}
          </div>
          <div className="sm:w-32 md:w-64 h-fit p-2">
            <div className="text-sm">Total cakupan kumulatif pada tahun 2023</div>
            <div className="text-3xl text-primary font-bold py-2">42,33%</div>
            <div>Jumlah antigen baru lengkap: 154.167</div>
          </div>
        </div>
        <div>
          {addOn}
        </div>
        {variant === 'public' &&
          <div className="flex justify-between items-center flex-wrap gap-4 mt-8 sm:mt-20 md:mt-0 ">
            <div className="flex gap-4">
              <div>
                <Select
                  options={options}
                  onChange={(e) => { }}
                  value={{ value: 'vanilla', label: 'Vanilla' }}
                />
              </div>
              <div>
                <Select
                  options={options}
                  onChange={(e) => { }}
                  value={{ value: 'vanilla', label: 'Vanilla' }}
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div>
                <Button text="Unduh" variant="outlined" />
              </div>
              <div>
                <Button text="Laporkan" variant="outlined" />
              </div>
            </div>
          </div>
        }
      </div>
    </>
  )
}

export default GraphRoutineImmunizationCoverageTrend
