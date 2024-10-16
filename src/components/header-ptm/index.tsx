import Image from "next/image";
import kemenkesLogo from "@/assets/images/logo-kemenkes.png";
import dtoLogo from "@/assets/images/logo-dto.png";
interface HeaderComp {
  title: string;
  subtitle?: string;
  desc: string;
  space: boolean;
  miniDesc: string;
  updateTime: string;
}
const HeaderPTM: React.FC<HeaderComp> = ({ title, subtitle, desc, miniDesc, updateTime }) => {
  const formatTeks = (text: string) => {
    return text.split("\n").map((line, index) => (
      <span key={index}>
        {line}
        <br />
      </span>
    ));
  };
  return (
    <>
      <div className="h-[61px] flex justify-between items-center w-full mb-[10px]">
        <Image alt="satusehat" src={kemenkesLogo.src} width={112} height={50} />
        <Image alt="satusehat" src={dtoLogo.src} width={162} height={40} />
      </div>
      <div className="grid grid-cols-3 w-full bg-[#EBEBEB]">
        <div className="md:col-span-2 col-span-3 bg-primary h-[180px] md:pl-[60px] px-1 text-white flex flex-col justify-center">
          <h1 className="text-5xl font-bold">{formatTeks(title)}</h1>
          <p className="font-bold leading-8">{subtitle}</p>
        </div>
        <div className="col-span-3 md:col-span-1 bg-secondary h-[180px] flex flex-col justify-center  xl:px-12 px-1 font-bold">
          <p>{formatTeks(desc)}</p>
        </div>
      </div>
      <div
        className="flex flex-row justify-between items-center w-full h-20 bg-[#EBEBEB] p-2.5"
      >
        <div className="font-normal text-black text-xs">{formatTeks(miniDesc)}</div>
        <div>
            <div className="font-normal text-black text-[10px]">Keterangan Update Data Terakhir:</div>
            <div className="font-bold text-black text-[14px]">{updateTime}</div>
        </div>
      </div>
    </>
  );
};
export default HeaderPTM;
