'use client'

import { DatePicker, Select } from "@/components"

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]
const FilterSummaryImmunization: React.FC = () => {
  return (
    <div className="flex flex-col gap-2">
      <div>Filter</div>
      <div className="flex flex-wrap items-center gap-4">
        <div>
          <Select
            options={options}
            onChange={(e) => { }}
            value={{ value: 'vanilla', label: 'Vanilla' }}
          />
        </div>
        <div>
          <DatePicker
            className="md:w-96"
            selected={new Date()}
            onChange={(date, event) => { }}
            startDate={new Date()}
            endDate={new Date()}
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
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div>
          <Select
            placeholder="Pilih Provinsi"
            options={options}
            onChange={(e) => { }}
            value={{ value: 'vanilla', label: 'Vanilla' }}
          />
        </div>
        <div>
          <Select
            placeholder="Pilih Kabupaten/Kota"
            options={options}
            onChange={(e) => { }}
            value={{ value: 'vanilla', label: 'Vanilla' }}
          />
        </div>
        <div>
          <Select
            placeholder="Pilih Kecamatan"
            options={options}
            onChange={(e) => { }}
            value={{ value: 'vanilla', label: 'Vanilla' }}
          />
        </div>
        <div>
          <Select
            placeholder="Pilih Kelurahan"
            options={options}
            onChange={(e) => { }}
            value={{ value: 'vanilla', label: 'Vanilla' }}
          />
        </div>
        <div>
          <Select
            placeholder="Pilih Jenis Fasilitas Kesehatan"
            options={options}
            onChange={(e) => { }}
            value={{ value: 'vanilla', label: 'Vanilla' }}
          />
        </div>
      </div>
    </div>
  )
}

export default FilterSummaryImmunization