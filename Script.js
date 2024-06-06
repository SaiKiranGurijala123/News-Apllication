// LogIn Form Script
(function(n,t,a,e,co){var i="aptrinsic";n[i]=n[i]||function(){
    (n[i].q=n[i].q||[]).push(arguments)},n[i].p=e;n[i].c=co;
  var r=t.createElement("script");r.async=!0,r.src=a+"?a="+e;
  var c=t.getElementsByTagName("script")[0];c.parentNode.insertBefore(r,c)
})(window,document,"https://web-sdk.aptrinsic.com/api/aptrinsic.js","AP-HMVJXVOOAUYX-2");

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function checkUser() {
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;


        let emailError = document.getElementById("email-error");
        let passError = document.getElementById("pass-error");

        // Hide error messages by default
        emailError.style.display = 'none';
        passError.style.display = 'none';

        let valid = true;

        // Validate email
        if (!validateEmail(email)) {
            emailError.style.display = 'block';
            valid = false;
        }

        // Validate password
        if (password.trim() === "") {
            passError.style.display = 'block';
            valid = false;
        }

        if (!valid) {
            return;
        }

        let user_records = JSON.parse(localStorage.getItem("users")) || [];
        if (user_records.some((v) => v.email === email && v.password === password)) {
            alert("LogIn Successful");

           //passing user and account objects:

            let current_user = user_records.filter((v) => v.email === email && v.password === password)[0];
            localStorage.setItem("name", current_user.name);
            localStorage.setItem("email", current_user.email);
            localStorage.setItem("phoneNumber", current_user.phoneNumber);
            localStorage.setItem("gender", current_user.gender);
           
            

            var userid = email.substring(0,3);

                aptrinsic("identify",

{
    
    // User Fields
    "id": userid, // Required for logged in app users
    "email": email,
},
{
    // Account Fields
    "id": "IBM", // Required
    "name": "International Business Machine",
}
);

window.location.href = "news.html";


        } else {
            alert("Login Failed");
        }
    }




    // news Script

document.addEventListener("DOMContentLoaded", function() {
    const newsContainer = document.getElementById('news-container');

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
    window.location.href="Index.html";
}
