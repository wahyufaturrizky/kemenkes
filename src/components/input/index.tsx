interface InputProps {
  containerClass?: string
  prefix?: JSX.Element
  attributeInput?: React.InputHTMLAttributes<HTMLInputElement>
}

const Input: React.FC<InputProps> = (props) => {
  return (
    <div className={`${props.containerClass} flex items-center gap-2 h-12 p-1 bg-white rounded-lg px-4 text-black`}>
      <div>
        {props.prefix}
      </div>
      <input {...props.attributeInput} className="w-full h-full focus-visible:outline-none" />
    </div>
  )
}

export default Input