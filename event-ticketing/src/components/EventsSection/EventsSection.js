import React, { useEffect, useMemo, useRef, useState } from 'react';
import EventCard from '../EventCard/EventCard';
import './EventsSection.css';

// Mapa para convertir abreviaturas de meses (inglés y español) a índices numéricos (0-11)
// Esto permite ordenar correctamente las fechas independientemente del idioma.
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

// Función auxiliar para "parsar" (analizar) el texto de la fecha (ej: "12 OCT")
// Retorna un objeto { month, day } numérico para facilitar la comparación.
const parseDateLabel = (value) => {
    // Si no hay valor, retornamos valores altos (99) para que aparezcan al final
    if (!value) {
        return { month: 99, day: 99 };
    }

    // Divide "12 OCT" en ["12", "OCT"] usando expresiones regulares para espacios
    const [dayPart, monthPart] = value.trim().split(/\s+/);
    const day = parseInt(dayPart, 10);
    const monthKey = monthPart ? monthPart.toUpperCase() : '';
    
    // Busca el índice del mes en el mapa, si no existe usa 99
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
    carousel = false, // Modo carrusel: scroll horizontal
    paged = false,    // Modo paginado: cambio de "páginas"
    sortByDate = false, // Activar ordenamiento automático por fecha
    overlayNav = false  // Si los controles de navegación flotan sobre el contenido
}) {
    const scrollRef = useRef(null); // Referencia al contenedor para controlar el scroll
    const [scrollPosition, setScrollPosition] = useState(0); // Posición actual del scroll
    const [maxScroll, setMaxScroll] = useState(0); // Límite máximo de scroll posible
    const [pageIndex, setPageIndex] = useState(0); // Página actual en modo paginado
    const [itemsPerPage, setItemsPerPage] = useState(4); // Cantidad de eventos por página (responsivo)

    // Lógica para determinar el modo de visualización. 
    // Si 'paged' está activo, 'useCarousel' se desactiva.
    const useCarousel = carousel && !paged;
    const showNav = useCarousel || paged;

    // useMemo memoriza el arreglo ordenado para no re-calcularlo en cada render innecesariamente
    const orderedEvents = useMemo(() => {
        if (!sortByDate) {
            return events;
        }

        // Crea una copia [...events] y la ordena comparando fechas
        return [...events].sort((a, b) => {
            const left = parseDateLabel(a.date);
            const right = parseDateLabel(b.date);

            // Primero compara por mes
            if (left.month !== right.month) {
                return left.month - right.month;
            }

            // Si el mes es igual, compara por día
            return left.day - right.day;
        });
    }, [events, sortByDate]);

    // Efecto para calcular el scroll máximo disponible cuando cambia el contenido o tamaño
    // Solo activo en modo carrusel
    useEffect(() => {
        if (!useCarousel || !scrollRef.current) return;

        const updateMaxScroll = () => {
            const container = scrollRef.current;
            if (container) {
                // maxScroll = ancho total del contenido - ancho visible
                setMaxScroll(container.scrollWidth - container.clientWidth);
            }
        };

        updateMaxScroll();
        window.addEventListener('resize', updateMaxScroll);
        
        // Timeout para asegurar que el cálculo se haga después de cargar imágenes/fuentes
        const timer = setTimeout(updateMaxScroll, 500);

        return () => {
            window.removeEventListener('resize', updateMaxScroll);
            clearTimeout(timer);
        };
    }, [useCarousel, orderedEvents]);

    // Efecto para ajustar dinámicamente cuántos ítems caben por página según el ancho de la pantalla
    // Solo activo en modo paginado
    useEffect(() => {
        if (!paged) {
            return;
        }

        const updateItemsPerPage = () => {
            const width = window.innerWidth;
            let perPage = 4; // Valor por defecto para escritorio

            if (width < 600) {
                perPage = 1; // Móvil
            } else if (width < 900) {
                perPage = 2; // Tablet vertical
            } else if (width < 1200) {
                perPage = 3; // Tablet horizontal / Laptop pequeña
            }

            setItemsPerPage(perPage);
        };

        updateItemsPerPage();
        window.addEventListener('resize', updateItemsPerPage);

        return () => window.removeEventListener('resize', updateItemsPerPage);
    }, [paged]);

    // Cálculo del número total de páginas basado en eventos filtrados y items por página
    const totalPages = paged
        ? Math.max(1, Math.ceil(orderedEvents.length / itemsPerPage))
        : 1;

    // Efecto de seguridad: si cambiamos el tamaño de pantalla y el índice actual 
    // queda fuera de rango (ej: estábamos en pág 5 y ahora solo hay 3), volvemos a la última válida.
    useEffect(() => {
        if (!paged) {
            return;
        }

        if (pageIndex > totalPages - 1) {
            setPageIndex(Math.max(0, totalPages - 1));
        }
    }, [paged, pageIndex, totalPages]);

    // Obtiene el subconjunto de eventos a mostrar en la página actual
    const visibleEvents = paged
        ? orderedEvents.slice(
            pageIndex * itemsPerPage,
            pageIndex * itemsPerPage + itemsPerPage
        )
        : orderedEvents;

    // Función para realizar el scroll suave en modo carrusel
    const scroll = (direction) => {
        const container = scrollRef.current;
        if (!container) return;

        const cardWidth = 300; // Ancho aproximado de desplazamiento
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

    // Variables booleanas para saber si se puede navegar en una dirección
    const canScrollLeft = scrollPosition > 0;
    const canScrollRight = maxScroll > 0 && scrollPosition < maxScroll - 10;

    // Unifica la lógica de "puede ir atrás/adelante" sea carrusel o paginado
    const canGoPrev = paged ? pageIndex > 0 : canScrollLeft;
    const canGoNext = paged ? pageIndex < totalPages - 1 : canScrollRight;

    // Manejador del botón "Anterior"
    const handlePrev = () => {
        if (paged) {
            setPageIndex((current) => Math.max(0, current - 1));
            return;
        }

        scroll('left');
    };

    // Manejador del botón "Siguiente"
    const handleNext = () => {
        if (paged) {
            setPageIndex((current) => Math.min(totalPages - 1, current + 1));
            return;
        }

        scroll('right');
    };

    // Estilos CSS Grid dinámicos para mantener las columnas correctas en modo paginado
    const gridStyle = paged
        ? { gridTemplateColumns: `repeat(${itemsPerPage}, minmax(0, 1fr))` }
        : undefined;

    // JSX de los botones de navegación (flechas)
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

                {/* Muestra controles en el encabezado si NO es overlay */}
                {showNav && !overlayNav && navControls}
            </div>

            <div className="events-grid-container">
                {/* Muestra controles flotantes si es overlay */}
                {showNav && overlayNav && navControls}
                
                {/* Contenedor desplazable */}
                <div
                    className={`events-grid-wrapper ${useCarousel ? 'carousel-wrapper' : ''} ${paged ? 'paged-wrapper' : ''}`}
                    ref={useCarousel ? scrollRef : null}
                    onScroll={() => {
                        // Actualiza el estado del scroll para saber si mostrar flechas
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

            {/* Indicadores de página (bolitas) en la parte inferior si hay múltiples páginas */}
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
