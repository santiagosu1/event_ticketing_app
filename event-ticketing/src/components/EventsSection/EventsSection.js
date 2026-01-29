import React, { useRef, useState } from 'react';
import EventCard from '../EventCard/EventCard';
import './EventsSection.css';

export default function EventsSection({
    title,
    subtitle,
    events,
    note,
    carousel = false
}) {
    const scrollRef = useRef(null);
    const [scrollPosition, setScrollPosition] = useState(0);

    const scroll = (direction) => {
        const container = scrollRef.current;
        if (!container) return;

        const scrollAmount = 300;
        const newPosition = direction === 'left'
            ? scrollPosition - scrollAmount
            : scrollPosition + scrollAmount;

        container.scrollLeft = newPosition;
        setScrollPosition(newPosition);
    };

    const canScrollLeft = scrollPosition > 0;
    const canScrollRight = scrollRef.current
        ? scrollPosition < (scrollRef.current.scrollWidth - scrollRef.current.clientWidth - 10)
        : false;

    return (
        <section className="events-section">
            <div className="events-section-header">
                <div className="events-section-title-group">
                    {subtitle && <div className="events-section-subtitle">{subtitle}</div>}
                    <h2 className="events-section-title">{title}</h2>
                </div>

                {carousel && (
                    <div className="events-section-nav">
                        <button
                            className="events-nav-btn"
                            onClick={() => scroll('left')}
                            disabled={!canScrollLeft}
                            aria-label="Anterior"
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M15 18l-6-6 6-6" />
                            </svg>
                        </button>
                        <button
                            className="events-nav-btn"
                            onClick={() => scroll('right')}
                            disabled={!canScrollRight}
                            aria-label="Siguiente"
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M9 18l6-6-6-6" />
                            </svg>
                        </button>
                    </div>
                )}
            </div>

            <div className="events-grid-container">
                <div
                    className={`events-grid-wrapper ${carousel ? 'carousel-wrapper' : ''}`}
                    ref={carousel ? scrollRef : null}
                    onScroll={() => {
                        if (carousel && scrollRef.current) {
                            setScrollPosition(scrollRef.current.scrollLeft);
                        }
                    }}
                >
                    <div className={`events-grid ${carousel ? 'carousel' : ''}`}>
                        {events.map((event, index) => (
                            <EventCard key={index} event={event} />
                        ))}
                    </div>
                </div>
            </div>

            {note && <p className="events-note">* {note}</p>}
        </section>
    );
}
