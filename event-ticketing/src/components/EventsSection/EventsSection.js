import React, { useEffect, useMemo, useRef, useState } from 'react';
import EventCard from '../EventCard/EventCard';
import './EventsSection.css';

const MONTH_ORDER = {
    JAN: 0,
    FEB: 1,
    MAR: 2,
    APR: 3,
    MAY: 4,
    JUN: 5,
    JUL: 6,
    AUG: 7,
    SEP: 8,
    SEPT: 8,
    OCT: 9,
    NOV: 10,
    DEC: 11,
    ENE: 0,
    ABR: 3,
    AGO: 7,
    SET: 8,
    DIC: 11
};

const parseDateLabel = (value) => {
    if (!value) {
        return { month: 99, day: 99 };
    }

    const [dayPart, monthPart] = value.trim().split(/\s+/);
    const day = parseInt(dayPart, 10);
    const monthKey = monthPart ? monthPart.toUpperCase() : '';
    const month = Object.prototype.hasOwnProperty.call(MONTH_ORDER, monthKey)
        ? MONTH_ORDER[monthKey]
        : 99;

    return {
        month,
        day: Number.isNaN(day) ? 99 : day
    };
};

export default function EventsSection({
    title,
    subtitle,
    events,
    note,
    carousel = false,
    paged = false,
    sortByDate = false,
    overlayNav = false
}) {
    const scrollRef = useRef(null);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [maxScroll, setMaxScroll] = useState(0);
    const [pageIndex, setPageIndex] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(4);

    const useCarousel = carousel && !paged;
    const showNav = useCarousel || paged;

    const orderedEvents = useMemo(() => {
        if (!sortByDate) {
            return events;
        }

        return [...events].sort((a, b) => {
            const left = parseDateLabel(a.date);
            const right = parseDateLabel(b.date);

            if (left.month !== right.month) {
                return left.month - right.month;
            }

            return left.day - right.day;
        });
    }, [events, sortByDate]);

    // Calculate max scroll when carousel is ready
    useEffect(() => {
        if (!useCarousel || !scrollRef.current) return;

        const updateMaxScroll = () => {
            const container = scrollRef.current;
            if (container) {
                setMaxScroll(container.scrollWidth - container.clientWidth);
            }
        };

        updateMaxScroll();
        window.addEventListener('resize', updateMaxScroll);
        const timer = setTimeout(updateMaxScroll, 500);

        return () => {
            window.removeEventListener('resize', updateMaxScroll);
            clearTimeout(timer);
        };
    }, [useCarousel, orderedEvents]);

    useEffect(() => {
        if (!paged) {
            return;
        }

        const updateItemsPerPage = () => {
            const width = window.innerWidth;
            let perPage = 4;

            if (width < 600) {
                perPage = 1;
            } else if (width < 900) {
                perPage = 2;
            } else if (width < 1200) {
                perPage = 3;
            }

            setItemsPerPage(perPage);
        };

        updateItemsPerPage();
        window.addEventListener('resize', updateItemsPerPage);

        return () => window.removeEventListener('resize', updateItemsPerPage);
    }, [paged]);

    const totalPages = paged
        ? Math.max(1, Math.ceil(orderedEvents.length / itemsPerPage))
        : 1;

    useEffect(() => {
        if (!paged) {
            return;
        }

        if (pageIndex > totalPages - 1) {
            setPageIndex(Math.max(0, totalPages - 1));
        }
    }, [paged, pageIndex, totalPages]);

    const visibleEvents = paged
        ? orderedEvents.slice(
            pageIndex * itemsPerPage,
            pageIndex * itemsPerPage + itemsPerPage
        )
        : orderedEvents;

    const scroll = (direction) => {
        const container = scrollRef.current;
        if (!container) return;

        const cardWidth = 300;
        const currentScroll = container.scrollLeft;
        let newPosition;

        if (direction === 'left') {
            newPosition = Math.max(0, currentScroll - cardWidth);
        } else {
            newPosition = Math.min(maxScroll, currentScroll + cardWidth);
        }

        container.scrollTo({
            left: newPosition,
            behavior: 'smooth'
        });
    };

    const canScrollLeft = scrollPosition > 0;
    const canScrollRight = maxScroll > 0 && scrollPosition < maxScroll - 10;

    const canGoPrev = paged ? pageIndex > 0 : canScrollLeft;
    const canGoNext = paged ? pageIndex < totalPages - 1 : canScrollRight;

    const handlePrev = () => {
        if (paged) {
            setPageIndex((current) => Math.max(0, current - 1));
            return;
        }

        scroll('left');
    };

    const handleNext = () => {
        if (paged) {
            setPageIndex((current) => Math.min(totalPages - 1, current + 1));
            return;
        }

        scroll('right');
    };

    const gridStyle = paged
        ? { gridTemplateColumns: `repeat(${itemsPerPage}, minmax(0, 1fr))` }
        : undefined;

    const navControls = showNav ? (
        <div className={`events-section-nav ${overlayNav ? 'overlay' : ''}`}>
            <button
                className="events-nav-btn"
                onClick={handlePrev}
                disabled={!canGoPrev}
                aria-label="Previous"
            >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 18l-6-6 6-6" />
                </svg>
            </button>
            <button
                className="events-nav-btn"
                onClick={handleNext}
                disabled={!canGoNext}
                aria-label="Next"
            >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6" />
                </svg>
            </button>
        </div>
    ) : null;

    return (
        <section className="events-section">
            <div className="events-section-header">
                <div className="events-section-title-group">
                    {subtitle && <div className="events-section-subtitle">{subtitle}</div>}
                    <h2 className="events-section-title">{title}</h2>
                </div>

                {showNav && !overlayNav && navControls}
            </div>

            <div className="events-grid-container">
                {showNav && overlayNav && navControls}
                <div
                    className={`events-grid-wrapper ${useCarousel ? 'carousel-wrapper' : ''} ${paged ? 'paged-wrapper' : ''}`}
                    ref={useCarousel ? scrollRef : null}
                    onScroll={() => {
                        if (useCarousel && scrollRef.current) {
                            setScrollPosition(scrollRef.current.scrollLeft);
                        }
                    }}
                >
                    <div className={`events-grid ${useCarousel ? 'carousel' : ''}`} style={gridStyle}>
                        {visibleEvents.map((event, index) => (
                            <EventCard key={index} event={event} />
                        ))}
                    </div>
                </div>
            </div>

            {note && <p className="events-note">* {note}</p>}

            {paged && totalPages > 1 && (
                <div className="events-indicators">
                    {Array.from({ length: totalPages }).map((_, index) => (
                        <button
                            key={`page-${index}`}
                            className={`events-indicator ${index === pageIndex ? 'active' : ''}`}
                            onClick={() => setPageIndex(index)}
                            aria-label={`Go to page ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}
