interface ButtonProps {
  text: JSX.Element | string
  variant: 'contained' | 'outlined'
  className?: string
  style?: any
}

const Button: React.FC<ButtonProps> = ({
  text, variant, className = "", style
}) => {
  const textColor = variant === 'contained' ? 'bg-primary text-white text-neutral-50' : 'text-primary bg-white';
  return (
    <>
      <button className={`${className} rounded-md py-3 px-4 border border-primary ${textColor} box-shadow-btn`}
        style={style}
      >
        {text}
      </button>
    </>
  )
}

export default Button;