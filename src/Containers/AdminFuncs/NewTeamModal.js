import React, { useState } from 'react';
import { Modal, Button, Input } from 'antd';
import { CREATE_TEAM_MUTATION } from '../../graphql/index';
import { useMutation } from '@apollo/client';

const NewTeamModal = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentName, setCurrentName] = useState("");
    const [createTeam] = useMutation(CREATE_TEAM_MUTATION);

    const showModal = () => {
        setIsModalVisible(true);
    };
  
    const handleOk = () => {
        createTeam({variables:{name: currentName}});
        setIsModalVisible(false);
        setCurrentName("");
    };
  
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
      <>
        <Button className="system__margins" onClick={showModal} >新增隊伍</Button> 
        <Modal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <div style={{fontSize: "0.5cm"}}>輸入隊伍名稱:</div>
            <Input value={currentName} onChange={(e) => setCurrentName(e.target.value)}></Input>
        </Modal>
      </>
    );
}

export default NewTeamModal;