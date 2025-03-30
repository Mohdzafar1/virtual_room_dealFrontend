export const setAuthToken=(token)=>{
    const tokres= localStorage.setItem('Auth_Token',token)
    return tokres
 }
 
 export const getAuthToken=()=>{
    
     const token= localStorage.getItem('Auth_Token')
     return token
  }
 
  export const setUserData=(userData)=>{
    const userDatas= localStorage.setItem('User',JSON.stringify(userData))
    return userDatas
 }
 
 export const getUserData=()=>{
    
     const userDatas= JSON.parse(localStorage.getItem("User"));
     return userDatas
  }
 