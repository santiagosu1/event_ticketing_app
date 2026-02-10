import React from 'react';
import './Categories.css';

const categoryIcons = {
    'Arts & Culture': (
        <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 22h15v-2H6.012C5.55 19.988 5 19.805 5 19s.55-.988 1.012-1H21V4c0-1.103-.897-2-2-2H6c-1.206 0-3 .799-3 3v14c0 2.201 1.794 3 3 3zM5 8V5c0-.805.55-.988 1-1h13v12H5V8z" />
            <path d="M8 6h9v2H8z" />
        </svg>
    ),
    'Food & Drinks': (
        <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M8.1 13.34l2.83-2.83L3.91 3.5a4.008 4.008 0 0 0 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.2-1.1-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z" />
        </svg>
    ),
    'Concerts': (
        <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3v9.28c-.47-.17-.97-.28-1.5-.28C8.01 12 6 14.01 6 16.5S8.01 21 10.5 21c2.31 0 4.2-1.75 4.45-4H15V6h4V3h-7z" />
        </svg>
    ),
    'Courses & Workshops': (
        <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z" />
        </svg>
    ),
    'Sports': (
        <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 3.3l1.35-.95c1.82.56 3.37 1.76 4.38 3.34l-.39 1.34-1.35.46L16 6.7V5.3zm-3.35-.95L11 5.3v1.4L10 9.5l-.98.3-1.35-.46-.39-1.34c1.01-1.58 2.56-2.78 4.37-3.34zM7.5 17.7c-1.26-1.23-2.05-2.91-2.17-4.7H7l1.15.85.35 1.45-.9 1.4-1.1 1zm5.5 1.8c-2.76 0-5.3-1.12-7.11-2.94l.89-1.42 1.43.53L9 16.5l2-.5 1 3.5c-.17.02-.33.07-.5.07-.17 0-.33-.05-.5-.07zm2.5-3.2l.89 1.42c-1.81 1.82-4.35 2.94-7.11 2.94-.17 0-.33-.05-.5-.07l1-3.5 2 .5.79-.83 1.43-.53.89 1.42z" />
        </svg>
    ),
    'Entertainment': (
        <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M15 4v8h-2V4H7v8H5V4c0-1.1.9-2 2-2h6c1.1 0 2 .9 2 2zm2 0c0-1.1.9-2 2-2h2v10h-2c-1.1 0-2-.9-2-2V4zM4.74 18.38l10-4.42c.65-.29.65-1.24 0-1.53l-10-4.42C3.97 7.61 3 8.15 3 9.03v9.95c0 .87.97 1.42 1.74 1.03z" />
        </svg>
    )
};

export default function Categories({ selectedCategory, onCategorySelect = () => { } }) {
    const categories = [
        'Arts & Culture',
        'Food & Drinks',
        'Concerts',
        'Courses & Workshops',
        'Sports',
        'Entertainment'
    ];

    return (
        <section className="categories-section">
            <div className="categories-header">
                <div className="categories-title">DISCOVER YOUR</div>
                <h2 className="categories-subtitle">INTERESTS</h2>
            </div>

            <div className="categories-grid">
                {categories.map((category, index) => (
                    <div
                        key={index}
                        className={`category-item ${selectedCategory === category ? 'selected' : ''}`}
                        onClick={() => onCategorySelect(category === selectedCategory ? null : category)}
                    >
                        <div className="category-icon">
                            {categoryIcons[category]}
                        </div>
                        <div className="category-name">{category}</div>
                    </div>
                ))}
            </div>


            <div className="categories-show-more">
                <button className="show-more-btn">
                    Show more
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
            </div>
            <style jsx>{`
                .category-item {
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                .category-item:hover {
                    transform: translateY(-5px);
                    background-color: rgba(255, 255, 255, 0.1);
                }
                .category-item.selected {
                    background-color: var(--primary-color, #ff4d4d);
                    color: white;
                    transform: scale(1.05);
                    box-shadow: 0 4px 15px rgba(255, 77, 77, 0.4);
                }
                .category-item.selected svg {
                    fill: white;
                }
            `}</style>
        </section>
    );
}
