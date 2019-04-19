var version="DEMO 0.1";
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
	else if(code==32){
		rawkeys.space=1;
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
	else if(code==32){
		rawkeys.space=0;
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
	m:0,
	space:0
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
	fancystars:0,
	music:0.7,
	sfx:0.7
};
var enemies=new Array();
var projectiles=new Array();
var controlmode=0;
var ingame=0;
var menumode=0;
var shoot=[
	function(){
		player.shootcd=10;
		if(player.ammo>9){
			player.ammo-=9;
			for(b=0;b<2;b+=1){
				append(projectiles,{
					target:1,
					draw:function(){
						ellipseMode(CENTER);
						fill(255,230,100);
						ellipse(projectiles[a].x,projectiles[a].y,8,14);
						if(options.graphics){
							fill(255,190,140,10);
							for(b=0;b<10;b+=1){
								ellipse(projectiles[a].x,projectiles[a].y,8+b*2,14+b*4);
							}
						}
					},
					x:player.x-10+b*20,
					y:player.y,
					end:1,
					pierce:0,
					dir:0,
					speed:11,
					size:9,
					damage:10
				});
			}
			sfx.minigun.rate(random(0.9,1.1));
			sfx.minigun.play();
		}
		else{
			sfx.click.rate(random(0.9,1.1));
			sfx.click.play();
		}
	},
];
var special=[
	function(){
		player.shootcd=5;
		player.specialcd=15;
		if(player.energy>=1){
			player.shootcd=20;
			player.specialcd=60;
			player.energy-=1;
			append(projectiles,{
				target:1,
				draw:function(){
					ellipseMode(CENTER);
					noFill();
					strokeWeight(6);
					stroke(180,70,180,min(5,projectiles[a].dur)*30);
					for(b=0;b<11-projectiles[a].dur/3;b+=1){
						ellipse(projectiles[a].x,projectiles[a].y,20+20*b,20+20*b);
					}
					noStroke();
				},
				run:function(){
					projectiles[a].size+=3;
					for(b=0;b<projectiles.length;b+=1){
						if(projectiles[b].target==0&!(projectiles[b].reflected)){
							if(pow(projectiles[b].x-projectiles[a].x,2)+pow(projectiles[b].y-projectiles[a].y,2)<pow(45+projectiles[a].size+projectiles[b].size,2)){
								projectiles[b].speed*=2;
								projectiles[b].damage*=1.5;
								projectiles[b].dir+=PI;
								projectiles[b].reflected=1;
								projectiles[b].target=1;
							}
						}
					}
				},
				x:player.x,
				y:player.y,
				end:0,
				pierce:9999,
				dur:30,
				dir:0,
				speed:4,
				size:5,
				damage:50
			});
			sfx.hawk.rate(random(0.9,1.1));
			sfx.hawk.play();
		}
		else{
			sfx.click.rate(random(0.9,1.1));
			sfx.click.play();
		}
	},
];
var shielddraw=[
	function(){
		ellipseMode(CENTER);
		fill(100,100,215+abs(tick%40-20)*2,110+abs(tick%60-30));
		ellipse(400,400,50+abs(tick%10-5),75+abs*((tick+5)%10-5)*1.5);
		ellipse(player.x,player.y,86+(abs(tick%12-6)-3)*min(20,player.shieldboing)/3,100+(abs((tick+6)%12-6)-3)*min(20,player.shieldboing)/3);
	},
];
var playerdraw=[
	function(){
		shape(sprites.astrohawk,player.x,player.y,450,600);
	},
];
var applyshipstats=[
	function(){
		player.shipId=0;
		player.shipName="Astro Hawk";
		player.hp=100;
		player.mhp=100;
		player.shield=30;
		player.mshield=30;
		player.shieldregen=5;
		player.shielddecay=8;
		player.speed=7;
		player.ammor=25;
		player.size=20;
	},
];
var player={
	hpl:0,
	shielding:0,
	shieldboing:0,
	x:500,
	y:600,
	staticspeed:15,
	stun:0,
	ammo:100,
	energy:10,
	energybits:0,
	shootcd:0,
	specialcd:0,
	movedir:0,
	score:0,
	deathtimer:0,
	mods:new Array(99),
	modc:3
};
player.mods[0]=1;
player.mods[1]=1;
player.mods[2]=1;
var spawnplayer=function(){
	player.hpl=0;
	player.shielding=0;
	player.shieldboing=0;
	player.x=500;
	player.y=600;
	player.staticspeed=15;
	player.stun=0;
	player.ammo=100;
	player.energy=10;
	player.energybits=0;
	player.shootcd=0;
	player.specialcd=0;
	player.movedir=0;
	player.score=0;
	player.deathtimer=0;
}
applyshipstats[0]();
var input={
	shoot:0,
	special:0
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
var temp;
var domove=function(){
	if(player.shielding){
		moveinf={dir:0,scl:0};
	}
	else{
		moveinf=getmovedir();
		player.movedir;
		player.x=min(900,max(100,player.x+sin(moveinf.dir)*moveinf.scl*max(player.staticspeed,player.speed)));
		player.y=min(700,max(25,player.y-cos(moveinf.dir)*moveinf.scl*max(player.staticspeed,player.speed)));
	}
}
var doshield=function(){
	if(player.shield<=0){
		player.stun=15;
	}
	temp=player.shielding;
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
			if(navigator.getGamepads()[0].buttons[8].value||navigator.getGamepads()[0].buttons[9].value){
				player.shielding=1;
			}
		}
	}
	if(temp&!(player.shielding)){
		sfx.shieldoff.rate(random(0.9,1.1));
		sfx.shieldoff.play();
	}
	else if(!(temp)&player.shielding){
		sfx.shieldon.rate(random(0.9,1.1));
		sfx.shieldon.play();
	}
}
var doinputs=function(){
	input={
		shoot:0,
		special:0
	};
	if(controlmode==0){
		if(mousePressed){
			if(mouseButton==LEFT){
				input.shoot=1;
			}
		}
		if(rawkeys.space){
			input.special=1;
		}
	}
	else if(controlmode==1){
		if(rawkeys.v){
			input.shoot=1;
		}
		if(rawkeys.b){
			input.special=1;
		}
	}
	else if(controlmode==2){
		if(navigator.getGamepads()[0].buttons[1].value){
			input.shoot=1;
		}
		if(navigator.getGamepads()[0].buttons[0].value){
			input.special=1;
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
var sprites={astrohawk:loadShape('Data/Graphics/ships/astrohawk.svg')};
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
			volume: options.music*0.6,
		});
		fill(0,0,0);
		rect(400,350,300,100);
		fill(255,150,0);
		text("1/3",500,370);
		sprites={
			astrohawk:loadShape('Data/Graphics/ships/astrohawk.svg'),
		};
		fill(0,0,0);
		rect(400,350,300,100);
		fill(255,150,0);
		text("2/3",500,370);
		sfx={
			laser:new Howl({src: ['Data/Sound/sfx/laser.ogg'],autoplay:false,loop:false,volume:options.sfx}),
			destroy:new Howl({src: ['Data/Sound/sfx/destroy.ogg'],autoplay:false,loop:false,volume:options.sfx*7}),
			minigun:new Howl({src: ['Data/Sound/sfx/minigun.wav'],autoplay:false,loop:false,volume:options.sfx*0.7}),
			boom:new Howl({src: ['Data/Sound/sfx/avalanche.ogg'],autoplay:false,loop:false,volume:options.sfx}),
			click:new Howl({src: ['Data/Sound/sfx/click.wav'],autoplay:false,loop:false,volume:options.sfx*0.7}),
			shieldon:new Howl({src: ['Data/Sound/sfx/shield.wav'],autoplay:false,loop:false,volume:options.sfx}),
			shieldoff:new Howl({src: ['Data/Sound/sfx/shieldoff.wav'],autoplay:false,loop:false,volume:options.sfx}),
			shieldbreak:new Howl({src: ['Data/Sound/sfx/shieldbreak.wav'],autoplay:false,loop:false,volume:options.sfx}),
			block:new Howl({src: ['Data/Sound/sfx/block.wav'],autoplay:false,loop:false,volume:options.sfx}),
			hawk:new Howl({src: ['Data/Sound/sfx/hawk.ogg'],autoplay:false,loop:false,volume:options.sfx}),
			hull:new Howl({src: ['Data/Sound/sfx/armorpartial.ogg'],autoplay:false,loop:false,volume:options.sfx*2}),
			hit:new Howl({src: ['Data/Sound/sfx/arrow hit.wav'],autoplay:false,loop:false,volume:options.sfx*2}),
		};
		loadassetscache=0;
		canstart=1;
	}
}
var choosebgm=function(id){
	temp=max(0,round(random(setbgm.length)-0.51));
	while(temp==id){
		temp=max(0,round(random(setbgm.length)-0.51));
	}
	return(temp);
}
var setbgm=[
	function(){
		bgm.stop();
		bgmn="sky fortress";
		bgm = new Howl({
			src: 'Data/Sound/bgm/SkyFortress.mp3',
			autoplay: true,
			loop: false,
			volume: options.music*0.9,
			onend:function(){setbgm[choosebgm(0)]();}
		});
	},
	function(){
		bgm.stop();
		bgmn="magnetic tree";
		bgm = new Howl({
			src: 'Data/Sound/bgm/Lifeformed The Magnetic Tree.mp3',
			autoplay: true,
			loop: false,
			volume: options.music*1.1,
			onend:function(){setbgm[choosebgm(1)]();}
		});
	}
];
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
			if(options.fancystars){
				fill(parallax[a].c.r/2,parallax[a].c.g/2,parallax[a].c.b/2,parallax[a].d*parallax[a].o/10);
				for(b=0;b<60/parallax[a].d;b+=1){
					ellipse(parallax[a].x,parallax[a].y,(parallax[a].size*b/30),(parallax[a].size*b/30));
				}
			}
			else{
				fill(parallax[a].c.r/2,parallax[a].c.g/2,parallax[a].c.b/2,parallax[a].o);
				ellipse(parallax[a].x,parallax[a].y,(parallax[a].size*2)/parallax[a].d,(parallax[a].size*2)/parallax[a].d);
			}
		}
		parallax[a].y+=1/parallax[a].d;
		if(parallax[a].y>800){
			parallax.splice(a,1);
			a-=1;
		}
	}
};
for(a=0;a<500;a+=1){
	createstar(a*8-100);
};
var playerhitbox=function(x,y,size){
	if(x-player.x<size+player.size&x-player.x>-size-player.size&y-player.y<size+player.size&y-player.y>-size-player.size){
		return(true);
	}
	return(false);
}
var hitbox=function(x1,y1,x2,y2,size){
	if(x1-x2<size&x1-x2>-size&y1-y2<size&y1-y2>-size){
		return(true);
	}
	return(false);
}
var takedamage=function(dmg){
	if(player.shielding){
		if(dmg.dmg>player.shield){
			dmg.dmg-=player.shield;
			player.shieldboing+=player.shield;
			for(cp=0;cp<player.shield;cp+=1){
				append(particles,{x:player.x+random(-player.size,player.size),y:player.y+random(-player.size,player.size),xvelo:random(-3,3),yvelo:random(-3,3),
				size:random(8,11),op:random(120,180),opc:-7,exp:1,color:[random(70,120),random(70,120),random(200,255)]});
			}
			player.shield=0;
		}
		else{
			sfx.block.rate(random(0.9,1.1));
			sfx.block.play();
			player.shield-=dmg.dmg;
			player.shieldboing+=dmg.dmg;
			for(cp=0;cp<dmg.dmg;cp+=1){
				append(particles,{x:player.x+random(-player.size,player.size),y:player.y+random(-player.size,player.size),xvelo:random(-3,3),yvelo:random(-3,3),
				size:random(8,11),op:random(120,180),opc:-7,exp:1,color:[random(70,120),random(70,120),random(200,255)]});
			}
			dmg.dmg=0;
		}
	}
	if(dmg.dmg>0){
		sfx.hull.rate(random(0.9,1.1));
		sfx.hull.play();
		player.hp-=dmg.dmg;
		player.hpl+=dmg.dmg;
	}
}
var canhitenemy=function(){
	for(c=0;c<projectiles[a].hits.length;c+=1){
		if(projectiles[a].hits[c]==enemies[b].id){
			return(false);
		}
	}
	return(true);
}
var gametick=0;
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
		if(tick%12==0){
			createstar(-100);
		}
		ellipseMode(CENTER);
		runpara();
	}
	//Run projectiles
	for(a=0;a<projectiles.length;a+=1){
		if(render){
			projectiles[a].draw();
		}
		if(projectiles[a].run){
			projectiles[a].run();
		}
		projectiles[a].x+=sin(projectiles[a].dir)*projectiles[a].speed;
		projectiles[a].y-=cos(projectiles[a].dir)*projectiles[a].speed;
		if(projectiles[a].target){
			if(!(projectiles[a].hits)){
				projectiles[a].hits=new Array();
			}
			for(b=0;b<enemies.length;b+=1){
				if(!(projectiles[a].pierce<0)){
					if(projectiles[a].x-enemies[b].x<projectiles[a].size+enemies[b].size&projectiles[a].x-enemies[b].x>-projectiles[a].size-enemies[b].size&
					projectiles[a].y-enemies[b].y<projectiles[a].size+enemies[b].size&projectiles[a].y-enemies[b].y>-projectiles[a].size-enemies[b].size){
						if(canhitenemy()){
							projectiles[a].pierce-=1;
							append(projectiles[a].hits,enemies[b].id);
							enemies[b].hp-=projectiles[a].damage;
							sfx.hit.rate(random(0.8,1.2));
							sfx.hit.volume(min(1.5,projectiles[a].damage/20));
							sfx.hit.play();
							for(cp=0;cp<projectiles[a].damage/2;cp+=1){
								append(particles,{x:enemies[b].x+random(-enemies[b].size,enemies[b].size),y:enemies[b].y+random(-enemies[b].size,enemies[b].size),xvelo:random(-2,2),yvelo:random(-2,2),
								size:random(7,10),op:random(120,180),opc:-7,exp:1,color:[random(200,255),random(120,160),random(70,120)]});
							}
							if(projectiles[a].pierce<0){
								projectiles[a].exp=1;
							}
						}
					}
				}
			}
		}
		else{
			if(playerhitbox(projectiles[a].x,projectiles[a].y,projectiles[a].size)){
				takedamage({dmg:projectiles[a].damage});
				projectiles[a].exp=1;
			}
		}
		if(projectiles[a].end==1){
			if(projectiles[a].y<0){
				projectiles[a].exp=1;
			}
		}
		else if(projectiles[a].end==2){
			if(projectiles[a].y>700){
				projectiles[a].exp=1;
			}
		}
		else{
			projectiles[a].dur-=1;
			if(!(projectiles[a].dur>0)){
				projectiles[a].exp=1;
			}
		}
		if(projectiles[a].exp){
			projectiles.splice(a,1);
			a-=1;
		}
	}
	//Run enemies
	for(a=0;a<enemies.length;a+=1){
		if(render){
			enemies[a].draw();
		}
		if(enemies[a].run){
			enemies[a].run();
		}
		if(enemies[a].hp<=0){
			sfx.destroy.rate(random(0.85,1.15));
			sfx.destroy.play();
			if(!(player.respawntimer>10)){
				player.score+=enemies[a].score;
			}
			enemies[a].exp=1;
		}
		if(enemies[a].exp){
			enemies.splice(a,1);
			a-=1;
		}
	}
	//Run player stuff
	doinputs();
	if(player.hp<=0){
		if(player.deathtimer>60){
			if(input.shoot){
				spawnplayer();
				applyshipstats[player.shipId]();
				ingame=0;
				bgm.stop();
				bgmn="start";
				bgm = new Howl({
					src: 'Data/Sound/bgm/Mysterious.mp3',
					autoplay: true,
					loop: true,
					volume: options.music*0.6,
				});
				enemies=new Array();
				projectiles=new Array();
			}
		}
		else{
			player.deathtimer+=1;
			if(player.deathtimer==1){
				sfx.shieldbreak.rate(random(0.9,1.1));
				sfx.shieldbreak.play();
			}
			for(cp=0;cp<4;cp+=1){
				append(particles,{x:player.x+random(-player.size,player.size),y:player.y+random(-player.size,player.size),xvelo:random(-2,2),yvelo:random(-2,2),
				size:random(7,10),op:random(120,180),opc:-7,exp:1,color:[random(200,255),random(160,190),random(70,120)]});
			}
		}
	}
	else{
		if(render&tick>1){
			playerdraw[player.shipId]();
		}
		if(player.stun>0){
			player.stun-=1;
		}
		else{
			domove();
			engineparticles+=0.2+moveinf.scl*1.8;
			while(engineparticles>0){
				engineparticles-=1;
				append(particles,{x:player.x,y:player.y+player.size*1.5,xvelo:random(-1,1)-sin(moveinf.dir)*moveinf.scl*max(player.staticspeed,player.speed),yvelo:random(-1,3)+cos(moveinf.dir)*moveinf.scl*max(player.staticspeed,player.speed),
				size:random(3,5),op:random(120,180),opc:-4,exp:1,color:[random(180,220),random(180,220),random(100,120)]});
			}
			doshield();
			if(player.shielding){
				player.shield-=player.shielddecay/60;
				if(render){
					shielddraw[player.shipId]();
				}
			}
			else{
				if(input.special){
					if(player.specialcd<=0){
						special[player.shipId]();
					}
				}
				else if(input.shoot){
					if(player.shootcd<=0){
						shoot[player.shipId]();
					}
				}
			}
			if(player.shieldboing>0){
				player.shieldboing=max(0,player.shieldboing*0.95-0.05);
			}
			if(player.hpl>0){
				player.hpl=max(0,player.hpl*0.95-0.08);
			}
		}
		player.ammo=min(100,player.ammo+player.ammor/60);
		player.shield=min(player.mshield,player.shield+player.shieldregen/60);
		player.shootcd=max(0,player.shootcd-1);
		player.specialcd=max(0,player.specialcd-1);
	}
	if(ingame==0){
		if(menumode==0){
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
				text("Left stick to move",300,340);
				text("B to shoot",300,370);
				text("Left or Right Trigger to shield",300,400);
				text("A to use special",300,430);
			}
			text("Shoot while in one of these circles to use it",270,500);
			noFill();
			strokeWeight(20+abs(tick%120-60)/6);
			stroke(220,255,140+abs(tick%90-45));
			ellipseMode(CENTER);
			ellipse(750,300,100+abs(tick%120-60)/6,100+abs(tick%120-60)/6);
			ellipse(200,300,100+abs(tick%120-60)/6,100+abs(tick%120-60)/6);
			ellipse(200,600,100+abs(tick%120-60)/6,100+abs(tick%120-60)/6);
			noStroke();
			textFont(0,18);
			fill(255,255,200);
			text("Start",730,295);
			text("Game",725,315);
			text("Change",165,295);
			text("Ship",180,315);
			text("Ship",180,615);
			textFont(0,14);
			text("Customize",170,595);
			if(pow(pow(player.x-750,2)+pow(player.y-300,2),0.5)<75&input.shoot){
				setbgm[choosebgm(-1)]();
				spawnplayer();
				applyshipstats[player.shipId]();
				player.staticspeed=0;
				gametick=0;
				ingame=1;
			}
			if(pow(pow(player.x-200,2)+pow(player.y-300,2),0.5)<75&input.shoot){
				menumode=1;
				player.x=500;
				player.y=500;
			}
			if(pow(pow(player.x-200,2)+pow(player.y-600,2),0.5)<75&input.shoot){
				menumode=2;
				player.x=500;
				player.y=500;
			}
		}
		else if(menumode==1){
			noFill();
			strokeWeight(20+abs(tick%120-60)/6);
			stroke(220,255,140+abs(tick%90-45));
			ellipseMode(CENTER);
			ellipse(770,50,100+abs(tick%120-60)/6,100+abs(tick%120-60)/6);
			noStroke();
			
			textFont(0,25);
			fill(255,255,200);
			text("Back",740,55);
			if(pow(pow(player.x-770,2)+pow(player.y-50,2),0.5)<75&input.shoot){
				menumode=0;
				player.x=500;
				player.y=500;
			}
			
		}
		else if(menumode==2){
			noFill();
			strokeWeight(20+abs(tick%120-60)/6);
			stroke(220,255,140+abs(tick%90-45));
			ellipseMode(CENTER);
			ellipse(770,50,100+abs(tick%120-60)/6,100+abs(tick%120-60)/6);
			noStroke();
			
			textFont(0,25);
			fill(255,255,200);
			text("Back",740,55);
			if(pow(pow(player.x-770,2)+pow(player.y-50,2),0.5)<75&input.shoot){
				menumode=0;
				player.x=500;
				player.y=500;
			}
			
		}
	}
	//INGAME
	else{
		gametick+=1;
		if(player.deathtimer>=60){
			player.y=-999;
			fill(255,0,0);
			textFont(0,30);
			text("GAVE OVER",400,150);
			fill(255,100,0);
			textFont(0,25);
			text("Shoot to respawn",380,200);
		}
		//Currently playing
		if(!(player.deathtimer>10)){
			if(gametick%(round(70-min(15,max(0,gametick-6000)/360)))==0){
				if(random(1)<0.7-min(0.3,gametick/18000)){
					append(enemies,{
						name:"meteor",
						isTerrain:1,
						hp:40,
						mhp:40,
						size:15,
						x:random(100,900),
						y:-20,
						id:tick%6000,
						color:[random(40,80),random(20,60),random(0,40)],
						rockpos:[[random(-20,20),random(-20,20)],[random(-20,20),random(-20,20)],[random(-20,20),random(-20,20)],[random(-20,20),random(-20,20)]],
						draw:function(){
							ellipseMode(CENTER);
							fill(enemies[a].color[0],enemies[a].color[1],enemies[a].color[2]);
							ellipse(enemies[a].x,enemies[a].y,18,18);
							ellipse(enemies[a].x+enemies[a].rockpos[0][0],enemies[a].y+enemies[a].rockpos[0][1],15,15);
							ellipse(enemies[a].x+enemies[a].rockpos[1][0],enemies[a].y+enemies[a].rockpos[1][1],15,15);
							ellipse(enemies[a].x+enemies[a].rockpos[2][0],enemies[a].y+enemies[a].rockpos[2][1],15,15);
							ellipse(enemies[a].x+enemies[a].rockpos[3][0],enemies[a].y+enemies[a].rockpos[3][1],15,15);
						},
						run:function(){
							enemies[a].y+=2;
							if(playerhitbox(enemies[a].x,enemies[a].y,enemies[a].size)){
								enemies[a].exp=1;
								takedamage({dmg:10});
							}
							if(enemies[a].y>720){
								enemies[a].exp=1;
							}
						},
						exp:0,
						score:10
					});
				}
				else{
					append(enemies,{
						name:"meteor drone",
						hp:60,
						mhp:40,
						size:15,
						xvelo:random(-1,1),
						x:random(100,900),
						y:-20,
						id:tick%6000,
						ammo:0,
						color:[random(40,80),random(20,60),random(0,40)],
						rockpos:[[random(-20,20),random(-20,20)],[random(-20,20),random(-20,20)],[random(-20,20),random(-20,20)],[random(-20,20),random(-20,20)]],
						draw:function(){
							ellipseMode(CENTER);
							fill(enemies[a].color[0],enemies[a].color[1],enemies[a].color[2]);
							ellipse(enemies[a].x,enemies[a].y,22,22);
							ellipse(enemies[a].x+enemies[a].rockpos[0][0],enemies[a].y+enemies[a].rockpos[0][1],20,15);
							ellipse(enemies[a].x+enemies[a].rockpos[1][0],enemies[a].y+enemies[a].rockpos[1][1],15,20);
							ellipse(enemies[a].x+enemies[a].rockpos[2][0],enemies[a].y+enemies[a].rockpos[2][1],20,15);
							ellipse(enemies[a].x+enemies[a].rockpos[3][0],enemies[a].y+enemies[a].rockpos[3][1],15,20);
							fill(255,0,0,150+abs(tick%120-60)*2);
							ellipse(enemies[a].x,enemies[a].y,10,10);
						},
						run:function(){
							enemies[a].ammo+=1;
							if(enemies[a].ammo>90){
								if(random(1)<0.55){
									enemies[a].ammo-=90;
									append(projectiles,{
										target:0,
										draw:function(){
											ellipseMode(CENTER);
											fill(100,80,20);
											ellipse(projectiles[a].x,projectiles[a].y,18,18);
											if(options.graphics){
												fill(255,0,0,10);
												for(b=0;b<8;b+=1){
													ellipse(projectiles[a].x,projectiles[a].y,b*10,b*10);
												}
											}
										},
										x:enemies[a].x,
										y:enemies[a].y,
										end:2,
										pierce:0,
										dir:PI,
										speed:6,
										size:14,
										damage:10
									});
								}
								else if(random(1)<0.5){
									enemies[a].ammo-=150;
									append(projectiles,{
										target:0,
										draw:function(){
											ellipseMode(CENTER);
											fill(100,80,20);
											ellipse(projectiles[a].x,projectiles[a].y,18,18);
											if(options.graphics){
												fill(255,0,0,10);
												for(b=0;b<8;b+=1){
													ellipse(projectiles[a].x,projectiles[a].y,b*10,b*10);
												}
											}
										},
										x:enemies[a].x,
										y:enemies[a].y,
										end:2,
										pierce:0,
										dir:PI,
										speed:6,
										size:14,
										damage:9
									});
									append(projectiles,{
										target:0,
										timer:0,
										draw:function(){
											ellipseMode(CENTER);
											fill(100,80,20);
											ellipse(projectiles[a].x,projectiles[a].y,18,18);
											if(options.graphics){
												fill(255,0,0,10);
												for(b=0;b<8;b+=1){
													ellipse(projectiles[a].x,projectiles[a].y,b*10,b*10);
												}
											}
										},
										run:function(){
											projectiles[a].timer+=1;
											if(projectiles[a].timer<24){
												projectiles[a].speed+=0.25;
											}
										},
										x:enemies[a].x,
										y:enemies[a].y,
										end:2,
										pierce:0,
										dir:PI,
										speed:0,
										size:14,
										damage:9
									});
								}
								else{
									enemies[a].ammo-=180;
									for(b=0;b<3;b+=1){
										append(projectiles,{
											target:0,
											draw:function(){
												ellipseMode(CENTER);
												fill(100,80,20);
												ellipse(projectiles[a].x,projectiles[a].y,18,18);
												if(options.graphics){
													fill(255,0,0,10);
													for(b=0;b<8;b+=1){
														ellipse(projectiles[a].x,projectiles[a].y,b*10,b*10);
													}
												}
											},
											x:enemies[a].x,
											y:enemies[a].y,
											end:2,
											pierce:0,
											dir:PI-PI/8+b*PI/8,
											speed:7,
											size:14,
											damage:7
										});
									}
								}
							}
							if(random(1)<0.03){
								enemies[a].xvelo=random(-1,1);
							}
							if(enemies[a].x<110){
								enemies[a].xvelo=random(0,1);
							}
							if(enemies[a].x>890){
								enemies[a].xvelo=random(-1,0);
							}
							enemies[a].x+=enemies[a].xvelo;
							enemies[a].y+=0.5;
							if(playerhitbox(enemies[a].x,enemies[a].y,enemies[a].size)){
								enemies[a].exp=1;
								takedamage({dmg:12});
							}
							if(enemies[a].y>720){
								enemies[a].exp=1;
							}
						},
						exp:0,
						score:25
					});
				}
			}
		}
	}
	//PANELS
		fill(80,70,20);
		rect(0,0,100,700);
		rect(900,0,100,700);
		fill(0,0,0);
		rect(30,360,40,300);
		if(player.hpl>0){
			fill(player.hpl*10,player.hpl*10,0);
		}
		rect(915,100,50,500);
		fill(210+abs(tick%180-90)/2,abs(tick%180-90)/2,abs(tick%180-90)/2);
		rect(915,600-(max(0,player.hp/player.mhp))*500,50,(max(0,player.hp/player.mhp))*500);
		if(player.hp>0){
			if(player.hpl>0){
				fill(180,0,180);
				rect(915,600-(max(0,(player.hp+player.hpl)/player.mhp))*500,50,(max(0,(player.hpl)/player.mhp))*500);
			}
		}
		fill(abs(tick%120-50),abs(tick%120-60),130+abs(tick%120-60),150+(player.shield/player.mshield)*50);
		if(player.shielding){
			rect(940,600-(player.shield/player.mshield)*500,45,(player.shield/player.mshield)*500);
		}
		else{
			rect(955,600-(player.shield/player.mshield)*500,30,(player.shield/player.mshield)*500);
		}
		fill(170,130,0);
		rect(30,360,40,player.ammo*3);
		ellipseMode(CENTER);
		fill(20,20,20);
		ellipse(50,350,70,30);
		fill(100,255,100);
		strokeWeight(7);
		stroke(abs(tick%120-60),abs(tick%120-60),abs(tick%120-60));
		for(a=0;a<player.energy;a+=1){
			rect(30,320-a*30,40,22,6);
		}
		noStroke();
		textFont(0,15);
		fill(255,100,150);
		text('FPS: '+fps.fps,940,680);
		textFont(0,18);
		fill(180,200,255);
		text('SCORE',910,25);
		textFont(0,16);
		fill(180,255,200);
		text(player.score,920,50);
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
