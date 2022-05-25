import React, {useMemo} from 'react';
import './LineChart.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Color } from '../../../hoc/Layout/Layout';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = props => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: `Линейная диаграмма ${props.title}.`
      }
    }
  };

  const labels = props.chartSetting.map(item => item['label'])

  const data = useMemo(() => {
    return {
      labels,
      datasets: [
        {
          label: props.label,
          data: props.chartSetting.map(item => item['count']),
          borderColor: Color,
          backgroundColor: Color,
        }
      ]
    };
  }, [props.chartSetting])

  const line = useMemo(() => {
    return <Line options={options} data={data} />
  }, [data])

  return (
    <div className='LineChart'>
      {line}
    </div>
  );
};

export default LineChart;