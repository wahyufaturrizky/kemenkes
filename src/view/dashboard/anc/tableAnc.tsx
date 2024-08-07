const TableAnc = () => {
  return (
    <div className="mt-5 w-full">
      <div>
        <h1 className="text-xl leading-10 font-medium">
          Tabel Jumlah Ibu Hamil K1 Akses: Nasional
        </h1>
        <p className="text-[32px] leading-10 font-bold text-[#00B8AE]">
          Total 117.000 <span className=" text-xl">Ibu Hamil</span>
        </p>
      </div>
      <div>
        <p>Februari 2024</p>
      </div>
      <div className="mt-5 w-full flex justify-between items-center">
        <div>
            
        </div>
        <div></div>
      </div>
      <div className="px-5 py-10 border border-[#D6D6D6] rounded-[40px]">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-[#F5F5F5]">
              <th className="py-3 px-6 text-[#737373] font-semibold">No</th>
              <th className="py-3 px-6 text-[#737373] font-semibold">
                Provinsi
              </th>
              <th className="py-3 px-6 text-[#737373] font-semibold">
                Kab/Kota
              </th>
              <th className="py-3 px-6 text-[#737373] font-semibold">
                Kecamatan
              </th>
              <th className="py-3 px-6 text-[#737373] font-semibold">
                Kelurahan/Desa
              </th>
              <th className="py-3 px-6 text-[#737373] font-semibold">
                Jumlah Ibu Hamil K1 Akses
              </th>
              <th className="py-3 px-6 text-[#737373] font-semibold">
                % Ibu Hamil K1 Akses
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            <tr>
              <td className="py-3 px-6 border-gray-200">1</td>
              <td className="py-3 px-6 border-gray-200">
                DKI Jakarta
              </td>
              <td className="py-3 px-6 border-gray-200">
                Jakarta Utara
              </td>
              <td className="py-3 px-6 border-gray-200">Tebet</td>
              <td className="py-3 px-6 border-gray-200">
                Desa Mawar Indah
              </td>
              <td className="py-3 px-6 border-gray-200">511.010</td>
              <td className="py-3 px-6 border-gray-200">9.0</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableAnc;
