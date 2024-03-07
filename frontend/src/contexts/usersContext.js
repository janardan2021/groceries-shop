
import { createContext, useReducer} from "react";

export const UsersContext = createContext()

const initialUser = localStorage.getItem('user') 
                  ? JSON.parse(localStorage.getItem('user')) 
                  : null;
// console.log('Initial user', JSON.parse(localStorage.getItem('user')))                  
// console.log('Initial user', initialUser)
export const usersReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN': 
            return action.payload
        case 'LOGOUT':
            return null
        default:
            return state       
    }
}

export const UsersContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(usersReducer, initialUser)

    // console.log('UsersContext state', state)

    // useEffect(() => {
    //     var user;
    //     if (localStorage.getItem('user')){
    //        user = JSON.parse(localStorage.getItem('user'))
    //     }
    //     if(user) {
    //         dispatch({type: 'LOGIN', payload: user})
    //     }
    // }, [])

    return(
        <UsersContext.Provider value={{state, dispatch}}>
            {children}
        </UsersContext.Provider>
    )
}