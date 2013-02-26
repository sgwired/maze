"use strict";

function Maze(width, height) {
	this.width = width;
	this.height = height;

	this.startX           = null;
	this.startY           = null;
	this.startOrientation = null;
	this.endX             = null;
	this.endY             = null;

	this.directions = ["north", "east", "west", "south"];
	this.spaces = [];

	var x, y;
	for(x =1; x <= width; x += 1) {
		this.spaces[x] = [];
		for (y=1; y <= height; y += 1) {
			this.spaces[x][y] = new MazeSpace(this.directions);
		}
	}
}


Maze.prototype.setStart = function(x, y, orientation) {
	if (this.isInBounds(x,y) && this.isValidDirection(orientation)) {
		this.startX = x;
		this.startY = y;
		this.startOrientation = orientation;
		return true;
	}
	return false;
}

Maze.prototype.setEnd = function (x, y) {
	if (!this.isInBounds(x,y)) {
		return false;
	}
	this.endX = x;
	this.endY = y;
	return true;
}

Maze.prototype.setWall = function (x, y, direction) {
	if (this.isInBounds(x,y) &&  this.isValidDirection(direction)) {
		this.spaces[x][y].setWall(direction);
		return true;
	}
	return false;
}

Maze.prototype.isValidDirection = function (direction){
	return this.directions.indexOf(direction) !== -1;
}

Maze.prototype.isInBounds = function (x, y) {
	return x > 0 && x <= this.width && y > 0 & y <= this.height;
}


Maze.prototype.canMove = function (x,y, direction) {
	if (!this.isValidDirection(direction)) {
		return false;
	}

	if (!this.isInBounds(x, y)) {
		return false;
	}



	// check to see which way robot is facing to see if inbounds
	var fowardX, fowardY;
	switch (direction) {
		case "north":
			fowardX = x;
			fowardY = y+1;
			break;
		case "east":
			fowardX = x+1;
			fowardY = y;
			break;
		case "south":
			fowardX = x;
			fowardY = y-1;
			break;
		case "west":
			fowardX = x-1;
			fowardY = y;
			break;
	}

	if (!this.isInBounds(fowardX, fowardY)) {
		return false;
	}

	// check if there is wall in front of robot
	if (this.spaces[x][y][direction]) {
		return false;
	}

	// check to see if while is on oppiside of wall in front of robot
	var opposites = {
		north: "south",
		east: "west",
		south: "north",
		west: "east",
	};

	if (this.spaces[fowardX][fowardX][opposites[direction]]) {
		return false;
	}

	return true;

}
