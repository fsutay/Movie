

const api_key = "130dfdfaa0e9595673a1dcbecbe44ba7";
const baseUrl = `https://api.themoviedb.org`;
var requestOptions = {
   method: 'GET',
   redirect: 'follow'
 };

const getImage = (filmId) => {
   return new Promise((resolve, reject) => {
      fetch(`${baseUrl}/3/movie/${filmId}/images?api_key=${api_key}`,requestOptions)
         .then((res) => res.json())
         .then((data) => resolve(data))
         .catch((err) => reject(err))
   });
}
const getPopularFilms = () => {
   return new Promise((resolve, reject) => {
      fetch(`${baseUrl}/3/movie/popular?language=US-&page=1&api_key=${api_key}`,requestOptions)
         .then((res) => res.json())
         .then((data) => resolve(data.results))
         .catch((err) => reject(err))
   });
}

const getGenresList = () => {
   return new Promise((resolve, reject) => {
      fetch(`${baseUrl}/3/genre/movie/list?api_key=${api_key}`,requestOptions)
         .then((res) => res.json())
         .then((data) => resolve(data.genres))
         .catch((err) => reject(err))
   });
}
const getFilmsByGenres=()=>{

   return new Promise((resolve,reject)=>{   
      fetch(`${baseUrl}/3/discover/movie?api_key=${api_key}&with_genres=53`,requestOptions)
      .then((res)=>res.json())
      .then((data)=>resolve(data.results))
      .catch((err)=>reject((err)))
   })
}
const getscienceFiction=()=>{
   return new Promise((resolve,reject)=>{   
      fetch(`${baseUrl}/3/discover/movie?api_key=${api_key}&with_genres=14`,requestOptions)
      .then((res)=>res.json())
      .then((data)=>resolve(data.results))
      .catch((err)=>reject((err)))
   })
}

const searchMovies=(query)=>{
   return new Promise((resolve,reject)=>{   
      fetch(`${baseUrl}/3/search/movie?api_key=${api_key}&query=${query}`,requestOptions)
      .then((res)=>res.json())
      .then((data)=>resolve(data.results))
      .catch((err)=>reject((err)))
   })
}
const getDetails=(filmId)=>{
   // console.log(filmId)
   return new Promise((resolve,reject)=>{   
     let url=`${baseUrl}/3/movie/${filmId}?api_key=${api_key}&language=en` 
      fetch(url)
      .then((res)=>res.json())
      .then((data)=>resolve(data))
      .catch((err)=>reject((err)))
   })
}


const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '4abd56d855msh9ae8330f4ea1095p15b0a2jsn840c367ef08c',
		'X-RapidAPI-Host': 'mdblist.p.rapidapi.com'
	}
};
const imdbScore=(imdbId)=>{
   return new Promise((resolve,reject)=>{   
      const url = `https://mdblist.p.rapidapi.com/?i=${imdbId}`; 
       fetch(url,options)
       .then((res)=>res.json())
       .then((data)=>resolve(data))
       .catch((err)=>reject((err)))
    })
}

const getActors=(filmId)=>{
   return new Promise((resolve,reject)=>{   
    const url= `https://api.themoviedb.org/3/movie/${filmId}/credits?api_key=130dfdfaa0e9595673a1dcbecbe44ba7&language=en`
   // const url = `${baseUrl}/3/movie/${filmId}/credits?api_key${api_key}&language=en`; 
       fetch(url)
       .then((res)=>res.json())
       .then((data)=>resolve(data))
       .catch((err)=>reject((err)))
    })
}

const getTopRated=()=>{
   return new Promise((resolve,reject)=>{   
      const url= `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&api_key=130dfdfaa0e9595673a1dcbecbe44ba7`
 
         fetch(url)
         .then((res)=>res.json())
         .then((data)=>resolve(data.results))
         .catch((err)=>reject((err)))
      })
}

const getHorror=()=>{
   return new Promise((resolve,reject)=>{   
      const url= `https://api.themoviedb.org/3/discover/movie?api_key=130dfdfaa0e9595673a1dcbecbe44ba7&with_genres=27`
         fetch(url)
         .then((res)=>res.json())
         .then((data)=>resolve(data.results))
         .catch((err)=>reject((err)))
      })
}

const getAnimation=()=>{
   return new Promise((resolve,reject)=>{   
      const url= `https://api.themoviedb.org/3/discover/movie?api_key=130dfdfaa0e9595673a1dcbecbe44ba7&with_genres=16`
         fetch(url)
         .then((res)=>res.json())
         .then((data)=>resolve(data.results))
         .catch((err)=>reject((err)))
      })
}

export { getImage, getPopularFilms,getGenresList,getFilmsByGenres,getscienceFiction,searchMovies ,getDetails,imdbScore,getActors,getTopRated,getHorror,getAnimation}
export default getDetails;