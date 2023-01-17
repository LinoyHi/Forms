import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { disconnect } from "../../features/user/userSlice";

export function Home() {
    const userData = useSelector((state)=>state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate()

    return (
        <>
            <h1>welcome {userData?.user?.firstName || <span className="App-link" onClick={() => navigate('/')}>log in first</span>}</h1>
            {userData?.user?.firstName? <button onClick={()=>dispatch(disconnect())}>log out</button>: 
            <button onClick={()=>navigate('/signup')}>sign up</button>}
        </>
        
    )
}