async function fetchData() {
    try {
        const response = await fetch('activity.json');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch days data:', error);
    }
}

function openLightbox(src, caption) {
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <span class="close">&times;</span>
            <img src="${src}" alt="Expanded photo">
            <p class="lightbox-caption">${caption}</p>
        </div>
    `;
    document.body.appendChild(lightbox);

    const closeBtn = document.querySelector('.close');
    closeBtn.addEventListener('click', closeLightbox);
}


function closeLightbox() {
    const lightbox = document.querySelector('#lightbox');
    if (lightbox) {
        lightbox.remove();
    }
}

function createDay(day) {
    const dayDiv = document.createElement('div');
    dayDiv.classList.add('day');

    const dayInfo = document.createElement('div');
    dayInfo.classList.add('day-info');
    dayInfo.innerHTML = `<h2>${day.date}</h2>`;
    dayDiv.appendChild(dayInfo);

    const dayDetails = document.createElement('div');
    dayDetails.classList.add('day-details');

    const activity = document.createElement('p');
    activity.classList.add('day-detail');
    activity.innerHTML = `<strong>Activity:</strong> ${day.activity}`;
    dayDetails.appendChild(activity);

    const hotel = document.createElement('p');
    hotel.classList.add('day-detail');
    hotel.innerHTML = `
        <strong>Hotel:</strong> 
        <a href="${day.hotelURL}" target="_blank">${day.hotel}</a><br>
        ${day.hotelAddress}
    `;
    dayDetails.appendChild(hotel);

    dayDiv.appendChild(dayDetails);

    const dayPhotos = document.createElement('div');
    dayPhotos.classList.add('day-photos');
    day.photos.forEach(photo => {
        const photoDiv = document.createElement('div');
        photoDiv.classList.add('photo');

        const img = document.createElement('img');
        img.src = photo.src;
        img.alt = `${day.date} photo`;
        photoDiv.appendChild(img);
        img.addEventListener('click', () => openLightbox(photo.src, photo.caption));

        const caption = document.createElement('p');
        caption.classList.add('caption');
        caption.innerText = photo.caption;
        photoDiv.appendChild(caption);

        dayPhotos.appendChild(photoDiv);
    });
    dayDiv.appendChild(dayPhotos);

    return dayDiv;
}

document.addEventListener('DOMContentLoaded', async () => {
    const main = document.querySelector('main');
    const days = await fetchData();
    days.forEach(day => {
        main.appendChild(createDay(day));
    });
});