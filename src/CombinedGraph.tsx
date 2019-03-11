import * as React from 'react';
import _ from 'lodash';
import {LineChart, XAxis, Line, CartesianGrid, Tooltip} from 'recharts';
import {IItem, CustomTooltip} from './Graph';
import {array} from 'prop-types';

interface IProps {
  data: Array<Array<IItem>>;
}

const getProcessedData = (data: Array<Array<IItem>>) => {
  let arr = data
    .flat()
    .flat()
    .sort((a, b) => (a.word > b.word ? -1 : a.word < b.word ? 1 : 0))
    .sort((a, b) => (a.count > b.count ? -1 : a.count < b.count ? 1 : 0));

  console.log(
    _.uniqWith(arr, (o: any, n: any) => {
      if (o.word === n.word) {
        _.sumBy([o, n], 'count');
      }
      return o.word;
    }),
  );

  return _.uniqBy(arr, 'word');
};

const CombinedGraph = ({data}: IProps) => {
  let test = data
    .flat()
    .flat()
    .sort((a, b) => (a.count > b.count ? -1 : a.count < b.count ? 1 : 0));

  let d = getProcessedData(data);
  console.log(d);

  return (
    <>
      <h2>Combined Distribution of words</h2>
      <div className="App__LineChart-Wrapper">
        <LineChart
          height={500}
          width={d.length * 5}
          data={d}
          margin={{top: 32, right: 32, left: 32, bottom: 32}}
          style={{background: '#fff'}}
        >
          <XAxis dataKey="word" />
          <Tooltip
            content={
              <CustomTooltip
                data={test}
                wrapperStyle={{width: 100, backgroundColor: '#ccc'}}
              />
            }
          />
          <CartesianGrid stroke="#c1c1c1" />
          <Line
            type="monotone"
            dataKey="count"
            stroke={`hsla(${Math.random() * 100 + 20},100%,50%,1)`}
            yAxisId={1}
          />
        </LineChart>
      </div>
    </>
  );
};

export default CombinedGraph;
