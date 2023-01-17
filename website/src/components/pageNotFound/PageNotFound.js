import { Link, useParams } from "react-router-dom";

export default function PageNotFound() {   
    const { catchAll } = useParams()

    return (
        <div className="text-center">
            <h1>No Page is called {catchAll}</h1>
            <span>go to: 
                <br/>
                <Link to={'/home'}>
                    HomePage as guest
                </Link> OR 
                <Link to={'/signup'}>
                    Sign up
                </Link> 
                <br/> already have an acount? 
                <Link to={'/'}>
                    Log In
                </Link>
            </span>
        </div>
    )
}