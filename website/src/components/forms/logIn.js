import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { validate } from "../../common/validation";
import { getLoginFormData, fogotPasswordMail } from "../../DAL/api";
import Formcomp from "./formComp";
import { useDispatch, useSelector } from "react-redux";
import { changeUser, addChangePasswordExpiration, connectUser } from "../../features/user/userSlice";

export default function LogIn() {
    const { user } = useSelector((state)=>state.user);
    const [data, setdata] = useState(null)
    const dispatch = useDispatch();


    useEffect(() => {
        async function getLoginData() {
            setdata(await getLoginFormData())
        }
        getLoginData()
    }, [])
    const navigate = useNavigate()

    function setuser(allset) {
        dispatch(connectUser(allset))
        user ? navigate('/home') : alert('password or username is incorrect')
    }

    async function forgot_password() {
        const identifierObj = data.usernameOrEmail
        if(!identifierObj.eror){

            const date = new Date();
            date.setDate(date.getDate() + 7);
            dispatch(addChangePasswordExpiration(JSON.stringify(date)))
            const identifier = identifierObj.value
            let fp = undefined
            if (identifier) {
                validate(identifier, { email: true }, "usernameOrEmail") ?
                    dispatch(changeUser({ username: identifier }))
                    : dispatch(changeUser({ email: identifier }))
                validate(identifier, { email: true }, "usernameOrEmail") ?
                    fp = await fogotPasswordMail({ username: identifier, expiredate: date }) :
                    fp = await fogotPasswordMail({ email: identifier, expiredate: date })
                if (fp.ok) {
                    navigate('/authorize')
                    return
                }
            }
            identifierObj.eror = 'please enter user name or email before clicking on forgot password'
        }
        if(!identifierObj.eror.includes('valid')) {
            identifierObj.eror+=', please enter a valid user name or email before clicking on forgot password'
        }
    }

    return (
        <div className="text-center">
            {data ?
                <Formcomp formTitle='Log In' onclick={setuser}
                    data={data} submitName='enter'></Formcomp> : <h1>please wait..</h1>}
            <div className="p-1 text-bg-light">
                <Link onClick={forgot_password}>forgot password?</Link>
                <br/>
                <span><Link to={'/home'}>Enter as guest</Link> OR <Link to={'/signup'}>Sign up</Link></span>
            </div>
        </div>
    )
}