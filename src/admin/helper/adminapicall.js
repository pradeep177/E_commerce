import {API} from '../../backend';



//category calls
export const createCategory = (userId, token, category) => {
    return fetch(`${API}/category/create/${userId}`,{
        method:'POST',
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        },
        body:JSON.stringify(category)
    })
    .then(response => {
        return response.json()
    })
    .catch(error => console.log(error));
}

//get all the categories
export const getCategories = () => {
    return fetch(`${API}/categories`, {
        method:'GET'
    })
    .then(response => {
        return response.json()
    })
    .catch(error => console.log(error));
}

//delete category
export const deleteCategory = (categoryId, userId, token) => {
    return fetch(`${API}/category/${categoryId}/${userId}`, {
        method:'DELETE',
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
    }
    })
    .then(response => {
        return response.json()
    })
    .catch(error => console.log(error));
}

//update category
export const updateCategory = (categoryId, userId, token, category) => {
    return fetch(`${API}/category/${categoryId}/${userId}`, {
        method:'PUT',
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },
        body:category
    })
    .then(response => {
        return response.json()
    })
    .catch(error => console.log(error));
}


//product calls

//create a product
export const createaProduct = (userId, token, product) => {
    return fetch(`${API}/product/create/${userId}`, {
        method:'POST',
        headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`
    },
        body:product
    })
    .then(response => {
        return response.json()
    })
    .catch(error => console.log(error));
}

//get all the products
export const getProducts = () => {
    return fetch(`${API}/products`, {
        method:'GET'
    })
    .then(response => {
        return response.json()
    })
    .catch(error => console.log(error));
}

//delete the product
export const deleteProduct = (productId, userId, token) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
        method:'DELETE',
        headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`
    }
    })
    .then(response => {
        return response.json()
    })
    .catch(error => console.log(error));
}


//get a product
export const getProduct = productId => {
    return fetch(`${API}/product/${productId}`, {
        method:'GET'
    })
    .then(response => {
        return response.json()
    })
    .catch(error => console.log(error));
}


//update product
export const updateProduct = (productId, userId, token, product) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
        method:'PUT',
        headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`
        },
        body:product
    })
    .then(response => {
        return response.json()
    })
    .catch(error => console.log(error));
}