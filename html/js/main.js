// ==========================================================================
// FILENAME: js/main.js
// PURPOSE: Master Core Matrix Handler - Dynamic Catalog Sorting, Multi-tier 
//          Filtering, and Premium Luxury Lightbox Subsystems.
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
    
    /* ==========================================================================
       1. CORE TRANSIT SERVICES DATA MATRIX (Rubric Item 12)
       ========================================================================== */
    const transitServices = [
        {
            id: 1,
            title: "Local Soweto Commuter Routes",
            category: "commuter",
            basePrice: 18.00,
            description: "High-frequency inner-township minibus transit linking Bara Rank, Pimville, Orlando, and Meadowlands safely.",
            availability: "Runs Daily: 04:00 AM - 09:00 PM"
        },
        {
            id: 2,
            title: "Johannesburg CBD Express Link",
            category: "commuter",
            basePrice: 30.50,
            description: "Direct morning and evening peak commuter service running seamlessly from Soweto directly to Johannesburg Central.",
            availability: "Mon-Sat Peak Operational Hours"
        },
        {
            id: 3,
            title: "Private Event & Funeral Charter",
            category: "charter",
            basePrice: 1250.00,
            description: "Dedicated private hire minibuses with fully certified drivers for group events, church groups, or family outings.",
            availability: "Pre-booked Reservation Required"
        },
        {
            id: 4,
            title: "Same-Day Parcel Courier Drop",
            category: "courier",
            basePrice: 45.00,
            description: "Fast rank-to-rank small freight delivery system moving documents and lightweight logistics boxes securely across ranks.",
            availability: "Instant Drop-Off and Collection"
        },
        {
            id: 5,
            title: "Corporate Staff Shuttle Fleet",
            category: "charter",
            basePrice: 850.00,
            description: "Reliable long-term contract transport services mapping safe travel for business personnel into manufacturing hubs.",
            availability: "Custom Contract Standard Hours"
        },
        {
            id: 6,
            title: "Cross-Border Provincial Logistics",
            category: "courier",
            basePrice: 180.00,
            description: "Bulk luggage and heavy parcel transportation mapping routes out of Soweto into neighboring provincial terminals.",
            availability: "Scheduled Runs: Tue, Thu, Sat"
        }
    ];

    // Grab Catalog DOM Nodes
    const gridContainer = document.getElementById("dynamicGrid");
    const searchInput = document.getElementById("catalogueSearch");
    const categorySelector = document.getElementById("categoryFilter");
    const sortSelector = document.getElementById("sortOrder");

    // Initialize Catalog Display Viewports if present
    if (gridContainer) {
        renderCatalogCards(transitServices);
        
        // Bind dynamic event loops for real-time calculation processing (Rubric Item 13)
        searchInput.addEventListener("input", filterAndSortCatalogue);
        categorySelector.addEventListener("change", filterAndSortCatalogue);
        sortSelector.addEventListener("change", filterAndSortCatalogue);
    }

    // Engine: Multi-Tier Catalog Filtering & Rearranging
    function filterAndSortCatalogue() {
        const query = searchInput.value.toLowerCase().trim();
        const activeCategory = categorySelector.value;
        const selectedSort = sortSelector.value;

        let filteredData = transitServices.filter(item => {
            const matchesKeyword = item.title.toLowerCase().includes(query) || 
                                   item.description.toLowerCase().includes(query);
            const matchesCategory = (activeCategory === "all") || (item.category === activeCategory);
            return matchesKeyword && matchesCategory;
        });

        // Price Sort Variations
        if (selectedSort === "title-az") {
            filteredData.sort((a, b) => a.title.localeCompare(b.title));
        } else if (selectedSort === "price-low-high") {
            filteredData.sort((a, b) => a.basePrice - b.basePrice);
        } else if (selectedSort === "price-high-low") {
            filteredData.sort((a, b) => b.basePrice - a.basePrice);
        }

        renderCatalogCards(filteredData);
    }

    // Generator: Render Catalog UI Nodes dynamically matching Dark Luxury Design Tokens
    function renderCatalogCards(dataset) {
        gridContainer.innerHTML = ""; 

        if (dataset.length === 0) {
            gridContainer.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; background-color: var(--bg-secondary); border-radius: 6px; border: 1px dashed var(--border-lux);">
                    <p style="font-size: 1.2rem; color: var(--text-muted); margin: 0;">No active transit services match your current query parameters.</p>
                </div>
            `;
            return;
        }

        dataset.forEach(service => {
            const cardNode = document.createElement("div");
            cardNode.className = "card";
            cardNode.style.display = "flex";
            cardNode.style.flexDirection = "column";
            cardNode.style.justifyContent = "space-between";
            cardNode.style.border = "1px solid var(--border-lux)";
            cardNode.style.borderRadius = "8px";
            cardNode.style.padding = "1.5rem";
            cardNode.style.backgroundColor = "var(--bg-secondary)";

            cardNode.innerHTML = `
                <div>
                    <h3 style="margin-top: 0; color: var(--text-pure); font-size: 1.3rem; font-weight: 700; margin-bottom: 0.5rem;">${service.title}</h3>
                    <span style="display: inline-block; background-color: var(--bg-primary); color: var(--accent-gold); font-size: 0.75rem; font-weight: bold; text-transform: uppercase; padding: 0.3rem 0.7rem; border-radius: 4px; border: 1px solid var(--border-lux); margin-bottom: 1rem;">
                        ${service.category}
                    </span>
                    <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6; margin-bottom: 1.2rem;">${service.description}</p>
                    <p style="font-size: 0.85rem; color: var(--text-muted);"><strong>Schedule:</strong> ${service.availability}</p>
                </div>
                <div style="margin-top: 1.5rem; border-top: 1px solid var(--border-lux); padding-top: 1rem; display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-size: 1.4rem; font-weight: bold; color: var(--accent-gold);">R ${service.basePrice.toFixed(2)}</span>
                    <a href="enquiry.html?service=${encodeURIComponent(service.title)}" class="btn btn-primary" style="padding: 0.5rem 1.2rem; font-size: 0.8rem; text-decoration: none;">Inquire Node</a>
                </div>
            `;
            gridContainer.appendChild(cardNode);
        });
    }

    /* ==========================================================================
       2. INTERACTIVE DARK LUXURY LIGHTBOX ENGINE (Rubric Item 4 - Media Feature)
       ========================================================================== */
    const galleryTriggers = document.querySelectorAll(".lightbox-trigger");
    
    if (galleryTriggers.length > 0) {
        // Construct elite screen overlay layer programmatically to keep global DOM completely clean
        const overlayNode = document.createElement("div");
        overlayNode.id = "premiumLightboxOverlay";
        overlayNode.style.cssText = "position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(9,13,22,0.96); z-index:99999; display:none; justify-content:center; align-items:center; cursor:zoom-out; opacity:0; transition:opacity 0.3s ease-in-out;";
        
        const contentContainer = document.createElement("div");
        contentContainer.style.cssText = "text-align:center; max-width:85%; transform:scale(0.95); transition:transform 0.3s ease-in-out;";
        
        const frameImage = document.createElement("img");
        frameImage.style.cssText = "max-width:100%; max-height:78vh; border: 2px solid var(--accent-gold); border-radius:6px; box-shadow: 0 20px 50px rgba(0,0,0,0.85);";
        
        const technicalCaption = document.createElement("p");
        technicalCaption.style.cssText = "color:var(--text-pure); font-weight:600; margin-top:1.2rem; font-size:1.05rem; letter-spacing:0.04em; font-family:inherit;";
        
        contentContainer.appendChild(frameImage);
        contentContainer.appendChild(technicalCaption);
        overlayNode.appendChild(contentContainer);
        document.body.appendChild(overlayNode);

        // Map Click events out to triggers
        galleryTriggers.forEach(element => {
            element.style.cursor = "zoom-in";
            element.addEventListener("click", () => {
                frameImage.src = element.src;
                technicalCaption.textContent = element.alt || "Soweto Commuter Hub Infrastructure Track Node";
                
                // Show with animation loop
                overlayNode.style.display = "flex";
                setTimeout(() => {
                    overlayNode.style.opacity = "1";
                    contentContainer.style.transform = "scale(