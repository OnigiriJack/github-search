window.onload = function () {
    let apiCallCount = 0;
    let throttled = false;
    let input = document.querySelector("input");
    let previousInput = input.value;
    let repoList = document.createElement("ul");
    repoList.className = "repos"
    let app = document.getElementById("app")
    app.append(repoList)

    // every ten seconds reset the throttle
    window.setInterval(() => {
        throttled = false;
        document.getElementById("warning").style.display = "none";
        apiCallCount = 0;
    }, 15000);

    window.setInterval(() => {
        if (input.value != previousInput && throttled === false) {
            console.log("called" + "previous " + previousInput + " current " + input.value)
            getRepoInfo();
            apiCallCount++;
        }
        if (apiCallCount > 2) {
            throttled = true;
            document.getElementById("warning").style.display = "block";
        }
        console.log(apiCallCount)
        previousInput = input.value;
    }, 2000)

    getRepoInfo = () => {
        fetch(`https://api.github.com/search/repositories?q=${input.value}`,
            {
                headers: {
                    'Accept': 'application/vnd.github.v3+jsonn',
                },
            })
            .then(response => response.json())
            .then(data => {
                //console.log(data)
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


