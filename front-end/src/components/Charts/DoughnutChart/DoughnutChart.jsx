import React, {useMemo} from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import './DoughnutChart.css'
import { Color } from '../../../hoc/Layout/Layout';

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = props => {
  const data = useMemo(() => {
    return {
      labels:  props.chartSetting.map(item => item['label']),
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
  }, [props.chartSetting])

  const doughnut = useMemo(() => {
    return <Doughnut data={data} />
  }, [data])

  return (
    <div className='Doughnut'>
      {doughnut}
    </div>
  );
};

export default DoughnutChart;