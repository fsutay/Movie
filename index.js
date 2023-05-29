import { getImage, getPopularFilms, getGenresList, getFilmsByGenres, getscienceFiction, searchMovies } from "./tmdb.js";

const loadImageCarousel = (film) => {


    getImage(film.id).then(data => {
        const image = getCarouserImageUrl(data);
        createCarousel(image, film);
    }).catch(err => {
        console.error(err);
    })
}

const loadPopularFilms = () => {
    getPopularFilms().then(data => {
        data.forEach(film => {

            loadImageCarousel(film);
        });



    }).catch(err => {
        console.error(err);
    })
}

const getCarouserImageUrl = (images) => {

    let imagesList = images.backdrops.filter((image) => image.aspect_ratio >= 1.700 && image.width >= 1500);

    if (imagesList.length > 0) {
        let image = `https://image.tmdb.org/t/p/original/${imagesList[0].file_path}`;
        return image;
    }

}

let carousel = document.querySelector('#createCarousel');
let index = 0;
const createCarousel = (img, film) => {
    let crCarousel = "";
    if (index == 0) {
        crCarousel = `
        <div class="carousel-item active">
            <img src="${img}" class="d-block w-100 "  style="height: 600px; alt="...">
            <div class="carousel-caption d-none d-md-block">
            <h5 class="h3">${film.original_title}</h5>
            </div>
        </div>`;
    } else {
        crCarousel = `
    <div class="carousel-item">
        <img src="${img}" class="d-block w-100"  style="height: 600px; alt="...">
        <div class="carousel-caption d-none d-md-block">
        <h5 class="h3">${film.original_title}</h5>

        </div>
    </div>`;
    }
    index++;
    carousel.insertAdjacentHTML("beforeend", crCarousel)


}

const genresList = () => {
    const genresList = getGenresList()
    genresList.then((data) => {
        data.forEach((genresId) => {
            // console.log(genresId)

        })
    })
}



const actionMovie = document.querySelector('#action')
// console.log(actionMovie)
const actionsMovieList = () => {
    let images = ""
    getFilmsByGenres().then((data) => {

        let movies = data.slice(0, 6)


        movies.forEach((actionFilm) => {
            const img = actionFilm.poster_path;
            let actionMovieSrc = `https://image.tmdb.org/t/p/w500/${img}`
            let filmDescription = actionFilm.overview;
            if (filmDescription.length > 50) {
                filmDescription = filmDescription.substring(0, 50) + "...";
            }
            images += `
            <div class="col-sm-12 col-md-4 col-lg-2" >
            <div class="card h-100" data-id=${actionFilm.id}>
      <img src="${actionMovieSrc}" class="card-img-top" alt="...">
      <div class="card-body">
      <h5 class="card-title">${actionFilm.original_title}</h5>
        <p class="card-text">${filmDescription}</p>
      </div>
    </div>
    </div>
         
            `

        })
        actionMovie.innerHTML = images;
    });
}



actionMovie.addEventListener('click', (e) => {
    let div = e.target.closest('div')
    console.log(div)
    const filmId = div.dataset.id
    console.log(filmId)
    // var url = "http://localhost:8080/login?cid='username'&pwd='password"
    let url = `/detail.html?film_id=${filmId}`

    window.open(url);
    // location.href(`/Film/detail.html?film_id=${filmId}`,"_blank");

})





const scienceFiction = document.querySelector('#scienceFiction');
const scienceFictionList = () => {
    let images = ""
    getscienceFiction().then((data) => {
        let movies = data.slice(0, 6)
        movies.forEach((scienceFilm) => {
            const img = scienceFilm.poster_path
            let scienceMovieSrc = `https://image.tmdb.org/t/p/w500/${img}`
            let filmDescription = scienceFilm.overview;
            if (filmDescription.length > 50) {
                filmDescription = filmDescription.substring(0, 50) + "...";
            }
            images += `
            <div class="col-sm-12 col-md-4 col-lg-2" >
        <div class="card h-100" data-id=${scienceFilm.id}>
  <img src="${scienceMovieSrc}" class="card-img-top" alt="...">
  <div class="card-body">
  <h5 class="card-title">${scienceFilm.original_title}</h5>
    <p class="card-text">${filmDescription}</p>
  </div>
</div>
</div>
            `
        })
        scienceFiction.innerHTML = images;
    })
}

scienceFiction.addEventListener('click', (e) => {
    let div = e.target.closest('div')
    console.log(div)
    const filmId = div.dataset.id
    console.log(filmId)
    // var url = "http://localhost:8080/login?cid='username'&pwd='password"
    let url = `/detail.html?film_id=${filmId}`

    window.open(url);
    // location.href(`/Film/detail.html?film_id=${filmId}`,"_blank");

})


let timeoutSearch = null
let searchEl = document.querySelector('#txtSearch')
let listEl = document.querySelector('#list')
searchEl.addEventListener('input', (e) => {
    let query = e.target.value;

    if (timeoutSearch) clearTimeout(timeoutSearch)
    let li = ""
    timeoutSearch = setTimeout(() => {
        searchMovies(query).then((lists) => {
            lists.forEach((item) => {
                li +=
                    `
                <li class="text-light list-group-item"><a href="/detail.html?film_id=${item.id},"_blank>${item.original_title}</a></li>

                `
                listEl.innerHTML = li;
            })
        })


    }, 500)
})



loadPopularFilms();
genresList();
actionsMovieList();
scienceFictionList()



