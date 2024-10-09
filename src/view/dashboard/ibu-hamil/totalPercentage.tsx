import React from 'react';

const DataCard = () => {
  const data = [
    { label: 'Capaian <=25%', value: '12,000' },
    { label: 'Capaian 26–50%', value: '11,000' },
    { label: 'Capaian 51–75%', value: '10,000' },
    { label: 'Capaian >75%', value: '2,000' }
  ];

  return (
    <div className="flex border border-gray-300 rounded-lg shadow-md overflow-hidden bg-white">
      <div className="bg-purple-700 text-white p-5 flex-1 flex justify-center items-center rounded-l-lg">
        <h3 className="text-center text-sm">Jumlah Kab/Kota Dengan Capaian Persentase Tertentu</h3>
      </div>
      <div className="flex-2 flex justify-around items-center p-3">
        {data.map((item, index) => (
          <div key={index} className="text-center">
            <span className="text-xs text-black block">{item.label}</span>
            <span className="text-2xl font-bold text-purple-700">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataCard;
