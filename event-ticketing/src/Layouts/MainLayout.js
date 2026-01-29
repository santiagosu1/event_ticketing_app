import { Link, Outlet } from "react-router-dom";
export default function MainLayout() {
    return (
        <>
           <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/login">Login</Link></li>
           </ul>
           <main>
            <Outlet />
           </main>
        </>
    );
}