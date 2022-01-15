import { Menu, Divider, Checkbox, Space, Button, Row} from "antd"
import NewTeamModal from './NewTeamModal'
import DeleteTeamModal from './DeleteTeamModal';
import StartMatchModal from './StartMatchModal';
import { UPDATE_ADMINDATA_MUTATION } from "../../graphql/index";
import { useMutation } from "@apollo/client";

export default ({registerClosed}) => {
    const [updateAdminData] = useMutation(UPDATE_ADMINDATA_MUTATION)
    return(
    <Menu style={{ width: 256, height: "100%", marginTop: "2%" }} mode="vertical">
        <h5 style={{textAlign: "center", fontWeight: "bold", verticalAlign: "center"}}>管理模式</h5>
        <Divider></Divider>
        <Row align="center"><Menu.Item style={{background: "transparent"}}><Space><NewTeamModal></NewTeamModal></Space></Menu.Item></Row>
        <Divider></Divider>
        <Row align="center"><Menu.Item style={{background: "transparent"}}><Space><DeleteTeamModal></DeleteTeamModal></Space></Menu.Item></Row>
        <Divider></Divider>
        <Row align="center"><Menu.Item style={{background: "transparent"}}>
            <Space align="center" size={8}>
                <Button style={registerClosed ? 
                    {border: "2px black solid", background: 'linear-gradient(90deg, #d48806 0%, #ffe58f 50%, #d48806 100%)'} : 
                    {border: "1px #d9d9d9 solid", background: 'transparent'}} 
                    onClick={() => updateAdminData()}>
                    <div style={registerClosed ? {color: "#ffffff"} : {}}>關閉登記</div>
                </Button></Space></Menu.Item></Row>
        <Divider></Divider>
        <Row align="center"><Menu.Item style={{background: "transparent"}}><Space><StartMatchModal></StartMatchModal></Space></Menu.Item></Row>
        <Divider></Divider>
    </Menu>
    )
}