import React, {useEffect, useState} from 'react';
import loadable from "@loadable/component";
//Redux
import {fetchAnalyzeSettings, fetchCategoriesList} from "../store/actions/FetchActions";
import {connect} from "react-redux";
import Icon from "../components/Icon/Icon";
//MUI components
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  InputLabel,
  LinearProgress,
  MenuItem, OutlinedInput,
  Select,
  Switch,
} from "@mui/material";
//Charts components
import DoughnutChart from "../components/Charts/DoughnutChart/DoughnutChart";
import VerticalBarCharts from"../components/Charts/VerticalBarChart/VerticalBarChart";
import LineChart from "../components/Charts/LineChart/LineChart";

const ActivityByCategories = props => {
  const [analyzeSettings, setAnalyzeSettings] = useState({
    Source: 1,
    AnalyzeBy: 'by_day',
    Categories: [1, 2]
  })

  const [multiselectState, setMultiselectState] = useState({
    allCategories: [],
    allSelect: false
  })

  const [switchState, setSwitchState] = useState({
    Doughnut: true,
    VerticalBar: true,
    Line: false
  })

  useEffect (() => {
    props.fetchCategoriesList()
  }, [])

  useEffect(() => {
      setAnalyzeSettings(analyzeSettings => ({
        ...analyzeSettings,
        Categories: props.options.slice(0, 5).map(item => item.id)
      }))

  }, [props.options])

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
        let i = 0
        i++
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

  const multiselectAllHandler = () => {
    setMultiselectState(multiselectState => ({
      ...multiselectState,
      allSelect: !multiselectState.allSelect
    }))
    if(!multiselectState.allSelect){
      setAnalyzeSettings(analyzeSettings => ({
        ...analyzeSettings,
        Categories: props.options.map(item => item.id)
      }))
    } else if (multiselectState.allSelect)
      setAnalyzeSettings(analyzeSettings => ({
        ...analyzeSettings,
        Categories: []
      }))
  }

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const handleChange = event => {
    const {target: { value }} = event;
    setAnalyzeSettings(analyzeSettings => ({
      ...analyzeSettings,
        Categories: typeof value === 'string' ? value.split(',') : value,
    }));
  };

  const multiselect =
    <FormControl size='small' sx={{ width: 300 }}>
      <InputLabel id="category-multiple-label" error={analyzeSettings.Categories.length == 0 && !props.multipleLoading}>Категории</InputLabel>
      <Select
        labelId="category-multiple-label"
        id="category-multiple"
        multiple
        error={analyzeSettings.Categories.length == 0 && !props.multipleLoading}
        value={analyzeSettings.Categories}
        onChange={event => handleChange(event)}
        input={<OutlinedInput label="Категории"/>}
        MenuProps={MenuProps}
      >
        <MenuItem onClick={multiselectAllHandler}  id="allCheckbox" sx={{height: '36px'}}>
          <Checkbox checked={multiselectState.allSelect}/>
          <label htmlFor={'allCheckbox'}>Выбрать все</label>
        </MenuItem>
        {props.options.map(item => (
          <MenuItem key={item.name} value={item.id} >
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>


  return (
    <div className='PageWrapper'>
      { props.loading ? <Box sx={{ width: '100%', position: 'absolute', top: 62, left: 0 }}><LinearProgress /></Box> : null}
      <Box className='ToolBar' sx={{width: '95%',m: '16px 0',display: 'flex', flexWrap: 'wrap', background: '#fff', borderRadius: '15px', boxShadow: 3 }}>
        { sourceSelector }
        { analyzeSelector }
        { multiselect }
        <span className="break"/>
        <Box>{ SwitchGroup }</Box>
        <Button
          variant="contained"
          size="large"
          disabled={analyzeSettings.Categories.length == 0 && !props.multipleLoading}
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
    options: state.ActivityByCategories.options,
    chartSettings: state.ActivityByCategories.chartSettings,
    loading: state.ActivityByCategories.loading,
    multipleLoading: state.ActivityByCategories.multipleLoading
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchCategoriesList: () => dispatch(fetchCategoriesList()),
    fetchAnalyzeSettings: analyzeSettings => dispatch(fetchAnalyzeSettings(analyzeSettings, 'category-activity'))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivityByCategories);