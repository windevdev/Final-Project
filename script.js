document.addEventListener('DOMContentLoaded', function() {
    const gallery = document.getElementById('gallery');
    const figures = gallery.querySelectorAll('figure');

    // Add tabindex to figures
    figures.forEach((figure, index) => {
        figure.setAttribute('tabindex', '0');
        console.log(`Added tabindex to figure ${index + 1}`);
    });

    // Event listeners for mouse and keyboard events
    figures.forEach(figure => {
        figure.addEventListener('mouseover', expandImage);
        figure.addEventListener('mouseleave', shrinkImage);
        figure.addEventListener('focus', expandImage);
        figure.addEventListener('blur', shrinkImage);
        figure.addEventListener('click', showFullImage);
        figure.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                showFullImage.call(this, event);
            }
        });
    });
});

function expandImage() {
    this.style.transform = 'scale(1.1)';
}

function shrinkImage() {
    this.style.transform = 'scale(1)';
}

function showFullImage(event) {
    event.preventDefault();
    const fullImg = this.querySelector('img').getAttribute('data-full-img');
    const alt = this.querySelector('img').getAttribute('alt');
    const caption = this.querySelector('figcaption').textContent;

    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.style.zIndex = '1000';

    const imgContainer = document.createElement('div');
    imgContainer.innerHTML = `
        <img src="${fullImg}" alt="${alt}" style="max-width: 90%; max-height: 90%; object-fit: contain;">
        <p style="color: white; text-align: center; margin-top: 10px;">${caption}</p>
    `;

    overlay.appendChild(imgContainer);
    document.body.appendChild(overlay);

    overlay.addEventListener('click', function() {
        document.body.removeChild(overlay);
    });

    overlay.focus();
}
