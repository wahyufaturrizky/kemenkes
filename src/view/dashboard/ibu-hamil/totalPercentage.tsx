import React from 'react';

const DataCard = () => {
  const data = [
    { label: 'Capaian <=25%', value: '12,000' },
    { label: 'Capaian 26–50%', value: '11,000' },
    { label: 'Capaian 51–75%', value: '10,000' },
    { label: 'Capaian >75%', value: '2,000' }
  ];

  return (
    <div className="flex justify-between border gap-3 border-white rounded-lg shadow-md overflow-hidden p-5">
      <div className="bg-purple-700 text-white p-5 flex justify-center items-center rounded-lg w-1/2">
        <h3 className="text-center text-sm">Jumlah Kab/Kota Dengan Capaian Persentase Tertentu</h3>
      </div>
      <div className=" flex justify-around items-center border border-[#D6D6D6] rounded-lg py-3 pl-3 w-full">
        {data.map((item, index) => (
          <div key={index} className="text-center px-4 pb-6 line">
            <span className="text-xs text-black block ">{item.label}</span>
            <h5 className="text-2xl font-bold text-purple-700 pt-3">{item.value}</h5>
          </div>
        ))}
      </div>
      <style jsx>{`
        .line:not(:last-child) {
          border-right: 1px solid #D6D6D6;
        }
      `}</style>
    </div>
  );
};

const styles = {

}

export default DataCard;
