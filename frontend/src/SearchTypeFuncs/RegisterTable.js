import { Table, Tag, Space } from 'antd';

export default () => {
    const columns = [
        {
          title: '隊名',
          dataIndex: 'name',
          key: 'name',
          render: text => <a>{text}</a>,
        },
        {
          title: '登記時間',
          dataIndex: 'time',
          key: 'time',
          render: times => <>
            {times.map((e) => {
              return(<Tag>{e}</Tag>)
            })}
          </>
        }
      ];
      
      const data = [
        {
          key: '1',
          name: '台大資管',
          time: ['2021/1/1','2021/1/6']
        },
        {
          key: '2',
          name: '清大人社',
          time: ['2021/1/1']
        },
        {
          key: '3',
          name: '交大資工',
          time: ['2021/1/1']
        },
      ];
      
      return(
          <Table columns={columns} dataSource={data}></Table>
      )
}