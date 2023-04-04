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
    hotel.innerHTML = `<strong>Hotel:</strong> ${day.hotel}<br>${day.hotelAddress}`;
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