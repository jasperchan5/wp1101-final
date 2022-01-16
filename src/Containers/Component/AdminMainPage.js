import { Button, Layout, Row, Col, Table, message, Tag } from "antd"
import { Header, Content, Footer } from 'antd/lib/layout/layout';
import "antd/dist/antd.css";
import LoginIdentity from '../LoginIdentity';
import AdminMenu from '../AdminFuncs/AdminMenu';

import { TEAMNAME_QUERY } from '../../graphql';
import { useQuery } from '@apollo/client'
import "./AdminMainPage.css"


const AdminMainPage = ({setRegister, teamName, registerClosed}) => {
    const { data, loading } = useQuery(TEAMNAME_QUERY);
    if(loading) return message.loading("Loading...", 1.5)

    const columns = [{
        title: '隊伍列表',
        dataIndex: 'team',
        key: 'team',
        align: 'center',
        render: team => <Tag>{team}</Tag>
    }];
    
    return(
    <>
        <Layout>
            <Row>
                <Col offset={18}><div style={{position: "absolute"}}><AdminMenu registerClosed={registerClosed}></AdminMenu></div></Col>
                <Col md={24}><LoginIdentity teamName={teamName}></LoginIdentity><Header className="system__title" style={{backgroundColor: "transparent", fontWeight: "bold"}}>管理隊伍</Header></Col>
            </Row>
            <br></br>
            <Content className='system__app'>
                <Table columns={columns} dataSource={data.teamName} pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['1', '2', '5']}}></Table>
            </Content>
            <Footer className='col-md-12 system__title'>
                <Button className="system__margins" onClick={() => {
                    setRegister(false);
                    }}>返回功能列表</Button>
            </Footer>
        </Layout>
    </>
    )
} 
    
export default AdminMainPage