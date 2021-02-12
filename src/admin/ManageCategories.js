import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import Base from '../core/Base';
import { deleteCategory, getCategories } from './helper/adminapicall';



function ManageCategories() {

    const [categories, setcategories] = useState([]);
    const { user, token } = isAuthenticated();

    //preload the product
    const preload = () => {
        getCategories().then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                setcategories(data);
            }
        })
    }

    //call preload before component mount
    useEffect(() => {
       preload();
    }, [])

    //delete the product
    const removeCategory = categoryId => {
        deleteCategory(categoryId, user._id, token)
        .then(data => {
            if(data.error) {
                console.log(data.error);
            } else {
                preload()
            }
        })
    }


    return (
        <Base title="Welcome admin" description="Manage your categories here">
        <h2 className="mb-4">All categories:</h2>
        <Link className="btn btn-info" to={`/admin/dashboard`}>
          <span className="">Admin Home</span>
        </Link>
        <div className="row" id='manage-category'>
          <div className="col-12">
            <h4 className="text-center text-white my-3">manage category here</h4>  
           {categories.map((category, index) => {
               return (
                <div key={index} className="row text-center mb-2 categories">
                    <div className="col-4">
                    <h3 className="text-white text-left">{category.name}</h3>
                    </div>
                    <div className="col-4">
                    <Link
                        className="btn btn-success"
                        to={`/admin/category/update/${category._id}`}
                    >
                        <span className="">Update</span>
                    </Link>
                    </div>
                    <div className="col-4">
                    <button onClick={() => {removeCategory(category._id)}} className="btn btn-danger">
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
export default ManageCategories;