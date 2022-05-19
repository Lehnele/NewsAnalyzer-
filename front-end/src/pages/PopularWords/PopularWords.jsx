import React, {useState} from 'react';
import './PopularWords.css';
import axios from "../../axios/axios";
//UI components
import Input from '../../components/UI/Input/Input';
import Button from "../../components/UI/Button/Button";
import Select from "../../components/UI/Select/Select";
import CheckBox from "../../components/UI/CheckBox/CheckBox";
import Loader from "../../components/UI/Loader/Loader";
//Charts components
import DoughnutChart from "../../components/Charts/DoughnutChart/DoughnutChart";
import VerticalBarCharts from "../../components/Charts/VerticalBarChart/VerticalBarChart";

const url = 'http://127.0.0.1:8000/';

const PopularWords = () => {
  const [PopularWordsState, setPopularWordsState] = useState({
    Source: 1,
    AnalyzeBy: 'by_titles',
    WordsCount: 20,
    NewsCount: 20,
    Nouns: false,
    Verbs: false,
    Percent: false
  })

  const [chartSetting, setChartSettings] = useState()

  const [loader, setLoader] = useState({loader: false})

  const FetchAnalyzeSettings = async () => {
    const AnalyzeSettings = JSON.stringify(PopularWordsState)
    setLoader({loader: true})
    try {
      const response = await axios.post('top-words', AnalyzeSettings, {'headers': {'accept': 'application/json', 'Content-Type': 'application/json'}});
      setChartSettings(response.data)
      setLoader({loader: false})
    } catch (e) {
      setLoader({loader: false})
      console.error(e);
    }
  }

  const analyzeSelectorChangeHandler = event => {
    let chose = '';
    if(+event.target.value == 1) {
      chose = 'by_titles'
    } else if(+event.target.value == 2) {
      chose = 'by_texts'
    }

    setPopularWordsState(PopularWordsState => ({
      ...PopularWordsState,
      AnalyzeBy: chose
    }))
  }

  const sourceSelectorChangeHandler = event => {
    setPopularWordsState(PopularWordsState => ({
      ...PopularWordsState,
      Source: +event.target.value
    }))
  }

  const WordsCountChangeHandler = event => {
    setPopularWordsState(PopularWordsState => ({
      ...PopularWordsState,
      WordsCount: event.target.value,
    }))
  }

  const NewsCountChangeHandler = event => {
    setPopularWordsState(PopularWordsState => ({
      ...PopularWordsState,
      NewsCount: event.target.value,
    }))
  }

  const checkBoxChangeHandler = label => {
    setPopularWordsState(PopularWordsState => ({
      ...PopularWordsState,
      [label]: !PopularWordsState[label]
    }))
  }

  const sourceSelector = <Select
    onChange={sourceSelectorChangeHandler}
    label='Источник'
    value={PopularWordsState.category}
    options={[
      {text: 'Lenta.ru', value: 1},
      {text: 'Риа новости', value: 2},
      {text: 'ТАСС', value: 3},
      {text: 'Комсомольская правда', value: 4},
    ]}
  />

  const analyzeSelector = <Select
    onChange={analyzeSelectorChangeHandler}
    label='Анализ по:'
    value={PopularWordsState.category}
    options={[
      {text: 'По заголовку', value: 1},
      {text: 'По тексту', value: 2},
    ]}
  />

  const WordCount = <Input
    onChange={event => WordsCountChangeHandler(event)}
    label='Слов:'
    index={'count' + 1}
    type='number'
    step={1}
    min={2}
    max={30}
  />

  const NewsCount = <Input
    onChange={event => NewsCountChangeHandler(event)}
    label='Новостей:'
    index={'count' + 1}
    type='number'
    step={20}
    min={20}
    max={400}
  />

  const checkBox = <CheckBox
    checkBoxChangeHandler={checkBoxChangeHandler}
    options={[
      {label: 'Nouns', text: 'Существительные'},
      {label: 'Verbs', text: 'Глаголы'},
      {label: 'Percent', text: 'Отобразить в процентах'},
    ]}
  >
    Параметры анализатора:
  </CheckBox>

  return (
    <div className='PopularWords'>
      <div className="PopularWordsToolBar">
        { sourceSelector }
        { analyzeSelector }
        { NewsCount }
        { WordCount }
        <span className="break"/>
        { checkBox }
        <Button onClick={FetchAnalyzeSettings}>Анализ</Button>
      </div>

      <div className='PopularWordsCharts'>

        { loader.loader
          ? <Loader/>
          : chartSetting
            ? (
          <>
            <DoughnutChart chartSetting={chartSetting.items}/>
            <VerticalBarCharts
              title='топ слов'
              chartSetting={chartSetting.items}
              label={`Анализ ${chartSetting.words_count} слов.`}/>
          </>
        )
            : null}
      </div>
    </div>
  );
};

export default PopularWords;