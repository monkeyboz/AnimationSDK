import {Animation} from "./animation.js";

export class Design{
	constructor(canvas,ctx){
		this.ctx = ctx;
		this.canvas = canvas;
		this.animate = null;
	}
	buildObject(objStr,options=null){
		if(typeof objStr === "string") objStr = objStr.split("_");
		var obj = {};
		if(objStr[1].search("grid") != -1){
			obj = [];
			var size = objStr[1].substr(4);
			var gridW = (this.canvas.width+10)/size;
			for(var i = 0; i < size;++i){
				var (info,process) = options[i].split(':');
				var grid =  {display:"box",x:i*gridW,y:10,w:gridW-5,h:300,interact:true,screen:process,animate:"animateIn",fillStyle:"#000"};
				obj.push(grid);
			}
		}
		return obj;
	}
	animate(){
		this.animation = new Animation();
	}
	//create a box object
	render(dimensions,renderType,options){
		for(var i in options){
			this.ctx[i] = options[i];
			console.log(i);
		}
		this.ctx[renderType](...dimensions);
	}
	//send our a canvas image to a data url
	image(ctx,w=0,h=0){
		return ctx.toDataURL(0,0,w,h);
	}
	//store and save an object using the canvas
	store(dimensions){
		var img = Image();
		img.onload = function(){
			this.save(img);
		}
		img.src = this.canvas.toDataURL(dimensions);
	}
	//batch create using an objects array
	batchCreate(objects){
		for(var i in objects){
			switch(i){
				case 'box':
					var obj = objects[i];
					this.render([obj.x,pbj.y,obj.w,obj.h],"fillRect");
					break;
				case 'arc':
					var obj = objects[i];
					this.render([obj.x,obj.y,obj.r,obj.a],"fillArc");
					break;
			}
		}
	}
	//create a temporary canvas to use later
	createTmpCanvas(w,h){
		var canvas = document.createElement('canvas');
		var ctx = canvas.getContext('2d');
		canvas.width = w;
		canvas.height = h;
		return {ctx:ctx,canvas:canvas};
	}
}
