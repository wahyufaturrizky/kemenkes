import styles from "../home.module.css"
import ChildSummaryImmunization, { ChildSummaryImmunizationProps } from "./ChildSummary"

interface TotalSummaryImmunizationProps {
  title: string
  value: string
  child?: ChildSummaryImmunizationProps[]
}

const TotalSummaryImmunization: React.FC<TotalSummaryImmunizationProps> = ({
  title, value, child
}) => {
  return (
    <div className={`border rounded-lg bg-secondary-2 p-4 ${styles.boxShadowCard}`}>
      <div className="md:min-h-28 flex flex-col justify-between">
        <div className="xl:text-xl font-bold">{title}</div>
        <div className="text-3xl md:text-4xl text-support-b2 py-2">{value}</div>
      </div>
      <div className="pt-2 pb-4"><hr /></div>
      {child?.map((r, i) => (
        <ChildSummaryImmunization key={i} {...r} />
      ))}
      <div></div>
    </div>
  )
}

export default TotalSummaryImmunization