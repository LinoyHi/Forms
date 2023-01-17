import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { validate } from "../../common/validation";
import { getLoginFormData, checkUser, fogotPasswordMail } from "../../DAL/api";
import Formcomp from "./formComp";
import { useDispatch } from "react-redux";
import { changeUser, addChangePasswordExpiration } from "../../features/user/userSlice";

export default function LogIn() {
    const [data, setdata] = useState(null)
    const dispatch = useDispatch();

    useEffect(() => {
        async function getLoginData() {
            setdata(await getLoginFormData())
        }
        getLoginData()
    }, [])
    const navigate = useNavigate()

    async function setuser(allset) {
        const user = await checkUser(validate(allset.usernameOrEmail.value, { email: true }, "usernameOrEmail") ?
            { username: allset.usernameOrEmail.value, password: allset.password.value }
            : { email: allset.usernameOrEmail.value, password: allset.password.value }
        )
        if (user.ok === true) {
            const userData = await user.json()
            dispatch(changeUser(userData))
            navigate('/home')
        }
        else {
            alert('user name or pasword is wrong')
        }
    }

    async function forgot_password() {
        const date = new Date();
        date.setDate(date.getDate() + 7);
        dispatch(addChangePasswordExpiration(JSON.stringify(date)))
        const identifier = data.usernameOrEmail.value
        let fp= undefined
        if (identifier) {
            validate(identifier, { email: true }, "usernameOrEmail") ?
            dispatch(changeUser({username: identifier}))
            : dispatch(changeUser({email: identifier}))
            validate(identifier, { email: true }, "usernameOrEmail") ?
                fp = await fogotPasswordMail({username: identifier, expiredate: date}) : 
                fp = await fogotPasswordMail({email: identifier, expiredate: date})
            if(fp.ok){
                navigate('/authorize')
                return
            }
        }
        alert('please enter valid user name or your email first')
    }

    return (
        <div className="text-center">
            {data ?
                <Formcomp formTitle='Log In' onclick={setuser}
                    data={data} submitName='enter'></Formcomp> : <h1>please wait..</h1>}
            <p className="App-link" onClick={forgot_password}>forgot password?</p>
            <span><Link to={'/home'}>Enter as guest</Link> OR <Link to={'/signup'}>Sign up</Link></span>
        </div>
    )
}