import React, { useEffect, useState } from 'react';
import { Button, Input, Calendar, Layout, Modal } from "antd"
import { Header, Content, Footer } from 'antd/lib/layout/layout';
import "../node_modules/antd/dist/antd.css";
import SearchType from './SearchTypePage';
import CalendarModal from './CalendarFuncs/CalendarModal';
import moment from 'moment';

const Options = ({setLogin, teamName}) => {
    //是否是選擇時間登記
    const [register, setRegister] = useState(false);
    //是否是選擇結果查詢
    const [search, setSearch] = useState(false);
    const [currentDate, setCurrentDate] = useState("");
    const [isModalVisible,setIsModalVisible] = useState(false);

    const selectedDays = [];

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
                <Content className='system__calendar'><Calendar 
                fullscreen={false} 
                onSelect={(e)=>{
                    let curr = [e.year(),e.month(),e.date()];
                    let found = false, index = -1;
                    for(let i=0;i<selectedDays.length;i++){
                        if(selectedDays[i][0] === curr[0] && selectedDays[i][1] === curr[1] && selectedDays[i][2] === curr[2]){
                            found = true;
                            index = i;
                        }
                    }
                    if(found){
                        selectedDays.splice(index,1);
                    }
                    else{
                        selectedDays.push(curr);
                    }
                    console.log(selectedDays);
                    }}
                disabledDate={(time) => {
                    return time < moment().subtract(1,"days");
                }}
                dateCellRender={(e) => {
                    for(let i=0;i<selectedDays.length;i++){
                        if(e.year() === selectedDays[i][0] && e.month() === selectedDays[i][1] && e.date() === selectedDays[i][2]){
                            return(
                                <h5>√</h5>
                            )
                        }
                    }
                }}
                    ></Calendar></Content>
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
            <Content className='system__calendar'><Calendar 
                fullscreen={false} 
                onSelect={(e)=>{
                    let curr = [e.year(),e.month(),e.date()];
                    let found = false, index = -1;
                    for(let i=0;i<selectedDays.length;i++){
                        if(selectedDays[i][0] === curr[0] && selectedDays[i][1] === curr[1] && selectedDays[i][2] === curr[2]){
                            found = true;
                            index = i;
                        }
                    }
                    if(found){
                        selectedDays.splice(index,1);
                    }
                    else{
                        selectedDays.push(curr);
                    }
                    console.log(selectedDays);
                    }}
                disabledDate={(time) => {
                    return time < moment().subtract(1,"days");
                }}
                dateCellRender={(e) => {
                    for(let i=0;i<selectedDays.length;i++){
                        if(e.year() === selectedDays[i][0] && e.month() === selectedDays[i][1] && e.date() === selectedDays[i][2]){
                            return(
                                <h5>√</h5>
                            )
                        }
                    }
                }}
                    ></Calendar></Content>
            </Layout>
            <Footer className='col-md-12 system__title'>
                <Button className="system__margins" onClick={() => {
                    }}>Add new team</Button>    
                <Button className="system__margins" onClick={() => {
                    setRegister(false);
                    }}>Back to options</Button>
                <Button className="system__margins" onClick={() => {
                    }}>Delete team</Button>
            </Footer>
            <Footer><h5 style={{fontFamily: "sans-serif"}}>Now log in as: {teamName}</h5></Footer>
        </Layout>
    </>

    return (<>
        {register?(teamName === "Admin"?AdminMainPage:MainPage):(search?<SearchType setSearch={setSearch}/>:OptionPage)}
    </>)
}

export default Options;













