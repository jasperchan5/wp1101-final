import React, { useEffect, useState } from 'react';
import { Modal, Button, DatePicker, Space } from 'antd';
import moment from 'moment';
import CalendarTable from './CalendarTable';

const CalendarModal = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentDate, setCurrentDate] = useState(`${moment().year()}/${moment().month()+1}/${moment().date()}`);
    
    const showModal = () => {
      setIsModalVisible(true);
    };

    const handleCancel = () => {
      setIsModalVisible(false);
    };
    
    const dateFormat = 'YYYY/MM/DD';

    return (
      <>
        <Button type="primary" onClick={showModal} style={{backgroundColor: "#0050b3", border:"black 1px solid"}}>
            查看各隊登記詳情
        </Button>
        <Modal visible={isModalVisible} onCancel={handleCancel} footer={null} bodyStyle={{height: "450px"}}>
            <div style={{fontSize: "0.5cm"}}>選擇日期:</div>
            <DatePicker
              defaultValue={moment()}
              disabledDate={(e) => e < moment().subtract(1, "days")}
              format={dateFormat} onChange={(day,e) => {
                let firstSlash = e.indexOf('/');
                let dateString = '';
                if(e[firstSlash + 1] === '0'){
                  dateString = e.slice(0, firstSlash + 1) + e.slice(firstSlash + 2);
                }else{
                  dateString = e;
                }
                setCurrentDate(dateString);
              }}
            />
            <br></br>
            <Space direction='vertical' className='system__table' style={{width: '95%'}} >
                <div className='system__title' style={{fontSize: "0.5cm"}}>{currentDate}</div>
                <CalendarTable currentDate={currentDate}></CalendarTable>
            </Space>
            <br></br><br></br>
        </Modal>
      </>
    );
}

export default CalendarModal;