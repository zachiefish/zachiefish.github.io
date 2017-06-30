/****************** Variables ******************/
var height = 600;
var width = 1200;
var goalie;
var goalie2;
var puck;
var goal;
var goal2;
var pauseButton;
var pause = true;
/********************* Setup ********************/
var background = new Raster("images/hockeyBackground.jpg", [600, 300]);

goalie = new Object({
    skin: new Raster("images/goalie_red.png", [200, 300]),
    speed:7,
    score:0,
    scoreDisplay: new PointText({
                    point: [521, 50],
                    content: "Red Goalie\n0",
                    fillColor: '#990000',
                    fontSize: 30,
                    style: {justification:'center'}
                }),
});


goalie2 = new Object({
    skin: new Raster("images/goalie_blue.png" , [1000, 300]),
    speed:7,
    score:0,
    scoreDisplay: new PointText({
                    point: [679, 50],
                    content: "Blue Goalie\n0",
                    fillColor: '#2266CC',
                    fontSize: 30,
                    style: {justification:'center'}
                })
});

puck = new Object({
    skin: new Raster("images/hockey-puck.png" , [600, 300]),
    xSpeed: -10,
    ySpeed: 0,
});

goal = new Object({
    
    skin: new Raster ("images/black goal.png" , [100, 300])
})
goal2 = new Object({
    
    skin: new Raster ("images/black goal.png" , [1100, 300])
})

pauseButton = new Object({
    skin: new Raster ("images/hockey-pause.png" , [1100, 50])
})

pauseButton.skin.onClick = function (event) {
    pause = !pause;
}

/****************** Player One ******************/
  goalie.skin.onFrame = function (event) {
      if (Key.isDown('s') && goalie.skin.position.y < height - 55) {
          goalie.skin.position.y += goalie.speed;
      } else if (Key.isDown('w') && goalie.skin.position.y > 55) {
          goalie.skin.position.y += goalie.speed * -1;
      }
  }
 
/****************** Player Two ******************/
  goalie2.skin.onFrame = function (event) {
      if (Key.isDown('down') && goalie2.skin.position.y < height - 55) {
          goalie2.skin.position.y += goalie2.speed;
      } else if (Key.isDown('up') && goalie2.skin.position.y > 55) {
          goalie2.skin.position.y += goalie2.speed * -1;
      }
  }
 
/****************** Game Start ******************/
  function respawnPuck(goalie) {
      if (goalie == 1) {
          puck.skin.position = [900, 300];
          puck.xSpeed = -10;
          puck.ySpeed = 0;
      } else if (goalie == 2) {
          puck.skin.position = [300, 300];
          puck.xSpeed = 10;
          puck.ySpeed = 0;
      }
  }
  
  function collisionCheck(){
      var playerHitbox = goalie.skin.bounds;
      var player2Hitbox = goalie2.skin.bounds;
      var puckHitbox = puck.skin.bounds;
      
      if ( playerHitbox.intersects(puckHitbox) ) {
          puck.xSpeed = Math.abs(puck.xSpeed);
          puck.ySpeed = 0.1*(puck.skin.position.y - goalie.skin.position.y);
      }
      if ( player2Hitbox.intersects(puckHitbox) ) {
          puck.xSpeed = -1 * Math.abs(puck.xSpeed);
          puck.ySpeed = 0.1*(puck.skin.position.y - goalie2.skin.position.y);
      }
      
      //bounce puck off wall
      if (puck.skin.position.y < 0) {
          puck.ySpeed = Math.abs(puck.ySpeed);
      } else if (puck.skin.position.x < 100) {
          // puck.xSpeed = Math.abs(puck.xSpeed);
          // SCORE CODE HERE goalie side
          goalie2.score += 1;
          goalie2.scoreDisplay.content = "Blue Goalie\n" + goalie2.score;
          respawnPuck(2);
      } else if (puck.skin.position.y > height) {
          puck.ySpeed = -1 * Math.abs(puck.ySpeed);
      } else if (puck.skin.position.x > width - 100) {
          // puck.xSpeed = -1 * Math.abs(puck.xSpeed);
          // SCORE CODE HERE goalie2 side
          goalie.score += 1;
          goalie.scoreDisplay.content = "Red Goalie\n" + goalie.score;
          respawnPuck(1);
      }
  }
 
/******************* Game Play ******************/
function onFrame(event) {
    if (!pause) {
        puck.skin.position.x += puck.xSpeed;
        puck.skin.position.y += puck.ySpeed;
    }
    collisionCheck();
}
