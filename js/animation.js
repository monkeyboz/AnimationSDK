export class Animation{
	//constructor for the anInation class
	constructor(x,y,width,height,animation){
		[this.x,this.y.this.width,this.height] = [x,y,width,height];
		this.animation = animation;
		this.currPos = [0,0,0,0];
		this.finalPos = [0,0,0,0];
		this.animationTypes = {easeIn:"origin+change",
					easeOut:"change+origin",
					bounceIn:"easeIn+origin"};
	}
	//setup animation steps
	setAnimationSteps(animation){
		this[animation.type](animation.properies);
	}
	//call animation to be animated
	animate(animation){
		this[animation](params);
	}
	//ease animation
	easeAnimation(params){
		var result = [];
		//switch for animation selection
		switch(params.ease){
			case 'in':
				result = this.easeIn(params.options);
				break;
			case 'out':
				result = this.easeOut(params.options);
				break;
			case 'bounceOut':
				result = this.bounceOut(params.options);
				break;
			case 'bounceIn':
				result = this.bounceIn(params.options);
				break;
		}
		return result;
	}
	//ease in animation
	easeIn(x,y,dx,dy,steps){
		var result = [];
		for(var i = steps;i > 1;--i){
			result.push(this.calcEase(x,y,dx,dy,i));
		}
		return result;
	}
	//ease put animation
	easeOut(x,y,dx,dy,steps){
		var result = [];
		for(var i = 1;i < steps;++i){
			result.push(this.calcEase(x,y,dx,dy,i));
		}
		return result;
	}
	calcEase(x,y,dx,dy,i){
		return {x:((dx-x)/i)+x,y:((dy-y)/i)+y};
	}
	//bounce in animation
	bounceIn(x,y,dx,dy,steps){
		var result = [];
		for(var i = 1;i < steps;++i){
			result.push({x:0,y:0});
		}
		return result;
	}
	//move animation
	move(params){
		x = params.x;
		y = params.y;
		return this.linear(x,y);
	}
	//linear movemwnt
	linear(x,y){
		var difference = {x:this.x-params.x,y:this.y-params.y};
		var result = [];
		for(var i=0;i<Math.abs(difference.x);++i){
			x += difference.x;
			y += difference.y;
			result.push([x,y]);
		}
		return result;
	}
	//rotate animation
	rotate(params){
		return params;
	}
	//curve creation for the animations
	curveCreation(peak,distance){
		var half =[];
		var a = 1;
		var r = peak;
		var x = distance;
		for(var i = 0;i < distance;++i){
			half[i] = r-((x*i)/(r/distance-r))*r;
		}
		var flah = rsort(half);
		return merge(flah,half);
	}
}
