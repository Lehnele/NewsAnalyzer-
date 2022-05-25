import React, {useState} from 'react';
import loadable from "@loadable/component";
//Redux
import {connect} from "react-redux";
import {fetchAnalyzeSettings} from "../store/actions/FetchActions";
import Icon from "../components/Icon/Icon";
//MUI components
import {
  Box, Button,
  FormControl,
  FormControlLabel,
  FormGroup, FormHelperText,
  FormLabel,
  InputLabel, LinearProgress,
  MenuItem,
  Select,
  Switch
} from "@mui/material";
//Charts components
import DoughnutChart from "../components/Charts/DoughnutChart/DoughnutChart";
import VerticalBarCharts from"../components/Charts/VerticalBarChart/VerticalBarChart";
import LineChart from "../components/Charts/LineChart/LineChart";

const Activity = props => {
  const [analyzeSettings, setAnalyzeSettings] = useState({
    Source: 1,
    AnalyzeBy: 'by_day'
  })

  const [switchState, setSwitchState] = useState({
    Doughnut: true,
    VerticalBar: true,
    Line: false
  })

  const periodSelectorChangeHandler = event => {
    let chose = '';
    if(+event.target.value == 1) {
      chose = 'by_day'
    } else if(+event.target.value == 2) {
      chose = 'by_week'
    } else if(+event.target.value == 3) {
      chose = 'by_month'
    }

    setAnalyzeSettings(analyzeSettings => ({
      ...analyzeSettings,
      AnalyzeBy: chose
    }))
  }

  const sourceSelectorChangeHandler = event => {
    setAnalyzeSettings(analyzeSettings => ({
      ...analyzeSettings,
      Source: +event.target.value
    }))
  }

  const switchChangeHandler = event => {
    setSwitchState(switchState => ({
      ...switchState,
      [event.target.name]: !switchState[event.target.name]
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
      value={analyzeSettings.AnalyzeBy == "by_day" ? 1 : analyzeSettings.AnalyzeBy == 'by_week' ? 2 : 3}
      label="Анализ по"
      onChange={periodSelectorChangeHandler}
    >
      <MenuItem value={1}>День</MenuItem>
      <MenuItem value={2}>Неделя</MenuItem>
      <MenuItem value={3}>Месяц</MenuItem>
    </Select>
  </FormControl>

  const SwitchGroup = <FormControl component="fieldset" variant="standard">
    <FormLabel component="legend">Параметры отображения:</FormLabel>
    <FormGroup sx={{
      display: 'flex', flexDirection: 'row', justifyContent: 'space-around'
    }}>
      { [
        {name: 'Doughnut', label: 'Круговая'},
        {name: 'VerticalBar', label: 'Столбчатая'},
        {name: 'Line', label: 'Кривая'},
      ].map(item => {
        return (
          <FormControlLabel
            key={item.label}
            control={
              <Switch checked={switchState[item.name]} onChange={switchChangeHandler} name={item.name} />
            }
            label={item.label}
          />
        )
      }) }
    </FormGroup>
    <FormHelperText>Выберите нужные параметры.</FormHelperText>
  </FormControl>

  return (
    <div className='PageWrapper'>
      { props.loading ? <Box sx={{ width: '100%', position: 'absolute', top: 62, left: 0 }}><LinearProgress /></Box> : null}
      <Box className='ToolBar' sx={{width: '95%',m: '16px 0',display: 'flex', flexWrap: 'wrap', background: '#fff', borderRadius: '15px', boxShadow: 3 }}>
        { sourceSelector }
        { analyzeSelector }
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
              { switchState.Doughnut ? <DoughnutChart chartSetting={props.chartSettings.items}/> : null }
              { switchState.VerticalBar ? <VerticalBarCharts title = 'анализатора активности' chartSetting={props.chartSettings.items} label={`Анализ за ${props.chartSettings.analyzed_period}`}/> : null }
              { switchState.Line ? <LineChart title = 'анализатора активности' chartSetting={props.chartSettings.items} label={`Анализ за ${props.chartSettings.analyzed_period}`}/> : null }
        </Box>
        ) : <Icon/>}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    chartSettings: state.Activity.chartSettings,
    loading: state.Activity.loading
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchAnalyzeSettings: analyzeSettings => dispatch(fetchAnalyzeSettings(analyzeSettings, 'period-activity'))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Activity);