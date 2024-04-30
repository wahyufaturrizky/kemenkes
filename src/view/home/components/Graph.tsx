'use client'

import { dataMonth, regionOptions, vaccineTypeOptions } from '@/utils/constants'
import styles from '../home.module.css'
import { Button, GraphComposed, GraphEcharts, Select } from "@/components"
import { useState } from 'react'
import { standardOptionSameLabel } from '@/helpers'

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
  filterState?: any
  data?: any[]
}

const GraphRoutineImmunizationCoverageTrend: React.FC<GraphRoutineImmunizationCoverageTrendProps> = ({
  title, subTitle, addOn, layout, variant = 'public', echarts, filterState, data
}) => {
  const [filter, setFilter] = filterState || useState({})
  return (
    <>
      {variant === 'private' &&
        <div className="flex flex-wrap justify-between items-center gap-4 sm:mt-20 md:mt-0 mb-8">
          <div className="flex gap-4">
            <div>
              <Select
                options={vaccineTypeOptions}
                onChange={(e: any) => { setFilter({ ...filter, tipe_vaksin: e.value }) }}
                value={filter.tipe_vaksin ?
                  vaccineTypeOptions
                    ?.find((f) => f.value === filter.tipe_vaksin)
                  : filter.tipe_vaksin}
              />
            </div>
            <div>
              <Select
                options={regionOptions}
                onChange={(e: any) => { setFilter({ ...filter, wilayah: e.value }) }}
                value={filter.wilayah ?
                  vaccineTypeOptions
                    ?.find((f) => f.value === filter.wilayah)
                  : filter.wilayah}
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
      <div className="font-bold md:text-2xl">{title}</div>
      <div>{subTitle}</div>
      <div>
        <div className={`${styles.hGraph} flex flex-wrap sm:flex-nowrap gap-4 relative`}>
          <div className="flex-grow">
            {data && data?.length > 0 && <GraphEcharts
              legend={["% Imunisasi Baduta", "Target Cakupan Imunisasi Baduta", "% Total Imunisasi Baduta"]}
              // @ts-ignore
              dataXAxis={data ? standardOptionSameLabel((data || [])?.map((r: any) => r?.faskes || '')) : [0]}
              dataValue1={data ? (data || [])?.map((r) => r.pct_immunization || 0) : [0]}
              dataValue2={data ? (data || [])?.map((r) => r.pct_target_threshold || 0) : [0]}
              dataValue3={data ? (data || [])?.map((r) => r.total_immunization || 0) : [0]}
            />
            }
          </div>
          {/* <div className="p-2 sm:w-32 md:w-64 h-fit">
            <div className="text-sm">Total cakupan kumulatif pada tahun 2023</div>
            <div className="py-2 font-bold text-3xl text-primary">42,33%</div>
            <div>Jumlah antigen baru lengkap: 154.167</div>
          </div> */}
        </div>
        <div>
          {addOn}
        </div>
        {variant === 'public' &&
          <div className="flex flex-wrap justify-between items-center gap-4 mt-8 sm:mt-20 md:mt-0">
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
