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

                {/* Planes Imperdibles Section */}
                <EventsSection
                    subtitle="PLANES"
                    title="IMPERDIBLES"
                    events={planesImperdibles}
                    carousel={true}
                />

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