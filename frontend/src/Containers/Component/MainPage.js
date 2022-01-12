import React, { useEffect, useState } from 'react';
import { Button, Layout, Modal, DatePicker, Space } from "antd"
import { Header, Content, Footer } from 'antd/lib/layout/layout';
import "antd/dist/antd.css";
import CalendarBody from '../CalendarFuncs/CalendarBody';
import CalendarModal from '../CalendarFuncs/CalendarModal';

const MainPage = ({setRegister, teamName, data}) => <>
    <Layout>
        <Header className="system__title" style={{backgroundColor: "transparent"}}>競賽匹配系統</Header>
        <br></br>
        <Layout>
            <Content className='system__calendar'><CalendarModal></CalendarModal><CalendarBody teamName={teamName} preTime={data.teamTime.time}></CalendarBody></Content>
        </Layout>
        <Footer className='col-md-12 system__title'>   
            <Button className="system__margins" onClick={() => {
                setRegister(false);
                }}>返回功能列表</Button>
        </Footer>
        <Footer><h5 id='identity' style={{fontFamily: "sans-serif"}}>Now log in as: {teamName}</h5></Footer>
    </Layout>
</>

export default MainPage