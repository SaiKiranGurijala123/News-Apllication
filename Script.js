// const container = document.querySelector(".container");
// const optionsContainer=document.querySelector("options-container")

// const country="in";
// const options=["general","entertainment","health","science","sports","technology"];



// let requestURL;

// const generateUI=(articles) =>{

//     for (let item of articles ){
//         let card=document.createElement("div");
//         card.classList.add("news-card");
//         card.innerHTML=`<div class="news-images-container"> 
//         <img src="${item.urlToImage || "./newspaper.jpg"}
//         " alt=""/>
//         </div>
//         <div class="news-content">
//         <div class="news-title">
//         ${item.title}
//         </div>
//         <div class="news-description">
//         ${item.description || item.content ||""}
//         </div>
//         <a href ="${item.url}" target="_blank"
//         class ="view-button"> read more</a>
//         </div>`

//         container.appendChild(card);
        
//     };

//     const getNews=async()=>{
//         container.innerHTML= "";
//         let response=await fetch (requestURL);
//         if(!response.ok){
//             alert("data Unavailable at the moment. please try again later");
//             return false;

//         }
//         let data =await response.json();
//         generateUI(data.articles)
//     }

// }
// const init=()=>{
//     optionsContainer.innerHTML="";
//     getNews();
//     createOptions();
// };
// window.onload=()=>{
    
//     requestURL=`https://newsapi.org/v2/top-headlines?country=us&apiKey=3bf8c16817f849cd85bc8a2a007ed7da`;
//     init()
// }





document.addEventListener("DOMContentLoaded", function() {
    const newsContainer = document.getElementById('news-container');


    (function(n,t,a,e,co){var i="aptrinsic";n[i]=n[i]||function(){
        (n[i].q=n[i].q||[]).push(arguments)},n[i].p=e;n[i].c=co;
      var r=t.createElement("script");r.async=!0,r.src=a+"?a="+e;
      var c=t.getElementsByTagName("script")[0];c.parentNode.insertBefore(r,c)
    })(window,document,"https://web-sdk.aptrinsic.com/api/aptrinsic.js","AP-4YCPERINHU7C-2");

    // Function to fetch news from an API
    async function fetchNews() {

        try {
            const response = await fetch('https://newsapi.org/v2/top-headlines?country=us&category=general&apiKey=3bf8c16817f849cd85bc8a2a007ed7da');
            const data = await response.json();
            displayNews(data.articles);
        } catch (error) {
            console.error('Error fetching news:', error);
        }
    }

    // Function to display news articles
    function displayNews(articles) {
        newsContainer.innerHTML = '';
        articles.forEach(article => {
            const newsArticle = document.createElement('div');
            newsArticle.classList.add('news-article');
            
            const title = document.createElement('h2');
            title.textContent = article.title;
            
            const description = document.createElement('p');
            description.textContent = article.description;
            
            const link = document.createElement('a');
            link.href = article.url;
            link.textContent = 'Read more';
            link.target = '_blank';

            newsArticle.appendChild(title);
            newsArticle.appendChild(description);
            newsArticle.appendChild(link);
            newsContainer.appendChild(newsArticle);
        });
    }

    // Fetch news on page load
    fetchNews();

    
   

});
function logOut(){
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    window.location.href="LogInForm.html";
}