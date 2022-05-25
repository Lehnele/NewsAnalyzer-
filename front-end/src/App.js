import loadable from "@loadable/component";
//react-router
import {Routes, Route, Navigate} from 'react-router-dom';

import {Box, LinearProgress} from "@mui/material";
import React from "react";

const Layout = loadable(() => import("./hoc/Layout/Layout"), {
    fallback: <Box sx={{width: '100%', position: 'absolute', top: 62, left: 0}}><LinearProgress/></Box>
});

// import Layout from "./hoc/Layout/Layout";
//Pages
const PopularWords = loadable(() => import("./pages/PopularWords"), {
    fallback: <Box sx={{width: '100%', position: 'absolute', top: 62, left: 0}}><LinearProgress/></Box>
});
const Activity = loadable(() => import("./pages/Activity"), {
    fallback: <Box sx={{width: '100%', position: 'absolute', top: 62, left: 0}}><LinearProgress/></Box>
});
const ActivityByCategories = loadable(() => import("./pages/ActivityByCategories"), {
    fallback: <Box sx={{width: '100%', position: 'absolute', top: 62, left: 0}}><LinearProgress/></Box>
});
// import PopularWords from './pages/PopularWords';
// import Activity from './pages/Activity';
// import ActivityByCategories from './pages/ActivityByCategories';

function App() {
    let routes = (
        <Routes>
            <Route activeClass="Mui-selected" path='/popular-words' element={<PopularWords/>}/>
            <Route activeClass="Mui-selected" path='/POPULAR_WORDS' element={<Navigate replace to="/popular-words"/>}/>

            <Route activeClass="Mui-selected" path='/activity' element={<Activity/>}/>
            <Route activeClass="Mui-selected" path='/ACTIVITY' element={<Navigate replace to="/activity"/>}/>

            <Route activeClass="Mui-selected" path='/activity-by-categories' element={<ActivityByCategories/>}/>
            <Route activeClass="Mui-selected" path='/ACTIVITY_BY_CATEGORIES' element={<Navigate replace to="/activity-by-categories"/>}/>

            <Route activeClass="Mui-selected" path='*' element={<Navigate replace to="/popular-words"/>}/>
        </Routes>
    )

    return (
        <div className="App">
            <Layout>
                {routes}
            </Layout>
        </div>
    );
}

export default App;
