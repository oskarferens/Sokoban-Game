const CreateBoard = () =>{
    let map = tileMap03;

    for(let y = 0; y < map.mapGrid.length; y++)
    {
        for(let x = 0; x < map.width; x++)
        {
            let div = document.createElement("div");
            
            
            if(map.mapGrid[y][x] == "W"){
                div.classList.add(Tiles.Wall);
            }
            
            else if (map.mapGrid[y][x] == "B"){
                div.classList.add(Entities.Block);
            }

            else if (map.mapGrid[y][x] == "P"){
                div.classList.add(Entities.Character);
            }
            
            else if (map.mapGrid[y][x] == "G"){
                div.classList.add(Tiles.Goal);
            }
            else  {
                div.classList.add(Tiles.Space);
            }

            div.classList.add("tiles");
            div.id = `${x},${y}`;
            document.getElementById("gamearea").append(div);
        }
    }
}

CreateBoard();
addEventListener("keydown", function (e){
    e.preventDefault();

    switch(e.key)
    {
        case "ArrowLeft" : 
            move("left");
            break;

        case "ArrowRight" : 
            move("right");
            break;

        case "ArrowUp" : 
            move("up")
            break;

        case "ArrowDown" : 
            move("down");
            break;

        default:
            break;
    }
})

function move (direction){

    let moveX = 0;
    let moveY = 0;

    switch(direction)
    {
        case "left":
            moveX = -1;
            break;
        case "right":
            moveX = 1;
            break;
        case "up":
            moveY = -1;
            break;
        case "down":
            moveY = 1;
            break;

    }

    let player = document.getElementsByClassName(Entities.Character)[0];
    let playerPos = player.id.split(',');
    let playerXpos = playerPos[0];
    let playerYpos = playerPos[1];

    let nextPosX = Math.round(playerXpos) + moveX;
    let nextPosY = Math.round(playerYpos) + moveY;

    let nextTilePos = (`${nextPosX},${nextPosY}`);
    let nextTile = document.getElementById(nextTilePos);

    if(nextTile.classList.contains("tile-wall"))
        return;
    
    if(nextTile.classList.contains("entity-block"))
    {
        let tileBehindXPos = Math.floor(playerXpos) + moveX*2;
        let tileBehindYPos = Math.floor(playerYpos) + moveY*2;
        let tileBehindPos = (`${tileBehindXPos},${tileBehindYPos}`);
        let tileBehind = document.getElementById(tileBehindPos);

        if(tileBehind.classList.contains("tile-wall") || tileBehind.classList.contains("entity-block"))
            return;
        
        if(tileBehind.classList.contains("tile-goal"))
        {
            tileBehind.classList.add(Entities.BlockDone);
        }
        
        if(nextTile.classList.contains("entity-block-goal"))
        {
            nextTile.classList.remove(Entities.BlockDone);
        }

        tileBehind.classList.add(Entities.Block);
        nextTile.classList.remove(Entities.Block);
    } 
    
    nextTile.classList.add(Entities.Character);
    player.classList.add(Tiles.Space);
    player.classList.remove(Entities.Character);
    let blocksDone = document.getElementsByClassName(Entities.BlockDone);
    let blocks = document.getElementsByClassName(Entities.Block);

    if(blocksDone.length == blocks.length)
    {
        setTimeout(function() {
            document.getElementById("result").style.visibility = "visible";
            }, 200);
    }
}