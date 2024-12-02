import "./Product.css"

interface productType {
   product:{
   _id:string,
   category: string,
   createdAt: string,
   description:string,
   image: string,
   name: string,
   price: number,
   stocks: number,
   updatedAt: string,
   }
}

const SingleProduct = ({
    product
}:productType) => {
  return (
     <div className="card">
       <img src={`${product.image}`} alt="Avatar" />
       <div className="cardContainer">
         <div className="cardleft">
            <h4><b id="name">{product.name}</b></h4>
            <p id="price">${product.price}</p>
         </div>
         <div className="stock">
            <span id="stock">only {product.stocks} left</span>
         </div>
       </div>
     </div>
  )
}

export default SingleProduct
