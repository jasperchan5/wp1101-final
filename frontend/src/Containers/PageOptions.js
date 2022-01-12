import React, { useEffect, useState } from 'react';
import { Button, Layout, Modal, DatePicker, Space } from "antd"
import { Header, Content, Footer } from 'antd/lib/layout/layout';
import "antd/dist/antd.css";
import SearchType from './SearchTypePage';
import CalendarBody from './CalendarFuncs/CalendarBody';
import CalendarModal from './CalendarFuncs/CalendarModal';
import NewTeamModal from './AdminFuncs/NewTeamModal'
import DeleteTeamModal from './AdminFuncs/DeleteTeamModal';

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
                            team: teamName,
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
    const [isModalVisible,setIsModalVisible] = useState(false);

    const OptionPage = <>
        <Layout>
            <Header className="system__title" style={{backgroundColor: "transparent"}}>功能列表</Header>
            <Layout > 
                <Content className="system__app">
                    <Button className="system__margins" onClick={() => {
                        setRegister(true);
                        }}>登記</Button>
                    <Button className="system__margins" onClick={() => {
                        setSearch(true);
                        }}>查詢</Button>
                    <Button className="system__margins" onClick={() => {
                        setLogin(false);
                        setRegister(false);
                        }}>登出</Button>
                </Content>
            </Layout>
            <Footer><h5 id='identity' style={{fontFamily: "sans-serif"}}>Now log in as: {teamName}</h5></Footer>
        </Layout>
    </>

    if(loading) return <p>loading...</p>

    const MainPage = <>
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

    const AdminMainPage = <>
        <Layout>
        <Header className="system__title" style={{backgroundColor: "transparent"}}>競賽匹配系統</Header>
            <br></br>
            <Layout>
                <Content className='system__calendar'><CalendarModal></CalendarModal><CalendarBody teamName={teamName} preTime={data.teamTime.time}></CalendarBody></Content>
            </Layout>
            <Footer className='col-md-12 system__title'>
                <NewTeamModal></NewTeamModal>  
                <Button className="system__margins" onClick={() => {
                    setRegister(false);
                    }}>返回功能列表</Button>
                <DeleteTeamModal></DeleteTeamModal>
            </Footer>
            <Footer><h5 id='identity' style={{fontFamily: "sans-serif"}}>Now log in as: {teamName}</h5></Footer>
        </Layout>
    </>

    return (<>
        {register?(teamName === "Admin"?AdminMainPage:MainPage):(search?<SearchType setSearch={setSearch} teamName={teamName}/>:OptionPage)}
    </>)
}

export default Options;













