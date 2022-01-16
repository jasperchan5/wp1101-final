import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Layout, Row, message } from "antd"
import { SendOutlined, LogoutOutlined, SearchOutlined } from '@ant-design/icons';
import { Header, Content, Footer } from 'antd/lib/layout/layout';
import "antd/dist/antd.css";
import SearchType from './SearchTypePage';
import MainPage from './Component/MainPage';
import AdminMainPage from './Component/AdminMainPage';
import LoginIdentity from './LoginIdentity';

import { TEAMTIME_QUERY, TIME_SUBSCRIPTION, ADMINDATA_QUERY, ADMINDATA_SUBSCRIPTION } from "../graphql/index";
import { useQuery } from "@apollo/client";

const Options = ({ setLogin, teamName }) => {

    const { data: teamTimeData, loading: teamTimeLoading, subscribeToMore: teamTimeSubscribeToMore } = useQuery(TEAMTIME_QUERY, {
        variables: {
            team: teamName
        }
    })

    const { data: adminData, loading: adminDataLoading, subscribeToMore: adminDataSubscribeToMore } = useQuery(ADMINDATA_QUERY)

    useEffect(() => {
        try {
            teamTimeSubscribeToMore({
                document: TIME_SUBSCRIPTION,
                variables: { team: teamName },
                updateQuery: (prev, { subscriptionData }) => {
                    if(!subscriptionData) return prev;
                    const newTime = subscriptionData.data.time;

                    // console.log(prev);

                    return {
                        teamTime: {
                            team: prev.teamTime.team,
                            time: newTime,
                        },
                    }
                }
            })
        } catch (e) {}
    }, [teamTimeSubscribeToMore])

    useEffect(() => {
        try {
            adminDataSubscribeToMore({
                document: ADMINDATA_SUBSCRIPTION,
                updateQuery: (prev, { subscriptionData }) => {
                    if(!subscriptionData) return prev;
                    const newValue = subscriptionData.data.adminData.isRegisterClosed;

                    // console.log(prev);

                    return {
                        adminData: {
                            admin: prev.adminData.admin,
                            isRegisterClosed: newValue,
                        },
                    }
                }
            })
        } catch (e) {}
    }, [adminDataSubscribeToMore])

    //是否是選擇時間登記
    const [register, setRegister] = useState(false);
    //是否是選擇結果查詢
    const [search, setSearch] = useState(false);

    const OptionPage = <>
        <Layout>
            <Row>
                <Col md={24}><LoginIdentity teamName={teamName}></LoginIdentity><Header className="system__title" style={{backgroundColor: "transparent", fontWeight: "bold"}}>功能列表</Header></Col>
            </Row>
            <Layout> 
                <Content className="system__app">
                    <Row>
                        <Col md={12}> 
                            <Card title={<div style={{textAlign: "center", fontWeight: "bold"}}>{teamName === "Admin" ? "管理隊伍" :"登記"}</div>}>
                                <Row justify='center'>
                                    <Button className="system__margins" onClick={() => {
                                    setRegister(true);
                                    }} icon={<SendOutlined />}></Button></Row>
                            </Card>
                        </Col>
                        <Col md={12}>
                            <Card title={<div style={{textAlign: "center", fontWeight: "bold"}}>查詢</div>}>
                                <Row justify='center'><Button className="system__margins" onClick={() => {
                                        setSearch(true);
                                        }} icon={<SearchOutlined />}></Button></Row>
                            </Card>
                        </Col>
                        <Col md={12} offset={6}>
                        <Card size='cover' title={<div style={{textAlign: "center", fontWeight: "bold"}}>登出</div>}>
                            <Row justify='center'><Button className="system__margins" onClick={() => {
                                    setLogin(false);
                                    setRegister(false);
                                    }} icon={<LogoutOutlined />}></Button></Row>
                        </Card>
                    </Col>
                    </Row>
                </Content>
            </Layout>
            <Footer></Footer>
        </Layout>
    </>

    if(teamTimeLoading || adminDataLoading) return message.loading("Loading...", 1.5)

    return (<>
        {register?(teamName === "Admin"?<AdminMainPage setRegister={setRegister} teamName={teamName} registerClosed={adminData.adminData.isRegisterClosed}/>:<MainPage setRegister={setRegister} teamName={teamName} data={teamTimeData} registerClosed={adminData.adminData.isRegisterClosed}/>):(search?<SearchType setSearch={setSearch} teamName={teamName}/>:OptionPage)}
    </>)
}

export default Options;













