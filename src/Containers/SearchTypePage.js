import React, { useEffect, useState } from 'react';
//import Calendar from './Calendar/Calendar.js';
import { Button, Layout} from "antd"
import "antd/dist/antd.css";
import { Header,Content,Footer } from 'antd/lib/layout/layout';
import MatchTable from './SearchTypeFuncs/MatchTable';
import RegisterTable from './SearchTypeFuncs/RegisterTable';

const SearchType = ({setSearch, teamName}) => {
     //查詢登記(searchALL:登記紀錄)
    const [searchAll, setsearchAll] = useState(false)
    //查詢匹配(searchSuccess:成功匹配)
    const [searchSuccess, setsearchSuccess] = useState(false)

    //查詢選項頁面
    const SearchTypePage = <>
        <Layout>
            <Header className="system__title" style={{backgroundColor: "transparent"}}>查詢選項</Header>
            <Layout>
                <Content className="system__app">
                    <Button className="system__margins" onClick={() => {
                            setsearchAll(true);
                            }}>查詢登記紀錄</Button>
                        <Button className="system__margins" onClick={() => {
                            setsearchSuccess(true);
                            }}>查詢已匹配結果</Button>
                        <Button className="system__margins" onClick={() => {
                            setSearch(false);
                            }}>返回功能列表</Button>
                    </Content>
            </Layout>
            <Footer><h5 id='identity' style={{fontFamily: "sans-serif"}}>Now log in as: {teamName}</h5></Footer>
        </Layout>
    </>
    //查詢登記紀錄頁面
    const RegisterRecordPage = <>
    <Layout>
        <Header className="system__title" style={{backgroundColor: "transparent"}}>登記執行紀錄</Header>
        <Layout className='system__table'>
            <Content><RegisterTable teamName={teamName}></RegisterTable></Content>
        </Layout>
        <Footer className="system__app"><Button className="system__margins" onClick={() => {
                        setsearchAll(false);
                        }}>返回查詢選項</Button>
            </Footer>
        <Footer><h5 id='identity' style={{fontFamily: "sans-serif"}}>Now log in as: {teamName}</h5></Footer>
    </Layout>
    </>
    //查詢已匹配結果頁面
    const MatchResult = <>
    <Layout>
        <Header className="system__title" style={{backgroundColor: "transparent"}}>已匹配結果</Header>
        <Layout className='system__table'>
            <Content><MatchTable teamName={teamName}></MatchTable></Content>
        </Layout>
        <Footer className="system__app">
        <Button className="system__margins" onClick={() => {
                        setsearchSuccess(false);
                        }}>返回查詢選項</Button>
        </Footer>
        <Footer><h5 id='identity' style={{fontFamily: "sans-serif"}}>Now log in as: {teamName}</h5></Footer>
    </Layout>
    </>


    return(<>{searchAll?RegisterRecordPage:(searchSuccess?MatchResult:SearchTypePage)}</>)
}

export default SearchType;
