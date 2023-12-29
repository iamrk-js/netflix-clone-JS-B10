

cl(baseurl)

document.addEventListener('DOMContentLoaded', async function () {
    let currentUrl = new URL(window.location.href);
    let queryParams = new URLSearchParams(currentUrl.search);
    let movieId = queryParams.get("movieid");
    let movieUrl = `${baseurl}/movie/${movieId}?api_key=${apiKey}`;
    let movieVideoUrl = `${baseurl}/movie/${movieId}/videos?api_key=${apiKey}`;
    let starCastUrl = `${baseurl}/movie/${movieId}/credits?api_key=${apiKey}`;
    let movObj = await makeApiCall(movieUrl, "GET");
    let movVideos = await makeApiCall(movieVideoUrl, "GET");
    let starCast = await makeApiCall(starCastUrl, "GET");

    cl(movObj);
    cl(movVideos);
    cl(starCast);
    let mainStarCast = starCast.cast.filter(c => c.order >=0 && c.order <= 7);
    cl(mainStarCast)
    const singleMovie = document.querySelector("#singleMovie .bgImg");
    singleMovie.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${movObj.backdrop_path})`;
   
    let div = document.createElement("div")
})