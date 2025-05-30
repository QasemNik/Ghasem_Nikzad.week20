import api from "./axiosConfig"

export const fetchProducts = async (page = 1, limit = 10, searchTerm ="" ) => {
  const params = { page, limit }

  if (searchTerm) params.name = searchTerm
    const response = await api.get("/products", { params })
    return response.data
  } 


export const addProduct = async (productData) => {
  const response = await api.post("/products", productData)
  return response.data
}

export const updateProduct = async (productData) => {
  const { id, ...data } = productData
  const response = await api.put(`/products/${id}`, data)
  return response.data
}

export const deleteProduct = async (productId) => {
  const response = await api.delete(`/products/${productId}`)
  return response.data
}