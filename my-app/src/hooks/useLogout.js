import { useAuthContext} from './useAuthContext'

export const useLogout = () => {
    const {dispatch} = useAuthContext()

    const logout = () => {
       console.log("user logged out")
        localStorage.clear()
        //update the auth context
        dispatch({type : 'LOGOUT'})
    }

    return {logout} 
}