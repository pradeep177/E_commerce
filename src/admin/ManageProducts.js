import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';
import { deleteProduct, getProducts } from './helper/adminapicall';



function ManageProducts() {

    const [products, setproducts] = useState([]);
    const { user, token } = isAuthenticated();

    //preload the product
    const preload = () => {
        getProducts().then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                setproducts(data);
            }
        })
    }

     //call preload before component mount
    useEffect(() => {
       preload();
    }, [])

    //delete the product
    const removeProduct = productId => {
        deleteProduct(productId, user._id, token)
        .then(data => {
            if(data.error) {
                console.log(data.error);
            } else {
                preload()
            }
        })
    }


    return (
        <Base title="Welcome admin" description="Manage your products here">
        <h2 className="mb-4">All products:</h2>
        <Link className="btn btn-info" to={`/admin/dashboard`}>
          <span className="">Admin Home</span>
        </Link>
        <div className="row" id='products'>
          <div className="col-12">
            <h2 className="text-center text-white my-3">Total products</h2>
  
           {products.map((product, index) => {
               return (
                <div key={index} className="row text-center mb-2 my-product ">
                    <div className="col-4">
                    <h3 className="text-white text-left">{product.name}</h3>
                    </div>
                    <div className="col-4">
                    <Link
                        className="btn btn-success"
                        to={`/admin/product/update/${product._id}`}
                    >
                        <span className="">Update</span>
                    </Link>
                    </div>
                    <div className="col-4">
                    <button onClick={() => {removeProduct(product._id)}} className="btn btn-danger">
                        Delete
                    </button>
                    </div>
                </div>)
             })
            }
           
          </div>
        </div>
      </Base>
    )
}
export default ManageProducts;