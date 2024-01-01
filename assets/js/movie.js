

cl(baseurl)
const singleMovieFig = document.querySelector("#singleMovie figure");
const goBacktoHomePage = document.getElementById("goBacktoHomePage");

document.addEventListener('DOMContentLoaded', async function () {
    let currentUrl = new URL(window.location.href);
    let queryParams = new URLSearchParams(currentUrl.search);
    let movieId = queryParams.get("movieid");
    let movieUrl = `${baseurl}/movie/${movieId}?api_key=${apiKey}`;
    let movieVideoUrl = `${baseurl}/movie/${movieId}/videos?api_key=${apiKey}`;
    let starCastUrl = `${baseurl}/movie/${movieId}/credits?api_key=${apiKey}`;
    let movieData = await Promise.all([makeApiCall(movieUrl, "GET"), makeApiCall(movieVideoUrl, "GET"), makeApiCall(starCastUrl, "GET")])
    // let movObj = await makeApiCall(movieUrl, "GET");
    // let movVideos = await makeApiCall(movieVideoUrl, "GET");
    // let starCast = await makeApiCall(starCastUrl, "GET");

    // cl(movObj);
    // cl(movVideos);
    // cl(starCast);
    cl(movieData)
    // let mainStarCast = starCast.cast.filter(c => c.order >= 0 && c.order <= 7);
    // cl(mainStarCast)
    const singleMovie = document.querySelector("#singleMovie .bgImg");
    // singleMovie.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${movObj.backdrop_path})`;
    singleMovie.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${movieData[0].backdrop_path})`;
    let mainStarCast = movieData[2].cast.filter(c => c.order >= 0 && c.order <= 7);
    cl(mainStarCast)
    let figure = document.createElement("figure");

    figure.innerHTML = `
                    <img src="https://image.tmdb.org/t/p/original/${movieData[0].production_companies[0].logo_path}" alt="" class="logo">
                    <div class="row">
                        <div class="col-md-5">
                            <figcaption>
                                <h4 class="title">
                                    ${movieData[0].title}
                                </h4>
                                <ul class="details">
                                    <li> ${movieData[0].release_date}</li>
                                    <li>
                                        <span>${movieData[0].adult ? 'A' : 'U'}</span>
                                    </li>
                                    <li> ${movieData[0].runtime} min</li>
                                    <li>${movieData[0].genres.map(ele => {
                                            return ele.name
                                    }).join(', ')}</li>
                                </ul>
                                <p class="overview">
                                    ${movieData[0].overview}
                                </p>
                                <p class="staring">
                                    <strong>Starring</strong> 
                                    ${mainStarCast.map(ele => {
                                        return ele.name
                                }).join(', ')}
                                </p>
                            </figcaption>
                        </div>
                    </div>
                `
                singleMovieFig.append(figure);
})



goBacktoHomePage.addEventListener("click", function(){
    history.back();
})