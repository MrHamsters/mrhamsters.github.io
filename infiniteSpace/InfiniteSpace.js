void setup(){
  size(1000,700);
  frameRate(60);  
}
var tick=0;
window.addEventListener("gamepadconnected", function(e) {
  var gp = navigator.getGamepads()[e.gamepad.index];
  console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
    gp.index, gp.id,
    gp.buttons.length, gp.axes.length);
});
window.onkeydown=function(e){
    var code = e.keyCode ? e.keyCode : e.which;
	if(code==87){
		rawkeys.w=1;
	}
	else if(code==65){
		rawkeys.a=1;
	}
	else if(code==83){
		rawkeys.s=1;
	}
	else if(code==68){
		rawkeys.d=1;
	}
	else if(code==86){
		rawkeys.v=1;
	}
	else if(code==66){
		rawkeys.b=1;
	}
	else if(code==78){
		rawkeys.n=1;
	}
	else if(code==77){
		rawkeys.m=1;
	}
}
window.onkeyup=function(e){
    var code = e.keyCode ? e.keyCode : e.which;
	if(code==87){
		rawkeys.w=0;
	}
	else if(code==65){
		rawkeys.a=0;
	}
	else if(code==83){
		rawkeys.s=0;
	}
	else if(code==68){
		rawkeys.d=0;
	}
	else if(code==86){
		rawkeys.v=0;
	}
	else if(code==66){
		rawkeys.b=0;
	}
	else if(code==78){
		rawkeys.n=0;
	}
	else if(code==77){
		rawkeys.m=0;
	}
}
var rawkeys={
	w:0,
	a:0,
	s:0,
	d:0,
	v:0,
	b:0,
	n:0,
	m:0
};
var fps={
	fps:0,
	second:0,
	lastsecond:0,
	fpscount:0
};
var options={
	graphics:1,
	stars:1,
	music:0.7,
	sfx:1
};
var controlmode=0;
var ingame=0;
var player={
	hp:100,
	mhp:100,
	shielding:0,
	shield:30,
	mshield:30,
	shieldregen:5,
	shielddecay:5,
	shielddraw:function(){
		ellipseMode(CENTER);
		fill(100,100,255,120);
		ellipse(400,400,50+abs(tick%10-5),75+abs*((tick+5)%10-5)*1.5);
		ellipse(player.x,player.y,100,100);
	},
	x:500,
	y:600,
	speed:5,
	staticspeed:15,
	size:30,
	movedir:0,
	sprite:loadShape('Data/Graphics/ships/astrohawk.svg')
};
var input={
	up:0,
	left:0,
	down:0,
	right:0,
	shield:0,
};
var particles=new Array();
var dirgeneric=function(x1,y1,x2,y2){
	if(x1-x2<0){
		return(atan((y1-y2)/(x1-x2))+PI/2);
	}
	else{
		return(atan((y1-y2)/(x1-x2))-PI/2);
	}
}
var mapwasd=function(){
	if(rawkeys.w){
		if(rawkeys.a){
			return(7*PI/4);
		}
		else if(rawkeys.d){
			return(PI/4);
		}
		else{
			return(0);
		}
	}
	else if(rawkeys.d){
		if(rawkeys.s){
			return(3*PI/4);
		}
		else{
			return(PI/2);
		}
	}
	else if(rawkeys.s){
		if(rawkeys.a){
			return(5*PI/4);
		}
		else{
			return(PI);
		}
	}
	else if(rawkeys.a){
		return(3*PI/2);
	}
}
var ctrdir=function(){
	if(navigator.getGamepads()[0].axes[1]>0){
		return(PI+atan(navigator.getGamepads()[0].axes[0]/(-navigator.getGamepads()[0].axes[1])));
	}
	else{
		return(atan(navigator.getGamepads()[0].axes[0]/(-navigator.getGamepads()[0].axes[1])));
	}
}
var ctrmov=function(){
	if(navigator.getGamepads()[0].axes[0]==-1||navigator.getGamepads()[0].axes[1]==-1||navigator.getGamepads()[0].axes[0]+navigator.getGamepads()[0].axes[1]>0.01||navigator.getGamepads()[0].axes[0]+navigator.getGamepads()[0].axes[1]<-0.01){
		if(abs(navigator.getGamepads()[0].axes[0])>abs(navigator.getGamepads()[0].axes[1])){
			return(abs(navigator.getGamepads()[0].axes[0]));
		}
		return(abs(navigator.getGamepads()[0].axes[1]));
	}
	return(0);
}
var getmovedir=function(){
	if(controlmode==0){
		return({dir:dirgeneric(player.x,player.y,mouseX,mouseY),scl:min(1,pow(pow(player.x-mouseX,2)+pow(player.y-mouseY,2),0.5)/50)});
	}
	else if(controlmode==1){
		if(rawkeys.w||rawkeys.a||rawkeys.s||rawkeys.d){
			return({dir:mapwasd(),scl:1});
		}
	}
	else if(controlmode==2){
		return({dir:ctrdir(),scl:ctrmov()});
	}
	return({dir:0,scl:0});
}
var moveinf;
var domove=function(){
	if(player.shielding){
		moveinf={dir:0,scl:0};
	}
	else{
		moveinf=getmovedir();
		player.movedir;
		player.x=min(900,max(100,player.x+sin(moveinf.dir)*moveinf.scl*max(player.staticspeed,player.speed)));
		player.y=min(700,max(100,player.y-cos(moveinf.dir)*moveinf.scl*max(player.staticspeed,player.speed)));
	}
}
var doshield=function(){
	player.shielding=0;
	if(player.shield>0){
		if(controlmode==0){
			if(mousePressed){
				if(mouseButton==RIGHT){
					player.shielding=1;
				}
			}
		}
		else if(controlmode==1){
			if(rawkeys.n||rawkeys.m){
				player.shielding=1;
			}
		}
		else if(controlmode==2){
			if(rawkeys.n||rawkeys.m){
				player.shielding=1;
			}
		}
	}
}
var parallax=new Array();
var test=loadShape('Data/Graphics/ships/astrohawk.svg');
var findpspot=function(dis){
	for(b=0;b<parallax.length;b+=1){
		if(dis>=parallax[b].d){
			return(b);
		}
	}
	return(parallax.length);
}
var canstart=0;
var bgmn=0;
var bgm;
var loadassetscache=function(){
	textFont(0,60);
	fill(0,0,0,100);
	rect(0,0,1133,700);
	fill(255,150,0);
	text("Loading game assets",300,200);
	fill(0,0,0);
	rect(400,350,300,100);
	fill(255,150,0);
	text("0/3",500,370);
		loadassetscache=function(){
		textFont(0,60);
		fill(0,0,0,100);
		rect(0,0,1133,700);
		fill(255,150,0);
		text("Loading game assets",300,200);
		fill(0,0,0);
		rect(400,350,300,100);
		fill(255,150,0);
		text("0/3",500,370);
		bgmn="start";
		bgm = new Howl({
		src: 'Data/Sound/bgm/Mysterious.mp3',
		autoplay: true,
		loop: true,
		volume: options.music,
		});
		fill(0,0,0);
		rect(400,350,300,100);
		fill(255,150,0);
		text("1/3",500,370);
		sprites={
		};
		fill(0,0,0);
		rect(400,350,300,100);
		fill(255,150,0);
		text("2/3",500,370);
		if(options.loadAudio){
		sfx={
			laser:new Howl({src: ['Data/Sound/sfx/laser.ogg'],autoplay:false,loop:false,volume:options.sfx}),
			destroy:new Howl({src: ['Data/Sound/sfx/destroy.ogg'],autoplay:false,loop:false,volume:options.sfx}),
		};
		}
		loadassetscache=0;
		canstart=1;
	}
}
var engineparticles=0;
var createstar=function(y){
		if(random(1)<0.3){
			//oddstar
			addstar(y,random(105)+min(1,round(random(2)))*150,random(105)+min(1,round(random(2)))*150,random(105)+min(1,round(random(2)))*150,random(50,200),random(10,50));
		}
		else if(random(1)<0.3){
			//white dwarf
			addstar(y,random(220,255),random(220,255),random(220,255),random(220,255),random(7,10));
		}
		else if(random(1)<0.35){
			//blue star
			addstar(y,random(110,140),random(110,140),random(200,255),random(90,180),random(9,30));
		}
		else if(random(1)<0.65){
			//yellow star
			addstar(y,random(160,255),random(160,255),random(10,20),random(120,200),random(25,90));
		}
		else if(random(1)<0.7){
			//red giant
			addstar(y,random(200,255),random(20,90),random(10,20),random(120,200),random(70,200));
		}
		else{
			//dark matter kappa
			addstar(y,0,0,0,random(10,20),random(30,250));
		}
};
var addstar=function(y,r,g,b,o,size){
	var dis=random(2,15);
	parallax.splice(findpspot(dis),0,{
		x:random(50,950),
		y:y,
		size:size,
		c:{r:r,g:g,b:b},
		o:o,
		d:dis
	});
};
var runpara=function(){
	for(a=0;a<parallax.length;a+=1){
		//fill(parallax[a].c.r,parallax[a].c.g,parallax[a].c.b,parallax[a].o);
		//ellipse(parallax[a].x,parallax[a].y,parallax[a].size/parallax[a].d,parallax[a].size/parallax[a].d);
		if(render){
			if(options.graphics){
				fill(parallax[a].c.r/2,parallax[a].c.g/2,parallax[a].c.b/2,parallax[a].d*parallax[a].o/10);
				for(b=0;b<60/parallax[a].d;b+=1){
					ellipse(parallax[a].x,parallax[a].y,(parallax[a].size*b/30),(parallax[a].size*b/30));
				}
			}
			else{
				fill(parallax[a].c.r/2,parallax[a].c.g/2,parallax[a].c.b/2,parallax[a].o);
				ellipse(parallax[a].x,parallax[a].y,(parallax[a].size*2),(parallax[a].size*2));
			}
		}
		parallax[a].y+=3/parallax[a].d;
		if(parallax[a].y>800){
			parallax.splice(a,1);
			a-=1;
		}
	}
};
for(a=0;a<500;a+=1){
	createstar(a*8-100);
};
var drawcount=0;
var drawcap=8;
var cdraw=0;
var render=1;
var ms=0;
var mslast=0;
void draw(){
cdraw=0;
fps.count+=1;
fps.second=second();
if(!(fps.second==fps.lastsecond)){
	fps.fps=fps.count;
	fps.lastsecond=fps.second;
	fps.count=0;
}
ms=millis();
drawcount+=(ms-mslast);
mslast=ms;
if(drawcount>166){
	drawcount=16.6;
	console.log("Resetting ticks - too much lag");
}
//Actual game loop
while(drawcount>=16.6&cdraw<=drawcap){
	drawcount-=16.6;
	cdraw+=1;
	if(drawcount<16.6){
		render=1;
	}
	else{
		render=0;
	}
	noStroke();
	tick+=1;
	fill(15,10,40);
	rect(0,0,1000,700);
	if(options.stars){
		if(tick%4==0){
			createstar(-100);
		}
		ellipseMode(CENTER);
		runpara();
	}
	//Run player stuff
	domove();
	if(render){
		shape(player.sprite,player.x,player.y,450,600);
	}
	engineparticles+=0.2+moveinf.scl*1.8;
	doshield();
	if(player.shielding){
		player.shield-=player.shielddecay/60;
		if(render){
			player.shielddraw();
		}
	}
	else{
		player.shield=min(player.mshield,player.shield+player.shieldregen/60);
	}
	while(engineparticles>0){
		engineparticles-=1;
		append(particles,{x:player.x,y:player.y+player.size,xvelo:random(-1,1)-sin(moveinf.dir)*moveinf.scl*max(player.staticspeed,player.speed),yvelo:random(-1,3)+cos(moveinf.dir)*moveinf.scl*max(player.staticspeed,player.speed),
		size:random(3,5),op:random(120,180),opc:-4,exp:1,color:[random(180,220),random(180,220),random(100,120)]});
	}
	if(ingame==0){
		if(mousePressed){
			controlmode=0;
		}
		if(key){
			if(keyPressed&(key.code==86||key.code==118)){
				controlmode=1;
			}
		}
		if(navigator.getGamepads()[0]){
			if(navigator.getGamepads()[0].buttons[0].value>0||navigator.getGamepads()[0].buttons[1].value>0){
				controlmode=2;
			}
		}
		textFont(0,55);
		fill(150,150,50+abs(tick%240-120));
		text("Infinite Space",350,55);
		textFont(0,23);
		fill(200,200,100);
		text("Control Mode",400,150);
		textFont(0,20);
		if(controlmode==0){
			fill(255,255,255);
		}
		else{
			fill(80,80,80);
		}
		text("Keyboard and Mouse (click anywhere to select)",300,180);
		if(controlmode==1){
			fill(255,255,255);
		}
		else{
			fill(80,80,80);
		}
		text("Keyboard Only (press V to select)",300,210);
		if(controlmode==2){
			fill(255,255,255);
		}
		else{
			fill(80,80,80);
		}
		text("Game Controller (press A or B to select)",300,240);
		fill(255,255,255);
		textFont(0,20);
		if(controlmode==0){
			text("Mouse to move",300,340);
			text("Left click to shoot",300,370);
			text("Right click to shield",300,400);
			text("Space to use special",300,430);
		}
		else if(controlmode==1){
			text("W,A,S,D to move",300,340);
			text("V to shoot",300,370);
			text("N or M to shield",300,400);
			text("B to use special",300,430);
		}
		else if(controlmode==2){
			text("D-Pad to move",300,340);
			text("B to shoot",300,370);
			text("Left or Right Trigger to shield",300,400);
			text("A to use special",300,430);
		}
	}
	//INGAME
	else{
	}
	//PANELS
		fill(80,70,20);
		rect(0,0,100,700);
		rect(900,0,100,700);
		fill(210+abs(tick%180-90)/2,abs(tick%180-90)/2,abs(tick%180-90)/2);
		rect(915,600-(player.hp/player.mhp)*500,50,(player.hp/player.mhp)*500);
		fill(abs(tick%120-50),abs(tick%120-60),130+abs(tick%120-60),150+(player.shield/player.mshield)*50);
		if(player.shielding){
			rect(940,600-(player.shield/player.mshield)*500,45,(player.shield/player.mshield)*500);
		}
		else{
			rect(955,600-(player.shield/player.mshield)*500,30,(player.shield/player.mshield)*500);
		}
		textFont(0,15);
		fill(255,100,150);
		text('FPS: '+fps.fps,940,680);
	//Particles
	ellipseMode(CENTER);
	for(a=0;a<particles.length;a+=1){
		if(render){
			fill(particles[a].color[0],particles[a].color[1],particles[a].color[2],particles[a].op);
			ellipse(particles[a].x,particles[a].y,particles[a].size,particles[a].size);
		}
		if(particles[a].sizec){
			particles[a].size+=particles[a].sizec;
		}
		if(particles[a].opc){
			particles[a].op+=particles[a].opc;
		}
		if(particles[a].xvelo){
			particles[a].x+=particles[a].xvelo;
		}
		if(particles[a].yvelo){
			particles[a].y+=particles[a].yvelo;
		}
		if(particles[a].xacc){
			particles[a].xvelo+=particles[a].xacc;
		}
		if(particles[a].yacc){
			particles[a].yvelo+=particles[a].yacc;
		}
		if(particles[a].exp==1){
			if(particles[a].op<=0){
				particles.splice(a,1);
				a-=1;
			}
		}
		else{
			particles[a].dur-=1;
			if(!(particles[a].dur>0)){
				particles.splice(a,1);
				a-=1;
			}
		}
	}
	if(loadassetscache){
		loadassetscache();
	}
}
}
