import './App.css';
import React, { useState } from 'react'
import Navbar from './component/Navbar';
import LoadingBar from 'react-top-loading-bar'
import News from './component/News';
// import React from "react";
import {BrowserRouter as Router,Routes,Route,} from "react-router-dom";


const App = () => { 
  const api = process.env.REACT_APP_NEWS_API;
  const [progress, setProgress] = useState(0)

    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar
        color='#f11946'
        progress={progress}
        // onLoaderFinished={() => setProgress(0)}
      />

          <Routes>
            <Route exact path="/" element={<News setProgress={ setProgress}  key="general" pageSize={9} country="us" category="general" api={ api} />} />
            <Route exact path="/business" element={<News setProgress={ setProgress}  key="business" pageSize={9} country="us" category="business"  api={ api}  />} />
            <Route exact path="/entertainment" element={<News setProgress={ setProgress}  key="entertainment" pageSize={9} country="us" category="entertainment"  api={ api}  />} />
            <Route exact path="/general" element={<News setProgress={ setProgress}  key="general" pageSize={9} country="us" category="general"  api={ api}  />} />
            <Route exact path="/health" element={<News setProgress={ setProgress}  key="health" pageSize={9} country="us" category="health"  api={ api}  />} />
            <Route exact path="/science" element={<News setProgress={ setProgress}  key="science" pageSize={9} country="us" category="science"  api={ api}  />} />
            <Route exact path="/sports" element={<News setProgress={ setProgress}  key="sports" pageSize={9} country="us" category="sports"  api={ api}  />} />
            <Route exact path="/technology" element={<News setProgress={ setProgress}  key="technology" pageSize={9} country="us" category="technology"  api={ api}  />} />
          </Routes>

        </Router>
      </div>
    )
  }

export default App;
