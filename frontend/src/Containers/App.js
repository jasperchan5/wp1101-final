import React, { useEffect, useState } from 'react';
import '../App.css';
import '../bootstrap.css';
import Options from './PageOptions';
import { Input, Layout, message, Tag, Card, Image, Space } from "antd";
import { LoginOutlined } from '@ant-design/icons';
import { Header, Content, Footer } from 'antd/lib/layout/layout';
import "antd/dist/antd.css";


import { useQuery } from '@apollo/client';
import { TEAMNAME_QUERY } from '../graphql/index';

function App() {
  const [login, setLogin] = useState(false);
  const [teamName, setTeamName] = useState('');
  const { data, loading } = useQuery(TEAMNAME_QUERY);

  const LoginPage = <>
    <Layout>
      <Header className="system__title" style={{backgroundColor: "transparent"}}>歡迎使用球隊比賽匹配系統</Header>
      <Layout>
        <Content className="system__app">
          <Card title={<h3 style={{textAlign: "center", fontWeight: "bold"}}>登入</h3>}>
              <Content>
                <Input.Search 
                placeholder="輸入隊名..."
                enterButton={<LoginOutlined style={{display: "block"}}/>}
                size='large'
                onSearch={async (e) => {
                    let found = false;
                    data.teamName.forEach((i) => {
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
          </Card>
        </Content>
      </Layout>
      <Footer></Footer>
    </Layout>
  </>
  if(loading) return message.loading("Loading...", 0.5, message.success("Loaded successfully!"))

  // console.log(data);

  return (
    login?<Options setLogin={setLogin} teamName={teamName}/>:LoginPage
  );
}

export default App;
