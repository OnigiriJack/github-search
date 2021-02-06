window.onload = function () {
    let apiCallCount = 0;
    let throttled = false;
    // 1 call/Minute 

    //if more then ten calls a minute then throttle for 1 minute
    //reset throttle
    window.setInterval(() => {
        throttled = false
        apiCallCount = 0;
    }, 10000);
    let input = document.querySelector("input");
    let repoList = document.createElement("ul");
    repoList.className = "repos"
    let app = document.getElementById("app")
    app.append(repoList)

    input.oninput = () => {

        setTimeout(function () {
            if (throttled === false) {
                //getRepoInfo();
                apiCallCount++;
            } else {
                console.log("request limit exceeded")
            }
            if (apiCallCount > 3) throttled = true;
            console.log("API COUNT: " + apiCallCount)
            console.log("throttled: " + throttled)
        }, 1000)
    }

    getRepoInfo = () => {
        fetch(`https://api.github.com/search/repositories?q=${input.value}`,
            {
                headers: {
                    'Accept': 'application/vnd.github.v3+jsonn',
                },
            })
            .then(response => response.json())
            .then(data => {
                data.items.map(repo => {
                    let repoObj = {
                        url: repo.svn_url,
                        name: repo.name,
                    }
                    let repoEl = document.createElement("li");
                    let a = document.createElement("a");
                    a.textContent = `${repoObj.name}`;
                    a.setAttribute("href", repoObj.url)
                    repoEl.appendChild(a)
                    repoList.appendChild(repoEl);
                })
            })
    }
}


