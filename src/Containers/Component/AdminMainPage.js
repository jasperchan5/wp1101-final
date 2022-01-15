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
    if(loading) return message.loading("Loading...", 0.5, message.success("Loaded successfully!"))

    const columns = [{
        title: <div backgroundColor="linear-gradient(90deg, #d48806 0%, #ffe58f 50%, #d48806 100%)">隊伍列表</div>,
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
                <Table columns={columns} dataSource={data.teamName} className="admin_table_header"></Table>
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