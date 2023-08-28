// --- CONFIG ---

const WIDTH = 150;
const HEIGHT = 100;

// --- CANVAS CREATION ---

const canvas = document.createElement("canvas");
canvas.width = WIDTH;
canvas.height = HEIGHT;
document.body.append(canvas);

const pen = canvas.getContext("2d");

// --- FUNCTIONS ---

function Line(cx, cy, ex, ey)
{
    pen.beginPath();
    pen.moveTo(cx, cy);
    pen.lineTo(ex, ey);
    pen.stroke();
}

function LineWidth(w)
{
    pen.lineWidth = w;
}

function LineColor(c)
{
    pen.strokeStyle = c;
}

function ClearRect(sx, sy, ex, ey)
{
    pen.clearRect(sx, sy, ex, ey);
}

function Rect(sx, sy, ex, ey)
{
    pen.fillRect(sx, sy, ex, ey);
}

function RectColor(c)
{
    pen.fillStyle = c;
}

function DrawImage(i, x, y, ix, iy, w, h)
{
    pen.drawImage(i, ix, iy, w, h, x, y, w, h);
}

let currentFont = "sans-serif";
let currentTextSize = "50px";

function SetTextFont(font)
{
    currentFont = font;
}

function SetTextSize(size)
{
    currentTextSize = size;
}

function DrawText(text, x, y)
{
    pen.fillText(text, x, y);
}

function StrokeText(text, x, y)
{
    pen.strokeText(text, x, y);
}

async function RegisterFont(title, url, descriptors)
{
    let font;
    if(!descriptors)
    {
        font = new FontFace(title, `url(${ url })`);
    } else font = new FontFace(title, `url(${ url })`, descriptors);

    await font.load();
    document.fonts.add(font);
}

// --- CanvasScript LOGIC ---

let drawCalls = [];
function CanvasScriptDrawFunction()
{
    for(let func of drawCalls)
    {
        func();
    }

    window.requestAnimationFrame(CanvasScriptDrawFunction);
}

window.requestAnimationFrame(CanvasScriptDrawFunction);