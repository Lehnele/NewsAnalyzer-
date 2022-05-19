import React from 'react';
import './VerticalBarChart.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Color } from '../../../hoc/Layout/Layout';

const VerticalBarChart = props => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Столбчатая диаграмма ${props.title}.`,
      },
    },
  };

  const labels = props.chartSetting.map((item) => {
    return item['label'];
  })

  const data = {
    labels,
    datasets: [
      {
        label: props.label,
        data: props.chartSetting.map((item) => {
          return item['count'];
        }),
        backgroundColor: Color,
      }
    ],
  };

  return (
    <div className='VerticalBarChart'>
      <Bar options={options} data={data} />
    </div>
  );
};

export default VerticalBarChart;