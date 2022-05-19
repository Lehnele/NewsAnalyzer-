import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import './DoughnutChart.css'
import { Color } from '../../../hoc/Layout/Layout';

const DoughnutChart = props => {
  ChartJS.register(ArcElement, Tooltip, Legend);
  const data = {
    labels: props.chartSetting.map((item) => {
      return item['label'];
    }),
    datasets: [
      {
        label: '# of Votes',
        data: props.chartSetting.map((item) => {
          return item['count'];
        }),
        backgroundColor: Color,
        borderColor : Color,
        borderWidth: 1,
        scale: 300,
      },
    ],
  }

  return (
    <div className='Doughnut'>
      <Doughnut data={data} />
    </div>
  );
};

export default DoughnutChart;