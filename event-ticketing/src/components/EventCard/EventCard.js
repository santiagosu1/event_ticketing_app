import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EventCard.css';

export default function EventCard({ event }) {
    const [liked, setLiked] = useState(false);
    const navigate = useNavigate();

    function HandleEventClick(){
        navigate(`/checkout/${event.id}`);
    }

    return (
        <div className="event-card">
            <img
                onClick={HandleEventClick}
                src={event.image}
                alt={event.title}
                className="event-card-image"
            />
            <div className="event-card-content">
                <div className="event-card-date-location">
                    <div className="event-card-date">
                        {event.date}
                    </div>
                    <div className="event-card-location">
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                        </svg>
                        {event.location}
                    </div>
                </div>

                <h3 className="event-card-title">{event.title}</h3>

                <div className="event-card-footer">
                    <div className="event-card-price">
                        <span className="event-card-price-label">From</span>
                        <span className="event-card-price-value">{event.price}</span>
                    </div>

                    <div className="event-card-actions">
                        <button
                            type="button"
                            className={`event-card-action-btn ${liked ? 'liked' : ''}`}
                            onClick={(e) => {
                                e.stopPropagation();
                                setLiked(!liked);
                            }}
                            aria-label="Favorite"
                        >
                            <svg viewBox="0 0 24 24" fill={liked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                            </svg>
                        </button>

                        <button
                            type="button"
                            className="event-card-action-btn"
                            onClick={(e) => e.stopPropagation()}
                            aria-label="Share"
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="18" cy="5" r="3" />
                                <circle cx="6" cy="12" r="3" />
                                <circle cx="18" cy="19" r="3" />
                                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
