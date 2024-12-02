import "./Product.css"

const Product = () => {
  return (
     <div className="card">
      <img src="logo.jpg" alt="Avatar" />
        <div className="cardContainer">
            <div className="cardleft">
             <h4><b id="name">John Doe</b></h4>
             <p id="price">$ 500</p>
            </div>
            <div className="stock">
             <span id="stock">only 5 left</span>
            </div>
        </div>
        
     </div>
  )
}

export default Product
