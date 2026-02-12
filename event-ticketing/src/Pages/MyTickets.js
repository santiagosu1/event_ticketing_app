import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../AppContext";
import "./headerfooter.css"; // Reutilizamos estilos generales

export default function MyTickets() {
    const { user } = useContext(AppContext);
    const navigate = useNavigate();
    const [purchases, setPurchases] = useState([]);

    // Cargar compras al inicio
    useEffect(() => {
        if (!user) {
            // Si no hay usuario, redirigir al login o mostrar mensaje
            // Dejaremos que se renderice el mensaje de "Log in first"
            return;
        }

        // Leer de la "base de datos JSON" (json-server)
        fetch(`http://localhost:3001/purchases?userId=${user.email}`)
            .then((res) => res.json())
            .then((data) => {
                setPurchases(data);
            })
            .catch((err) => {
                console.error("Error fetching tickets:", err);
            });
    }, [user, navigate]);

    if (!user) {
        return (
            <div className="page-container" style={{ textAlign: "center", marginTop: "50px" }}>
                <h2>Please Log In to view your tickets</h2>
                <Link to="/login" className="btn-primary" style={{ display: "inline-block", marginTop: "20px", textDecoration: "none" }}>
                    Go to Login
                </Link>
            </div>
        );
    }

    return (
        <div className="page-container" style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
            <h1>My Tickets</h1>
            <p>Here are your purchased events.</p>

            {purchases.length === 0 ? (
                <div style={{ textAlign: "center", padding: "40px", backgroundColor: "#f9f9f9", borderRadius: "10px" }}>
                    <h3>No tickets found yet!</h3>
                    <p>Explore our events and get your first ticket.</p>
                    <Link to="/" className="btn-primary" style={{ textDecoration: "none", marginTop: "10px", display: "inline-block" }}>
                        Browse Events
                    </Link>
                </div>
            ) : (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px", marginTop: "20px" }}>
                    {purchases.map((purchase) => (
                        <div key={purchase.id} className="card" style={{ padding: "0", overflow: "hidden", display: "flex", flexDirection: "column" }}>
                            <div style={{ height: "150px", overflow: "hidden", position: "relative" }}>
                                <img src={purchase.eventImage} alt={purchase.eventTitle} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                <div style={{ position: "absolute", top: "10px", right: "10px", background: "#00dca8", color: "white", padding: "5px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: "bold" }}>
                                    CONFIRMED
                                </div>
                            </div>

                            <div style={{ padding: "15px", flex: "1" }}>
                                <h3 style={{ margin: "0 0 10px 0", fontSize: "1.2rem" }}>{purchase.eventTitle}</h3>
                                <p style={{ color: "#666", fontSize: "0.9rem", margin: "5px 0" }}>📅 {purchase.eventDate} | {purchase.eventTime}</p>
                                <p style={{ color: "#666", fontSize: "0.9rem", margin: "5px 0" }}>📍 {purchase.eventVenue}</p>

                                <hr style={{ margin: "15px 0", border: "0", borderTop: "1px solid #eee" }} />

                                <div style={{ marginBottom: "15px" }}>
                                    <h4 style={{ fontSize: "1rem", margin: "0 0 5px 0" }}>Tickets:</h4>
                                    {purchase.items.map((item, idx) => (
                                        <div key={idx} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem" }}>
                                            <span>{item.qty}x {item.name}</span>
                                            <span>{purchase.currency === "USD" ? "$" : "S/"} {(item.price * item.qty).toFixed(2)}</span>
                                        </div>
                                    ))}
                                </div>

                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto" }}>
                                    <span style={{ fontSize: "0.8rem", color: "#999" }}>Ordered on: {new Date(purchase.purchaseDate).toLocaleDateString()}</span>
                                    <span style={{ fontWeight: "bold", fontSize: "1.1rem", color: "#333" }}>Total: {purchase.currency === "USD" ? "$" : "S/"} {purchase.total.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
