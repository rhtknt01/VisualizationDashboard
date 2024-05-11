import {
  AreaChart,
  Legend,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useSelector } from "react-redux";
import { getDataItemByFilter } from "../../analysis/calculations";
const axisStyle = {
  fill: '#08105d', // Example color
  fontSize: '14px', // Example font size
  fontWeight: 'bold', // Example font weight
};
const VisualAreaChart = () => {
  const apiDataList = useSelector((state)=>{
    return state.dashboardStore.apiDataList;
  });
  const chartData = apiDataList?getDataItemByFilter("startYear", apiDataList):null;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={chartData}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="category" tick={{style:axisStyle}} />
        <YAxis tick={{style:axisStyle}}/>
        <Tooltip />
        <Legend />
        <Area
          type="monotone"
          dataKey="intensity"
          stroke="#8884d8"
          fill="#8884d8"
        />
        <Area
          type="monotone"
          dataKey="impact"
          stroke="#82ca9d"
          fill="#82ca9d"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default VisualAreaChart;
