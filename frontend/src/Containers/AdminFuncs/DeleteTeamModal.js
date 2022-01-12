import React, { useEffect, useState } from 'react';
import { Modal, Button, Space, Input } from 'antd';
import { DELETE_TEAM_MUTATION } from '../../graphql/mutation';
import { useMutation } from '@apollo/client';

const DeleteTeamModal = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [deleteTeam] = useMutation(DELETE_TEAM_MUTATION);

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
        <Button className="system__margins" onClick={showModal} >刪除隊伍</Button> 
        <Modal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <div style={{fontSize: "0.5cm"}}>輸入隊伍名稱:</div>
            <Input.Search onSearch={(e) => deleteTeam({variables:{name: e}})}></Input.Search>
        </Modal>
      </>
    );
}

export default DeleteTeamModal;