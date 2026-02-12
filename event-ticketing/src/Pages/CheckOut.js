import React, { useState, useEffect, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import eventsData from "../data/events.json";
import { AppContext } from "../AppContext";

export default function CheckOut() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { user } = useContext(AppContext); // ✅ traer usuario logueado

  const [event, setEvent] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [ticketQuantities, setTicketQuantities] = useState({});
  const [authError, setAuthError] = useState(""); // ✅ mensaje si no está logueado

  useEffect(() => {
    if (id && eventsData.allEvents) {
      const foundEvent = eventsData.allEvents.find((e) => e.id === id);
      if (foundEvent) {
        setEvent(foundEvent);
      } else {
        alert("Event not found");
        navigate("/");
      }
    }
  }, [id, navigate]);

  const handleQtyChange = (ticketId, change) => {
    setTicketQuantities((prev) => {
      const currentQty = prev[ticketId] || 0;
      const newQty = Math.max(0, currentQty + change);
      return { ...prev, [ticketId]: newQty };
    });
  };

  const calculateTotal = () => {
    if (!event) return 0;
    return event.ticketTypes.reduce((total, ticket) => {
      const qty = ticketQuantities[ticket.id] || 0;
      return total + qty * ticket.price;
    }, 0);
  };

  // ✅ cuando le den a "Pay"
  const handlePayClick = () => {
    setAuthError("");

    // 1) Debe tener tickets
    if (calculateTotal() === 0) return;

    // 2) Debe estar logueado
    if (!user) {
      setAuthError("You must be logged in to proceed with payment.");
      // Opcional: puedes llevarlo a /login si usas ruta
      // navigate("/login");
      return;
    }

    // 3) Si está logueado, abre modal de pago
    setShowPaymentModal(true);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();

    // Crear objeto de compra
    const purchase = {
      id: Date.now(),
      userId: user.email, // Relacionamos con el usuario
      eventId: event.id,
      eventTitle: event.title,
      eventDate: event.date,
      eventTime: event.time,
      eventVenue: event.venue,
      eventImage: event.image,
      currency: event.currency,
      purchaseDate: new Date().toISOString(),
      items: event.ticketTypes
        .filter(t => ticketQuantities[t.id] > 0)
        .map(t => ({
          id: t.id,
          name: t.name,
          qty: ticketQuantities[t.id],
          price: t.price
        })),
      total: calculateTotal()
    };

    // Guardar en purchases.json (via json-server en localhost:3001)
    fetch("http://localhost:3001/purchases", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(purchase),
    })
      .then((response) => response.json())
      .then(() => {
        // Solo cerrar modal si se guardó correctamente
        setShowPaymentModal(false);
        setShowSuccessModal(true);
      })
      .catch((error) => {
        console.error("Error saving purchase:", error);
        alert("Failed to save purchase. Please try again.");
      });
  };

  if (!event) return <div className="page-container">Loading event...</div>;

  return (
    <>
      <div className="page-container">
        <main className="main-content">
          <div className="banner-container">
            <img src={event.image} alt={event.title} />
          </div>

          <div className="tags">
            {event.tags &&
              event.tags.map((tag, index) => (
                <span
                  key={index}
                  className="tag"
                  style={{ textTransform: "capitalize" }}
                >
                  {tag}
                </span>
              ))}
          </div>

          <section className="event-details">
            <h1>{event.title}</h1>
            <p className="subtitle">
              {event.category} - {event.venue}
            </p>
            <div className="description">
              <p>{event.description}</p>
            </div>
          </section>
        </main>

        <aside className="sidebar">
          <div className="card booking-card">
            <div className="card-header">
              <h3>Date and Time</h3>
            </div>
            <div className="card-body">
              <div className="date-option selected">
                <div className="date-icon">📅</div>
                <div className="date-info">
                  <span className="date-text">{event.date}</span>
                  <span className="time-text">
                    {event.time} - {event.endTime}
                  </span>
                </div>
                <div className="check-icon">✔</div>
              </div>
            </div>
          </div>

          <div className="card tickets-card">
            <div className="card-header">
              <h3>Tickets</h3>
              <button type="button" className="link-action">
                Do you have a code?
              </button>
            </div>

            <div className="card-search-container">
              <input
                type="text"
                className="card-search-input"
                placeholder="Search tickets"
              />
              <span className="card-search-icon">🔍</span>
            </div>

            <div className="card-body">
              {event.ticketTypes.map((ticket) => (
                <div className="ticket-row" key={ticket.id}>
                  <div className="ticket-info">
                    <span className="ticket-name">{ticket.name}</span>
                    <span className="ticket-price">
                      {event.currency === "USD" ? "$" : "S/"}{" "}
                      {ticket.price.toFixed(2)}
                    </span>
                    <span style={{ fontSize: "11px", color: "#999" }}>
                      {ticket.description}
                    </span>
                  </div>

                  <div className="qty-selector">
                    <button
                      className="btn-qty minus"
                      onClick={() => handleQtyChange(ticket.id, -1)}
                      disabled={!ticketQuantities[ticket.id]}
                      type="button"
                    >
                      −
                    </button>

                    <span className="qty-number">
                      {ticketQuantities[ticket.id] || 0}
                    </span>

                    <button
                      className="btn-qty plus"
                      onClick={() => handleQtyChange(ticket.id, 1)}
                      type="button"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>

      <div className="bottom-sticky-bar">
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <button
            className="btn-primary"
            onClick={handlePayClick}
            disabled={calculateTotal() === 0}
            type="button"
          >
            Pay {event.currency === "USD" ? "$" : "S/"}{" "}
            {calculateTotal().toFixed(2)}
          </button>

          {/* ✅ mensaje si no está logueado */}
          {authError && (
            <span style={{ fontSize: "12px", color: "#EF4444" }}>
              {authError}{" "}
              <span style={{ color: "#00dca8", fontWeight: 700 }}>
                (Log In first)
              </span>
            </span>
          )}
        </div>
      </div>

      {showPaymentModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h3>Checkout</h3>
              <button
                className="close-btn"
                onClick={() => setShowPaymentModal(false)}
                type="button"
              >
                ×
              </button>
            </div>

            <form onSubmit={handlePaymentSubmit}>
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" placeholder="e.g. John Doe" required />
              </div>

              <div className="form-group">
                <label>Card Number</label>
                <input type="text" placeholder="0000 0000 0000 0000" required />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Expires</label>
                  <input type="text" placeholder="MM/YY" required />
                </div>
                <div className="form-group">
                  <label>CVV</label>
                  <input type="text" placeholder="123" required />
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setShowPaymentModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Confirm {event.currency === "USD" ? "$" : "S/"}{" "}
                  {calculateTotal().toFixed(2)}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showSuccessModal && (
        <div className="modal-overlay">
          <div className="modal-container success-container">
            <div className="success-icon">🎉</div>
            <h3>Payment Successful!</h3>
            <p>
              Enjoy <strong>{event.title}</strong>.
            </p>
            <Link to="/">
              <button
                className="btn-primary"
                onClick={() => setShowSuccessModal(false)}
                type="button"
              >
                Got it
              </button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
