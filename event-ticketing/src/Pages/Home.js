import React from "react";
import { useOutletContext } from "react-router-dom";
import HeroCarousel from "../components/HeroCarousel/HeroCarousel";
import EventsSection from "../components/EventsSection/EventsSection";
import Categories from "../components/Categories/Categories";
import eventsData from "../data/events.json";
import "./Home.css";

export default function Home() {
    const { heroSlides, cantMissPlans, recommendedEvents } = eventsData;
    const { searchTerm } = useOutletContext() || { searchTerm: "" };
    const [selectedCategory, setSelectedCategory] = React.useState(null);

    const isFiltering = searchTerm || selectedCategory;

    const filterEvents = (events) => {
        let filtered = events;

        if (selectedCategory) {
            filtered = filtered.filter(event =>
                event.category?.toLowerCase() === selectedCategory.toLowerCase().split(' ')[0] || // Match "Concerts" with "concerts"
                event.tags?.some(tag => selectedCategory.toLowerCase().includes(tag.toLowerCase()))
            );
        }

        if (searchTerm) {
            const lowerTerm = searchTerm.toLowerCase();
            filtered = filtered.filter(event =>
                event.title?.toLowerCase().includes(lowerTerm) ||
                event.subtitle?.toLowerCase().includes(lowerTerm) ||
                event.venue?.toLowerCase().includes(lowerTerm)
            );
        }

        return filtered;
    };

    // If filtering, combine all relevant events into one list for better UX
    // or keep sections separate but filtered. The user asked "solo me muestre lo que busque"
    // implies showing results. Let's filter existing sections first.

    const filteredCantMiss = filterEvents(cantMissPlans);
    const filteredRecommended = filterEvents(recommendedEvents);

    return (
        <div className="home-page">
            <div className="home-container">
                {/* Hero Carousel - Hide when filtering */}
                {!isFiltering && <HeroCarousel slides={heroSlides} />}

                {/* Categories Section - Moved to top for easier filtering if desired, or keep at bottom? 
                    User didn't specify position, but for filtering UX it's usually better at top.
                    However, let's keep it and see. The user said "also allow filtering".
                    I'll add the Categories component here as well or just pass props to the existing one.
                    Wait, if I hide the carousel, I should probably show categories so they can unselect.
                */}

                {/* If filtering, show a "Results" header or similar? */}
                {isFiltering && (
                    <div className="filter-status" style={{ padding: '20px', color: 'white' }}>
                        <h2>
                            {searchTerm ? `Results for "${searchTerm}"` : ''}
                            {searchTerm && selectedCategory ? ' in ' : ''}
                            {selectedCategory ? `${selectedCategory}` : ''}
                        </h2>
                        <button
                            onClick={() => setSelectedCategory(null)}
                            style={{
                                background: 'transparent',
                                border: '1px solid white',
                                color: 'white',
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

                {filteredCantMiss.length === 0 && filteredRecommended.length === 0 && isFiltering && (
                    <div style={{ textAlign: 'center', padding: '50px', color: 'white' }}>
                        <h3>No events found matching your criteria.</h3>
                    </div>
                )}

                {/* Categories Section */}
                <Categories
                    selectedCategory={selectedCategory}
                    onCategorySelect={setSelectedCategory}
                />
            </div>
        </div>
    );
}