import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Layout, Row, Space, message } from "antd"
import { SendOutlined, LogoutOutlined, SearchOutlined } from '@ant-design/icons';
import { Header, Content, Footer } from 'antd/lib/layout/layout';
import "antd/dist/antd.css";
import SearchType from './SearchTypePage';
import MainPage from './Component/MainPage';
import AdminMainPage from './Component/AdminMainPage';
import LoginIdentity from './LoginIdentity';

import { TEAMTIME_QUERY, TIME_SUBSCRIPTION } from "../graphql/index";
import { useQuery } from "@apollo/client";

const Options = ({ setLogin, teamName }) => {
    const { data, loading, subscribeToMore } = useQuery(TEAMTIME_QUERY, {
        variables: {
            team: teamName
        }
    })

    useEffect(() => {
        try {
            subscribeToMore({
                document: TIME_SUBSCRIPTION,
                variables: { team: teamName },
                updateQuery: (prev, { subscriptionData }) => {
                    if(!subscriptionData) return prev;
                    const newTime = subscriptionData.data.time;

                    console.log(prev);

                    return {
                        teamTime: {
                            time: newTime,
                        },
                    }
                }
            })
        } catch (e) {}
    }, [subscribeToMore])

    //是否是選擇時間登記
    const [register, setRegister] = useState(false);
    //是否是選擇結果查詢
    const [search, setSearch] = useState(false);

    const OptionPage = <>
        <Layout>
            <Row>
                <Col md={24}><LoginIdentity teamName={teamName}></LoginIdentity><Header className="system__title" style={{backgroundColor: "transparent"}}>功能列表</Header></Col>
            </Row>
            <Layout> 
                <Content className="system__app">
                    <Row>
                        <Col md={8}> 
                            <Card title={<div style={{textAlign: "center", fontWeight: "bold"}}>登記</div>}>
                                <Row justify='center'>
                                    <Button className="system__margins" onClick={() => {
                                    setRegister(true);
                                    }} icon={<SendOutlined />}></Button></Row>
                            </Card>
                        </Col>
                        <Col md={8}>
                            <Card title={<div style={{textAlign: "center", fontWeight: "bold"}}>查詢</div>}>
                                <Row justify='center'><Button className="system__margins" onClick={() => {
                                        setSearch(true);
                                        }} icon={<SearchOutlined />}></Button></Row>
                            </Card>
                        </Col>
                        <Col md={8}>
                            <Card title={<div style={{textAlign: "center", fontWeight: "bold"}}>登出</div>}>
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

    if(loading) return message.loading("Loading...", 0.5, message.success("Loaded successfully!"))

    return (<>
        {register?(teamName === "Admin"?<AdminMainPage setRegister={setRegister} teamName={teamName} registerClosed={true}/>:<MainPage setRegister={setRegister} teamName={teamName} data={data}/>):(search?<SearchType setSearch={setSearch} teamName={teamName}/>:OptionPage)}
    </>)
}

export default Options;













