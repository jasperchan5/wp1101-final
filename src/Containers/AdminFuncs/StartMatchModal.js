import { CREATE_MATCH_MUTATION  } from '../../graphql/index';
import { useMutation } from '@apollo/client';
import { Button } from "antd"

const StartMatchModal = () => {

    const [createMatch] = useMutation(CREATE_MATCH_MUTATION);
    const startMatch = () =>{
        createMatch();
   } 
   return (
    <>
      <Button className="system__margins" onClick={startMatch} >開始匹配</Button> 
    </>
  );
}

export default StartMatchModal;