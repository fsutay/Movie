import { getTopRated,getDetails,getHorror,getAnimation} from "./tmdb.js"


const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString)


const type = urlParams.get('type')
const typeValue = type.substring(0, 12)
console.log("type:" + typeValue);

const setTitle =(title)=>{
  let body=document.querySelector('body')
  let h2=document.createElement('h2')
  h2.innerHTML=title;
  body.insertAdjacentElement("afterbegin",h2)
  h2.classList.add("text-light")
  h2.classList.add("text-center")
  h2.classList.add("title")
}

const topRated = () => {
  setTitle("Top Rated Films");
  getTopRated().then((data) => {

    createList(data)
  })
}


const horrorFilms=()=>{
  setTitle("Horror Films");
  getHorror().then((data)=>{
    createList(data)
  })

}

const animationFilms=()=>{
  setTitle("Animation Films");
  getAnimation().then((data)=>{
    createList(data)
  })

}
 
const favoriFilms= ()=>{
  setTitle("Favori Films");
  var promises = [];
  let favoriFilmList=[];
  const favoriFilmIds = JSON.parse(localStorage.getItem("STORAGE_FAVORITE"));
  favoriFilmIds.forEach((id)=>{
    promises.push(getDetails(id).then((film)=>{
      favoriFilmList.push(film);
     }));
   
  });

  Promise.all(promises).then(() => 
  createList(favoriFilmList)
);
}

if(typeValue==="topRatedFilm"){
  topRated()
}
if(typeValue==="favoriteFilm"){
  favoriFilms();
  
}
if(typeValue==="horrorFilms"){
  horrorFilms()
}

if(typeValue==="animationFil"){
  animationFilms()
}



const popularMovieList = document.querySelector('#top')
let images = ""
const createList=(data)=>{
console.log(data);
  data.forEach((top) => {
    console.log(top)
        const img = top.poster_path;
        let topMovieSrc = `https://image.tmdb.org/t/p/w500/${img}`
        let filmDescription = top.overview;
         if (filmDescription.length > 50) {
           filmDescription = filmDescription.substring(0,50) + "...";
         }
        images += `
        
    <div class="col-sm-12 col-md-4 col-lg-3" >
    <div class="card h-100" data-id=${top.id}>
    <a href="/detail.html?film_id=${top.id}"><img src="${topMovieSrc}" class="card-img-top" alt="..."></a>
    <div class="card-body">
    <h5 class="card-title">${top.original_title}</h5>
      <p class="card-text">${filmDescription}</p>
    </div>
  </div>
  </div>
        `
    })
    popularMovieList.innerHTML = images;

  
}


