import { Calendar, Button, Tag, Row, Col } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";

import { UPDATE_TIME_MUTATION } from "../../graphql/index";
import { useQuery, useMutation } from "@apollo/client";

export default ({teamName, preTime}) => {
    const [selectedDays, setSelectedDays] = useState([])
    const [selectedDaysInDateForm, setSelectedDaysInDateForm] = useState(preTime)

    const [updateTime] = useMutation(UPDATE_TIME_MUTATION)
    useEffect(() => {
        if(selectedDaysInDateForm.length !== 0){
            let curr = []
            selectedDaysInDateForm.forEach((k) => {
                let splitedK = k.split("/");
                curr.push([parseInt(splitedK[0]),parseInt(splitedK[1])-1,parseInt(splitedK[2])])
            })
            setSelectedDays([...selectedDays, ...curr])
        }
    }, []);
    
    // console.log(selectedDays);

    const handleOnclick = () => {
        let resultData = [];

        const n = selectedDays.length;

        for (var i =0; i < n; i++) {
            resultData.push(selectedDays[i]);
        }
       
        for(let i=0;i<n-1;i++) {
            for(let j=0;j<n-1-i;j++) {
                if(resultData[j][0] > resultData[j+1][0]) {
                    const temp = resultData[j];
                    resultData[j] = resultData[j+1];
                    resultData[j+1] = temp;
                }else if(resultData[j][0] === resultData[j+1][0]) {
                    if(resultData[j][1] > resultData[j+1][1]) {
                        const temp = resultData[j];
                        resultData[j] = resultData[j+1];
                        resultData[j+1] = temp;
                    }else if(resultData[j][1] === resultData[j+1][1]) {
                        if(resultData[j][2] > resultData[j+1][2]) {
                            const temp = resultData[j];
                            resultData[j] = resultData[j+1];
                            resultData[j+1] = temp;
                        }else if(resultData[j][2] === resultData[j+1][2]) {
                            resultData.slice(j);
                        }
                    }
                }
            }
        }

        let dbData = [];
        resultData.forEach((i) => {
            const currDate = `${i[0]}/${i[1]+1}/${i[2]}`;
            dbData.push(currDate);
        })

        updateTime({variables: {
            name: teamName,
            time: dbData
        }});
    }
    
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
                        handleOnclick();
                    }}
                >儲存登記結果</Button>
            </Col>
        </Row>
    </>
    )
}