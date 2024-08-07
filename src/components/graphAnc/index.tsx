import React from "react";
import SectionHeader from "../sectionHeader";
interface propsGraphAnc {
  title: string;
  subtitle: string;
}
const GraphAnc: React.FC<propsGraphAnc> = ({ title, subtitle }) => {
  return (
    <>
      <SectionHeader
        title={title}
        subtitle={subtitle}
        // title="Analisis Pemeriksaan dan Tatalaksana Anemia pada Ibu Hami"
        // subtitle="Jumlah dan persentase ibu hamil yang melakukan kunjungan ANC dalam periode waktu dan wilayah tertentu"
      />
    </>
  );
};

export default GraphAnc;
