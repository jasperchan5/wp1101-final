import { Table, Tag, message } from 'antd';

import { ALLMATCH_QUERY, TEAMMATCH_QUERY, ALLMATCH_SUBSCRIPTION, TEAMMATCH_SUBSCRIPTION } from '../../graphql/index';
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
      try {
        allMatchSubscribeToMore({
              document: ALLMATCH_SUBSCRIPTION,
              updateQuery: (prev, { subscriptionData }) => {
                  if(!subscriptionData) return prev;
                  const newAllMatch = subscriptionData.data.allMatch;
  
                  // console.log(prev);
  
                  return {
                    allMatch: [...prev.allMatch, newAllMatch]
                  }
              }
          })
        teamMatchSubscribeToMore({
          document: TEAMMATCH_SUBSCRIPTION,
          variables: { team: teamName },
          updateQuery: (prev, { subscriptionData }) => {
              if(!subscriptionData) return prev;
              const newTeamMatch = subscriptionData.data.teamMatch;

              // console.log(prev);

              return {
                teamMatch: [...prev.teamMatch, newTeamMatch],
              }
          }
        })
      } catch (e) {}
    }, [allMatchSubscribeToMore,teamMatchSubscribeToMore]);

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
          dataSource={onlySelf ? teamMatchData.teamMatch : allMatchData.allMatch}
          pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['1', '2', '5']}}></Table>
      )
}