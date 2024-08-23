import styles from "./banner.module.css"

interface BannerProps {
  text: JSX.Element
  className?: string
}

const Banner: React.FC<BannerProps> = ({
  text, className
}) => {
  return (
    <div className={`${className} ${styles.hBanner}`}>
      {text}
    </div>
  )
}

export default Banner