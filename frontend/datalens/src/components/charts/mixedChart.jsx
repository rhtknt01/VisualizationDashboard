import React from 'react';
import { ComposedChart, Bar, XAxis, YAxis, Tooltip, Legend, Area, Line, Scatter, ResponsiveContainer } from 'recharts';
import { getDataItemByFilter} from '../../analysis/calculations';
import { useSelector} from 'react-redux';

const axisStyle = {
  fill: '#08105d', // Example color
  fontSize: '14px', // Example font size
  fontWeight: 'bold', // Example font weight
};

const MixedChart = () => {
  // Assuming filterData contains your chart data
  const categoryFilter = useSelector((state)=>{
    return state.dashboardStore.categoryFilter;
  });
  const apiDataList = useSelector((state)=>{
    return state.dashboardStore.apiDataList;
  });
  let filterData = categoryFilter?(apiDataList?getDataItemByFilter(categoryFilter, apiDataList):null):null;

  return (
    <ResponsiveContainer width={"100%"}>
      <ComposedChart
        data={filterData}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <XAxis dataKey="category" tick={{style:axisStyle}}/>
        <YAxis tick={{style:axisStyle}} />
        <Tooltip />
        <Legend />

        {/* Modify the Bar component to use the CustomBarShape */}
        <Bar dataKey="intensity" barSize={25} fill="#413ea0" />
        <Area type="monotone" dataKey="likelihood" fill="#8884d8" stroke="#8884d8" />
        <Line type="monotone" dataKey="impact" stroke="#ff7300" />
        <Scatter dataKey="relevance" fill="red" />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default MixedChart;
