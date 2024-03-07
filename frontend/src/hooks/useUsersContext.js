import { UsersContext } from "../contexts/usersContext.js";
import { useContext } from "react";

export const useUsersContext = () => {
    // This context gets the value provided by WorkoutsContext, that is {state, dispatch}
    const context = useContext(UsersContext)

    if (!context) {
        throw Error('useUsersContext must be used inside a UsersContextProvider')
    }
    return context
}