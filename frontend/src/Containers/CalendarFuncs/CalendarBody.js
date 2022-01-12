import { Calendar, Button, Tag, Row, Col } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";

import { ALLTEAM_QUERY } from "../../graphql/queries";
import { UPDATE_TIME_MUTATION } from "../../graphql/mutation";
import { useQuery, useMutation } from "@apollo/client";

export default ({teamName}) => {
    
    const [selectedDays, setSelectedDays] = useState([])
    const [selectedDaysInDateForm, setSelectedDaysInDateForm] = useState([])
    const [currentTeam,setCurrentTeam] = useState({})

    const { data, loading } = useQuery(ALLTEAM_QUERY)
    const [updateTime] = useMutation(UPDATE_TIME_MUTATION)

    // console.log(data);
    // console.log("Current team: ",currentTeam)

    useEffect(() => {
        // Search for current team in all team data, and update selected date
        if(selectedDaysInDateForm.length === 0){
            data.allTeam.forEach((j) => { 
                if(j.team === teamName){
                    setCurrentTeam(j);
                    setSelectedDaysInDateForm(j.time)

                    let curr = []
                    j.time.forEach((k) => {
                        let splitedK = k.split("/");
                        curr.push([parseInt(splitedK[0]),parseInt(splitedK[1])-1,parseInt(splitedK[2])])
                    })
                    setSelectedDays([...selectedDays, ...curr])
                }  
            })
        }
        console.log(selectedDays);
    }, [selectedDays,data]); 

    return(
    <>
        <Calendar 
            fullscreen={false} 
            onSelect={(e)=>{
                let curr = [e.year(),e.month(),e.date()];

                let currDate = `${curr[0]}/${curr[1]+1}/${curr[2]}`;
                console.log(currDate);
                
                let found = false, index = -1;
                for(let i=0;i<selectedDays.length;i++){
                    if(selectedDays[i][0] === curr[0] && selectedDays[i][1] === curr[1] && selectedDays[i][2] === curr[2]){
                        found = true;
                        index = i;
                    }
                }
                if(found){
                    setSelectedDays([...selectedDays.slice(0,index), ...selectedDays.slice(index+1)])
                    setSelectedDaysInDateForm([...selectedDaysInDateForm.slice(0,selectedDaysInDateForm.indexOf(currDate)),
                                                 ...selectedDaysInDateForm.slice(selectedDaysInDateForm.indexOf(currDate)+1)])
                }
                else{
                    setSelectedDays([...selectedDays,curr]);
                    setSelectedDaysInDateForm([...selectedDaysInDateForm,currDate]);
                }
                }}
            disabledDate={(time) => {
                return time < moment().subtract(1,"days");
            }}
            dateFullCellRender={(e) => {
                for(let i=0;i<selectedDays.length;i++){
                    if(e.year() === selectedDays[i][0] && e.month() === selectedDays[i][1] && e.date() === selectedDays[i][2]){
                        if(!e.disabled){
                            return(
                                <div style={{height: "auto", width: "auto"}}>
                                    <div style={{height: "auto", width: "55%", margin: "auto", borderRadius: "2px", backgroundColor: "#1890ff", color:"white"}}>
                                        {e.date()>=10?e.date():"0"+e.date()}
                                    </div>
                                </div>
                            )
                        }
                    }
                }
                return(<div style={{height: "auto", width: "auto", backgroundColor: "transparent"}}>{e.date()>=10?e.date():"0"+e.date()}</div>)
            }}
        ></Calendar>
        <Row>
            <Col span={6}>
                <Button 
                    disabled={selectedDays.length === 0?true:false} 
                    onClick={() => {
                        updateTime({variables: {
                            name: currentTeam.team,
                            time: selectedDaysInDateForm
                        }});
                    }}
                >儲存登記結果</Button>
            </Col>
            <Col span={12}>
                <p>請重新整理以載入已填日期！</p>
            </Col>
        </Row>
    </>
    )
}