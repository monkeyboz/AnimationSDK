import {Design} from  './design.js'

export class Gui{
	//gui constructor
	constructor(){
		//create a dynamic canvas element
		this.canvas = document.createElement("canvas");
		this.ctx = this.canvas.getContext("2d");
		this.body = document.getElementsByTagName("body")[0];
		this.body.appendChild(this.canvas);
		this.bb =[]; //bounding box array

		this.animation = new Animation();

		//add touch/click listeners
		this.addListeners();
		this.touches = [];
		this.design = new Design(this.canvas,this.ctx);
		this.stored = {};
		this.update = 0;

		this.currScreen = "load";
		var imgurl = "images/test.jpg";

		var display_button = {display:"box",img:imgurl,x:10,y:10,w:300,h:300,interact:true,screen:"load",animate:"animateIn",fillStyle:"#000"};
		var grid1 = [];
		for(var i = 0; i < 3; ++i){
			var db = {...display_button};
			db.x =  (db.w+10)*i;
			db.img = imgurl+i
			grid1.push(db);
		}
		grid1 = grid1.map((obj,i)=>({
			...obj,
			x:(obj.w+10)*i
		}));
		this.screens = {home:grid1,
			load:[{display:"box",x:this.canvas.width/2,y:this.canvas.height/2,w:300,h:100,interact:true,screen:"home"}],
			settings:grid1,
			play:grid1,
			build:this.setupBuild()
		};
		this.layouts = [];;
		this.calls = 0;
		this.resize();
		this.getInfo("./info/screens.info",this.setupScreenObjs);
		this.getInfo("./info/layouts.info",this.setupScreenObjs);
		window.addEventListener("resize",()=>this.resize());
	}
	getInfo(url,callback){
		var index = this.calls;
		++this.calls;
		fetch(url)
			.then((response)=>{
				if(!response.ok){
					alert("fail");
				}
				return response.text();
			})
			.then((text)=>{
				this.layouts[index] = callback(text);
				if(this.layouts.length == this.calls){
					this.setupScreens();
				}
			})
			.catch(error=>{ alert(error) })
	}
	setupLayouts(){
		this.layouts = {};
		for(var i in this.layouts[1]){
			
		}
	}
	setupScreens(){
		for(var i in this.layouts[0]){
			
		}
	}
	setupScreenObjs(text){
		var text = text.split(/\n/);
		var objs = {};
		var curr = "";
		for(var i in text){
			if(text[i].search(/\t/) == -1){
				var setup = text[i].split('_');
				if(setup[0] != ''){
					var index = setup[0];
					objs[index] = {design:null};
					setup.shift();
					objs[index].design = setup;
					curr = index;
				}
			}else{
				text[i] = text[i].replace(/\t/,'').split(":");
				objs[curr][text[i][0]] = text[i][1];
			}
		}
		return objs;
	}
	select(){
		var curr = this.screens[this.currScreen];
		this.bb = [];
		for(var i in curr){
			if("interact" in curr[i]) this.bb.push(curr[i]);
		}
		return curr;
	}
	//render everything on the screen
	render(){
		this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
		this.renderItems(this.select());
		requestAnimationFrame(()=>this.render());
	}
	setBounding(bb){ this.bb = bb; }
	//setup building array
	setupBuild(){
		var build = [];
		return build;
	}
	//render gui items
	renderItems(items){
		this.ctx.fillStyle = "#00ff00";
		for(var i in items){
			switch(items[i].display){
				case "image":
					if(items[i].img in this.stored){
						this.design.render([this.stored[items[i].img],items[i].x,items[i].y,items[i].w,items[i].h],"drawImage");
					}else{
						var img = new Image();
						img.onload = (i)=>{
							this.stored[items[img.index].img] = img;
							if(items.length == 3) this.render();
						};
						img.onprogress = (e)=>{
							console.log(e.loaded/e.total);
						};
						img.index = i;
						img.src = items[i].img;
						this.ctx.fillText("loading...",items[i].x+(items[i].w/2),items[i].y+(items[i].h/2));
					}
					break;
				case "box":
				default:
					this.design.render([items[i].x,items[i].y,items[i].w,items[i].h],"fillRect",{"fillStyle":items[i].fillStyle});
					break;
			}
		}
	}
	//read the gui items
	readItems(items){
		//this.bb = items;
		for(var i in items){
			if(items[i].display == "image"){
				items[i].loaded = false;
				var img = new Image();
				img.onload =((i)=>{
					items[i].img = img;
					items[i].oWidth = img.width;
					items[i].oHeight = img.height;
					items[i].loaded = true;
				});
			}
		}
	}
	//resize canvas
	resize(){
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
		this.render();
	}
	//add action listeners
	addListeners(){
		console.log("listener started");
		this.canvas.addEventListener("touchstart",(event)=>this.readInput(event));
		this.canvas.addEventListener("click",(event)=>{this.readInput(event)});
	}
	//read action
	readInput(event){
		this.touches = event.changedTouches;
		for(let i in this.touches){
			if(this.touches[i].clientX != undefined)
			this.boundingBoxTest(this.touches[i].clientX,this.touches[i].clientY);
		}
	}
	//test bounding box
	boundingBoxTest(x,y){
		for(var i in this.bb){
			if(x > this.bb[i].x && x < this.bb[i].x+this.bb[i].w){
				if(y > this.bb[i].y && y < this.bb[i].y+this.bb[i].h){
					var [x,y] = [this.bb[i].x+this.bb[i].width/2,this.bb[i].y+this.bb[i].height/2]
					this.ctx.fillStyle = "#ff0000";
					this.design.render([x-7,y-7,15,15],"fillRect");
					if("interact" in this.bb[i] && this.bb[i].interact) this.currScreen = this.bb[i].screen;
				}
			}
		}
	}
}
