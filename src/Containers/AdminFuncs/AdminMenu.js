import { Menu, Divider, Checkbox, Space } from "antd"
import NewTeamModal from './NewTeamModal'
import DeleteTeamModal from './DeleteTeamModal';
import StartMatchModal from './StartMatchModal';
import { UPDATE_ADMINDATA_MUTATION } from "../../graphql/index";
import { useMutation } from "@apollo/client";

export default ({registerClosed}) => {
    const [updateAdminData] = useMutation(UPDATE_ADMINDATA_MUTATION)
    return(
    <Menu style={{ width: 256, height: "100%", marginTop: "2%" }} mode="vertical">
        <h5 style={{textAlign: "center", fontWeight: "bold", marginTop: "2%"}}>管理模式</h5>
        <Divider></Divider>
        <Menu.Item><Space><NewTeamModal></NewTeamModal></Space></Menu.Item>
        <Menu.Item><Space><DeleteTeamModal></DeleteTeamModal></Space></Menu.Item>
        <Menu.Item><Space align="center" size={8}><Checkbox defaultChecked={registerClosed} onChange={() => updateAdminData()}></Checkbox><h5>關閉登記</h5></Space></Menu.Item>
        <Menu.Item><Space><StartMatchModal></StartMatchModal></Space></Menu.Item>
    </Menu>
    )
}