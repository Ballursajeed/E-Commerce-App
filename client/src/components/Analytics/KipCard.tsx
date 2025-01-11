import "./Kipcard.css";
import { HiTrendingUp,HiTrendingDown } from "react-icons/hi";

const KipCard = (
    {
        heading,
        value,
        rate,
        color
    }:{heading:String, value: String, rate: Number,color:string}
) => {
  return (
    <>
      <div className="kpi-card">
       <div className="left-data">
         <p><strong>{heading}</strong></p>
         <h2>{value}</h2>
         {
            Number(rate) > 0 ? <div className="analytics-green"><HiTrendingUp />{`+${rate}%`}</div>
             : <div className="analytics-red"><HiTrendingDown /> {`-${rate}%`}</div>
         }
       </div>
  
    <div className="ring-data">
     <div id="ring" style={{border: `6px solid ${color}`}}>
        {
            Number(rate) > 0 ? <div className="analytics-green">{`+${rate}%`}</div> : <div className="analytics-red">{`-${rate}%`}</div>
        }
     </div>
    </div>
  </div>
    </>
  )
}

export default KipCard
