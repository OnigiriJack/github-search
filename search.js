window.onload = function () {
    let apiCallCount = 0;
    let throttled = false;
    let input = document.querySelector("input");
    let previousInput = input.value;
    let repoList = document.createElement("div");
    repoList.id = "repo-list";
    repoList.className = "repos";
    let app = document.getElementById("app");
    app.append(repoList);

    // every fifteen seconds reset the throttle
    window.setInterval(() => {
        throttled = false;
        document.getElementById("warning").style.display = "none";
        apiCallCount = 0;
    }, 15000);

    window.setInterval(() => {
        if (input.value != previousInput && throttled === false) {
            getRepoInfo();
            apiCallCount++;
        }
        if (apiCallCount > 2) {
            throttled = true;
            document.getElementById("warning").style.display = "block";
        }
        previousInput = input.value;
    }, 4000)

    getRepoInfo = () => {
        const ul = document.getElementById("repo-list");
        while (ul.firstChild) {
            ul.removeChild(ul.firstChild);
        }

        fetch(`https://api.github.com/search/repositories?q=${input.value}`,
            {
                headers: {
                    'Accept': 'application/vnd.github.v3+jsonn',
                },
            })
            .then(response => response.json())
            .then(data => {
                data.items.slice(0, 10).map(repo => {
                    let repoObj = {
                        url: repo.svn_url,
                        name: repo.name,
                        stars: repo.stargazers_count,
                        forks: repo.forks
                    }
                    let a = document.createElement("a");
                    let details = document.createElement("div");
                    details.className = "repo-item";
                    details.textContent = `     ⭐️ ${repoObj.stars} ⑂${repoObj.forks}`;
                    a.textContent = `${repoObj.name}`;
                    a.setAttribute("href", repoObj.url);
                    details.prepend(a);
                    repoList.appendChild(details);
                });
            });
    }
}


