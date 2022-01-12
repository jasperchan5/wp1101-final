import React, { useEffect, useState } from 'react';
import { Modal, Button, Space, Input } from 'antd';
import { CREATE_TEAM_MUTATION } from '../../graphql/mutation';
import { useMutation } from '@apollo/client';

const NewTeamModal = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [createTeam] = useMutation(CREATE_TEAM_MUTATION);

    const showModal = () => {
      setIsModalVisible(true);
    };
  
    const handleOk = () => {
      setIsModalVisible(false);
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
    };

    return (
      <>
        <Button className="system__margins" onClick={showModal} >新增隊伍</Button> 
        <Modal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <div style={{fontSize: "0.5cm"}}>輸入隊伍名稱:</div>
            <Input.Search onSearch={(e) => createTeam({variables:{name: e}})}></Input.Search>
        </Modal>
      </>
    );
}

export default NewTeamModal;