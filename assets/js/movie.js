

cl(baseurl)
const singleMovieFig = document.querySelector("#singleMovie figure");
const goBacktoHomePage = document.getElementById("goBacktoHomePage");
const trailersSlider = document.getElementById("trailersSlider");
const backDrop = document.getElementById("backDrop");
const movieModal = document.getElementById("movieModal");
const iframe = document.getElementById('youtube-video');
const playTrailer = (ele) => {
    cl(ele.dataset.id)
    backDrop.classList.remove("d-none")
    movieModal.classList.remove("d-none")
    let videoId = ele.dataset.id;
   
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
}

document.addEventListener('DOMContentLoaded', async function () {
    let currentUrl = new URL(window.location.href);
    let queryParams = new URLSearchParams(currentUrl.search);
    let movieId = queryParams.get("movieid");
    let movieUrl = `${baseurl}/movie/${movieId}?api_key=${apiKey}`;
    let movieVideoUrl = `${baseurl}/movie/${movieId}/videos?api_key=${apiKey}`;
    let starCastUrl = `${baseurl}/movie/${movieId}/credits?api_key=${apiKey}`;
    let [movObj, movVideos, starCast] = await Promise.all([makeApiCall(movieUrl, "GET"), makeApiCall(movieVideoUrl, "GET"), makeApiCall(starCastUrl, "GET")])

    const singleMovie = document.querySelector("#singleMovie .bgImg");
    singleMovie.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${movObj.backdrop_path})`;
    let mainStarCast = starCast.cast.filter(c => c.order >= 0 && c.order <= 7);
    cl(mainStarCast)
    let figure = document.createElement("figure");

    figure.innerHTML = `
                    <img src="https://image.tmdb.org/t/p/original/${movObj.production_companies[0].logo_path}" alt="" class="logo">
                    <div class="row">
                        <div class="col-md-5">
                            <figcaption>
                                <h4 class="title">
                                    ${movObj.title}
                                </h4>
                                <ul class="details">
                                    <li> ${movObj.release_date}</li>
                                    <li>
                                        <span>${movObj.adult ? 'A' : 'U'}</span>
                                    </li>
                                    <li> ${movObj.runtime} min</li>
                                    <li>${movObj.genres.map(ele => {
        return ele.name
    }).join(', ')}</li>
                                </ul>
                                <p class="overview">
                                    ${movObj.overview}
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

    let trailerSliderItems = ``
    movVideos.results.forEach((ele) => {
        // cl(ele)
        let imgUrl = `https://img.youtube.com/vi/${ele.key}/0.jpg`;
        // cl(imgUrl)
        trailerSliderItems += `
            <div class="item" data-id="${ele.key}" onclick="playTrailer(this)">
            <figure>
                <img src="${imgUrl}" alt="">
                <figcaption>
                    <i class="fa-solid fa-circle-play fa-3x"></i>
                </figcaption>
            </figure>
            <p >${ele.name}</p>
         </div>
            
            `
    });

    trailersSlider.innerHTML = trailerSliderItems;
    $('#trailersSlider').owlCarousel({
        loop: true,
        margin: 20,
        nav: true,
        autoplay: true,
        dots: false,
        navText: ['<i class="fa-solid fa-angle-left"></i>', '<i class="fa-solid fa-angle-right"></i>'],
        responsive: {
            0: {
                items: 1,
                dots: false
            },
            600: {
                items: 2,
                dots: false
            },
            1000: {
                items: 3,

            }
        }
    });
})



goBacktoHomePage.addEventListener("click", function () {
    history.back();
})


backDrop.addEventListener("click", () => {
    cl("clciked")
    iframe.src = ``;
    backDrop.classList.toggle("d-none")
    movieModal.classList.toggle("d-none")
})



