import {
	getTopRated,
	getDetails,
	getHorror,
	getAnimation
} from "./tmdb.js"

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const type = urlParams.get('type');
const typeValue = type.substring(0, 12);

const setTitle = (title) => {
	let body = document.querySelector('body');
	let h2 = document.createElement('h2');
	h2.innerHTML = title;
	body.insertAdjacentElement("afterbegin", h2);
	h2.classList.add("text-light");
	h2.classList.add("text-center");
	h2.classList.add("title");
}

const generateTopRatedPageContent = () => {
	setTitle("Top Rated Films");
	getTopRated().then((data) => {
		createList(data);
	});
}

const generateHorrorMoviesPageContent = () => {
	setTitle("Horror Films");
	getHorror().then((data) => {
		createList(data);
	});
}

const generateAnimationMoviePageContent = () => {
	setTitle("Animation Films");
	getAnimation().then((data) => {
		createList(data);
	});
}

const generateFavoriteMoviePageContent = () => {
	setTitle("Favorite Films");
	let promises = [];
	let favoriteFilmList = [];
	const favoriteFilmIds = JSON.parse(localStorage.getItem("STORAGE_FAVORITE"));
	favoriteFilmIds.forEach((id) => {
		promises.push(getDetails(id).then((film) => {
			favoriteFilmList.push(film);
		}));
	});

	Promise.all(promises).then(() => {
		createList(favoriteFilmList);
	});
}

if (typeValue === "topRatedFilm") {
	generateTopRatedPageContent();
} else if (typeValue === "favoriteFilm") {
	generateFavoriteMoviePageContent();

} else if (typeValue === "horrorFilms") {
	generateHorrorMoviesPageContent();
} else {
	generateAnimationMoviePageContent();
}

const movieList = document.querySelector('#list');
let images = "";

const createList = (data) => {
	data.forEach((films) => {
		const img = films.poster_path;
		let movieSrc = `https://image.tmdb.org/t/p/w500/${img}`;
		let filmDescription = films.overview;
		if (filmDescription.length > 50) {
			filmDescription = filmDescription.substring(0, 50) + "...";
		}
		images += `
      <div class="col-sm-12 col-md-4 col-lg-3">
        <div class="card h-100" data-id=${films.id}>
          <a href="/detail.html?film_id=${films.id}"><img src="${movieSrc}" class="card-img-top" alt="..."></a>
          <div class="card-body">
            <h5 class="card-title">${films.original_title}</h5>
            <p class="card-text">${filmDescription}</p>
          </div>
        </div>
      </div>
    `;
	});
	movieList.innerHTML = images;
}