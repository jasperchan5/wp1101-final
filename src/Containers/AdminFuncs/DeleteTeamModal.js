import React, { useState } from 'react';
import { Modal, Button, Input, message } from 'antd';
import { DELETE_TEAM_MUTATION } from '../../graphql/index';
import { useMutation } from '@apollo/client';

const DeleteTeamModal = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentName, setCurrentName] = useState("");
    const [deleteTeam] = useMutation(DELETE_TEAM_MUTATION);

    const showModal = () => {
        setIsModalVisible(true);
    };
  
    const handleOk = () => {
        deleteTeam({variables:{name: currentName}})?setIsModalVisible(false):message.error('隊伍不存在')
        setCurrentName("");
    };
  
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
      <>
        <Button className="system__margins" onClick={showModal} >刪除隊伍</Button> 
        <Modal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <div style={{fontSize: "0.5cm"}}>輸入隊伍名稱:</div>
            <Input value={currentName} onChange={(e) => setCurrentName(e.target.value)}></Input>
        </Modal>
      </>
    );
}

export default DeleteTeamModal;