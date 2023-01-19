import { Link, useParams } from "react-router-dom";

export default function PageNotFound() {
    const { catchAll } = useParams()

    return (
        <div className="text-center">
            <h1>No Page is called {catchAll}</h1>
            <span>go to:
                <br />
                <div className="p-1 text-bg-light">
                    <span> already have an acount? </span>
                    <Link to={'/'}>
                        Log In
                    </Link>
                    <br />
                    <Link to={'/home'}>
                        Home as a guest
                    </Link>
                    <span> OR </span>
                    <Link to={'/signup'}>
                        Sign up
                    </Link>
                </div>
            </span>
        </div>
    )
}