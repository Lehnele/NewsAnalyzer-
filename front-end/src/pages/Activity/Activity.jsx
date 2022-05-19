import React, {useEffect, useState} from 'react';
import './Activity.css';
import axios from "../../axios/axios";
//UI components
import Button from "../../components/UI/Button/Button";
import Select from "../../components/UI/Select/Select";
import CheckBox from "../../components/UI/CheckBox/CheckBox";
import Loader from "../../components/UI/Loader/Loader";
//Charts components
import DoughnutChart from "../../components/Charts/DoughnutChart/DoughnutChart";
import VerticalBarCharts from "../../components/Charts/VerticalBarChart/VerticalBarChart";
import LineChart from "../../components/Charts/LineChart/LineChart";


const Activity = () => {
  const [ActivityState, setActivityState] = useState({
    Source: 1,
    AnalyzeBy: 'by_day'
  })

  const [checkBoxState, setCheckBoxState] = useState({
    Doughnut: false,
    VerticalBar: false,
    Line: false
  })

  const [chartSetting, setChartSettings] = useState()

  const [loader, setLoader] = useState({loader: false})

  const FetchAnalyzeSettings = async () => {
    const AnalyzeSettings = JSON.stringify(ActivityState)
    setLoader({loader: true})
    try {
      const response = await axios.post(
        'period-activity',
        AnalyzeSettings,
        {'headers': {'accept': 'application/json', 'Content-Type': 'application/json'}});
      setChartSettings(response.data)
      setLoader({loader: false})
    } catch (e) {
      setLoader({loader: false})
      console.error(e);
    }
  }

  const timeSelectorChangeHandler = event => {
    let chose = '';
    if(+event.target.value == 1) {
      chose = 'by_day'
    } else if(+event.target.value == 2) {
      chose = 'by_week'
    } else if(+event.target.value == 3) {
      chose = 'by_month'
    }

    setActivityState(ActivityState => ({
      ...ActivityState,
      AnalyzeBy: chose
    }))
  }

  const sourceSelectorChangeHandler = event => {
    setActivityState(ActivityState => ({
      ...ActivityState,
      Source: +event.target.value
    }))
  }

  const checkBoxChangeHandler = label => {
    setCheckBoxState(checkBoxState => ({
      ...checkBoxState,
      [label]: !checkBoxState[label]
    }))
  }

  const sourceSelector = <Select
    onChange={sourceSelectorChangeHandler}
    label='Источник'
    value={ActivityState.category}
    options={[
      {text: 'Lenta.ru', value: 1},
      {text: 'Риа новости', value: 2},
      {text: 'ТАСС', value: 3},
      {text: 'Комсомольская правда', value: 4},
    ]}
  />

  const analyzeSelector = <Select
    onChange={timeSelectorChangeHandler}
    label='За последний(и):'
    value={ActivityState.category}
    options={[
      {text: 'День', value: 1},
      {text: 'Неделя', value: 2},
      {text: 'Месяц', value: 3},
    ]}
  />

  const checkBox = <CheckBox
    checkBoxChangeHandler={checkBoxChangeHandler}
    options={[
      {label: 'Doughnut', text: 'Круговая'},
      {label: 'VerticalBar', text: 'Столбчатая'},
      {label: 'Line', text: 'Кривая'},
    ]}
  >
    Параметры анализатора:
  </CheckBox>

  return (
    <div className='Activity'>
      <div className="ActivityToolBar">
        { sourceSelector }
        { analyzeSelector }
        <span className="break"/>
        { checkBox }
        <Button onClick={FetchAnalyzeSettings}>Анализ</Button>
      </div>

      <div className='ActivityCharts'>

        { loader.loader ? <Loader/>: chartSetting ? (
          <>
            { checkBoxState.Doughnut
              ? <DoughnutChart chartSetting={chartSetting.items}/>
              : null }
            { checkBoxState.VerticalBar
              ? <VerticalBarCharts title = 'анализатора активности'
                                   chartSetting={chartSetting.items}
                                   label={`Анализ за ${chartSetting.analyzed_period}`}
              />
              : null }
            { checkBoxState.Line
              ? <LineChart
                title = 'анализатора активности'
                chartSetting={chartSetting.items}
                label={`Анализ за ${chartSetting.analyzed_period}`}
              />
              : null }
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Activity;