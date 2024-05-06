"use client";

import Image from "next/image";
import {
  Banner,
  BannerHighlightFooter,
  BannerText,
  Navbar,
  Sidebar,
} from "@/components";

const dataTotalSummaryImmunizationTotal = [
  {
    title: "Total Penerima Imunisasi Bayi",
    value: "36.818.437",
  },
  {
    title: "Total Penerima Imunisasi Bayi",
    value: "36.818.437",
  },
  {
    title: "Total Penerima Imunisasi Bayi",
    value: "36.818.437",
  },
  {
    title: "Total Penerima Imunisasi Bayi",
    value: "36.818.437",
  },
];

const Bias = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-center bg-image2 bg-success w-full">
        <div className="px-4 container">
          <Banner
            text={
              <BannerText
                highlight={`Dasbor Program Imunisasi Rutin`}
                highlightFooter={
                  <BannerHighlightFooter look="567" comment="145" share="24" />
                }
              />
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Bias;
