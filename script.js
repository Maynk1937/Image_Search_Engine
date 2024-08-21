const accessKey = "HMQeYB_pf5Iymnl8I68WJcfKvR-KF7EQ9mnAM0rSRHM";
let searchForm = document.getElementById('search-form');
let searchBox = document.getElementById('search-box');
let searchBtn = document.getElementById('search-btn');
let showMore = document.getElementById('show-more');
let searchResult = document.getElementById('search-result');
let button = document.getElementById('button');
const body = document.querySelector('body');
let heading = document.getElementById('heading');


let keyword = "";
let page = 1;

async function searchImages(){
    keyword = searchBox.value;

    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

    const response = await fetch(url);
    const data = await response.json();
    if(page===1){
        searchResult.innerHTML = "";
    }

    const results = data.results;
    results.map((result) =>{
        const image = document.createElement('img');
        image.src = result.urls.small;
        const imageLink = document.createElement('a');
        imageLink.href = result.links.html;
        imageLink.target = "_blank";

        imageLink.appendChild(image);
        searchResult.appendChild(imageLink);

    })
    showMore.style.display = 'block';
}

searchBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    page = 1;
    searchImages();
})
showMore.addEventListener('click', ()=>{
    page++;
    searchImages();
})


let isdark = localStorage.getItem('isdark') === 'true';
function applyMode() {
    if (isdark) {
        body.style.background = 'black';
        button.classList.remove('fa-moon');
        button.classList.add('fa-sun');
        heading.style.color = 'lavender';
    } else {
        body.style.background = 'linear-gradient(270deg, #96c096, #8184b3)';
        button.classList.remove('fa-sun');
        button.classList.add('fa-moon');
        heading.style.color = 'aliceblue';
    }
}

applyMode();

button.addEventListener('click', () => {
    isdark = !isdark; 
    localStorage.setItem('isdark', isdark);  
    applyMode();  
});

