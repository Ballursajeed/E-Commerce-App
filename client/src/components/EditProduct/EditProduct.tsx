import  { FormEvent, useState } from 'react';
import axios, { AxiosError } from 'axios';
import {SERVER} from "../../constant.ts"
import { useNavigate, useParams } from 'react-router-dom';
import '../Register/Register.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import Loading from '../Loader/Loader.tsx';

interface ErrorResponse {
  message: string;
}

const EditProduct = () => {

    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('');
    const [stocks, setStocks] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);  // Add loading state
   
    const { id } = useParams();
    const navigate = useNavigate()

    const removeCommas = (str:string) => {
      let tempString = str.replace(/,/g, '');
      console.log(tempString);
      
      return tempString;
    }

    const hangleSubmit = async(e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      setLoading(true);
       try {

        let purePrice = removeCommas(price)

        const formData = new FormData();
         formData.append("price",purePrice)
         formData.append("name",name)
         formData.append("stocks",stocks)
         formData.append("category",category)
         formData.append("description",description)
         
         if (file) {
            formData.append("image",file)
         }
         const res = await axios.put(`${SERVER}/product/update/${id}`,formData,
         {
          withCredentials:true,
          headers: {
              'Content-Type': 'multipart/form-data',
          }
       });
 
       if (res.data.success) {
        
        toast.success('Product Updated Successfully!', {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          onClose: async () => { 
              navigate("/dashboard/products"); 
            }
        }
      )

       }
     
       } catch (error) {

        const axiosError = error as AxiosError<ErrorResponse>; // Explicitly assert the error type

        console.log(axiosError.response); // Now TypeScript knows this exists
        toast.error(
          `${axiosError?.response?.data?.message || "Something went wrong!"}`,
          {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          }
        );
       }finally {
        setLoading(false);  // Stop loading after the process completes
       }

    }

  return (
    <>
    {
      loading ? <Loading /> : <>
          <div className="registerContainer">
     <div className='register'>
      <h2>Update Product</h2>
      <form action="" method='post' onSubmit={hangleSubmit}>
          <div>
           <label htmlFor="category">Name of the product: </label>
           <input type="text" 
                placeholder='Update Name of the product...' 
                id='name' 
                value={name}
                onChange={(e) => setName(e.target.value)}
           />
          </div>
          <div>
          <label htmlFor="price">Update Price: </label>
                    <input type="text" 
                          placeholder='Update Price...' 
                          id='price' 
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                    />
          </div>

          <div>
            <label htmlFor="name">stocks: </label>
            <input type="text" 
                  placeholder='Enter Stocks...' 
                  id='stocks' 
                  value={stocks}
                  onChange={(e) => setStocks(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="category">Change Category: </label>
            <input type="text" 
                  placeholder='Change Category...'
                  id='category' 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="description">Change Description: </label>
            <input type="text" 
                  placeholder='Change Description...'
                  id='description' 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className='imageUpload'>
    <label htmlFor='avatar'>Upload Profile Image:</label>
    <label className="customFileUpload">
        <span className="uploadIcon">📁 Choose File</span> 
        <p></p>
        <input type="file" id="avatar" onChange={(e) => {
            if (e.target.files) {
              setFile(e.target.files[0]);
            document.getElementById('fileName')!.textContent = e.target.files[0]?.name || "No file chosen";
            }
        }} />
    </label>
    <span id="fileName" className="fileName">No file chosen</span>
</div>
          <button type='submit' className='btn'>Submit</button>

        </form>
     </div>
     </div>
      </>
    }
     <ToastContainer />
    </>
  )
}

export default EditProduct
