import './App.css';

import React, { Component } from 'react'
import Navbar from './component/Navbar';
import LoadingBar from 'react-top-loading-bar'
import News from './component/News';
// import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,

} from "react-router-dom";


export default class App extends Component { 
  api = process.env.REACT_APP_NEWS_API;
  state = {
    progress:0
  }
  setProgress=(progress)=>{
    this.setState({progress:progress})
  }
  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar
        color='#f11946'
        progress={this.state.progress}
        // onLoaderFinished={() => setProgress(0)}
      />

          <Routes>
            <Route exact path="/" element={<News setProgress={this.setProgress}  key="general" pageSize={9} country="us" category="general" api={this.api} />} />
            <Route exact path="/business" element={<News setProgress={this.setProgress}  key="business" pageSize={9} country="us" category="business"  api={this.api}  />} />
            <Route exact path="/entertainment" element={<News setProgress={this.setProgress}  key="entertainment" pageSize={9} country="us" category="entertainment"  api={this.api}  />} />
            <Route exact path="/general" element={<News setProgress={this.setProgress}  key="general" pageSize={9} country="us" category="general"  api={this.api}  />} />
            <Route exact path="/health" element={<News setProgress={this.setProgress}  key="health" pageSize={9} country="us" category="health"  api={this.api}  />} />
            <Route exact path="/science" element={<News setProgress={this.setProgress}  key="science" pageSize={9} country="us" category="science"  api={this.api}  />} />
            <Route exact path="/sports" element={<News setProgress={this.setProgress}  key="sports" pageSize={9} country="us" category="sports"  api={this.api}  />} />
            <Route exact path="/technology" element={<News setProgress={this.setProgress}  key="technology" pageSize={9} country="us" category="technology"  api={this.api}  />} />
          </Routes>

        </Router>
      </div>
    )
  }
}

