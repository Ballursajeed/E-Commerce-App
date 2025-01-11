import { Bar } from "react-chartjs-2";
import "./BarChart.css";

interface chartDataType {
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

export const BarChart = ({ chartData }:{
  chartData:chartDataType
}) => {

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  
  const phaseOne = ['January', 'February', 'March', 'April', 'May', 'June']
  const phaseTwo = ['July', 'August', 'September', 'October', 'November', 'December']
  
  let decisiveMonths:String[] = [];

  for (let i = 0; i < 6; i++) {
        if(currentMonth === i){
           decisiveMonths = phaseOne;
        }     
  }

  for (let i = 6; i < 12; i++) {
    if(currentMonth === i){
       decisiveMonths = phaseTwo;
    }     
}

   const customChartData:chartDataType = {
    labels: decisiveMonths.map((month) => month),
    datasets: chartData.datasets
   }

  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>Revenue of this Year</h2>
      <Bar
        data={customChartData}
        options={
          {
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