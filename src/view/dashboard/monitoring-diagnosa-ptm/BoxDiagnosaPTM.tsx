import { IoMdInformationCircleOutline } from "react-icons/io";

interface BoxDiagnosaPTMProps {
  title: string;
  amount: string;
  titleAmount: string;
  subTitle: string;
  classNameContainer: string;
  classNameTitle?: string;
  classNameAmount?: string;
  classNameSubTitle?: string;
  showInfo?: boolean;
}

const BoxDiagnosaPTM = ({
  title,
  amount,
  subTitle,
  titleAmount,
  showInfo = true,
  classNameContainer = "w-[300px] flex flex-col gap-5 p-5",
  classNameTitle = "font-plus-jakarta-sans text-[20px] font-semibold leading-[20px] text-left",
  classNameAmount = "font-plus-jakarta-sans text-[32px] text-[#006A65] font-semibold leading-[32px] text-left",
  classNameSubTitle = "font-plus-jakarta-sans text-[14px] font-normal leading-[20px] text-left",
}: BoxDiagnosaPTMProps) => {
  return (
    <div className={classNameContainer}>
      <div className="flex justify-between">
        <p className={classNameTitle}>{title}</p>
        {showInfo && (
          <IoMdInformationCircleOutline size={24} color="#00B1A9" className="cursor-pointer" />
        )}
      </div>

      <div className="flex gap-2.5 items-center">
        <p className={classNameAmount}>{amount}</p>
        <p className="font-plus-jakarta-sans text-[#616161] text-[16px] font-normal leading-[20px] text-left">
          {titleAmount}
        </p>
      </div>
      <p className={classNameSubTitle}>{subTitle}</p>
    </div>
  );
};

export default BoxDiagnosaPTM;
