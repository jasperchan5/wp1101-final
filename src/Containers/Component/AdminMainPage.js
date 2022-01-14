import React, { useEffect, useState } from 'react';
import { Button, Layout, Row, Col, Checkbox, Space } from "antd"
import { Header, Content, Footer } from 'antd/lib/layout/layout';
import "antd/dist/antd.css";
import CalendarBody from '../CalendarFuncs/CalendarBody';
import CalendarModal from '../CalendarFuncs/CalendarModal';
import NewTeamModal from '../AdminFuncs/NewTeamModal'
import DeleteTeamModal from '../AdminFuncs/DeleteTeamModal';
import LoginIdentity from '../LoginIdentity';

const AdminMainPage = ({setRegister, teamName, registerClosed}) => <>
        <Layout>
            <Row>
                <Col md={24}><LoginIdentity teamName={teamName}></LoginIdentity><Header className="system__title" style={{backgroundColor: "transparent"}}>競賽匹配系統</Header></Col>
            </Row>
            <br></br>
            <Layout>
                <Content className='system__calendar'>
                    <Row>
                        <Col md={6}>
                            <CalendarModal></CalendarModal>
                        </Col>
                        <Col md={6} offset={12}>
                            <Row><Space size={8} align='start'><Checkbox defaultChecked={registerClosed}></Checkbox><h5>關閉登記</h5></Space></Row>
                        </Col>
                    </Row>
                    <CalendarBody teamName={teamName} preTime={[]}></CalendarBody>
                </Content>
            </Layout>
            <Footer className='col-md-12 system__title'>
                <NewTeamModal></NewTeamModal>  
                <Button className="system__margins" onClick={() => {
                    setRegister(false);
                    }}>返回功能列表</Button>
                <DeleteTeamModal></DeleteTeamModal>
            </Footer>
        </Layout>
    </>
    
    
export default AdminMainPage