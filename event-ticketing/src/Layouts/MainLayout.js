import { Link, Outlet } from "react-router-dom";
export default function MainLayout() {
    return (
        <>
            <header>
                <div>
                    <span>Go Home</span>
                </div>

                <div>
                    <input placeholder="Search Events"></input>
                </div>

                <nav>
                    <ul>
                        <li>Find My Ticket</li>
                        <li>Log In</li>
                        <li>Sign Up</li>
                        <li>Check Out</li>
                    </ul>
                </nav>
                
                {/* <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about"></Link></li>
                    <li><Link to="/login">Login</Link></li>
                </ul> */}

           </header>

           <main>
            <Outlet />
           </main>
            
            <footer>
                <div>

                    <div>
                        <span>Logo</span>
                    </div>

                    <div>
                        <h3>About Us</h3>

                        <div>About Us</div>

                        <div>FAQ</div>
                    </div>

                    <div>
                        <h3>Legal</h3>

                        <div>Terms & Condition</div>
                        <div>Privacy</div>
                        <div>Cookies</div>
                    </div>

                    <div>
                        <h3>Follow in our social medias</h3>

                        <nav>
                            <ul>
                                <li>Logo Facebook</li>
                                <li>Logo Instagram</li>
                                <li>Logo X</li>
                                <li>Logo Tik Tok</li>
                                <li>Logo Youtube</li>
                            </ul>
                        </nav>

                        <div>
                            <h3>Help</h3>

                            <div>
                                <button>Contact Us</button>

                                <button>Clean Cookies</button>
                            </div>
                        </div>
                    </div>
                </div>
                <hr/>

                <div>
                    <p>Copyright © Joinnus 2026 | Todos los derechos reservados</p>
                </div>
            </footer>  
        </>
    );
}