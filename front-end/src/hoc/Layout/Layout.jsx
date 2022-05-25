import React, {useEffect} from 'react';
import './Layout.css';
import Header from '../../components/header/header';
import {connect} from "react-redux";
import {getSearchHistory, setSessionCookie} from "../../store/actions/Archive";

export const Color = [
  'rgba(255, 99, 132, 0.3)',
  'rgba(54, 162, 235, 0.3)',
  'rgba(255, 206, 86, 0.3)',
  'rgba(75, 192, 192, 0.3)',
  'rgba(153, 102, 255, 0.3)',
  'rgba(255, 159, 64, 0.3)',
  'rgba(116,140,253,0.3)',
  'rgba(245,141,245,0.3)',
  'rgba(123,255,137,0.3)',
  'rgba(255,65,65,0.3)',
  'rgba(244,239,117,0.3)',
  'rgba(159,255,255,0.3)',
  'rgba(0,255,127,0.3)',
  'rgba(255,36,36,0.3)',
  'rgba(80,71,227,0.3)',
  'rgba(255,245,56,0.3)',
  'rgba(255,103,146,0.3)',
  'rgba(144,255,65,0.3)',
  'rgba(255,245,0,0.3)',
  'rgba(255,168,112,0.3)',
  'rgba(255,75,200,0.3)',
  'rgba(123,104,238,0.3)',
  'rgba(240,128,128,0.3)',
  'rgba(255,51,51,0.3)',
  'rgba(0,108,36,0.3)',
  'rgba(218,106,108,0.3)',
  'rgba(255,136,245,0.3)',
  'rgba(255,0,220,0.3)',
  'rgba(192,255,60,0.3)',
  'rgba(39,150,49,0.3)',
  'rgba(246,102,219,0.3)',
  'rgba(216,146,243,0.3)',
  'rgba(241,183,133,0.3)',
  'rgba(255,118,118,0.3)',
  'rgba(221,160,221,0.3)',
  'rgba(188,245,103,0.3)',
  'rgba(124,192,101,0.3)',
]

const Layout = props => {
  useEffect(() => {
    if(document.cookie = '') props.setSessionCookie()
    if(props.searchHistory.length == 0) props.getSearchHistory()
  }, [document.cookie])

  return (
    <div className='Layout'>
      <Header/>
      <main>
        { props.children }
      </main>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    searchHistory: state.Archive.searchHistory
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setSessionCookie: () => dispatch(setSessionCookie()),
    getSearchHistory: () => dispatch(getSearchHistory())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);