import React from "react";
import HeroCarousel from "../components/HeroCarousel/HeroCarousel";
import EventsSection from "../components/EventsSection/EventsSection";
import Categories from "../components/Categories/Categories";
import eventsData from "../data/events.json";
import "./Home.css";

export default function Home() {
    const { heroSlides, cantMissPlans, recommendedEvents } = eventsData;

    return (
        <div className="home-page">
            <div className="home-container">
                {/* Hero Carousel */}
                <HeroCarousel slides={heroSlides} />

                {/* Can't Miss Plans Section */}
                <EventsSection
                    subtitle="PLANS"
                    title="CAN'T MISS"
                    events={cantMissPlans}
                    carousel={true}
                    sortByDate={true}
                    overlayNav={false}
                />

                {/* Recommended Events Section */}
                <EventsSection
                    subtitle="EVENTS YOU MIGHT"
                    title="LIKE"
                    events={recommendedEvents}
                    note="We suggest events based on your previous purchases and searches."
                    carousel={false}
                />

                {/* Categories Section */}
                <Categories />
            </div>
        </div>
    );
}