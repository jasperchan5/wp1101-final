import { Table, Tag, message } from 'antd';
import { useEffect } from 'react';
import { ALLTEAM_QUERY , CREATETEAM_SUBSCRIPTION, DELETETEAM_SUBSCRIPTION, ALLTEAMTIME_SUBSCRIPTION } from '../../graphql/index';
import { useQuery } from '@apollo/client';

export default ({teamName}) => {
    const { data, loading ,subscribeToMore} = useQuery(ALLTEAM_QUERY);
    console.log(data);
    useEffect(() => {
      try {
        subscribeToMore({
              document: ALLTEAMTIME_SUBSCRIPTION,
              updateQuery: (prev, { subscriptionData }) => {
                  if(!subscriptionData) return prev;
                  const updatedTeam = subscriptionData.data.allTeamTime;
  
                  // console.log(prev);
                  const index = prev.allTeam.findIndex(o => o.team === updatedTeam.team);
  
                  return {
                      allTeam: [...prev.allTeam.slice(0, index), updatedTeam, ...prev.allTeam.slice(index + 1)]
                  }
              }
          })
      } catch (e) {}
  }, [subscribeToMore]);

    useEffect(() => {
        try {
          subscribeToMore({
                document: CREATETEAM_SUBSCRIPTION,
                updateQuery: (prev, { subscriptionData }) => {
                    if(!subscriptionData) return prev;
                    const newTeam = subscriptionData.data.createTeam;
    
                    // console.log(prev);
    
                    return {
                        allTeam: [...prev.allTeam, newTeam]
                    }
                }
            })
        } catch (e) {}
    }, [subscribeToMore]);
    
    useEffect(() => {
      try {
        subscribeToMore({
              document: DELETETEAM_SUBSCRIPTION,
              updateQuery: (prev, { subscriptionData }) => {
                  if(!subscriptionData) return prev;
                  const toDelete = subscriptionData.data.deleteTeam;
  
                  // console.log(prev);
  
                  const indexDel = prev.allTeam.findIndex(o => o.team === toDelete.team);
                  // console.log(indexDel);
  
                  return {
                      allTeam: [...prev.allTeam.slice(0, indexDel), ...prev.allTeam.slice(indexDel + 1)]
                  }
              }
          })
      } catch (e) {}
    }, [subscribeToMore]);


    const columns = [
        {
          title: '隊名',
          dataIndex: 'team',
          key: 'team',
          width: "15%",
          render: text => <a>{text}</a>,
        },
        {
          title: '登記時間',
          dataIndex: 'time',
          key: 'time',
          width: "85%",
          render: times => <>
            {times.map((e) => {
              return(<Tag>{e}</Tag>)
            })}
          </>
        }
      ];
      
      if(loading) return message.loading("Loading...", 1.5)

      return(
          <Table columns={columns} dataSource={data.allTeam} pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['1', '2', '5']}}></Table>
      )
}