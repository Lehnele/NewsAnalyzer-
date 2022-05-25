import React, {useState} from 'react';
import loadable from "@loadable/component";
//Redux
import {connect} from "react-redux";
import {fetchAnalyzeSettings} from "../store/actions/FetchActions";
import Icon from "../components/Icon/Icon";
//MUI components
import {
  Box,
  Button,
  FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel,
  InputLabel, LinearProgress,
  MenuItem,
  Select,
  Switch,
  TextField,
} from "@mui/material";
//Charts components
import DoughnutChart from "../components/Charts/DoughnutChart/DoughnutChart";
import VerticalBarCharts from"../components/Charts/VerticalBarChart/VerticalBarChart";

const PopularWords = props => {
  const [analyzeSettings, setAnalyzeSettings] = useState({
      Source: 1,
      AnalyzeBy: 'by_titles',
      NewsCount: 20,
      WordsCount: 2,
      Nouns: true,
      Verbs: true,
      Percent: false
  })

  const sourceSelectorChangeHandler = event => {
    setAnalyzeSettings(analyzeSettings => ({
      ...analyzeSettings,
      Source: +event.target.value
    }))
  }

  const analyzeSelectorChangeHandler = event => {
    let chose = '';
    if(+event.target.value == 1) {
      chose = 'by_titles'
    } else if(+event.target.value == 2) {
      chose = 'by_texts'
    }

    setAnalyzeSettings(analyzeSettings => ({
      ...analyzeSettings,
      AnalyzeBy: chose
    }))
  }

  const NewsCountChangeHandler = event => {
    if (event.target.value >= 20 && event.target.value <= 400) {
      setAnalyzeSettings(analyzeSettings => ({
        ...analyzeSettings,
        NewsCount: event.target.value,
      }))
    } else if (event.target.value < 20) {
      event.target.value = 20;
    } else if (event.target.value > 400) {
      event.target.value = 400;
    }
  }

  const WordsCountChangeHandler = event => {
    if (event.target.value >= 2 && event.target.value <= 30) {
      setAnalyzeSettings(analyzeSettings => ({
        ...analyzeSettings,
        WordsCount: event.target.value,
      }))
    } else if (event.target.value < 2) {
      event.target.value = 2;
    } else if (event.target.value > 30) {
      event.target.value = 30;
    }
  }

  const switchChangeHandler = event => {
    setAnalyzeSettings(analyzeSettings => ({
      ...analyzeSettings,
      [event.target.name]: event.target.checked
    }))
  }

  const sourceSelector = <FormControl size="small" fullWidth sx={{width: 200}}>
    <InputLabel id="source-select-label">Источник</InputLabel>
    <Select
      labelId="source-select-label"
      id="source-select"
      value={analyzeSettings.Source}
      label="Источник"
      onChange={sourceSelectorChangeHandler}
    >
      <MenuItem value={1}>Lenta.ru</MenuItem>
      <MenuItem value={2}>Риа новости</MenuItem>
      <MenuItem value={3}>ТАСС</MenuItem>
      <MenuItem value={4}>Комсомольская правда</MenuItem>
    </Select>
  </FormControl>

  const analyzeSelector = <FormControl size="small" fullWidth sx={{width: 200}}>
    <InputLabel id="analyze-select-label">Анализ по</InputLabel>
    <Select
      labelId="analyze-select-label"
      id="analyze-select"
      value={analyzeSettings.AnalyzeBy == "by_titles" ? 1 : 2}
      label="Анализ по"
      onChange={analyzeSelectorChangeHandler}
    >
      <MenuItem value={1}>Заголовку</MenuItem>
      <MenuItem value={2}>Тексту</MenuItem>
    </Select>
  </FormControl>

  const NewsCount = <TextField
    size="small"
    inputProps={{ inputMode: 'numeric', min: 20, max: 400, step: 20 }}
    onChange={event => NewsCountChangeHandler(event)}
    id="news-count"
    label="Новостей:"
    variant="outlined"
    type='number'
    value={analyzeSettings.NewsCount}
    sx={{width: 200}}
  />

  const WordsCount = <TextField
    size="small"
    inputProps={{ inputMode: 'numeric', min: 2, max: 30 }}
    onChange={event => WordsCountChangeHandler(event)}
    id="words-count"
    label='Слов:'
    variant="outlined"
    type='number'
    value={analyzeSettings.WordsCount}
    sx={{width: 200}}
  />

  const SwitchGroup = <FormControl size="small" component="fieldset" variant="standard">
    <FormLabel component="legend">Параметры анализатора:</FormLabel>
    <FormGroup sx={{
      display: 'flex', flexDirection: 'row', justifyContent: 'space-around'
    }}>
      { [
        {name: 'Nouns', label: 'Существительные'},
        {name: 'Verbs', label: 'Глаголы'},
        {name: 'Percent', label: 'Отобразить в процентах'},
      ].map(item => {
        let i = 0
        i++
        return (
          <FormControlLabel
            key={item.label}
            control={
              <Switch checked={analyzeSettings[item.name]} onChange={switchChangeHandler} name={item.name} />
            }
            label={item.label}
          />
        )
      }) }
    </FormGroup>
    <FormHelperText sx={{mt: '3px'}}>Выберите нужные параметры.</FormHelperText>
  </FormControl>

  return (
    <div className='PageWrapper'>
      { props.loading ? <Box sx={{ width: '100%', position: 'absolute', top: 62, left: 0 }}><LinearProgress /></Box> : null}
      <Box className='ToolBar' sx={{width: '95%',m: '16px 0',display: 'flex', flexWrap: 'wrap', background: '#fff', borderRadius: '15px', boxShadow: 3 }}>
        { sourceSelector }
        { analyzeSelector }
        { NewsCount }
        { WordsCount }
        <span className="break"/>
        <Box>{ SwitchGroup }</Box>
        <Button
          variant="contained"
          size="large"
          onClick={() => props.fetchAnalyzeSettings(analyzeSettings)}
          sx={{m: 'auto 50px 16px auto'}}
          disabled={props.loading}
        >
          Анализ
        </Button>
      </Box>

      {Object.keys(props.chartSettings).length != 0
        ? (
        <Box className='Charts' sx={{width: '95%',m: '16px 0',display: 'flex', flexWrap: 'wrap', background: '#fff', borderRadius: '15px', boxShadow: 3 }}>
          <DoughnutChart chartSetting={props.chartSettings.items}/>
          <VerticalBarCharts title='топ слов' chartSetting={props.chartSettings.items} label={`Анализ ${props.chartSettings.news_count} новостей.`}/>
        </Box>
        ) : <Icon/>}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    chartSettings: state.PopularWords.chartSettings,
    cancel: state.cancel,
    loading: state.PopularWords.loading
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchAnalyzeSettings: analyzeSettings => dispatch(fetchAnalyzeSettings(analyzeSettings, 'top-words'))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PopularWords);