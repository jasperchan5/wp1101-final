import React, { useEffect, useState } from 'react';
import './App.css';
import './bootstrap.css'
import Options from './OptionPage';

function App() {
  const [login, setLogin] = useState(false);

  const LoginPage = <div>
    <div className="system__title">請登入</div>
    <button onClick={() => {
      setLogin(true);
      }}>Log In</button>
  </div>

  return (
    login?<Options setLogin={setLogin}/>:LoginPage
  );
}

export default App;
