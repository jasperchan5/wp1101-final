import React, { useEffect, useState } from 'react';
import '../App.css';
import '../bootstrap.css';
import Options from './PageOptions';
import { Input, Layout, message } from "antd";
import { Header, Content, Footer } from 'antd/lib/layout/layout';
import "antd/dist/antd.css";


import { useQuery } from '@apollo/client';
import { ALLTEAM_QUERY } from '../graphql/queries';

function App() {
  const [login, setLogin] = useState(false);
  const [teamName, setTeamName] = useState('');
  const { data, loading } = useQuery(ALLTEAM_QUERY);

  const LoginPage = <>
      <Layout>
        <Header className="system__title" style={{backgroundColor: "transparent"}}>登入</Header>
        <Layout>
          <Content className="system__app">
            <Input.Search 
              placeholder="輸入隊名..."
              enterButton="登入"
              size='large'
              onSearch={async (e) => {
                  let found = false;
                  data.allTeam.forEach((i) => {
                    if(i.team === e){
                      found = true;
                    }
                  });
                  if(e!==""){
                    if(found || e === 'Admin')
                      setLogin(true);                                                                                                     
                    else message.error('不在名單中');
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
  if(loading) return <p>loading...</p>

  // console.log(data);

  return (
    login?<Options setLogin={setLogin} teamName={teamName}/>:LoginPage
  );
}

export default App;
