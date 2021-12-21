import React, { useEffect, useState } from 'react';
import { Button, Input, Calendar, Layout, Modal } from "antd"
import { Header, Content, Footer } from 'antd/lib/layout/layout';
import "../node_modules/antd/dist/antd.css";
<<<<<<< HEAD
import SearchType from './SearchTypePage';
=======
import CalendarModal from './CalendarModal';
>>>>>>> 7cad52d15c9b21b4b75f3ee85d2c0ca45966eacb

const Options = ({setLogin, teamName}) => {
    //是否是選擇時間登記
    const [register, setRegister] = useState(false);
    //是否是選擇結果查詢
    const [search, setSearch] = useState(false);
<<<<<<< HEAD
  
   

=======
    const [queryValue,setQueryValue] = useState("");
    const [currentDate, setCurrentDate] = useState("");
    const [isModalVisible,setIsModalVisible] = useState(false);
    
>>>>>>> 7cad52d15c9b21b4b75f3ee85d2c0ca45966eacb
    const OptionPage = <>
        <Layout>
            <Header className="system__title">功能列表</Header>
            <Layout > 
                <Content className="system__app">
                    <Button className="system__margins" onClick={() => {
                        setRegister(true);
                        }}>Register</Button>
                    <Button className="system__margins" onClick={() => {
                        setSearch(true);
                        }}>Search</Button>
                    <Button className="system__margins" onClick={() => {
                        setLogin(false);
                        setRegister(false);
                        }}>Log Out</Button>
                </Content>
            </Layout>
            <Footer><h5 style={{fontFamily: "sans-serif"}}>Now log in as: {teamName}</h5></Footer>
        </Layout>
    </>

    const MainPage = <>
        <Layout>
            <Header className="system__title">{currentDate}競賽匹配系統</Header>
            <br></br>
            <Layout>
                <Content className='system__calendar'><Calendar fullscreen={false} onSelect={(e)=>{
                    // setCurrentDate(e);
                    setIsModalVisible(true);
                    console.log(isModalVisible);
                    }}></Calendar>{isModalVisible?<CalendarModal></CalendarModal>:<></>}</Content>
            </Layout>
            <Footer className='col-md-12 system__title'>   
                <Button className="system__margins" onClick={() => {
                    setRegister(false);
                    }}>Back to options</Button>
            </Footer>
            <Footer><h5 style={{fontFamily: "sans-serif"}}>Now log in as: {teamName}</h5></Footer>
        </Layout>
    </>

    const AdminMainPage = <>
        <Layout>
        <Header className="system__title">{currentDate}競賽匹配系統</Header>
            <br></br>
            <Layout>
                <Content className='system__calendar'><Calendar fullscreen={false} onSelect={(e)=>{
                    // setCurrentDate(e);
                    setIsModalVisible(true);
                    }}></Calendar></Content>
            </Layout>
            <Footer className='col-md-12 system__title'>
                <Button className="system__margins" onClick={() => {
                    setRegister(false);
                    }}>Add new team</Button>    
                <Button className="system__margins" onClick={() => {
                    setRegister(false);
                    }}>Back to options</Button>
                <Button className="system__margins" onClick={() => {
                    setRegister(false);
                    }}>Delete team</Button>
            </Footer>
            <Footer><h5 style={{fontFamily: "sans-serif"}}>Now log in as: {teamName}</h5></Footer>
        </Layout>
    </>

    return (<>
<<<<<<< HEAD
        <h5 style={{fontFamily: "sans-serif"}}>Now log in as: {teamName}</h5>
        {register?(teamName === "Admin"?AdminMainPage:MainPage):(search?<SearchType setSearch={setSearch}/>:OptionPage)}
=======
        {register?(teamName === "Admin"?AdminMainPage:MainPage):(search?SearchPage:OptionPage)}
>>>>>>> 7cad52d15c9b21b4b75f3ee85d2c0ca45966eacb
    </>)
}

export default Options;













