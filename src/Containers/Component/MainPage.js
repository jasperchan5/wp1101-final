import React, { useEffect, useState } from 'react';
import { Button, Layout, Modal, DatePicker, Space, Row, Col } from "antd"
import { Header, Content, Footer } from 'antd/lib/layout/layout';
import "antd/dist/antd.css";
import CalendarBody from '../CalendarFuncs/CalendarBody';
import CalendarModal from '../CalendarFuncs/CalendarModal';
import LoginIdentity from '../LoginIdentity';

const MainPage = ({setRegister, teamName, data}) => <>
    <Layout>
        <Row>
            <Col md={24}><LoginIdentity teamName={teamName}></LoginIdentity><Header className="system__title" style={{backgroundColor: "transparent"}}>競賽匹配系統</Header></Col>
        </Row>
        <br></br>
        <Layout>
            <Content className='system__calendar'><CalendarModal></CalendarModal><CalendarBody teamName={teamName} preTime={data.teamTime.time}></CalendarBody></Content>
        </Layout>
        <Footer className='col-md-12 system__title'>   
            <Button className="system__margins" onClick={() => {
                setRegister(false);
                }}>返回功能列表</Button>
        </Footer>
    </Layout>
</>

export default MainPage