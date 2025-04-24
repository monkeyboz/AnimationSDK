export class scoring{
	//constructor that takes in the starting points
	constructor(points){
		this.points = points;
		this.history = [];
	}
	//setter for the points variable
	set points(val){
		if(typeof val !== 'object'){
			this.points += val;
			this.history.push([this.points,Date.now()]);
		}else{
			this.points -= val.points;
			this.history.push(this.points,Date.now());
		}
	}
	//getter for the points variable
	get points(){
		this.history.push([this.points,-Date.now()]);
		return this.points;
	}
}
