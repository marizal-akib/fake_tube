const loadCategory = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await res.json();
    const buttons = data.data;
    showCategory(buttons);
}

const btnContainer = document.getElementById('btn-container');

const showCategory = buttons => {
    // console.log(buttons);
    buttons.forEach(button => {
        console.log(button);
        const categoriesBtn = document.createElement('div');
        categoriesBtn.innerHTML = `<button onclick="loadVideos('${button.category_id}')" class='btn btn-active ml-2 mr-2 '>${button.category}</button>`;
        btnContainer.appendChild(categoriesBtn);
    })

}


// videos data

const loadVideos = async (id = 1000) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    data = await res.json();
    videos = data.data;
    showVideos(videos);
}


const showVideos = videos => {

    const videosContainer = document.getElementById('videos-container');
    videosContainer.textContent = '';
    console.log(videos.length);

    const noVideoText = document.getElementById("no-video-container")

    if (videos.length === 0) {
        noVideoText.classList.remove('hidden')
    }
    else {
        noVideoText.classList.add('hidden')
    }

    videos.forEach(video => {
        // console.log(video);

        function formatTime(msTime) {
            if (msTime === 0 || msTime === '') {
                return '';
            }

            const totalSeconds = Math.floor(msTime / 1000);
            const days = Math.floor(totalSeconds / 86400);
            const hours = Math.floor((totalSeconds % 86400) / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const seconds = totalSeconds % 60;

            const formattedTime = `${days > 0 ? days + 'd ' : ''}${hours > 0 ? hours + 'hrs ' : ''}${minutes > 0 ? minutes + 'min ' : ''}${seconds}s`;


            return formattedTime;
        }

        const msTime = video?.others?.posted_date;
        const formattedTime = formatTime(msTime);


        const views = video.others.views



        const videoCard = document.createElement('div');
        videoCard.classList = 'card w-[312px] h-[400px] bg-base-100 shadow-xl';

        videoCard.setAttribute('data-views', views);
        
        videoCard.innerHTML = `<figure><img  class="h-[200px]" src="${video.thumbnail}" /></figure>
        <div class="card-actions justify-end rounded-md relative bottom-9 right-3">
            <p class="bg-black font-thin text-white max-w-fit">${formattedTime}</p>
            
          </div>
        <div class="card-body">
            <h2 class="card-title">
                <img class="w-12 h-12 rounded-full" src="${video.authors[0].profile_picture}" alt="">
                ${video.title}
            </h2>
            <h3 class="pl-14">
            ${video.authors[0].profile_name}
            <i class="fa-solid fa-certificate ${video.authors[0].verified ? '' : 'hidden'}" style="color: #2977ff;"></i>
             
            </h3>
            <p class="pl-14"><span>${video.others.views}</span> views</p>
        </div>`;
        videosContainer.appendChild(videoCard);



    })

}

// Sort video

const sortVideosByViews = () => {
    const videosContainer = document.getElementById('videos-container');
    const videoCards = Array.from(videosContainer.querySelectorAll('.card'));

    videoCards.sort((a, b) => {
        const viewsA = parseInt(a.getAttribute('data-views'));
        const viewsB = parseInt(b.getAttribute('data-views'));
        return viewsB - viewsA; // Sort in descending order
    });

    videosContainer.textContent = '';

    videoCards.forEach((videoCard) => {
        videosContainer.appendChild(videoCard);
    });
};
const sortByViewsButton = document.getElementById('sort-by-views-button');
sortByViewsButton.addEventListener('click', sortVideosByViews);

loadCategory();
loadVideos();