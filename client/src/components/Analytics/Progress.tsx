import "./Progress.css"
const Progress_bar = ({progress}:{progress:string}) => {
   
    
    return (
    <div className="progressDiv">
      <div className="childDiv" style={{
        width: `${progress}`,
      }
    }>
      </div>
    </div>
    )
}

export default Progress_bar;