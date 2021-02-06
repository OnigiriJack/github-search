window.onload = function () {
    console.log("hello world")

    let input = document.querySelector("input");
    let output = document.createElement("ul");
    output.className = "output"

    let app = document.getElementById("app")
    console.log("app" + app)
    app.append(output)

    input.oninput = () => {

        setTimeout(GetRepoistoryInfo, 500)
    }

    GetRepoistoryInfo = () => {
        fetch(`https://api.github.com/search/repositories?q=${input.value}`,
            {
                headers: {
                    'Accept': 'application/vnd.github.v3+jsonn',
                },
            })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                let repos = data.items;

                repos.map(repo => {
                    let repoObj = {
                        url: repo.svn_url,
                        name: repo.name,
                    }
                    let repoEl = document.createElement("li");
                    let a = document.createElement("a");
                    a.textContent = `${repoObj.name}`;
                    a.setAttribute("href", repoObj.url)
                    repoEl.appendChild(a)
                    output.appendChild(repoEl);
                })


            })
    }

}


