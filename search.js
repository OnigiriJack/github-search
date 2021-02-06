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
}


