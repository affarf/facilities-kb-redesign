document.addEventListener("DOMContentLoaded", function () {

    /* =========================================
       DOCUMENT NAVIGATION — MOBILE ONLY
       ========================================= */

    /* Do not create navigation above 600px */
    if (!window.matchMedia("(max-width: 600px)").matches) {
        return;
    }

    /* Don't add document navigation to the homepage */
    if (document.querySelector("#kb-landing-featured-hero")) {
        return;
    }

    /* Only target actual KB document pages */
    const content = document.querySelector(
        '#page-content[role="article"]'
    );

    if (!content) return;

    /* Prevent duplicates */
    if (document.querySelector(".kb-doc-nav")) return;

    const nav = document.createElement("nav");

    nav.className = "kb-doc-nav";

    nav.setAttribute(
        "aria-label",
        "Facilities KnowledgeBase navigation"
    );

    nav.innerHTML = `
    <a href="/facilitiesdemo/" class="kb-doc-nav-link">
        <span class="kb-nav-icon" aria-hidden="true">⌂</span>
        <span>Home</span>
    </a>

    <a href="/facilitiesdemo/topics.php" class="kb-doc-nav-link">
        <span class="kb-nav-icon" aria-hidden="true">☰</span>
        <span>Topics</span>
    </a>

    <button
        type="button"
        class="kb-doc-nav-link kb-doc-back"
        aria-label="Go back to previous page"
    >
        <span class="kb-nav-icon" aria-hidden="true">←</span>
        <span>Back</span>
    </button>
`;

    content.parentNode.insertBefore(nav, content);

    nav.querySelector(".kb-doc-back")
    .addEventListener("click", function () {

        /* Go back if there is a previous page */
        if (window.history.length > 1) {
            window.history.back();
        } else {
            /* Safe fallback */
            window.location.href = "/facilitiesdemo/";
        }

    });

});

document.addEventListener("DOMContentLoaded", function () {

    const mobile = document.querySelector("#mobile-container");

    if (!mobile) return;

    const text = mobile.textContent.trim();

    if (text.includes("No matching documents found")) {

        const suggestLink = mobile.querySelector("a");

        mobile.innerHTML = `
            <div class="kb-no-results">
                <div class="kb-no-results-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24">
                        <circle cx="11" cy="11" r="7"></circle>
                        <line x1="20" y1="20" x2="16.5" y2="16.5"></line>
                    </svg>
                </div>

                <h1>No results found</h1>

                <p>
                    We couldn't find any documents matching your search.
                    Try different keywords or check your spelling.
                </p>

                ${
                    suggestLink
                    ? `<a class="kb-no-results-action"
                         href="${suggestLink.href}">
                         Suggest a new document
                       </a>`
                    : ""
                }
            </div>
        `;
    }

});
document.addEventListener("DOMContentLoaded", function () {

    const homepageSearch =
        document.querySelector("#kb-landing-search-form #q");

    if (!homepageSearch) return;

    homepageSearch.placeholder = "Search the Facilities KB...";

    homepageSearch.setAttribute(
        "aria-label",
        "Search the Facilities KB...."
    );

});

document.addEventListener("DOMContentLoaded", function () {

    /* =========================================
       MOBILE MENU SECTION HEADINGS
       Converts raw KB text into styled headings
       ========================================= */

    /* Mobile only */
    if (!window.matchMedia("(max-width: 600px)").matches) {
        return;
    }

    const mobile = document.querySelector("#mobile-container");

    if (!mobile) return;

    const headingNames = [
        "Top Links",
        "Quick Links",
        "KB Help"
    ];

    Array.from(mobile.childNodes).forEach(function (node) {

        /* Only look at raw text nodes */
        if (node.nodeType !== Node.TEXT_NODE) return;

        const text = node.textContent.trim();

        if (!headingNames.includes(text)) return;

        /* Create a real heading */
        const heading = document.createElement("h2");

        heading.className = "kb-menu-section-heading";
        heading.textContent = text;

        /* Replace raw text with heading */
        node.replaceWith(heading);
    });

});

document.addEventListener("DOMContentLoaded", function () {

    /* =========================================
       MOBILE SITE NAVIGATION
       Home | Topics | Back
       ========================================= */

    /* Mobile only */
    if (!window.matchMedia("(max-width: 600px)").matches) {
        return;
    }

    /* Do not show on homepage */
    if (document.querySelector("#kb-landing-featured-hero")) {
        return;
    }

    const mobile = document.querySelector("#mobile-container");

    if (!mobile) return;

    /* Prevent duplicates */
    if (document.querySelector(".kb-doc-nav")) {
        return;
    }

    const nav = document.createElement("nav");

    nav.className = "kb-doc-nav";

    nav.setAttribute(
        "aria-label",
        "Facilities KnowledgeBase navigation"
    );

    nav.innerHTML = `
        <a href="/facilitiesdemo/" class="kb-doc-nav-link">
            <span class="kb-nav-icon" aria-hidden="true">⌂</span>
            <span>Home</span>
        </a>

        <a href="/facilitiesdemo/topics.php" class="kb-doc-nav-link">
            <span class="kb-nav-icon" aria-hidden="true">☰</span>
            <span>Topics</span>
        </a>

        <button
            type="button"
            class="kb-doc-nav-link kb-doc-back"
            aria-label="Go back to previous page"
        >
            <span class="kb-nav-icon" aria-hidden="true">←</span>
            <span>Back</span>
        </button>
    `;

    /*
       Put navigation at the very top
       of the mobile content area
    */
    mobile.insertBefore(nav, mobile.firstChild);

    /* Back button */
    nav.querySelector(".kb-doc-back")
        .addEventListener("click", function () {

            if (document.referrer) {
                window.history.back();
            } else {
                window.location.href = "/facilitiesdemo/";
            }

        });

});
document.addEventListener("click", function (event) {

    const helpful = event.target.closest("#helpfulBtn");
    const unhelpful = event.target.closest("#unhelpfulBtn");

    if (helpful) {
        helpful.classList.add("kb-vote-selected");
        helpful.classList.add("kb-vote-helpful");

        const other = document.querySelector("#unhelpfulBtn");

        if (other) {
            other.classList.add("kb-vote-not-selected");
        }
    }

    if (unhelpful) {
        unhelpful.classList.add("kb-vote-selected");
        unhelpful.classList.add("kb-vote-unhelpful");

        const other = document.querySelector("#helpfulBtn");

        if (other) {
            other.classList.add("kb-vote-not-selected");
        }
    }

});

(function () {

    const path = window.location.pathname;

    /*
       DEMO environment mapping:

       /facilitiesdemo/          = Internal prototype
       /facilitiesdemo/internal/ = Public prototype
    */

    const isPublicPrototype =
        /^\/facilitiesdemo\/internal(?:\/|$)/i.test(path);

    if (!isPublicPrototype) return;

    document.documentElement.classList.add(
        "kb-public-prototype"
    );

    /*
       Make shared resource links use
       the current DEMO environment.
    */

    document.querySelectorAll(
        ".kb-button-grid a[href]"
    ).forEach(function (link) {

        const url = new URL(link.href, window.location.origin);

        if (url.origin !== window.location.origin) return;

        if (url.pathname.startsWith("/facilitiesdemo/") &&
            !url.pathname.startsWith("/facilitiesdemo/internal/")) {

            url.pathname = url.pathname.replace(
                "/facilitiesdemo/",
                "/facilitiesdemo/internal/"
            );

            link.href = url.pathname + url.search + url.hash;
        }

    });

})();