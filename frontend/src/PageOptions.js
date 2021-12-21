import React, { useEffect, useState } from 'react';
//import Calendar from './Calendar/Calendar.js';
import {Button, Input, Calendar} from "antd"
import "../node_modules/antd/dist/antd.css";
import SearchType from './SearchTypePage';

const Options = ({setLogin, teamName}) => {
    //是否是選擇時間登記
    const [register, setRegister] = useState(false);
    //是否是選擇結果查詢
    const [search, setSearch] = useState(false);
  
   

    const OptionPage = <>
        <div className="system__title">功能列表</div>
        <div className="system__app">
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
        </div>
    </>

    const MainPage = <>
        <div className="system__title">競賽匹配系統</div>
            <div className="system__app">
            <div className="row site-calendar-demo-card"><Calendar/></div>
            <Button className="system__margins" onClick={() => {
                setRegister(false);
                }}>Back to options</Button>
        </div>
    </>

    const AdminMainPage = <>
        <div className="system__title">競賽匹配系統</div>
            <div className="system__app">
            <div><Calendar fullscreen={false}></Calendar></div>
            <div className='col-md-12 system__title'>
                <Button className="system__margins" onClick={() => {
                    setRegister(false);
                    }}>Add new team</Button>    
                <Button className="system__margins" onClick={() => {
                    setRegister(false);
                    }}>Back to options</Button>
                <Button className="system__margins" onClick={() => {
                    setRegister(false);
                    }}>Delete team</Button>
            </div>
        </div>
    </>

    return (<>
        <h5 style={{fontFamily: "sans-serif"}}>Now log in as: {teamName}</h5>
        {register?(teamName === "Admin"?AdminMainPage:MainPage):(search?<SearchType setSearch={setSearch}/>:OptionPage)}
    </>)
}

export default Options;













