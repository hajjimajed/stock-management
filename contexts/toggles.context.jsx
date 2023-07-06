import { createContext, useState, useEffect } from "react";


export const TogglesContext = createContext({
    notif: null,
    setNotif: () => null,
    updateUser: null,
    setUpdateUser: () => null
})


export const TogglesProvider = ({ children }) => {

    const [notif, setNotif] = useState(false);
    const [updateUser, setUpdateUser] = useState(false);



    const value = { notif, setNotif, updateUser, setUpdateUser };

    return <TogglesContext.Provider value={value} >{children}</TogglesContext.Provider>

}