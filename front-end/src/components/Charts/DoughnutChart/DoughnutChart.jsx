import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import './DoughnutChart.css'
import { Color } from '../../../hoc/Layout/Layout';

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = props => {
  const data = {
    labels: props.chartSetting.map((item) => {
      return item['label'];
    }),
    datasets: [
      {
        label: '# of Votes',
        data: props.chartSetting.map(item => item['count']),
        backgroundColor: Color,
        borderColor : Color,
        borderWidth: 1,
        scale: 300,
      }
    ]
  }

  return (
    <div className='Doughnut'>
      <Doughnut data={data} />
    </div>
  );
};

export default DoughnutChart;