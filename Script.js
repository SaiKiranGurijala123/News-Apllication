// LogIn Form Script


// === Load Aptrinsic SDK Early ===
(function(n,t,a,e,co){
    var i="aptrinsic";n[i]=n[i]||function(){
        (n[i].q=n[i].q||[]).push(arguments)},n[i].p=e;n[i].c=co;
    var r=t.createElement("script");r.async=!0;r.src=a+"?a="+e;
    var c=t.getElementsByTagName("script")[0];c.parentNode.insertBefore(r,c)
})(window,document,"https://web-sdk.aptrinsic.com/api/aptrinsic.js","AP-HMVJXVOOAUYX-2");

// === Utility ===
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function waitAndIdentify(userId, email) {
    const checkInterval = setInterval(() => {
        if (typeof aptrinsic === "function") {
            clearInterval(checkInterval);
            aptrinsic("identify", {
                id: userId,
                email: email
            }, {
                id: "IBM",
                name: "International Business Machine"
            });
        }
    }, 100);
}

function checkUser() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let emailError = document.getElementById("email-error");
    let passError = document.getElementById("pass-error");

    emailError.style.display = 'none';
    passError.style.display = 'none';

    let valid = true;
    if (!validateEmail(email)) {
        emailError.style.display = 'block';
        valid = false;
    }

    if (password.trim() === "") {
        passError.style.display = 'block';
        valid = false;
    }

    if (!valid) return;

    let user_records = JSON.parse(localStorage.getItem("users")) || [];
    if (user_records.some((v) => v.email === email && v.password === password)) {
        alert("LogIn Successful");

        let current_user = user_records.find((v) => v.email === email && v.password === password);
        localStorage.setItem("name", current_user.name);
        localStorage.setItem("email", current_user.email);
        localStorage.setItem("phoneNumber", current_user.phoneNumber);
        localStorage.setItem("gender", current_user.gender);

        let userid = email.substring(0,3);
        waitAndIdentify(userid, email);

        window.location.href = "news.html";
    } else {
        alert("Login Failed");
    }
}

function logOut(){
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    if (typeof aptrinsic === "function") aptrinsic('reset');
    window.location.href = "Index.html";
}

function getEData(){
    let address = document.getElementById("address").value;
    let fname = document.getElementById("fName").value;
    let mname = document.getElementById("mName").value;
    let pincode = document.getElementById("pin").value;

    if (typeof aptrinsic === "function") {
        aptrinsic('track', 'formText', { address, fname, mname, pincode });
        aptrinsic('track', 'collectInfo', { address, fname, mname, pincode });
    }
}

function buttonclick() {
    if (typeof aptrinsic === "function") {
        aptrinsic('track', '328018 Test', { status: 'clicked' });
    }
}

function toggleButton() {
    var checkbox = document.getElementById("myCheckbox");
    var button = document.getElementById("myButton");
    button.disabled = !checkbox.checked;
}

// === PX Timer Tracking ===
function PXPageTimer(maxSecondsTracked, trackPagesOverMax) {
    this.pageName = null;
    this.startTime = null;
    this.maxSecondsTracked = maxSecondsTracked || 86400;
    this.trackPagesOverMax = trackPagesOverMax !== false;

    this.startTimer = function (pageName) {
        try {
            if (this.pageName && this.pageName !== pageName) this.endTimer();
            this.pageName = pageName;
            this.startTime = Date.now();
        } catch (e) {
            console.log("Unable to start timer on ", this.pageName);
        }
    };

    this.endTimer = function (pageUnloaded) {
        try {
            if (this.pageName) {
                let endTime = Date.now();
                let secondsOnPage = (endTime - this.startTime) / 1000;
                if (secondsOnPage <= this.maxSecondsTracked || this.trackPagesOverMax) {
                    if (typeof aptrinsic === "function") {
                        aptrinsic('track', 'timeOnPage', {
                            'pageName': this.pageName,
                            'seconds': Math.min(secondsOnPage, this.maxSecondsTracked),
                            'pageUnloaded': pageUnloaded
                        });
                    }
                }
                this.pageName = undefined;
            }
        } catch (e) {
            console.log("Unable to log time on page", this.pageName);
        }
    };
}

(function InitializeTimer() {
    let maxSecondsTracked = 3600;
    let trackPagesOverMax = false;
    let featureTimer = new PXPageTimer(maxSecondsTracked, trackPagesOverMax);

    featureTimer.startTimer(window.location.href);

    window.addEventListener('hashchange', () => {
        featureTimer.startTimer(window.location.href);
    });

    window.addEventListener('popstate', () => {
        featureTimer.startTimer(window.location.href);
    });

    window.addEventListener('beforeunload', () => {
        featureTimer.endTimer(true);
    });

    let realPushState = window.history.pushState;
    window.history.pushState = function (state, title, newLocation) {
        featureTimer.startTimer(newLocation); // fixed from newLocation.href
        return realPushState.apply(window.history, arguments);
    };
})();

// === News Page Script ===
document.addEventListener("DOMContentLoaded", function () {
    // Identify user on news page if logged in
    const email = localStorage.getItem("email");
    if (email) {
        const userid = email.substring(0, 3);
        waitAndIdentify(userid, email);
    }

    // Fetch and display news
    const newsContainer = document.getElementById('news-container');
    async function fetchNews() {
        try {
            const response = await fetch('https://newsapi.org/v2/top-headlines?country=us&category=general&apiKey=3bf8c16817f849cd85bc8a2a007ed7da');
            const data = await response.json();
            displayNews(data.articles);
        } catch (error) {
            console.error('Error fetching news:', error);
        }
    }

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

    fetchNews();
});
