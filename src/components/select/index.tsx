'use client'

import styles from './select.module.css'
import ReactSelect, { Props, StylesConfig } from "react-select"

interface SelectProps extends Props {
  label?: string
}

const CustomStylesFunc = () => {
  const customStyles: StylesConfig = {
    // input: (base, props) => ({
    //   ...base,
    //   height: '38px',
    //   minWidth: '120px'
    // }),
    control: (provided) => ({
      ...provided,
      borderRadius: '8px',
      border: '1px solid #e2e8f0',
      boxShadow: 'none',
      '&:hover': {
        border: '1px solid #cbd5e0',
      },
      padding: '8px 12px',
      minHeight: '48px',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#a0aec0',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#4a5568',
    }),
    input: (provided) => ({
      ...provided,
      margin: '0',
      padding: '0',
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: '0',
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: '8px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#e2e8f0' : 'white',
      color: '#4a5568',
      '&:hover': {
        backgroundColor: '#edf2f7',
      },
    }),
  }
  return customStyles;
}

const Select: React.FC<SelectProps> = (props) => {
  return (
    <div>
      <div>{props?.label}</div>
      <ReactSelect {...props}
        isClearable
        styles={CustomStylesFunc()}
        components={{
          IndicatorSeparator: () => null
        }}
      />
    </div>
  )
}

export default Select