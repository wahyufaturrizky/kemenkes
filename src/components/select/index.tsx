'use client'

import styles from './select.module.css'
import ReactSelect, { Props, StylesConfig } from "react-select"

interface SelectProps extends Props {
  label?: string
}

const CustomStylesFunc = () => {
  const customStyles: StylesConfig = {
    input: (base, props) => ({
      ...base,
      height: '38px',
    }),
    control: (base, props) => ({
      ...base,
      borderRadius: '8px',
      boxShadow: '0px 1px 2px 0px #0000001F'
    })
  }
  return customStyles;
}

const Select: React.FC<SelectProps> = (props) => {
  return (
    <div>
      <div>{props?.label}</div>
      <ReactSelect {...props}
        styles={CustomStylesFunc()}
        components={{
          IndicatorSeparator: () => null
        }}
      />
    </div>
  )
}

export default Select