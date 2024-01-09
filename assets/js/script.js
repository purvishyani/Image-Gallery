const chooseImage = document.getElementById('btn-choose-img');
const canvasImage = document.getElementById("canvas-img");
const previewImage = document.getElementById("preview-img");
const rangeBright = document.getElementById("brightness");
const rangeGray = document.getElementById("gray-scale");
const flipLeft = document.getElementById("btn-left");
const flipRight = document.getElementById("btn-right");
const flipUp = document.getElementById("btn-up");
const flipDown = document.getElementById("btn-down");
const resetFilter = document.getElementById("btn-reset");
const downloadImage = document.getElementById("btn-download");

let brightness = 100, grayscale = 0, rotate = 0;
let horizontal = 1, vertical = 1;

chooseImage.onclick = function importData() {

    let input = document.createElement('input');
    input.type = 'file';
    input.id = 'select-img';
    input.accept = 'image/*';
    input.onchange = (event) => {
        previewImage.src = URL.createObjectURL(event.target.files[0]);
    }
    input.click();
}

function updateFilter() {
    previewImage.style.filter = `brightness(${brightness}%) grayscale(${grayscale}%) `;
    previewImage.style.transform = `rotate(${rotate}deg) scale(${horizontal}, ${vertical})`;
}

rangeBright.onchange = () => {
    brightness = rangeBright.value;
    updateFilter();
}

rangeGray.onchange = () => {
    grayscale = rangeGray.value;
    updateFilter();
}

flipLeft.onclick = () => {
    horizontal = -1;
    updateFilter();
}

flipRight.onclick = () => {
    horizontal = 1;
    updateFilter();
}

flipUp.onclick = () => {
    vertical = -1;
    updateFilter();
}

flipDown.onclick = () => {
    vertical = 1;
    updateFilter();
}

function rotateImage(id) {

    if (id === 'btn-rotate-left') {
        rotate -= 90;
    }
    else if (id === 'btn-rotate-right') {
        rotate += 90;
    }
    updateFilter();
}

resetFilter.onclick = () => {
    previewImage.style.filter = "none";
    previewImage.style.transform = "none";
    rangeBright.value="default";
    rangeGray.value = "default";
    brightness = 100; grayscale = 0; rotate = 0; horizontal = 1; vertical = 1;
}

downloadImage.onclick = () => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.height = previewImage.naturalHeight;
    canvas.width = previewImage.naturalWidth;

    context.filter = `brightness(${brightness}%) grayscale(${grayscale}%) `;

    context.translate(canvas.width / 2, canvas.height / 2);
    if (rotate !== 0) {
        context.rotate(rotate * Math.PI / 180);
    }
    context.scale(horizontal, vertical);
    context.drawImage(previewImage, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
    document.body.appendChild(canvas);
    canvas.hidden = true;
    downloadImage.download = "image.jpg";
    downloadImage.href = canvas.toDataURL();
}