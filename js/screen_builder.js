import {} from ;
export class ScreenBuilder{
	constructor(stored = []){
		this.drawing = false;
		this.building = false;
		this.save = false;
		this.stored = [];
		this.load();
	}
	set drawing(action){
		this.drawing = action;
		this.drawingActivated();
	}
	set building(action){
		this.building = action;
		this.buildingActivated();
	}
	set save(action){
		this.save = action;
		this.saveActivated();
	}
	load(store){
		this.stored = store;
	}
	drawingActivated(){
		
	}
	buildingActivated(){
		
	}
	saveActivated(){
		return stored;
	}
}
