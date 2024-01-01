import { createContext, useEffect, useReducer } from "react"


type userType={
    user:{}[],
    error: string|null
}

type login={
    type:'login',
    payload:userType[]
}


type logout={
    type:'logout',
}

type actionType = login| logout

const initialState:userType ={
    user:JSON.parse(localStorage.getItem('token' )|| '[]'),
    error: null

}

export const AuthContext = createContext<{
    state: userType,
    dispatch:React.Dispatch<actionType>}>
    ({state:initialState, dispatch:()=>{}
})


const AuthReducer =(state:userType,action:actionType)=>{
    switch (action.type) {
        case 'login' :
            return{
                ...state,
                user: action.payload,

            }

            case 'logout' :
                return{
                    ...state,
                    user: [],
    
                }
           
    
        default:
            return state;
    }
}


export const AuthProvider =({children}:{children:React.ReactNode})=>{

    const [state,dispatch]=useReducer(AuthReducer, initialState)

    useEffect(()=>{
        localStorage.setItem("token", JSON.stringify(state.user||[]) )

            },[state.user])
return <AuthContext.Provider value={{state,dispatch}}>{children}</AuthContext.Provider>
}