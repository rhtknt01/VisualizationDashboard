import apiDataList from "./data";
import { getDataItemByFilter } from "../../analysis/calculations";
import { Bar, LabelList,Label, ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Legend } from "recharts";

const HorizontalBarChart = () => {
  const chartData = getDataItemByFilter("sector", apiDataList);
  return (
    <ResponsiveContainer width={"100%"}>
      <BarChart data={chartData} margin={{top:50,bottom:50}}> {/* Adjust the bottom margin */}
        <XAxis dataKey="category">
          <Label value="Risk Probability" position="bottom"/>
        </XAxis>
        <YAxis /> {/* Display id value for every bar */}
        <Legend verticalAlign="top" />
        <Tooltip />
        <Bar dataKey="likelihood" fill="#8884d8" />
        <Bar dataKey="relevance" fill="#345634" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default HorizontalBarChart;
