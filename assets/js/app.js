let cl = console.log;

const baseurl = "https://api.themoviedb.org/3";
const apiKey = '1ab0b6ee06ec01c77561b6ad6e0c1901';
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

const insertMainSliderItems = (arr) => {
    let result = '';
    arr.forEach(movObj => {
        result += `
        <div class="item">
            <figure class="m-0 movieCard" id="${movObj.id}">
                <img src="https://image.tmdb.org/t/p/original/${movObj.poster_path}"
                    alt="The Hunger Games: The Ballad of Songbirds & Snakes"
                    title="The Hunger Games: The Ballad of Songbirds & Snakes">
                <figcaption class="caption d-flex justify-content-center flex-column pl-4">
                    <h3 class="display-3">
                    ${movObj.title}
                    </h3>
                    <em>
                       ${movObj.overview}
                    </em>
                </figcaption>
            </figure>
        </div>
        
                `
    });

    trendingMovSlider.innerHTML = result;
}


const makeApiCall = async (apiUrl, methodName, msgBody = null) => {
    let res = await fetch(apiUrl, {
        body: msgBody,
        method: methodName
    })

    return res.json()
}

const getTrendinMovies = async () => {
    let trendingData = await makeApiCall(trendingMovies, "GET")
    insertMainSliderItems(trendingData.results)
    $('#trendingMovSlider').owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        autoplay : true,
        navText : ['<i class="fa-solid fa-angles-left"></i>','<i class="fa-solid fa-angles-right"></i>'],
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 1,
               
            }
        }
    })
}

getTrendinMovies();


