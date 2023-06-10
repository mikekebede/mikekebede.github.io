const apiKey="9978500a9e2141acf635792947871c19";

let pageNumber=1; // setting the pagenumber to one page
//creating a funciton fetch the API and converts it to json to use the displayMovie function and populate the screen
const fetchMovies= async()=>{
    try{
        const res=await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&page=${pageNumber}`);
        const movieData= await res.json(); // extract the result section from the whole API JSON
        displayMovie(movieData.results)
        
    }catch(err){
     console.error(err);
    }
    
    //console.log(pageNumber)

}
// reference the main html components
const movieSearchForm=document.getElementById("movieSearchForm") 
const searchButton=document.getElementById("searchButton")
const searchInput=document.getElementById("movieInput")
const loadMore=document.getElementById("load-more-movies-btn")
const movieGrid=document.querySelector(".movieGrid")
const searchquery=document.getElementById("searchInput")



//This function takes in the movie result from the fetched json and populates the screen by embedding it
const displayMovie=(moviesResult)=>{
    
    //iterate through the result
    moviesResult.forEach( movie => {  
    // create a container that holds a single movie card and display all the necessary informations
    movieGrid.innerHTML+= `
    <div class="movie-card">
    <img class="movie-poster" src="https://image.tmdb.org/t/p/w342${movie.poster_path}" alt="this movie is a poster for ${movie.title} "/>
    <p class="movie-votes">⭐${movie.vote_average}</p>
    <p class="movie-title"> ${movie.title}</p>
    </div>
    `
    }  )
          
    
}
//this function is used to for searching
async function getquery(){
    queryResult=searchquery.value        //collect the input from the form in the html
    //fetch the movies using the search API
    const response = await fetch("https://api.themoviedb.org/3/search/movie?api_key=" + apiKey + "&language=en-US&query="+ queryResult); 
    const searchData=await response.json()  //change the movies into json format
    movieGrid.innerHTML=''   //set to null so the screen turns empty
    displayMovie(searchData.results) // call the display movie to generate the cards


}

fetchMovies()

window.onload = function () {
    // sets the load more function when clicked and adds the page number and calls the main function that generates cards after api fetch
    loadMore.addEventListener("click",loadMorePage =>{
        pageNumber++
        fetchMovies()
    })
    //
   searchButton.addEventListener("click", function (event){
    event.preventDefault() //prevent the page from refreshing
    getquery()


   })
  }