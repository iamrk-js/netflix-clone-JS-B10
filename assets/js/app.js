

const trendingMovies = `${baseurl}/trending/all/week?api_key=${apiKey}`

const trendingMovSlider = document.getElementById("trendingMovSlider");

// params = new HttpParams()

// const makeApiCall = (apiUrl, methodName, msgBody = null) => {
//     return fetch(apiUrl, {
//         body: msgBody,
//         method: methodName
//     })
//         .then(res => {
//             return res.json()
//         })
// }

const loadParams = (ele) => {
    // cl(ele)
    let movieId = ele.id;
    cl(movieId);

    let currentUrl = new URL(window.location.href);

    let queryParams = new URLSearchParams(currentUrl.search);

    queryParams.set("movieid", movieId)
    currentUrl.search = queryParams.toString();
  

    let movieUrl = `${currentUrl.origin}/movieinfo.html${currentUrl.search}`;
    cl(movieUrl)
    window.location.href = movieUrl;
}

const insertMainSliderItems = (arr) => {
    let result = '';
    arr.forEach(movObj => {
        result += `
        <div class="item">
            <figure class="m-0 movieCard" id="${movObj.id}" onclick="loadParams(this)">
                <img src="https://image.tmdb.org/t/p/original/${movObj.poster_path}"
                    alt="${movObj.title}"
                    title="${movObj.title}">
                <figcaption class="caption d-flex justify-content-center flex-column pl-4">
                        <h3 class="display-3">
                        ${movObj.title || movObj.name}
                        </h3>
                        <em class="d-none d-md-block">
                        ${movObj.overview}
                        </em>
                </figcaption>
            </figure>
        </div>
        
                `
    });

    trendingMovSlider.innerHTML = result;
}




const getTrendinMovies = async () => {
    let trendingData = await makeApiCall(trendingMovies, "GET")
    insertMainSliderItems(trendingData.results)
    $('#trendingMovSlider').owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        autoplay : true,
        navText : ['<i class="fa-solid fa-angle-left"></i>','<i class="fa-solid fa-angle-right"></i>'],
        responsive: {
            0: {
                items: 1,
                dots:false
            },
            600: {
                items: 1,
                dots:false
            },
            1000: {
                items: 1,
               
            }
        }
    })
}

getTrendinMovies();


