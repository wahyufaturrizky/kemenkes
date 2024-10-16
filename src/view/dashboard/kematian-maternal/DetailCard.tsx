import React from 'react';

interface DetailCardProps {
    label: string;
    percentage: number;
    count: number;
    color: string;
}

const DetailCard: React.FC<DetailCardProps> = ({ label, percentage, count, color }) => (
    <div className="bg-white  rounded-xl p-3 flex items-center justify-between">
        <div className="flex items-center">
            <div className={`w-4 h-4 ${color} rounded-sm mr-2`}></div>
            <span className='text-black'>{label}</span>
            <span className="ml-2 bg-[#E2F8FF] text-[#00B3AC] px-2 py-1 rounded-full text-xs font-semibold">
                {percentage}%
            </span>
        </div>
        <div className="text-right">
            <p className="text-lg font-semibold text-[#00B3AC]">{count.toLocaleString()}</p>
            <p className="text-xs opacity-70 text-[#999999]">/ 12,000,000 Kematian</p>
        </div>
    </div>
);

export default DetailCard;
