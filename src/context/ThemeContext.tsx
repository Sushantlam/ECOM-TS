
import React, { useContext, useEffect, useReducer } from "react";
import { createContext } from "react";


type initialValuesType={
    theme: string
}

type ActionType ={
    type: "CHANGE_THEME"
}

type action = ActionType


const color = localStorage.getItem("theme")
const themeColor = color? JSON.parse(color): "light"

const initialValues:initialValuesType ={
    theme: themeColor
}

export const DarkContext = createContext<{
    themeState: initialValuesType,
    dispatch: React.Dispatch<action>}>
    ({
     themeState:initialValues,
    dispatch:()=>{},
})

const DarkReducer=(themeState:initialValuesType, action:ActionType)=>{
    switch(action.type){
        case "CHANGE_THEME":
            return{
                ...themeState, 
                theme: themeState.theme=== "light"? "dark" :"light"
            }
        
    }

}

export const DarkContextProvider=({children}:{children:React.ReactNode})=>{

    const [themeState, dispatch] = useReducer(DarkReducer, initialValues)

    useEffect(() => {
     localStorage.setItem("theme", JSON.stringify(themeState.theme|| "light"))
    }, [themeState.theme])
    

    return ( <DarkContext.Provider value={{themeState, dispatch}} >
        {children}</DarkContext.Provider> )
}

