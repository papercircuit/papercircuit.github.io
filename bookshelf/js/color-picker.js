const colorPicker = document.querySelector("#colorPicker").addEventListener("input", watchColorPicker);

// A function that watches the colorPicker value change over time and updates the background color of the page

function watchColorPicker(event) {
    const color = event.target.value;
    document.body.style.backgroundColor = color;
}

