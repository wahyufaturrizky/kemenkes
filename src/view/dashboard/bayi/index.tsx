import Image from "next/image";
import {
  Banner,
  BannerHighlightFooter,
  BannerText,
  GraphEcharts,
  Navbar,
  Sidebar,
  Spin,
  Tabs,
} from "@/components";
// import FilterSummaryImmunizationWus from "@/view/home/components/FilterWus";
import { useState } from "react";

const Bayi = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-center bg-image1 bg-support-b2 w-full">
        <div className="px-4 container">
          <Banner
            text={
              <BannerText
                highlight={`Dasbor Program Imunisasi Rutin`}
                highlightFooter={
                  <BannerHighlightFooter
                    look="567"
                    comment="145"
                    share="24"
                    classNameShare="text-support-b2"
                  />
                }
              />
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Bayi;
