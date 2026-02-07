export default function CheckOut(){
    return(
        <>
            <div class="page-container">
    
                <main class="main-content">
                    <div class="banner-container">
                        <img src="tu-imagen-teatro.jpg" alt="Portada de la obra"/>
                    </div>

                    <div class="tags">
                        <span class="tag">Arte & Cultura</span>
                        <span class="tag">Lima</span>
                    </div>

                    <section class="event-details">
                        <h1>Amor y Desamor en el MALI</h1>
                        <p class="subtitle">Ruta y experiencia temática</p>
                        <div class="description">
                            <p>Amor y desamor es una experiencia para disfrutar, sentir y compartir. A través del arte, exploraremos las distintas caras del amor...</p>
                        </div>
                    </section>
                </main>

                <aside class="sidebar">
                    
                    <div class="card booking-card">
                        <div class="card-header">
                            <h3>Fecha y Hora</h3>
                        </div>
                        <div class="card-body">
                            <div class="date-option selected">
                                <div class="date-icon">📅</div>
                                <div class="date-info">
                                    <span class="date-text">Jue 12 Feb, '26</span>
                                    <span class="time-text">06:30 PM</span>
                                </div>
                                <div class="check-icon">✔</div>
                            </div>
                        </div>
                    </div>

                    <div class="card tickets-card">
                        <div class="card-header">
                            <h3>Entradas</h3>
                            <a href="#" class="link-action">¿Tienes un código?</a>
                        </div>
                        
                        <div class="card-search-container">
                            <input type="text" class="card-search-input" placeholder="Buscar entradas"/>
                            <span class="card-search-icon">🔍</span>
                        </div>

                        <div class="card-body">
                            <div class="ticket-row">
                                <div class="ticket-info">
                                    <span class="ticket-name">Ruta 1: Visita 18:45 / Taller 20:00</span>
                                    <span class="ticket-price">S/ 49.90</span>
                                </div>
                                <div class="qty-selector">
                                    <button class="btn-qty minus" disabled>−</button>
                                    <span class="qty-number">0</span>
                                    <button class="btn-qty plus">+</button>
                                </div>
                            </div>

                            <div class="ticket-row">
                                <div class="ticket-info">
                                    <span class="ticket-name">Ruta 2: Taller 18:45 / Visita 20:00</span>
                                    <span class="ticket-price">S/ 49.90</span>
                                </div>
                                <div class="qty-selector">
                                    <button class="btn-qty minus">−</button>
                                    <span class="qty-number">0</span>
                                    <button class="btn-qty plus">+</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </aside>
            </div>

            <div class="bottom-sticky-bar">
                <button class="btn-primary">Seleccionar entradas</button>
            </div>
        </>
    )
}