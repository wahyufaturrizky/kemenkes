'use client'

import { useEffect, useState } from "react";
import ReactECharts from 'echarts-for-react';

interface GraphEChartsProps {
  dataXAxis: string[] | number[]
  dataValue1: string[] | number[]
  dataValue2: string[] | number[]
  dataValue3: string[] | number[]
  series: any[]
}

const GraphECharts: React.FC<GraphEChartsProps> = ({ dataXAxis, dataValue1, dataValue2, dataValue3 }) => {
  const [option, setOption] = useState({})
  useEffect(() => {
    const graphOptions = {
      color: ['#EAAA08', '#2E90FA', '#00B1A9'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: '#999'
          }
        }
      },
      // toolbox: {
      //   feature: {
      //     dataView: { show: true, readOnly: false },
      //     magicType: { show: true, type: ['line', 'bar'] },
      //     restore: { show: true },
      //     saveAsImage: { show: true }
      //   }
      // },
      legend: {
        top: 'bottom',
        data: ['% Target Cakupan', 'Jumlah Penerima Antigen', '% Cakupan']
      },
      xAxis: [
        {
          type: 'category',
          data: dataXAxis,
          axisPointer: {
            type: 'shadow'
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: 'Precipitation',
          min: 0,
          max: 250,
          interval: 50,
          axisLabel: {
            formatter: '{value} ml'
          }
        },
        {
          type: 'value',
          name: 'Temperature',
          min: 0,
          max: 25,
          interval: 5,
          axisLabel: {
            formatter: '{value} °C'
          }
        },
      ],
      series: [
        {
          name: '% Target Cakupan',
          type: 'line',
          yAxisIndex: 1,
          tooltip: {
            valueFormatter: function (value: any) {
              return value + ' °C';
            }
          },
          data: dataValue1
        },
        {
          name: 'Jumlah Penerima Antigen',
          type: 'bar',
          tooltip: {
            valueFormatter: function (value: any) {
              return value + ' ml';
            }
          },
          data: dataValue2
        },
        {
          name: '% Cakupan',
          type: 'line',
          tooltip: {
            valueFormatter: function (value: any) {
              return value + ' ml';
            }
          },
          data: dataValue3
        },
      ]
    }
    setOption(graphOptions)
  }, [dataXAxis])

  return <ReactECharts option={option} />;
};

export default GraphECharts;