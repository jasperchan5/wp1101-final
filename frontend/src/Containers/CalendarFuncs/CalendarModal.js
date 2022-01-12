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
  
    const handleOk = () => {
      setIsModalVisible(false);
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
    };
    
    const dateFormat = 'YYYY/MM/DD';

    return (
      <>
        <Button type="primary" onClick={showModal} style={{backgroundColor: "gray", border:"black 1px solid"}}>
            查看各隊登記詳情
        </Button>
        <Modal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <div style={{fontSize: "0.5cm"}}>選擇日期:</div>
            <DatePicker defaultValue={moment()} disabledDate={(e) => e < moment().subtract(1, "days")} format={dateFormat} onChange={(day,e) => setCurrentDate(e)}/>
            <br></br>
            <Space direction='vertical' className='system__table'>
                <div className='system__title' style={{fontSize: "0.5cm"}}>{currentDate}</div>
                <CalendarTable currentDate={currentDate}></CalendarTable>
            </Space>
        </Modal>
      </>
    );
}

export default CalendarModal;