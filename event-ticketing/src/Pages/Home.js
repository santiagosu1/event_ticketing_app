import React from "react";
import HeroCarousel from "../components/HeroCarousel/HeroCarousel";
import EventsSection from "../components/EventsSection/EventsSection";
import Categories from "../components/Categories/Categories";
import "./Home.css";

export default function Home() {
    // Hero Carousel Data
    const heroSlides = [
        {
            title: "Shadys 45 años - Gala Sinfónica",
            image: "/images/hero-concert-shadys.png"
        },
        {
            title: "The House - Electronic Music",
            image: "/images/event-the-house.png"
        },
        {
            title: "Le Paris - Fine Dining",
            image: "/images/event-le-paris.png"
        }
    ];

    // Planes Imperdibles Events
    const planesImperdibles = [
        {
            title: "Planes que enamoran | San Valentín 2026",
            date: "29 ENE",
            location: "Lima",
            price: "S/ 10.00",
            image: "/images/event-valentines.png"
        },
        {
            title: "THE HOUSE",
            date: "29 ENE",
            location: "Lima",
            price: "S/ 80.00",
            image: "/images/event-the-house.png"
        },
        {
            title: "Shadys 45 años - Gala Sinfónica",
            date: "13 FEB",
            location: "Lima",
            price: "S/ 150.00",
            image: "/images/hero-concert-shadys.png"
        },
        {
            title: "Circo Montecarlo Huanuco 2026",
            date: "28 ENE",
            location: "Huanuco",
            price: "S/ 20.00",
            image: "/images/event-circus.png"
        },
        {
            title: "Le Paris - Elegant Dinner",
            date: "31 ENE",
            location: "Lima",
            price: "S/ 120.00",
            image: "/images/event-le-paris.png"
        },
        {
            title: "Festival Rock Peruano Vol. 02",
            date: "31 ENE",
            location: "Trujillo",
            price: "S/ 50.00",
            image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=400&h=300&fit=crop"
        },
        {
            title: "SUU RABANAL EN LA LEY",
            date: "31 ENE",
            location: "Callao",
            price: "S/ 50.00",
            image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop"
        },
        {
            title: "SALSA CUMBIA - HERMANOS YAIPEN",
            date: "31 ENE",
            location: "Santa",
            price: "S/ 30.00",
            image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=300&fit=crop"
        }
    ];

    // Eventos Recomendados
    const eventosRecomendados = [
        {
            title: "Circo Montecarlo Huanuco 2026",
            date: "28 ENE",
            location: "Huanuco",
            price: "S/ 90.00",
            image: "/images/event-circus.png"
        },
        {
            title: "Le Paris - Elegant Dinner Event",
            date: "29 ENE",
            location: "Lima",
            price: "S/ 0.00",
            image: "/images/event-le-paris.png"
        },
        {
            title: "THE HOUSE - Electronic Night",
            date: "30 ENE",
            location: "Lima",
            price: "S/ 12.90",
            image: "/images/event-the-house.png"
        },
        {
            title: "Shadys - Gala Sinfónica",
            date: "30 ENE",
            location: "Lima",
            price: "S/ 149.00",
            image: "/images/hero-concert-shadys.png"
        }
    ];

    return (
        <div className="home-page">
            <div className="home-container">
                {/* Hero Carousel */}
                <HeroCarousel slides={heroSlides} />

                {/* Categories Section - Moved to top for easier filtering if desired, or keep at bottom? 
                    User didn't specify position, but for filtering UX it's usually better at top.
                    However, let's keep it and see. The user said "also allow filtering".
                    I'll add the Categories component here as well or just pass props to the existing one.
                    Wait, if I hide the carousel, I should probably show categories so they can unselect.
                */}

                {/* If filtering, show a "Results" header or similar? */}
                {isFiltering && (
                    <div className="filter-status" style={{ padding: '20px', color: '#808080' }}>
                        <h2>
                            {searchTerm ? `Results for "${searchTerm}"` : ''}
                            {searchTerm && selectedCategory ? ' in ' : ''}
                            {selectedCategory ? `${selectedCategory}` : ''}
                        </h2>
                        <button
                            onClick={() => setSelectedCategory(null)}
                            style={{
                                background: 'transparent',
                                border: '1px solid #808080',
                                color: '#808080',
                                padding: '5px 10px',
                                marginTop: '10px',
                                cursor: 'pointer',
                                display: selectedCategory ? 'inline-block' : 'none'
                            }}
                        >
                            Clear Category
                        </button>
                    </div>
                )}

                {/* Can't Miss Plans Section */}
                {(filteredCantMiss.length > 0) && (
                    <EventsSection
                        subtitle={isFiltering ? "RESULTS" : "PLANS"}
                        title={isFiltering ? "MATCHING EVENTS" : "CAN'T MISS"}
                        events={filteredCantMiss}
                        carousel={!isFiltering} // Disable carousel mode when filtering to show grid
                        paged={isFiltering}     // Enable pagination/grid when filtering
                        sortByDate={true}
                        overlayNav={false}
                    />
                )}

                {/* Recommended Events Section */}
                {(filteredRecommended.length > 0) && (
                    <EventsSection
                        subtitle={isFiltering ? "MORE" : "EVENTS YOU MIGHT"}
                        title={isFiltering ? "RESULTS" : "LIKE"}
                        events={filteredRecommended}
                        note={!isFiltering ? "We suggest events based on your previous purchases and searches." : ""}
                        carousel={false}
                        paged={isFiltering} // Consistent grid view when filtering
                    />
                )}

                {/* Eventos Recomendados Section */}
                <EventsSection
                    subtitle="EVENTOS QUE PODRÍAN"
                    title="GUSTARTE"
                    events={eventosRecomendados}
                    note="Te sugerimos eventos basándonos en tu historial de compras y búsquedas anteriores."
                    carousel={false}
                />

                {/* Categories Section */}
                <Categories />
            </div>
        </div>
    );
}