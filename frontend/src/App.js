import React, { useEffect, useState } from 'react';
import './App.css';
import './bootstrap.css'
import Calendar from './Calendar/Calendar.js';

function App() {
  const [login, setLogin] = useState(false);

  const Login = <div>
    <div className="system__title">請登入</div>
    <button onClick={() => setLogin(true)}>Log In</button>
  </div>

  const MainPage = <div>
    <div className="system__title">競賽匹配系統</div>
    <div className="row"><Calendar/></div>
    <button onClick={() => setLogin(false)}>Log Out</button>
  </div>

  return (
    login?MainPage:Login
  );
}

export default App;
