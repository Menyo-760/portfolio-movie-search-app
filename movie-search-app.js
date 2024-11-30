const apiKey = 'c02fc40a';
const searchBar = document.getElementById('search-bar');
const searchBtn = document.getElementById('search-btn');
const movieDetailsDiv = document.querySelector('#movie-details');

//Search button functionality
searchBtn.addEventListener('click', () => {
    const movieName = searchBar.value.trim();
    if (movieName) {
        findMovieDetails(movieName);
    } else {
        alert('Please enter a movie name');
    }
});

// async function to connect to api
async function findMovieDetails(movieName) {
    // api url variable into this function to use the movieName local variable
    const url = `https://omdbapi.com/?t=${encodeURIComponent(movieName)}&apikey=${apiKey}`;
    try {
        let response = await fetch(url);
        let data = await response.json();
        //  check if the API successfully found the movie
        if (data.Response === "True") {
            displayMovieDetails(data);
        } else {
            movieDetailsDiv.innerHTML = `<p>${data.Error}</p>`;
        }
    } catch (error) {
        console.error(error);
        movieDetailsDiv.innerHTML = `<p>Error fetching movie details. Please try again.</p>`;
    }
}

// Movie details to pull from the api
function displayMovieDetails(data) {  
    // clear previous movie details
    movieDetailsDiv.innerHTML = "";

    const title = document.createElement('h2');
    title.innerHTML = `<strong>${data.Title}</strong>`;
    movieDetailsDiv.appendChild(title);
    
    const poster = document.createElement('img');
    poster.setAttribute('src', `${data.Poster}`);
    poster.setAttribute('alt', `${data.Title}`);
    movieDetailsDiv.appendChild(poster);
    
    const year = document.createElement('p');
    year.innerHTML = `<strong>Year: </strong>${data.Year}`;
    movieDetailsDiv.appendChild(year);

    const rated = document.createElement('p');
    rated.innerHTML = `<strong>Rated: </strong>${data.Rated}`;
    movieDetailsDiv.appendChild(rated);

    const plot = document.createElement('p');
    plot.innerHTML = `<strong>Plot: </strong>"${data.Plot}"`;
    movieDetailsDiv.appendChild(plot);

    const genre = document.createElement('p');
    genre.innerHTML = `<strong>Genre: </strong>${data.Genre}`;
    movieDetailsDiv.appendChild(genre);

    const actors = document.createElement('p');
    actors.innerHTML = `<strong>Actors: </strong>${data.Actors}`;
    movieDetailsDiv.appendChild(actors);
    
    const dateReleased = document.createElement('p');
    dateReleased.innerHTML = `<strong>Year Released: </strong>${data.Released}`;
    movieDetailsDiv.appendChild(dateReleased);
}


