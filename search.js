window.onload = function () {
    console.log("hello world")

    let input = document.querySelector("input");
    let output = document.createElement("p");
    output.className = "output"
    output.textContent = "jack"
    let app = document.getElementById("app")
    console.log("app" + app)
    app.append(output)

    input.oninput = () => {
        output.textContent = input.value;
    }

    GetRepoistoryInfo = () => {
        fetch("https://api.github.com/search/repositories", { q: "q" })
            .then(response => response.json())
            .then(data => console.log(data))
    }
    GetRepoistoryInfo()
}


