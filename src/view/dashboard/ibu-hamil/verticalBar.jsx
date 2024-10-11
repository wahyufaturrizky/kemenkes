import React, { useEffect } from 'react';
import * as echarts from 'echarts';

const VerticalBarChart = () => {
  useEffect(() => {
    const chartDom = document.getElementById('chart');
    const myChart = echarts.init(chartDom);

    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        bottom: 0,
        data: ['Sudah Pakai %', 'Total']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '10%',
        containLabel: true
      },
      xAxis: {
        type: 'value',
        boundaryGap: [0, 0.01],
        max: 100,
        splitLine: {
          show: false
        }
      },
      yAxis: {
        type: 'category',
        data: ['Indikator 1', 'Indikator 2', 'Indikator 3', 'Indikator 4', 'Indikator 5', 'Indikator 6', 'Indikator 7', 'Indikator 8']
      },
      series: [
        {
          name: 'Total',
          type: 'bar',
          barWidth: '60%',
          data: [100, 100, 100, 100, 100, 100, 100, 100],
          itemStyle: {
            color: '#E0F2F1'
          }
        },
        {
          name: 'Sudah Pakai %',
          type: 'bar',
          barWidth: '60%',
          data: [9, 18, 20, 38, 47, 52, 70, 70],
          itemStyle: {
            color: '#26A69A'
          }
        }
      ]
    };

    myChart.setOption(option);

    // Clean up on unmount
    return () => {
      myChart.dispose();
    };
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h3 style={styles.title}>Capaian Penerima Layanan Dasar</h3>
        <p style={styles.subtitle}>loremipsum</p>
        <div style={styles.filterContainer}>
          <button style={styles.button}>Terendah</button>
          <button style={styles.iconButton}>
            <i className="fas fa-download"></i> {/* Replace with any icon library you're using */}
          </button>
        </div>
      </div>
      <div id="chart" style={{ width: '100%', height: '400px' }}></div>
    </div>
  );
};

const styles = {
  container: {
    width: '100%',
    backgroundColor: '#3949AB',
    borderRadius: '10px',
    padding: '15px',
    color: '#fff',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '10px',
  },
  title: {
    fontSize: '18px',
    margin: 0,
  },
  subtitle: {
    fontSize: '14px',
    margin: '5px 0',
  },
  filterContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#fff',
    color: '#3949AB',
    padding: '5px 10px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  iconButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '18px',
  }
};

export default VerticalBarChart;
