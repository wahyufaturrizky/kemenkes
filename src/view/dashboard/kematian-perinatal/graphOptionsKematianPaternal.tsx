import { EChartsOptionProps } from "@/components/graph-echarts";
import { formatNumber } from "@/helpers";
import { labelDataSurvivalBayiBerdasarkanUsiaGestasi, labelDataSurvivalNeonatusBerdasarkanBeratLahir, labelKematianBayiAntepartum, labelKematianBayiIntarpartum, labelKematianBayiNeonatus, labelPenyebabKematianBayiDenganKelainanBawaanBerdasarkanUsiaGestasi, labelTempatMeninggalBerdasarkanFaskes } from "./labelValueChartKematianPerinatal";
import { dataMonth } from "@/utils/constants";


export const graphOptionKematianBayi = (series: any[]) => {
    const option: EChartsOptionProps = {
        color: ["#000", "#4A86E8", "#6AA84F", ],
        tooltip: {
            trigger: "item",
            formatter: function (params: any) {
                return `${params.marker} ${params.name}: ${formatNumber(params.value)}`;
            },
        },
        legend: {
            icon: "circle",
            bottom: -5,
        },
        xAxis: {
            type: "category",
            data: dataMonth.map((data: any) => data.label.slice(0, 3)),
            axisLabel: {
                interval: 0,
            },
        },
        yAxis: {
            type: "value",
        },
        series,
    };

    return option;
};

export const graphOptionKematianBayiIntarpartum = (series: any[]) => {
    const option: EChartsOptionProps = {
        color: ["#00B1A9"],
        grid: {
            left: "3%",
            right: "4%",
            containLabel: true,
        },
        xAxis: {
            type: "value",
            axisLabel: {
                formatter: (value: number) => {
                    return formatNumber(value) + "%";
                },
            },
            max: 100,
        },
        yAxis: {
            type: "category",
            data: labelKematianBayiIntarpartum.map((data: any) => data.label),
            axisLabel: {
                fontWeight: "700",
            },
        },
        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: "shadow",
            },
            formatter: (params: any) => {
                let tooltipText = params[0].name + "<br/>";
                params.forEach((item: any) => {
                    tooltipText += `${item.marker}${item.seriesName}: ${item.value}%<br/>`;
                });
                return tooltipText;
            },
        },
        series,
    };

    return option;
};

// graphOptionKematianBayiAntepartum
export const graphOptionKematianBayiAntepartum = (series: any[]) => {
    const option: EChartsOptionProps = {
        color: ["#00B1A9"],
        grid: {
            left: "3%",
            right: "4%",
            containLabel: true,
        },
        xAxis: {
            type: "value",
            axisLabel: {
                formatter: (value: number) => {
                    return formatNumber(value) + "%";
                },
            },
            max: 100,
        },
        yAxis: {
            type: "category",
            data: labelKematianBayiAntepartum.map((data: any) => data.label),
            axisLabel: {
                fontWeight: "700",
            },
        },
        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: "shadow",
            },
            formatter: (params: any) => {
                let tooltipText = params[0].name + "<br/>";
                params.forEach((item: any) => {
                    tooltipText += `${item.marker}${item.seriesName}: ${item.value}%<br/>`;
                });
                return tooltipText;
            },
        },
        series,
    };

    return option;
}

export const graphOptionKematianNeonatus = (series: any[]) => {
    const option: EChartsOptionProps = {
        color: ["#00B1A9"],
        grid: {
            left: "3%",
            right: "4%",
            containLabel: true,
        },
        xAxis: {
            type: "value",
            axisLabel: {
                formatter: (value: number) => {
                    return formatNumber(value) + "%";
                },
            },
            max: 100,
        },
        yAxis: {
            type: "category",
            data: labelKematianBayiNeonatus.map((data: any) => data.label),
            axisLabel: {
                fontWeight: "700",
            },
        },
        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: "shadow",
            },
            formatter: (params: any) => {
                let tooltipText = params[0].name + "<br/>";
                params.forEach((item: any) => {
                    tooltipText += `${item.marker}${item.seriesName}: ${item.value}%<br/>`;
                });
                return tooltipText;
            },
        },
        series,
    };

    return option;
}


export const graphOptionDataSurvivalNeonatusBerdasarkanBeratLahir = (series: any[]) => {
    const option: EChartsOptionProps = {
        color: ["#27A762", "#CD4243"],
        legend: {
            selectedMode: false,
            icon: "circle",
            bottom: -5,
        },
        grid: {
            left: "3%",
            right: "4%",
        },
        yAxis: {
            type: "value",
        },
        xAxis: {
            type: "category",
            data: labelDataSurvivalNeonatusBerdasarkanBeratLahir.map((data: any) => data.label),
            axisLabel: {
                interval: 0,
                orient: "vertical",
                x: "center",
            },
        },
        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: "shadow",
            },
            formatter: (params: any) => {
                let tooltipText = params[0].name + "<br/>";
                params.forEach((item: any) => {
                    tooltipText += `${item.marker}${item.seriesName}: ${item.value}<br/>`;
                });
                return tooltipText;
            },
        },
        series,
    };

    return option;
};

// Data Survival Bayi Berdasarkan Usia Gestasi
export const graphOptionDataSurvivalBayiBerdasarkanUsiaGestasi = (series: any[]) => {
    const option: EChartsOptionProps = {
        color: ["#27A762", "#CD4243"],
        grid: {
            left: "3%",
            right: "4%",
        },
        yAxis: {
            type: "value",
        },
        xAxis: {
            type: "category",
            data: labelDataSurvivalBayiBerdasarkanUsiaGestasi.map((data: any) => data.label),
            axisLabel: {
                interval: 0,
                orient: "vertical",
                x: "center",
            },
        },
        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: "shadow",
            },
            formatter: (params: any) => {
                let tooltipText = params[0].name + "<br/>";
                params.forEach((item: any) => {
                    tooltipText += `${item.marker}${item.seriesName}: ${item.value}<br/>`;
                });
                return tooltipText;
            },
        },
        series,
    };

    return option;
}

// Data Survival Neonatus Berdasarkan Lahir Dalam dan Luar
export const graphOptionDataSurvivalNeonatusBerdasarkanLahirDalamLuar = (series: any[]) => {
    const option: EChartsOptionProps = {
        grid: {
            left: "3%",
            right: "4%",
        },
        legend: {
            data: ['Dalam RS', 'Luar RS'],
            selectedMode: false,
            icon: "circle",
            bottom: -5,
        },
        xAxis: {
            type: 'category',
            data: ['<500', '500-699', '700-999', '1000-1249', '1250-1499', '1500-1799', '1800-2499', '2500-3999', '>=4000'],
        },
        yAxis: {
            type: 'value',
        },
        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: "shadow",
            },
            formatter: (params: any) => {
                let tooltipText = params[0].name + "<br/>";
                params.forEach((item: any) => {
                    tooltipText += `${item.marker}${item.seriesName}: ${item.value}<br/>`;
                });
                return tooltipText;
            },
        },
        series,
    };

    return option;
}

export const graphOptionPenyebabKematianBayiBerdasarkanUsiaGestasi = (series: any[]) => {
    const option: EChartsOptionProps = {
        color: ["#E06666", "#E69138", "#F1C232", "#6AA84F", "#45818E", "#3C78D8", "#3D85C6", "#674EA7", "#D2DB2F"],
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            selectedMode: false,
            icon: "circle",
            bottom: -5,
        },
        xAxis: {
            type: 'category',
            data: labelPenyebabKematianBayiDenganKelainanBawaanBerdasarkanUsiaGestasi.map((data: any) => data.label),
        },
        yAxis: {
            type: 'value'
        },
        series,
        grid: {
            left: "3%",
            right: "4%",
            top: 50,
            bottom: 100,
        },
    };

    return option;
}

export const graphOptionPenyebabKematianBayiDenganKelainanBawaanBerdasarkanUsiaGestasi = (series: any[]) => {
    const option: EChartsOptionProps = {
        color: ["#16AF98", "#BFBFBF", "#D2DB2F", "#F4CCCC", "#E06666", "#FF9900", "#FFD966", "#93C47D", "#6FA8DC", "#8E7CC3", "#C27BA0"],
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            selectedMode: false,
            icon: "circle",
            bottom: -5,
        },
        xAxis: {
            type: 'category',
            data: labelPenyebabKematianBayiDenganKelainanBawaanBerdasarkanUsiaGestasi.map((data: any) => data.label),
        },
        yAxis: {
            type: 'value'
        },
        series,
        grid: {
            left: "3%",
            right: "4%",
            top: 50,
            bottom: 100,
        },
    };


    return option;
}




// Tempat Meninggal Berdasarkan Faskes
export const graphOptionTempatMeninggalBerdasarkanFaskes = (series: any[]) => {
    const option: EChartsOptionProps = {
        color: ["#00B1A9"],
        grid: {
            left: "3%",
            right: "4%",
            containLabel: true,
        },
        xAxis: {
            type: "value",
            axisLabel: {
                formatter: (value: number) => {
                    return formatNumber(value) + "%";
                },
            },
            max: 100,
        },
        yAxis: {
            type: "category",
            data: labelTempatMeninggalBerdasarkanFaskes.map((data: any) => data.label),
            axisLabel: {
                fontWeight: "700",
            },
        },
        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: "shadow",
            },
            formatter: (params: any) => {
                let tooltipText = params[0].name + "<br/>";
                params.forEach((item: any) => {
                    tooltipText += `${item.marker}${item.seriesName}: ${item.value}%<br/>`;
                });
                return tooltipText;
            },
        },
        series,
    };

    return option;
}