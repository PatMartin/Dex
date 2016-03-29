function colorToHex(color)
{
    if (color.substr(0, 1) === '#') {
        return color;
    }
    console.log("COLOR: " + color)
    var digits = /rgb\((\d+),(\d+),(\d+)\)/.exec(color);
    console.log("DIGITS: " + digits);
    var red = parseInt(digits[1]);
    var green = parseInt(digits[2]);
    var blue = parseInt(digits[3]);
    
    var rgb = blue | (green << 8) | (red << 16);
    return '#' + rgb.toString(16);
};