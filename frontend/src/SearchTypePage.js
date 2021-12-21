import React, { useEffect, useState } from 'react';
//import Calendar from './Calendar/Calendar.js';
import {Button, Input, Calendar} from "antd"
import "../node_modules/antd/dist/antd.css";

const SearchType = ({setSearch}) => {
     //查詢登記(searchALL:登記紀錄)
    const [searchAll, setsearchAll] = useState(false)
    //查詢匹配(searchSuccess:成功匹配)
    const [searchSuccess, setsearchSuccess] = useState(false)

    //查詢選項頁面
    const SearchTypePage = <>
        <div className="system__title">查詢選項</div>
        <div className="system__app">
            <Button className="system__margins" onClick={() => {
                setsearchAll(true);
                }}>查詢登記紀錄</Button>
            <Button className="system__margins" onClick={() => {
                setsearchSuccess(true);
                }}>查詢已匹配結果</Button>
            <Button className="system__margins" onClick={() => {
                setSearch(false);
                }}>返回功能列表</Button>
            
        </div>
    </>
    //查詢登記紀錄頁面
    const RegisterRecordPage = <>
        <div className="system__title">登記執行紀錄</div>
        <div className="system__app">
            <Button className="system__margins" onClick={() => {
                setsearchAll(false);
                }}>返回查詢選項</Button>
        </div>

    </>
    //查詢已匹配結果頁面
    const MatchResult = <>
        <div className="system__title">已匹配結果</div>
        <div className="system__app">
            <Button className="system__margins" onClick={() => {
                setsearchSuccess(false);
                }}>返回查詢選項</Button>
        </div>
    </>


    return(<>{searchAll?RegisterRecordPage:(searchSuccess?MatchResult:SearchTypePage)}</>)
}

export default SearchType;
