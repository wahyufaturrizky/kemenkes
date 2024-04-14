interface ButtonProps {
  text: string
  variant: 'contained' | 'outlined'
}

const Button: React.FC<ButtonProps> = ({
  text, variant
}) => {
  const textColor = variant === 'contained' ? 'bg-primary text-white text-neutral-50' : 'text-primary bg-white';
  return (
    <>
      <button className={`rounded-md py-3 px-4 border border-primary ${textColor} box-shadow-btn`}>
        {text}
      </button>
    </>
  )
}

export default Button;