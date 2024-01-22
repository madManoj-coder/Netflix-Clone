const cl = console.log;

const baseurl = `https://api.themoviedb.org/3`;
const apikey = `1ab0b6ee06ec01c77561b6ad6e0c1901`;
const trendingMovies = `${baseurl}/trending/all/week?api_key=${apikey}`


const trendingMoviesSlider = document.getElementById("trendingMoviesSlider")


// const makeApiCall = (apiUrl, methodName, msgBody = null) => {
//    return fetch(apiUrl, {
//         body : msgBody,
//         method : methodName
//     })
//     .then(res => {
//         res.json()
//     })

// }

const insertMainSliderItems = (arr) => {
    let result = "";
    arr.forEach(movieObj => {
        result += `<div class="item">
                 <figure class="ml-0 movieCard" id="${movieObj.id}">
                     <img src="https://image.tmdb.org/t/p/original/${movieObj.poster_path}"
                         alt="${movieObj.original_title || movieObj.original_name}"
                         title="${movieObj.original_title || movieObj.original_name}">
                     <figcaption class="caption d-flex justify-content-center flex-column">
                           <strong class="display-3 my-3">${movieObj.original_title || movieObj.original_name}</strong>
                         <em>
                           ${movieObj.overview}  
                         </em>
                     </figcaption>
                 </figure>
               </div>`
    });

    trendingMoviesSlider.innerHTML = result;
}

const makeApiCall = async (apiUrl, methodName, msgBody = null) => {
    let res = await fetch(apiUrl, {
        method: methodName,
        body: msgBody
    })

    return res.json()
}

const getTrendingMovies = async () => {
    try {
        let trendingData = await makeApiCall(trendingMovies, "GET")
        cl(trendingData.results)
        insertMainSliderItems(trendingData.results)
        $("#trendingMoviesSlider").owlCarousel({
            loop: true,
            margin: 10,
            nav: true,
            margin : 10,
            autoplay : true,
            autoplayTimeout : 5000,
            autoplayHoverPause : true,
            // navText : ["<i class='fa-solid fa-angles-left'></i>", "<i class='fa-solid fa-angles-right'></i>"],
            responsive: {
                0: {
                    items: 1,
                    dots: false
                },
                600: {
                    items: 1
                },
                1000: {
                    items: 1,
                    autoplay: true
                }
            }
        })
    }catch(err){
        alert(`Something went wrong`)
    }
    
}

getTrendingMovies()

