import Layout from "./hoc/Layout/Layout";
//Pages
import PopularWords from './pages/PopularWords/PopularWords';
import Activity from './pages/Activity/Activity';
import ActivityByCategories from './pages/ActivityByCategories/ActivityByCategories';
//===================================================
import {Routes, Route, Navigate} from 'react-router-dom';

function App() {
  let routes = (
    <Routes>
      <Route activeClass="active" path='/' element={<PopularWords/>}/>
      <Route activeClass="active" path='/activity' element={<Activity/>}/>
      <Route activeClass="active" path='/news' element={<ActivityByCategories/>}/>
      <Route activeClass="active" path='*' element={<Navigate replace to="/" />} />
    </Routes>
  )

  return (
    <div className="App">
      <Layout>
        { routes }
      </Layout>
    </div>
  );
}

export default App;
