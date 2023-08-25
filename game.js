/* 
    this is an example game

    if you want to change canvas resolution then you do that in canvasscript.js
*/

let isAlive = true;
const gameOverText = document.getElementById("gameOver");

const spriteSheet = new Image(14, 10);
spriteSheet.src = "spritesheet.png";

let lives = 3;

let acceleration = 0;

let x = 50;
let y = 50;

const h = 10;
const w = 4;

RectColor("#f00");

let isGrounded = false;
let isFalling = true;

let enemyKillCycle = 0;

let invincibility = 10;

let canBomb = true;

let direcction = 
{
    a: 
    {
        pressed: false
    },
    d: 
    {
        pressed: false
    }
}

let enemies = [];

LineColor("#444");
LineWidth(2);

class Slime
{
    constructor()
    {
        this.x = Math.random() * WIDTH;
        this.y = -10;
        this.w = 10;
        this.h = 10;
        this.isBlue = Math.floor(Math.random() * 2);
        this.speed = Math.random() + 1;
        enemies.push(this);
    }

    Render()
    {
        Line(this.x + 5, this.y - 5, x + 2, y - 5);

        if(this.isBlue == 0)
        {
            DrawImage(spriteSheet, Math.floor(this.x), Math.floor(this.y - this.h), 4, 0, this.w, this.h);
        } else 
        {
            DrawImage(spriteSheet, Math.floor(this.x), Math.floor(this.y - this.h), 14, 0, this.w, this.h);
        }
    }

    Move()
    {
        if
        (
            (y >= this.y - this.h - 10 && y <= this.y - this.h)
            &&
            (x >= this.x - 5 && x < this.x + this.w + 5)    
        )
        {
            enemies.splice(enemies.indexOf(this), 1);
            enemyKillCycle++;
            if((enemyKillCycle % 5) == 0)
            {
                lives++;
            }
            if((enemyKillCycle % 20) == 0)
            {
                canBomb = true;
            }
            if(Math.random() > 0.5) new Slime();
            acceleration = -5; 
        }

        if
        (
            (y <= this.y + 5 && y > this.y - this.h)
            &&
            (x >= this.x - 2 && x < this.x + this.w + 2)
        )
        {
            if(invincibility < 0)
            {
                lives -= 1;
                invincibility = 15;
                enemies.splice(enemies.indexOf(this), 1);
    
                if(lives == 0)
                {
                    isAlive = false;
                    gameOverText.classList.remove("hidden");
                }
            }
        }

        let theta = Math.atan2(y - this.y, x - this.x);
        this.x += Math.cos(theta) / this.speed;
        this.y += Math.sin(theta) / this.speed;
    }
}

function Draw()
{ 
    invincibility--;
    console.log(invincibility);

    if(!isAlive)
    {
        RectColor("#f00");
        Rect(0, 0, WIDTH, HEIGHT);
        return;   
    }

    RectColor("#222");
    Rect(0, 0, WIDTH, HEIGHT);

    for(let enemy of enemies)
    {
        enemy.Render();
        enemy.Move();
    }

    DrawImage(spriteSheet, x, y - h, 0, 0, w, h);

    if(isFalling)
    {
        acceleration += 0.5;
        y += acceleration;
    }

    if(y >= 100)
    {
        isGrounded = true;
        isFalling = false;
        acceleration = 0;
        y = 100;
    }

    if(!(x < 0 || x > WIDTH - w))
    {
        x += (direcction.a.pressed ? -1 : 0) + (direcction.d.pressed ? 1 : 0);
    } else 
    {
        if(x < WIDTH / 2)
        {
            x = WIDTH - w;
        } else
        {
            x = 0;
        }
    }

    for(let i = 0; i < lives; i++)
    {
        DrawImage(spriteSheet, 3 + i * 9 + i * 2, 3, 24, 0, 9, 9);
    }

    if(canBomb) DrawImage(spriteSheet, 140, 88, 33, 0, 7, 10);
}

window.addEventListener("keydown", e => 
{
    switch(e.key)
    {
        case "a":
            direcction.a.pressed = true;
            break;
        case "d":
            direcction.d.pressed = true;
            break;
        case "r":
            window.location.reload();
            break;
        case "e":
            const enemyCount = enemies.length;
            if(canBomb)
            {
                enemies = [];
            }
            for(let i = 0; i < Math.floor(enemyCount / 5); i++)
            {
                new Slime();
            } 
            canBomb = false;
            lives = 3;
            break;
        case " ":
            if(isGrounded)
            {
                acceleration = -7;
                isFalling = true;
                isGrounded = false;
            }
            break;
    }
});

window.addEventListener("keyup", e => 
{
    switch(e.key)
    {
        case "a":
            direcction.a.pressed = false;
            break;
        case "d":
            direcction.d.pressed = false;
            break;
    }
});

setInterval(() => new Slime(), 2000);
drawCalls.push(Draw);