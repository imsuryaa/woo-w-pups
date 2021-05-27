import { API } from "../../backend";

// Category calls
export const createCategory = (userId, token, category) => {
    return fetch(`${API}/category/create/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))

}

// get all categories calls
export const getCategories = () => {
    return fetch(`${API}/categories`, {
        method: 'GET'
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

// Product calls
export const createaProduct = (userId, token, product) => {
    return fetch(`${API}/product/create/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: product
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

// get all products calls
export const getProducts = () => {
    return fetch(`${API}/products`, {
        method: 'GET'
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

// delete a product
export const deleteProduct = (productId, userId, token ) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

// get a product
export const getProduct = productId => {
    return fetch(`${API}/product/${productId}`, {
      method: "GET"
    })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
  };

// update a product
export const updateProduct = (productId, userId, token, product) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: product
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

// get orders
export const getOrders = (userId, token) => {
    return fetch(`${API}/order/all/${userId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
    })
    .then(response => {
         return response.json()
    })
    .catch(err => console.log(err))
}

// Services calls
export const createaService = (userId, token, service) => {
    return fetch(`${API}/service/create/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: service
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

// get all services calls
export const getServices = () => {
    return fetch(`${API}/services`, {
        method: 'GET'
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

// delete a service
export const deleteService = (serviceId, userId, token ) => {
    return fetch(`${API}/service/${serviceId}/${userId}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

// get a service
export const getService = serviceId => {
    return fetch(`${API}/service/${serviceId}`, {
      method: "GET"
    })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
  };

// update a service
export const updateService = (serviceId, userId, token, service) => {
    return fetch(`${API}/service/${serviceId}/${userId}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: service
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}