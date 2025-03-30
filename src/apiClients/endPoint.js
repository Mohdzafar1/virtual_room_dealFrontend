import apiClient from "./index"

export const register=async({name,email,password,role})=>{
  const response=await apiClient.post("users/register",{name,email,password,role})
  console.log("response",response)
  return response
}

export const login=async({email,password})=>{
  const response=await apiClient.post("users/login",{email,password})
  console.log("response",response)
  return response.data
}

export const createDeal=async({title,description,price,userId})=>{
  const response=await apiClient.post("deal/createDeal",{title,description,price,userId})
  console.log("response",response)
  return response.data
}

export const gettingDealList=async()=>{
  const response=await apiClient.get("deal/gettingDealList")
  return response.data
}

export const gettingSingleDealList=async({dealId})=>{
  const response=await apiClient.get(`deal/${dealId}`)
  return response.data
}


