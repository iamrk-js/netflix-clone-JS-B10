

cl(baseurl)

document.addEventListener('DOMContentLoaded', async function () {
    let currentUrl = new URL(window.location.href);
    let queryParams = new URLSearchParams(currentUrl.search);
    let movieId = queryParams.get("movieid");
    cl(movieId);
    let movieUrl = `${baseurl}/movie/${movieId}?api_key=${apiKey}`;
    let movieVideoUrl = `${baseurl}/movie/${movieId}/videos?api_key=${apiKey}`;

    let movObj = await makeApiCall(movieUrl, "GET");
    let movVideos = await makeApiCall(movieVideoUrl, "GET");

    cl(movObj);
    cl(movVideos);

    const heroImg = document.getElementById("heroImg");
    const heroImgContainer = document.querySelector("#heroImg figure");
    const blurredImg = document.querySelector(".blurred-image img")
    heroImgContainer.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${movObj.backdrop_path})`;
    blurredImg.setAttribute("src", `https://image.tmdb.org/t/p/original${movObj.backdrop_path}`)
    let div = document.createElement("div");
    div.className = `caption d-flex justify-content-center flex-column pl-4`;

    div.innerHTML = `
    <h3 class="display-3">${movObj.title}</h3>
    <em>
        ${movObj.overview}
    </em>
    
            `

    heroImg.append(div)

})