import React, { useEffect, useState } from 'react';
//import Calendar from './Calendar/Calendar.js';
import {Button, Input, Calendar} from "antd"
import "../node_modules/antd/dist/antd.css";

const Options = ({setLogin, teamName}) => {
    const [register, setRegister] = useState(false);
    const [search, setSearch] = useState(false);
    const [queryValue,setQueryValue] = useState("");

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

    const SearchPage = <>
        <div className="system__title">查詢匹配結果</div>
        <div className="system__app">
            <Input.Search
                placeholder='Enter your team name'
                onChange={(e) => {setQueryValue(e.target.value)}}
                onSearch={() => alert(queryValue)}
            ></Input.Search>
            <Button className="system__margins" onClick={() => {
                setSearch(false);
                }}>Back to options</Button>
        </div>
    </>
    return (<>
        <h5 style={{fontFamily: "sans-serif"}}>Now log in as: {teamName}</h5>
        {register?(teamName === "Admin"?AdminMainPage:MainPage):(search?SearchPage:OptionPage)}
    </>)
}

export default Options













