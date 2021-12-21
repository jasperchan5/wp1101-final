import React, { useEffect, useState } from 'react';
import './App.css';
import './bootstrap.css';
import Options from './PageOptions';
import { Input, Layout } from "antd";
import "../node_modules/antd/dist/antd.css";


function App() {
  const [login, setLogin] = useState(false);
  const [teamName, setTeamName] = useState('')

  const LoginPage = <>
      <div className="system__title">請登入</div>
        <div className="system__app">
          <Input.Search 
            placeholder="Enter your team name"
            enterButton="Log In"
            size='large'
            onSearch={(e) => {
              setLogin(true);
              }}
            onChange={(e) => {setTeamName(e.target.value)}}
          ></Input.Search>
      </div>
  </>

  return (
     <Layout style={{height: "100vh"}}>
        {login?<Options setLogin={setLogin} teamName={teamName}/>:LoginPage}
     </Layout>
    
  );
}

export default App;
