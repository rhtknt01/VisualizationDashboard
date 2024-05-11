import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid,Tooltip } from 'recharts';
import { useSelector } from 'react-redux';


const yAxisStyle = {
  fill: '#08105d', // Example color
  fontSize: '14px', // Example font size
  fontWeight: 'bold', // Example font weight
};
const xAxisFormatter = (tick) => `${tick}%`;

const UsageChart = () => {
  const apiCallsCount = useSelector((state)=>{
    return state.dashboardStore.apiCallsCount;
  });
  const usageTime = useSelector((state)=>{
    return state.dashboardStore.usageTime;
  });

  const data = [
    {
      name: "api calls",
      usage: Math.round((apiCallsCount/1000)*100),
      fill:"#00bad1"
    },
    {
      name: "time spent",
      usage: Math.round((usageTime/60)*100),
      fill:"#28c76f"
    },
    {
      name: "usage",
      usage: Math.round((Math.round((apiCallsCount/1000)*100)+Math.round((usageTime/60)*100))/2),
      fill:"#8884d8"
    }
  ];
  return (
    <ResponsiveContainer width={"100%"} >
      <BarChart layout="vertical" data={data} barCategoryGap={1} barGap={1}>
      <CartesianGrid strokeDasharray="3 3" />
        <XAxis type='number' domain={[0, 100]} tick={{style:yAxisStyle}} tickFormatter={xAxisFormatter} />
        <YAxis type='category' dataKey="name" tick={{style:yAxisStyle}}/>
        <Tooltip />
        <Bar dataKey="usage" fill="fill" barSize={30} label={{ fill: '#08105d', fontSize: 14, fontWeight:700 }}/>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default UsageChart;
