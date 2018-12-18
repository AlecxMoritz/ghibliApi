const baseURL = "https://ghibliapi.herokuapp.com"
const limit = 10
let url = '';
let searchType = '';

const totoro = document.getElementById('totoro');
const searchTerm = document.getElementById('searchInput');
const searchForm = document.querySelector('form');
const filmsBtn = document.getElementById('filmBtn');
const peopleBtn = document.getElementById('peopleBtn');
const locationBtn = document.getElementById('locationBtn');
const speciesBtn = document.getElementById('speciesBtn');
const vehiclesBtn = document.getElementById('vehicleBtn');
const resetBtn = document.getElementById('resetBtn');

const dataDisplay = document.querySelector('ul');

searchForm.addEventListener('submit', onSubmit)
filmsBtn.addEventListener('click', toggleFilms);
peopleBtn.addEventListener('click', togglePeople);
locationBtn.addEventListener('click', toggleLocations);
speciesBtn.addEventListener('click', toggleSpecies);
vehiclesBtn.addEventListener('click', toggleVehicles);
resetBtn.addEventListener('click', refreshPage);

function refreshPage(e) {
    location.reload();
}

function toggleFilms() {
    searchType = "/films";
}

function togglePeople() {
    searchType = "/people";
}

function toggleLocations() {
    searchType = "/locations";
}

function toggleSpecies() {
    searchType = "/species";
}

function toggleVehicles() {
    searchType = "/vehicles";
}

function onSubmit(e) {
    e.preventDefault();
    totoro.style.display = 'none';
    
    while (dataDisplay.firstChild) {
        dataDisplay.removeChild(dataDisplay.firstChild);
    }

    url = baseURL + searchType

    fetch(url)
        .then(response => response.json())
        .then(json => routeDisplay(json))
        .catch(err => console.log(err));
}

function routeDisplay(json) {
    switch (searchType) {
        case '/films':
            displayFilms(json);
            break;

        case '/people':
            displayPeople(json);
            break;

        case '/locations':
            displayLocations(json);
            break;

        case '/species':
            displaySpecies(json);
            break;

        case '/vehicles':
            displayVehicles(json);
            break;
    }
}

function displayFilms(data) {
    data.map(film => {
        let container = document.createElement('div');
        let title = document.createElement('h2');
        let director = document.createElement('p');
        let producer = document.createElement('p');
        let releaseDate = document.createElement('p');
        let rtScore = document.createElement('p');

        title.innerText = film.title;
        director.innerText = film.director;
        producer.innerText = `Producer: ${film.producer}`;
        releaseDate.innerText = `Released in ${film.release_date}`;
        rtScore.innerText = `RT Score: ${film.rt_score}`;

        container.appendChild(title);
        container.appendChild(director);
        container.appendChild(producer);
        container.appendChild(releaseDate);
        container.appendChild(rtScore);
        container.classList.add("dataContainer");
        dataDisplay.appendChild(container);
    })
}

function displayPeople(data) {
    data.map(person => {
        let container = document.createElement('div');
        let name = document.createElement('h2');
        let age = document.createElement('p');
        let eyeColor = document.createElement('p');
        let gender = document.createElement('p');
        let hairColor = document.createElement('p');

        name.innerText = person.name;
        age.innerText = `Age: ${person.age}`;
        eyeColor.innerText = `Eye Color: ${person.eye_color}`;
        gender.innerText = `Gender: ${person.gender}`;
        hairColor.innerText = `Hair Color: ${person.hair_color}`;
        
        container.appendChild(name);
        container.appendChild(age);
        container.appendChild(eyeColor);
        container.appendChild(gender);
        container.appendChild(hairColor);
        container.classList.add("dataContainer");
        dataDisplay.appendChild(container);
    })

}

function displayLocations(data) {
    data.map(location => {
        let container = document.createElement('div');
        let name = document.createElement('h2');
        let climate = document.createElement('p');
        let residents = document.createElement('p'); 
        let terrain = document.createElement('p'); 
        let surfaceWater = document.createElement('p'); 

        name.innerText = location.name;

        if(location.climate == "TODO"){
            climate.innerText = "Climate: Unavailable";
        } else {
            climate.innerText = `Climate: ${location.climate}`;
        }

        if(location.terrain == "TODO"){
            terrain.innerText = "Terrain: Unavailable";
        } else {
            terrain.innerText = `Terrain: ${location.terrain}`;
        }

        residents.innerText = `Residents: ${location.residents.length}`;
        surfaceWater.innerText = `Surface Water: ${location.surface_water}%`;

        container.appendChild(name);
        container.appendChild(climate);
        container.appendChild(terrain);
        container.appendChild(residents);
        container.appendChild(surfaceWater);
        container.classList.add("dataContainer");
        dataDisplay.appendChild(container);
    })
}

function displaySpecies(data) {
    data.map(species => {
        let container = document.createElement('div');
        let name = document.createElement('h2');
        let classification = document.createElement('p');
        let eyeColors = document.createElement('p');
        let hairColors = document.createElement('p');

        name.innerText = species.name;
        classification.innerText = `Classification: ${species.classification}`;
        eyeColors.innerText = `Eye Colors: ${species.eye_colors}`;
        hairColors.innerText = `Hair Colors: ${species.hair_colors}`;

        container.appendChild(name);
        container.appendChild(classification);
        container.appendChild(eyeColors);
        container.appendChild(hairColors);
        container.classList.add("dataContainer");
        dataDisplay.appendChild(container);
    })
}

function displayVehicles(data) {
    data.map(vehicle => {
        let container = document.createElement('div');
        let name = document.createElement('h2');
        let vehicleClass = document.createElement('p');
        let description = document.createElement('p');
        let length = document.createElement('p');

        name.innerText = vehicle.name;
        vehicleClass.innerText = vehicle.vehicle_class;
        description.innerText = vehicle.description;
        length.innerText = `Length: ${vehicle.length} feet`;

        container.appendChild(name);
        container.appendChild(vehicleClass);
        container.appendChild(description);
        container.appendChild(length);
        container.classList.add("dataContainer");
        dataDisplay.appendChild(container);
    })
}

