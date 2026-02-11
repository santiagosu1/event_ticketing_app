import React, { useState, useEffect, useCallback } from 'react';
import './HeroCarousel.css';

export default function HeroCarousel({ slides }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = useCallback(() => {
        setCurrentIndex((prevIndex) =>
            prevIndex === slides.length - 1 ? 0 : prevIndex + 1
        );
    }, [slides.length]);

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? slides.length - 1 : prevIndex - 1
        );
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    // Auto-play carousel
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 5000);

        return () => clearInterval(interval);
    }, [nextSlide]);

    return (
        <div className="hero-carousel">
            <div
                className="hero-carousel-track"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {slides.map((slide, index) => (
                    <div key={index} className="hero-slide">
                        <img src={slide.image} alt={slide.title} />
                    </div>
                ))}
            </div>

            <button
                className="hero-nav-button prev"
                onClick={prevSlide}
                aria-label="Anterior"
            >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 18l-6-6 6-6" />
                </svg>
            </button>

            <button
                className="hero-nav-button next"
                onClick={nextSlide}
                aria-label="Siguiente"
            >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6" />
                </svg>
            </button>

            <div className="hero-indicators">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        className={`hero-indicator ${index === currentIndex ? 'active' : ''}`}
                        onClick={() => goToSlide(index)}
                        aria-label={`Ir a slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
