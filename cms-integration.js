// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're in the CMS admin interface
    if (window.location.pathname.includes('/admin/')) {
        return;
    }

    // Fetch the index.html file to parse frontmatter
    fetch(window.location.pathname)
        .then(response => response.text())
        .then(html => {
            // Parse the frontmatter from the HTML
            const frontmatter = parseFrontmatter(html);
            if (frontmatter) {
                // Inject the CMS content into the page
                injectCmsContent(frontmatter);
            }
        })
        .catch(error => console.error('Error loading CMS content:', error));
});

function parseFrontmatter(html) {
    const frontmatterRegex = /^---\n([\s\S]*?)\n---/;
    const match = html.match(frontmatterRegex);
    
    if (!match) return null;

    const frontmatterContent = match[1];
    const lines = frontmatterContent.split('\n');
    const data = {};

    lines.forEach(line => {
        const colonIndex = line.indexOf(':');
        if (colonIndex > -1) {
            const key = line.substring(0, colonIndex).trim();
            let value = line.substring(colonIndex + 1).trim();
            
            // Remove any invisible characters (like zero-width spaces)
            value = value.replace(/[\u200B-\u200D\uFEFF]/g, '');
            
            data[key] = value;
        }
    });

    return data;
}

function injectCmsContent(data) {
    // Hero Section
    if (data.hero_heading) {
        const heroHeading = document.querySelector('.hero-content h2');
        if (heroHeading) heroHeading.textContent = data.hero_heading;
    }
    
    if (data.hero_text) {
        const heroText = document.querySelector('.hero-content p');
        if (heroText) heroText.textContent = data.hero_text;
    }
    
    if (data.hero_button_text) {
        const heroButton = document.querySelector('.hero-button');
        if (heroButton) heroButton.textContent = data.hero_button_text;
    }
    
    // About Section
    if (data.about_heading) {
        const aboutHeading = document.querySelector('.about-content h2');
        if (aboutHeading) aboutHeading.textContent = data.about_heading;
    }
    
    if (data.about_text) {
        const aboutText = document.querySelector('.about-content p');
        if (aboutText) aboutText.innerHTML = marked.parse(data.about_text);
    }
    
    // Vision Section
    if (data.vision_text) {
        const visionText = document.querySelector('.vision-content p');
        if (visionText) visionText.innerHTML = marked.parse(data.vision_text);
    }
    
    // Update page title
    if (data.title) {
        document.title = data.title;
    }
}
