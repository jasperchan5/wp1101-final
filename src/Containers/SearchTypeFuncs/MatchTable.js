import { Table, Tag, message } from 'antd';

import {
  ALLMATCH_QUERY,
  TEAMMATCH_QUERY,
  ALLMATCH_SUBSCRIPTION,
  TEAMMATCH_SUBSCRIPTION,
} from '../../graphql/index';
import { useQuery } from '@apollo/client';
import { useEffect } from 'react';

export default ({teamName, onlySelf}) => {
    const { data: allMatchData, loading: allMatchLoading, subscribeToMore: allMatchSubscribeToMore } = useQuery(ALLMATCH_QUERY);

    const { data: teamMatchData, loading: teamMatchLoading, subscribeToMore: teamMatchSubscribeToMore } = useQuery(TEAMMATCH_QUERY,{
      variables: {
        team: teamName,
      }
    });
    // console.log(teamMatchData);

    useEffect(() => {
        // console.log("useEffect1");
        try {
        allMatchSubscribeToMore({
          document: ALLMATCH_SUBSCRIPTION,
          updateQuery: (prev, { subscriptionData }) => {
            if(!subscriptionData) return prev;

            const mutationType = subscriptionData.data.allMatch.mutation;
            if(mutationType === "CREATED") {
              const newAllMatch = subscriptionData.data.allMatch.match;

              // console.log('newMatch', newAllMatch);

              return {
                allMatch: [...prev.allMatch, newAllMatch]
              }
            }else if(mutationType === "DELETED") {
              const toDelete = subscriptionData.data.allMatch.match;
              // console.log('toDelete:',toDelete);

              const indexDel = prev.allMatch.findIndex(o => o.matchName === toDelete.matchName);
              // console.log('toDelete index:', indexDel);

              return {
                allMatch: [...prev.allMatch.slice(0, indexDel), ...prev.allMatch.slice(indexDel + 1)]
              }
            }
          }
        })
      }
      catch (e) {}
    }, [allMatchSubscribeToMore]);

    useEffect(() => {
        // console.log("useEffect2");
        try {
        teamMatchSubscribeToMore({
          document: TEAMMATCH_SUBSCRIPTION,
          variables: { team: teamName },
          updateQuery: (prev, { subscriptionData }) => {
            if(!subscriptionData) return prev;

            const mutationType = subscriptionData.data.teamMatch.mutation;
            if(mutationType === "CREATED") {
              const newTeamMatch = subscriptionData.data.teamMatch.match;

              // console.log('newMatch', newTeamMatch);

              return {
                teamMatch: [...prev.teamMatch, newTeamMatch]
              }
            }else if(mutationType === "DELETED") {
              const toDelete = subscriptionData.data.teamMatch.match;
              // console.log('toDelete:',toDelete);

              const indexDel = prev.teamMatch.findIndex(o => o.matchName === toDelete.matchName);
              // console.log('toDelete index:', indexDel);

              return {
                teamMatch: [...prev.teamMatch.slice(0, indexDel), ...prev.teamMatch.slice(indexDel + 1)]
              }
            }
          }
        })
      } catch (e) {}
    }, [teamMatchSubscribeToMore]);

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

    if(teamMatchLoading || allMatchLoading) return message.loading("Loading...", 1.5)

    return(
        <Table columns={columns}
        dataSource={onlySelf ? teamMatchData.teamMatch : allMatchData.allMatch}
        pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['1', '2', '5']}}></Table>
    )
}