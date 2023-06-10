const apiKey="9978500a9e2141acf635792947871c19";

let pageNumber=1;

const fetchMovies= async()=>{
    try{
        const res=await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&page=${pageNumber}`);
        const movieData= await res.json();
        displayMovie(movieData.results)
        
    }catch(err){
     console.error(err);
    }
    
    console.log(pageNumber)

}

const movieSearchForm=document.getElementById("movieSearchForm")
const searchButton=document.getElementById("searchButton")
const searchInput=document.getElementById("movieInput")
const loadMore=document.getElementById("load-more-movies-btn")
const movieGrid=document.querySelector(".movieGrid")
const searchquery=document.getElementById("searchInput")


const displayMovie=(moviesResult)=>{
    
    
    moviesResult.forEach( movie => {  
        if(movie.poster=null){
            
        }
    movieGrid.innerHTML+= `
    <div class="movie-card">
    <img class="movie-poster" src="https://image.tmdb.org/t/p/w342${movie.poster_path}" alt="this movie is a poster for ${movie.title} "/>
    <p class="movie-votes">⭐${movie.vote_average}</p>
    <p class="movie-title"> ${movie.title}</p>
    </div>
    `
    }  )
          
    
}
async function getquery(){
    queryResult=searchquery.value
    const response = await fetch("https://api.themoviedb.org/3/search/movie?api_key=" + apiKey + "&language=en-US&query="+ queryResult);
    const searchData=await response.json()  
    movieGrid.innerHTML=''
    displayMovie(searchData.results)


}

async function handleFormSubmit(event) {
    // YOUR CODE HERE
    event.preventDefault()
    // reset results display section
    movieGrid.innerHTML = ""
    
  }
  



fetchMovies()

window.onload = function () {
    loadMore.addEventListener("click",loadMorePage =>{
        pageNumber++
        fetchMovies()
    })
   searchButton.addEventListener("click", function (event){
    event.preventDefault()
    getquery()


   })
    // Add any event handlers here
    
  }