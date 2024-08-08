import React, { useEffect, useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";

import indonesiaGeoJSON from "../../assets/json/indonesia-geomap.json";

const Map = () => {
  const [option, setOption] = useState([]);

  useEffect(() => {
    const initializeMap = () => {
      echarts.registerMap("indonesia", indonesiaGeoJSON);

      const mapOption = {
        title: {
          text: "Indonesian Map Example",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        visualMap: {
          min: 0,
          max: 100,
          left: "left",
          top: "bottom",
          text: ["High", "Low"],
          inRange: {
            color: ["#e0ffff", "#006edd"],
          },
          calculable: true,
        },
        series: [
          {
            name: "Indonesia",
            type: "map",
            map: "indonesia",
            roam: true,
            label: {
              show: false,
            },
            data: [
              { name: "Jawa Timur", value: 100 },
              { name: "Jakarta", value: 80 },
              { name: "Bali", value: 60 },
            ],
          },
        ],
      };
      setOption(mapOption);
    };

    initializeMap();
  }, []);

  return (
    <div className="border border-[#D6D6D6] rounded-xl py-5 px-[17px]">
      <div>
        <h1 className="text-lg font-semibold">
          Indikator Program: Persentase Ibu Hamil K1
        </h1>
        <p className="flex items-center gap-2 font-medium text-xs mt-[4px] mb-[4px]">
          DKI Jakarta <MdKeyboardArrowRight />
          Posyandu Mawar
        </p>
        <p className="text-[#00B1A9] font-medium text-xs">
          19 Mei 2024 - 20 Mei 2024
        </p>
      </div>
      <ReactECharts
        option={option}
        style={{ height: "600px", width: "100%" }}
      />
    </div>
  );
};

export default Map;
