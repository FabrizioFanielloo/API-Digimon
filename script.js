document.addEventListener('DOMContentLoaded', () => {
    const cardContainer = document.getElementById('card-container');
    const searchInput = document.getElementById('search');

    async function fetchData() {
        try {
            const response = await fetch('https://digimon-api.vercel.app/api/digimon');
            const data = await response.json();
            displayCards(data);

            searchInput.addEventListener('input', (e) => {
                const searchTerm = e.target.value.toLowerCase();
                const filteredData = data.filter(digimon => digimon.name.toLowerCase().includes(searchTerm));
                displayCards(filteredData);
            });
        } catch (error) {
            console.error('Error fetching data:', error);
            cardContainer.innerHTML = '<p>Sorry, there was a problem loading the Digimon cards. Please try again later.</p>';
        }
    }

    function displayCards(digimons) {
        cardContainer.innerHTML = ''; 
        digimons.forEach(digimon => {
            const card = document.createElement('div');
            card.classList.add('card');

            const img = document.createElement('img');
            img.src = digimon.img;
            img.alt = digimon.name;

            const cardContent = document.createElement('div');
            cardContent.classList.add('card-content');

            const name = document.createElement('h2');
            name.textContent = digimon.name;

            const level = document.createElement('p');
            level.textContent = `Level: ${digimon.level}`;

            cardContent.append(name, level);
            card.append(img, cardContent);

            cardContainer.appendChild(card);
        });
    }

    fetchData();
});