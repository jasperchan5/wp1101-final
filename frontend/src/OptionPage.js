import React, { useEffect, useState } from 'react';
import Calendar from './Calendar/Calendar.js';

const Options = ({setLogin}) => {
    const [register, setRegister] = useState(false);
    const [search, setSearch] = useState(false);

    const OptionPage = <div>
        <button onClick={() => {
            setRegister(true);
            }}>Register</button>
        <button onClick={() => {
            setSearch(true);
            }}>Search</button>
        <button onClick={() => {
            setLogin(false);
            setRegister(false);
            }}>Log Out</button>
    </div>

    const MainPage = <div>
        <div className="system__title">競賽匹配系統</div>
        <div className="row"><Calendar/></div>
        <button onClick={() => {
            setRegister(false);
            }}>Back to options</button>
    </div>

    const SearchPage = <div>
        <h1>D1ck pu55y pen15</h1>
        <button onClick={() => {
            setSearch(false);
            }}>Back to options</button>
    </div>
    return register?MainPage:(search?SearchPage:OptionPage)
}

export default Options