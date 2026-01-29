import { useContext } from "react";
import { AppContext } from "../AppContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const{login} = useContext(AppContext);
    const navigate = useNavigate();
    const loginHandler = (e) => {
        e.preventDefault();
        login("test@gmail.com");
        navigate("/");
    }
    return (
        <>
            <h1>Login Page</h1>
            <form onSubmit={loginHandler}>
                <button type="submit">Login</button>
            </form>
        </>

    );
}