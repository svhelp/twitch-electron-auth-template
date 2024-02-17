import { logOut } from "renderer/logic/slice";
import { useDispatch } from "react-redux";

export const useLogOut = () => {
    const dispatch = useDispatch();
    
    const onLogOut = () => {
        dispatch(logOut());
        window.electron.ipcRenderer.sendMessage('remove_token', [])
    }

    return onLogOut;
}