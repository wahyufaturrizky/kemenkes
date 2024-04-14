import styles from "../home.module.css"
import ChildSummaryImmunization, { ChildSummaryImmunizationProps } from "@/view/home/components/ChildSummary"

interface SummaryImmunizationProps {
  title: string
  child?: ChildSummaryImmunizationProps[]
}

const SummaryImmunization: React.FC<SummaryImmunizationProps> = ({
  title, child
}) => {
  return (
    <div className={`border rounded-lg bg-secondary-2 p-4 ${styles.boxShadowCard}`}>
      <div className="text-xl text-primary-2 font-bold">{title}</div>
      <div className="pt-2 pb-4"><hr /></div>
      <div className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-4 gap-12">
        {child?.map((r, i) => (
          <ChildSummaryImmunization key={i} {...r} />
        ))}
      </div>
    </div>
  )
}

export default SummaryImmunization