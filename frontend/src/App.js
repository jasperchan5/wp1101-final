import React, { useEffect, useState } from 'react';
import './App.css';
import './bootstrap.css'
import jquery from 'jquery'
import $ from 'jquery'
import moment from 'moment'
import fullcalendar from 'fullcalendar'

function App() {

  useEffect(() => {
    $('#calendar').fullCalendar();
  }, []);
  
  return (
    <div>
      <div className="system__title">競賽匹配系統</div>
      <div id="calendar"></div>
    </div>
    
  );
}

export default App;
