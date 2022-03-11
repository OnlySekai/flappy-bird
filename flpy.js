var cvs=document.getElementById(`canvas`);
var ctx=cvs.getContext(`2d`);

// load image
var bird=document.createElement(`IMG`);
var bg=document.createElement(`IMG`);
var fg=document.createElement(`IMG`);
var pipeNorth=document.createElement(`IMG`);
var pipeSouth=document.createElement(`IMG`);

bird.src=`images/bird.png`;
bg.src=`images/bg.png`;
fg.src=`images/fg.png`;
pipeNorth.src=`images/pipeNorth.png`;
pipeSouth.src=`images/pipeSouth.png`;
ctx.drawImage(bird,0,0);

//audio
var fly=document.createElement(`AUDIO`);
var score=document.createElement(`AUDIO`);
var lose=document.createElement(`AUDIO`);
fly.src=`sounds/fly.mp3`;
score.src=`sounds/score.mp3`;
lose.src=`sounds/xinvinhbiet.mp3`;

//some variable
const locate={x:10,y:250};
const gravity=1.5,gap=80;
var distance;
var bottom=cvs.height-fg.height;
var point=0;

//press any key to move up
function moveUp(){
    locate.y-=25;
    fly.play();
}


//pipe
const pipe=[];
pipe.push({x:cvs.width,y:0});

//loser?

function loser(){
    if (locate.y>=bottom-bird.height) return true;
    for (let i=0;i<pipe.length;i++){
        if (locate.x+bird.width>pipe[i].x&&locate.x<pipe[i].x+pipeNorth.width&&
            (locate.y<pipe[i].y+pipeNorth.height||locate.y+bird.height>distance))
                return true;
        if (pipe[i].x==5){
        point++;
        score.play();
        }
        
    }
    return false;
}

//draw

function draw(){
    ctx.drawImage(bg,-55,0);
    for (let i=0;i<pipe.length;i++){
        distance=pipeNorth.height+pipe[i].y+gap;
        ctx.drawImage(pipeNorth,pipe[i].x,pipe[i].y);
        ctx.drawImage(pipeSouth,pipe[i].x,distance);
        pipe[i].x--;
    }
    if (pipe[0].x<=-pipeNorth.width) 
        pipe.shift();
    if (pipe[pipe.length-1].x==100) 
        pipe.push({
            x:cvs.width,
            y:Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height,
        });
    locate.y+=gravity;
    ctx.drawImage(bird,locate.x,locate.y);  
    ctx.drawImage(fg,0,bottom);
    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("Score : "+point,10,cvs.height-20);
    if (!loser()){
        requestAnimationFrame(draw);
        document.addEventListener(`keydown`,moveUp);
    }
        else 
            lose.play();
}
draw();
