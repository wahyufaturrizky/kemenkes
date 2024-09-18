// components/MapComponent.tsx

import { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { formatNumber } from "@/helpers";
import { FeatureCollection } from "geojson"; // Import GeoJSON types
import IndonesiaMaps from "../../utils/maps/Indonesia2.json";

interface MapData {
  name: string;
  value: number;
  anemia: number;
  tercatat: number;
}

const MapAnc2 = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const chartDom = chartRef.current;
      const myChart = echarts.init(chartDom);
      myChart.showLoading();

      // Fetch the map data
      // fetch("/maps/Indonesia2.json")
      //   .then((response) => response.json())
      //   .then((usaJson) => {
      //     myChart.hideLoading();
      // Use the correct GeoJSON type
      const mapData: any = IndonesiaMaps as FeatureCollection;

      myChart.hideLoading();

      echarts.registerMap("Indonesia", mapData); // Register the map as "Indonesia"

      // echarts.registerMap("USA", usaJson);

      const option: echarts.EChartsOption = {
        // title: {
        //   text: "USA Population Estimates (2012)",
        //   left: "left",
        // },
        // tooltip: {
        //   trigger: "item",
        //   showDelay: 0,
        //   transitionDuration: 0.2,
        // },
        tooltip: {
          trigger: "item",
          backgroundColor: "#666666", // Latar belakang abu-abu
          textStyle: {
            color: "#ffffff", // Warna teks default putih
            fontWeight: "normal", // Font default normal
          },
          formatter: function (params: any) {
            const data = params.data as MapData | undefined;
            if (data) {
              const { name, anemia, tercatat } = data;
              return `
                    <div style="color: #ffffff; font-weight: bold;">
                      ${name}
                    </div>
                    Tercatat: ${formatNumber(tercatat)} (${formatNumber(
                (tercatat / 38000000) * 100
              )}%)<br />
                    Anemia: ${formatNumber(anemia)} (${formatNumber(
                (anemia / tercatat) * 100
              )}%)
                  `;
            } else {
              return `<div style="color: #ffffff; font-weight: bold;">${params.name}</div>`; // Jika data tidak tersedia
            }
          },
        },

        visualMap: {
          left: "left",
          min: 500000,
          max: 38000000,
          inRange: {
            color: [
              "#AA1F22",
              "#E85739",
              "#FCF3AD",
              "#86CA66",
              "#387941",
              // "#ffffbf",
              // "#fee090",
              // "#fdae61",
              // "#f46d43",
              // "#d73027",
              // "#a50026",
            ],
          },
          text: ["100%", "0%"],
          calculable: false,
          orient: "horizontal",
          inverse: true,
          bottom: "50px",
        },
        toolbox: {
          show: true,
          left: "right",
          top: "top",
          feature: {
            dataView: { readOnly: false },
            restore: {},
            saveAsImage: {},
          },
        },
        series: [
          {
            name: "Tercatat",
            type: "map",
            roam: true,
            map: "Indonesia",
            emphasis: {
              label: {
                show: true,
              },
            },
            data: [
              {
                name: "IRIAN JAYA TIMUR",
                anemia: 500000,
                tercatat: 500000,
                value: 500000,
              },
              {
                name: "NUSA TENGGARA BARAT",
                anemia: 19000000,
                tercatat: 15000000,
                value: 15000000,
              },
              {
                name: "GORONTALO",
                anemia: 19000000,
                tercatat: 15000000,
                value: 15000000,
              },
              {
                name: "SULAWESI TENGGARA",
                anemia: 19000000,
                tercatat: 15000000,
                value: 15000000,
              },
              {
                name: "DAERAH ISTIMEWA YOGYAKARTA",
                anemia: 19000000,
                tercatat: 15000000,
                value: 15000000,
              },
              {
                name: "JAWA TENGAH",
                anemia: 19000000,
                tercatat: 34000000,
                value: 34000000,
              },
              {
                name: "BANTEN",
                anemia: 19000000,
                tercatat: 500000,
                value: 500000,
              },
              {
                name: "JAWA TIMUR",
                anemia: 19000000,
                tercatat: 20000000,
                value: 20000000,
              },
              {
                name: "MALUKU UTARA",
                anemia: 19000000,
                tercatat: 9000000,
                value: 9000000,
              },
              {
                name: "MALUKU",
                anemia: 19000000,
                tercatat: 1000000,
                value: 1000000,
              },
              {
                name: "KALIMANTAN SELATAN",
                anemia: 19000000,
                tercatat: 34000000,
                value: 34000000,
              },
              {
                name: "KALIMANTAN BARAT",
                anemia: 19000000,
                tercatat: 7000000,
                value: 7000000,
              },
              {
                name: "SULAWESI SELATAN",
                anemia: 19000000,
                tercatat: 9000000,
                value: 9000000,
              },
              {
                name: "DKI JAKARTA",
                anemia: 19000000,
                tercatat: 9000000,
                value: 9000000,
              },
              {
                name: "JAWA BARAT",
                anemia: 19000000,
                tercatat: 33000000,
                value: 33000000,
              },
              {
                name: "IRIAN JAYA TENGAH",
                anemia: 19000000,
                tercatat: 500000,
                value: 500000,
              },
              {
                name: "NUSA TENGGARA TIMUR",
                anemia: 19000000,
                tercatat: 14000000,
                value: 14000000,
              },
              {
                name: "BALI",
                anemia: 19000000,
                tercatat: 18000000,
                value: 18000000,
              },
              {
                name: "RIAU",
                anemia: 19000000,
                tercatat: 27000000,
                value: 27000000,
              },
              {
                name: "SULAWESI TENGAH",
                anemia: 19000000,
                tercatat: 33000000,
                value: 33000000,
              },
              {
                name: "KALIMANTAN TIMUR",
                anemia: 19000000,
                tercatat: 500000,
                value: 500000,
              },
              {
                name: "SULAWESI UTARA",
                anemia: 19000000,
                tercatat: 19000000,
                value: 19000000,
              },
              {
                name: "IRIAN JAYA BARAT",
                anemia: 19000000,
                tercatat: 9000000,
                value: 9000000,
              },
              {
                name: "SUMATERA UTARA",
                anemia: 19000000,
                tercatat: 32000000,
                value: 32000000,
              },
              {
                name: "BANGKA BELITUNG",
                anemia: 19000000,
                tercatat: 21000000,
                value: 21000000,
              },
              {
                name: "SUMATERA BARAT",
                anemia: 19000000,
                tercatat: 27000000,
                value: 27000000,
              },
              {
                name: "KALIMANTAN TENGAH",
                anemia: 19000000,
                tercatat: 19000000,
                value: 19000000,
              },
              {
                name: "SUMATERA SELATAN",
                anemia: 19000000,
                tercatat: 18000000,
                value: 18000000,
              },
              {
                name: "JAMBI",
                anemia: 19000000,
                tercatat: 17000000,
                value: 17000000,
              },
              {
                name: "LAMPUNG",
                anemia: 19000000,
                tercatat: 17000000,
                value: 17000000,
              },
              {
                name: "BENGKULU",
                anemia: 19000000,
                tercatat: 17000000,
                value: 17000000,
              },
              {
                name: "ACEH",
                anemia: 19000000,
                tercatat: 30000000,
                value: 30000000,
              },
            ] as MapData[],
            // data: [
            //   { name: "Alabama", value: 4822023 },
            //   { name: "Alaska", value: 731449 },
            //   { name: "Arizona", value: 6553255 },
            //   { name: "Arkansas", value: 2949131 },
            //   { name: "California", value: 38041430 },
            //   { name: "Colorado", value: 5187582 },
            //   { name: "Connecticut", value: 3590347 },
            //   { name: "Delaware", value: 917092 },
            //   { name: "District of Columbia", value: 632323 },
            //   { name: "Florida", value: 19317568 },
            //   { name: "Georgia", value: 9919945 },
            //   { name: "Hawaii", value: 1392313 },
            //   { name: "Idaho", value: 1595728 },
            //   { name: "Illinois", value: 12875255 },
            //   { name: "Indiana", value: 6537334 },
            //   { name: "Iowa", value: 3074186 },
            //   { name: "Kansas", value: 2885905 },
            //   { name: "Kentucky", value: 4380415 },
            //   { name: "Louisiana", value: 4601893 },
            //   { name: "Maine", value: 1329192 },
            //   { name: "Maryland", value: 5884563 },
            //   { name: "Massachusetts", value: 6646144 },
            //   { name: "Michigan", value: 9883360 },
            //   { name: "Minnesota", value: 5379139 },
            //   { name: "Mississippi", value: 2984926 },
            //   { name: "Missouri", value: 6021988 },
            //   { name: "Montana", value: 1005141 },
            //   { name: "Nebraska", value: 1855525 },
            //   { name: "Nevada", value: 2758931 },
            //   { name: "New Hampshire", value: 1320718 },
            //   { name: "New Jersey", value: 8864590 },
            //   { name: "New Mexico", value: 2085538 },
            //   { name: "New York", value: 19570261 },
            //   { name: "North Carolina", value: 9752073 },
            //   { name: "North Dakota", value: 699628 },
            //   { name: "Ohio", value: 11544225 },
            //   { name: "Oklahoma", value: 3814820 },
            //   { name: "Oregon", value: 3899353 },
            //   { name: "Pennsylvania", value: 12763536 },
            //   { name: "Rhode Island", value: 1050292 },
            //   { name: "South Carolina", value: 4723723 },
            //   { name: "South Dakota", value: 833354 },
            //   { name: "Tennessee", value: 6456243 },
            //   { name: "Texas", value: 26059203 },
            //   { name: "Utah", value: 2855287 },
            //   { name: "Vermont", value: 626011 },
            //   { name: "Virginia", value: 8185867 },
            //   { name: "Washington", value: 6897012 },
            //   { name: "West Virginia", value: 1855413 },
            //   { name: "Wisconsin", value: 5726398 },
            //   { name: "Wyoming", value: 576412 },
            //   { name: "Puerto Rico", value: 3667084 },
            // ],
          },
        ],
      };

      myChart.setOption(option);
      // });
    }
  }, []);

  return <div ref={chartRef} style={{ width: "100%", height: "500px" }} />;
};

export default MapAnc2;
