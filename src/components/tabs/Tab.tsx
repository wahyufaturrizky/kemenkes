import styles from '@/components/tabs/tabs.module.css'

export interface TabProps {
  text: string
  active: boolean
  variant?: 'sm' | 'md'
}


const Tab: React.FC<TabProps> = ({
  text, active, variant = 'md'
}) => {
  const classActive = active ? 'bg-primary text-white' : ''
  const btnSize = variant === 'md' ? 'md:px-12 md:py-4' : ''
  return (
    <div className={`px-4 py-2 ${btnSize} border cursor-pointer ${classActive} ${styles.borderTab}`}>
      {text}
    </div>
  )
}

export default Tab