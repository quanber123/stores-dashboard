import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
const TinyLineChart = () => {
  const data = [
    { name: 'Page A', uv: 4000 },
    { name: 'Page B', uv: 3000 },
    { name: 'Page C', uv: 2000 },
    { name: 'Page D', uv: 2780 },
    { name: 'Page E', uv: 1890 },
    { name: 'Page F', uv: 2390 },
    { name: 'Page G', uv: 3490 },
  ];

  return (
    <div className='text-[12px]'>
      <ResponsiveContainer height={328}>
        <LineChart data={data}>
          <Line type='linear' dataKey='uv' stroke='#8884d8' strokeWidth={5} />
          <CartesianGrid />
          <Tooltip
            contentStyle={{
              width: 'max-content',
              height: '42px',
              fontSize: '12px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontWeight: 'bold',
              borderRadius: '4px',
              gap: '10px',
            }}
          />
          <XAxis dataKey='name' />
          <YAxis dataKey='uv' />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TinyLineChart;
