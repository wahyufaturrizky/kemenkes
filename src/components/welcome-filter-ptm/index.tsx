"use client";

import Image from "next/image";
import Select from "react-select";
import ImgArrowRight from "../../assets/icons/arrow-right.png";

interface IWelcomeFilterPTMProps {}

const monitoringOptions = [
  {
    value: 1,
    label: "Deteksi Dini",
  },
  {
    value: 2,
    label: "Faktor Risiko",
  },
  {
    value: 3,
    label: "Diagnosa",
  },
  {
    value: 4,
    label: "Capaian",
  },
];

const WelcomeFilterPTM: React.FC<IWelcomeFilterPTMProps> = ({}) => {
  const handleGotoPage = () => {
    console.log("handleGoToPage");
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row justify-between">
        <p className="color-black font-medium text-[30px]">Selamat datang !</p>
        <div className="flex flex-row gap-5">
          {/* <Select options={monitoringOptions} /> */}
          {/* <p>2</p>
          <p>3</p> */}
        </div>
      </div>
      <div className="flex justify-end">
        <div
          className="bg-[#00B3AC] flex flex-row rounded-[50px] px-2 py-3 gap-x-2 cursor-pointer"
          onClick={handleGotoPage}
        >
          <div className="w-3.5 flex flex-col justify-center">
            <Image alt="arrow-right" src={ImgArrowRight} />
          </div>
          <p className="text-white font-bold text-base">Halaman Kunjungan</p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeFilterPTM;
