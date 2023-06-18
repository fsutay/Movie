import {
	getDetails,
	imdbScore,
	getActors
} from "./tmdb.js";
const contentCardEl = document.querySelector('#contentCard');
const actorsEl = document.querySelector('#actors');

const STORAGE_FAVORITE = "STORAGE_FAVORITE";
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const film_id = urlParams.get('film_id');
const movie_id = film_id.substring(0, 6);

let createCard = "";
let actorsCard = "";

const findMovieRating = async (imdbId) => {
	let imdbValues = await imdbScore(imdbId);
	let imdbValue = "--";
	if (imdbValues.response) {
		const ratings = imdbValues.ratings.filter(rating => rating.source === "imdb");
		if (ratings) {
			imdbValue = ratings[0].value;
		}
	}
	return imdbValue;
}

getDetails(movie_id).then(async (data) => {
	const imdbValue = await findMovieRating(data.imdb_id);
	let workers = await getActors(movie_id);

	let directors = workers.crew.filter(c => c.job === "Director").map(c => c.name);
	let strDirectors = directors.join("-");
	let actorList = workers.cast.slice(0, 6);
	actorList.forEach(actor => {
		let profileImg = "img/noimage.png"
		if (actor.profile_path) {
			profileImg = `https://image.tmdb.org/t/p/w500/${actor.profile_path}`;
		}

		actorsCard += `
    <div class="col-sm-12 col-md-4 col-lg-2" >
    <div class="card h-100" data-id=>
    <img src="${profileImg}" class="card-img-top" alt="...">
    <div class="card-body">
    <h5 class="card-title">${actor.name}</h5>
    </div>
    </div>
    </div>
    `
		actorsEl.innerHTML = actorsCard;
	})
	let countryNames = data.production_countries.map(c => c.name);
	let genresList = data.genres.map(g => g.name);

	createCard += `
<div class="col">
<div class="card mt-3" style="max-width: 100%;">
    <div class="row g-0">
      <div class="col-md-4">
        <img src="https://image.tmdb.org/t/p/w500/${data.poster_path}" class="img-fluid rounded-start" alt="...">
      </div>
      <div class="col-md-8">
        <div class="card-body" data-id=${data.id}>
          <h5 class="card-title text-center detail-title">${data.original_title}</h5>
          <ul class="list-group">
            <li class="list-group-item"><span>Year:</span>${data.release_date}</li>
            <li class="list-group-item"><span>Countries:</span>${countryNames}</li>
            <li class="list-group-item"><span>Genres:</span>${genresList}</li>
            <li class="list-group-item"><span>Dırectors:</span>${strDirectors}</li>
            <li class="list-group-item"><span>Description:</span>${data.overview}</li>
            <li class="list-group-item"><span>imdb:</span>${imdbValue}</li>
          </ul>
          <button id="fav" class="btn btn-warning" type="button">Favoriye ekle : <span id="favStar"><i class="fa-solid fa-star"></i></span></button>
        </div>
      </div>
    </div>
  </div>
</div> 
`
	contentCardEl.innerHTML = createCard;
	document.querySelector("#fav").addEventListener('click', () => {
		addLocalStorage(data.id);
		document.querySelector("#favStar").classList.toggle("btn-fav");
	});
	markFavorite(data.id);
})

const addLocalStorage = (movieId) => {
	var favorites = JSON.parse(localStorage.getItem(STORAGE_FAVORITE));

	if (!favorites) {
		var favorite = [movieId];
		localStorage.setItem(STORAGE_FAVORITE, JSON.stringify(favorite));
	} else if (favorites.includes(movieId)) {
		let filteredFavorites = favorites.filter(id => id !== movieId);
		localStorage.setItem(STORAGE_FAVORITE, JSON.stringify(filteredFavorites));
	} else {
		favorites.push(movieId);
		localStorage.setItem(STORAGE_FAVORITE, JSON.stringify(favorites));
	}
}

const isInFavorite = (movieId) => {
	let favorites = JSON.parse(localStorage.getItem(STORAGE_FAVORITE));
	return favorites.includes(movieId);
}

const markFavorite = (movieId) => {
	let isFavorite = isInFavorite(parseInt(movieId));
	if (isFavorite) {
		document.querySelector("#favStar").classList.add("btn-fav");
	}
}