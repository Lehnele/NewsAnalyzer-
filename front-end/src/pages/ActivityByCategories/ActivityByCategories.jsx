import React, {useEffect, useState} from 'react';
import './ActivityByCategories.css';
import axios from "../../axios/axios";
//UI components
import Multiselect from 'multiselect-react-dropdown';
import Button from "../../components/UI/Button/Button";
import Select from "../../components/UI/Select/Select";
import CheckBox from "../../components/UI/CheckBox/CheckBox";
import Loader from "../../components/UI/Loader/Loader";
//Charts components
import DoughnutChart from "../../components/Charts/DoughnutChart/DoughnutChart";
import VerticalBarCharts from "../../components/Charts/VerticalBarChart/VerticalBarChart";
import LineChart from "../../components/Charts/LineChart/LineChart";


const ActivityByCategories = () => {
  const [activityByCategoriesState, setActivityByCategoriesState] = useState({
    Source: 1,
    AnalyzeBy: 'by_day',
    Categories: []
  })

  const [multiselectState, setMultiselectState] = useState({
    options: [],
    selectedCategories: [],
    allSelect: false
  })

  const [checkBoxState, setCheckBoxState] = useState({
    Doughnut: false,
    VerticalBar: false,
    Line: false
  })

  const [chartSetting, setChartSetting] = useState()

  const [loader, setLoader] = useState({loader: false})

  useEffect (() => {
    async function fetchCategory() {
      const response = await axios.get('categories-list')
      setMultiselectState({options: response.data})
    }
    fetchCategory()
  }, [])

  const fetchAnalyzeSettings = async () => {
    const analyzeSettings = JSON.stringify(activityByCategoriesState)
    setLoader({loader: true})
    try {
      const response = await axios.post('category-activity', analyzeSettings, {'headers': {'accept': 'application/json', 'Content-Type': 'application/json'}});
      setChartSetting(response.data)
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

    setActivityByCategoriesState(activityByCategoriesState => ({
      ...activityByCategoriesState,
      AnalyzeBy: chose
    }))
  }

  const sourceSelectorChangeHandler = event => {
    setActivityByCategoriesState(activityByCategoriesState => ({
      ...activityByCategoriesState,
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
    value={activityByCategoriesState.category}
    items={[
      {text: 'Lenta.ru', value: 1},
      {text: 'Риа новости', value: 2},
      {text: 'ТАСС', value: 3},
      {text: 'Комсомольская правда', value: 4},
    ]}
  />

  const analyzeSelector = <Select
    onChange={timeSelectorChangeHandler}
    label='За последний(и):'
    value={activityByCategoriesState.category}
    items={[
      {text: 'День', value: 1},
      {text: 'Неделя', value: 2},
      {text: 'Месяц', value: 3},
    ]}
  />

  const checkBox = <CheckBox
    checkBoxChangeHandler={checkBoxChangeHandler}
    items={[
      {label: 'Doughnut', text: 'Круговая'},
      {label: 'VerticalBar', text: 'Столбчатая'},
      {label: 'Line', text: 'Кривая'},
    ]}
  >
    Параметры анализатора:
  </CheckBox>

  const onSelect = selectedList => {
    setActivityByCategoriesState(ActivityByCategoriesState => ({
        ...ActivityByCategoriesState,
        Categories: selectedList.map(item => item.id)
      })
    )
    setMultiselectState(multiselectState => ({
      ...multiselectState,
        selectedCategories: selectedList.map(item => item.name)
    }))
  }

  const onRemove = selectedList => {
    setMultiselectState(multiselectState => ({
      ...multiselectState,
      selectedCategories: selectedList.map(item => item.name)
    }))
  }

  const style={
    multiselectContainer: {},
    searchWrapper: {
      height: '37px',
      background: '#000',
      overflow: 'hidden',
      'border-radius': '5px'
    },
    searchBox: {

    },
  }

  const multiselectAllHandler = () => {
    setMultiselectState(multiselectState => ({
      ...multiselectState,
      allSelect: !multiselectState.allSelect,
    }))

    if (!multiselectState.allSelect) {
      setActivityByCategoriesState(ActivityByCategoriesState => ({
          ...ActivityByCategoriesState,
          Categories: multiselectState.options.map(item => item.id)
        })
      )
      setMultiselectState(multiselectState => ({
        ...multiselectState,
        selectedCategories: multiselectState.options.map(item => item.name)
      }))
    } else {
      setActivityByCategoriesState(ActivityByCategoriesState => ({
          ...ActivityByCategoriesState,
          Categories: []
        })
      )
      setMultiselectState(multiselectState => ({
        ...multiselectState,
        selectedCategories: []
      }))
    }
  }

  const multiselect = <div className='categoryMultiselect'>
    <label htmlFor="categoryMultiselect">Категории</label>
    <label htmlFor="chooseAll">Выбрать все</label>
    <Multiselect
      className='Multiselect'
      id='categoryMultiselect'
      options={multiselectState.options}
      onSelect={onSelect}
      onRemove={onRemove}
      displayValue="name"
      loading={loader.loader}
      showCheckbox={true}
      selectedValues={multiselectState.allSelect ? [...multiselectState.options] : []}
      placeholder={(multiselectState.selectedCategories?.length != 0 && multiselectState.selectedCategories != undefined)
        ? multiselectState.selectedCategories
        : 'Выберите категории...'}
      style={style}
    />
    <div className='SelectAll'>
      <input id='chooseAll' type="checkbox" onChange={multiselectAllHandler}/>
    </div>
  </div>

  return (
    <div className='ActivityByCategories'>
      <div className="ActivityByCategoriesToolBar">
        { sourceSelector }
        { analyzeSelector }
        { multiselect }
        <span className="break"/>
        { checkBox }
        <Button onClick={fetchAnalyzeSettings}>Анализ</Button>
      </div>

      <div className='ActivityByCategoriesCharts'>

        { loader.loader ? <Loader/>: chartSetting ? (
          <>
            { checkBoxState.Doughnut ? <DoughnutChart chartSetting={chartSetting.items}/> : null }
            { checkBoxState.VerticalBar ? <VerticalBarCharts title = 'анализатора активности' chartSetting={chartSetting.items} label={`Анализ за ${chartSetting.analyzed_period}`}/> : null }
            { checkBoxState.Line ? <LineChart title = 'анализатора активности' chartSetting={chartSetting.items} label={`Анализ за ${chartSetting.analyzed_period}`}/> : null }
          </>
        ) : null}
      </div>
    </div>
  );
};

export default ActivityByCategories;