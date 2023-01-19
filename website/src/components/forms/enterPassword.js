import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { validateCode } from "../../DAL/api";
import { addChangePasswordExpiration } from "../../features/user/userSlice";
import Formcomp from "./formComp";

export default function VerifyToChange(){
    const userData = useSelector((state)=>state.user);
    const dispatch = useDispatch();

    const navigate = useNavigate()

    useEffect(() => {
        async function validate() {
            const expireDate=new Date(JSON.parse(userData.expiredPasswordChange))
            if(expireDate){
                if(expireDate>new Date()){
                    return
                }
            }
            navigate('/')
        }
        validate()
    }, [])

    async function verify(allset){
        const response= await validateCode(userData.user,allset.password.value)
        if(response.ok){
            const date = new Date(await response.json())
            if(date != userData.expiredPasswordChange){
                dispatch(addChangePasswordExpiration(JSON.stringify(date)))
            }
            if(date > new Date()){
                navigate('/changepassword')
                return
            }
            navigate('/')
            return
        }
        alert('code is invalide')
    }

    return (
        <div className="text-center">
            <span className="p-1 text-bg-secondary fs-4 w-75">you recived an email with a secret code please enter the code here:</span>
            <Formcomp formTitle='Secret Code' onclick={verify} 
            data={{password: {
                id: 1,
                serverName: 'Code',
                placeholder: "Enter Code",
                label: "Code", iconName: "key-fill",
                validations: { require: true, minLen: 8 },
                eror: "",
                type: "current-password",
                class: "col-12",
                value: "",        
                ViewType: "password",
            }}} submitName='Submit'></Formcomp>
        </div>
    )
}