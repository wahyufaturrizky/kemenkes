import { formatNumber } from "@/helpers"
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
    <div className={`border rounded-lg bg-secondary-2 p-4 ${styles.boxShadowCard} h-full`}>
      <div className="flex flex-col justify-between md:min-h-28">
        <div className="font-bold xl:text-xl">{title}</div>
        <div className="py-2 text-3xl text-support-b2 md:text-4xl">{formatNumber(parseInt(value))}</div>
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