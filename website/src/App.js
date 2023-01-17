import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';
import LogIn from "./components/forms/logIn";
import SignUp from "./components/forms/SignUp";
import { Route, Routes} from 'react-router-dom';
import { Home } from "./components/Home/home";
import ChangePassword from "./components/forms/changePassword";
import { useSelector } from "react-redux";
import PageNotFound from "./components/pageNotFound/PageNotFound";
import VerifyToChange from "./components/forms/enterPassword";

function App() {

  const user = useSelector(state => state.user)

  return (
    <section>
      <main>
        <Routes>
          <Route path='/' element={<LogIn></LogIn>}/>
          <Route path='/signup' element={<SignUp></SignUp>}/>
          <Route path='/home' element={<Home></Home>}/>
          <Route path='/authorize' element={<VerifyToChange></VerifyToChange>}></Route>
          <Route path='/changepassword' element={<ChangePassword></ChangePassword>}/>
          <Route path="/:catchAll" element={<PageNotFound></PageNotFound>}/>
        </Routes>
      </main>
    </section>
    );
  }
  
  export default App;