import React, { useEffect, useState } from 'react';
import './App.css';
import './bootstrap.css'
import Calendar from './Calendar/Calendar.js';

function App() {
  
  return (
    <div>
      <div className="system__title">競賽匹配系統</div>
      <div className="row"><Calendar/></div>
    </div>
    
  );
}

export default App;
