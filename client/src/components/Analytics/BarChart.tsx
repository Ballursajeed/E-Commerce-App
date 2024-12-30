import { Bar } from "react-chartjs-2";

export const BarChart = ({ chartData }:{
  chartData:{
    labels: String[], 
        datasets: 
          {
            label: string,
            data: Number[],
            backgroundColor:string[],
            borderColor: string,
            borderWidth: number
          }[]
  }
}) => {

  const currentYear = new Date().getFullYear();

  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>Revenue of this Year</h2>
      <Bar
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: `Revenue of ${currentYear}`
            },
            legend: {
              display: false
            }
          }
        }}
      />
    </div>
  );
};