import Image from "next/image"
import SatudataLogo from "@/assets/images/satudata-logo.png"
import { FaFacebook, FaTwitter } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <div className="w-full flex justify-center bg-primary-2 text-white">
      <div className="container py-8">
        <table className="border-separate border-spacing-4 md:border-spacing-16">
          <tbody>
            <tr>
              <td>
                <Image alt="satusehat" src={SatudataLogo.src} width={258.4} height={52} />
              </td>
              <td>
                <div className="text-lg md:text-2xl">Lokasi Kami</div>
                <div>{`Jalan H.R. Rasuna Said Blok X.5 Kav. 4-9\nJakarta Selatan 12950 DKI Jakarta, Indonesia`}</div>
              </td>
              <td>
                <div className="text-2xl">Kontak</div>
                <div>{`(021) 5223017\nwww.kemkes.go.id`}</div>
              </td>
            </tr>
            <tr>
              <td className="text-sm align-baseline">© 2022. All Right Reserved</td>
              <td>
                <div className="flex flex-wrap gap-4">
                  <div>Dashboard Publik</div>
                  <div>Dashboard Dinkes & Faskes</div>
                  <div>FAQ</div>
                  <div>Request Data</div>
                </div>
              </td>
              <td className="flex justify-end gap-4">
                <div>
                  <FaFacebook />
                </div>
                <div>
                  <FaTwitter />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Footer