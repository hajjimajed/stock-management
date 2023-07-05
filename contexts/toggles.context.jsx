import { createContext, useState, useEffect } from "react";


export const TogglesContext = createContext({
    notif: null,
    setNotif: () => null
})


export const TogglesProvider = ({ children }) => {

    const [notif, setNotif] = useState(false);




    const value = { notif, setNotif };

    return <TogglesContext.Provider value={value} >{children}</TogglesContext.Provider>

}