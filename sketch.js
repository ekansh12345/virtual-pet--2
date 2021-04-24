//Create variables here
var dog, dogImg, happydogImg, database, foodS, foodStock;
var feed, addFood;
var fedime, lastFed;
var foodObj;
function preload()
{
  dogImg=loadImage("images/dogImg.png");
  happydogImg=loadImage("images/dogImg1.png");
	//load images here
}

function setup() {
	createCanvas(1000, 500);
  database = firebase.database();
  
  foodObj = new Food();

  dog = createSprite(800, 220, 150, 150);
  dog.addImage(dogImg)
  dog.scale = 0.15
  
  feed = createSprite("feed the Dog")
  feed.position(700, 95);
  feed.mousePressed(addFoods);

  addFood = createSprite("Add Food");
  addFood.position(800, 95);
  addFood.mousePressed(addFood);

}


function draw() {
  background(46, 139, 87);
  
  fedTime = datebase.ref("FeedTime");
  fedTime.on("value", function (data) {
    lastFed = data.val();
  })
  Fill(255);
  textSize(20);
  if (lastFed >= 12) {
    text("Last Feed:" + lastFed % 12 + "PM", 350, 30);
  } else if (lastFed == 0) {
    text("Last Feed:" + lastFed + "AM", 350, 30);
  } else {
    text("Last Feed:" + lastFed + "AM", 350, 30);
  }

  foodObj.display();
  drawSprites();

}
function readStock(data) {
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}
  
function feedDog() {
  dog.addImage(happyDog);
  foodObj.updateFoodStock(foodObj.getFoodStock() - 1)
  database.ref('/').update({
    Food: foodObj.getFoodStock(),
    FeedTime: hour()
  })
}

function addFoods() {
  foodS ++;
  database.ref('/').update({
    Food: foodS
 })
}



