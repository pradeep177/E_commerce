import { React, useState, useEffect } from 'react'
import { Link, Redirect  } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';
import {createaProduct, getCategories} from './helper/adminapicall'

function AddProduct() {

    const {user, token } = isAuthenticated();

    const [values, setvalues] = useState({
        name:"",
        description:"",
        price:"",
        stock:"",
        photo:"",
        categories:[],
        category:"",
        loading:false,
        error:"",
        createdProduct:"",
        getaRedirect:false,
        formData:""
    });

    //destructure 
    const {
        name, 
        description, 
        price, 
        stock,
        photo,
        categories,
        category,
        loading,
        error,
        createdProduct,
        getaRedirect,
        formData,
    } = values;

    //get all the categories and load it into categories array
    const preload = () => {
        getCategories().then(data => {
        console.log(data)
            if(data.error) {
                setvalues({...values, error:data.error})
            } else {
                setvalues({ ...values, categories:data, formData: new FormData() });
            }
        })
    }

    useEffect(() => {
        preload();
    },[])

    const handleChange = name => event => {
        const value = name === "photo" ? event.target.files[0] : event.target.value
        formData.set(name, value);
        setvalues({...values, [name]: value})
    }


    const onSubmit = (event) => {
        event.preventDefault();
        setvalues({...values, error:"", loading:true})
        console.log(loading);
        createaProduct(user._id, token, formData)
        .then(data => {
            if(data.error) {
                setvalues({...values, error:data.error})
            } else {
                setvalues({
                    ...values,
                    name:"", 
                    description:"", 
                    price:"", 
                    stock:"",
                    photo:"",
                   loading:false,
                    createdProduct:data.name
                })
            }
        })   
        // setTimeout(myFunction, 2000);  
        setTimeout(function(){  return <Redirect to="/admin/dashboard" /> }, 3000)  
        // console.log(getaRedirect);
        // console.log(loading);
    }

    //success message
    const successMessage = () => (
        <div className='alert alert-success mt-3'
            style={{display : createdProduct ? "" : "none"}}>
                <h4>{createdProduct} created successfully</h4>
            </div>
    )

    const warningMessage = () => {
        if(error){
            return(
                <div className='alert alert-danger mt-3'>
                <h4>{createdProduct} Failed to create</h4>
            </div>
            )
           
        }
       
    }

    const createProductForm = () => (
        <form >
          <span>Post photo</span>
          <div className="form-group">
            <label className="btn btn-block btn-success">
              <input
                onChange={handleChange("photo")}
                type="file"
                name="photo"
                accept="image"
                placeholder="choose a file"
              />
            </label>
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("name")}
              name="photo"
              className="form-control"
              placeholder="Name"
              value={name}
            />
          </div>
          <div className="form-group">
            <textarea
              onChange={handleChange("description")}
              name="photo"
              className="form-control"
              placeholder="Description"
              value={description}
            />
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("price")}
              type="number"
              className="form-control"
              placeholder="Price"
              value={price}
            />
          </div>
          <div className="form-group">
            <select
              onChange={handleChange("category")}
              className="form-control"
              placeholder="Category"
            >
              <option>Select</option>
             {
                 categories && categories.map((category, index) => (
                 <option key={index} value={category._id}>
                     {category.name}
                 </option>
                 ))
             }
             
            </select>
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("stock")}
              type="number"
              className="form-control"
              placeholder="stock"
              value={stock}
            />
          </div>
          
          <button type="submit" onClick={onSubmit} className="btn btn-outline-success mb-2">
            Create Product
          </button>
        </form>
      );


    return (
        <Base
            title='Welcome Admin'
            description='create your product here'
            className='container bg-info p-4'
        >
        <Link to='/admin/dashboard' className='btn btn-md btn-dark mb-3'>Admin Home</Link>
        <div className='row bg-dark text-white rounded'>
            <div className='col-md-8 offset-md-2 mt-3'>
                {warningMessage()}
                {successMessage()}
                {createProductForm()}
            </div>
        </div>
        </Base>
    )
}

export default AddProduct
