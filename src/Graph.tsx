import * as React from 'react';
import {LineChart, XAxis, Line, CartesianGrid, Tooltip} from 'recharts';

interface IItem {
  word: string;
  count: number;
}

interface IProps {
  item: Array<IItem>;
}

function CustomTooltip({payload, label, active, data}: any) {
  if (active) {
    let rank = data.findIndex((el: any) => el.word === payload[0].payload.word);
    return (
      <div className="custom-tooltip">
        <p className="label">{`Word: ${label} Count: ${payload[0].value}`}</p>
        <p className="intro">{`Rank: ${rank + 1}`}</p>
      </div>
    );
  }

  return null;
}

const Graph = ({item}: IProps) => {
  const width = item.length * 5 > 1200 ? item.length * 5 : 1200;
  return (
    <div className="App__LineChart-Wrapper">
      <LineChart
        width={width}
        height={500}
        data={item}
        margin={{top: 32, right: 32, left: 32, bottom: 32}}
        style={{background: '#fff'}}
      >
        <Tooltip
          content={
            <CustomTooltip
              data={item}
              wrapperStyle={{width: 100, backgroundColor: '#ccc'}}
            />
          }
        />
        <XAxis dataKey="word" />
        <CartesianGrid stroke="#c1c1c1" />
        <Line type="monotone" dataKey="count" stroke="#387908" yAxisId={1} />
      </LineChart>
    </div>
  );
};

export default Graph;
