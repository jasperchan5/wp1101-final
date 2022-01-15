import { Table, Tag, message } from 'antd';

import { ALLMATCH_QUERY, TEAMMATCH_QUERY } from '../../graphql/queries';
import { useQuery } from '@apollo/client';
import { useState } from 'react';

export default ({teamName, onlySelf}) => {
    const { data: allMatchData, loading: allMatchLoading, subscribeToMore: allMatchSubscribeToMore } = useQuery(ALLMATCH_QUERY);

    const { data: teamMatchData, loading: teamMatchLoading, subscribeToMore: teamMatchSubscribeToMore } = useQuery(TEAMMATCH_QUERY,{
      variables: {
        team: teamName,
      }
    });

    // useEffect(() => {
    //   try {
    //     subscribeToMore({
    //           document: CREATETEAMNAME_SUBSCRIPTION,
    //           updateQuery: (prev, { subscriptionData }) => {
    //               if(!subscriptionData) return prev;
    //               const newTeam = subscriptionData.data.createTeam;
  
    //               console.log(prev);
  
    //               return {
    //                   teamName: [...prev.teamName, newTeam]
    //               }
    //           }
    //       })
    //   } catch (e) {}
    // }, [subscribeToMore]);

  
    const columns = [
        {
          title: '對戰組合',
          dataIndex: 'matchName',
          key: 'matchName',
          render: text => <a>{text.split("_").join(" vs ")}</a>,
        },
        {
          title: '登記時間',
          dataIndex: 'time',
          key: 'time',
          render: times => <Tag>{times}</Tag>,
        }
      ]

      if(teamMatchLoading || allMatchLoading) return message.loading("Loading...", 0.5, message.success("Loaded successfully!"))

      return(
          <Table columns={columns}
          dataSource={onlySelf?teamMatchData.teamMatch:allMatchData.allMatch}
          pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['1', '2', '5']}}></Table>
      )
}