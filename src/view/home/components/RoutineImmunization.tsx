interface RoutineImmunizationCoverageTrendGraphProps {
  title: string
  subTitle?: string
  graph: JSX.Element
}

const RoutineImmunizationCoverageTrendGraph: React.FC<RoutineImmunizationCoverageTrendGraphProps> = ({
  title, subTitle, graph
}) => {
  return (
    <>
      <div className="text-2xl md:text-3xl text-primary-2 font-bold">{title}</div>
      <div>{subTitle}</div>

      <div>{graph}</div>
    </>
  )
}

export default RoutineImmunizationCoverageTrendGraph
