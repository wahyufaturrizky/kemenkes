import React from "react";
import SectionHeader from "../sectionHeader";
import GraphEchartsAnc from "../graph-echarts-anc";
interface propsGraphAnc {
  title: string;
  subtitle: string;
  graphTitle?: string;
  filter?: JSX.Element;
  graphOptions: any;
}
const GraphAnc: React.FC<propsGraphAnc> = ({
  title,
  subtitle,
  filter,
  graphOptions,
  graphTitle,
}) => {
  return (
    <>
      <SectionHeader title={title} subtitle={subtitle} />
      {filter && <div className="w-full mt-10 mb-5">{filter}</div>}
      <p className="font-bold text-center">{graphTitle}</p>
      <div className="h-[600px] my-5">
        <GraphEchartsAnc graphOptions={graphOptions} />
      </div>
    </>
  );
};

export default GraphAnc;
