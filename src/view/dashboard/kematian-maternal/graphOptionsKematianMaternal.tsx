import { EChartsOptionProps } from "@/components/graph-echarts";
import { formatNumber } from "@/helpers";
import { ageChartOptions, dataGraphKondisIbuSebelumnya, dataGraphPeriodeKetikaMeninggl, datagraphRiwayatFrekuensiANC, datagraphRiwayatLokasiANC, datagrapTempatMeninggalFaskes, dataPenyebabKematian, dataProvinsi } from "./dataValue";
import { dataMonth } from "@/utils/constants";

export const graphOptionKematianIbuMaster = (series: any[]) => {
    const option: EChartsOptionProps = {
        color: ["#FF9900", "#4A86E8", "#6AA84F", "#000"],
        tooltip: {
            trigger: "item",
            formatter: function (params: any) {
                return `${params.marker} ${params.name}: ${formatNumber(params.value)}`;
            },
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

export const graphOptionKematianIbu = (series: any[]) => {
    const option: EChartsOptionProps = {
        color: ["#FF9900", "#4A86E8", "#6AA84F"],
        legend: {
            selectedMode: false,
            icon: "circle",
            bottom: -5,
        },
        grid: {
            left: 100,
            right: 100,
            top: 50,
            bottom: 200,
        },
        yAxis: {
            type: "value",
            axisLabel: {
                formatter: (value: number) => {
                    return formatNumber(value) + "%";
                },
            },
            max: 100,
        },
        xAxis: {
            type: "category",
            data: dataProvinsi.map((data: any) => data.label),
            axisLabel: {
                interval: 0,
                rotate: 90,
                orient: "horizontal",
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



export const graphOptionPenyebabDasarKematian = (series: any[]) => {
    const option: EChartsOptionProps = {
        color: ["#FF9900", "#4A86E8", "#6AA84F"],
        legend: {
            selectedMode: false,
            icon: "circle",
            bottom: -5,
        },
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
            data: dataPenyebabKematian.map((data: any) => data.label),
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
                    tooltipText += `${item.marker}${item.seriesName}: ${item.value}<br/>`;
                });
                return tooltipText;
            },
        },
        series,
    };

    return option;
};


export const graphOptionTempatMeninggalFaskes = (series: any[]) => {
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
        yAxis: [{
            type: "value",
            axisLabel: {
                formatter: (value: number) => {
                    return formatNumber(value) + "%";
                },
            },
            max: 100,
        }, {
            type: "value",
            position: "right",
            axisLabel: {
                formatter: (value: any) => `${formatNumber(value)}`,
            },
            min: 0,
            max: 100,
        },],
        xAxis: {
            type: "category",
            data: datagrapTempatMeninggalFaskes.map((data: any) => data.label),
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
        series: series.map((s) => {
            if (s.name === "Jumlah") {
                return {
                    ...s,
                    yAxisIndex: 0,
                };
            }
            return {
                ...s,
                yAxisIndex: 1,
            };
        }),
    };

    return option;
};


export const graphOptionPerbandinganJumlahAdmisiObstetri = (series: any[]) => {
    const option: EChartsOptionProps = {
        color: ["#27A762", "#CD4243"],
        legend: {
            selectedMode: false,
            icon: "circle",
            bottom: -5,
        },
        grid: {
            left: 100,
            right: 100,
            top: 50,
        },
        yAxis: {
            type: "value",
            axisLabel: {
                formatter: (value: number) => {
                    return formatNumber(value) + "%";
                },
            },
            max: 100,
        },
        xAxis: {
            type: "category",
            data: ageChartOptions.map((data: any) => data.label),
            axisLabel: {
                interval: 0,
                orient: "horizontal",
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

export const graphOptionTop10CFR = (series: any[]) => {
    const option: EChartsOptionProps = {
        color: ["#27A762", "#CD4243"],
        legend: {
            selectedMode: false,
            icon: "circle",
            bottom: -5,
        },
        grid: {
            left: 100,
            right: 100,
            top: 50,
        },
        yAxis: {
            type: "value",
            axisLabel: {
                formatter: (value: number) => {
                    return formatNumber(value) + "%";
                },
            },
            max: 100,
        },
        xAxis: {
            type: "category",
            data: ageChartOptions.map((data: any) => data.label),
            axisLabel: {
                interval: 0,
                orient: "horizontal",
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

export const graphOptionRiwayatFrekuensiANC = (series: any[]) => {
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
        yAxis: [{
            type: "value",
            axisLabel: {
                formatter: (value: number) => {
                    return formatNumber(value) + "%";
                },
            },
            max: 100,
        }, {
            type: "value",
            position: "right",
            axisLabel: {
                formatter: (value: any) => `${formatNumber(value)}`,
            },
            min: 0,
            max: 100,
        },],
        xAxis: {
            type: "category",
            data: datagraphRiwayatFrekuensiANC.map((data: any) => data.label),
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
        series: series.map((s) => {
            if (s.name === "Jumlah") {
                return {
                    ...s,
                    yAxisIndex: 0,
                };
            }
            return {
                ...s,
                yAxisIndex: 1,
            };
        }),
    };

    return option;
};

export const graphOptionRiwayatLokasiANC = (series: any[]) => {
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
        yAxis: [{
            type: "value",
            axisLabel: {
                formatter: (value: number) => {
                    return formatNumber(value) + "%";
                },
            },
            max: 100,
        }, {
            type: "value",
            position: "right",
            axisLabel: {
                formatter: (value: any) => `${formatNumber(value)}`,
            },
            min: 0,
            max: 100,
        },],
        xAxis: {
            type: "category",
            data: datagraphRiwayatLokasiANC.map((data: any) => data.label),
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
        series: series.map((s) => {
            if (s.name === "Jumlah") {
                return {
                    ...s,
                    yAxisIndex: 0,
                };
            }
            return {
                ...s,
                yAxisIndex: 1,
            };
        }),
    };

    return option;
};

// Kondisi Ibu Sebelumnya
export const graphOptionKondisiIbuSebelumnya = (series: any[]) => {
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
        yAxis: [{
            type: "value",
            axisLabel: {
                formatter: (value: number) => {
                    return formatNumber(value) + "%";
                },
            },
            max: 100,
        }, {
            type: "value",
            position: "right",
            axisLabel: {
                formatter: (value: any) => `${formatNumber(value)}`,
            },
            min: 0,
            max: 100,
        },],
        xAxis: {
            type: "category",
            data: dataGraphKondisIbuSebelumnya.map((data: any) => data.label),
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
        series: series.map((s) => {
            if (s.name === "Jumlah") {
                return {
                    ...s,
                    yAxisIndex: 0,
                };
            }
            return {
                ...s,
                yAxisIndex: 1,
            };
        }),
    };

    return option;
};

// Periode Ketika Meninggal
export const graphOptionPeriodeKematian = (series: any[]) => {
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
        yAxis: [{
            type: "value",
            axisLabel: {
                formatter: (value: number) => {
                    return formatNumber(value) + "%";
                },
            },
            max: 100,
        }, {
            type: "value",
            position: "right",
            axisLabel: {
                formatter: (value: any) => `${formatNumber(value)}`,
            },
            min: 0,
            max: 100,
        },],
        xAxis: {
            type: "category",
            data: dataGraphPeriodeKetikaMeninggl.map((data: any) => data.label),
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
        series: series.map((s) => {
            if (s.name === "Jumlah") {
                return {
                    ...s,
                    yAxisIndex: 0,
                };
            }
            return {
                ...s,
                yAxisIndex: 1,
            };
        }),
    };

    return option;
};
