
import { getDetails, imdbScore, getActors } from "./tmdb.js";
const contentCardEl = document.querySelector('#contentCard');
const actorsEl=document.querySelector('#actors');

const STORAGE_FAVORITE="STORAGE_FAVORITE";


//url den film id aldım
const queryString = window.location.search;
// console.log(queryString)
const urlParams = new URLSearchParams(queryString)


const film_id = urlParams.get('film_id')
const movie_id = film_id.substring(0, 6)
// console.log(movie_id)





let createCard = ""
let actorsCard="";

getDetails(movie_id).then(async (data) => {
  let imdbId = data.imdb_id;
  // console.log(data)
  //filter kullanabiliridim ama bunu tercih ettim hele önce bi değeri basayım sonra filter yaparım
  let imdbValues = await imdbScore(imdbId);
  let imdbValue = "--";

  imdbValues.ratings.forEach((rating) => {
    if (rating.source === "imdb") {

      imdbValue = rating.value;
      console.log(imdbValue)
    }

  })



  let workers = await getActors(movie_id);
  let strDirectors = ""
  let directors = [];
  workers.crew.forEach((worker) => {
    if (worker.job === "Director") {

      directors.push(worker.name)
      strDirectors = directors.join("-")
      // console.log(strDirectors)
    }

  })
  let actorList= workers.cast.slice(0,6)
  // console.log(actorList)
  actorList.forEach(actor=>{
  

    let profileImg="img/noimage.png"
   if(actor.profile_path){
    profileImg=`https://image.tmdb.org/t/p/w500/${actor.profile_path}`;
   }

    actorsCard+=`
    
    <div class="col-sm-12 col-md-4 col-lg-2" >
    <div class="card h-100" data-id=>
    <img src="${profileImg}" class="card-img-top" alt="...">
    <div class="card-body">
    <h5 class="card-title">${actor.name}</h5>
    </div>
    </div>
    </div>
    `
actorsEl.innerHTML=actorsCard;
  })


  let strCountry = ""
  let countryName = [];
  data.production_countries.forEach(country => {
    countryName.push(country.name);
    strCountry = countryName.join('-')
  });



  let strGenres = ""
  let genresList = []
  data.genres.forEach(genre => {
    genresList.push(genre.name);
    strGenres = genresList;
  })



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
            <li class="list-group-item"><span>Countries:</span>${countryName}</li>
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

  document.querySelector("#fav").addEventListener('click',()=>{
    addLocalStorage(data.id);
    document.querySelector("#favStar").classList.toggle("btn-fav");
  });
  markFavorite(data.id);


})

const addLocalStorage=(movieId)=>{
  var favorites = JSON.parse(localStorage.getItem(STORAGE_FAVORITE));

  if(!favorites){
    var favorite = [movieId];
    localStorage.setItem(STORAGE_FAVORITE,JSON.stringify(favorite));
  } else if(favorites.includes(movieId)){
    let filteredFavorites = favorites.filter(id=> id !== movieId);
    localStorage.setItem(STORAGE_FAVORITE,JSON.stringify(filteredFavorites));
  }else{
    favorites.push(movieId);
    localStorage.setItem(STORAGE_FAVORITE,JSON.stringify(favorites));
  }
}

const isInFavorite=(movieId)=>{
  let favorites = JSON.parse(localStorage.getItem(STORAGE_FAVORITE));
  return favorites.includes(movieId);
}

const markFavorite=(movieId)=>{
  let isFavorite = isInFavorite(parseInt(movieId));
  if(isFavorite){
    document.querySelector("#favStar").classList.add("btn-fav");
  }
}

