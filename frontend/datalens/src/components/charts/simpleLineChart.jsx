import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getDataItemByFilter } from "../../analysis/calculations";
import { useSelector } from "react-redux";
const axisStyle = {
  fill: '#08105d', // Example color
  fontSize: '14px', // Example font size
  fontWeight: 'bold', // Example font weight
};
const SimpleLineChart = ()=>{
  const apiDataList = useSelector((state)=>{
    return state.dashboardStore.apiDataList;
  });
    const chartData = apiDataList?getDataItemByFilter('endYear',apiDataList):null;
    return(
        <ResponsiveContainer>
        <LineChart
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" tick={{style:axisStyle}} />
          <YAxis tick={{style:axisStyle}}/>
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="intensity" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="impact" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    );
};
export default SimpleLineChart;