const colorSelector = document.getElementById("colorSelector");
const color = document.getElementById("color");
const HEX = document.getElementById("hex");
const RGB = document.getElementById("rgb");
const HLS = document.getElementById("hls");

colorSelector.addEventListener("change", defaultFunction);

function defaultFunction() {
    HEX.innerText = "HEX: " + colorSelector.value;
    RGB.innerText = "RGB: " + hexToRGB(colorSelector.value, false);
    HLS.innerText = "HLS: " + hexToRGB(colorSelector.value, true);
    color.style.backgroundColor = colorSelector.value;
}
function hexToRGB(hex, HLSB) {
    let r = createRGBNumber(1, 2, hex);
    let g = createRGBNumber(3, 4, hex);
    let b = createRGBNumber(5, 6, hex);
    if(HLSB) {
        return RGBToHSL(r.replace("%", ""),g.replace("%", ""),b.replace("%", ""));
    } else {
        return [r,g,b].join();
    }

}
function createRGBNumber(value1, value2, hex) {
    //https://css-tricks.com/converting-color-spaces-in-javascript/
    return (("0x" + hex[value1] + hex[value2]) / 255*100).toFixed() + "%";
}
function RGBToHSL(r,g,b) {
    //https://css-tricks.com/converting-color-spaces-in-javascript/
    // Make r, g, and b fractions of 1
    r /= 255;
    g /= 255;
    b /= 255;

    // Find greatest and smallest channel values
    let cmin = Math.min(r,g,b),
        cmax = Math.max(r,g,b),
        delta = cmax - cmin,
        h = 0,
        s = 0,
        l = 0;
    // Calculate hue
    // No difference
    if (delta == 0)
        h = 0;
    // Red is max
    else if (cmax == r)
        h = ((g - b) / delta) % 6;
    // Green is max
    else if (cmax == g)
        h = (b - r) / delta + 2;
    // Blue is max
    else
        h = (r - g) / delta + 4;

    h = Math.round(h * 60);

    // Make negative hues positive behind 360°
    if (h < 0)
        h += 360;
    // Calculate lightness
    l = (cmax + cmin) / 2;

    // Calculate saturation
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

    // Multiply l and s by 100
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    return h + "," + s + "%," + l + "%";
}