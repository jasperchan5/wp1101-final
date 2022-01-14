import { Avatar, Card, Col, Row, Space, Tag } from "antd";
import { CrownOutlined, UserOutlined } from '@ant-design/icons';

export default ({teamName}) => {
    return(
        <>
            <div style={{textAlign: "center",position: "absolute", marginLeft: "2%", marginTop: "2%"}}>
                <Card style={{background: "#fafafa", borderRadius: "50%"}}>
                    <Row><Avatar size={64} style={teamName === "Admin" ? {background: "#faad14"} : {background: "#69c0ff"}} icon={teamName === "Admin" ? <CrownOutlined /> : <UserOutlined /> } ></Avatar></Row>
                    <Row><Tag style={{fontSize: "0.4cm", margin:"auto"}}>{teamName}</Tag></Row>
                </Card>
            </div>   
        </>
    )
}