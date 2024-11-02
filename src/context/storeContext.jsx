import { createContext, useState } from "react"


export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {


  const url = "https://al-afnan-backend-1.onrender.com"

  const [token, setToken] = useState("");


  const contextValue = {

    url,
    token,
    setToken

  }



  return (
    <StoreContext.Provider value={contextValue}>
                {props.children}
            </StoreContext.Provider>
  )
}

export default StoreContextProvider