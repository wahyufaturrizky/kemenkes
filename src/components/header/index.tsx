import Image from "next/image";
import kemenkesLogo from "@/assets/images/logo-kemenkes.png";
import dtoLogo from "@/assets/images/logo-dto.png";
interface HeaderComp {
  title: string;
  subtitle?: string;
  note?: string;
  classNameContainerGrey?: string;
  desc: string;
  space: boolean;
}
const Header: React.FC<HeaderComp> = ({
  title,
  subtitle,
  desc,
  space,
  classNameContainerGrey = "h-20",
  note,
}) => {
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
        <div className={`${space ? "" : "hidden"} ${classNameContainerGrey}`}>
          {note && <p className="font-plus-jakarta-sans text-xs font-normal">{note}</p>}
        </div>
      </div>
    </>
  );
};
export default Header;
