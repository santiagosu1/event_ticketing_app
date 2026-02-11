import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import eventsData from '../data/events.json';

export default function CheckOut() {
    const { id } = useParams(); 
    const navigate = useNavigate();
    
    const [event, setEvent] = useState(null);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    
    const [ticketQuantities, setTicketQuantities] = useState({});

    useEffect(() => {
        if (id && eventsData.allEvents) {
            const foundEvent = eventsData.allEvents.find(e => e.id === id);
            if (foundEvent) {
                setEvent(foundEvent);
            } else {
                alert("Evento no encontrado");
                navigate('/');
            }
        }
    }, [id, navigate]);

    const handleQtyChange = (ticketId, change) => {
        setTicketQuantities(prev => {
            const currentQty = prev[ticketId] || 0;
            const newQty = Math.max(0, currentQty + change);
            return { ...prev, [ticketId]: newQty };
        });
    };

    const calculateTotal = () => {
        if (!event) return 0;
        return event.ticketTypes.reduce((total, ticket) => {
            const qty = ticketQuantities[ticket.id] || 0;
            return total + (qty * ticket.price);
        }, 0);
    };

    const handlePaymentSubmit = (e) => {
        e.preventDefault();
        setShowPaymentModal(false);
        setShowSuccessModal(true);
    };

    if (!event) return <div className="page-container">Cargando evento...</div>;

    return (
        <>
            <div className="page-container">
                <main className="main-content">
                    <div className="banner-container">
                        <img src={event.image} alt={event.title} />
                    </div>

                    <div className="tags">
                
                        {event.tags && event.tags.map((tag, index) => (
                            <span key={index} className="tag" style={{textTransform: 'capitalize'}}>{tag}</span>
                        ))}
                    </div>

                    <section className="event-details">
                        <h1>{event.title}</h1>
                        <p className="subtitle">{event.category} - {event.venue}</p>
                        <div className="description">
                            <p>{event.description}</p>
                        </div>
                    </section>
                </main>

                <aside className="sidebar">
                    <div className="card booking-card">
                        <div className="card-header">
                            <h3>Fecha y Hora</h3>
                        </div>
                        <div className="card-body">
                            <div className="date-option selected">
                                <div className="date-icon">📅</div>
                                <div className="date-info">
                                    <span className="date-text">{event.date}</span>
                                    <span className="time-text">{event.time} - {event.endTime}</span>
                                </div>
                                <div className="check-icon">✔</div>
                            </div>
                        </div>
                    </div>

                    <div className="card tickets-card">
                        <div className="card-header">
                            <h3>Entradas</h3>
                            <button type="button" className="link-action">¿Tienes un código?</button>
                        </div>
                        
                        <div className="card-search-container">
                            <input type="text" className="card-search-input" placeholder="Buscar entradas"/>
                            <span className="card-search-icon">🔍</span>
                        </div>

                        <div className="card-body">
                            {event.ticketTypes.map((ticket) => (
                                <div className="ticket-row" key={ticket.id}>
                                    <div className="ticket-info">
                                        <span className="ticket-name">{ticket.name}</span>
                                        <span className="ticket-price">
                                            {event.currency === 'USD' ? '$' : 'S/'} {ticket.price.toFixed(2)}
                                        </span>
                                        <span style={{fontSize: '11px', color:'#999'}}>{ticket.description}</span>
                                    </div>
                                    <div className="qty-selector">
                                        <button 
                                            className="btn-qty minus" 
                                            onClick={() => handleQtyChange(ticket.id, -1)}
                                            disabled={!ticketQuantities[ticket.id]}
                                        >−</button>
                                        
                                        <span className="qty-number">
                                            {ticketQuantities[ticket.id] || 0}
                                        </span>
                                        
                                        <button 
                                            className="btn-qty plus"
                                            onClick={() => handleQtyChange(ticket.id, 1)}
                                        >+</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </aside>
            </div>

            <div className="bottom-sticky-bar">
                <button 
                    className="btn-primary" 
                    onClick={() => setShowPaymentModal(true)}
                    disabled={calculateTotal() === 0} 
                >
                    Pagar {event.currency === 'USD' ? '$' : 'S/'} {calculateTotal().toFixed(2)}
                </button>
            </div>

            {showPaymentModal && (
                <div className="modal-overlay">
                    <div className="modal-container">
                        <div className="modal-header">
                            <h3>Finalizar Compra</h3>
                            <button className="close-btn" onClick={() => setShowPaymentModal(false)}>×</button>
                        </div>
                        <form onSubmit={handlePaymentSubmit}>
                            <div className="form-group">
                                <label>Nombre completo</label>
                                <input type="text" placeholder="Ej. Juan Pérez" required />
                            </div>

                            <div className="form-group">
                                <label>Número de tarjeta</label>
                                <input type="text" placeholder="0000 0000 0000 0000" required />
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Expira</label>
                                    <input type="text" placeholder="MM/YY" required />
                                </div>
                                <div className="form-group">
                                    <label>CVV</label>
                                    <input type="text" placeholder="123" required />
                                </div>
                            </div>
                            
                            <div className="modal-footer">
                                <button type="button" className="btn-secondary" onClick={() => setShowPaymentModal(false)}>Cancelar</button>
                                <button type="submit" className="btn-primary">
                                    Confirmar {event.currency === 'USD' ? '$' : 'S/'} {calculateTotal().toFixed(2)}
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
                        <h3>¡Pago Exitoso!</h3>
                        <p>Disfruta de <strong>{event.title}</strong>.</p>
                        <button className="btn-primary" onClick={() => setShowSuccessModal(false)}>Entendido</button>
                    </div>
                </div>
            )}
        </>
    );
}