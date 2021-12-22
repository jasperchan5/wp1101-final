import React, { useEffect, useState } from 'react';
import './App.css';
import './bootstrap.css';
import Options from './PageOptions';
import { Input, Layout, message } from "antd";
import { Header, Content, Footer } from 'antd/lib/layout/layout';
import "../node_modules/antd/dist/antd.css";

const client = new WebSocket("ws://localhost:4000");

function App() {
  const [login, setLogin] = useState(false);
  const [teamName, setTeamName] = useState('');

  const LoginPage = <>
      <Layout>
        <Header className="system__title" style={{backgroundColor: "transparent"}}>登入</Header>
        <Layout>
          <Content className="system__app">
            <Input.Search 
              placeholder="輸入隊名..."
              enterButton="登入"
              size='large'
              onSearch={(e) => {
                  if(e!==""){
                    setLogin(true);
                  }
                  else{
                    message.error("請輸入隊名",3);
                  }
                }}
              onChange={(e) => {
                setTeamName(e.target.value);
              }}
            ></Input.Search>
          </Content>
        </Layout>
        <Footer></Footer>
      </Layout>
  </>

  return (
    login?<Options setLogin={setLogin} teamName={teamName}/>:LoginPage
  );
}

export default App;
