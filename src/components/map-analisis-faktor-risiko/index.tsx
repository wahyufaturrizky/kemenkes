// components/MapComponent.tsx

import { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { formatNumber } from "@/helpers";
import { FeatureCollection } from "geojson"; // Import GeoJSON types
import IndonesiaMaps from "../../utils/maps/Indonesia2.json";
import { SubActivityCheckDistribution } from "@/view/dashboard/analisis-faktor-risiko/type";

interface MapData {
  name: string;
  value: number;
  percentage: number;
  tercatat: number;
}

const MapAnalisisiFaktorRisiko = ({
  dataActivityCheckDistributionBasedOnParticipant,
}: {
  dataActivityCheckDistributionBasedOnParticipant?: SubActivityCheckDistribution[];
}) => {
  const PAPUA = dataActivityCheckDistributionBasedOnParticipant?.find(
    (finding: SubActivityCheckDistribution) => finding.province_name === "PAPUA"
  );
  const NUSA_TENGGARA_BARAT = dataActivityCheckDistributionBasedOnParticipant?.find(
    (finding: SubActivityCheckDistribution) => finding.province_name === "NUSA TENGGARA BARAT"
  );
  const GORONTALO = dataActivityCheckDistributionBasedOnParticipant?.find(
    (finding: SubActivityCheckDistribution) => finding.province_name === "GORONTALO"
  );
  const SULAWESI_TENGGARA = dataActivityCheckDistributionBasedOnParticipant?.find(
    (finding: SubActivityCheckDistribution) => finding.province_name === "SULAWESI TENGGARA"
  );

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
            console.log("@params", params);

            const data = params.data as MapData | undefined;
            if (data) {
              const { name, percentage, tercatat } = data;
              return `
                    <div style="color: #ffffff; font-weight: bold;">
                      ${name}
                    </div>
                    Tercatat: ${formatNumber(tercatat)} (${percentage}%)`;
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
            color: ["#AA1F22", "#E85739", "#FCF3AD", "#86CA66", "#387941"],
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
            data: dataActivityCheckDistributionBasedOnParticipant?.map(
              (item: SubActivityCheckDistribution) => ({
                name: item.province_name,
                percentage: item.percentage,
                tercatat: item.total_participant,
                value: item.total_participant,
              })
            ),
            // [
            //   {
            //     name: "IRIAN JAYA TIMUR",
            //     anemia: PAPUA?.percentage,
            //     tercatat: PAPUA?.total_participant,
            //     value: PAPUA?.total_participant,
            //   },
            //   {
            //     name: "NUSA TENGGARA BARAT",
            //     anemia: NUSA_TENGGARA_BARAT?.percentage,
            //     tercatat: NUSA_TENGGARA_BARAT?.total_participant,
            //     value: NUSA_TENGGARA_BARAT?.total_participant,
            //   },
            //   {
            //     name: "GORONTALO",
            //     anemia: GORONTALO?.percentage,
            //     tercatat: GORONTALO?.total_participant,
            //     value: GORONTALO?.total_participant,
            //   },
            //   {
            //     name: "SULAWESI TENGGARA",
            //     anemia: SULAWESI_TENGGARA?.percentage,
            //     tercatat: SULAWESI_TENGGARA?.total_participant,
            //     value: SULAWESI_TENGGARA?.total_participant,
            //   },
            //   {
            //     name: "DAERAH ISTIMEWA YOGYAKARTA",
            //     anemia: PAPUA?.percentage,
            //     tercatat: PAPUA?.total_participant,
            //     value: PAPUA?.total_participant,
            //   },
            //   {
            //     name: "JAWA TENGAH",
            //     anemia: PAPUA?.percentage,
            //     tercatat: PAPUA?.total_participant,
            //     value: PAPUA?.total_participant,
            //   },
            //   {
            //     name: "BANTEN",
            //     anemia: PAPUA?.percentage,
            //     tercatat: PAPUA?.total_participant,
            //     value: PAPUA?.total_participant,
            //   },
            //   {
            //     name: "JAWA TIMUR",
            //     anemia: PAPUA?.percentage,
            //     tercatat: PAPUA?.total_participant,
            //     value: PAPUA?.total_participant,
            //   },
            //   {
            //     name: "MALUKU UTARA",
            //     anemia: PAPUA?.percentage,
            //     tercatat: PAPUA?.total_participant,
            //     value: PAPUA?.total_participant,
            //   },
            //   {
            //     name: "MALUKU",
            //     anemia: PAPUA?.percentage,
            //     tercatat: PAPUA?.total_participant,
            //     value: PAPUA?.total_participant,
            //   },
            //   {
            //     name: "KALIMANTAN SELATAN",
            //     anemia: PAPUA?.percentage,
            //     tercatat: PAPUA?.total_participant,
            //     value: PAPUA?.total_participant,
            //   },
            //   {
            //     name: "KALIMANTAN BARAT",
            //     anemia: PAPUA?.percentage,
            //     tercatat: PAPUA?.total_participant,
            //     value: PAPUA?.total_participant,
            //   },
            //   {
            //     name: "SULAWESI SELATAN",
            //     anemia: PAPUA?.percentage,
            //     tercatat: PAPUA?.total_participant,
            //     value: PAPUA?.total_participant,
            //   },
            //   {
            //     name: "DKI JAKARTA",
            //     anemia: PAPUA?.percentage,
            //     tercatat: PAPUA?.total_participant,
            //     value: PAPUA?.total_participant,
            //   },
            //   {
            //     name: "JAWA BARAT",
            //     anemia: PAPUA?.percentage,
            //     tercatat: PAPUA?.total_participant,
            //     value: PAPUA?.total_participant,
            //   },
            //   {
            //     name: "IRIAN JAYA TENGAH",
            //     anemia: PAPUA?.percentage,
            //     tercatat: PAPUA?.total_participant,
            //     value: PAPUA?.total_participant,
            //   },
            //   {
            //     name: "NUSA TENGGARA TIMUR",
            //     anemia: PAPUA?.percentage,
            //     tercatat: PAPUA?.total_participant,
            //     value: PAPUA?.total_participant,
            //   },
            //   {
            //     name: "BALI",
            //     anemia: PAPUA?.percentage,
            //     tercatat: PAPUA?.total_participant,
            //     value: PAPUA?.total_participant,
            //   },
            //   {
            //     name: "RIAU",
            //     anemia: PAPUA?.percentage,
            //     tercatat: PAPUA?.total_participant,
            //     value: PAPUA?.total_participant,
            //   },
            //   {
            //     name: "SULAWESI TENGAH",
            //     anemia: PAPUA?.percentage,
            //     tercatat: PAPUA?.total_participant,
            //     value: PAPUA?.total_participant,
            //   },
            //   {
            //     name: "KALIMANTAN TIMUR",
            //     anemia: PAPUA?.percentage,
            //     tercatat: PAPUA?.total_participant,
            //     value: PAPUA?.total_participant,
            //   },
            //   {
            //     name: "SULAWESI UTARA",
            //     anemia: PAPUA?.percentage,
            //     tercatat: PAPUA?.total_participant,
            //     value: PAPUA?.total_participant,
            //   },
            //   {
            //     name: "IRIAN JAYA BARAT",
            //     anemia: PAPUA?.percentage,
            //     tercatat: PAPUA?.total_participant,
            //     value: PAPUA?.total_participant,
            //   },
            //   {
            //     name: "SUMATERA UTARA",
            //     anemia: PAPUA?.percentage,
            //     tercatat: PAPUA?.total_participant,
            //     value: PAPUA?.total_participant,
            //   },
            //   {
            //     name: "BANGKA BELITUNG",
            //     anemia: PAPUA?.percentage,
            //     tercatat: PAPUA?.total_participant,
            //     value: PAPUA?.total_participant,
            //   },
            //   {
            //     name: "SUMATERA BARAT",
            //     anemia: PAPUA?.percentage,
            //     tercatat: PAPUA?.total_participant,
            //     value: PAPUA?.total_participant,
            //   },
            //   {
            //     name: "KALIMANTAN TENGAH",
            //     anemia: PAPUA?.percentage,
            //     tercatat: PAPUA?.total_participant,
            //     value: PAPUA?.total_participant,
            //   },
            //   {
            //     name: "SUMATERA SELATAN",
            //     anemia: PAPUA?.percentage,
            //     tercatat: PAPUA?.total_participant,
            //     value: PAPUA?.total_participant,
            //   },
            //   {
            //     name: "JAMBI",
            //     anemia: PAPUA?.percentage,
            //     tercatat: PAPUA?.total_participant,
            //     value: PAPUA?.total_participant,
            //   },
            //   {
            //     name: "LAMPUNG",
            //     anemia: PAPUA?.percentage,
            //     tercatat: PAPUA?.total_participant,
            //     value: PAPUA?.total_participant,
            //   },
            //   {
            //     name: "BENGKULU",
            //     anemia: PAPUA?.percentage,
            //     tercatat: PAPUA?.total_participant,
            //     value: PAPUA?.total_participant,
            //   },
            //   {
            //     name: "ACEH",
            //     anemia: PAPUA?.percentage,
            //     tercatat: PAPUA?.total_participant,
            //     value: PAPUA?.total_participant,
            //   },
            // ] as MapData[],
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

export default MapAnalisisiFaktorRisiko;
