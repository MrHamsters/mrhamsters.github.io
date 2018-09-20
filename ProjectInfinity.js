var version="0.4.3b";
void setup(){
  size( 1133, 700 );
  strokeWeight( 10 );
  frameRate( 60 );  
}
var ms=0;
var mslast=0;
var tick=-1;
var gametick=-1;
var buttons=new Array();
var soundPlayed=false;
var textinput ="";
var img;
var cd = 0;
var loaded = 0;
var logoY = 150;
var logoYvelo = 0;
var logoYlock = 0;
var logoR = 180;
var logoRvelo = 0;
var logoRlock = 0;
var mode = 0;
var interrain=0;
var terraininfo;
var inwater=0;
var skip=0;
var urf=0;
var urfim=loadImage('Data/Graphics/miscellaneous/urf.jpg');
var mrjj=loadImage('Data/Graphics/miscellaneous/mrjj.jpg');
var helpscreen={active:0,help:0};
var toloadarea=0;
var options={
	particles:2,
	dmgindicators:1,
	music:0.75,
	autosave:1,
	//0: disabled  1: normal  2: always shown
	healthbars:1,
	loadAudio:1,
	//0: normal dmg ind  1: reduction by armor and res  2: total reduction
	showmit:1,
	//0: frames do not get skipped; if you lag, so does the game  1: game and frames are independent
	frameskip:1,
	light:2
	
	
};
var dmgixtra="";
var drawcap=8;
var fps={
	fps:0,
	second:0,
	lastsecond:0,
	fpscount:0
};
var player;
var playertemp={
	x:0,
	y:0,
	xvelo:0,
	yvelo:0,
	action:{
		name:0,
		speedm:1
	},
	walklock:0,
	walktick:0,
	cspeed:0,
	speed:1,
	traction:1,
	wspeed:1,
	actionlock:0,
	shield:{hp:new Array(),dur:new Array(),fx:new Array()},
	buffs:new Array(),
	combo:{LH:{num:0,timer:1},RH:{num:0,timer:1}},
	maxhp:1,
	maxmp:1,
	hpregen:1,
	mpregen:1,
	str:1,
	intel:1,
	armor:1,
	res:1,
	maxhpfb:0,
	maxmpfb:0,
	hpregenfb:0,
	mpregenfb:0,
	strfb:0,
	intelfb:0,
	armorfb:0,
	resfb:0,
	haste:1,
	rcostm:[1,1],
	timesincedamagetaken:999,
	timesincehittaken:999,
	timesincedamagedealt:999,
	timesincemove:999,
	timesinceaction:999,
	timesincekill:999,
	traitcd:{shift:60,space:60,q:60,e:60},
	activetraitsprites:{shift:0,space:0,q:0,e:0}
	
};
var biomescripts;
var enemy = new Array(0);
var system = new Array(0);
var input = new Array(0,0,0,0,0,0,0,0);
var insertnamehere;
var buttonCD = 0;
var selectedId = 0;
var selectCD = 0;
var typing = 1;
var lastDir = 0;
var terrainimg=new Array(999);
var enemiesimg=new Array(999);
var terrain=new Array();
var waters=new Array();
var gateways=new Array();
var floorC=new Array(160,255,160);
var movelock=0;
var interrain=0;
var particles=new Array();
var dmgind=new Array();
var biomedata;
var biomeinforaw;
var bg;
var enemyinforaw;
var enemydata;
var enemies;
var temp=0;
var menuscreentemp=[0,0,0,0];
var movemousef=function(){
	movemousef=function(){};
	getmenugameload();
}
var getmenugameload=function(){
	if(loadStrings('player '+loadStrings("namecache.txt")[0]+'.txt')){
		menuscreentemp[0]=1;
		menuscreentemp[1]=JSON.parse(loadStrings('player '+loadStrings("namecache.txt")[0]+'.txt')[0]).level;
	}
}
var winfocus=1;
var importdata=["Insert import data here.",1];
console.log(importdata);
function add(a,b){return a+b;}
var temp2=1;
var temp4;
var objects = new Array(1);
var stateffects = new Array(1);
var stateffectsg = new Array();
var inventory=0;
var inventorysprites={};
var equipkey=loadStrings('Data/Text/equip key.txt');
var statkey=loadStrings('Data/Text/global stat key.txt');
var keystones=loadStrings('Data/Text/keystones.txt');
var keystoneselec;
var mouselock;
var traitcd=loadStrings('Data/Text/trait CDs.txt');
var traitusage=loadStrings('Data/Text/trait usage.txt');
var attacktt=loadStrings('Data/Text/attack tt.txt');
var buffind;
var cinematic=0;
var tooltipcache=[-1,""];
var gameCredits="Jonathan Jensen";
var textinput='';
var traits={inactive:new Array(),active:new Array(),sprites:new Array(1000),tt:new Array(1000)};
var traitkey=loadStrings('Data/Text/Traits List.txt');
var invselect=['',-1];
var itemdata=loadStrings('Data/Text/items.txt');
for(i=0;i<itemdata.length/10;i+=1){
	itemdata[i*10+5]=split(itemdata[i*10+5],'/');
	for(n=0;n<itemdata[i*10+5].length;n+=1){
		itemdata[i*10+5][n]=Number(itemdata[i*10+5][n]);
	}
	itemdata[i*10+6]=Number(itemdata[i*10+6]);
	itemdata[i*10+7]=Number(itemdata[i*10+7]);
	itemdata[i*10+9]=Number(itemdata[i*10+9]);
	if(itemdata[i*10+8]){
		itemdata[i*10+8]=split(itemdata[i*10+8],',');
		for(n=0;n<itemdata[i*10+8].length;n+=1){
			itemdata[i*10+8][n]=split(itemdata[i*10+8][n],'/');
			itemdata[i*10+8][n][0]=Number(itemdata[i*10+8][n][0]);
			itemdata[i*10+8][n][1]=Number(itemdata[i*10+8][n][1]);
		}
	}
}
var prefixdata=loadStrings('Data/Text/prefixes.txt');
for(i=0;i<prefixdata.length/5;i+=1){
	prefixdata[i*5+1]=split(prefixdata[i*5+1],'/');
	prefixdata[i*5+1][0]=Number(prefixdata[i*5+1][0]);
	prefixdata[i*5+1][1]=Number(prefixdata[i*5+1][1]);
	prefixdata[i*5+1][2]=split(prefixdata[i*5+1][2],',');
	prefixdata[i*5+1][2][0]=Number(prefixdata[i*5+1][2][0]);
	prefixdata[i*5+1][2][1]=Number(prefixdata[i*5+1][2][1]);
	prefixdata[i*5+1][2][2]=Number(prefixdata[i*5+1][2][2]);
	prefixdata[i*5+2]=split(prefixdata[i*5+2],'/');
	for(n=0;n<prefixdata[i*5+2].length;n+=1){
		prefixdata[i*5+2][n]=Number(prefixdata[i*5+2][n]);
	}
	prefixdata[i*5+3]=Number(prefixdata[i*5+3]);
	if(prefixdata[i*5+4]){
		prefixdata[i*5+4]=split(prefixdata[i*5+4],',');
		for(n=0;n<prefixdata[i*5+4].length;n+=1){
			prefixdata[i*5+4][n]=split(prefixdata[i*5+4][n],'/');
			prefixdata[i*5+4][n][0]=Number(prefixdata[i*5+4][n][0]);
			prefixdata[i*5+4][n][1]=Number(prefixdata[i*5+4][n][1]);
		}
	}
}
var suffixdata=loadStrings('Data/Text/suffixes.txt');
for(i=0;i<suffixdata.length/5;i+=1){
	suffixdata[i*5+1]=split(suffixdata[i*5+1],'/');
	suffixdata[i*5+1][0]=Number(suffixdata[i*5+1][0]);
	suffixdata[i*5+1][1]=Number(suffixdata[i*5+1][1]);
	suffixdata[i*5+1][2]=split(suffixdata[i*5+1][2],',');
	suffixdata[i*5+1][2][0]=Number(suffixdata[i*5+1][2][0]);
	suffixdata[i*5+1][2][1]=Number(suffixdata[i*5+1][2][1]);
	suffixdata[i*5+1][2][2]=Number(suffixdata[i*5+1][2][2]);
	suffixdata[i*5+2]=split(suffixdata[i*5+2],'/');
	for(n=0;n<suffixdata[i*5+2].length;n+=1){
		suffixdata[i*5+2][n]=Number(suffixdata[i*5+2][n]);
	}
	suffixdata[i*5+3]=Number(suffixdata[i*5+3]);
	if(suffixdata[i*5+4]){
		suffixdata[i*5+4]=split(suffixdata[i*5+4],',');
		for(n=0;n<suffixdata[i*5+4].length;n+=1){
			suffixdata[i*5+4][n]=split(suffixdata[i*5+4][n],'/');
			suffixdata[i*5+4][n][0]=Number(suffixdata[i*5+4][n][0]);
			suffixdata[i*5+4][n][1]=Number(suffixdata[i*5+4][n][1]);
		}
	}
}
var getenchkeyspotp=function(i){
	for(n=0;n<enchanter.prefix.length;n+=1){
		if(prefixdata[i*5+1][1]>enchanter.prefix[n].lv){
			return(n);
		}
	}
	return(enchanter.prefix.length);
}
var getenchkeyspots=function(i){
	for(n=0;n<enchanter.suffix.length;n+=1){
		if(suffixdata[i*5+1][1]>enchanter.suffix[n].lv){
			return(n);
		}
	}
	return(enchanter.suffix.length);
}

var enchanter={
	prefix:new Array(),
	suffix:new Array()
};
append(enchanter.prefix,{id:0,lv:1});
for(i=1;i<prefixdata.length/5;i+=1){
	enchanter.prefix.splice(getenchkeyspotp(i),0,{id:i,lv:prefixdata[i*5+1][1]});
}
append(enchanter.suffix,{id:0,lv:1});
for(i=1;i<suffixdata.length/5;i+=1){
	enchanter.suffix.splice(getenchkeyspots(i),0,{id:i,lv:suffixdata[i*5+1][1]});
}
var enchantercache;
var getenchprefixes=function(){
	enchantercache={type:"prefix",enchants:new Array()};
	for(gec=0;gec<enchanter.prefix.length;gec+=1){
		if(enchanter.prefix[gec].lv<=player.level){
			append(enchantercache.enchants,{
				id:enchanter.prefix[gec].id,
				name:prefixdata[enchanter.prefix[gec].id*5],
				dropweight:prefixdata[enchanter.prefix[gec].id*5+1][0],
				R:prefixdata[enchanter.prefix[gec].id*5+1][2][0],
				G:prefixdata[enchanter.prefix[gec].id*5+1][2][1],
				B:prefixdata[enchanter.prefix[gec].id*5+1][2][2]
			});
		}
	}
}
var getenchsuffixes=function(){
	enchantercache={type:"suffix",enchants:new Array()};
	for(gec=0;gec<enchanter.suffix.length;gec+=1){
		if(enchanter.suffix[gec].lv<=player.level){
			append(enchantercache.enchants,{
				id:enchanter.suffix[gec].id,
				name:suffixdata[enchanter.suffix[gec].id*5],
				dropweight:suffixdata[enchanter.suffix[gec].id*5+1][0],
				R:suffixdata[enchanter.suffix[gec].id*5+1][2][0],
				G:suffixdata[enchanter.suffix[gec].id*5+1][2][1],
				B:suffixdata[enchanter.suffix[gec].id*5+1][2][2]
			});
		}
	}
}
var runedata=loadStrings('Data/Text/runes.txt');
for(i=0;i<runedata.length/4;i+=1){
	runedata[i*4+1]=split(runedata[i*4+1],'/');
	runedata[i*4+1][0]=Number(runedata[i*4+1][0]);
	runedata[i*4+1][1]=Number(runedata[i*4+1][1]);
	if(runedata[i*4+2]){
		runedata[i*4+2]=split(runedata[i*4+2],',');
		for(n=0;n<runedata[i*4+2].length;n+=1){
			runedata[i*4+2][n]=split(runedata[i*4+2][n],'/');
			runedata[i*4+2][n][0]=Number(runedata[i*4+2][n][0]);
			runedata[i*4+2][n][1]=Number(runedata[i*4+2][n][1]);
		}
	}
	runedata[i*4+3]=Number(runedata[i*4+3]);
}
var souldata=loadStrings('Data/Text/souls.txt');
for(i=0;i<souldata.length;i+=1){
	souldata[i]=split(souldata[i],'/');
	for(n=0;n<souldata[i].length;n+=1){
		souldata[i][n]=Number(souldata[i][n]);
	}
}
var loottables=loadStrings('Data/Text/loot tables.txt');
for(i=0;i<loottables.length;i+=1){
	loottables[i]=split(loottables[i],',');
	for(n=0;n<loottables[i].length;n+=1){
		loottables[i][n]=split(loottables[i][n],'/');
		loottables[i][n][0]=Number(loottables[i][n][0]);
		loottables[i][n][1]=Number(loottables[i][n][1]);
	}
}
var nmedatanum= new Array(2,4,5,6,7,8,9,10,11);
background(160,255,160);
String ascii[] = loadStrings("Data/Text/ascii.txt");
var getBiomeData=function(ID){
	biomeinforaw = loadStrings("Data/Text/biomeInfo.txt");
	biomedata=new Array();
	expand(biomedata,20);
	for(i=0;i<20;i+=1){
		biomedata[i]=biomeinforaw[(ID-1)*20+i];
	}
	biomedata[3]=Number(biomedata[3]);
	biomedata[4]=Number(biomedata[4]);
	biomedata[7]=Number(biomedata[7]);
	biomedata[9]=Number(biomedata[9]);
	biomedata[11]=Number(biomedata[11]);
	biomedata[12]=Number(biomedata[12]);
	biomedata[13]=Number(biomedata[13]);
	biomedata[14]=Number(biomedata[14]);
	biomedata[15]=Number(biomedata[15]);
	biomedata[18]=Number(biomedata[18]);
	
	biomedata[1] = split(biomedata[1], ',');
	biomedata[2] = split(biomedata[2], ',');
	biomedata[5] = split(biomedata[5], ',');
	biomedata[19] = split(biomedata[19], ',');
	for(i=biomedata[19].length-1;i>=0;i-=1){
		biomedata[19][i] = split(biomedata[19][i], '/');
	}
	for(i=biomedata[5].length-1;i>=0;i-=1){
		biomedata[5][i] = split(biomedata[5][i], '/');
	}
	biomedata[8]=split(biomedata[8],',');
	for(i=biomedata[8].length-1;i>=0;i-=1){
		biomedata[8][i]=split(biomedata[8][i],'/');
		biomedata[8][i][0]=Number(biomedata[8][i][0]);
		biomedata[8][i][1]=Number(biomedata[8][i][1]);
	}
}
var getEnemyData=function(){
	enemyinforaw = loadStrings("Data/Text/enemies.txt");
	enemydata=new Array();
	expand(enemydata,biomedata[8].length*30);
	for(n=0;n<biomedata[8].length;n+=1){
		for(i=0;i<30;i+=1){
			enemydata[i+30*n]=enemyinforaw[biomedata[8][n][0]*30+i];
		}
	}
	for(i=0;i<biomedata[8].length;i+=1){
		for(n=0;n<nmedatanum.length;n+=1){
			enemydata[nmedatanum[n]+30*i]=Number(enemydata[nmedatanum[n]+30*i]);
		}
}
	for(n=0;n<biomedata[8].length;n+=1){
		for(i=12;i<17;i+=1){
			enemydata[n*30+i]=split(enemydata[n*30+i],'/');
		}
		for(i=12;i<17;i+=1){
			if(enemydata[n*30+i][3]){
				enemydata[n*30+i][3]=split(enemydata[n*30+i][3],',');
			for(x=0;x<enemydata[n*30+i][3].length;x+=1){
				if(Number(enemydata[n*30+i][3][x])){
					enemydata[n*30+i][3][x]=Number(enemydata[n*30+i][3][x]);
				}
			}
			}
		}
		for(i=12;i<17;i+=1){
			if(enemydata[n*30+i][6]){
				enemydata[n*30+i][6]=split(enemydata[n*30+i][6],',');
			for(x=0;x<enemydata[n*30+i][6].length;x+=1){
				if(Number(enemydata[n*30+i][6][x])){
					enemydata[n*30+i][6][x]=Number(enemydata[n*30+i][6][x]);
				}
			}
			}
			else{
				enemydata[n*30+i][6]=0;
			}
		}
	}
	for(i=0;i<enemydata.length/30;i+=1){
		enemydata[i*30+22]=split(enemydata[i*30+22],',');
		for(n=0;n<enemydata[i*30+22].length;n+=1){
			enemydata[i*30+22][n]=split(enemydata[i*30+22][n],'/');
			enemydata[i*30+22][n][0]=Number(enemydata[i*30+22][n][0]);
			enemydata[i*30+22][n][1]=Number(enemydata[i*30+22][n][1]);
			enemydata[i*30+22][n][2]=Number(enemydata[i*30+22][n][2]);
		}
	}
	enemyinforaw='';
}
var ilock=0;
var hlock=0;
var invquicksell=0;
noStroke();
window.onkeydown = function (e) {
	if(!(cinematic||dialoga)){
    var code = e.keyCode ? e.keyCode : e.which;
		
    if (code == 87) {
		input[0] =1;
    }
    if (code == 65) {
		input[1] =1;
    }
    if (code == 83) {
		input[2] =1;
    }
    if (code == 68) {
		input[3] =1;
    }
    if (code == 16) {
		input[4] =1;
    }
    if (code == 32) {
		input[5] =1;
    }
    if (code == 81) {
		input[6] =1;
    }
    if (code == 69) {
		input[7] =1;
    }
	if(code==82){
		if(loaded==1&player.hp>0){
			temp= new Array(JSON.stringify(player),1);
			saveStrings("player "+player.name+".txt",temp);
			append(particles,new createparticle(300,150,0,0,0,0,'text','GAME SAVED',30,0,255,-3,150,255,0));
		}
	}
	if(loaded==1&code==73){
		if(!(ilock)){
			ilock=1;
			if(inventory>0){
				invselect=['',-1];
				inventory=0;
				helpscreen={active:0,help:0};
				inventorysprites={};
				traits={inactive:new Array(),active:new Array(),sprites:new Array(1000),tt:new Array(1000)};
			}
			else{
				if(playertemp.inBossFight){
					append(particles,new createparticle(300,300,0,-2,0,0,'text','Inventory cannot be viewed during boss battle!',25,0,255,-4,255,0,0));
				}
				else{
					tooltipcache[0]=-1;
					inventory=1;
					inventype=1;
					invquicksell=0;
					getinventorysprites();
					helpscreen={active:0,help:0};
				}
			}
		}
	}
	if(loaded==1&code==72){
		if(!(hlock)){
			hlock=1;
			if(helpscreen.active){
				helpscreen={active:0,help:0};
			}
			else{
				if(inventory==1){
					if(inventype==1){
						helpscreen.active=1;
						helpscreen.help=function(){
							fill(0,0,50,160);
							rect(5,5,1123,790,40);
							textAlign(CENTER,CENTER);
							fill(255,255,255);
							textFont(0,30);
							text("Inventory Help",1133/2-150,0,300,40);
							noFill();
							strokeWeight(12);
							noFill();
							stroke(0,80,0,200);
							rect(495,170,60,60,5);
							rect(495,245,60,60,5);
							rect(495,320,60,60,5);
							rect(495,395,60,60,5);
							rect(570,320,60,60,5);
							textFont(0,20);
							fill(60,110,60,200);
							text("Right click an equipped item to unequip it.",420,420,200,150);
							
							noFill();
							stroke(0,255,0,200);
							rect(420,245,60,60,5);
							rect(570,245,60,60,5);
							textFont(0,20);
							fill(120,255,120,200);
							text("Left click a weapon to swap left and right hands.",420,290,200,150);
							
							noFill();
							stroke(200,0,200,200);
							rect(20,410,260,80,5);
							fill(255,120,255,200);
							textFont(0,18);
							text("Spend PP for powerful stat increases here. PP is gained by levelling up and killing enemies. Check the infuser in the nexus after spending enough PP to recieve special bonuses.",20,430,400,240);
							
							noFill();
							stroke(200,200,200,200);
							rect(390,35,220,100,10);
							fill(255,255,255,200);
							textFont(0,20);
							text("View traits gained from your equipment here.",400,45,200,80);
							noFill();
							stroke(170,140,0,200);
							rect(645,120,450,450,10);
							fill(255,220,100,200);
							textFont(0,16);
							textAlign(LEFT,TOP);
							text("Hover over an item to see its stats.",660,130,500,50);
							text("Hold shift while hovering to see item description.",680,155,500,50);
							text("Hold control while hovering to see item stat rolls.",680,180,500,50);
							text("Hold any other key while hovering to compare stats with your currently equipped item for that item type.",680,205,400,70);
							text("Left click an item to select it.",660,270,500,50);
							text("Press DELETE to sell the item for SP.",680,295,500,50);
							text("Press TAB to lock/unlock the item. Items cannot be sold while locked.",680,320,400,50);
							text("Left click another inventory slot to move the item.",680,360,500,50);
							text("Right click an item to equip it.",660,410,500,50);
							noStroke();
						}
					}
					else if(inventype==2){
						helpscreen.active=1;
						helpscreen.help=function(){
							fill(0,0,50,160);
							rect(5,5,1123,790,40);
							textAlign(CENTER,CENTER);
							fill(255,255,255);
							textFont(0,30);
							text("Enchanter Help",100,0,933,50);
							textFont(0,22);
							fill(255,255,255,200);
							text("Select an item in your inventory to browse available enchantments.",33,100,1100,600);
							textAlign(LEFT,TOP);
							noStroke();
						}
					}
					else if(inventype==3){
						helpscreen.active=1;
						helpscreen.help=function(){
							fill(0,0,50,160);
							rect(5,5,1123,790,40);
							textAlign(CENTER,CENTER);
							fill(255,255,255);
							textFont(0,30);
							text("Infuser Help",100,0,933,50);
							noFill();
							strokeWeight(20);
							stroke(255,255,255);
							rect(661,270,160,160,30);
							noStroke();
							textFont(0,22);
							fill(255,255,255,200);
							text("Click to check for eligible keystones. If it flashes red, there are none available to you until investing more PP into passives.",400,100,200,550);
							textAlign(LEFT,TOP);
							noStroke();
						}
					}
					else if(inventype==4){
						helpscreen.active=1;
						helpscreen.help=function(){
							fill(0,0,50,160);
							rect(5,5,1123,790,40);
							textAlign(CENTER,CENTER);
							fill(255,255,255);
							textFont(0,30);
							text("Artisan Bench Help",100,0,933,50);
							
							textFont(0,22);
							fill(255,255,255,200);
							text("Select an item in your inventory to modify its stat rolls.",33,100,1100,600);
							
							textAlign(LEFT,TOP);
							noStroke();
						}
					}
				}
				else if(inventory==2){
					helpscreen.active=1;
					helpscreen.help=function(){
						fill(0,0,50,160);
						rect(5,5,1123,790,40);
						textAlign(CENTER,CENTER);
						fill(255,255,255);
						textFont(0,30);
						text("Traits Help",100,0,933,50);
						
						textFont(0,20);
						fill(200,200,255,200);
						text("Active traits appear here. These can be used in game for various effects, but must be equipped. To equip one, hover over it and press a corresponding key (Space, Shift, Q, or E). Equipped active traits appear beneath your XP bar in game with their remaining cooldowns.",50,100,250,400);
						
						textFont(0,22);
						fill(200,255,0,200);
						text("Passive traits appear here. These are always equipped. Hover over them to see what bonuses they are granting you.",390,100,510,400);
						
						textFont(0,20);
						fill(255,255,255,200);
						text("Equipped active traits appear here. These can be unequipped by clicking on them.",950,100,170,400);
					
						textAlign(LEFT,TOP);
						noStroke();
					}
				}
				else if(inventory==3){
					helpscreen.active=1;
					helpscreen.help=function(){
						fill(0,0,50,160);
						rect(5,5,1123,790,40);
						textAlign(CENTER,CENTER);
						fill(255,255,255);
						textFont(0,30);
						text("Atlas Help",100,0,933,50);
						
						textFont(0,22);
						fill(255,255,255,200);
						text("This is a map of all the chartable areas you have discovered so far. Once you have killed enough enemies in normal areas, it will become unlocked. You may click on these to travel to the area. Areas that no longer grant PP (although specific enemies may continue to) appear blue.",33,100,1100,600);
						
						textAlign(LEFT,TOP);
						noStroke();
					}
				}
				else{
					helpscreen.active=1;
					helpscreen.help=function(){
						fill(0,0,50,140);
						rect(105,5,600,590,40);
						textAlign(CENTER,CENTER);
						fill(255,220,100,200);
						textFont(0,22);
						textAlign(LEFT,TOP);
						text("Controls",370,70,500,50);
						textFont(0,18);
						text("-W,A,S,D to move",140,120,500,50);
						text("-Left click to use the weapon in your left hand.",140,150,500,50);
						text("-Right click to use the weapon in your right hand.",140,180,500,50);
						text("-I to open inventory",140,210,500,50);
						text("-UP (arrow key) to interact with things, such as structures in the nexus and portals.",140,240,530,50);
						fill(200,170,100,200);
						text("Note that GUIs (inventory, utility structures in the nexus, etc.) have different help screens.",140,390,530,50);
						noStroke();
					}
				}
			}
		}
	}
	if(code==46){
		if(inventory){
			ilock=1;
			if(invselect[0]=='bag'&!(player.inventory.bag[invselect[1]].lock)){
				if(player.inventory.bag[invselect[1]]){
					if(player.inventory.bag[invselect[1]].rune){
						player.sp+=itemdata[player.inventory.bag[invselect[1]].id*10+9]+pow(player.inventory.bag[invselect[1]].runet,2)*50;
					}
					else{
						player.sp+=itemdata[player.inventory.bag[invselect[1]].id*10+9];
					}
				}
				player.inventory.bag[invselect[1]]=0;
				invselect=['',-1];
			}
		}
	}
	if(code==9){
		if(inventory){
			ilock=1;
			if(invselect[0]=='bag'){
				if(player.inventory.bag[invselect[1]]){
					if(player.inventory.bag[invselect[1]].lock){
						player.inventory.bag[invselect[1]].lock=0;
					}
					else{
						player.inventory.bag[invselect[1]].lock=1;
					}
				invselect=['',-1];
				}
			}
		}
	}
	if(code==27){
		inventory=0;
		helpscreen={active:0,help:0};
		traits={inactive:new Array(),active:new Array(),sprites:new Array(1000),tt:new Array(1000)};
	}
	}
};
window.onkeyup = function (e) {
    var code = e.keyCode ? e.keyCode : e.which;
    if (code==87) {
		input[0]=0;
    }
    if (code==65) {
		input[1]=0;
    }
    if (code==83) {
		input[2]=0;
    }
    if (code==68) {
		input[3] =0;
    }
    if (code==16) {
		input[4]=0;
    }
    if (code==32) {
		input[5]=0;
    }
    if (code==81) {
		input[6]=0;
    }
    if (code==69) {
		input[7]=0;
    }
	if(loaded==1&code==73){
		invselect=['',-1];
		ilock=0;
	}
	if(loaded==1&code==72){
		hlock=0;
	}
};
int[]msglog = new int[0];
append(msglog,0);
int[]indicators = new int[0];
font=loadFont("derp.ttf");
function createparticle(x,y,Xvelo,Yvelo,XveloC,YveloC,type,name,size,sizeC,opacity,opacityC,R,G,B,relative){
	this.x=x;
	this.y=y;
	this.type=type;
	this.size=size;
	this.name=name;
	this.opacity=opacity;
	this.r=R;
	this.g=G;
	this.b=B;
	if(options.particles>0){
		this.xvelo=Xvelo;
		this.yvelo=Yvelo;
	}
	else{
		this.xvelo=0;
		this.yvelo=0;
	}
	if(options.particles>1){
		this.xveloc=XveloC;
		this.yveloc=YveloC;
	}
	else{
		this.xveloc=0;
		this.yveloc=0;
	}
	this.opacityc=opacityC;
	this.sizec=sizeC;
	if(relative){
		this.relative=relative;
	}
}
function cdmgind(x,y,text,size,R,G,B){
	this.x=x;
	this.y=y;
	this.text=text;
	this.size=size;
	this.r=R;
	this.g=G;
	this.b=B;
	this.t=0;
}
function createterrain(sprite,x,y,hitbox,direction){
	this.sprite=sprite;
	this.x=x;
	this.y=y;
	this.size=terraininfo[sprite*5+1];
	this.isWall=terraininfo[sprite*5+2];
	this.angle=direction;
	this.ID=biomedata[1][sprite];
}
function createwater(x,y,width,height){
	this.x=x;
	this.y=y;
	this.width=width;
	this.height=height;
}
function createenemy(ID){
	this.lv=round(random(max(biomedata[9]-5,biomedata[9]*0.6),min(biomedata[9]+5,biomedata[9]*1.4)));
	temp=nmelvsc(this.lv);
	this.x=random(playertemp.x-1000,playertemp.x+1000);
	this.y=random(playertemp.y-1000,playertemp.y+1000);
	this.size=enemydata[ID*30+6];
	this.name=enemydata[ID*30+0];
	this.sprite=ID;
	this.mhp=round(enemydata[ID*30+2]*temp);
	this.hp=round(enemydata[ID*30+2]*temp);
	this.ai=enemydata[ID*30+3];
	this.dmgmin=enemydata[ID*30+4];
	this.dmgmax=enemydata[ID*30+5];
	this.speed=random(enemydata[ID*30+7]*0.95,enemydata[ID*30+7]*1.05);
	this.str=enemydata[ID*30+8]*temp;
	this.intel=enemydata[ID*30+9]*temp;
	this.armor=enemydata[ID*30+10]*temp;
	this.res=enemydata[ID*30+11]*temp;
	this.dir=0;
	this.turnstyle=enemydata[ID*30+17];
	this.tenacity=enemydata[ID*30+19];
	this.stun=0;
	this.action={
		id:0,
		range:0,
		timeout:0
	};
	this.haste=1;
	this.xp=enemydata[ID*30+19];
	this.ppv=enemydata[ID*30+23];
	this.ppd=enemydata[ID*30+24];
	this.soulv=Number(enemydata[ID*30+25]);
	this.spdmod=1;
	if(player.traits[90]>0){
		this.haste+=player.traits[90];
	}
	this.anc=0;
	this.andir=1;
	this.anf=Number(enemydata[ID*30+26])-1;
	this.imgtype=1;
	this.loot=1;
	this.vision=450;
	if(Number(enemydata[ID*30+27])){
		this.reactant=Number(enemydata[ID*30+27]);
	}
	else{
		this.reactant=0;
	}
	this.ondeath=function(i){
		defaultenemy(i,450);	
	};
	this.ondespawn=function(i){
		defaultenemy(i,450);	
	};
}
var defaultenemy=function(i,mindistance){
	temp=-1;
	while(temp<0){
		temp2 =round(random(-0.49,biomedata[8].length-0.51));
		if(biomedata[8][temp2][1]>=random(0,100)){
			temp=temp2;
		}
	}
	enemies[i] = new createenemy(temp);
	while(enemies[i].x-playertemp.x<mindistance&enemies[i].x-playertemp.x>-mindistance&enemies[i].y-playertemp.y>-mindistance&enemies[i].y-playertemp.y<mindistance){
		enemies[i].x=random(playertemp.x-1000,playertemp.x+1000);
		enemies[i].y=random(playertemp.y-1000,playertemp.y+1000);
	}
}
var getinventorysprites=function(){
	inventorysprites={meta:1};
	for(i=0;i<player.inventory.bag.length;i+=1){
		if(player.inventory.bag[i]){
			if(!(inventorysprites[itemdata[player.inventory.bag[i].id*10+4]])&itemdata[player.inventory.bag[i].id*10+3]=='svg'){
				inventorysprites[itemdata[player.inventory.bag[i].id*10+4]]=loadShape('Data/Graphics/inventory/'+itemdata[player.inventory.bag[i].id*10+4]+'.svg');
			}
		}
	}
	for(i=0;i<equipkey.length;i+=1){
		if(player.inventory[equipkey[i]]){
			if(!(inventorysprites[itemdata[player.inventory[equipkey[i]].id*10+4]])&itemdata[player.inventory[equipkey[i]].id*10+3]=='svg'){
				inventorysprites[itemdata[player.inventory[equipkey[i]].id*10+4]]=loadShape('Data/Graphics/inventory/'+itemdata[player.inventory[equipkey[i]].id*10+4]+'.svg');
			}
		}
	}
}
var findbuff=function(id){
	buffind=-1;
	for(r=0;r<playertemp.buffs.length;r+=1){
		if(playertemp.buffs[r].id==id){
			buffind=r;
			r=playertemp.buffs.length;
		}
	}
}
var findemptyslot=function(){
	temp=0;
	for(j=0;j<player.inventory.bag.length;j+=1){
		if(!(temp||player.inventory.bag[j])){
			temp=1;
			return(j);
		}
	}
	return(-1);
}
var artisanmbox=function(stat,y){
	if(player.inventory.bag[invselect[1]].artmrolls[stat]<player.inventory.bag[invselect[1]].rolls[stat]||(player.sp>=stemp&player.inventory.bag[invselect[1]].rolls[stat]>=0.51)){
		fill(200,220,200);
		rect(40,300+y,30,30,3);
		fill(200,0,0);
		rect(44,311+y,22,7,2);
		if(cursorbox(40,70,300+y,330+y)){
			if(player.inventory.bag[invselect[1]].artmrolls[stat]<player.inventory.bag[invselect[1]].rolls[stat]){
				tooltipdraw={
					type:0,
					x:mouseX,
					y:mouseY-100,
					w:250,
					h:200,
					title:"Lower",
					tip:"Converts 1% of this roll into a free point. This roll has been lower than its current value and may be lowered again at no cost.",
					colors:0
				};
				if(!(mouselock)&mousePressed){
					mouselock=1;
					if(mouseButton==LEFT){
						if(invselect[0]=='bag'){
							if(options.loadAudio){sfx.click.play();}
								player.inventory.bag[invselect[1]].rolls[stat]-=0.01;
								if(player.inventory.bag[invselect[1]].freepts>0){
									player.inventory.bag[invselect[1]].freepts+=1;
								}
								else{
									player.inventory.bag[invselect[1]].freepts=1;
								}
							}
					}
				}
			}
			else{
				tooltipdraw={
					type:0,
					x:mouseX,
					y:mouseY-100,
					w:250,
					h:200,
					title:"Lower",
					tip:"Converts 1% of this roll into a free point. Costs "+stemp+" SP.",
					colors:0
				};
				if(!(mouselock)&mousePressed){
					mouselock=1;
					if(mouseButton==LEFT){
						if(invselect[0]=='bag'){
							if(options.loadAudio){sfx.click.play();}
							if(player.sp>=stemp){
								player.sp-=stemp;
								player.inventory.bag[invselect[1]].artmrolls[stat]-=0.01;
								player.inventory.bag[invselect[1]].rolls[stat]-=0.01;
								if(player.inventory.bag[invselect[1]].ptfree>0){
									player.inventory.bag[invselect[1]].ptfree+=1;
								}
								else{
									player.inventory.bag[invselect[1]].ptfree=1;
								}
								if(player.inventory.bag[invselect[1]].freepts>0){
									player.inventory.bag[invselect[1]].freepts+=1;
								}
								else{
									player.inventory.bag[invselect[1]].freepts=1;
								}
							}
							else{
								append(particles,new createparticle(mouseX-150,mouseY-50,0,0,0,0,'text','Insufficient SP!',20,0,255,-3,255,0,0));
							}
						}
					}
				}
			}
		}
	}
}
var artisanpbox=function(stat,y){
	if(player.inventory.bag[invselect[1]].freepts){
		fill(200,220,200);
		rect(90,300+y,30,30,3);
		fill(0,200,0);
		rect(94,311+y,22,7,2);
		rect(102,304+y,7,22,2);
		if(cursorbox(90,120,300+y,330+y)){
			tooltipdraw={
				type:0,
				x:mouseX,
				y:mouseY-100,
				w:250,
				h:200,
				title:"Raise",
				tip:"Increase this stat roll by 1%. Cost: 1 free point.",
				colors:0
			};
			if(!(mouselock)&mousePressed){
				mouselock=1;
				if(mouseButton==LEFT){
					if(invselect[0]=='bag'){
						if(options.loadAudio){sfx.click.play();}
						player.inventory.bag[invselect[1]].freepts-=1;
						player.inventory.bag[invselect[1]].rolls[stat]+=0.01;
					}
				}
			}
		}
	}
}
var extractloot=function(id){
	temp2=0;
	while(!(temp2)){
		temp=round(random(-0.49,loottables[id].length-0.51));
		if(loottables[id][temp]){
		if(loottables[id][temp][1]>=random(0,100)){
			temp2=1;
		}
		}
		else{
			return(44);
		}
	}
	return(loottables[id][temp][0]);
}
var selectprefix=function(lv,chance){
	if(chance>=random(0,100)){
		temp2=0;
		while(!(temp2)){
			temp=round(random(0.51,prefixdata.length/5+0.49));
			if(prefixdata[temp*5-4][1]<=lv&prefixdata[temp*5-4][0]>=random(0,100)){
				temp2=1;
			}
		}
		return(temp);
	}
	else{
		return(0);
	}
}
var selectsuffix=function(lv,chance){
	if(chance>=random(0,100)){
		temp2=0;
		while(!(temp2)){
			temp=round(random(0.51,suffixdata.length/5+0.49));
			if(suffixdata[temp*5-4][1]<=lv&suffixdata[temp*5-4][0]>=random(0,100)){
				temp2=1;
			}
		}
		return(temp);
	}
	else{
		return(0);
	}
}

var selectrune=function(tier){
	if(tier>0){
		temp2=0;
		while(!(temp2)){
			temp=round(random(0.51,runedata.length/4+0.49));
			if(runedata[temp*4-3][0]==tier&runedata[temp*4-3][1]>=random(0,100)){
				temp2=1;
			}
		}
		return(temp);
	}
	else{
		return(0);
	}
}

var selectrunetier=function(lv,chance,id){
	var tier=0;
	if(!(id==44)){
		if(player.traits[107]>0){
			chance*=1.08+player.traits[107]*0.02;
		}
		if(2*chance*log(lv/2)/100>=random(0,100)){
			tier=1;
			if(20*chance*(log(max(30,(lv-60))/3)/100-1)>=random(0,100)){
				tier=2;
			}
			if(12*chance*(log(max(40,(lv-120))/4)/100-1)>=random(0,100)){
				tier=3;
			}
		}
	}
	return(tier);
}
var selectloot=function(f){
	temp2=0;
	while(!(temp2)){
		temp=round(random(-0.49,enemydata[enemies[f].sprite*30+22].length-0.51));
		if(enemydata[enemies[f].sprite*30+22][temp][2]>=random(0,100)){
			temp2=1;
		}
	}
	if(enemydata[enemies[f].sprite*30+22][temp][0]==1){
		return(extractloot(enemydata[enemies[f].sprite*30+22][temp][1]));
	}
	else{
		return(enemydata[enemies[f].sprite*30+22][temp][1]);
	}
}
var bosshpbar=0;
var plshp=function(scale){
	return(max(1,player.maxhp*playertemp.maxhp+playertemp.maxhpfb)*scale);
}
var plshr=function(scale){
	return(max(0,player.hpregen*playertemp.hpregen+playertemp.hpregenfb)*scale);
}
var plsmp=function(scale){
	return(max(0,player.maxmp*playertemp.maxmp+playertemp.maxmpfb)*scale);
}
var plsmr=function(scale){
	return(max(0,player.mpregen*playertemp.mpregen+playertemp.mpregenfb)*scale);
}
var plsst=function(scale){
	return(max(0,player.str*playertemp.str+playertemp.strfb)*scale);
}
var plsin=function(scale){
	return(max(0,player.intel*playertemp.intel+playertemp.intelfb)*scale);
}
var plsar=function(scale){
	return(max(0,player.armor*playertemp.armor+playertemp.armorfb)*scale);
}
var plsre=function(scale){
	return(max(0,player.res*playertemp.res+playertemp.resfb)*scale);
}
var lootcount;
var lootstock;
var lootrollmin;
var lootrollmax;
var lootfreepts;
var gltmp=[0,0];
var getloot=function(f){
	stemp=0;
	if(enemies[f].ppv-player.record.enemies[biomedata[8][enemies[f].sprite][0]]*enemies[f].ppd>0){
		player.pp+=enemies[f].ppv-player.record.enemies[biomedata[8][enemies[f].sprite][0]]*enemies[f].ppd;
		stemp=enemies[f].ppv-player.record.enemies[biomedata[8][enemies[f].sprite][0]]*enemies[f].ppd;
	}
	player.record.enemies[biomedata[8][enemies[f].sprite][0]]+=1;
	if(player.record.biomes[player.biomeID]<biomedata[18]){
		for(ppvfs=0;ppvfs<enemies[f].soulv;ppvfs+=1){
			if(player.record.biomes[player.biomeID]<biomedata[18]){
				player.pp+=0.05*(biomedata[18]-player.record.biomes[player.biomeID]);
				stemp+=0.05*(biomedata[18]-player.record.biomes[player.biomeID]);
			}
			player.record.biomes[player.biomeID]+=1;
		}
	}
	if(!(player.record.biocomp[player.biomeID])&player.record.biomes[player.biomeID]>=biomedata[18]){
		player.record.biocomp[player.biomeID]=1;
		if(biomedata[18]>0){
			append(particles,new createparticle(350,200,0,-0.2,0,0,'text','Area complete!',30,0,255,-1,190,240,0));
		}
	}
	
	else{
		player.record.biomes[player.biomeID]+=enemies[f].soulv;
	}
	
	if(biomedata[16]==1&player.record.atlas[player.biomeID]==1){
		if(player.record.biomes[player.biomeID]>=biomedata[17]){
			player.record.atlas[player.biomeID]=2;
			append(particles,new createparticle(250,300,0,-0.7,0,0,'text','Area unlocked!',30,0,255,-1.5,190,240,0));
		}
	}
	
	if(stemp>0){
		append(particles,new createparticle(275+random(150),300,0,-1,0,0,'text','+ '+round(stemp/10)/10+' PP',30,0,255,-2,130,130,0));
	}
	if(player.traits[68]>0){
		lootstock=enemydata[enemies[f].sprite*30+21]*(1+player.traits[68]/100);
	}
	else{
		lootstock=enemydata[enemies[f].sprite*30+21];
	}
	lootcount=0;
	while(lootstock>0){
			prefixchance=30;
			suffixchance=30;
		if(lootstock>=random(0,100)){
			lootrollmin=0.7;
			lootrollmax=1;
			lootfreepts=0;
			if(player.traits[60]>0){
				lootfreepts=player.traits[60];
			}
			if(findemptyslot()>-1){
				gltmp[0]=selectloot(f);
				gltmp[1]=selectrunetier(enemies[f].lv,100,gltmp[0]);
				player.inventory.bag[findemptyslot()]={
							id:gltmp[0],
							level:enemies[f].lv,
							prefix:selectprefix(enemies[f].lv,prefixchance),
							suffix:selectsuffix(enemies[f].lv,suffixchance),
							rune:selectrune(gltmp[1]),
							runet:gltmp[1],
							freepts:lootfreepts,
							rolls:{
								hp:random(lootrollmin,lootrollmax),
								mp:random(lootrollmin,lootrollmax),
								hpregen:random(lootrollmin,lootrollmax),
								mpregen:random(lootrollmin,lootrollmax),
								str:random(lootrollmin,lootrollmax),
								intel:random(lootrollmin,lootrollmax),
								armor:random(lootrollmin,lootrollmax),
								res:random(lootrollmin,lootrollmax),
							}
				};
				lootcount+=1;
			}
			else{
				append(particles,new createparticle(300,300,0,-2,0,0,'text','Inventory full!',30,0,255,-4,255,0,0));
				lootstock=0;
			}
		}
		lootstock-=100;
	}
	for(tfok=0;tfok<traitfuncs.onkill.length;tfok+=1){
		traitfuncs.onkill[tfok](f);
	}
	for(tfok=0;tfok<keystonefuncs.onkill.length;tfok+=1){
		keystonefuncs.onkill[tfok](f);
	}
	if(lootcount>0){
		if(lootcount==1){
			append(particles,new createparticle(random(200,400),200,0,-2,0,0,'text','Found Item!',30,0,255,-4,255,0,255));
		}
		else{
			append(particles,new createparticle(random(200,400),200,0,-2,0,0,'text','Found Items ('+lootcount+')!',30,0,255,-4,255,0,255));
		}
	}
}
var renderinventory= function(){
			for(x=0;x<15;x+=1){
			for(n=0;n<15;n+=1){
				if(invselect[1]==15*x+n){
					fill(20,100+abs(tick%60-30)*2,40);
				}
				else{
					fill(20,20,40);
					if(player.inventory.bag[15*x+n]){
						fill(20+abs(tick%80-40)/2,20+abs(tick%80-40)/2,40+abs(tick%80-40)/2);
						if(player.inventory.bag[15*x+n].rune){
							if(player.inventory.bag[15*x+n].runet==1){
								fill(20,20,180);
							}
							if(player.inventory.bag[15*x+n].runet==2){
								fill(140,20,140);
							}
							if(player.inventory.bag[15*x+n].runet==3){
								fill(150,150,0);
							}
						}
					}
				}
				rect(650+30*n,125+30*x,25,25,2);
				if(player.inventory.bag[15*x+n]){
					if(player.inventory.bag[15*x+n].id==44){
						ellipseMode(CENTER);
						if(player.inventory.bag[15*x+n].suffix&player.inventory.bag[15*x+n].prefix){
							fill(suffixdata[player.inventory.bag[15*x+n].suffix*5-4][2][0],suffixdata[player.inventory.bag[15*x+n].suffix*5-4][2][1],suffixdata[player.inventory.bag[15*x+n].suffix*5-4][2][2]);
							ellipse(662+30*n,137+30*x,20,20);
							fill(prefixdata[player.inventory.bag[15*x+n].prefix*5-4][2][0],prefixdata[player.inventory.bag[15*x+n].prefix*5-4][2][1],prefixdata[player.inventory.bag[15*x+n].prefix*5-4][2][2]);
							arc(662+30*n,137+30*x,20,20,PI/2,3*PI/2);
						}
						else if(player.inventory.bag[15*x+n].prefix){
							fill(prefixdata[player.inventory.bag[15*x+n].prefix*5-4][2][0],prefixdata[player.inventory.bag[15*x+n].prefix*5-4][2][1],prefixdata[player.inventory.bag[15*x+n].prefix*5-4][2][2]);
							ellipse(662+30*n,137+30*x,20,20);
						}
						else if(player.inventory.bag[15*x+n].suffix){
							fill(suffixdata[player.inventory.bag[15*x+n].suffix*5-4][2][0],suffixdata[player.inventory.bag[15*x+n].suffix*5-4][2][1],suffixdata[player.inventory.bag[15*x+n].suffix*5-4][2][2]);
							ellipse(662+30*n,137+30*x,20,20);
						}
						else{
							fill(0,0,0);
							ellipse(662+30*n,137+30*x,20,20);
						}
						if(player.inventory.bag[15*x+n].suffix||player.inventory.bag[15*x+n].prefix){
							noFill();
							strokeWeight(2);
							stroke(255,255,255,255-(tick%180*2));
							ellipse(662+30*n,137+30*x,(tick%180)/7,(tick%180)/7);
						}
						noStroke();
					}
					else{
						if(render){shape(inventorysprites[itemdata[player.inventory.bag[15*x+n].id*10+4]],662+30*n,137+30*x,37,55);}
					}
				}
			}
		}
		}
var getplayersprite=function(){
		VRPlayer={leg:{}};
			if(player.inventory.chest){
				VRPlayer.main=loadShape('Data/Graphics/player/main/'+itemdata[player.inventory.chest.id*10+2]);
			}
			else{
				VRPlayer.main=loadShape('Data/Graphics/player/main/'+"armorless.svg");
			}
			if(player.inventory.helmet){
				VRPlayer.head=loadShape('Data/Graphics/player/head/'+itemdata[player.inventory.helmet.id*10+2]);
			}
			else{
				VRPlayer.head=loadShape('Data/Graphics/player/head/'+"armorless.svg");
			}
			if(player.inventory.pants){
				VRPlayer.leg=loadShape('Data/Graphics/player/leg/'+itemdata[player.inventory.pants.id*10+2]);
			}
			else{
				VRPlayer.leg=loadShape('Data/Graphics/player/leg/'+"armorless.svg");
			}
}
var getbuffind=function(id){
	for(r=0;r<playertemp.buffs.length;r+=1){
		if(playertemp.buffs[r].id==id){
			return(r);
		}
	}
	return(-1);
}
var activetraits=loadStrings('Data/Text/active traits.txt');
var gettraits = function(){
	traits.inactive=new Array();
	traits.active=new Array();
	traits.sprites=new Array(1000);
	traits.tt=new Array(1000);
	temp=loadStrings('Data/Text/trait tooltips.txt');
	for(i=1;i<player.traits.length;i+=1){
		if(player.traits[i]>0&(i<50||i>57)){
			traits.sprites[i]=loadShape('Data/Graphics/traits/'+i+'.svg');
			traits.tt[i]=[temp[(i-1)*2]+" ("+player.traits[i]+")",
			temp[(i-1)*2+1],
			player.traits[i]
			];
			if(activetraits[i]>0){
				if(!(player.activetraits.shift==i||player.activetraits.space==i||player.activetraits.q==i||player.activetraits.e==i)){
					append(traits.inactive,i);
				}
			}
			else{
				append(traits.active,i);
			}
		}
	}
	if(player.activetraits.shift>0){
		playertemp.activetraitsprites.shift=loadShape('Data/Graphics/traits/'+player.activetraits.shift+'.svg');
	}
	if(player.activetraits.space>0){
		playertemp.activetraitsprites.space=loadShape('Data/Graphics/traits/'+player.activetraits.space+'.svg');
	}
	if(player.activetraits.q>0){
		playertemp.activetraitsprites.q=loadShape('Data/Graphics/traits/'+player.activetraits.q+'.svg');
	}
	if(player.activetraits.e>0){
		playertemp.activetraitsprites.e=loadShape('Data/Graphics/traits/'+player.activetraits.e+'.svg');
	}
	temp='';
	temp2='';
}
	
var levelup=function(){
	if(player.xp>=player.xpr&options.autosave){
		temp= new Array(JSON.stringify(player),1);
		saveStrings("player "+player.name+".txt",temp);
		append(particles,new createparticle(300,150,0,0,0,0,'text','GAME SAVED',30,0,255,-3,150,255,0));
	}
	while(player.xp>=player.xpr){
		if(!(player.lvpprew)){
			player.lvpprew=0;
		}
		player.xp-=player.xpr;
		player.level+=1;
		player.xpr=round(100*pow(1.1,player.level-1));
		player.pp+=(player.level-player.lvpprew)*500;
		player.lvpprew=player.level;
		if(player.autoanvil&player.sp>=5){
			if(options.loadAudio){sfx.upgrade.play();}
			if(player.inventory.LH){
				if(player.sp>=5){
					player.sp-=5;
					player.inventory.LH.level+=1;
				}
			}
			if(player.inventory.RH){
				if(player.sp>=5){
					player.sp-=5;
					player.inventory.RH.level+=1;
				}
			}
			if(player.inventory.chest){
				if(player.sp>=5){
					player.sp-=5;
					player.inventory.chest.level+=1;
				}
			}
			if(player.inventory.helmet){
				if(player.sp>=5){
					player.sp-=5;
					player.inventory.helmet.level+=1;
				}
			}
			if(player.inventory.pants){
				if(player.sp>=5){
					player.sp-=5;
					player.inventory.pants.level+=1;
				}
			}
			if(player.inventory.shoes){
				if(player.sp>=5){
					player.sp-=5;
					player.inventory.shoes.level+=1;
				}
			}
			if(player.inventory.gloves){
				if(player.sp>=5){
					player.sp-=5;
					player.inventory.gloves.level+=1;
				}
			}
			if(player.sp<35){
				append(particles,new createparticle(400,200,0,0,0,0,'text','Low SP! Automatic upgrading may not activate next level up!',30,0,255,-3,255,0,0));
			}
		}
		loadtraits();
		recalstats();
		if(player.hp<(plshp(1))){
			player.hp=(plshp(1));
		}
		if(player.mp<(plsmp(1))){
			player.mp=(plsmp(1));
		}
		append(particles,new createparticle(400,300,0,-2,0,0,'text','LEVEL UP! (+5PP)',33,0,255,-4,0,255,0));
	}
}
var getequipstat=function(statid){
	temp=0;
	for(i=0;i<equipkey.length;i+=1){
		if(player.inventory[equipkey[i]]){
			temp+=getequipstatsingle(statid,equipkey[i]);
		}
	}
	return(temp);
}
var targetdir=function(){
	if(mouseY<350){
		return(-atan((mouseX-400)/(mouseY-350)));
	}
	else{
		return(PI-atan((mouseX-400)/(mouseY-350)));
	}
}
var getkeystone=function(){
	for(gks=1;keystoneselec[0]==0&gks<1+keystones.length/50;gks+=1){
		if(player.record.keystones[gks]==0){
			if(player.passives[0]+player.passives[1]+player.passives[2]*2>=Number(keystones[gks*50])&player.passives[0]>=Number(keystones[gks*50+1])&player.passives[1]>=Number(keystones[gks*50+2])&player.passives[2]>=Number(keystones[gks*50+3])){
				keystoneselec[0]=gks;
				keystoneselec[1]=0;
			}
		}
	}
	if(keystoneselec[0]==0){
		keystoneselec=[-1,60];
	}
}
var keystonefuncs;
//======================LOAD KEYSTONE PASSIVES===============================
var loadkeystoneps=function(){
	keystonefuncs={
		passives:new Array(),
		onhit:new Array(),
		whenhit:new Array(),
		damagedealt:new Array(),
		damagetaken:new Array(),
		damagetakenpm:new Array(),
		damagetakenpa:new Array(),
		healthextensions:new Array(),
		damagedealtpostmit:new Array(),
		overlay:new Array(),
		onkill:new Array(),
		underlay:new Array()
	};
	if(player.keystonepassives[3]>0){
		append(traitfuncs.damagetaken,function(){
			if(willhit){
				pdmg*=(0.98-player.keystonepassives[3]*0.03);
				mdmg*=(0.98-player.keystonepassives[3]*0.03);
			}
		});
	}
	if(player.keystonepassives[4]>0){
		append(traitfuncs.damagetaken,function(){
			if(attacktype=="DoT"){
			if(pdmg>0&armorE<=0){
				pdmg*=(0.93-player.keystonepassives[3]*0.08);
			}
			if(mdmg>0&resE<=0){
				mdmg*=(0.93-player.keystonepassives[3]*0.08);
			}
			}
		});
	}
	if(player.keystonepassives[5]>0){
		append(keystonefuncs.passives,function(){
			if(!(playertemp.tenacityks)){
				playertemp.tenacityks=0;
			}
			if(!(playertemp.tenacityksa)){
				playertemp.tenacityksa=0;
			}
			if(playertemp.tenacityks<1500){
				playertemp.tenacityks+=player.haste*playertemp.haste;
			}
			if(playertemp.tenacityks>=1500&player.hp<(plshp(1))*0.3){
				playertemp.tenacityks=0;
				playertemp.tenacityksa=180;
			}
			if(playertemp.tenacityksa>0){
				playertemp.tenacityksa-=1;
				if(tick%6==0){
					append(particles,new createparticle(random(385,415),random(335,365),0,0,0,0,'circle','',10,-0.3,255,-15,190,255,90));
				}
				heal((plshp(1))/1000+(plshr(1))/50,"HoT");
			}
		});
		append(keystonefuncs.overlay,function(){
			if(playertemp.tenacityks>=1500){
				ellipseMode(CENTER);
				fill(150,150,150);
				ellipse(818,255,10,10);
				fill(0,255,0);
				ellipse(818,255,6,6);
			}
		});
	}
	if(player.keystonepassives[6]>0){
		append(keystonefuncs.passives,function(){
			if(!(playertemp.pentakill)){
				playertemp.pentakill=0;
			}
			if(!(playertemp.pentakillt)){
				playertemp.pentakillt=0;
			}
			if(!(playertemp.pentakillc)){
				playertemp.pentakillc=0;
			}
			if(!(playertemp.pentakillv)){
				playertemp.pentakillv=0;
			}
			if(playertemp.pentakill<900){
				playertemp.pentakill+=player.haste*playertemp.haste;
			}
			if(playertemp.pentakillt<=0){
				playertemp.pentakillc=0;
				playertemp.pentakillv=0;
			}
			else{
				playertemp.pentakillt-=1;
			}
		});
		append(keystonefuncs.onkill,function(f){
			if(playertemp.pentakill>=900){
				playertemp.pentakillv+=round((enemies[i].xp*pow(1.1,min(enemies[i].lv,player.level)-1))/10);
				if(player.traits[22]>0){
					playertemp.pentakillv+=round(enemies[i].xp*pow(1.1,min(enemies[i].lv,player.level)-1)*player.traits[22]/1000);
				}
				if(player.traits[23]>0){
					playertemp.pentakillv-=round(enemies[i].xp*pow(1.1,min(enemies[i].lv,player.level)-1)*player.traits[23]/1000);
				}
				playertemp.pentakillc+=1;
				playertemp.pentakillt=300;
				if(playertemp.pentakillc==2){
					append(particles,new createparticle(400,100,0,0,0,0,'text','Double Kill!',21,0,255,-4,150,150,0));
				}
				if(playertemp.pentakillc==3){
					append(particles,new createparticle(400,100,0,0,0,0,'text','Triple Kill!',23,0,255,-3.5,150,150,0));
				}
				if(playertemp.pentakillc==4){
					append(particles,new createparticle(400,100,0,0,0,0,'text','Quadra Kill!',25,0,255,-3,255,150,0));
				}
				if(playertemp.pentakillc==5){
					append(particles,new createparticle(400,100,0,0,0,0,'text','Penta Kill!',30,0,255,-2.5,255,100,0));
					playertemp.pentakill=0;
					playertemp.pentakillc=0;
					player.xp+=playertemp.pentakillv;
					playertemp.pentakillv=0;
					buff(2,60,100);
					player.sp+=10;
					player.mp+=10;
					heal((9+player.level)*(1+player.passives[0]/50),"direct");
				}
			}
		});
	}
	if(player.keystonepassives[7]>0){
		append(keystonefuncs.passives,function(){
			if(!(playertemp.carnage)){
				playertemp.carnage=0;
			}
			if(!(playertemp.carnagea)){
				playertemp.carnagea=0;
			}
			if(playertemp.carnage>0){
				playertemp.carnage-=1;
			}
		});
		append(keystonefuncs.damagedealtpostmit,function(){
			if((pdmg+mdmg)>=enemies[index].mhp*0.3&willhit){
				playertemp.carnage=120;
				if(!(playertemp.carnagea)){
					playertemp.carnagea=1;
					playertemp.haste+=0.25;
					append(stateffects,{name:'carnage',tick:0,run:function(){
						if(playertemp.carnage<=0){
							playertemp.haste-=0.25;
							playertemp.carnagea=0;
							stateffects.splice(n,1);
							n-=1;
						}
					}
					});
				}
			}
		});
	}
	if(player.keystonepassives[20]>0){
		append(keystonefuncs.passives,function(){
			if(!(playertemp.frenzy)){
				playertemp.frenzy=0;
			}
			if(!(playertemp.frenzym)){
				playertemp.frenzym=0;
			}
			if(!(playertemp.frenzyt)){
				playertemp.frenzyt=0;
			}
			if(playertemp.frenzyt>0){
				playertemp.frenzyt-=1;
				if(playertemp.frenzyt<=0){
					playertemp.haste-=playertemp.frenzy*0.02;
					playertemp.frenzy=0;
				}
			}
			if(playertemp.frenzym<60){
				playertemp.frenzym+=player.haste*playertemp.haste;
			}
		});
		append(keystonefuncs.damagedealt,function(){
			pdmg*=0.75
			mdmg*=0.75;
			if(willhit){
				if(procc>=random(0.75)){
					if(playertemp.frenzy<10){
						playertemp.frenzy+=1;
						playertemp.haste+=0.02;
						playertemp.frenzyt=300;
					}
					if(playertemp.frenzym>=24){
						playertemp.frenzym-=24;
						player.mp+=2;
					}
				}
			}
		});
	}
	if(player.keystonepassives[11]>0){
		append(keystonefuncs.passives,function(){
			if(!(playertemp.spiritvengeance)){
				playertemp.spiritvengeance=0;
			}
		});
		append(keystonefuncs.damagetaken,function(){
			if(willhit){
				if(playertemp.spiritvengeance<5){
					playertemp.spiritvengeance+=1;
					playertemp.haste+=0.05;
					append(stateffects,{name:'spirit vengeance',tick:0,run:function(){
						if(stateffects[n].tick>=180){
							playertemp.haste-=0.05;
							playertemp.spiritvengeance-=1;
							stateffects.splice(n,1);
							n-=1;
						}
					}
					});
				}
			}
		});
	}
	if(player.keystonepassives[8]>0){
		append(keystonefuncs.damagedealt,function(){
			pdmg*=1.05;
			mdmg*=1.05;
		});
	}
	if(player.keystonepassives[2]>0){
		append(keystonefuncs.passives,function(){
			if(!(playertemp.omnicannon)){
				playertemp.omnicannon=0;
			}
			if(playertemp.omnicannon<60){
				playertemp.omnicannon+=player.haste*playertemp.haste;
				if(player.keystonepassives[9]>0){
					playertemp.omnicannon+=player.haste*playertemp.haste;
				}
			}
		});
		append(keystonefuncs.passives,function(){
			if(mousePressed&mouseButton==LEFT){
				if(playertemp.omnicannon>=60&player.mp>=2){
					player.mp-=2;
					playertemp.omnicannon=0;
					append(objects,{
						type:'projectile',
						vfx:1,
						draw:function(){
							fill(150+objects[n].duration*3,objects[n].duration*7,150+objects[n].duration*3);
							ellipseMode(CENTER);
							ellipse(0,0,19+(tick%30-15)/5,19+(tick%30-15)/5);
							ellipse(cos(objects[n].dir+PI/2)*20,sin(objects[n].dir+PI/2)*20,(19+(tick%30-15)/5)*.6,(19+(tick%30-15)/5)*.6);
							ellipse(cos(objects[n].dir+3*PI/2)*20,sin(objects[n].dir+3*PI/2)*20,(19+(tick%30-15)/5)*.6,(19+(tick%30-15)/5)*.6);
							ellipse(cos(objects[n].dir+PI)*20,sin(objects[n].dir+PI)*20,(19+(tick%30-15)/5)*.6,(19+(tick%30-15)/5)*.6);
							ellipse(cos(objects[n].dir)*20,sin(objects[n].dir)*20,(19+(tick%30-15)/5)*.6,(19+(tick%30-15)/5)*.6);
						},
						target:'enemy',
						size:32,
						speed:14,
						pierce:2,
						duration:20,
						sound:sfx.energyh,
						dir:targetdir(),
						x:playertemp.x,
						y:playertemp.y,
						pdmgmin:0,
						pdmgmax:0,
						mdmgmin:((plsst(1))+(plsin(1)))*1.5*(1+player.keystonepassives[2]),
						mdmgmax:((plsst(1))+(plsin(1)))*1.7*(1+player.keystonepassives[2]),
						armorE:1,
						resE:1,
						procc:1,
						hits:new Array(999),
					});
				}
			}
		});
	}
	//Post % Mit
	if(player.keystonepassives[10]>0){
		append(keystonefuncs.passives,function(){
			if(!(playertemp.spiritguard)){
				playertemp.spiritguard=0;
			}
			if(player.biomeID==1){
				playertemp.spiritguard=10;
			}
		});
		append(keystonefuncs.overlay,function(){
			if(playertemp.spiritguard>0){
				ellipseMode(CENTER);
				for(rsg=0;rsg<playertemp.spiritguard;rsg+=1){
					fill(150,150,150);
					ellipse(840+rsg*30,210,13,13);
					fill(150,120,220);
					ellipse(840+rsg*30,210,8,8);
				}
			}
		});
		append(keystonefuncs.damagetaken,function(){
			if(pdmg+mdmg>0&willhit){
				if(playertemp.spiritguard>0){
					playertemp.spiritguard-=1;
					stemp=((3+player.level/3)*(1+player.passives[2]/50))+(plshp(1))/100;
					if(pdmg>stemp){
						pdmg-=stemp;
						stemp=0;
					}
					else{
						stemp-=pdmg;
						pdmg=0;
					}
					if(mdmg>stemp){
						mdmg-=stemp;
						stemp=0;
					}
					else{
						stemp-=mdmg;
						mdmg=0;
					}
				}
			}
		});
		append(keystonefuncs.damagedealtpostmit,function(){
			if((pdmg+mdmg)>=nmelvsc(enemies[index].lv)*25&willhit){
				playertemp.spiritguard=min(10,playertemp.spiritguard+1);
			}
		});
		append(keystonefuncs.onkill,function(){
			playertemp.spiritguard=min(10,playertemp.spiritguard+2);
		});
	}
	//Health extensions
	if(player.keystonepassives[1]>0){
		append(keystonefuncs.healthextensions,function(){
			if(pdmg+mdmg>0){
				if(playertemp.omnishell>0){
					if(willhit){
						append(particles,new createparticle(775,245,random(-2.2,-1.5),0,0,random(-0.08,0.08),'text',"-"+round(min(pdmg+mdmg,playertemp.omnishell)),22,0,255,-4,180,0,180));
					}
					if(pdmg>playertemp.omnishell){
						pdmg-=playertemp.omnishell;
						playertemp.omnishell=0;
					}
					else{
						playertemp.omnishell-=pdmg;
						pdmg=0;
					}
					if(mdmg>playertemp.omnishell){
						mdmg-=playertemp.omnishell;
						playertemp.omnishell=0;
					}
					else{
						playertemp.omnishell-=mdmg;
						mdmg=0;
					}
				}
			}
		});
		append(keystonefuncs.passives,function(){
			if(!(playertemp.omnishell)){
				playertemp.omnishell=0;
			}
			if(player.keystonepassives[21]>0){
				playertemp.omnishellm=round(player.maxhp/20+player.armor/5+player.res/5+((1+player.keystonepassives[1])*((player.maxhp/50)+((0.9+player.level/10)*(50+player.passives[2])/10))));
				playertemp.omnishell=min(playertemp.omnishellm,playertemp.omnishell+plshr(0.15)/60);
			}
			else{
				playertemp.omnishellm=round((1+player.keystonepassives[1])*((player.maxhp/50)+((0.9+player.level/10)*(50+player.passives[2])/10)));
			}
			if((playertemp.timesincedamagetaken>=240&playertemp.timesincedamagedealt>=240)||player.keystonepassives[9]>0&(playertemp.timesincedamagetaken>=120&playertemp.timesincedamagedealt>=120)){
				playertemp.omnishell=min(playertemp.omnishellm,playertemp.omnishell+round((1+player.keystonepassives[1])*((player.maxhp/50)+(0.9+player.level/10)*(50+player.passives[2])/10))/180);
				if(player.keystonepassives[9]>0){
					playertemp.omnishell=min(playertemp.omnishell,playertemp.omnishell+round((1+player.keystonepassives[1])*((player.maxhp/50)+(0.9+player.level/10)*(50+player.passives[2])/10))/180);
				}
			}
		});
		append(keystonefuncs.overlay,function(){
				if(render){
				if(player.keystonepassives[21]>0){
					fill(140,50,140,120);
				}
				else{
					fill(170,30,170,100);
				}
				rect(825,245,playertemp.omnishell/playertemp.omnishellm*300,30);
				fill(100,0,100);
				textFont(0,15);
				text(round(playertemp.omnishell),1075,252);
				}
		});
	}
}
var dmgstashfc=[0,0];
//======================LOAD TRAITS==========================================
var loadtraits=function(){
	traitfuncs={
		passives:new Array(),
		onhit:new Array(),
		whenhit:new Array(),
		damagedealt:new Array(),
		damagetaken:new Array(),
		damagetakenpm:new Array(),
		damagetakenpa:new Array(),
		healthextensions:new Array(),
		damagedealtpostmit:new Array(),
		overlay:new Array(),
		onkill:new Array(),
		underlay:new Array()
	};
	player.traits=new Array(1000);
	for(i=0;i<equipkey.length;i+=1){
		if(player.inventory[equipkey[i]]){
			if(itemdata[player.inventory[equipkey[i]].id*10+8]){
				for(n=0;n<itemdata[player.inventory[equipkey[i]].id*10+8].length;n+=1){
					if(player.traits[itemdata[player.inventory[equipkey[i]].id*10+8][n][0]]){
						player.traits[itemdata[player.inventory[equipkey[i]].id*10+8][n][0]]+=itemdata[player.inventory[equipkey[i]].id*10+8][n][1];
					}
					else{
						player.traits[itemdata[player.inventory[equipkey[i]].id*10+8][n][0]]=itemdata[player.inventory[equipkey[i]].id*10+8][n][1];
					}
				}
			}
			if(prefixdata[player.inventory[equipkey[i]].prefix*5-1]){
				for(n=0;n<prefixdata[player.inventory[equipkey[i]].prefix*5-1].length;n+=1){
					if(player.traits[prefixdata[player.inventory[equipkey[i]].prefix*5-1][n][0]]){
						player.traits[prefixdata[player.inventory[equipkey[i]].prefix*5-1][n][0]]+=prefixdata[player.inventory[equipkey[i]].prefix*5-1][n][1];
					}
					else{
						player.traits[prefixdata[player.inventory[equipkey[i]].prefix*5-1][n][0]]=prefixdata[player.inventory[equipkey[i]].prefix*5-1][n][1];
					}
				}
			}
			if(suffixdata[player.inventory[equipkey[i]].suffix*5-1]){
				for(n=0;n<suffixdata[player.inventory[equipkey[i]].suffix*5-1].length;n+=1){
					if(player.traits[suffixdata[player.inventory[equipkey[i]].suffix*5-1][n][0]]){
						player.traits[suffixdata[player.inventory[equipkey[i]].suffix*5-1][n][0]]+=suffixdata[player.inventory[equipkey[i]].suffix*5-1][n][1];
					}
					else{
						player.traits[suffixdata[player.inventory[equipkey[i]].suffix*5-1][n][0]]=suffixdata[player.inventory[equipkey[i]].suffix*5-1][n][1];
					}
				}
			}
			if(runedata[player.inventory[equipkey[i]].rune*4-2]){
				for(n=0;n<runedata[player.inventory[equipkey[i]].rune*4-2].length;n+=1){
					if(player.traits[runedata[player.inventory[equipkey[i]].rune*4-2][n][0]]){
						player.traits[runedata[player.inventory[equipkey[i]].rune*4-2]]+=runedata[player.inventory[equipkey[i]].rune*4-2][n][1];
					}
					else{
						player.traits[runedata[player.inventory[equipkey[i]].rune*4-2][n][0]]=runedata[player.inventory[equipkey[i]].rune*4-2][n][1];
					}
				}
			}
		}
	}
	//Hit prevention================
	if(player.traits[38]>0){
		append(traitfuncs.damagetaken,function(){
			if(willhit){
				if(playertemp.timesincedamagetaken>300&random(100)<5*player.traits[38]){
					pdmg=0;
					mdmg=0;
					willhit=0;
					willdamage=0;
					append(dmgind,new cdmgind(playertemp.x+random(-10,10),
					playertemp.y+random(-10,10),
					"Miss",9,150,150,150));
					dmgsound=0;
				}
			}
		});
	}
	if(player.traits[111]>0){
		append(traitfuncs.passives,function(){
			if(!(playertemp.phasedoor)){
				playertemp.phasedoor=0;
			}
			if(playertemp.phasedoor>0){
				playertemp.phasedoor-=1;
			}
		});
		append(traitfuncs.overlay,function(){
			if(playertemp.phasedoor>0){
				noFill();
				stroke(200,0,200,50);
				rectMode(CENTER);
					strokeWeight(50);
					rect(400,350,754,650);
				rectMode(CORNER);
				noStroke();
				fill(200,0,200,playertemp.phasedoor/1.5);
				rect(0,0,800,750);
			}
		});
		append(traitfuncs.damagetaken,function(){
			if(playertemp.phasedoor>0){
				if(!(attacktype=="pure")){
					pdmg=0;
					mdmg=0;
					willhit=0;
					willdamage=0;
				if(willhit){
					append(dmgind,new cdmgind(playertemp.x+random(-10,10),
					playertemp.y+random(-10,10),
					"Miss",9,150,150,150));
					dmgsound=0;
				}
				}
			}
		});
		append(traitfuncs.damagedealt,function(){
			if(playertemp.phasedoor>0){
				pdmg=0;
				mdmg=0;
				willhit=0;
				willdamage=0;
			}
		});
	}
	//Source damage===============
	if(player.traits[58]>0){
		append(traitfuncs.damagetaken,function(){
			if(willhit){
				if(attacktype=="melee"){
					stemp=(spdmg+smdmg)*player.traits[58]/100;
					if(player.traits[118]>0){
						stemp+=plsar(1);
					}
					append(stateffects,{name:'thorn',target:attacker,damage:stemp,run:function(){
						damage("enemies",stateffects[n].target,stateffects[n].damage,0,0,0,"generic","player",0);
						stateffects.splice(n,1);
						n-=1;
					}
					});
				}
			}
		});
	}
	if(player.traits[59]>0){
		append(traitfuncs.damagetaken,function(){
			if(willhit){
				if(attacktype=="ranged"){
					stemp=(spdmg+smdmg)*player.traits[59]/100;
					if(player.traits[118]>0){
						stemp+=plsar(1);
					}
					append(stateffects,{name:'reflec',target:attacker,damage:stemp,run:function(){
						damage("enemies",stateffects[n].target,stateffects[n].damage,0,0,0,"generic","player",0);
						stateffects.splice(n,1);
						n-=1;
					}
					});
				}
			}
		});
	}
	//% mods and hit effects===============
	if(player.traits[11]>0){
		append(traitfuncs.damagetaken,function(){
			if(willhit){
				for(h=0;h<player.traits[11];h+=1){
					append(objects,{
						type:'projectile',
						sprite:projectiles[5],
						target:'enemy',
						size:14,
						speed:2,
						duration:45,
						sound:sfx.arrowhit,
						dir:random(0,2*PI),
						x:playertemp.x,
						y:playertemp.y,
						pdmgmin:0,
						pdmgmax:0,
						mdmgmin:(plsin(1))*7,
						mdmgmax:(plsin(1))*8,
						armorE:1,
						resE:0.8,
						procc:0.3,
						hits:new Array(999)
					});
				}
			}
		});
	}
	if(player.traits[1]>0){
		append(traitfuncs.damagetaken,function(){
			pdmg*=1-(0.135+player.traits[1]*0.015);
			mdmg*=1-(0.135+player.traits[1]*0.015);
		});
	}
	if(player.traits[113]>0){
		append(traitfuncs.damagetakenpa,function(){
			pdmg*=1-(0.27+player.traits[113]*0.03);
			mdmg*=1-(0.27+player.traits[113]*0.03);
		});
	}
	if(player.traits[69]>0){
		append(traitfuncs.damagetaken,function(){
			if(willhit){
				if(attacktype=="ranged"){
					pdmg*=1.15;
					mdmg*=1.15;
				}
				if(attacktype=="melee"){
					pdmg*=1-(0.17+player.traits[69]*0.03);
					mdmg*=1-(0.17+player.traits[69]*0.03);
				}
			}
		});
	}
	if(player.traits[70]>0){
		append(traitfuncs.damagetaken,function(){
			if(willhit){
				if(attacktype=="melee"){
					pdmg*=1.15;
					mdmg*=1.15;
				}
				if(attacktype=="ranged"){
					pdmg*=1-(0.17+player.traits[70]*0.03);
					mdmg*=1-(0.17+player.traits[70]*0.03);
				}
			}
		});
	}
	if(player.traits[71]>0){
		append(traitfuncs.damagetaken,function(){
			if(armorE>0){
				pdmg*=1-(player.traits[71]*0.01);
			}
		});
	}
	if(player.traits[100]>0){
		append(traitfuncs.damagetaken,function(){
			if(armorE>0){
				pdmg*=1-(0.08+player.traits[100]*0.02);
			}
		});
	}
	if(player.traits[101]>0){
		append(traitfuncs.damagetaken,function(){
			if(resE>0){
				mdmg*=1-(0.08+player.traits[101]*0.02);
			}
		});
	}
	if(player.traits[102]>0){
		append(traitfuncs.damagetaken,function(){
			if(pdmg>0&armorE<=0){
				pdmg*=1-(0.08+player.traits[102]*0.02);
			}
			if(mdmg>0&resE<=0){
				mdmg*=1-(0.08+player.traits[102]*0.02);
			}
		});
	}
	if(player.traits[97]>0){
		append(traitfuncs.damagetaken,function(){
			if(gametick%300<150){
				if(resE>0){
					mdmg*=1.7-(player.traits[97]*0.1);
				}
				if(armorE>0){
					pdmg=0;
				}
			}
			else{
				if(armorE>0){
					pdmg*=1.7-(player.traits[97]*0.1);
				}
				if(resE>0){
					mdmg=0;
				}
			}
		});
		append(traitfuncs.passives,function(){
			if(gametick%300<150){
				strokeWeight(9);
				stroke(200,200,30,180);
				noFill();
				translate(400,350);
				rotate(tick/10/PI);
				rect(-19,-19,38,38);
				noStroke();
				resetMatrix();
			}
			else{
				fill(150,0,150,100+abs(tick%90-45)*1.5);
				ellipse(400,350,33,33);
			}
		});
	}
	if(player.traits[72]>0){
		append(traitfuncs.damagetaken,function(){
			if(resE>0){
				mdmg*=1-(player.traits[72]*0.01);
			}
		});
	}
	if(player.traits[7]>0){
		append(traitfuncs.damagetaken,function(){
			pdmg*=1-(1-min(player.hp/(plshp(1)),1))*(player.traits[7]/100);
			mdmg*=1-(1-min(player.hp/(plshp(1)),1))*(player.traits[7]/100);
		});
	}
	if(player.traits[2]>0){
		append(traitfuncs.damagetaken,function(){
			pdmg*=1.15;
			mdmg*=1.15;
		});
	}

	if(player.traits[79]>0){
		append(traitfuncs.damagedealt,function(){
			if(attacktype=="DoT"){
				pdmg*=1+player.traits[79]*0.01;
				mdmg*=1+player.traits[79]*0.01;
			}
		});
	}
	if(player.traits[1]>0){
		append(traitfuncs.damagedealt,function(){
			pdmg*=0.9;
			mdmg*=0.9;
		});
	}
	if(player.traits[2]>0){
		append(traitfuncs.damagedealt,function(){
			pdmg*=1.18+player.traits[2]*0.02;
			mdmg*=1.18+player.traits[2]*0.02;
		});
	}
	if(player.traits[104]>0){
		append(traitfuncs.damagedealt,function(){
			if(gametick%900<300&armorE>0){
				pdmg*=1.22+player.traits[104]*0.03;
			}
			if(gametick%900<600&gametick%900>=300&resE>0){
				mdmg*=1.22+player.traits[104]*0.03;
			}
			if(gametick%900>=600&gametick%900<780){
				pdmg*=1.22+player.traits[104]*0.03;
				mdmg*=1.22+player.traits[104]*0.03;
			}
		});
		append(traitfuncs.overlay,function(){
			if(gametick%900<300){
				noFill();
				strokeWeight(20);
				stroke(255,200,0,20);
				rect(0,0,800,700);
				noStroke();
				
			}
			if(gametick%900<600&gametick%900>=300){
				noFill();
				strokeWeight(20);
				stroke(180,0,180,20);
				rect(0,0,800,700);
				noStroke();
			}
			if(gametick%900>=600&gametick%900<780){
				noFill();
				strokeWeight(20);
				stroke(0,255,0,20);
				rect(0,0,800,700);
				noStroke();
			}
		});
	}
	if(player.traits[98]>0){
		append(traitfuncs.damagedealt,function(){
			if(willhit&random(100)<player.traits[98]){
				if(player.traits[99]>0){
					pdmg*=2+player.traits[99]/100;
					mdmg*=2+player.traits[99]/100;
				}
				else{
					pdmg*=2;
					mdmg*=2;
				}
			}
		});
	}
	if(player.traits[28]>0){
		append(traitfuncs.damagetaken,function(){
			if(willhit){
				if(playertemp.timesincehittaken>600/(1+player.traits[28]/5)){
					pdmg=0;
					mdmg=0;
					willdamage=0;
					append(dmgind,new cdmgind(playertemp.x+random(-10,10),
					playertemp.y+random(-10,10),
					"Blocked",10,150,150,255));
					if(options.loadAudio){sfx.glacialwardshatter.play();}
					dmgsound=0;
				}
			}
		});
		append(traitfuncs.passives,function(){if(render){
				if(playertemp.timesincehittaken>60+600/(1+player.traits[28]/5)){
					ellipseMode(CENTER);
					strokeWeight(10);
					noFill();
					stroke(170,170,255,150+abs(tick%120-60)*1.5);
					ellipse(400,350,35,35);
					noStroke();
				}
				else{
					if(playertemp.timesincehittaken==round(600/(1+player.traits[28]/5))){
						if(options.loadAudio){sfx.glacialwardcharge.play();}
					}
					ellipseMode(CENTER);
					strokeWeight(10);
					noFill();
					stroke(170,170,255,(playertemp.timesincehittaken-600/(1+player.traits[28]/5))*2.5);
					ellipse(400,350,35,35);
					noStroke();
		}}
		});
	}
	if(player.traits[30]>0){
		append(traitfuncs.passives,function(){
			if(!(playertemp.matrixarmor)){
				playertemp.matrixarmor=0;
			}
			if(!(playertemp.matrixarmort)){
				playertemp.matrixarmort=0;
			}
			if(playertemp.matrixarmort>0){
				playertemp.matrixarmort-=1;
			}
			else if(playertemp.matrixarmor>0){
				playertemp.armor-=0.02*playertemp.matrixarmor;
				playertemp.res-=0.02*playertemp.matrixarmor;
				playertemp.matrixarmor=0;
			}
			if(render){
				translate(400,350);
				rotate(tick/120);
				if(playertemp.matrixarmort>120){
					fill(60,180,240,150+abs(tick%200-100));
				}
				else if(playertemp.matrixarmort>30){
					fill(270-playertemp.matrixarmort*1.5,playertemp.matrixarmort*1.5,playertemp.matrixarmort*2,150+abs(tick%200-100));
				}
				else{
					fill(270-playertemp.matrixarmort*1.5,playertemp.matrixarmort*1.5,playertemp.matrixarmort*2,playertemp.matrixarmort*6.5);
				}
				for(stf=0;stf<playertemp.matrixarmor;stf+=1){
					rotate(PI*2/playertemp.matrixarmor);
					rect(-5,abs(tick%100-50)/10-22.5,6,5);
				}
				resetMatrix();
			}
		});
		append(traitfuncs.damagetaken,function(){
			pdmg*=1-min(0.5,playertemp.matrixarmor*0.005*player.traits[30]);
			mdmg*=1-min(0.5,playertemp.matrixarmor*0.005*player.traits[30]);
			if(willhit){
					playertemp.matrixarmort=480;
				if(playertemp.matrixarmor<10){
					playertemp.matrixarmor+=1;
					playertemp.armor+=0.02;
					playertemp.res+=0.02;
	}}});
	}
	if(player.traits[112]>0){
		append(traitfuncs.passives,function(){
			if(!(playertemp.specterscowl)){
				playertemp.specterscowl=0;
			}
			if(!(playertemp.specterscowl)&playertemp.timesincedamagetaken<=180){
				playertemp.specterscowl=1;
				playertemp.hpregen+=0.2;
			}
			if(playertemp.specterscowl&playertemp.timesincedamagetaken>180){
				playertemp.specterscowl=0;
				playertemp.hpregen-=0.2;
			}
		});
	}
	if(player.traits[31]>0){
		append(traitfuncs.damagetaken,function(){
			if(willhit){
				playertemp.mpregen+=0.02+player.traits[31]*0.03;
				append(stateffects,{name:'entropy',pow:0.02+player.traits[31]*0.03,x:random(-15,15),y:random(-15,15),tick:0,run:function(){
						if(render){translate(400,350);
						fill(stateffects[n].tick/4,stateffects[n].tick/4,stateffects[n].tick,340-stateffects[n].tick);
						ellipse(stateffects[n].x,stateffects[n].y,4,4);
						resetMatrix();}
					if(stateffects[n].tick>=300){
						playertemp.mpregen-=stateffects[n].pow;
						stateffects.splice(n,1);
						n-=1;
					}
				}
				});
			}
		});
	}
	if(player.traits[33]>0){
		append(traitfuncs.damagetaken,function(){
			if(attacktype=="DoT"){
				if(getbuffind(7)>=0){
					pdmg=0;
					mdmg=0;
					willdamage=0;
				}
			}
		});
	}
	if(player.traits[88]>0){
		append(traitfuncs.damagetaken,function(){
			if(pdmg>0&armorE<=0){
				pdmg/=100;
			}
			if(mdmg>0&resE<=0){
				mdmg/=100;
			}
		});
	}
	if(player.traits[80]>0){
		append(traitfuncs.damagetaken,function(){
			if(attacktype=="DoT"){
				pdmg*=1-player.traits[80]*0.01;
				mdmg*=1-player.traits[80]*0.01;
			}
		});
	}
	if(player.traits[37]>0){
		append(traitfuncs.damagedealt,function(){
			pdmg*=1+player.traits[37]*0.02;
		});
	}
	if(player.traits[38]>0){
		append(traitfuncs.passives,function(){if(render){
				if(playertemp.timesincedamagetaken>300){
					translate(400,350);
					rotate((tick%120)*2*PI/120);
					ellipseMode(CENTER);
					strokeWeight(4);
					noFill();
					stroke(170+abs(tick%120-60)*1.2,170+abs(tick%90-45)*1.6,255+abs(tick%60-30)*2.4,150);
					ellipse(0,16,10,10);
					ellipse(0,-16,10,10);
					ellipse(16,0,10,10);
					ellipse(-16,0,10,10);
					noStroke();
					resetMatrix();
		}}
		});
		append(traitfuncs.damagedealt,function(){
			if(playertemp.timesincedamagetaken>300){
				pdmg*=1+player.traits[38]*0.03;
				mdmg*=1+player.traits[38]*0.03;
			}
		});
	}
	if(player.traits[84]>0){
		append(traitfuncs.damagetaken,function(){
			if(pdmg>0&armorE<=0){
				pdmg*=0.6;
			}
			if(mdmg>0&resE<=0){
				mdmg*=0.6;
			}
			pdmg*=0.9;
			mdmg*=0.9;
		});
	}
	///////////POST DAMAGE % MODIFIERS===============================
	if(player.traits[9]>0){
		append(traitfuncs.damagedealtpostmit,function(){
			if(willhit){
				heal((pdmg+mdmg)*(player.traits[9]*0.01),"leech");
			}
			else{
				heal((pdmg+mdmg)*(player.traits[9]*0.01),"LoT");
			}
		});
	}
	if(player.traits[26]>0){
		append(traitfuncs.damagedealtpostmit,function(){
			if((pdmg+mdmg)>=enemies[index].mhp/5&willhit){
				append(particles,new createparticle(enemies[index].x,enemies[index].y,0,0,0,0,'circle','',50,3,255,-13,0,0,0,1));
				append(objects,{
					type:'AoE',
					target:'enemy',
					size:60,
					duration:0,
					rangetype:"generic",
					sound:sfx.obliteration,
					x:enemies[index].x,
					y:enemies[index].y,
					pdmgmin:((plsst(1))+(plsin(1)))*1.5*(1+player.traits[26]),
					pdmgmax:((plsst(1))+(plsin(1)))*2*(1+player.traits[26]),
					mdmgmin:0,
					mdmgmax:0,
					armorE:0,
					resE:1,
					procc:0.08,
					hits:new Array(999)
				});
			}
		});
	}
	if(player.traits[36]>0){
		append(traitfuncs.damagedealtpostmit,function(){
			if(pdmg>0&!(attacktype=="DoT")){
				if(!(enemies[index].dots)){
					enemies[index].dots=new Array();
				}
				append(enemies[index].dots,{
					pdmg:pdmg*player.traits[36]/6000*(enemies[index].lv+9)/0.5,
					mdmg:0,
					armorE:0,
					resE:0,
					dur:300
				});
			}
		});
	}
	if(player.traits[37]>0){
		append(traitfuncs.damagetaken,function(){
			if(willhit){
				pdmg=max(pdmg*0.3,pdmg-player.str/100*player.traits[37]);
				mdmg=max(mdmg*0.4,mdmg-player.str/100*player.traits[37]);
			}
		});
	}
	if(player.traits[73]>0){
		append(traitfuncs.damagedealtpostmit,function(){
			if(willhit){
				if(playertemp.action.name=="mace of spades"){
					if(hits<2){
						stemp=1;
					}
					else{
						stemp=0.5;
					}
					if(getbuffind(12)>=0){
						playertemp.buffs[getbuffind(12)].pow+=mdmg/4*stemp;
						playertemp.buffs[getbuffind(12)].dur=999;
						if(playertemp.buffs[getbuffind(12)].pow>(plshp(1))*(0.2+0.2*player.traits[73])){
							playertemp.buffs[getbuffind(12)].pow=(plshp(1))*(0.2+0.2*player.traits[73]);	
						}
					}
					else{
						buff(12,999,mdmg/4*stemp);
					}
				}
				else if(playertemp.action.name=="siphon of harvesting"){
					if(getbuffind(12)>=0){
						playertemp.buffs[getbuffind(12)].pow+=mdmg/4;
						playertemp.buffs[getbuffind(12)].dur=999;
						if(playertemp.buffs[getbuffind(12)].pow>(plshp(1))*(0.2+0.2*player.traits[73])){
							playertemp.buffs[getbuffind(12)].pow=(plshp(1))*(0.2+0.2*player.traits[73]);	
						}
					}
					else{
						buff(12,999,mdmg/4);
					}
				}
			}
		});
	}
	//Standard damage functions======
	append(traitfuncs.damagetaken,function(){
	findbuff(4);
		if(buffind>=0){
			pdmg=0;
		}
		findbuff(5);
		if(buffind>=0){
			mdmg=0;
		}
		pdmg*=dmgmultbr;
		mdmg*=dmgmultbr;
		dmgstashfc=[pdmg,mdmg];
			pdmg=max(pdmg/10,pdmg-(plsar(1))*armorE/10);
			mdmg=max(mdmg/10,mdmg-(plsre(1))*resE/10);
		if(player.traits[87]>0){
			pdmg=max(pdmg/10,pdmg-(player.traits[87]*0.002-0.001)*((plsar(1))*armorE-dmgstashfc[0])/10);
			mdmg=max(mdmg/10,mdmg-(player.traits[87]*0.002-0.001)*((plsre(1))*resE-dmgstashfc[1])/10);
		}
});
	//=====POST MIT============
	if(player.traits[88]>0){
		append(traitfuncs.damagetaken,function(){
			pdmg*=1.65-player.traits[88]*0.05;
			mdmg*=1.65-player.traits[88]*0.05;
		});
	}
		//Damage absorbtion===============
		if(pdmg<0){
			pdmg=0;
		}
		if(mdmg<0){
			mdmg=0;
		}
	if(player.traits[91]>0){
		append(traitfuncs.passives,function(){
			if(!(playertemp.bswordc)){
				playertemp.bswordc=0;
			}
			if(!(playertemp.bswordct)){
				playertemp.bswordct=0;
			}
			if(playertemp.bswordc>0){
				playertemp.bswordct-=1;
				if(playertemp.bswordct<=0){
					playertemp.bswordc=0;
				}
			}
			
		});
		append(traitfuncs.damagetaken,function(){
		if(playertemp.fortify>0){
			if(player.traits[39]>0){
				pdmg*=0.7-min(10,player.traits[39])/50;
				mdmg*=0.7-min(10,player.traits[39])/50;
			}
			else{
				pdmg*=0.7;
				mdmg*=0.7;
			}
		}
		if(playertemp.action.name=='defend'){
			if(player.traits[40]>0){
				pdmg*=1-min(10,player.traits[40])*0.03;
				mdmg*=1-min(10,player.traits[40])*0.03;
			}
			if(willhit&playertemp.guard>pdmg+mdmg){
				playertemp.action.proc=1;
			}
			if(willhit||player.traits[93]>0){
				if(playertemp.guard>pdmg){
					playertemp.guard-=pdmg;
					if(player.traits[116]>0){
						if(player.traits[40]>0){
							if(willhit){
								heal(pdmg*(0.1+min(10,player.traits[40])/100),"direct");
							}
							else{
								heal(pdmg*(0.1+min(10,player.traits[40])/100),"HoT");
							}
						}
						else{
							if(willhit){
								heal(pdmg*0.1,"direct");
							}
							else{
								heal(pdmg*0.1,"HoT");
							}
						}
					}
					pdmg=0;
				}
				else{
					pdmg-=playertemp.guard;
					if(player.traits[116]>0){
						if(player.traits[40]>0){
							if(willhit){
								heal(playertemp.guard*(0.1+min(10,player.traits[40])/100),"direct");
							}
							else{
								heal(playertemp.guard*(0.1+min(10,player.traits[40])/100),"HoT");
							}
						}
						else{
							if(willhit){
								heal(playertemp.guard*0.1,"direct");
							}
							else{
								heal(playertemp.guard*0.1,"HoT");
							}
						}
					}
					playertemp.guard=0;
				}
				if(playertemp.guard>mdmg){
					playertemp.guard-=mdmg;
					if(player.traits[116]>0){
						if(player.traits[40]>0){
							if(willhit){
								heal(mdmg*(0.1+min(10,player.traits[40])/100),"direct");
							}
							else{
								heal(mdmg*(0.1+min(10,player.traits[40])/100),"HoT");
							}
						}
						else{
							if(willhit){
								heal(mdmg*0.1,"direct");
							}
							else{
								heal(mdmg*0.1,"HoT");
							}
						}
					}
					mdmg=0;
				}
				else{
					mdmg-=playertemp.guard;
					if(player.traits[116]>0){
						if(player.traits[40]>0){
							if(willhit){
								heal(playertemp.guard*(0.1+min(10,player.traits[40])/100),"direct");
							}
							else{
								heal(playertemp.guard*(0.1+min(10,player.traits[40])/100),"HoT");
							}
						}
						else{
							if(willhit){
								heal(playertemp.guard*0.1,"direct");
							}
							else{
								heal(playertemp.guard*0.1,"HoT");
							}
						}
					}
					playertemp.guard=0;
				}
				if(willhit&options.loadAudio){
					if(pdmg+mdmg>0){
						sfx.block.play();
					}
					else{
						sfx.fullblock.play();
						dmgsound=0;
					}
				}
			}
		}
		else if(player.traits[94]>0&random(1)<=playertemp.guard/((plshp(1))*(player.traits[91]/100)+playertemp.guardmb)+player.traits[94]/10+(0.2*(max(0,player.speed-2)))-1){
			if(willhit){
				if(playertemp.guard>pdmg){
					playertemp.guard-=pdmg;
					if(player.traits[116]>0){
						if(player.traits[40]>0){
							if(willhit){
								heal(pdmg*(0.1+min(10,player.traits[40])/100),"direct");
							}
							else{
								heal(pdmg*(0.1+min(10,player.traits[40])/100),"HoT");
							}
						}
						else{
							if(willhit){
								heal(pdmg*0.1,"direct");
							}
							else{
								heal(pdmg*0.1,"HoT");
							}
						}
					}
					pdmg=0;
				}
				else{
					pdmg-=playertemp.guard;
					if(player.traits[116]>0){
						if(player.traits[40]>0){
							if(willhit){
								heal(playertemp.guard*(0.1+min(10,player.traits[40])/100),"direct");
							}
							else{
								heal(playertemp.guard*(0.1+min(10,player.traits[40])/100),"HoT");
							}
						}
						else{
							if(willhit){
								heal(playertemp.guard*0.1,"direct");
							}
							else{
								heal(playertemp.guard*0.1,"HoT");
							}
						}
					}
					playertemp.guard=0;
				}
				if(playertemp.guard>mdmg){
					playertemp.guard-=mdmg;
					if(player.traits[116]>0){
						if(player.traits[40]>0){
							if(willhit){
								heal(mdmg*(0.1+min(10,player.traits[40])/100),"direct");
							}
							else{
								heal(mdmg*(0.1+min(10,player.traits[40])/100),"HoT");
							}
						}
						else{
							if(willhit){
								heal(mdmg*0.1,"direct");
							}
							else{
								heal(mdmg*0.1,"HoT");
							}
						}
					}
					mdmg=0;
				}
				else{
					mdmg-=playertemp.guard;
					if(player.traits[116]>0){
						if(player.traits[40]>0){
							if(willhit){
								heal(playertemp.guard*(0.1+min(10,player.traits[40])/100),"direct");
							}
							else{
								heal(playertemp.guard*(0.1+min(10,player.traits[40])/100),"HoT");
							}
						}
						else{
							if(willhit){
								heal(playertemp.guard*0.1,"direct");
							}
							else{
								heal(playertemp.guard*0.1,"HoT");
							}
						}
					}
					playertemp.guard=0;
				}
				if(options.loadAudio){
					if(pdmg+mdmg>0){
						sfx.block.play();
					}
					else{
						sfx.fullblock.play();
						dmgsound=0;
					}
				}
			}
		}
		});
	}
	if(player.traits[73]>0){
		append(traitfuncs.damagetaken,function(){
			if(getbuffind(12)>=0){
				if(pdmg>playertemp.buffs[getbuffind(12)].pow){
					pdmg-=playertemp.buffs[getbuffind(12)].pow;
					playertemp.buffs[getbuffind(12)].pow=0;
				}
				else{
					playertemp.buffs[getbuffind(12)].pow-=pdmg;
					pdmg=0;
				}
				if(mdmg>playertemp.buffs[getbuffind(12)].pow){
					mdmg-=playertemp.buffs[getbuffind(12)].pow;
					playertemp.buffs[getbuffind(12)].pow=0;
				}
				else{
					playertemp.buffs[getbuffind(12)].pow-=mdmg;
					mdmg=0;
				}
			}
		});
	}
	//=========HEALTH EXTENTIONS=============
	if(player.traits[12]>0){
		append(traitfuncs.healthextensions,function(){
			if(pdmg+mdmg>0){
				if(playertemp.energyshield>0){
					if(willhit&pdmg+mdmg<playertemp.energyshield*20){
						append(particles,new createparticle(775,240,-2,0,0,-0.1,'text',"-"+round(min(pdmg+mdmg,playertemp.energyshield)),22,0,255,-4,110,110,255));
					}
					if(pdmg>playertemp.energyshield){
						pdmg-=playertemp.energyshield;
						playertemp.energyshield=0;
					}
					else{
						playertemp.energyshield-=pdmg;
						pdmg=0;
					}
					if(mdmg>playertemp.energyshield){
						mdmg-=playertemp.energyshield;
						playertemp.energyshield=0;
					}
					else{
						playertemp.energyshield-=mdmg;
						mdmg=0;
					}
				}
			}
		});
		append(traitfuncs.passives,function(){
			if(!(playertemp.energyshield)){
				playertemp.energyshield=0;
			}
			playertemp.energyshield=min(((plshp(1))*0.004+(plsre(1))*0.05)*player.traits[12],playertemp.energyshield+((plshr(1))*0.008+(plsre(1))*0.0008)*player.traits[12]/60);
			if(player.traits[40]>0){
				playertemp.energyshield=min(((plshp(1))*0.004+(plsre(1))*0.05)*player.traits[12],playertemp.energyshield+((plshr(1))*0.008+(plsre(1))*0.0008)*player.traits[12]*(min(480,playertemp.timesincedamagetaken*(1+min(10,player.traits[40])/10))/120)/60);
			}
			else{
				playertemp.energyshield=min(((plshp(1))*0.004+(plsre(1))*0.05)*player.traits[12],playertemp.energyshield+((plshr(1))*0.008+(plsre(1))*0.0008)*player.traits[12]*(min(480,playertemp.timesincedamagetaken)/120)/60);
			}
		});
		append(traitfuncs.overlay,function(){
				if(render){
				fill(60+abs(tick%200-100)/2,60+abs(tick%200-100)/2,255);
				rect(825,245,playertemp.energyshield/(((plshp(1))*0.004+(plsre(1))*0.05)*player.traits[12])*300,5+player.traits[12]/5);
				}
		});
	}
	//Passives================================
	if(player.traits[103]>0){
		append(traitfuncs.passives,function(){
			if(player.traits[12]>4){
				if(gametick%240==0){
					playertemp.energising=((plshp(1))*0.004+(plsre(1))*0.05*player.traits[12]-playertemp.energyshield)*(0.18+player.traits[103]*0.02);
				}
				if(gametick%240<60){
					playertemp.energyshield=min(((plshp(1))*0.004+(plsre(1))*0.05)*player.traits[12],playertemp.energyshield+playertemp.energising/60);
					if(playertemp.energyshield<(plshp(1))*0.004+(plsre(1))*0.05*player.traits[12]&tick%6==0){
						append(particles,new createparticle(random(385,415),random(335,365),0,0,0,0,'circle','',10,-0.3,255,-15,130,130,255));
					}
				}
			}
			else{
				if(gametick%240==0){
				shield(((plshp(1))*0.0032+(plsre(1))*0.004),240);
				}
			}
		});
	}
	if(player.traits[35]>0){
		append(traitfuncs.passives,function(){
			heal(((plshr(1))/60*(1-(min(player.hp/(plshp(1)),1))))*player.traits[35]/20,"regeneration");
		});
	}
	if(player.traits[75]>0){
		append(traitfuncs.passives,function(){
			stemp=[playertemp.x+random(-1300,1300),playertemp.y+random(-1300,1300)];
			if(stemp[0]-playertemp.x>420||stemp[0]-playertemp.x<-420||stemp[1]-playertemp.y<-370||stemp[1]-playertemp.y>370){
				append(stateffects,{name:'mana orb',x:stemp[0],y:stemp[1],tick:0,run:function(){
					if(stateffects[n].x-playertemp.x<400&stateffects[n].x-playertemp.x>-400&stateffects[n].y-playertemp.y>-400&stateffects[n].y-playertemp.y<400){
						stateffects[n].tick-=0.95;
						if(render){fill(150+abs(tick%180-90)*0.5,abs(tick%100-50)*3,150+abs(tick%180-90)*1.1,240-stateffects[n].tick*8);
						ellipseMode(CENTER);
						ellipse(400+stateffects[n].x-playertemp.x,350+stateffects[n].y-playertemp.y,15,15);}
						if(pow(playertemp.x-stateffects[n].x,2)+pow(playertemp.y-stateffects[n].y,2)<pow(12+player.size,2)){
							player.mp+=(3.5+1.5*player.traits[75])*(plsmr(1));
							stateffects[n].tick=999;
						}
					}
					if(stateffects[n].tick>=30){
						stateffects.splice(n,1);
						n-=1;
					}
				}});
			}
		});
	}
	if(player.traits[63]>0){
		append(traitfuncs.passives,function(){
			if(playertemp.timesincedamagetaken>=120){
				heal(player.intel/6000*player.traits[63]*(1+min(1,playertemp.timesincedamagetaken-120/120)),"regeneration");
				if(render){ellipseMode(CENTER);
				fill(150,0,150,(tick%60)*2);
				ellipse(400,350,60-tick%60,60-tick%60);}
			}
		});
	}
	if(player.traits[24]>0){
		append(traitfuncs.passives,function(){
		if(player.hp>(plshp(1))){
			player.hp-=((player.hp-(plshp(1))))/40/player.traits[24];
		}
		});
	}
	if(player.traits[27]>0){
		append(traitfuncs.passives,function(){
		if(playertemp.timesincedamagetaken>=240){
			if(tick%10==0){
				append(particles,new createparticle(random(385,415),random(335,365),0,0,0,0,'circle','',10,-0.3,255,-15,100,190,0));
			}
			heal((plshp(1))/1000,"regeneration");
		}
		});
	}
	if(player.traits[32]>0){
		append(traitfuncs.passives,function(){
			if(!(playertemp.indestructible)){
				playertemp.indestructible=0;
			}
			if(!(playertemp.indestructiblea)){
				playertemp.indestructiblea=0;
			}
			if(playertemp.indestructible>0){
				playertemp.indestructible-=1;
			}
			if(playertemp.indestructiblea>0){
				playertemp.indestructiblea-=1;
				fill(120,120,220,50+playertemp.indestructiblea*3);
				ellipse(400,350,20+playertemp.indestructiblea/4/player.traits[32],20+playertemp.indestructiblea/4/player.traits[32]);
			}
		});
		append(traitfuncs.overlay,function(){
			if(playertemp.indestructible<=0){
				ellipseMode(CENTER);
				fill(150,150,150);
				ellipse(808,255,10,10);
				fill(0,0,255);
				ellipse(808,255,6,6);
			}
		});
	}
	if(player.traits[66]>0){
		append(traitfuncs.passives,function(){
			if(getbuffind(9)>=0){
				if(playertemp.buffs[getbuffind(9)].pow>=30){
					playertemp.buffs[getbuffind(9)].pow-=30;
					stemp=[random(-70,70),random(-70,70)];
					append(particles,new createparticle(stemp[0]+playertemp.x,stemp[1]+playertemp.y,0,0,0,0,'circle','',60,3,255,-13,100,0,100,1));
					append(objects,{
						type:'AoE',
						target:'enemy',
						size:90,
						duration:0,
						rangetype:"ranged",
						sound:sfx.obliteration,
						x:stemp[0]+playertemp.x,
						y:stemp[1]+playertemp.y,
						hitc:0,
						pdmgmin:0,
						pdmgmax:0,
						mdmgmin:((plsin(1)))*13*(0.6+player.traits[66]*0.4),
						mdmgmax:((plsin(1)))*15*(0.6+player.traits[66]*0.4),
						armorE:1,
						resE:1,
						procc:0.6,
						hits:new Array(999),
						endfunc:function(){
							player.mp+=min(15,objects[n].hitc*5);
						}
					});
				}
			}
		});
	}
	if(player.traits[105]>0){
		append(traitfuncs.passives,function(){
			if(!(playertemp.eldritch)){
				playertemp.eldritch=0;
			}
			if(playertemp.eldritch>=100){
				playertemp.eldritch-=100;
				if(options.loadAudio){sfx.eldritch.play();}
				
				append(stateffects,{name:'eldritch',hits:0,x:playertemp.x,y:playertemp.y,hit:new Array(1000),tick:0,run:function(){
					if(render){
					stroke(0,0,10,255-stateffects[n].tick*2);
					noFill();
					strokeWeight(20+stateffects[n].tick/3);
					ellipseMode(CENTER);
					ellipse(400+stateffects[n].x-playertemp.x,350+stateffects[n].y-playertemp.y,1+stateffects[n].tick*5,1+stateffects[n].tick*5);
					noStroke();
					}
					for(b=0;b<enemies.length;b+=1){
						if(!(stateffects[n].hit[b])){
							if(pow(enemies[b].x-stateffects[n].x,2)+pow(enemies[b].y-stateffects[n].y,2)<pow(3+stateffects[n].tick*2.5+enemies[b].size,2)){
								stateffects[n].hit[b]=1;
								stateffects[n].hits+=1;
								damage("enemies",b,0,random((plsin(1))*50,(plsin(1))*55),1,1,"ranged","player",3);
							}
						}
					}
					if(stateffects[n].tick>=120){
						if(stateffects[n].hits>0){
							player.mp+=min(20,stateffects[n].hits*(1+player.traits[105]*2));
						}
						stateffects.splice(n,1);
						n-=1;
					}
				}});
			}
		});
		append(traitfuncs.overlay,function(){
			if(render){
				fill(200,200,255);
				rect(825,365,300,7);
				if(playertemp.eldritch){
					if(playertemp.eldritch>0){
						fill(0,0,0);
						rect(825,365,playertemp.eldritch*3,7);
					}
				}
			}
		});
	}
	if(player.traits[67]>0){
		append(traitfuncs.passives,function(){
			if(getbuffind(10)>=0){
				if(render){noFill();
				strokeWeight(12);
				stroke(50+playertemp.buffs[getbuffind(10)].pow/((plshp(1)))*180,50+playertemp.buffs[getbuffind(10)].pow/((plshp(1)))*110,50,20+playertemp.buffs[getbuffind(10)].pow/((plshp(1)))*310);
				ellipseMode(CENTER);
				ellipse(400,350,25,25);
				noStroke();}
				if(playertemp.buffs[getbuffind(10)].pow>=(plshp(1))||playertemp.buffs[getbuffind(10)].dur<3){
					append(particles,new createparticle(400,350,0,0,0,0,'circle','',80,4,255,-13,180,180,0));
					if(options.loadAudio){sfx.bomb.play();}
					append(objects,{
						type:'AoE',
						target:'enemy',
						size:120,
						duration:0,
						rangetype:"ranged",
						sound:sfx.obliteration,
						x:playertemp.x,
						y:playertemp.y,
						pdmgmin:0,
						pdmgmax:0,
						mdmgmin:(playertemp.buffs[getbuffind(10)].pow)*0.9*10,
						mdmgmax:(playertemp.buffs[getbuffind(10)].pow)*1.1*10,
						armorE:1,
						resE:1,
						procc:0,
						hits:new Array(999)
					});
					removebuff(getbuffind(10));
				}
			}
		});
	}
	if(player.traits[73]>0){
		append(traitfuncs.passives,function(){
			if(getbuffind(12)>=0){
				stemp=getbuffind(12);
				if(playertemp.buffs[stemp].dur<819){
					if(playertemp.buffs[stemp].dur<699){
						playertemp.buffs[stemp].dur=698;
					}
					if(playertemp.buffs[stemp].pow>((plsin(1))*2+(plshp(1)))*(0.2+0.2*player.traits[73])/4){
						playertemp.buffs[stemp].pow-=nmelvsc(player.level)/6;
						if(playertemp.buffs[stemp].pow<((plsin(1))*2+(plshp(1)))*(0.2+0.2*player.traits[73])/4){
							playertemp.buffs[stemp].pow=((plsin(1))*2+(plshp(1)))*(0.2+0.2*player.traits[73])/4;
						}
					}
				}
				if(render){fill(170,170,200);
				rect(825,240,(playertemp.buffs[stemp].pow)/(((plsin(1))*2+(plshp(1)))*(0.2+0.2*player.traits[73]))*300,10);}
			}
		});
		append(traitfuncs.overlay,function(){
			if(getbuffind(12)>=0){
				if(render){fill(170,170,200);
				rect(825,242,(playertemp.buffs[getbuffind(12)].pow)/(((plsin(1))*2+(plshp(1)))*(0.2+0.2*player.traits[73]))*300,3*(3+player.traits[73]));}
			}
		});
	}
	if(player.traits[81]>0){
		append(traitfuncs.passives,function(){
			hits=0;
			for(i=0;i<enemies.length;i+=1){
				if(enemies[i].x-playertemp.x<100&enemies[i].y-playertemp.y<100&enemies[i].x-playertemp.x>-100&enemies[i].y-playertemp.y>-100){
					if(pow(enemies[i].x-playertemp.x,2)+pow(enemies[i].y-playertemp.y,2)<pow(100+enemies[i].size,2)){
						hits+=1;
						if(enemies[i].spdmod>0.6){
							enemies[i].spdmod-=0.01+0.01*player.traits[81];
							if(enemies[i].spdmod<0.6){
								enemies[i].spdmod=0.6;
							}
						}
					}
				}
				if(enemies[i].x-playertemp.x<60&enemies[i].y-playertemp.y<60&enemies[i].x-playertemp.x>-60&enemies[i].y-playertemp.y>-60){
					if(pow(enemies[i].x-playertemp.x,2)+pow(enemies[i].y-playertemp.y,2)<pow(60+enemies[i].size,2)){
						hits+=1;
						if(enemies[i].spdmod>0.45){
							enemies[i].spdmod-=0.01+0.01*player.traits[81];
							if(enemies[i].spdmod<0.45){
								enemies[i].spdmod=0.45;
							}
						}
					}
				}
			}
			strokeWeight(4);
			if(hits>0){
				if(tick%3==0){
					append(particles,new createparticle(random(310,490),random(260,440),0,0,0,0,'circle','',10,-0.3,150,-2.5,150,150,255));
				}
				if(render){ellipseMode(CENTER);
				fill(160,160,255,50);
				stroke(160,160,255,70);
				ellipse(400,350,200,200);
				ellipse(400,350,120,120);}
			}
			else{
				if(render){ellipseMode(CENTER);
				noFill();
				stroke(160,160,255,60);
				ellipse(400,350,200,200);
				ellipse(400,350,120,120);}
				
			}
			noStroke();
		});
	}			
	if(player.traits[82]>0){
		append(traitfuncs.passives,function(){
			if(gametick%240==0||gametick%60==0&playertemp.timesincekill<=480){
				hits=new Array();
				for(i=0;i<enemies.length;i+=1){
					if(enemies[i].x-playertemp.x<400&enemies[i].y-playertemp.y<350&enemies[i].x-playertemp.x>-400&enemies[i].y-playertemp.y>-350){
							append(hits,i);
					}
				}
				if(hits[0]){
					stemp=hits[round(random(0,hits.length-1))];
					append(particles,new createparticle(enemies[stemp].x,enemies[stemp].y,0,0,0,0,'circle','',55,10,255,-25,220,220,100,1));
					append(particles,new createparticle(enemies[stemp].x,enemies[stemp].y,0,0,0,0,'circle','',45,0,255,-17,100,100,255,1));
					append(objects,{
						type:'AoE',
						target:'enemy',
						size:50,
						duration:0,
						rangetype:"generic",
						sound:sfx.obliteration,
						x:enemies[stemp].x,
						y:enemies[stemp].y,
						pdmgmin:((plsst(1)))*0.35*10*(0.5+player.traits[82]/2),
						pdmgmax:((plsst(1)))*1.15*10*(0.5+player.traits[82]/2),
						mdmgmin:((plsin(1)))*0.35*10*(0.5+player.traits[82]/2),
						mdmgmax:((plsin(1)))*1.15*10*(0.5+player.traits[82]/2),
						armorE:1,
						resE:1,
						procc:0.7,
						hits:new Array(999)
					});
				}
			}
			if(playertemp.timesincekill<=480){
				if(render){ellipseMode(CENTER);
				noFill();
				stroke(160+abs(tick%90-45)*3,100,160+abs((tick+45)%90-45)*3,70);
				strokeWeight(12);
				ellipse(400,350,55,55);
				noStroke();}
			}
		});
	}
	if(player.traits[83]>0){
		append(traitfuncs.passives,function(){
			if(render){fill(255,200,20,25+playertemp.heraldofash/4);
			stroke(255,200,20,100);
			strokeWeight(4);
			ellipseMode(CENTER);
			ellipse(400,350,140,140);
			noStroke();}
			hits=0;
			if(!(playertemp.heraldofash)){
				playertemp.heraldofash=0;
			}
			if(!(playertemp.heraldofashflame)){
				playertemp.heraldofashflame=0;
			}
			playertemp.heraldofash=min(360,playertemp.heraldofash+1);
			if(playertemp.timesincedamagetaken>120&playertemp.timesincehittaken>120&playertemp.timesincedamagedealt>120){
				playertemp.heraldofash=max(0,playertemp.heraldofash-4);
			}
			else{
				playertemp.heraldofashflame+=playertemp.heraldofash+100;
			}
			for(i=0;i<enemies.length;i+=1){
				if(enemies[i].x-playertemp.x<65&enemies[i].y-playertemp.y<65&enemies[i].x-playertemp.x>-65&enemies[i].y-playertemp.y>-65){
					if(pow(enemies[i].x-playertemp.x,2)+pow(enemies[i].y-playertemp.y,2)<pow(65+enemies[i].size,2)){
						hits+=1;
						damage("enemies",i,(1+playertemp.heraldofash/90)*((plsst(1))+(plsin(1)))*10*player.traits[83]*0.001,(1+playertemp.heraldofash/90)*((plsst(1))+(plsin(1)))*10*player.traits[83]*0.001,0,0,"DoT","player",0);
					}
				}
			}
			if(playertemp.heraldofashflame>=1000){
				append(particles,new createparticle(random(360,440),random(310,390),random(-3,3),random(-3,3),0,0,'circle','',10,-0.3,200,-8.5,random(200,255),random(180,235),120));
				playertemp.heraldofashflame-=1000;
			}
		});
		append(traitfuncs.damagedealt,function(){
			if(playertemp.heraldofash>0){
				pdmg*=1+playertemp.heraldofash/1800;
				mdmg*=1+playertemp.heraldofash/1800;
			}
		});
	}
	if(player.traits[89]>0){
		append(traitfuncs.passives,function(){
			if(!(playertemp.ingrain)){
				playertemp.ingrain=60;
			}
			if(!(playertemp.ingrainp)){
				playertemp.ingrainp=0;
			}
			playertemp.ingrain=min(600,playertemp.ingrain+1);
			if(playertemp.timesincemove<2){
				playertemp.ingrain=max(60,playertemp.ingrain-2);
			}
			playertemp.ingrainp+=playertemp.ingrain;
			if(player.mp<(plsmp(1))){
				player.mp+=(plsmp(1))*(0.004+0.004*player.traits[89])*playertemp.ingrain/7200;
			}
			if(playertemp.ingrainp>=1500){
				append(particles,new createparticle(random(390,410),random(340,360),random(-1,1),random(-1,1),0,0,'circle','',random(6,9),-0.2,255,-7,random(160,190),30,random(160,190)));
				playertemp.ingrainp-=1500;
			}
		});
	}
	if(player.traits[91]>0){
		append(traitfuncs.underlay,function(){
			if(!(playertemp.guard)){
				playertemp.guard=0;
			}
			if(!(playertemp.guardmb)){
				playertemp.guardmb=0;
			}
			if(playertemp.fortify>0){
				playertemp.fortify-=1;
				if(render){translate(400,350);
				rotate(tick%180*PI/180);
				for(stf=0;stf<6;stf+=1){
					rotate(PI/3);
					fill(180,180,115,155);
					triangle(0,-25,-13,3,13,3);
				}
				resetMatrix();}
			}
			else{
				playertemp.fortify=0;
			}
		});
		append(traitfuncs.passives,function(){
			if(player.traits[92]>0){
				if(!(playertemp.action.name=="defend")){
					playertemp.guard=min((plshp(1))*(player.traits[91]/100)+playertemp.guardmb,playertemp.guard+(plshp(1))*(player.traits[92]/60000));
					if(player.traits[94]>0&player.speed>4){
						playertemp.guard=min(((plshp(1)))*(player.traits[91]/100)+playertemp.guardmb,playertemp.guard+(((plshp(1))*0.01+(plsst(1))*0.006)*(player.speed-4)/60));
					}
				}
			}
		});
		append(traitfuncs.overlay,function(){
			if(render){
				fill(50,50,0);
				rect(825,275,300,7);
				if(playertemp.guard){
					if(playertemp.guard>0){
						if(playertemp.action.name=="defend"){
							fill(75+abs(tick%30-15)*2,80+abs(tick%60-30)*1.5,255);
							rect(825,267,playertemp.guard/((plshp(1))*(player.traits[91]/100)+playertemp.guardmb)*300,15);
						}
						else{
							fill(110,110,150);
							rect(825,275,playertemp.guard/((plshp(1))*(player.traits[91]/100)+playertemp.guardmb)*300,7);
						}
						fill(170,170,255);
						textFont(0,13);
						text(round(playertemp.guard),950,283);
					}
				}
			}
		});
	}
	if(player.traits[94]>0){
		append(traitfuncs.passives,function(){
			if(!(playertemp.guardmb)){
				playertemp.guardmb=0;
			}
			if(!(playertemp.ongardeb)){
				playertemp.ongardeb=0;
			}
			if(!(playertemp.ongardeb==((plshp(1))*0.05+(plsst(1))*0.03)*(max(0,player.speed-4)))){
					playertemp.guardmb-=playertemp.ongardeb;
					playertemp.guardmb+=((plshp(1))*0.05+(plsst(1))*0.03)*(max(0,player.speed-4));
					playertemp.ongardeb=((plshp(1))*0.05+(plsst(1))*0.03)*(max(0,player.speed-4));
			}
		});
	}
	if(player.traits[95]>0){
		append(traitfuncs.passives,function(){
			if(player.hp<(plshp(1))*0.4||playertemp.timesincekill<=180){
				if(gametick%10==0){
					append(particles,new createparticle(random(385,415),random(335,365),0,0,0,0,'circle','',10,-0.3,255,-15,255,20,10));
					playertemp.str+=player.traits[95]*0.005;
					playertemp.intel+=player.traits[95]*0.005;
					playertemp.speed+=player.traits[95]*0.005;
					append(stateffects,{name:'berserking',tick:0,pow:player.traits[95]*0.005,run:function(){
						if(stateffects[n].tick>=180){
							playertemp.str-=stateffects[n].pow;
							playertemp.intel-=stateffects[n].pow;
							playertemp.speed-=stateffects[n].pow;
							stateffects.splice(n,1);
							n-=1;
						}
					}
					});
					}
				}
		});
	}
	if(player.traits[61]>0){
		append(traitfuncs.onkill,function(f){
		lootstock=3*enemies[f].soulv*player.traits[61];
		lootcount=0;
		while(lootstock>0){
			if(lootstock>=random(0,100)){
				player.reactant+=1;
				lootcount+=1;
			}
			lootstock-=100;
		}
		if(lootcount>0){
			append(particles,new createparticle(275+random(150),300,0,-1,0,0,'text','+ '+lootcount+' Reactant',19,0,255,-2,160,130,50));
		}
		});
	}
	if(player.traits[20]>0){
		append(traitfuncs.onkill,function(f){
		player.sp+=player.traits[20];
		});
	}
	if(player.traits[25]>0){
		append(traitfuncs.onkill,function(f){
		heal((plshp(1))*0.05,"direct");
		playertemp.speed+=0.04;
		playertemp.maxhp+=player.traits[25]*0.01;
		playertemp.maxmp+=player.traits[25]*0.01;
		playertemp.hpregen+=player.traits[25]*0.01;
		playertemp.mpregen+=player.traits[25]*0.01;
		playertemp.str+=player.traits[25]*0.01;
		playertemp.intel+=player.traits[25]*0.01;
		playertemp.armor+=player.traits[25]*0.01;
		playertemp.res+=player.traits[25]*0.01;
		append(stateffects,{name:'soul eater',x:random(-20,20),y:random(-20,20),dir:random(0,2*PI),turn:random(-0.1,0.1),tick:0,pow:player.traits[25]*0.01,run:function(){
			if(stateffects[n].tick<1080){
				translate(400,350);
				rotate(stateffects[n].dir);
				fill(100,0,100,150);
				ellipse(stateffects[n].x,stateffects[n].y,10,10);
				stateffects[n].dir+=stateffects[n].turn;
				resetMatrix();
			}
			else{
				translate(400,350);
				rotate(stateffects[n].dir);
				fill(100,0,100,150-(stateffects[n].tick-1080)*1.25);
				ellipse(stateffects[n].x,stateffects[n].y,10,10);
				resetMatrix();
			}
			if(stateffects[n].tick>=1200){
				playertemp.speed-=0.04;
				playertemp.maxhp-=stateffects[n].pow;
				playertemp.maxmp-=stateffects[n].pow;
				playertemp.hpregen-=stateffects[n].pow;
				playertemp.mpregen-=stateffects[n].pow;
				playertemp.str-=stateffects[n].pow;
				playertemp.intel-=stateffects[n].pow;
				playertemp.armor-=stateffects[n].pow;
				playertemp.res-=stateffects[n].pow;
				stateffects.splice(n,1);
				n-=1;
			}
		}
		});
		});
	}
}
var atlasbiomes;
var atlasraw;
var getAtlas=function(){
	atlasraw=loadStrings("Data/Text/atlas.txt");
	atlasbiomes=new Array();
	for(i=0;i<9999;i+=1){
		if(player.record.atlas[i]>0){
			append(atlasbiomes,[i,atlasraw[(i-1)*5],Number(atlasraw[(i-1)*5+1]),Number(atlasraw[(i-1)*5+2]),0]);
			if(player.record.biocomp[i]){
				atlasbiomes[atlasbiomes.length-1][4]=1;
			}
		}
	}
	atlasraw="";
}
var getequipstatsingle=function(statid,slot){
	temp2=itemdata[player.inventory[slot].id*10+5][statid];
	if(player.inventory[slot].prefix){
		temp2+=prefixdata[(player.inventory[slot].prefix-1)*5+2][statid];
	}
	if(player.inventory[slot].suffix){
		temp2+=suffixdata[(player.inventory[slot].suffix-1)*5+2][statid];
	}
	if(!(statid==1||statid==3)){
		temp2*=0.9+player.inventory[slot].level/10;
	}
	if(temp2>0){
		temp2*=player.inventory[slot].rolls[statkey[statid]];
	}
	else{
		temp2*=2-(player.inventory[slot].rolls[statkey[statid]]);
	}
	if(player.inventory[slot].rune){
		if(temp2>0&!(runedata[player.inventory[slot].rune*4-1]==0)){
			temp2*=1+runedata[player.inventory[slot].rune*4-1]/100;
		}
	}
	return(temp2);
	/*return(itemdata[player.inventory[slot].id*10+5][statid]*(0.9+player.inventory[slot].level/10)
	*player.inventory[slot].rolls[statkey[statid]]);*/
}
ellipseMode(CENTER);
playertemp.equipstatdata={
	hp:0,
	mp:0,
	hpregen:0,
	mpregen:0,
	str:0,
	intel:0,
	armor:0,
	res:0
};
var recalstatcache=0;
var recalstats=function(){
	playertemp.combo={LH:{num:0,timer:1},RH:{num:0,timer:1}};
	recalstatcache=getequipstat(0);
	player.maxhp=(player.baseStats.hp+player.keystonestats.hp)*(0.9+player.level/10)+recalstatcache;
	playertemp.equipstatdata.hp=recalstatcache;
	recalstatcache=getequipstat(1);
	player.maxmp=player.baseStats.mp+player.keystonestats.mp+recalstatcache;
	playertemp.equipstatdata.mp=recalstatcache;
	recalstatcache=getequipstat(2);
	player.hpregen=(player.baseStats.hpregen+player.keystonestats.hpregen)*(0.9+player.level/10)+recalstatcache;
	playertemp.equipstatdata.hpregen=recalstatcache;
	recalstatcache=getequipstat(3);
	player.mpregen=player.baseStats.mpregen+player.keystonestats.mpregen+recalstatcache;
	playertemp.equipstatdata.mpregen=recalstatcache;
	recalstatcache=getequipstat(4);
	player.str=(player.baseStats.str+player.keystonestats.str)*(0.9+player.level/10)+recalstatcache;
	playertemp.equipstatdata.str=recalstatcache;
	recalstatcache=getequipstat(5);
	player.intel=(player.baseStats.intel+player.keystonestats.intel)*(0.9+player.level/10)+recalstatcache;
	playertemp.equipstatdata.intel=recalstatcache;
	recalstatcache=getequipstat(6);
	player.armor=(player.baseStats.armor+player.keystonestats.armor)*(0.9+player.level/10)+recalstatcache;
	playertemp.equipstatdata.armor=recalstatcache;
	recalstatcache=getequipstat(7);
	player.res=(player.baseStats.res+player.keystonestats.res)*(0.9+player.level/10)+recalstatcache;
	playertemp.equipstatdata.res=recalstatcache;
	player.maxhp*=1+(player.passives[0]*player.passivemults.power.hp+player.passives[1]*player.passivemults.fortitude.hp+player.passives[2]*player.passivemults.omnipotency.hp)*0.01;
	player.hpregen*=1+(player.passives[0]*player.passivemults.power.hpregen+player.passives[1]*player.passivemults.fortitude.hpregen+player.passives[2]*player.passivemults.omnipotency.hpregen)*0.01;
	player.str*=1+(player.passives[0]*player.passivemults.power.str+player.passives[1]*player.passivemults.fortitude.str+player.passives[2]*player.passivemults.omnipotency.str)*0.01;
	player.intel*=1+(player.passives[0]*player.passivemults.power.intel+player.passives[1]*player.passivemults.fortitude.intel+player.passives[2]*player.passivemults.omnipotency.intel)*0.01;
	player.armor*=1+(player.passives[0]*player.passivemults.power.armor+player.passives[1]*player.passivemults.fortitude.armor+player.passives[2]*player.passivemults.omnipotency.armor)*0.01;
	player.res*=1+(player.passives[0]*player.passivemults.power.res+player.passives[1]*player.passivemults.fortitude.res+player.passives[2]*player.passivemults.omnipotency.res)*0.01;
	player.maxhp=max(1,player.maxhp);
	player.maxmp=max(0,round(player.maxmp));
	player.hpregen=max(0,100*(player.hpregen))/100;
	player.mpregen=max(0,(100*(player.mpregen)))/100;
	player.str=max(1,(10*(player.str))/10);
	player.intel=max(1,(10*(player.intel))/10);
	player.armor=max(0,(10*(player.armor))/10);
	player.res=max(0,(10*(player.res))/10);
	player.haste=1+player.keystonestats.haste;
	player.rcostm=[1,1];
	if(player.traits[50]>0){
		player.maxhp*=1+player.traits[50]/100;
	}
	if(player.traits[51]>0){
		player.hpregen*=1+player.traits[51]/100;
	}
	if(player.traits[52]>0){
		player.maxmp*=1+player.traits[52]/100;
	}
	if(player.traits[53]>0){
		player.mpregen*=1+player.traits[53]/100;
	}
	if(player.traits[54]>0){
		player.str*=1+player.traits[54]/100;
	}
	if(player.traits[55]>0){
		player.intel*=1+player.traits[55]/100;
	}
	if(player.traits[56]>0){
		player.armor*=1+player.traits[56]/100;
	}
	if(player.traits[57]>0){
		player.res*=1+player.traits[57]/100;
	}
	if(player.keystonepassives[12]>0){
		player.maxhp*=1+player.keystonepassives[12]/100;
	}
	if(player.keystonepassives[13]>0){
		player.hpregen*=1+player.keystonepassives[13]/100;
	}
	if(player.keystonepassives[14]>0){
		player.maxmp*=1+player.keystonepassives[14]/100;
	}
	if(player.keystonepassives[15]>0){
		player.mpregen*=1+player.keystonepassives[15]/100;
	}
	if(player.keystonepassives[16]>0){
		player.str*=1+player.keystonepassives[16]/100;
	}
	if(player.keystonepassives[17]>0){
		player.intel*=1+player.keystonepassives[17]/100;
	}
	if(player.keystonepassives[18]>0){
		player.armor*=1+player.keystonepassives[18]/100;
	}
	if(player.keystonepassives[19]>0){
		player.res*=1+player.keystonepassives[19]/100;
	}
	if(player.traits[8]>0){
		player.mpregen*=0.92;
	}
	if(player.traits[8]>0){
		player.maxmp*=1.46+player.traits[8]/25;
	}
	if(player.traits[4]>0){
		player.hpregen+=player.maxhp*(player.traits[4]*0.005);
	}
	if(player.traits[3]>0){
		player.hpregen*=1.14+(player.traits[3]/100);
	}
	//Post normal bonuses
	if(player.traits[34]>0){
		temp=min(player.maxhp*0.6,player.hpregen*20,player.str,player.intel,player.armor,player.res)*player.traits[34]/10;
		player.maxhp+=temp/0.6;
		player.hpregen+=temp/20;
		player.str+=temp;
		player.intel+=temp;
		player.armor+=temp;
		player.res+=temp;
	}
	
	if(player.traits[108]>0){
		if(player.str>player.intel){
			player.intel+=player.str*(0.3+player.traits[108]*0.05);
		}
		else{
			player.str+=player.intel*(0.3+player.traits[108]*0.05);
		}
	}
	
	if(player.traits[109]>0){
		if(player.armor>player.res){
			player.res+=player.armor*(0.22+player.traits[109]*0.03);
		}
		else{
			player.armor+=player.res*(0.22+player.traits[109]*0.03);
		}
	}
	
	if(player.traits[84]>0){
		player.maxhp=1;
	}
	
	if(player.traits[85]>0){
		player.haste*=1+player.traits[85]/100;
	}
	
	if(player.keystonepassives[20]>0){
		player.haste*=1.25;
	}
	temp=4+player.keystonestats.speed;
	for(i=0;i<equipkey.length;i+=1){
		if(player.inventory[equipkey[i]]){
			temp*=itemdata[player.inventory[equipkey[i]].id*10+6];
			if(player.inventory[equipkey[i]].prefix){
				temp*=prefixdata[player.inventory[equipkey[i]].prefix*5-2];
			}
			if(player.inventory[equipkey[i]].suffix){
				temp*=suffixdata[player.inventory[equipkey[i]].suffix*5-2];
			}
		}
	}
	if(player.traits[1]>0){
		temp*=0.95;
	}
	if(player.traits[3]>0){
		temp*=0.95;
	}
	player.maxhp=max(1,round(player.maxhp));
	player.maxmp=max(0,round(player.maxmp));
	player.hpregen=max(0,round(100*(player.hpregen)))/100;
	player.mpregen=max(0,round(100*(player.mpregen)))/100;
	player.str=max(1,round(10*(player.str))/10);
	player.intel=max(1,round(10*(player.intel))/10);
	player.armor=max(0,round(10*(player.armor))/10);
	player.res=max(0,round(10*(player.res))/10);
	player.speed=round(temp*100)/100;
	if(player.hp>(plshp(1))&!(player.traits[24]>0)){
		player.hp=(plshp(1));
	}
	if(player.mp>(plsmp(1))){
		player.mp=(plsmp(1));
	}
	player.traction=0.9;
	if(player.traits[29]>0){
		player.traction-=player.traits[29]/1000;
	}
	if(player.traction>1){
		player.traction=1;
	}
	player.size=6+player.keystonestats.size;
	if(player.traits[115]>0){
		player.size=1;
	}
}
function creategateway(sprite,x,y,destinationID,trackable,name,lv){
	this.sprite=sprite;
	this.x=x;
	this.y=y;
	this.dest=destinationID;
	this.trackable=trackable;
	this.exists=1;
	this.destname=name;
	this.destlv=lv;
}
var stopaction=function(){
	playertemp.action={
		name:0,
		speedm:1
	};
}
var swapitems=function(sourcedir,source,targetdiree,target){
	if(sourcedir=='bag'){
		if(player.inventory.bag[source]){
				temp=player.inventory.bag[source];
		}
		else{
			temp=0;
		}
	}
	else{
		if(player.inventory){
				temp=player.inventory[sourcedir];
		}
		else{
			temp=0;
		}
	}
	if(sourcedir=='bag'){
		if(targetdiree=='bag'){
			if(player.inventory.bag[target]){
				player.inventory.bag[source]=player.inventory.bag[target];
			}
			else{
				player.inventory.bag[source]=0;
			}
		}
		else{
			if(player.inventory[targetdiree]){
				player.inventory.bag[source]=player.inventory[targetdiree];
			}
			else{
				player.inventory.bag[source]=0;
			}
		}
	}
	else{
		if(targetdiree=='bag'){
			if(player.inventory.bag[target]){
				player.inventory[sourcedir]=player.inventory.bag[target];
			}
			else{
				player.inventory[sourcedir]=0;
			}
		}
		else{
			if(player.inventory[targetdiree]){
				player.inventory[sourcedir]=player.inventory[targetdiree];
			}
			else{
				player.inventory[sourcedir]=0;
			}
		}
	}
	if(targetdiree=='bag'){
		if(temp){
			player.inventory.bag[target]=temp;
		}
		else{
			player.inventory.bag[target]=0;
		}
	}
	else{
		if(temp){
			player.inventory[targetdiree]=temp;
		}
		else{
			player.inventory[targetdiree]=0;
		}
	}
}
var cursorbox=function(x1,x2,y1,y2){
	if(mouseX>=x1&mouseX<=x2&mouseY>=y1&mouseY<=y2){
		return(1);
	}
}
var tooltipdraw;
var tooltip=function(type,x,y,w,h,title,tip,colors){
	tooltipdraw={
		type:type,
		x:x,
		y:y,
		w:w,
		h:h,
		title:title,
		tip:tip,
		colors:colors
	};
}
var shield=function(shp,dur){
	if(player.traits[110]>0){
		append(playertemp.shield.hp,shp*(1.17+player.traits[110]*0.03));
	}
	else{
		append(playertemp.shield.hp,shp);
	}
	append(playertemp.shield.dur,dur);
	append(playertemp.shield.fx,0);
}
var buff=function(id,dur,pow){
	append(playertemp.buffs,{id:id,dur:dur,pow:pow});
}
var getitemstat=function(statid,bagnum){
	temp2=itemdata[player.inventory.bag[bagnum].id*10+5][statid];
	if(player.inventory.bag[bagnum].prefix){
		temp2+=prefixdata[(player.inventory.bag[bagnum].prefix-1)*5+2][statid];
	}
	if(player.inventory.bag[bagnum].suffix){
		temp2+=suffixdata[(player.inventory.bag[bagnum].suffix-1)*5+2][statid];
	}
	if(!(player.inventory.bag[bagnum].id==44)){
		if(!(statid==1||statid==3)){
			temp2*=0.9+player.inventory.bag[bagnum].level/10;
		}
	if(temp2>0){
		temp2*=player.inventory.bag[bagnum].rolls[statkey[statid]];
	}
	else{
		temp2*=2-(player.inventory.bag[bagnum].rolls[statkey[statid]]);
	}
	if(player.inventory.bag[bagnum].rune){
		if(temp2>0&!(runedata[player.inventory.bag[bagnum].rune*4-1]==0)){
			temp2*=1+runedata[player.inventory.bag[bagnum].rune*4-1]/100;
		}
	}
	}
	return(temp2);
}
var findmatche=function(bagnum){
	if(itemdata[player.inventory.bag[bagnum].id*10+1]=="weapon"){
		return("LH");
	}
	if(itemdata[player.inventory.bag[bagnum].id*10+1]=="chest"){
		return("chest");
	}
	if(itemdata[player.inventory.bag[bagnum].id*10+1]=="helmet"){
		return("helmet");
	}
	if(itemdata[player.inventory.bag[bagnum].id*10+1]=="pants"){
		return("pants");
	}
	if(itemdata[player.inventory.bag[bagnum].id*10+1]=="gloves"){
		return("gloves");
	}
	if(itemdata[player.inventory.bag[bagnum].id*10+1]=="shoes"){
		return("shoes");
	}
}
var getstatdiffforcomp=function(bagnum,slot,name,id,rounding,scale,lvscale){
	if(getitemstat(id,bagnum)-getequipstatsingle(id,slot)==0){
		append(temp,name+' --- ');
		append(temp5,[120,120,120]);
	}
	else if(getitemstat(id,bagnum)-getequipstatsingle(id,slot)>0){
		append(temp,name+' + '+round(rounding*(getitemstat(id,bagnum)-getequipstatsingle(id,slot)))/rounding);
		if(getitemstat(id,bagnum)-getequipstatsingle(id,slot)>=(4.5+(player.level*lvscale)/2)*scale){
			if(getitemstat(id,bagnum)-getequipstatsingle(id,slot)>=(13.5+(player.level*lvscale)*1.5)*scale){
				append(temp5,[0,255,0]);
			}
			else{
				append(temp5,[90,255,90]);
			}
		}
		else{
			append(temp5,[170,255,170]);
		}
	}
	else{
		append(temp,name+' - '+round(rounding*(getequipstatsingle(id,slot)-getitemstat(id,bagnum)))/rounding);
		if(getitemstat(id,bagnum)-getequipstatsingle(id,slot)<=(-4.5-(player.level*lvscale)/2)*scale){
			if(getitemstat(id,bagnum)-getequipstatsingle(id,slot)<=(-13.5-(player.level*lvscale)*1.5)*scale){
				append(temp5,[255,0,0]);
			}
			else{
				append(temp5,[255,90,90]);
			}
		}
		else{
			append(temp5,[255,170,170]);
		}
	}
		temp4+=20;
}
var getstatcomp=function(bagnum,slot){
	temp5=new Array();
	append(temp5,[190,190,190]);
	if(slot=="LH"){
		append(temp,'(Comparing to your left-hand weapon)');
		append(temp5,[190,190,190]);
	}
	getstatdiffforcomp(bagnum,slot,"Health",0,10,2,1);
	getstatdiffforcomp(bagnum,slot,"Mana",1,10,2,0);
	getstatdiffforcomp(bagnum,slot,"Health Regen",2,100,0.1,1);
	getstatdiffforcomp(bagnum,slot,"Mana Regen",3,100,0.1,0);
	getstatdiffforcomp(bagnum,slot,"Strength",4,10,1,1);
	getstatdiffforcomp(bagnum,slot,"Intelligence",5,10,1,1);
	getstatdiffforcomp(bagnum,slot,"Armor",6,10,1.5,1);
	getstatdiffforcomp(bagnum,slot,"Resistance",7,10,1.5,1);
	temp3=1;
		temp3=itemdata[player.inventory.bag[bagnum].id*10+6];
	if(player.inventory.bag[bagnum].prefix){
		temp3*=prefixdata[(player.inventory.bag[bagnum].prefix-1)*5+3];
	}
	if(player.inventory.bag[bagnum].suffix){
		temp3*=suffixdata[(player.inventory.bag[bagnum].suffix-1)*5+3];
	}
	stemp=1;
		stemp=itemdata[player.inventory[slot].id*10+6];
	if(player.inventory[slot].prefix){
		stemp*=prefixdata[(player.inventory[slot].prefix-1)*5+3];
	}
	if(player.inventory[slot].suffix){
		stemp*=suffixdata[(player.inventory[slot].suffix-1)*5+3];
	}
	temp3-=stemp-1;
	if(!(temp3==1)){
		if(temp3>1){
			append(temp,'Move Speed + '+(round((temp3-1)*1000))/10+"%");
			append(temp5,[120,255,120]);
		}
		else{
			append(temp,'Move Speed - '+(round((1-temp3)*1000))/10+"%");
			append(temp5,[255,120,120]);
		}
	}
}
var temp3;
var temp5;
var armorE;
var resE;
var procc;
var origdmg;
var dmgixtr;
var areatemp={
	raining:0,
};
var eqtt={
	bag:{
	rolls:function(bagnum){
		if(player.inventory.bag[bagnum].id==44){
			tooltipdraw={
				type:0,
				x:mouseX,
				y:mouseY-100,
				w:300,
				h:300,
				title:"Orb: ",
				tip:"Orbs do not have stat rolls.",
				colors:0
			};
		}
		else{
			append(temp,'Average: '+round(1000*((player.inventory.bag[bagnum].rolls.hp+player.inventory.bag[bagnum].rolls.mp+player.inventory.bag[bagnum].rolls.hpregen+player.inventory.bag[bagnum].rolls.mpregen+player.inventory.bag[bagnum].rolls.str+player.inventory.bag[bagnum].rolls.intel+player.inventory.bag[bagnum].rolls.armor+player.inventory.bag[bagnum].rolls.res)/8))/10+"%");
			append(temp,'Health: '+round(100*player.inventory.bag[bagnum].rolls.hp)+"%");
			append(temp,'Mana: '+round(100*player.inventory.bag[bagnum].rolls.mp)+"%");
			append(temp,'Health Regen: '+round(100*player.inventory.bag[bagnum].rolls.hpregen)+"%");
			append(temp,'Mana Regen: '+round(100*player.inventory.bag[bagnum].rolls.mpregen)+"%");
			append(temp,'Strength: '+round(100*player.inventory.bag[bagnum].rolls.str)+"%");
			append(temp,'Intelligence: '+round(100*player.inventory.bag[bagnum].rolls.intel)+"%");
			append(temp,'Armor: '+round(100*player.inventory.bag[bagnum].rolls.armor)+"%");
			append(temp,'Resistance: '+round(100*player.inventory.bag[bagnum].rolls.res)+"%");
			temp3="";
			if(player.inventory.bag[bagnum].prefix){
				temp3+=prefixdata[(player.inventory.bag[bagnum].prefix-1)*5];
				temp3+=" ";
			}
				temp3+=itemdata[player.inventory.bag[bagnum].id*10];
			if(player.inventory.bag[bagnum].suffix){
				temp3+=" ";
				temp3+=suffixdata[(player.inventory.bag[bagnum].suffix-1)*5];
			}
			tooltipdraw={
				type:1,
				x:mouseX,
				y:mouseY-100,
				w:140+max(20,temp3.length)*6,
				h:250,
				title:temp3,
				tip:temp,
				colors:0
			};
		}
	},
	armortt:function(bagnum){
		temp="Armor can be worn to gain its stat bonuses.";
		if(itemdata[player.inventory.bag[bagnum].id*10+8]){
			if(itemdata[player.inventory.bag[bagnum].id*10+8].length>1){
				temp+=" This particular one also grants traits.";
			}
			else{
				temp+=" This particular one also grants a trait.";
			}
			if(itemdata[player.inventory.bag[bagnum].id*10+1]=="helmet"){
				temp+=" Helmets appear on your character in-game.";
			}
			if(itemdata[player.inventory.bag[bagnum].id*10+1]=="chest"){
				temp+=" Chest armors appear on your character in-game.";
			}
			if(itemdata[player.inventory.bag[bagnum].id*10+1]=="pants"){
				temp+=" Leg armors appear on your character in-game.";
			}
		}
		tooltipdraw={
			type:0,
			x:mouseX,
			y:mouseY-100,
			w:300,
			h:300,
			title:"Armor ["+itemdata[player.inventory.bag[bagnum].id*10+1]+"]",
			tip:temp,
			colors:0
		};
	},
	},
	equip:{
		rolls:function(slot){
			append(temp,'Average: '+round(1000*((player.inventory[slot].rolls.hp+player.inventory[slot].rolls.mp+player.inventory[slot].rolls.hpregen+player.inventory[slot].rolls.mpregen+player.inventory[slot].rolls.str+player.inventory[slot].rolls.intel+player.inventory[slot].rolls.armor+player.inventory[slot].rolls.res)/8))/10+"%");
			append(temp,'Health: '+round(100*player.inventory[slot].rolls.hp)+"%");
			append(temp,'Mana: '+round(100*player.inventory[slot].rolls.mp)+"%");
			append(temp,'Health Regen: '+round(100*player.inventory[slot].rolls.hpregen)+"%");
			append(temp,'Mana Regen: '+round(100*player.inventory[slot].rolls.mpregen)+"%");
			append(temp,'Strength: '+round(100*player.inventory[slot].rolls.str)+"%");
			append(temp,'Intelligence: '+round(100*player.inventory[slot].rolls.intel)+"%");
			append(temp,'Armor: '+round(100*player.inventory[slot].rolls.armor)+"%");
			append(temp,'Resistance: '+round(100*player.inventory[slot].rolls.res)+"%");
			temp3="";
			if(player.inventory[slot].prefix){
				temp3+=prefixdata[(player.inventory[slot].prefix-1)*5];
				temp3+=" ";
			}
				temp3+=itemdata[player.inventory[slot].id*10];
			if(player.inventory[slot].suffix){
				temp3+=" ";
				temp3+=suffixdata[(player.inventory[slot].suffix-1)*5];
			}
				tooltipdraw={
					type:1,
					x:mouseX,
					y:mouseY-100,
					w:140+max(20,temp3.length)*6,
					h:250,
					title:temp3,
					tip:temp,
					colors:0
				};
		},
	}
};
var equiptooltip=function(slot,bagnum){
	temp=new Array();
	temp4=120;
	temp5=0;
	if(keyPressed&keyCode==17){
		if(slot=='bag'){
			eqtt.bag.rolls(bagnum);
		}
		else{
			eqtt.equip.rolls(slot);
		}
	}
	else if(keyPressed&keyCode==16){
		if(slot=='bag'){
			if(itemdata[player.inventory.bag[bagnum].id*10+1]=="weapon"){
				tooltipdraw={
					type:0,
					x:mouseX,
					y:mouseY-100,
					w:300,
					h:300,
					title:"Attack: ",
					tip:converttext(attacktt[itemdata[player.inventory.bag[bagnum].id*10+2]],0),
					colors:0
				};
			}
			else if(player.inventory.bag[bagnum].id==44){
				tooltipdraw={
					type:0,
					x:mouseX,
					y:mouseY-100,
					w:300,
					h:300,
					title:"Orb: ",
					tip:"Orbs can be used at the enchanter to modify items",
					colors:0
				};
			}
			else{
				eqtt.bag.armortt(bagnum);
			}
		}
		else{
			if(itemdata[player.inventory[slot].id*10+1]=="weapon"){
				tooltipdraw={
					type:0,
					x:mouseX,
					y:mouseY-100,
					w:300,
					h:300,
					title:"Attack: ",
					tip:converttext(attacktt[itemdata[player.inventory[slot].id*10+2]],0),
					colors:0
				};
			}
			else{
				temp="Armor can be worn to gain its stat bonuses.";
				if(itemdata[player.inventory[slot].id*10+8]){
					if(itemdata[player.inventory[slot].id*10+8].length>1){
						temp+=" This particular one also grants traits.";
					}
					else{
						temp+=" This particular one also grants a trait.";
					}
					if(itemdata[player.inventory[slot].id*10+1]=="helmet"){
						temp+=" Helmets appear on your character in-game.";
					}
					if(itemdata[player.inventory[slot].id*10+1]=="chest"){
						temp+=" Chest armors appear on your character in-game.";
					}
					if(itemdata[player.inventory[slot].id*10+1]=="pants"){
						temp+=" Leg armors appear on your character in-game.";
					}
				}
				tooltipdraw={
					type:0,
					x:mouseX,
					y:mouseY-100,
					w:300,
					h:300,
					title:"Armor ["+itemdata[player.inventory[slot].id*10+1]+"]",
					tip:temp,
					colors:0
				};
			}
		}
	}
	else{
		if(slot=='bag'){
			if(!(player.inventory.bag[bagnum].id==44)){
				if(!(keyPressed)){
				if(player.inventory.bag[bagnum].rune){
					temp5=new Array(50);
					if(player.inventory.bag[bagnum].runet==1){
						temp5[0]=[70,70,180+abs(tick%120-60)*1.25];
					}
					if(player.inventory.bag[bagnum].runet==2){
						temp5[0]=[180+abs(tick%120-60),40,180+abs(tick%120-60)];
					}
					if(player.inventory.bag[bagnum].runet==3){
						temp5[0]=[150+abs(tick%120-60),150+abs(tick%120-60),0];
					}
					append(temp,runedata[player.inventory.bag[bagnum].rune*4-4]);
					temp4+=20;
				}
				else{
					temp5=0;
				}}
				append(temp,'Level: '+player.inventory.bag[bagnum].level);
			}
			if(keyPressed){
				if(player.inventory[findmatche(bagnum)]){
					getstatcomp(bagnum,findmatche(bagnum));
					temp3="";
					if(player.inventory.bag[bagnum].prefix){
						temp3+=prefixdata[(player.inventory.bag[bagnum].prefix-1)*5];
						temp3+=" ";
					}
						temp3+=itemdata[player.inventory.bag[bagnum].id*10];
					if(player.inventory.bag[bagnum].suffix){
						temp3+=" ";
						temp3+=suffixdata[(player.inventory.bag[bagnum].suffix-1)*5];
					}
				tooltipdraw={
					type:1,
					x:mouseX,
					y:mouseY-100,
					w:140+max(20,temp3.length)*6,
					h:temp4,
					title:temp3,
					tip:temp,
					colors:temp5
				};
				}
			}
			else{
				if(!(getitemstat(0,bagnum)==0)){
					append(temp,'Health: '+round(10*(getitemstat(0,bagnum)))/10);
					temp4+=20;
				}
				if(!(getitemstat(1,bagnum)==0)){
					append(temp,'Mana: '+round(10*(getitemstat(1,bagnum)))/10);
					temp4+=20;
				}
				if(!(getitemstat(2,bagnum)==0)){
					append(temp,'Health Regen: '+round(100*(getitemstat(2,bagnum)))/100);
					temp4+=20;
				}
				if(!(getitemstat(3,bagnum)==0)){
					append(temp,'Mana Regen: '+round(100*(getitemstat(3,bagnum)))/100);
					temp4+=20;
				}
				if(!(getitemstat(4,bagnum)==0)){
					append(temp,'Strength: '+round(10*(getitemstat(4,bagnum)))/10);
					temp4+=20;
				}
				if(!(getitemstat(5,bagnum)==0)){
					append(temp,'Intelligence: '+round(10*(getitemstat(5,bagnum)))/10);
					temp4+=20;
				}
				if(!(getitemstat(6,bagnum)==0)){
					append(temp,'Armor: '+round(10*(getitemstat(6,bagnum)))/10);
					temp4+=20;
				}
				if(!(getitemstat(7,bagnum)==0)){
					append(temp,'Resistance: '+round(10*(getitemstat(7,bagnum)))/10);
					temp4+=20;
				}
				if(itemdata[player.inventory.bag[bagnum].id*10+8]){
					for(a=0;a<itemdata[player.inventory.bag[bagnum].id*10+8].length;a+=1){
						append(temp,traitkey[itemdata[player.inventory.bag[bagnum].id*10+8][a][0]-1]+' + '+itemdata[player.inventory.bag[bagnum].id*10+8][a][1]);
						temp4+=20;
					}
				}
				if(prefixdata[player.inventory.bag[bagnum].prefix*5-1]){
					for(a=0;a<prefixdata[player.inventory.bag[bagnum].prefix*5-1].length;a+=1){
						append(temp,traitkey[prefixdata[player.inventory.bag[bagnum].prefix*5-1][a][0]-1]+' + '+prefixdata[player.inventory.bag[bagnum].prefix*5-1][a][1]);
						temp4+=20;
					}
				}
				if(suffixdata[player.inventory.bag[bagnum].suffix*5-1]){
					for(a=0;a<suffixdata[player.inventory.bag[bagnum].suffix*5-1].length;a+=1){
						append(temp,traitkey[suffixdata[player.inventory.bag[bagnum].suffix*5-1][a][0]-1]+' + '+suffixdata[player.inventory.bag[bagnum].suffix*5-1][a][1]);
						temp4+=20;
					}
				}
				temp3=1;
					temp3=itemdata[player.inventory.bag[bagnum].id*10+6];
				if(player.inventory.bag[bagnum].prefix){
					temp3*=prefixdata[(player.inventory.bag[bagnum].prefix-1)*5+3];
				}
				if(player.inventory.bag[bagnum].suffix){
					temp3*=suffixdata[(player.inventory.bag[bagnum].suffix-1)*5+3];
				}
				if(!(temp3==1)){
					append(temp,'Move Speed: '+(round((temp3-1)*1000))/10+"%");
				}
				temp3="";
				if(player.inventory.bag[bagnum].prefix){
					temp3+=prefixdata[(player.inventory.bag[bagnum].prefix-1)*5];
					temp3+=" ";
				}
					temp3+=itemdata[player.inventory.bag[bagnum].id*10];
				if(player.inventory.bag[bagnum].suffix){
					temp3+=" ";
					temp3+=suffixdata[(player.inventory.bag[bagnum].suffix-1)*5];
				}
				if(player.inventory.bag[bagnum].lock){
					append(temp,'LOCKED');
						temp4+=20;
				}
				
				tooltipdraw={
					type:1,
					x:mouseX,
					y:mouseY-100,
					w:140+max(20,temp3.length)*6,
					h:temp4,
					title:temp3,
					tip:temp,
					colors:temp5
				};
			}
		}
		else{
			if(player.inventory[slot].rune){
				temp5=new Array(50);
				if(player.inventory[slot].runet==1){
					temp5[0]=[70,70,180+abs(tick%120-60)*1.25];
				}
				if(player.inventory[slot].runet==2){
					temp5[0]=[180+abs(tick%120-60),40,180+abs(tick%120-60)];
				}
				if(player.inventory[slot].runet==3){
					temp5[0]=[150+abs(tick%120-60),150+abs(tick%120-60),0];
				}
				append(temp,runedata[player.inventory[slot].rune*4-4]);
				temp4+=20;
			}
			else{
				temp5=0;
			}
			append(temp,'Level: '+player.inventory[slot].level);
			if(!(getequipstatsingle(0,slot)==0)){
				append(temp,'Health: '+round(10*(getequipstatsingle(0,slot)))/10);
					temp4+=20;
			}
			if(!(getequipstatsingle(1,slot)==0)){
				append(temp,'Mana: '+round(10*(getequipstatsingle(1,slot)))/10);
					temp4+=20;
			}
			if(!(getequipstatsingle(2,slot)==0)){
				append(temp,'Health Regen: '+round(100*(getequipstatsingle(2,slot)))/100);
					temp4+=20;
			}
			if(!(getequipstatsingle(3,slot)==0)){
				append(temp,'Mana Regen: '+round(100*(getequipstatsingle(3,slot)))/100);
					temp4+=20;
			}
			if(!(getequipstatsingle(4,slot)==0)){
				append(temp,'Strength: '+round(10*(getequipstatsingle(4,slot)))/10);
					temp4+=20;
			}
			if(!(getequipstatsingle(5,slot)==0)){
				append(temp,'Intelligence: '+round(10*(getequipstatsingle(5,slot)))/10);
					temp4+=20;
			}
			if(!(getequipstatsingle(6,slot)==0)){
				append(temp,'Armor: '+round(10*(getequipstatsingle(6,slot)))/10);
					temp4+=20;
			}
			if(!(getequipstatsingle(7,slot)==0)){
				append(temp,'Resistance: '+round(10*(getequipstatsingle(7,slot)))/10);
					temp4+=20;
			}
			if(itemdata[player.inventory[slot].id*10+8]){
				for(a=0;a<itemdata[player.inventory[slot].id*10+8].length;a+=1){
					append(temp,traitkey[itemdata[player.inventory[slot].id*10+8][a][0]-1]+' + '+itemdata[player.inventory[slot].id*10+8][a][1]);
					temp4+=20;
				}
			}
			if(prefixdata[player.inventory[slot].prefix*5-1]){
				for(a=0;a<prefixdata[player.inventory[slot].prefix*5-1].length;a+=1){
					append(temp,traitkey[prefixdata[player.inventory[slot].prefix*5-1][a][0]-1]+' + '+prefixdata[player.inventory[slot].prefix*5-1][a][1]);
					temp4+=20;
				}
			}
			if(suffixdata[player.inventory[slot].suffix*5-1]){
				for(a=0;a<suffixdata[player.inventory[slot].suffix*5-1].length;a+=1){
					append(temp,traitkey[suffixdata[player.inventory[slot].suffix*5-1][a][0]-1]+' + '+suffixdata[player.inventory[slot].suffix*5-1][a][1]);
					temp4+=20;
				}
			}
			temp3=1;
				temp3=itemdata[player.inventory[slot].id*10+6];
			if(player.inventory[slot].prefix){
				temp3*=prefixdata[(player.inventory[slot].prefix-1)*5+3];
			}
			if(player.inventory[slot].suffix){
				temp3*=suffixdata[(player.inventory[slot].suffix-1)*5+3];
			}
			if(!(temp3==1)){
				append(temp,'Move Speed: '+(round((temp3-1)*1000))/10+"%");
			}
			temp3="";
			if(player.inventory[slot].prefix){
				temp3+=prefixdata[(player.inventory[slot].prefix-1)*5];
				temp3+=" ";
			}
				temp3+=itemdata[player.inventory[slot].id*10];
			if(player.inventory[slot].suffix){
				temp3+=" ";
				temp3+=suffixdata[(player.inventory[slot].suffix-1)*5];
			}
			if(player.inventory[slot].lock){
				append(temp,'LOCKED');
					temp4+=20;
			}
			tooltipdraw={
				type:1,
				x:mouseX,
				y:mouseY-100,
				w:140+max(20,temp3.length)*6,
				h:temp4,
				title:temp3,
				tip:temp,
				colors:temp5
			};
		}
	}
}
var removeshield=function(id){
	playertemp.shield.hp.splice(id,1);
	playertemp.shield.dur.splice(id,1);
	playertemp.shield.fx.splice(id,1);
}
var removebuff=function(id){
	playertemp.buffs.splice(id,1);
}
var losthp=0;
var takedamage=function(sourcedmg,finaldmg){
	if(player.traits[67]>0&finaldmg<sourcedmg){
		if(getbuffind(10)>=0){
			playertemp.buffs[getbuffind(10)].dur=92;
			playertemp.buffs[getbuffind(10)].pow+=(sourcedmg-finaldmg)*(player.traits[67]*0.2);
		}
		else{
			buff(10,122,(sourcedmg-finaldmg)*(player.traits[67]*0.2));
		}
	}
}
var heal=function(healp,healtype){
	if(player.traits[106]>0){
		healp*=1.13+player.traits[106]*0.02;
	}
	if(player.traits[111]>0){
		if(playertemp.phasedoor>0){
			if(healtype=="regeneration"||healtype=="HoT"||healtype=="LoT"){
				healp*=0.25;
			}
			else{
				healp*=0.5;
			}
		}
	}
	if(player.traits[113]>0){
		healp*=0.85;
	}
	//Post-modifiers
	if(player.traits[114]>0){
		if(healtype=="leech"){
			shield(healp*0.9*(1.45+player.traits[114]*0.05),180);
			healp*=0.1;
		}
	}
	player.hp+=healp;
	if(healtype=="direct"||healtype=="leech"){
		var healyr=random(230,270);
		append(particles,new createparticle(720,healyr,1.5,(250-healyr)/10,0,-(250-healyr)/500,'text',"+"+round(healp),22,0,255,-4,0,255,0));
	}
}
var spdmg=0;
var smdmg=0;
//=============================DAMAGE======================================================
var damage=function(targetgroup,indexs,pdmgs,mdmgs,armorEs,resEs,attacktypes,attackers,proccs){
	if(pdmgs<0){
		pdmgs=0;
	}
	if(mdmg<0){
		mdmgs=0;
	}
	pdmg=pdmgs;
	mdmg=mdmgs;
	spdmg=pdmgs;
	smdmg=mdmgs;
	armorE=armorEs;
	resE=resEs;
	attacktype=attacktypes;
	index=indexs;
	dmgsound=1;
	willdamage=1;
	willhit=1;
	indicatedmg=1;
	attacker=attackers;
	procc=proccs;
	if(attacktype=="DoT"){
		willhit=0;
		indicatedmg=0;
	}
	if(attacktype=="generic"){
		willhit=0;
	}
	if(attacktype=="pure"){
		willhit=0;
	}
	if(targetgroup=='player'){
		pdmg*=0.05;
		mdmg*=0.05;
		if(options.showmit>0){
			origdmg=[pdmg,mdmg];
		}
		pdmgs*=0.05;
		mdmgs*=0.05;
		dmgmultbr=1;
		for(r=0;r<playertemp.buffs.length;r+=1){
			if(playertemp.buffs[r].id==2){
				dmgmultbr*=((100-playertemp.buffs[r].pow)/100);
			}
		}
		for(tfdt=0;tfdt<traitfuncs.damagetaken.length;tfdt+=1){
			traitfuncs.damagetaken[tfdt]();
		}
		for(tfdt=0;tfdt<keystonefuncs.damagetaken.length;tfdt+=1){
			keystonefuncs.damagetaken[tfdt]();
		}
		for(tfdt=0;tfdt<traitfuncs.damagetakenpm.length;tfdt+=1){
			traitfuncs.damagetakenpm[tfdt]();
		}
		for(tfdt=0;tfdt<keystonefuncs.damagetakenpm.length;tfdt+=1){
			keystonefuncs.damagetakenpm[tfdt]();
		}
		//POST MITIGATION==========
		if(willhit){
			playertemp.timesincehittaken=0;
		}
		if(willdamage){
			if(pdmg<0){
				pdmg=0;
			}
			if(mdmg<0){
				mdmg=0;
			}
			if(pdmg+mdmg>0){
				playertemp.timesincedamagetaken=0;
			}
			shdmg=0;
			while(pdmg>0&playertemp.shield.hp.reduce(add,0)>0){
				shind=0;
				for(w=1;w<playertemp.shield.dur.length;w+=1){
					if(playertemp.shield.dur[w]<playertemp.shield.dur[shind]){
						shind=w;
					}
				}
				if(playertemp.shield.hp[shind]>pdmg){
					playertemp.shield.hp[shind]-=pdmg;
					shdmg+=pdmg;
					pdmg=0;
				}
				else{
					pdmg-=playertemp.shield.hp[shind];
					shdmg+=playertemp.shield.hp[shind];
					removeshield(shind);
				}
			}
			while(mdmg>0&playertemp.shield.hp.reduce(add,0)>0){
				shind=0;
				for(w=1;w<playertemp.shield.dur.length;w+=1){
					if(playertemp.shield.dur[i]<playertemp.shield.dur[shind]){
						shind=w;
					}
				}
				if(playertemp.shield.hp[shind]>mdmg){
					playertemp.shield.hp[shind]-=mdmg;
					shdmg+=mdmg;
					mdmg=0;
				}
				else{
					mdmg-=playertemp.shield.hp[shind];
					shdmg+=playertemp.shield.hp[shind];
					removeshield(shind);
				}
			}
			if(player.traits[5]>0){
				if(player.traits[10]>0){
					manadmg=min((((pdmg+mdmg)*(player.traits[5]/100)*100)/(((plsin(1)+plshp(0.2)))+((plsst(1))*player.traits[10]/20)))*(1-player.traits[10]*0.006),player.mp-(plsmp(1)+plshp(0.2))/10);
				}
				else{
					manadmg=min((((pdmg+mdmg)*(player.traits[5]/100)*100)/((plsin(1)+plshp(0.2))))*(1-player.traits[5]*0.006),player.mp-(plsmp(1)+plshp(0.2))/10);
				}
				pdmg-=min((pdmg*(player.traits[5]/100)),player.mp-(plsmp(1))/10);
				mdmg-=min((mdmg*(player.traits[5]/100)),player.mp-(plsmp(1))/10);
				player.mp-=min(manadmg,player.mp-(plsmp(1))/10);
					if(willhit){
						append(particles,new createparticle(775,340,0,2,0,0,'text',"-"+round(manadmg*10)/10,22,0,255,-4,0,0,200));
					}
			}
			for(tfdt=0;tfdt<traitfuncs.healthextensions.length;tfdt+=1){
				traitfuncs.healthextensions[tfdt]();
			}
			for(tfdt=0;tfdt<keystonefuncs.healthextensions.length;tfdt+=1){
				keystonefuncs.healthextensions[tfdt]();
			}
			
			for(tfdt=0;tfdt<traitfuncs.damagetakenpa.length;tfdt+=1){
				traitfuncs.damagetakenpa[tfdt]();
			}
			for(tfdt=0;tfdt<keystonefuncs.damagetakenpa.length;tfdt+=1){
				keystonefuncs.damagetakenpa[tfdt]();
			}
			
			if(pdmg+mdmg>0){
				losthp+=100*(pdmg+mdmg)/((plshp(1)));
				player.hp-=pdmg+mdmg;
			}
			if(willhit){
				if(options.loadAudio){
					if(dmgsound){
						if(pdmg+mdmg>0){
							if(pdmg+mdmg>(plshp(1))/8){
								if(pdmg+mdmg>(plshp(1))/3){
									sfx.hurtpow2.play();
								}
								else{
									sfx.hurtpow.play();
								}
							}
							else{
								sfx.hurt.play();
							}
						}
						else{
							sfx.hurt2.play();
						}
					}
				}
			}
			if(indicatedmg&options.dmgindicators){
				if(pdmg>0){
					append(particles,new createparticle(775,240,0,-2,0,0,'text',"-"+round(pdmg),22,0,255,-4,255,150,0));
				}
				if(mdmg>0){
					append(particles,new createparticle(785,240,0,2,0,0,'text',"-"+round(mdmg),22,0,255,-4,255,0,150));
				}
				if(shdmg>0){
					append(particles,new createparticle(780,240,-2,0,0,0.05,'text',"-"+round(shdmg),22,0,255,-4,200,200,230));
				}
			}
		}
		takedamage(pdmgs+mdmgs,pdmg+mdmg);
	}
	//NME DMG=================
	else if(enemies[index]){
		pdmg*=0.05;
		mdmg*=0.05;
		if(options.showmit>0){
			origdmg=[pdmg,mdmg];
		}
		for(tfdd=0;tfdd<traitfuncs.damagedealt.length;tfdd+=1){
			traitfuncs.damagedealt[tfdd]();
		}
		for(tfdd=0;tfdd<keystonefuncs.damagedealt.length;tfdd+=1){
			keystonefuncs.damagedealt[tfdd]();
		}
		if(willhit){
			for(tfoh=0;tfoh<traitfuncs.onhit.length;tfoh+=1){
				traitfuncs.onhit[tfoh]();
			}
			for(tfoh=0;tfoh<keystonefuncs.onhit.length;tfoh+=1){
				keystonefuncs.onhit[tfoh]();
			}
		}
		pdmg=max(pdmg/10,pdmg-enemies[index].armor/10*armorE);
		mdmg=max(mdmg/10,mdmg-enemies[index].res/10*resE);
		//POST MITIGATION============
		for(tfddpm=0;tfddpm<traitfuncs.damagedealtpostmit.length;tfddpm+=1){
			traitfuncs.damagedealtpostmit[tfddpm]();
		}
		for(tfddpm=0;tfddpm<keystonefuncs.damagedealtpostmit.length;tfddpm+=1){
			keystonefuncs.damagedealtpostmit[tfddpm]();
		}
		if(pdmg<0){
			pdmg=0;
		}
		if(mdmg<0){
			mdmg=0;
		}
		if(pdmg+mdmg>0){
			playertemp.timesincedamagedealt=0;
		}
		enemies[index].hp-=pdmg+mdmg;
		if(options.dmgindicators&indicatedmg){
			if(pdmg>0){
				if(options.showmit==2){
					dmgixtra=" ("+(round(pdmg*100/origdmg[0]))+"%)";
				}
				if(armorE>0){
					indcol=[255,255,0];
				}
				else{
					indcol=[160,160,160];
				}
				if(mdmg>0){
					append(dmgind,new cdmgind(enemies[index].x-10+random(-6-2*dmgind.length,6+2*dmgind.length),
					enemies[index].y-15+random(-10,10),
					round(pdmg)+dmgixtra,11,indcol[0],indcol[1],indcol[2]));
				}
				else{
					append(dmgind,new cdmgind(enemies[index].x-10+random(-6-2*dmgind.length,6+2*dmgind.length),
					enemies[index].y-5+random(-10,10),
					round(pdmg)+dmgixtra,13,indcol[0],indcol[1],indcol[2]));
				}
			}
			if(mdmg>0){
				if(options.showmit==2){
					dmgixtra=" ("+(round(mdmg*100/origdmg[1]))+"%)";
				}
				if(resE>0){
					indcol=[255,0,255];
				}
				else{
					indcol=[160,160,160];
				}
				if(pdmg>0){
					append(dmgind,new cdmgind(enemies[index].x-10+random(-15,15),
					enemies[index].y-5+random(-10,10),
					round(mdmg)+dmgixtra,11,indcol[0],indcol[1],indcol[2]));
				}
				else{
					append(dmgind,new cdmgind(enemies[index].x-10+random(-6-2*dmgind.length,6+2*dmgind.length),
					enemies[index].y-5+random(-6-2*dmgind.length,6+2*dmgind.length),
					round(mdmg)+dmgixtra,13,indcol[0],indcol[1],indcol[2]));
				}
			}
		}
	}
}
//////////////////////////////LOAD//////////////////////////////////////=======================================
var loadArea=function(){
	objects = new Array(1);
	if(options.loadAudio){sfx.raining.stop();}
	areatemp={
		raining:0,
	};
	mslast=millis();
	getBiomeData(player.biomeID);
	getEnemyData();
		terraininforaw=loadStrings("Data/Text/terrainInfo.txt");
		terraininfo=new Array(biomedata[1].length*5);
		for(n=0;n<=biomedata[1].length;n+=1){
			for(i=0;i<=4;i+=1){
				terraininfo[i+n*5]=terraininforaw[biomedata[1][n]*5+i];
				if(!(terraininfo[i+n*5]%5==0)){
					terraininfo[i+n*5]=Number(terraininfo[i+n*5]);
				}
			}
		}
		String terrainimgref[] = loadStrings("Data/Text/terrainImgRef.txt");
		terrainimg=new Array(biomedata[1].length);
		for(i=0;i<biomedata[1].length;i+=1){
			terrainimg[i]=loadShape('Data/Graphics/terrain/'+terrainimgref[biomedata[1][i]]);
		}
		enemiesimg=new Array(biomedata[8].length);
		for(i=0;i<biomedata[8].length;i+=1){
			enemiesimg[i]=new Array();
			for(ce=1;ce<1+Number(enemydata[i*30+26]);ce+=1){
				append(enemiesimg[i],loadShape("Data/Graphics/enemies/"+enemydata[i*30+1]+"/"+ce+".svg"));
			}
		}
		terrain=new Array(round(random(biomedata[3],biomedata[4])));
		for(i=0;i<terrain.length;i+=1){
			defaultterrain(i,150);
		}
		waters=new Array(biomedata[12]);
		for(i=0;i<waters.length;i+=1){
			defaultwater(i,150);
		}
		enemies=new Array(biomedata[7]);
		for(i=0;i<enemies.length;i+=1){
			defaultenemy(i,450);
		}
		gateways=new Array();
		if(!(biomedata[5]=="")){
			gateways=new Array(biomedata[5].length);
			for(i=0;i<gateways.length;i+=1){
				gateways[i]=new creategateway(0,0,0,biomedata[5][i][0],biomedata[5][i][2],biomeinforaw[(biomedata[5][i][0]-1)*20],biomeinforaw[(biomedata[5][i][0]-1)*20+9]);
				placegateway(i,biomedata[11]/2);
			}
		}
		bg=loadImage('Data/Graphics/background/'+player.biomeID+'.png');
		biomeinforaw='';
		terraininforaw='';
		if(options.loadAudio){
			if(!(bgmn==biomedata[6])){
				bgm.stop();
				bgmn=biomedata[6];
				bgm = new Howl({
				src: 'Data/Sound/music/'+biomedata[6],
				autoplay: true,
				loop: true,
				volume: options.music,
				});
			}
		}
	getBiomeScripts();
	if(biomedata[16]==1&player.record.atlas[player.biomeID]==0){
		player.record.atlas[player.biomeID]=1;
		append(particles,new createparticle(200,300,0,-1,0,0,'text','Discovered Area!',30,0,255,-2,190,240,0));
	}
}
var nmelvsc=function (nmelv){
	return ((pow(1.01,nmelv))+(0.7+nmelv*0.09)*(1+max(0,nmelv-10)*0.03+max(0,nmelv-50)*0.02)-1.1);
}
var placegateway=function(i,mindistance){
	gateways[i].x = playertemp.x+random(-biomedata[11],biomedata[11]);
	gateways[i].y = playertemp.y+random(-biomedata[11],biomedata[11]);
	while(gateways[i].x-playertemp.x<mindistance&gateways[i].x-playertemp.x>-mindistance&gateways[i].y-playertemp.y>-mindistance&gateways[i].y-playertemp.y<mindistance){
	gateways[i].x = playertemp.x+random(-biomedata[11],biomedata[11]);
	gateways[i].y = playertemp.y+random(-biomedata[11],biomedata[11]);
		}
	if(biomedata[5][i][1]<random(0.01,100)){
		gateways[i].exists=0;
	}
	else{
		gateways[i].exists=1;
	}
}
var defaultterrain=function(i,mindistance){
	terrain[i] = new createterrain(ceil(random(-0.99,-1.01+biomedata[1].length)),random(playertemp.x-1000,playertemp.x+1000),random(playertemp.y-900,playertemp.y+900),random(0,6.25));
	while(terrain[i].x-playertemp.x<mindistance&terrain[i].x-playertemp.x>-mindistance&terrain[i].y-playertemp.y>-mindistance&terrain[i].y-playertemp.y<mindistance){
		terrain[i] = new createterrain(ceil(random(-0.99,-1.01+biomedata[1].length)),random(playertemp.x-1000,playertemp.x+1000),random(playertemp.y-900,playertemp.y+900),10,random(0,6.25));
	}
}

var defaultwater=function(i,mindistance){
	waters[i] = new createwater(random(playertemp.x-1000,playertemp.x+1000),random(playertemp.y-900,playertemp.y+900),random(10,50)+random(5,40),random(10,50)+random(5,40));
	while(waters[i].x-playertemp.x<mindistance&waters[i].x-playertemp.x>-mindistance&waters[i].y-playertemp.y>-mindistance&waters[i].y-playertemp.y<mindistance){
		waters[i] = new createwater(random(playertemp.x-1000,playertemp.x+1000),random(playertemp.y-900,playertemp.y+900),random(10,50)+random(5,40),random(10,50)+random(5,40));
	}
}
var sdialogb=function(info){
	if(!(mousePressed)){
		mouselock=0;
	}
	fill(120,110,0);
	rect(100,50,600,600,40);
	fill(90,90,90);
	rect(120,70,560,560,40);
	textAlign(CENTER);
	fill(255,235,220);
	textFont(0,25);
	text(info.speaker,130,80,540,50);
	fill(220,220,240);
	textFont(0,20);
	text(info.speech,130,150,540,250);
	textAlign(LEFT,CENTER);
	textFont(0,19);
	for(s=0;s<info.answers.length;s+=1){
		if(cursorbox(130,670,355+50*s,395+50*s)){
			fill(130,180,130);
		}
		else{
			fill(130,130,130);
		}
		rect(130,355+50*s,540,40);
		fill(255,220,255);
		text(info.answers[s].answer,140,375+50*s);
		if(mousePressed&!(mouselock)){
			if(cursorbox(130,670,355+50*s,395+50*s)){
				mouselock=1;
				if(options.loadAudio){sfx.click.play();}
				info.answers[s].effect();
			}
		}
	}
	textAlign(LEFT,TOP);
}
var savegame=function(){
	temp= new Array(JSON.stringify(player),1);
	saveStrings("player "+player.name+".txt",temp);
}
var dialog=0;
var dialoga=0;
var killquests=new Array();
//biome funcs
var getBiomeScripts=function(){
	biomescripts=new Array();
	killquests=new Array();
	if(player.biomeID==1){
		if(!(player.record.quests[1])){
			if(player.level<2){
				player.record.quests[1]=0;
			}
			else{
				player.record.quests[1]=1;
			}
		}
		if(player.record.quests[1]<1){
			cinematic[0]=="dialog";
			dialoga=1;
			dialog=function(){
				sdialogb({
					speaker:"Unknown Voice",
					speech:"Welcome to Project Infinity! This is an RPG focusing on adventure and character building. To get you started, I will give you a weapon, because it's dangerous to go alone. No, really. Pretty much everything outside the Nexus will attempt to kill you. Which weapon will you choose?",
					answers:[
						{
							answer:"Sword and Shield",
							effect:function(){
								if(player.name.substring(player.name.length-4,player.name.length)=="Link"||player.name.substring(0,4)=="Link"){
									player.inventory.LH={
										id:27,
										level:1,
										rolls:{
											hp:0.85,
											mp:0.85,
											hpregen:0.85,
											mpregen:0.85,
											str:0.85,
											intel:0.85,
											armor:0.85,
											res:0.85
										}
									};
								}
								else{
									player.inventory.LH={
										id:0,
										level:1,
										rolls:{
											hp:0.85,
											mp:0.85,
											hpregen:0.85,
											mpregen:0.85,
											str:0.85,
											intel:0.85,
											armor:0.85,
											res:0.85
										}
									};
								}
								player.inventory.RH={
									id:1,
									level:1,
									rolls:{
										hp:0.85,
										mp:0.85,
										hpregen:0.85,
										mpregen:0.85,
										str:0.85,
										intel:0.85,
										armor:0.85,
										res:0.85
									}
								};
								loadtraits();
								recalstats();
								dialog=function(){
									sdialogb({
										speaker:"Unknown Voice",
										speech:"Use the fountain to enter the wilderness. For further assistance, you can open the help screen by pressing 'H'. Good luck!",
										answers:[
											{
												answer:"Thanks",
												effect:function(){
													player.record.quests[1]=1;
													player.sp+=1;
													dialog=0;
													cinematic[0]=0;
													dialoga=0;
													savegame();
												}
											},
											{
												answer:"(Say nothing)",
												effect:function(){
													player.record.quests[1]=1;
													dialog=0;
													cinematic[0]=0;
													dialoga=0;
													savegame();
												}
											},
										]
									});
								}
							}
						},
						{
							answer:"Bow",
							effect:function(){
								player.sp+=10;
								player.inventory.LH={
									id:5,
									level:1,
									rolls:{
										hp:0.85,
										mp:0.85,
										hpregen:0.85,
										mpregen:0.85,
										str:0.85,
										intel:0.85,
										armor:0.85,
										res:0.85
									}
								};
								loadtraits();
								recalstats();
								dialog=function(){
									sdialogb({
										speaker:"Unknown Voice",
										speech:"Use the fountain to enter the wilderness. For further assistance, you can open the help screen by pressing 'H'. Good luck!",
										answers:[
											{
												answer:"Thanks",
												effect:function(){
													player.record.quests[1]=1;
													player.sp+=1;
													dialog=0;
													cinematic[0]=0;
													dialoga=0;
													savegame();
												}
											},
											{
												answer:"(Say nothing)",
												effect:function(){
													player.record.quests[1]=1;
													dialog=0;
													cinematic[0]=0;
													dialoga=0;
													savegame();
												}
											},
										]
									});
								}
							}
						},
						{
							answer:"Energy Staff",
							effect:function(){
								player.sp+=10;
								player.inventory.LH={
									id:55,
									level:1,
									rolls:{
										hp:0.85,
										mp:0.85,
										hpregen:0.85,
										mpregen:0.85,
										str:0.85,
										intel:0.85,
										armor:0.85,
										res:0.85
									}
								};
								loadtraits();
								recalstats();
								dialog=function(){
									sdialogb({
										speaker:"Unknown Voice",
										speech:"Use the fountain to enter the wilderness. For further assistance, you can open the help screen by pressing 'H'. Good luck!",
										answers:[
											{
												answer:"Thanks",
												effect:function(){
													player.record.quests[1]=1;
													player.sp+=1;
													dialog=0;
													cinematic[0]=0;
													dialoga=0;
													savegame();
												}
											},
											{
												answer:"(Say nothing)",
												effect:function(){
													player.record.quests[1]=1;
													dialog=0;
													cinematic[0]=0;
													dialoga=0;
													savegame();
												}
											},
										]
									});
								}
							}
						},
					]
				});
			}
		}
	}
	if(player.biomeID==4){
		if(!(player.record.quests[2])){
			player.record.quests[2]=0;
		}
		if(player.record.quests[2]<1){
			append(killquests,{name:"Nature Crystals",run:function(){
				player.record.quests[2]=1;
				append(particles,new createparticle(350,300,0,-0.3,0,0,'text','Found Nature Shard! Return to the Infuser to repair it.',25,0,255,-1.5,255,255,100));
				killquests.splice(kq,1);
				kq-=1;
			}
			});
		}
	}
	if(player.biomeID==1){
		append(biomescripts,function(){
			//Walls
			if(render){fill(100,100,100);
			rect(-1200-playertemp.x,-550-playertemp.y,2400,400);
			rect(-1200-playertemp.x,650-playertemp.y,2400,400);
			rect(-400-playertemp.x,-550-playertemp.y,400,2400);
			rect(800-playertemp.x,-550-playertemp.y,400,2400);}
			if(playertemp.y<-495){
				playertemp.y=-495;
			}
			if(playertemp.y>295){
				playertemp.y=295;
			}
			if(playertemp.x<-395){
				playertemp.x=-395;
			}
			if(playertemp.x>395){
				playertemp.x=395;
			}
			//Fountain
			if(render){ellipseMode(CENTER);
			fill(135,135,155);
			ellipse(400-playertemp.x,160-playertemp.y,80,80);
			fill(0+abs(tick%240-120)/4,0+abs(tick%240-120)/4,255,130+0+abs(tick%150-75)/2);
			ellipse(400-playertemp.x,160-playertemp.y,65,65);
			fill(165,165,165);
			ellipse(400-playertemp.x,160-playertemp.y,30,30);
			fill(0+abs(tick%240-120)/4,0+abs(tick%240-120)/4,255,130+0+abs(tick%150-75)/2);
			ellipse(400-playertemp.x,160-playertemp.y,20,20);
			rectMode(CENTER);
			rect(400-playertemp.x,160-playertemp.y,40,10);
			rect(400-playertemp.x,160-playertemp.y,10,40);}
			
			if(pow(playertemp.x,2)+pow(playertemp.y+190,2)<pow(42+player.size,2)){
				playertemp.x-=playertemp.xvelo;
				playertemp.y-=playertemp.yvelo;
			}
			if(!(cinematic||dialoga)){
				if(keyPressed&keyCode==UP&pow(playertemp.x,2)+pow(playertemp.y+190,2)<pow(62+player.size,2)){
					getAtlas();
					inventory=3;
				}
			}
			//Enchanter
			if(render){ellipseMode(CENTER);
			fill(40,0,50);
			ellipse(600-playertemp.x,-playertemp.y,60,60);
			rect(575-playertemp.x,-25-playertemp.y,30,30);
			rect(625-playertemp.x,-25-playertemp.y,30,30);
			rect(575-playertemp.x,25-playertemp.y,30,30);
			rect(625-playertemp.x,25-playertemp.y,30,30);
			fill(min(255,max(0,255-pow(pow(playertemp.x-200,2)+pow(playertemp.y+350,2),0.5))),min(255,max(0,255-pow(pow(playertemp.x-200,2)+pow(playertemp.y+350,2),0.5)*2)),min(255,max(0,255-pow(pow(playertemp.x-200,2)+pow(playertemp.y+350,2),0.5))));
			ellipse(600-playertemp.x,-playertemp.y,35,35);}
			if(playertemp.x<250&playertemp.x>150&playertemp.y<-300&playertemp.y>-400){
				playertemp.x-=playertemp.xvelo;
				playertemp.y-=playertemp.yvelo;
			}
			if(!(cinematic||dialoga)){
				if(keyPressed&keyCode==UP&playertemp.x<275&playertemp.x>125&playertemp.y<-275&playertemp.y>-425){
					getinventorysprites();
				tooltipcache[0]=-1;
					inventory=1;
					fusionselect=0;
					enchantmode=0;
					inventype=2;
				helpscreen={active:0,help:0};
				}
			}
			//Artisan's Bench
			if(render){ellipseMode(CENTER);
				fill(120,65,0);
				rect(400-playertemp.x,-30-playertemp.y,70,40);
				fill(100,55,0);
				rect(390-playertemp.x,-25-playertemp.y,40,22);
				if(player.record.bosses[1]>0){
					fill(60,35,0);
					rect(417-playertemp.x,-28-playertemp.y,5,25);
					fill(170,170,170);
					rect(417-playertemp.x,-38-playertemp.y,11,7);
				}
				fill(90,90,0);
				rect(430-playertemp.x,-23-playertemp.y,5,10);
				fill(170,170,170);
				rect(430-playertemp.x,-33-playertemp.y,5,10);
			}
			if(playertemp.x<38&playertemp.x>-38&playertemp.y<-357&playertemp.y>-403){
				playertemp.x-=playertemp.xvelo;
				playertemp.y-=playertemp.yvelo;
			}
			if(!(cinematic||dialoga)){
				if(keyPressed&keyCode==UP&playertemp.x<50&playertemp.x>-50&playertemp.y<-340&playertemp.y>-420){
					getinventorysprites();
				tooltipcache[0]=-1;
					inventory=1;
					inventype=4;
				helpscreen={active:0,help:0};
				}
			}
			//Infuser
			if(render){ellipseMode(CENTER);
			fill(80,120,70);
			triangle(190-playertemp.x,-30-playertemp.y,210-playertemp.x,-30-playertemp.y,200-playertemp.x,-10-playertemp.y);
			if(player.record.quests[2]>=2){
				triangle(190-playertemp.x,30-playertemp.y,210-playertemp.x,30-playertemp.y,200-playertemp.x,10-playertemp.y);
			}
			triangle(170-playertemp.x,10-playertemp.y,170-playertemp.x,-10-playertemp.y,190-playertemp.x,-playertemp.y);
			triangle(230-playertemp.x,10-playertemp.y,230-playertemp.x,-10-playertemp.y,210-playertemp.x,-playertemp.y);
			fill(60,60,60,max(40,pow(pow(playertemp.x+200,2)+pow(playertemp.y+350,2),0.5)*6));
			strokeWeight(8);
			stroke(255-pow(pow(playertemp.x+200,2)+pow(playertemp.y+350,2),0.5)*3,255-pow(pow(playertemp.x+200,2)+pow(playertemp.y+350,2),0.5)*3,255-pow(pow(playertemp.x+200,2)+pow(playertemp.y+350,2),0.5)*3);
			ellipse(200-playertemp.x,-playertemp.y,60,60);
			/*strokeWeight(3);
			stroke(60,60,60,150);
			line(220-playertemp.x,-playertemp.y*/
			noStroke();
			}
			if(player.record.quests[2]==1){
				if(tick%3==0){
					append(particles,new createparticle(random(-25,25)-200,random(-25,25)-350,random(-2,2),random(-2,2),0,0,
					'circle','',random(5,7),random(-0.2,0.2),random(160,220),random(-4,-3),255,255,150,1));
				}
			}
			if(!(cinematic||dialoga)){
				if(keyPressed&keyCode==UP&playertemp.x<-175&playertemp.x>-225&playertemp.y<-325&playertemp.y>-375){		
					if(player.record.quests[2]<1){
						cinematic[0]=="dialog";
						dialoga=1;
						dialog=function(){
							sdialogb({
								speaker:"Tattered Note",
								speech:"The Infuser is missing a crucial component and cannot be used. However, it can easily be fixed with a Shard of Nature. These can be found in the jungle. Once fixed, the Infuser can be used to gain powerful bonuses after spending enough PP on passives in your inventory.",
								answers:[
									{
										answer:"(Leave)",
										effect:function(){
												dialog=0;
												cinematic[0]=0;
												dialoga=0;
										}
									}
								],
							});
						}
						}
						else if(player.record.quests[2]<2){
							cinematic[0]=="dialog";
							dialoga=1;
							dialog=function(){
								sdialogb({
									speaker:"Tattered Note",
									speech:"The Infuser is missing a crucial component and cannot be used. However, it can easily be fixed with a Shard of Nature. These can be found in the jungle. Once fixed, the Infuser can be used to gain powerful bonuses after spending enough PP on passives in your inventory.",
									answers:[
										{
											answer:"(Insert Shard of Nature)",
											effect:function(){
													if(options.loadAudio){sfx.upgrade.play();}
													player.record.quests[2]=2;
													dialog=0;
													cinematic[0]=0;
													dialoga=0;
													savegame();
													keystoneselec=[0,0];
													tooltipcache[0]=-1;
													inventory=1;
													inventype=3;
													helpscreen={active:0,help:0};
												}
											}
										],
									});
								}
						}
						else{
							keystoneselec=[0,0];
							tooltipcache[0]=-1;
							inventory=1;
							inventype=3;
							helpscreen={active:0,help:0};
						}
				
				}
			}
			rectMode(CORNER);
		});
	}
	else{
		stemp=[random(-1700,1700),random(-1700,1700)];
		while(stemp[0]<200&stemp[0]>-200&stemp[1]<200&stemp[1]>-200){
			stemp=[random(-1700,1700),random(-1700,1700)];
		}
		append(stateffectsg,{name:'Restoration Pool',size:35,active:1,x:stemp[0],y:stemp[1],biomelock:player.biomeID,tick:0,run:function(){
			translate(stateffectsg[n].x-playertemp.x+400,stateffectsg[n].y-playertemp.y+350);
			rotate(PI/4);
			fill(80,80,80);
			rect(-35,-35,70,70);
			rotate(PI/4);
			rect(-35,-35,70,70);
			fill(20,20,20);
			ellipse(0,0,40,40);
			if(stateffectsg[n].active){
				fill(55+abs(tick%100-50)*4,55+abs(tick%300-150)*4/3,55+abs(tick%200-100)*2,155+abs(tick%50-25)*4);
				ellipse(0,0,40,40);
			}
			resetMatrix();
		if(stateffectsg[n].x-playertemp.x<-1900||stateffectsg[n].x-playertemp.x>1900||stateffectsg[n].y-playertemp.y<-1900||stateffectsg[n].y-playertemp.y>1900){
			stateffectsg[n].x=random(-1700,1700)+playertemp.x;
			stateffectsg[n].y=random(-1700,1700)+playertemp.y;
			stateffectsg[n].active=1;
			while(stateffectsg[n].x-playertemp.x<400&stateffectsg[n].x-playertemp.x>-400&stateffectsg[n].y-playertemp.y<350&stateffectsg[n].y-playertemp.y>-350){
				stateffectsg[n].x=random(-1700,1700)+playertemp.x;
				stateffectsg[n].y=random(-1700,1700)+playertemp.y;
			}
		}
		if(stateffectsg[n].x-playertemp.x>-(stateffectsg[n].size+player.size)&
			stateffectsg[n].x-playertemp.x<(stateffectsg[n].size+player.size)&
			stateffectsg[n].y-playertemp.y>-(stateffectsg[n].size+player.size)&
			stateffectsg[n].y-playertemp.y<(stateffectsg[n].size+player.size)){
			if(abs(playertemp.x-stateffectsg[n].x)>abs(playertemp.y-stateffectsg[n].y)){
				if(playertemp.x-stateffectsg[n].x>0){
					//right
					playertemp.x=stateffectsg[n].x+(stateffectsg[n].size+player.size);
				}
				else{
					//left
					playertemp.x=stateffectsg[n].x-(stateffectsg[n].size+player.size);
				}
			}
			else{
				if(playertemp.y-stateffectsg[n].y>0){
					//down
					playertemp.y=stateffectsg[n].y+(stateffectsg[n].size+player.size);
				}
				else{
					//up
					playertemp.y=stateffectsg[n].y-(stateffectsg[n].size+player.size);
				}
			}
		}
		if(stateffectsg[n].active){
			if(pow(playertemp.x-stateffectsg[n].x,2)+pow(playertemp.y-stateffectsg[n].y,2)<pow(50+player.size,2)){
				if(keyPressed&keyCode==UP){
						stateffectsg[n].active=0;
						append(particles,new createparticle(stateffectsg[n].x,stateffectsg[n].y,0,0,0,0,'circle','',25,2,100,-2,0,255,0,1));
						player.hp+=(plshp(1));
						player.mp+=(plsmp(1));
				}
			}
		}
		if(!(player.biomeID==stateffectsg[n].biomelock)||playertemp.inBossFight==1){
			stateffectsg.splice(n,1);
			n-=1;
		}
		}});
	}
	if(player.biomeID==13){
		append(stateffectsg,{name:'wastelands portal',x:random(-1300,1300),y:random(-1300,1300),tick:0,run:function(){
			if(render){
			fill(200,255,255);
			textFont(0,16);
			textAlign(CENTER);
			text("Wastelands (LV 67)",350+stateffectsg[n].x-playertemp.x,285+stateffectsg[n].y-playertemp.y,100,50);
			textAlign(TOP,LEFT);
			fill(80,80,0,150);
			ellipseMode(CENTER);
			ellipse(400+stateffectsg[n].x-playertemp.x,350+stateffectsg[n].y-playertemp.y,45,60);
			}
			if(stateffectsg[n].x-playertemp.x<-1400||stateffectsg[n].x-playertemp.x>1400||stateffectsg[n].y-playertemp.y<-1400||stateffectsg[n].y-playertemp.y>1400){
				stateffectsg[n].x=random(-1200,1200)+playertemp.x;
				stateffectsg[n].y=random(-1200,1200)+playertemp.y;
				while(stateffectsg[n].x-playertemp.x<400&stateffectsg[n].x-playertemp.x>-400&stateffectsg[n].y-playertemp.y<350&stateffectsg[n].y-playertemp.y>-350){
					stateffectsg[n].x=random(-1200,1200)+playertemp.x;
					stateffectsg[n].y=random(-1200,1200)+playertemp.y;
				}
			}
			if(tick%30==0&stateffectsg[n].x-playertemp.x<400){
				append(particles,new createparticle(stateffectsg[n].x,stateffectsg[n].y,0,0,0,0,'circle','',25,2,100,-2,80,80,0,1));
			}
			if(pow(playertemp.x-stateffectsg[n].x,2)+pow(playertemp.y-stateffectsg[n].y,2)<pow(30+player.size,2)){
				if(keyPressed&keyCode==UP){
					if(player.record.quests[3]==1){
						player.biomeID=16;
						playertemp.x=0;
						playertemp.y=0;
						loadArea();
						if(options.autosave){
							temp= new Array(JSON.stringify(player),1);
							saveStrings("player "+player.name+".txt",temp);
							append(particles,new createparticle(300,150,0,0,0,0,'text','GAME SAVED',30,0,255,-3,150,255,0));
						}
					}
					else{
						cinematic[0]=="dialog";
						dialoga=1;
						dialog=function(){
							sdialogb({
								speaker:"",
								speech:"A vile force prevents you from entering! Perhaps there is an item that will allow you to...",
								answers:[{
									answer:"(Turn back)",
									effect:function(){
											dialog=0;
											cinematic[0]=0;
											dialoga=0;
										}
									}
								],
							});
						}
					}
				}
			}
			if(!(player.biomeID==13)||playertemp.inBossFight==1){
				stateffectsg.splice(n,1);
				n-=1;
			}
		}});
		append(stateffectsg,{name:'shrek arena',x:random(-1300,1300),y:random(-1300,1300),tick:0,run:function(){
			if(render){
			fill(200,255,255);
			textFont(0,14);
			textAlign(CENTER);
			text("Swamp Clearing - No humans allowed!",300+stateffectsg[n].x-playertemp.x,285+stateffectsg[n].y-playertemp.y,200,50);
			textAlign(TOP,LEFT);
			fill(0,100,0,150);
			ellipseMode(CENTER);
			ellipse(400+stateffectsg[n].x-playertemp.x,350+stateffectsg[n].y-playertemp.y,45,60);
			}
			if(stateffectsg[n].x-playertemp.x<-1400||stateffectsg[n].x-playertemp.x>1400||stateffectsg[n].y-playertemp.y<-1400||stateffectsg[n].y-playertemp.y>1400){
				stateffectsg[n].x=random(-1200,1200)+playertemp.x;
				stateffectsg[n].y=random(-1200,1200)+playertemp.y;
				while(stateffectsg[n].x-playertemp.x<400&stateffectsg[n].x-playertemp.x>-400&stateffectsg[n].y-playertemp.y<350&stateffectsg[n].y-playertemp.y>-350){
					stateffectsg[n].x=random(-1200,1200)+playertemp.x;
					stateffectsg[n].y=random(-1200,1200)+playertemp.y;
				}
			}
			if(tick%45==0&stateffectsg[n].x-playertemp.x<400){
				append(particles,new createparticle(stateffectsg[n].x,stateffectsg[n].y,0,0,0,0,'circle','',25,3,75,-2.5,150,30,0,1));
			}
			if(pow(playertemp.x-stateffectsg[n].x,2)+pow(playertemp.y-stateffectsg[n].y,2)<pow(30+player.size,2)){
				if(keyPressed&keyCode==UP){
					objects=new Array(1);
					terrain=new Array(0);
					waters=new Array(0);
					enemies=new Array(0);
					gateways=new Array(0);
					playertemp.x=0;
					playertemp.y=0;
					playertemp.inBossFight=1;
					biomedata[2]=[30,50,0];
					if(options.loadAudio){sfx.shrek.play();bgm.stop();}
					tick=0;
					bgmn="boss.mp3";
					append(stateffects,{name:'delayed boss music',tick:0,run:function(){
						if(stateffects[n].tick>180){
							if(playertemp.inBossFight){
							bgm=new Howl({
							src: 'Data/Sound/music/boss.mp3',
							autoplay: true,
							loop: true,
							volume: options.music,
							});
							}
							stateffects.splice(n,1);
							n-=1;
						}
					}});
							append(enemies,{
								lv:40,
								x:0,
								y:-250,
								size:22,
								name:"Shrek",
								mhp:7000*nmelvsc(40),
								hp:7000*nmelvsc(40),
								ai:3,
								dmgmin:1,
								dmgmax:1,
								speed:2.3,
								str:80*nmelvsc(40),
								intel:55*nmelvsc(40),
								armor:40*nmelvsc(40),
								res:40*nmelvsc(40),
								dir:0,
								turnstyle:1,
								tenacity:92,
								stun:0,
								action:{
									id:1,
									tick:0
								},
								haste:1,
								legtick:0,
								larmtick:0,
								clubd:0,
								clubs:100,
								height:0,
								cds:{charge:180,earthquake:600},
								xp:150,
								ppv:0,
								ppd:0,
								soulv:0,
								spdmod:1,
								enraged:0,
								disablehpbar:1,
								isBoss:1,
								persistent:1,
								imgtype:3,
								reactant:0,
								spritec:{
									main:loadShape("Data/Graphics/bosses/shrek/body.svg"),
									arm:loadShape("Data/Graphics/bosses/shrek/arm.svg"),
									leg:loadShape("Data/Graphics/bosses/shrek/leg.svg"),
									club:loadShape("Data/Graphics/bosses/shrek/club.svg")
								},
								draw:function(i){
									if(enemies[i].action.id==3){
										if(enemies[i].action.active&!(enemies[i].action.proc)){
											if(enemies[i].y<-375||enemies[i].y>275||enemies[i].x<-375||enemies[i].x>375){
												enemies[i].action.proc=1;
												damage('player',0,random(enemies[i].str*10,enemies[i].str*11),0,1,1,"melee",i,0);
											}
										}
									}
									if(enemies[i].y<-375){
										enemies[i].y=-375;
									}
									if(enemies[i].y>275){
										enemies[i].y=275;
									}
									if(enemies[i].x<-375){
										enemies[i].x=-375;
									}
									if(enemies[i].x>375){
										enemies[i].x=375;
									}
									bosshpbar={name:"Shrek",val:enemies[i].hp/enemies[i].mhp};
									if(enemies[i].enraged&tick%12==0){
										append(particles,new createparticle(enemies[i].x+random(-20,20),enemies[i].y+random(-20,20),0,0,0,0,'circle','',40,-0.5,255,-15,255,0,0,1));
									}
										translate(10*(1+enemies[i].height/100),0);
										shape(enemies[i].spritec.leg,0,0,60*(1+enemies[i].height/100),(1+enemies[i].height/100)*(180*abs((enemies[i].legtick)%40-20)/20-90));
										shape(enemies[i].spritec.leg,0,0,60*(1+enemies[i].height/100),(1+enemies[i].height/100)*(90-180*abs((enemies[i].legtick+20)%40-20)/20));
										translate(-20*(1+enemies[i].height/100),0);
										shape(enemies[i].spritec.leg,0,0,60*(1+enemies[i].height/100),(1+enemies[i].height/100)*(180*abs((enemies[i].legtick+20)%40-20)/20-90));
										shape(enemies[i].spritec.leg,0,0,60*(1+enemies[i].height/100),(1+enemies[i].height/100)*(90-180*abs((enemies[i].legtick)%40-20)/20));
										translate(-15*(1+enemies[i].height/100),0);
										rotate(PI);
										if(!(90-180*abs((enemies[i].larmtick)%60-30)/30==0)){
											shape(enemies[i].spritec.arm,0,0,60*(1+enemies[i].height/100),(1+enemies[i].height/100)*(90-180*abs((enemies[i].larmtick)%60-30)/30));
										}
										rotate(PI);
										translate(25*(1+enemies[i].height/100),0);
										shape(enemies[i].spritec.main,0,0,60*(1+enemies[i].height/100),(1+enemies[i].height/100)*(90));
										shape(enemies[i].spritec.arm,25,0,60*(1+enemies[i].height/100),(1+enemies[i].height/100)*(20));
										translate(31*(1+enemies[i].height/100),-8*(1+enemies[i].height/100));
										rotate(enemies[i].clubd);
										shape(enemies[i].spritec.club,0,0,60*(1+enemies[i].height/100)*enemies[i].clubs/100,(1+enemies[i].height/100)*(90*enemies[i].clubs/100));
								},
								loot:0,
								vision:1000,
								ondeath:function(i){
									//Defeat boss
									bosshpbar={name:"Shrek",val:0};
									if(options.loadAudio){sfx.shrekdeath.play();}
									if(!(player.record.bosses[1])){
										player.record.bosses[1]=1;
										player.pp+=10000;
										cinematic[0]=="dialog";
										dialoga=1;
										dialog=function(){
											sdialogb({
												speaker:"",
												speech:"You feel you have gained wisdom from this battle (+100 PP). You also notice a small hammer on the ground and pick it up (you can now lower stat rolls on equipment to free up points at the Artisan's Bench).",
												answers:[
													{
														answer:"(Leave)",
														effect:function(){
																dialog=0;
																cinematic[0]=0;
																dialoga=0;
														}
													}
												],
											});
										}
									}
									append(stateffectsg,{name:'shrek arena',x:0,y:100,tick:0,run:function(){
										if(render){
											fill(0,100,0,150);
											ellipseMode(CENTER);
											ellipse(400+stateffectsg[n].x-playertemp.x,350+stateffectsg[n].y-playertemp.y,45,60);
										}
										if(tick%45==0&stateffectsg[n].x-playertemp.x<400){
											append(particles,new createparticle(stateffectsg[n].x,stateffectsg[n].y,0,0,0,0,'circle','',25,3,75,-2.5,0,90,0,1));
										}
										if(pow(playertemp.x-stateffectsg[n].x,2)+pow(playertemp.y-stateffectsg[n].y,2)<pow(30+player.size,2)){
											if(keyPressed&keyCode==UP){
												playertemp.inBossFight=0;
												loadArea();
											}
										}
										if(!(player.biomeID==13)||playertemp.inBossFight==0){
											stateffectsg.splice(n,1);
											n-=1;
										}
									}});
									enemies.splice(i,1);
									i-=1;
								},
								ondespawn:function(i){
									enemies.splice(i,1);
									i-=1;
								},
								aim:function(i){
									if(enemies[i].cds.charge>0){
										enemies[i].cds.charge-=1;
									}
									if(enemies[i].cds.earthquake>0){
										enemies[i].cds.earthquake-=1;
									}
									//Move
									if(enemies[i].action.id==1){
										if(!(enemies[i].enraged)&enemies[i].hp/enemies[i].mhp<0.3){
											enemies[i].enraged=1;
											enemies[i].str*=1.5;
											enemies[i].speed*=1.5;
										}
										nmesa.pointatplayer(i);
										nmesa.displace(i,1);
										enemies[i].legtick+=1;
										enemies[i].larmtick+=1;
										enemies[i].clubd=5*PI/4;
										enemies[i].clubs=100;
										enemies[i].height=0;
										if(enemies[i].cds.earthquake<=0){
											enemies[i].action.tick=0;
											enemies[i].action.id=4;
											enemies[i].cds.earthquake=1200;
											if(options.loadAudio){sfx.jumpbig.play();}
										}
										else if(enemies[i].cds.charge<=0){
											if(pow(playertemp.x-enemies[i].x,2)+pow(playertemp.y-enemies[i].y,2)<pow(200,2)){
												enemies[i].action.tick=0;
												enemies[i].action.active=0;
												enemies[i].action.proc=0;
												enemies[i].action.id=3;
												enemies[i].cds.charge=420;
												if(options.loadAudio){sfx.dashbig.play();}
											}
										}
										else if(pow(playertemp.x-enemies[i].x,2)+pow(playertemp.y-enemies[i].y,2)<pow(40,2)){
											enemies[i].action.tick=0;
											enemies[i].action.id=2;
										}
									}
									//Swing
									else if(enemies[i].action.id==2){
										if(enemies[i].action.tick<10){
											if(enemies[i].larmtick<30){
												enemies[i].larmtick=max(10,enemies[i].larmtick%60-1);
											}
											else{
												enemies[i].larmtick=min(50,enemies[i].larmtick%60+1);
											}
										}
										else{
											if(!((enemies[i].larmtick)%60==30)){
												if((enemies[i].larmtick)%60>30){
													enemies[i].larmtick=max(38,enemies[i].larmtick%60-1);
												}
												else{
													enemies[i].larmtick=min(22,enemies[i].larmtick%60+1);
												}
											}
											if(enemies[i].action.tick<20){
												enemies[i].clubd-=0.5;
												enemies[i].clubs-=4;
											}
											else if(enemies[i].action.tick==20){
												if(options.loadAudio){
													sfx.bomb.play();}
												append(particles,new createparticle(enemies[i].x+sin(enemies[i].dir)*40,enemies[i].y-cos(enemies[i].dir)*40,0,0,0,0,'circle','',120,-2,255,-13,180,140,0,1));
												append(objects,{
													type:'AoE',
													target:'player',
													size:60,
													duration:0,
													rangetype:"melee",
													x:enemies[i].x+sin(enemies[i].dir)*40,
													y:enemies[i].y-cos(enemies[i].dir)*40,
													pdmgmin:enemies[i].str*13,
													pdmgmax:enemies[i].str*15,
													hitc:0,
													mdmgmin:0,
													mdmgmax:0,
													armorE:1,
													resE:1,
													procc:2,
													hits:new Array(999),
												});
											}
											else if(enemies[i].action.tick>40){
												enemies[i].clubd+=0.075;
												enemies[i].clubs+=2/3;
											}
											if(enemies[i].action.tick>100){
												enemies[i].action.tick=0;
												enemies[i].action.id=1;
											}
										}
									}
									//Charge
									else if(enemies[i].action.id==3){
										enemies[i].legtick+=2;
										if(enemies[i].action.tick<10){
											if(enemies[i].larmtick>30){
												enemies[i].larmtick=max(30,enemies[i].larmtick%60-1);
											}
											else{
												enemies[i].larmtick=min(30,enemies[i].larmtick%60+1);
											}
										}
										else{
											nmesa.displace(i,5);
											if(enemies[i].action.active){
												playertemp.x=enemies[i].x+sin(enemies[i].dir)*25;
												playertemp.y=enemies[i].y-cos(enemies[i].dir)*25;
											}
											else if(pow(playertemp.x-enemies[i].x,2)+pow(playertemp.y-enemies[i].y,2)<pow(30+player.size,2)){
												enemies[i].action.active=1;
												enemies[i].cds.earthquake-=420;
												damage('player',0,random(enemies[i].str*6,enemies[i].str*7),0,1,1,"melee",i,0);
											}
											if(enemies[i].action.tick>40){
												enemies[i].action.tick=0;
												enemies[i].action.id=1;
											}
										}
									}
									//Earthquake
									else if(enemies[i].action.id==4){
										if(enemies[i].action.tick<30){
											if(enemies[i].larmtick<30){
												enemies[i].larmtick=max(0,enemies[i].larmtick%60-1);
											}
											else{
												enemies[i].larmtick=min(60,enemies[i].larmtick%60+1);
											}
											enemies[i].height+=2;
										}
										else if(enemies[i].action.tick<50){
											enemies[i].clubd-=0.25;
											enemies[i].clubs-=2;
											enemies[i].height-=3;
										}
										else if(enemies[i].action.tick<200){
											if(enemies[i].action.tick==50){
												if(options.loadAudio){sfx.bomb.play();}
												append(particles,new createparticle(enemies[i].x,enemies[i].y,0,0,0,0,'circle','',120,-2,255,-13,180,140,0,1));
												append(objects,{
													type:'AoE',
													target:'player',
													size:60,
													duration:0,
													rangetype:"melee",
													x:enemies[i].x,
													y:enemies[i].y,
													pdmgmin:enemies[i].str*18,
													pdmgmax:enemies[i].str*20,
													hitc:0,
													mdmgmin:0,
													mdmgmax:0,
													armorE:1,
													resE:1,
													procc:2,
													hits:new Array(999),
													endfunc:function(){
														if(objects[n].hitc>0){
															playertemp.speed-=0.6;
															append(stateffects,{name:'cripple',tick:0,run:function(){
																if(stateffects[n].tick>=120){
																	playertemp.speed+=0.6;
																	stateffects.splice(n,1);
																	n-=1;
																}
															}
															});
														}
													}
												});
											}
											if(enemies[i].action.tick==70){
												if(options.loadAudio){sfx.earthquake.play();}
											}
											if((enemies[i].action.tick+10)%30==0){
												append(stateffectsg,{name:'Shrek earthquake',source:i,x:enemies[i].x,y:enemies[i].y,size:(enemies[i].action.tick-35)*9,dmg:random(enemies[i].str*17,enemies[i].str*18),tick:0,run:function(){
													if(render){
														noFill();
														strokeWeight(80);
														if(stateffectsg[n].tick>=45){
															stroke(170,120,0,255-(stateffectsg[n].tick-45)*17);
														}
														else{
															stroke(255,0,0,stateffectsg[n].tick*3);
														}
														ellipse(stateffectsg[n].x-playertemp.x+400,stateffectsg[n].y-playertemp.y+350,stateffectsg[n].size,stateffectsg[n].size);
														noStroke();
													}
													if(stateffectsg[n].tick==45){
														if(pow(playertemp.x-stateffectsg[n].x,2)+pow(playertemp.y-stateffectsg[n].y,2)<pow(stateffectsg[n].size/2+40+player.size,2)){
															if(!(pow(playertemp.x-stateffectsg[n].x,2)+pow(playertemp.y-stateffectsg[n].y,2)<pow(stateffectsg[n].size/2-40-player.size,2))){
																damage('player',0,stateffectsg[n].dmg,0,1,1,"melee",stateffectsg[n].source,0);
																playertemp.speed-=0.6;
																append(stateffects,{name:'cripple',tick:0,run:function(){
																	if(stateffects[n].tick>=120){
																		playertemp.speed+=0.6;
																		stateffects.splice(n,1);
																		n-=1;
																	}
																}
																});
															}
														}
													}
													if(stateffectsg[n].tick>=60){
														stateffectsg.splice(n,1);
														n-=1;
													}
												}});
											}
										}
										else if(enemies[i].action.tick<240){
											enemies[i].clubd+=0.125;
											enemies[i].clubs+=1;
										}
										else{
											enemies[i].action.tick=0;
											enemies[i].action.id=1;
										}
									}
									enemies[i].action.tick+=1;
								}
							});
					append(biomescripts,function(){
						if(areatemp.raining<=0){
							if(options.loadAudio){sfx.raining.play();}
						}
						areatemp.raining=666;
						//Walls
						if(render){fill(0,50,0);
						rect(-1200-playertemp.x,-450-playertemp.y,2400,400);
						rect(-1200-playertemp.x,650-playertemp.y,2400,400);
						rect(-800-playertemp.x,-550-playertemp.y,800,2400);
						rect(800-playertemp.x,-550-playertemp.y,800,2400);}
						if(playertemp.y<-395){
							playertemp.y=-395;
						}
						if(playertemp.y>295){
							playertemp.y=295;
						}
						if(playertemp.x<-395){
							playertemp.x=-395;
						}
						if(playertemp.x>395){
							playertemp.x=395;
						}
					});
				}	
			}
			if(!(player.biomeID==13)||playertemp.inBossFight==1){
				stateffectsg.splice(n,1);
				n-=1;
			}
		}});
	}
	if(player.biomeID==15){
		if(!(player.record.quests[3])){
			player.record.quests[3]=0;
				append(stateffectsg,{name:'shard of purity',x:random(-1500,1500),y:random(-1500,1500),tick:0,run:function(){
					fill(0,255,100);
					ellipseMode(CENTER);
					ellipse(400+stateffectsg[n].x-playertemp.x,350+stateffectsg[n].y-playertemp.y,5,5);
					if(stateffectsg[n].x-playertemp.x<-1800||stateffectsg[n].x-playertemp.x>1800||stateffectsg[n].y-playertemp.y<-1800||stateffectsg[n].y-playertemp.y>1800){
						stateffectsg[n].x=random(-1500,1500)+playertemp.x;
						stateffectsg[n].y=random(-1500,1500)+playertemp.y;
						while(stateffectsg[n].x-playertemp.x<400&stateffectsg[n].x-playertemp.x>-400&stateffectsg[n].y-playertemp.y<350&stateffectsg[n].y-playertemp.y>-350){
							stateffectsg[n].x=random(-1500,1500)+playertemp.x;
							stateffectsg[n].y=random(-1500,1500)+playertemp.y;
						}
					}
					if(tick%60==0&stateffectsg[n].x-playertemp.x<400){
						append(particles,new createparticle(stateffectsg[n].x,stateffectsg[n].y,0,0,0,0,'circle','',5,1,200,-2,0,255,120,1));
					}
					if(pow(playertemp.x-stateffectsg[n].x,2)+pow(playertemp.y-stateffectsg[n].y,2)<pow(10+player.size,2)){
						player.record.quests[3]=1;
						append(particles,new createparticle(400,200,0,-0.1,0,0,'text','Found the Shard of Purity! This should allow you to enter the Wastelands.',22,0,255,-0.8,255,255,100));
					}
					if(!(player.biomeID==15)||player.record.quests[3]==1){
						stateffectsg.splice(n,1);
						n-=1;
					}
				}});
			
		}
	}
	if(biomedata[19][0][0]>0){
		areatemp.rainptc=new Array();
		areatemp.elementalsc=0;
		areatemp.rainfog=0;
		if(biomedata[19][0][0]*40>random(0,100)){
			if(areatemp.raining<=0){
				if(options.loadAudio){sfx.raining.play();}
			}
			areatemp.raining=random(biomedata[19][0][1]);
		}
		append(biomescripts,function(){
			if(areatemp.raining<biomedata[19][0][1]/2&tick%90==0){
				if(biomedata[19][0][0]>random(0,100)){
					if(areatemp.raining<=0){
						if(options.loadAudio){sfx.raining.play();}
					}
					areatemp.raining=biomedata[19][0][1];
				}
			}
			if(areatemp.raining>0){
				areatemp.rainfog=min(90,areatemp.rainfog+1);
				areatemp.raining-=1;
				append(areatemp.rainptc,[playertemp.x+random(-300,1100),playertemp.y+random(-250,1000),70]);
				append(areatemp.rainptc,[playertemp.x+random(-300,1100),playertemp.y+random(-250,1000),70]);
			}
			else{
				areatemp.rainfog=max(0,areatemp.rainfog-1);
				if(options.loadAudio){sfx.raining.stop();}
			}
				ellipseMode(CENTER);
				for(sr=0;sr<areatemp.rainptc.length;sr+=1){
					areatemp.rainptc[sr][2]-=1;
					if(areatemp.rainptc[sr][2]>45){
						fill(0,0,255,200-(areatemp.rainptc[sr][2]-45)*8);
						ellipse(areatemp.rainptc[sr][0]-playertemp.x,areatemp.rainptc[sr][1]-playertemp.y,3,3);
					}
					else if(areatemp.rainptc[sr][2]>15){
						fill(0,0,255,200);
						ellipse(areatemp.rainptc[sr][0]-playertemp.x,areatemp.rainptc[sr][1]-playertemp.y,3,3);
					}
					else if(areatemp.rainptc[sr][2]>0){
						fill(0,0,255,areatemp.rainptc[sr][2]*8);
						ellipse(areatemp.rainptc[sr][0]-playertemp.x,areatemp.rainptc[sr][1]-playertemp.y,areatemp.rainptc[sr][2]/2,areatemp.rainptc[sr][2]/2);
					}
					else{
						if(!(playertemp.inBossFight)&random(100)<0.02&areatemp.elementalsc<4){
							if(options.loadAudio){sfx.plunge.play();}
							areatemp.elementalsc+=1;
							stemp=round(random(max(biomedata[9]-5,biomedata[9]*0.6),min(biomedata[9]+5,biomedata[9]*1.4)+2));
							temp=nmelvsc(stemp);
							append(enemies,{
								lv:stemp,
								x:areatemp.rainptc[sr][0],
								y:areatemp.rainptc[sr][1],
								size:15,
								name:"Water Elemental",
								mhp:round(170*temp),
								hp:round(170*temp),
								ai:2,
								dmgmin:1,
								dmgmax:1,
								speed:random(1.3,1.5),
								str:40*temp,
								intel:90*temp,
								armor:350*temp,
								res:50*temp,
								dir:0,
								turnstyle:0,
								tenacity:75,
								stun:0,
								action:{
									id:0,
									range:0,
									timeout:0
								},
								haste:1,
								xp:20,
								ppv:0,
								ppd:0,
								soulv:0,
								spdmod:1,
								anc:0,
								andir:1,
								anf:3,
								imgtype:3,
								reactant:4,
								deathtimers:0,
								deathtimer:40,
								draw:function(i){
									ellipseMode(CENTER);
									fill(20+enemies[i].anc*60,20,20+enemies[i].anc*60);
									ellipse(0,0,8,8);
									if(enemies[i].deathtimers){
										fill(200-enemies[i].deathtimer*5,0,200-enemies[i].deathtimer*5,200);
									}
									else{
										fill(0,0,200,200);
									}
									ellipse(0,0,25+enemies[i].anc*5,25+enemies[i].anc*5);
								},
								loot:0,
								vision:1000,
								ondeath:function(i){
									areatemp.elementalsc-=1;
									playertemp.mpregen+=1;
									playertemp.hpregen+=1;
									if(options.loadAudio){sfx.pop.play();}
									append(stateffects,{name:'aqua blessing',tick:0,run:function(){
										if(stateffects[n].tick>=600){
											playertemp.mpregen-=1;
											playertemp.hpregen-=1;
											stateffects.splice(n,1);
											n-=1;
										}
									}
									});
									enemies.splice(i,1);
									i-=1;
								},
								ondespawn:function(i){
									areatemp.elementalsc-=1;
									enemies.splice(i,1);
									i-=1;
								},
								aim:function(i){
									if(enemies[i].deathtimers){
										enemies[i].deathtimer-=1;
										if(enemies[i].deathtimer<=0){
											if(options.loadAudio){sfx.obliteration.play();}
											append(stateffects,{name:'vortex pool',pow:enemies[i].intel/20,x:enemies[i].x,y:enemies[i].y,tick:0,run:function(){
												if(render){
													fill(0,140,200,200-(max(0,stateffects[n].tick-200)));
													ellipseMode(CENTER);
													ellipse(400+stateffects[n].x-playertemp.x,350+stateffects[n].y-playertemp.y,100,100);
												}
												if(pow(playertemp.x-stateffects[n].x,2)+pow(playertemp.y-stateffects[n].y,2)<pow(50+player.size,2)){
													inwater=1;
													damage('player',0,stateffects[n].pow,stateffects[n].pow,0.012,0.012,"DoT","none",0);
													append(stateffects,{name:'vortex pooled',spdr:0,tick:0,run:function(){
														if(stateffects[n].tick==1){
															if(playertemp.speed>0.4){
																playertemp.speed-=0.02;
																stateffects[n].spdr+=0.02;
															}
															
														}
														if(stateffects[n].tick>=30){
															playertemp.speed+=stateffects[n].spdr;
															stateffects.splice(n,1);
															n-=1;
														}
													}
													});
													if(options.loadAudio){sfx.poison.play();}
												}
												if(stateffects[n].tick>=400){
													stateffects.splice(n,1);
													n-=1;
												}
											}});
											enemies[i].x+=9999;
										}
									}
									else{
										if(pow(playertemp.x-enemies[i].x,2)+pow(playertemp.y-enemies[i].y,2)<pow(20+player.size,2)){
											if(options.loadAudio){sfx.prime.play();}
											enemies[i].deathtimers=1;
										}
										enemies[i].action.defmove=1;
										nmesa.move(i);
									}
								}
							});
						}
						areatemp.rainptc.splice(sr,1);
						sr-=1;
					}
				}
				if(render){
					fill(0,0,0,areatemp.rainfog*0.4);
					rect(0,0,1133,750);
				}
		});
	}
}
var grabstatforct=function(rawtext,cvar){
	gttc+=1;
	while(!(rawtext.substr(gttc,1)=="}"||rawtext.substr(gttc,1)=="+"||rawtext.substr(gttc,1)=="x")){
		stemp[0]+=rawtext.substr(gttc,1);
		gttc+=1;
	}
	if(rawtext.substr(gttc,1)=="x"){
		gttc+=1;
		stemp[3]="";
		stemp[4]="";
		while(!(rawtext.substr(gttc,1)=="c")){
			stemp[3]+=rawtext.substr(gttc,1);
			gttc+=1;
		}
		gttc+=1;
		while(!(rawtext.substr(gttc,1)=="}"||rawtext.substr(gttc,1)=="+")){
			stemp[4]+=rawtext.substr(gttc,1);
			gttc+=1;
		}
		stemp[3]=Number(stemp[3]);
		stemp[3]+=Number(stemp[4])*cvar;
		stemp[0]*=stemp[3];
	}
}
var converttext=function(rawtext,cvar){
	cctext="";
	for(gttc=0;gttc<rawtext.length;gttc+=1){
		if(rawtext.substr(gttc,1)=="{"){
			gttc+=1;
			stemp=["",0];
			while(!(rawtext.substr(gttc,1)=="}")){
				stemp[0]="";
				if(rawtext.substr(gttc,1)=="h"){
					grabstatforct(rawtext,cvar);
					stemp[1]+=stemp[0]*(plshp(1));
				}
				if(rawtext.substr(gttc,1)=="p"){
					gttc+=1;
					grabstatforct(rawtext,cvar);
					stemp[1]+=stemp[0]*(plshr(1));
				}
				if(rawtext.substr(gttc,1)=="s"){
					grabstatforct(rawtext,cvar);
					stemp[1]+=stemp[0]*(plsst(1));
				}
				if(rawtext.substr(gttc,1)=="i"){
					grabstatforct(rawtext,cvar);
					stemp[1]+=stemp[0]*(plsin(1));
				}
				if(rawtext.substr(gttc,1)=="a"){
					grabstatforct(rawtext,cvar);
					stemp[1]+=stemp[0]*(plsar(1));
				}
				if(rawtext.substr(gttc,1)=="r"){
					grabstatforct(rawtext,cvar);
					stemp[1]+=stemp[0]*(plsre(1));
				}
				if(rawtext.substr(gttc,1)=="m"){
					grabstatforct(rawtext,cvar);
					stemp[1]+=stemp[0]*(plsmp(1));
				}
				if(rawtext.substr(gttc,1)=="o"){
					stemp[0]=1;
					grabstatforct(rawtext,cvar);
					stemp[1]+=stemp[0];
				}
				if(rawtext.substr(gttc,1)=="l"){
					stemp[0]=player.level;
					grabstatforct(rawtext,cvar);
					stemp[1]+=stemp[0];
				}
				if(rawtext.substr(gttc,1)=="+"){
					gttc+=1;
				}
			}
			if(stemp[1]>=10){
					cctext+=round(stemp[1]);
			}
			else if(stemp[1]>=1){
					cctext+=round(stemp[1]*10)/10;
			}
			else{
					cctext+=round(stemp[1]*100)/100;
			}
		}
		else{
			cctext+=rawtext.substr(gttc,1);
		}
	}
	return(cctext);
}
var dowalk=function(rate){
	if(playertemp.walklock){
		playertemp.walktick-=rate;
		if(playertemp.walktick<=-90){
			playertemp.walktick=-90;
			playertemp.walklock=0;
			if(player.traits[19]>0&player.mp>=(plsmp(1))/2){
				player.mp-=1;
				append(particles,new createparticle(400,350,0,0,0,0,'circle','',140,0,180,-8,random(150,255),random(150,255),random(150,255)));
				for(i=0;i<enemies.length;i+=1){
					if(pow(enemies[i].x-playertemp.x,2)+pow(enemies[i].y-playertemp.y,2)<pow(70+enemies[i].size,2)){
						damage("enemies",i,0,random(0.55*(plsin(1))*player.traits[19]*(4+player.size),0.75*(plsin(1))*player.traits[19]*(4+player.size)),1,1,"ranged","player",0.1);
					
				if(options.loadAudio){sfx.arrowhit.play();}
					}
				}
			}
		}
	}
	else{
		playertemp.walktick+=rate;
		if(playertemp.walktick>=90){
			playertemp.walktick=90;
			playertemp.walklock=1;
			if(player.traits[19]>0&player.mp>=(plsmp(1))/2){
				player.mp-=1;
				append(particles,new createparticle(400,350,0,0,0,0,'circle','',140,0,180,-8,random(150,255),random(150,255),random(150,255)));
				for(i=0;i<enemies.length;i+=1){
					if(pow(enemies[i].x-playertemp.x,2)+pow(enemies[i].y-playertemp.y,2)<pow(70+enemies[i].size,2)){
						damage("enemies",i,0,random(0.55*(plsin(1))*player.traits[19]*(4+player.size),0.75*(plsin(1))*player.traits[19]*(4+player.size)),1,1,"ranged","player",0.1);
					
				if(options.loadAudio){
				sfx.arrowhit.play();}
					}
				}
			}
		}
	}
}
var cctext;
var fusionselect=0;
var enchantmode=0;
var shind;
var manadmg;
var shdmg;
var dmgmultbr;
var pdmg;
var mdmg;
var attacktype;
var index;
var indcol;
var dmgsound;
var willhit;
var willdamage;
var indicatedmg;
var attacker;
var dots=new Array();
var showdots=[0,0,0,0,0,0];
var traitfuncs={
	passive:new Array(),
	onhit:new Array(),
	whenhit:new Array()
};
if(options.loadAudio){
	var bgmn='Title';
var bgm = new Howl({
  src: ['Data/Sound/music/title.ogg'],
  autoplay: true,
  loop: true,
  volume: options.music,
});
}
var nmeonhit=function(effect,chance,power,duration){
	if(chance>=random(0,100)){
		if(effect==1){
				if(options.loadAudio&showdots[3]==0){
					sfx.burn.play();
					showdots[3]=1;
				}
			append(dots,{source:i,name:'burn',pow:power,dur:duration,run:function(){
				showdots[0]=1;
				showdots[3]=1;
				if(areatemp.raining>0){
					damage("player",0,dots[n].pow/3,dots[n].pow/3,0,0,"DoT",dots[n].source,0);
					dots[n].dur-=1;
				}
				else{
					damage("player",0,dots[n].pow/2,dots[n].pow/2,0,0,"DoT",dots[n].source,0);
				}
				if(dots[n].dur<=0||inwater){
					dots.splice(n,1);
					n-=1;
				}
			}});
		}
		if(effect==2){
				if(options.loadAudio&showdots[4]==0){
					sfx.bleed.play();
					showdots[4]=1;
				}
			append(dots,{source:i,name:'bleed',pow:power,dur:duration,run:function(){
				showdots[1]=1;
				showdots[4]=1;
				damage("player",0,dots[n].pow,0,0.018,0.018,"DoT",dots[n].source,0);
				if(dots[n].dur<=0){
					dots.splice(n,1);
					n-=1;
				}
			}});
		}
		if(effect==3){
				if(options.loadAudio&showdots[5]==0){
					sfx.poisoned.play();
					showdots[5]=1;
				}
			append(dots,{source:i,name:'poison',pow:power,dur:duration,run:function(){
				showdots[2]=1;
				showdots[5]=1;
				damage("player",0,0,dots[n].pow,0.018,0.018,"DoT",dots[n].source,0);
				if(dots[n].dur<=0){
					dots.splice(n,1);
					n-=1;
				}
			}});
		}
	}
}
var inboxrange= function(i,range,x,y){
	if(x+enemies[i].x-playertemp.x<range&x+enemies[i].x-playertemp.x>-range&y+enemies[i].y-playertemp.y<range&y+enemies[i].y-playertemp.y>-range){
		return(1);
	}
	else{
		return(0);
	}
}
var setnmeaction=function(i,id){
	enemies[i].action={
	id:enemydata[enemies[i].sprite*30+id+12][0],
	range:enemydata[enemies[i].sprite*30+id+12][2],
	num:id,
	timeout:15,
	proc:0,
	turnlock:0
	};
}
var statpanel=function(){
		fill(140,140,140);
		rect(0,0,350,700);
		fill(130,130,110);
		rect(0,95,350,300);
		fill(110,110,130);
		rect(0,125,350,30);
		rect(0,185,350,30);
		rect(0,245,350,30);
		rect(0,305,350,30);
		rect(0,365,350,30);
		fill(200,200,100);
		textFont(0,26);
		text('PP: '+floor(player.pp/100),50,650);
		fill(50,50,0);
		textFont(0,25);
		text('Your Stats',115,50);
		shape(sprites.stattrait,245,110,90,135);
		shape(sprites.statkeystone,300,110,90,135);
		fill(200,255,255);
		textFont(0,15);
		text('Level: '+player.level,20,100);
		text('Health: '+round(player.hp)+' / '+round((plshp(1))),20,130);
		text('Mana: '+round(player.mp)+' / '+round((plsmp(1))),20,160);
		text('Health Regen: '+round(100*(plshr(1)))/100,20,190);
		text('Mana Regen: '+round(100*(plsmr(1)))/100,20,220);
		text('Strength: '+round((plsst(1))),20,250);
		text('Intelligence: '+round((plsin(1))),20,280);
		text('Armor: '+round((plsar(1))),20,310);
		text('Resistance: '+round((plsre(1))),20,340);
		text('Move Speed: '+player.speed,20,370);
		fill(180,240,180);
		if(player.traits[50]>0){
			text("+"+player.traits[50]+"%",230,130);
		}
		if(player.traits[51]>0){
			text("+"+player.traits[51]+"%",230,190);
		}
		if(player.traits[52]>0){
			text("+"+player.traits[52]+"%",230,160);
		}
		if(player.traits[53]>0){
			text("+"+player.traits[53]+"%",230,220);
		}
		if(player.traits[54]>0){
			text("+"+player.traits[54]+"%",230,250);
		}
		if(player.traits[55]>0){
			text("+"+player.traits[55]+"%",230,280);
		}
		if(player.traits[56]>0){
			text("+"+player.traits[56]+"%",230,310);
		}
		if(player.traits[57]>0){
			text("+"+player.traits[57]+"%",230,340);
		}
		if(player.keystonepassives[12]>0){
			text("+"+player.keystonepassives[12]+"%",285,130);
		}
		if(player.keystonepassives[13]>0){
			text("+"+player.keystonepassives[13]+"%",285,190);
		}
		if(player.keystonepassives[14]>0){
			text("+"+player.keystonepassives[14]+"%",285,160);
		}
		if(player.keystonepassives[15]>0){
			text("+"+player.keystonepassives[15]+"%",285,220);
		}
		if(player.keystonepassives[16]>0){
			text("+"+player.keystonepassives[16]+"%",285,250);
		}
		if(player.keystonepassives[17]>0){
			text("+"+player.keystonepassives[17]+"%",285,280);
		}
		if(player.keystonepassives[18]>0){
			text("+"+player.keystonepassives[18]+"%",285,310);
		}
		if(player.keystonepassives[19]>0){
			text("+"+player.keystonepassives[19]+"%",285,340);
		}
		if(cursorbox(20,200,90,110)){
			tooltipdraw={
				type:0,
				x:mouseX,
				y:mouseY-100,
				w:200,
				h:200,
				title:"Level",
				tip:"Allows you to equip higher level items and unlocks new enchantments at the enchanter. Additionally, the value of your base stats is determined by your level.",
				colors:0
			};
		}
		if(cursorbox(235,255,100,120)){
			tooltipdraw={
				type:0,
				x:mouseX,
				y:mouseY-100,
				w:200,
				h:200,
				title:"Trait Bonus",
				tip:"% increase gained by traits.",
				colors:0
			};
		}
		if(cursorbox(290,310,100,120)){
			tooltipdraw={
				type:0,
				x:mouseX,
				y:mouseY-100,
				w:200,
				h:200,
				title:"Keystone Bonus",
				tip:"% increase gained by keystones.",
				colors:0
			};
		}
		if(cursorbox(20,300,125,150)){
			tooltipdraw={
				type:1,
				x:mouseX,
				y:mouseY-100,
				w:400,
				h:250,
				title:"Health  (base: "+(player.baseStats.hp+player.keystonestats.hp)+")",
				tip:["Reach 0 and you die...",
				"unless you have some form of death-prevention.",
				"",
				"Health determined by:",
				"Base: "+(round((player.baseStats.hp+player.keystonestats.hp)*(0.9+player.level/10)*10)/10),
				"Equipment: "+round(playertemp.equipstatdata.hp),
				"Non-temporary multiplier: "+(round((player.maxhp/((player.baseStats.hp+player.keystonestats.hp)*(0.9+player.level/10)+playertemp.equipstatdata.hp))*100))+"%",
				"Temporary modifier: "+round(100*playertemp.maxhp)+"%",
				"Temporary direct increase: "+round(playertemp.maxhpfb)
				],
				colors:0
			};
		}
		if(cursorbox(20,300,155,180)){
			tooltipdraw={
				type:1,
				x:mouseX,
				y:mouseY-100,
				w:400,
				h:250,
				title:"Mana  (base: "+(player.baseStats.mp+player.keystonestats.mp)+")",
				tip:["Required for using most weapons,",
				"as well as many active traits.",
				"",
				"Mana determined by:",
				"Base: "+(round((player.baseStats.mp+player.keystonestats.mp)*10)/10),
				"Equipment: "+round(playertemp.equipstatdata.mp),
				"Non-temporary multiplier: "+(round((player.maxmp/((player.baseStats.mp+player.keystonestats.mp)+playertemp.equipstatdata.mp))*100))+"%",
				"Temporary modifier: "+round(100*playertemp.maxmp)+"%",
				"Temporary direct increase: "+round(playertemp.maxmpfb)
				],
				colors:0
			};
		}
		if(cursorbox(20,300,185,210)){
			tooltipdraw={
				type:1,
				x:mouseX,
				y:mouseY-100,
				w:400,
				h:250,
				title:"Health Regeneration  (base: "+(player.baseStats.hpregen+player.keystonestats.hpregen)+")",
				tip:["Health regenerated per second.",
				"",
				"",
				"Health Regeneration determined by:",
				"Base: "+(round((player.baseStats.hpregen+player.keystonestats.hpregen)*(0.9+player.level/10)*100)/100),
				"Equipment: "+(round(playertemp.equipstatdata.hpregen*100)/100),
				"Non-temporary multiplier: "+(round((player.hpregen/((player.baseStats.hpregen+player.keystonestats.hpregen)*(0.9+player.level/10)+playertemp.equipstatdata.hpregen))*100))+"%",
				"Temporary modifier: "+round(100*playertemp.hpregen)+"%",
				"Temporary direct increase: "+(round(playertemp.hpregenfb*100)/100)
				],
				colors:0
			};
		}
		if(cursorbox(20,300,215,240)){
			tooltipdraw={
				type:1,
				x:mouseX,
				y:mouseY-100,
				w:400,
				h:290,
				title:"Mana Regeneration  (base: "+(player.baseStats.mpregen+player.keystonestats.mpregen)+")",
				tip:["Mana regenerated per second,",
				"increased by up to 300% after resting for 6 seconds.",
				"Resting means not moving, performing actions,",
				"or taking damage.",
				"",
				"Mana Regeneration determined by:",
				"Base: "+(((player.baseStats.mpregen+player.keystonestats.mpregen)*100)/100),
				"Equipment: "+(round(playertemp.equipstatdata.mpregen*100)/100),
				"Non-temporary multiplier: "+(round((player.mpregen/((player.baseStats.mpregen+player.keystonestats.mpregen)+playertemp.equipstatdata.mpregen))*100))+"%",
				"Temporary modifier: "+round(100*playertemp.mpregen)+"%",
				"Temporary direct increase: "+(round(playertemp.mpregenfb*100)/100)
				],
				colors:[0,0,[150,150,150],[150,150,150]]
			};
		}
		if(cursorbox(20,300,245,270)){
			tooltipdraw={
				type:1,
				x:mouseX,
				y:mouseY-100,
				w:400,
				h:230,
				title:"Strength  (base: "+(player.baseStats.str+player.keystonestats.str)+")",
				tip:["Your base physical damage.",
				"",
				"Strength determined by:",
				"Base: "+(round((player.baseStats.str+player.keystonestats.str)*(0.9+player.level/10)*10)/10),
				"Equipment: "+round(playertemp.equipstatdata.str),
				"Non-temporary multiplier: "+(round((player.str/((player.baseStats.str+player.keystonestats.str)*(0.9+player.level/10)+playertemp.equipstatdata.str))*100))+"%",
				"Temporary modifier: "+round(100*playertemp.str)+"%",
				"Temporary direct increase: "+round(playertemp.strfb)
				],
				colors:0
			};
		}
		if(cursorbox(20,300,275,300)){
			tooltipdraw={
				type:1,
				x:mouseX,
				y:mouseY-100,
				w:400,
				h:230,
				title:"Intelligence  (base: "+(player.baseStats.intel+player.keystonestats.intel)+")",
				tip:["Your base magic damage.",
				"",
				"Intelligence determined by:",
				"Base: "+(round((player.baseStats.intel+player.keystonestats.intel)*(0.9+player.level/10)*10)/10),
				"Equipment: "+round(playertemp.equipstatdata.intel),
				"Non-temporary multiplier: "+(round((player.intel/((player.baseStats.intel+player.keystonestats.intel)*(0.9+player.level/10)+playertemp.equipstatdata.intel))*100))+"%",
				"Temporary modifier: "+round(100*playertemp.intel)+"%",
				"Temporary direct increase: "+round(playertemp.intelfb)
				],
				colors:0
			};
		}
		if(cursorbox(20,300,305,330)){
			tooltipdraw={
				type:1,
				x:mouseX,
				y:mouseY-100,
				w:400,
				h:250,
				title:"Armor  (base: "+(player.baseStats.armor+player.keystonestats.armor)+")",
				tip:["Reduces all physical damage taken by "+round((plsar(1)))/10+",",
				"capping at 90% reduction.",
				"",
				"Armor determined by:",
				"Base: "+(round((player.baseStats.armor+player.keystonestats.armor)*(0.9+player.level/10)*10)/10),
				"Equipment: "+round(playertemp.equipstatdata.armor),
				"Non-temporary multiplier: "+(round((player.armor/((player.baseStats.armor+player.keystonestats.armor)*(0.9+player.level/10)+playertemp.equipstatdata.armor))*100))+"%",
				"Temporary modifier: "+round(100*playertemp.armor)+"%",
				"Temporary direct increase: "+round(playertemp.armorfb)
				],
				colors:0
			};
		}
		if(cursorbox(20,300,335,360)){
			tooltipdraw={
				type:1,
				x:mouseX,
				y:mouseY-100,
				w:400,
				h:250,
				title:"Resistance  (base: "+(player.baseStats.res+player.keystonestats.res)+")",
				tip:["Reduces all magic damage taken by "+round((plsre(1)))/10+",",
				"capping at 90% reduction.",
				"",
				"Resistance determined by:",
				"Base: "+(round((player.baseStats.res+player.keystonestats.res)*(0.9+player.level/10)*10)/10),
				"Equipment: "+round(playertemp.equipstatdata.res),
				"Non-temporary multiplier: "+(round((player.res/((player.baseStats.res+player.keystonestats.res)*(0.9+player.level/10)+playertemp.equipstatdata.res))*100))+"%",
				"Temporary modifier: "+round(100*playertemp.res)+"%",
				"Temporary direct increase: "+round(playertemp.resfb)
				],
				colors:0
			};
		}
		if(cursorbox(20,300,360,380)){
			tooltipdraw={
				type:0,
				x:mouseX,
				y:mouseY-100,
				w:200,
				h:200,
				title:"Movement Speed",
				tip:"Your base movement speed. (Temporary modifier: "+round(playertemp.speed*100)+"%.)",
				colors:0
			};
		}
		shape(sprites.passive,50,450,90,135);
		shape(sprites.str,50,450,90,135);
		shape(sprites.passive,150,450,90,135);
		shape(sprites.hp,150,450,90,135);
		shape(sprites.passive,250,450,90,135);
		shape(sprites.intel,250,450,90,135);
		if(cursorbox(25,75,425,475)){
			stemp=new Array();
			append(stemp,'Each point grants: ');
			if(!(player.passivemults.power.hp==0)){
				append(stemp,'Health: '+round(player.passivemults.power.hp*100)/100+"%");
			}
			else{
				append(stemp,'');
			}
			if(!(player.passivemults.power.hpregen==0)){
				append(stemp,'Health regeneration: '+round(player.passivemults.power.hpregen*100)/100+"%");
			}
			else{
				append(stemp,'');
			}
			if(!(player.passivemults.power.str==0)){
				append(stemp,'Strength: '+round(player.passivemults.power.str*100)/100+"%");
			}
			else{
				append(stemp,'');
			}
			if(!(player.passivemults.power.intel==0)){
				append(stemp,'Intelligence: '+round(player.passivemults.power.intel*100)/100+"%");
			}
			else{
				append(stemp,'');
			}
			if(!(player.passivemults.power.armor==0)){
				append(stemp,'Armor: '+round(player.passivemults.power.armor*100)/100+"%");
			}
			else{
				append(stemp,'');
			}
			if(!(player.passivemults.power.res==0)){
				append(stemp,'Resistance: '+round(player.passivemults.power.res*100)/100+"%");
			}
			else{
				append(stemp,'');
			}
			append(stemp,'');
			append(stemp,'');
			append(stemp,'Costs: 3PP');
			append(stemp,'Hold shift to apply 10 per click.');
			tooltipdraw={
				type:1,
				x:mouseX,
				y:mouseY-100,
				w:375,
				h:270,
				title:"Power: "+player.passives[0],
				tip:stemp,
				colors:0
			};
			if(!(mouselock)&mousePressed){
				mouselock=1;
				if(options.loadAudio){sfx.click.play();}
				if(keyPressed&keyCode==16){
					stemp=min(10,floor(player.pp/300));
					if(stemp>0){
							player.pp-=stemp*300;
							player.passives[0]+=stemp;
							recalstats();
					}
				}
				else{
					if(player.pp>=300){
						player.pp-=300;
						player.passives[0]+=1;
						recalstats();
					}

				}
			}
		}
		if(cursorbox(125,175,425,475)){
			stemp=new Array();
			append(stemp,'Each point grants: ');
			if(!(player.passivemults.fortitude.hp==0)){
				append(stemp,'Health: '+round(player.passivemults.fortitude.hp*100)/100+"%");
			}
			else{
				append(stemp,'');
			}
			if(!(player.passivemults.fortitude.hpregen==0)){
				append(stemp,'Health regeneration: '+round(player.passivemults.fortitude.hpregen*100)/100+"%");
			}
			else{
				append(stemp,'');
			}
			if(!(player.passivemults.fortitude.str==0)){
				append(stemp,'Strength: '+round(player.passivemults.fortitude.str*100)/100+"%");
			}
			else{
				append(stemp,'');
			}
			if(!(player.passivemults.fortitude.intel==0)){
				append(stemp,'Intelligence: '+round(player.passivemults.fortitude.intel*100)/100+"%");
			}
			else{
				append(stemp,'');
			}
			if(!(player.passivemults.fortitude.armor==0)){
				append(stemp,'Armor: '+round(player.passivemults.fortitude.armor*100)/100+"%");
			}
			else{
				append(stemp,'');
			}
			if(!(player.passivemults.fortitude.res==0)){
				append(stemp,'Resistance: '+round(player.passivemults.fortitude.res*100)/100+"%");
			}
			else{
				append(stemp,'');
			}
			append(stemp,'');
			append(stemp,'');
			append(stemp,'Costs: 3PP');
			append(stemp,'Hold shift to apply 10 per click.');
			tooltipdraw={
				type:1,
				x:mouseX,
				y:mouseY-100,
				w:375,
				h:270,
				title:"Fortitude: "+player.passives[1],
				tip:stemp,
				colors:0
			};
			if(!(mouselock)&mousePressed){
				mouselock=1;
				if(options.loadAudio){sfx.click.play();}
				if(keyPressed&keyCode==16){
					stemp=min(10,floor(player.pp/300));
					if(stemp>0){
							player.pp-=stemp*300;
							player.passives[1]+=stemp;
							recalstats();
					}
				}
				else{
					if(player.pp>=300){
						player.pp-=300;
						player.passives[1]+=1;
						recalstats();
					}

				}
			}
		}
		if(cursorbox(225,275,425,475)){
			stemp=new Array();
			append(stemp,'Each point grants: ');
			if(!(player.passivemults.omnipotency.hp==0)){
				append(stemp,'Health: '+round(player.passivemults.omnipotency.hp*100)/100+"%");
			}
			else{
				append(stemp,'');
			}
			if(!(player.passivemults.omnipotency.hpregen==0)){
				append(stemp,'Health regeneration: '+round(player.passivemults.omnipotency.hpregen*100)/100+"%");
			}
			else{
				append(stemp,'');
			}
			if(!(player.passivemults.omnipotency.str==0)){
				append(stemp,'Strength: '+round(player.passivemults.omnipotency.str*100)/100+"%");
			}
			else{
				append(stemp,'');
			}
			if(!(player.passivemults.omnipotency.intel==0)){
				append(stemp,'Intelligence: '+round(player.passivemults.omnipotency.intel*100)/100+"%");
			}
			else{
				append(stemp,'');
			}
			if(!(player.passivemults.omnipotency.armor==0)){
				append(stemp,'Armor: '+round(player.passivemults.omnipotency.armor*100)/100+"%");
			}
			else{
				append(stemp,'');
			}
			if(!(player.passivemults.omnipotency.res==0)){
				append(stemp,'Resistance: '+round(player.passivemults.omnipotency.res*100)/100+"%");
			}
			else{
				append(stemp,'');
			}
			append(stemp,'');
			append(stemp,'');
			append(stemp,'Costs: 6PP');
			append(stemp,'Hold shift to apply 10 per click.');
			tooltipdraw={
				type:1,
				x:mouseX,
				y:mouseY-100,
				w:375,
				h:270,
				title:"Omnipotency: "+player.passives[2],
				tip:stemp,
				colors:0
			};
			if(!(mouselock)&mousePressed){
				mouselock=1;
				if(options.loadAudio){sfx.click.play();}
				if(keyPressed&keyCode==16){
					stemp=min(10,floor(player.pp/600));
					if(stemp>0){
							player.pp-=stemp*600;
							player.passives[2]+=stemp;
							recalstats();
					}
				}
				else{
					if(player.pp>=600){
						player.pp-=600;
						player.passives[2]+=1;
						recalstats();
					}

				}
			}
		}
	
}
var specialdraw=new Array(999);
specialdraw[2]=function(){
	if(options.light>1){
		fill(200,0,200,3);
			ellipseMode(CENTER);
		for(cal=0;cal<5;cal+=1){
			ellipse(0,0,cal*6,cal*6);
		}
	}
}
specialdraw[4]=function(){
	if(options.light>1){
		fill(255,220,0,3);
			ellipseMode(CENTER);
		for(cal=0;cal<30;cal+=1){
			ellipse(0,0,cal*3,cal*3);
		}
	}
}
specialdraw[7]=function(){
	if(options.light>1){
		fill(200,0,200,3);
			ellipseMode(CENTER);
		for(cal=0;cal<10;cal+=1){
			ellipse(0,0,cal*5,cal*5);
		}
	}
}
specialdraw[9]=function(){
	if(options.light>1){
		fill(140,140,255,3);
			ellipseMode(CENTER);
		for(cal=0;cal<8;cal+=1){
			ellipse(0,0,cal*5,cal*5);
		}
	}
}
specialdraw[10]=function(){
	if(options.light>1){
		fill(255,220,0,4);
			ellipseMode(CENTER);
		for(cal=0;cal<20;cal+=1){
			ellipse(0,0,cal*3,cal*3);
		}
	}
}
specialdraw[13]=function(){
	if(options.light>1){
		fill(100,255,100,3);
			ellipseMode(CENTER);
		for(cal=0;cal<20;cal+=1){
			ellipse(0,0,cal*4.5,cal*4.5);
		}
	}
}
var setspdraw=function(id){
	if(specialdraw[id]){
		return(specialdraw[id]);
	}
	else{
		return(0);
	}
}
var enemyanimc=function(i,animc){
	if(enemies[i].anf>=1){
		if(enemies[i].andir){
			enemies[i].anc+=animc*0.15;
			if(enemies[i].anc>enemies[i].anf+0.99){
				enemies[i].anc=enemies[i].anf+0.99;
				enemies[i].andir=0;
			}
		}
		else{
			enemies[i].anc-=animc*0.15;
			if(enemies[i].anc<0){
				enemies[i].anc=0;
				enemies[i].andir=1;
			}
		}
	}
}
var nmesa={
	wither:function(i){
		if(!(enemies[i].spdmod==1)){
			if(enemies[i].spdmod<0){
				enemies[i].spdmod=0;
			}
			if(enemies[i].spdmod>1.001){
				enemies[i].spdmod-=0.001+enemies[i].spdmod/20;
			}
			else if(enemies[i].spdmod<0.999){
				enemies[i].spdmod+=0.001+(1-enemies[i].spdmod)/20;
			}
			else{
				enemies[i].spdmod=1;
			}
		}
	},
	move:function(i){
		if(!(enemies[i].action.turnlock)){
			nmesa.pointatplayer(i);
		}
		if(enemies[i].action.defmove){
			enemyanimc(i,enemies[i].speed*enemies[i].spdmod);
			nmesa.displace(i,1);
		}
	},
	pointatplayer:function(i){
		if(enemies[i].x-playertemp.x<0){
			enemies[i].dir=atan((enemies[i].y-playertemp.y)/(enemies[i].x-playertemp.x))+PI/2;
		}
		else{
			enemies[i].dir=atan((enemies[i].y-playertemp.y)/(enemies[i].x-playertemp.x))-PI/2;
		}
	},
	displace:function(i,mult){
		enemies[i].x+=enemies[i].speed*sin(enemies[i].dir)*enemies[i].spdmod*mult;
		enemies[i].y-=enemies[i].speed*cos(enemies[i].dir)*enemies[i].spdmod*mult;
	}
};
var nmeactr;
//====================================================ENEMY AI==========================================================
var ai= new Array();
append(ai,0);
append(ai,function(i){
		nmesa.wither(i);
		if(enemies[i].stun<=0){
			if(enemies[i].action.timeout<=0){
				if(inboxrange(i,enemydata[enemies[i].sprite*30+12][4],0,0)&enemydata[enemies[i].sprite*30+12][1]>=random(0,100)){
					enemies[i].action={
						id:enemydata[enemies[i].sprite*30+12][0],
						range:enemydata[enemies[i].sprite*30+12][2],
						num:0,
						timeout:15,
						proc:0,
						turnlock:0
						};
				}
				else if(inboxrange(i,enemydata[enemies[i].sprite*30+13][4],0,0)&enemydata[enemies[i].sprite*30+13][1]>=random(0,100)){
					setnmeaction(i,1);
				}
				else if(inboxrange(i,enemydata[enemies[i].sprite*30+14][4],0,0)&enemydata[enemies[i].sprite*30+14][1]>=random(0,100)){
					setnmeaction(i,2);
				}
				else if(inboxrange(i,enemydata[enemies[i].sprite*30+15][4],0,0)&enemydata[enemies[i].sprite*30+15][1]>=random(0,100)){
					setnmeaction(i,3);
				}
				else{
					setnmeaction(i,4);
				}
				enemies[i].action.defmove=1;
			}
			else{
				enemies[i].action.timeout-=1;
			}
			nmesa.move(i);
			if(inboxrange(i,enemies[i].action.range,0,0)){
				nmem[enemies[i].action.id](i);
			}
		}
		else{
			enemies[i].stun-=enemies[i].spdmod;
		}
	});
append(ai,function(i){
		nmesa.wither(i);
		if(enemies[i].stun<=0){
			if(enemies[i].action.timeout<=0){
				enemies[i].aim(i);
			}
		}
		else{
			enemies[i].stun-=enemies[i].spdmod;
		}
});
append(ai,function(i){
		nmesa.wither(i);
		if(enemies[i].stun<=0){
			enemies[i].aim(i);
		}
		else{
			enemies[i].stun-=enemies[i].spdmod;
		}
});
var endnmeaction=function(i,stun){
	if(enemydata[enemies[i].sprite*30+12+enemies[i].action.num][5]/100>=random(1)){
		setnmeaction(i,enemies[i].action.num);
	}
	else{
		enemies[i].action.timeout=0;
	}
	enemies[i].stun+=stun;
}
/////////ENEMY MOVESET============================================================================
var nmem= new Array();
append(nmem,function(i){
	enemies[i].stun+=enemydata[enemies[i].sprite*30+12+enemies[i].action.num][3][0];
});
//1:HIT
append(nmem,function(i){
	damage('player',0,
	round(random(enemydata[enemies[i].sprite*30+12+enemies[i].action.num][3][1]*enemies[i].dmgmin*enemies[i].str,enemydata[enemies[i].sprite*30+12+enemies[i].action.num][3][2]*enemies[i].dmgmax*enemies[i].str)),
	round(random(enemydata[enemies[i].sprite*30+12+enemies[i].action.num][3][3]*enemies[i].dmgmin*enemies[i].intel,enemydata[enemies[i].sprite*30+12+enemies[i].action.num][3][4]*enemies[i].dmgmax*enemies[i].intel)),
	enemydata[enemies[i].sprite*30+12+enemies[i].action.num][3][5],enemydata[enemies[i].sprite*30+12+enemies[i].action.num][3][6],"melee",i,1);
	if(enemydata[enemies[i].sprite*30+12+enemies[i].action.num][6]){
		nmeonhit(enemydata[enemies[i].sprite*30+12+enemies[i].action.num][6][0],enemydata[enemies[i].sprite*30+12+enemies[i].action.num][6][1],enemydata[enemies[i].sprite*30+12+enemies[i].action.num][6][2]*nmelvsc(enemies[i].lv),enemydata[enemies[i].sprite*30+12+enemies[i].action.num][6][3]);
	}
	endnmeaction(i,enemydata[enemies[i].sprite*30+12+enemies[i].action.num][3][0]);
});
//2:PROJECTILE
append(nmem,function(i){
	temp=enemydata[enemies[i].sprite*30+12+enemies[i].action.num][3][11]*enemydata[enemies[i].sprite*30+12+enemies[i].action.num][3][10]/2;
	for(x=0;x<enemydata[enemies[i].sprite*30+12+enemies[i].action.num][3][10];x+=1){
		append(objects,{
			type:'projectile',
			sprite:projectiles[enemydata[enemies[i].sprite*30+12+enemies[i].action.num][3][4]],
			specialdraw:setspdraw(enemydata[enemies[i].sprite*30+12+enemies[i].action.num][3][4]),
			target:'player',
			source:i,
			size:enemydata[enemies[i].sprite*30+12+enemies[i].action.num][3][5],
			speed:enemydata[enemies[i].sprite*30+12+enemies[i].action.num][3][1],
			duration:enemydata[enemies[i].sprite*30+12+enemies[i].action.num][3][2],
			stun:enemydata[enemies[i].sprite*30+12+enemies[i].action.num][3][3],
			dir:enemies[i].dir+temp,
			x:enemies[i].x,
			y:enemies[i].y,
			oh:enemydata[enemies[i].sprite*30+12+enemies[i].action.num][6],
			pdmgmin:enemies[i].dmgmin*enemies[i].str*enemydata[enemies[i].sprite*30+12+enemies[i].action.num][3][6],
			pdmgmax:enemies[i].dmgmax*enemies[i].str*enemydata[enemies[i].sprite*30+12+enemies[i].action.num][3][7],
			mdmgmin:enemies[i].dmgmin*enemies[i].intel*enemydata[enemies[i].sprite*30+12+enemies[i].action.num][3][8],
			mdmgmax:enemies[i].dmgmax*enemies[i].intel*enemydata[enemies[i].sprite*30+12+enemies[i].action.num][3][9],
			armorE:enemydata[enemies[i].sprite*30+12+enemies[i].action.num][3][12],
			resE:enemydata[enemies[i].sprite*30+12+enemies[i].action.num][3][13],
			procc:1,
		});
		if(enemydata[enemies[i].sprite*30+12+enemies[i].action.num][6]){
			objects[objects.length-1].oh.effect=enemydata[enemies[i].sprite*30+12+enemies[i].action.num][6][0];
			objects[objects.length-1].oh.chance=enemydata[enemies[i].sprite*30+12+enemies[i].action.num][6][1];
			objects[objects.length-1].oh.power=enemydata[enemies[i].sprite*30+12+enemies[i].action.num][6][2]*nmelvsc(enemies[i].lv);
			objects[objects.length-1].oh.duration=enemydata[enemies[i].sprite*30+12+enemies[i].action.num][6][3];
		}
		temp-=enemydata[enemies[i].sprite*30+12+enemies[i].action.num][3][11];
	}
	endnmeaction(i,enemydata[enemies[i].sprite*30+12+enemies[i].action.num][3][0]);
});
//3:CHARGE
append(nmem,function(i){
	enemies[i].action.turnlock=1;
	if(enemies[i].action.proc<1){
		enemies[i].action.timeout=enemydata[enemies[i].sprite*30+12+enemies[i].action.num][3][7];
		enemies[i].action.proc=1;
	}
		enemyanimc(i,enemydata[enemies[i].sprite*30+12+enemies[i].action.num][3][1]*enemies[i].spdmod);
		enemies[i].x+=enemydata[enemies[i].sprite*30+12+enemies[i].action.num][3][1]*sin(enemies[i].dir)*enemies[i].spdmod;
		enemies[i].y-=enemydata[enemies[i].sprite*30+12+enemies[i].action.num][3][1]*cos(enemies[i].dir)*enemies[i].spdmod;
	if(inboxrange(i,enemydata[enemies[i].sprite*30+12+enemies[i].action.num][3][2],0,0)){
		damage('player',0,
		round(random(enemydata[enemies[i].sprite*30+12+enemies[i].action.num][3][3]*enemies[i].dmgmin*enemies[i].str,enemydata[enemies[i].sprite*30+12+enemies[i].action.num][3][4]*enemies[i].dmgmax*enemies[i].str)),
		round(random(enemydata[enemies[i].sprite*30+12+enemies[i].action.num][3][5]*enemies[i].dmgmin*enemies[i].intel,enemydata[enemies[i].sprite*30+12+enemies[i].action.num][3][6]*enemies[i].dmgmax*enemies[i].intel)),
		enemydata[enemies[i].sprite*30+12+enemies[i].action.num][3][8],enemydata[enemies[i].sprite*30+12+enemies[i].action.num][3][9],"melee",i,1);
		if(enemydata[enemies[i].sprite*30+12+enemies[i].action.num][6]){
			nmeonhit(enemydata[enemies[i].sprite*30+12+enemies[i].action.num][6][0],enemydata[enemies[i].sprite*30+12+enemies[i].action.num][6][1],enemydata[enemies[i].sprite*30+12+enemies[i].action.num][6][2]*nmelvsc(enemies[i].lv),enemydata[enemies[i].sprite*30+12+enemies[i].action.num][6][3]);
		}
		enemies[i].action.timeout=0;
	}
	if(enemies[i].action.timeout<=2){
		endnmeaction(i,enemydata[enemies[i].sprite*30+12+enemies[i].action.num][3][0]);
	}
});
//4:HEAL
append(nmem,function(i){
	if(enemies[i].action.proc<1){
	enemies[i].stun+=enemydata[enemies[i].sprite*30+12+enemies[i].action.num][3][3];
		enemies[i].action.proc=1;
	}
	else{
	stemp=random(enemydata[enemies[i].sprite*30+12+enemies[i].action.num][3][1]*nmelvsc(enemies[i].lv),enemydata[enemies[i].sprite*30+12+enemies[i].action.num][3][2]*nmelvsc(enemies[i].lv));
	
	enemies[i].hp+=stemp;
	if(enemies[i].hp>enemies[i].mhp){
		enemies[i].hp=enemies[i].mhp;
	}
	append(dmgind,new cdmgind(enemies[i].x-10+random(-10,10),
	enemies[i].y-15+random(-10,10),
	round(stemp),15,0,190,0));
					
	endnmeaction(i,enemydata[enemies[i].sprite*30+12+enemies[i].action.num][3][0]);
	}
					
});
//5:STRAFE
append(nmem,function(i){
	enemies[i].action.timeout=60;
	enemies[i].action.defmove=0;
	if(enemies[i].x-playertemp.x<0){
		stemp=atan((enemies[i].y-playertemp.y)/(enemies[i].x-playertemp.x))+PI/2;
	}
	else{
		stemp=atan((enemies[i].y-playertemp.y)/(enemies[i].x-playertemp.x))-PI/2;
	}
	if(!(enemies[i].action.orbitlock)){
		enemies[i].action.orbitlock=enemydata[enemies[i].sprite*30+12+enemies[i].action.num][3][15];
	}
	if(!(enemies[i].action.shootCD)){
		enemies[i].action.shootCD=0;
	}
	enemies[i].action.orbitlock-=1;
	enemies[i].action.actionCD=max(0,enemies[i].action.actionCD-1);
	if(!(enemies[i].action.orbit)||enemies[i].action.orbitlock<=0){
		if(random(1)>0.5){
			enemies[i].action.orbit=1;
		}
		else{
			enemies[i].action.orbit=2;
		}
	}
	if(pow(pow(enemies[i].x-playertemp.x,2)+pow(enemies[i].y-playertemp.y,2),0.5)<=enemydata[enemies[i].sprite*30+12+enemies[i].action.num][3][14]){
		enemyanimc(i,enemies[i].speed*enemydata[enemies[i].sprite*30+12+enemies[i].action.num][3][20]*enemies[i].spdmod);
		enemies[i].x+=enemies[i].speed*sin(enemies[i].dir+((enemies[i].action.orbit-1.5))*PI)*enemydata[enemies[i].sprite*30+12+enemies[i].action.num][3][20]*enemies[i].spdmod;
		enemies[i].y-=enemies[i].speed*cos(enemies[i].dir+((enemies[i].action.orbit-1.5))*PI)*enemydata[enemies[i].sprite*30+12+enemies[i].action.num][3][20]*enemies[i].spdmod;
		if(enemydata[enemies[i].sprite*30+12+enemies[i].action.num][3][19]==1){
			if(enemies[i].action.actionCD<=0){
				enemies[i].action.actionCD=enemydata[enemies[i].sprite*30+12+enemies[i].action.num][3][0];
				temp=enemydata[enemies[i].sprite*30+12+enemies[i].action.num][3][11]*enemydata[enemies[i].sprite*30+12+enemies[i].action.num][3][10]/2;
				for(x=0;x<enemydata[enemies[i].sprite*30+12+enemies[i].action.num][3][10];x+=1){
					append(objects,{
						type:'projectile',
						sprite:projectiles[enemydata[enemies[i].sprite*30+12+enemies[i].action.num][3][4]],
						specialdraw:setspdraw(enemydata[enemies[i].sprite*30+12+enemies[i].action.num][3][4]),
						target:'player',
						source:i,
						size:enemydata[enemies[i].sprite*30+12+enemies[i].action.num][3][5],
						speed:enemydata[enemies[i].sprite*30+12+enemies[i].action.num][3][1],
						duration:enemydata[enemies[i].sprite*30+12+enemies[i].action.num][3][2],
						stun:enemydata[enemies[i].sprite*30+12+enemies[i].action.num][3][3],
						dir:stemp+temp,
						x:enemies[i].x,
						y:enemies[i].y,
						oh:enemydata[enemies[i].sprite*30+12+enemies[i].action.num][6],
						pdmgmin:enemies[i].dmgmin*enemies[i].str*enemydata[enemies[i].sprite*30+12+enemies[i].action.num][3][6],
						pdmgmax:enemies[i].dmgmax*enemies[i].str*enemydata[enemies[i].sprite*30+12+enemies[i].action.num][3][7],
						mdmgmin:enemies[i].dmgmin*enemies[i].intel*enemydata[enemies[i].sprite*30+12+enemies[i].action.num][3][8],
						mdmgmax:enemies[i].dmgmax*enemies[i].intel*enemydata[enemies[i].sprite*30+12+enemies[i].action.num][3][9],
						armorE:enemydata[enemies[i].sprite*30+12+enemies[i].action.num][3][12],
						resE:enemydata[enemies[i].sprite*30+12+enemies[i].action.num][3][13],
						procc:1,
					});
					if(enemydata[enemies[i].sprite*30+12+enemies[i].action.num][6]){
						objects[objects.length-1].oh.effect=enemydata[enemies[i].sprite*30+12+enemies[i].action.num][6][0];
						objects[objects.length-1].oh.chance=enemydata[enemies[i].sprite*30+12+enemies[i].action.num][6][1];
						objects[objects.length-1].oh.power=enemydata[enemies[i].sprite*30+12+enemies[i].action.num][6][2]*nmelvsc(enemies[i].lv);
						objects[objects.length-1].oh.duration=enemydata[enemies[i].sprite*30+12+enemies[i].action.num][6][3];
					}
					temp-=enemydata[enemies[i].sprite*30+12+enemies[i].action.num][3][11];
			}
			}
		}
	}
	else{
		enemyanimc(i,enemies[i].speed*enemies[i].spdmod);
		enemies[i].x+=enemies[i].speed*sin(enemies[i].dir)*enemies[i].spdmod;
		enemies[i].y-=enemies[i].speed*cos(enemies[i].dir)*enemies[i].spdmod;
	}
	if(enemydata[enemies[i].sprite*30+12+enemies[i].action.num][3][16]==1){
		if(inboxrange(i,enemydata[enemies[i].sprite*30+12+enemies[i].action.num][3][18],0,0)){
				endnmeaction(i,0);
		}
	}
	else if(enemydata[enemies[i].sprite*30+12+enemies[i].action.num][3][16]==2){
		if(!(inboxrange(i,enemydata[enemies[i].sprite*30+12+enemies[i].action.num][3][18],0,0))){
				endnmeaction(i,0);
		}
	}
	else if(enemydata[enemies[i].sprite*30+12+enemies[i].action.num][3][16]==3){
		if(inboxrange(i,enemydata[enemies[i].sprite*30+12+enemies[i].action.num][3][18],0,0)||random(1)<enemydata[enemies[i].sprite*30+12+enemies[i].action.num][3][17]/100){
				endnmeaction(i,0);
		}
	}
	});
var spendmana=function(spendtype,basempspent,mpspent){
	if(spendtype=="magic"){
		if(player.traits[66]>0){
			if(getbuffind(9)>=0){
				playertemp.buffs[getbuffind(9)].dur=1800;
				playertemp.buffs[getbuffind(9)].pow+=basempspent;
			}
			else{
				buff(9,1800,basempspent);
			}
		}
	}
		if(player.traits[105]>0){
			playertemp.eldritch+=basempspent;
		}
}
var ts={
	windslash:function(tpm){
		if(options.loadAudio){sfx.windslash.play();}
		append(objects,{
			type:'projectile',
			vfx:1,
			draw:function(){
				ellipseMode(CENTER);
				noFill();
				strokeWeight(16);
				stroke(190,190,220,objects[n].duration*18);
				arc(0,0,50,40,-PI,0);
				noStroke();
			},
			target:'enemy',
			size:40,
			speed:18,
			pierce:999,
			duration:15,
			stun:0,
			sound:sfx.arrowhit,
			dir:playertemp.action.diro,
			x:playertemp.x,
			y:playertemp.y,
			pdmgmin:0,
			pdmgmax:0,
			mdmgmin:tpm*((plsin(1))*0.5+(plsst(1))*0.5)*13*(0.75+player.traits[64]*0.25),
			mdmgmax:tpm*((plsin(1))*0.5+(plsst(1))*0.5)*14*(0.75+player.traits[64]*0.25),
			dmgdk:tpm*((plsin(1))*0.5+(plsst(1))*0.5)*0.06*10*(0.75+player.traits[64]*0.25),
			armorE:1,
			resE:1,
			procc:0.4+0.1*player.traits[64],
			hits:new Array(999),
			run:function(){
				objects[n].mdmgmin-=objects[n].dmgdk;
				objects[n].mdmgmax-=objects[n].dmgdk;
			}
		});
	
	},
	explosivemunitions:function(tpm){
			if(player.traits[65]/10>=random(1)){
				sfx.bomb.play();
				append(particles,new createparticle(400+objects[n].x-playertemp.x,350+objects[n].y-playertemp.y,0,0,0,0,'circle','',50,3,255,-13,180,150,0));
				append(objects,{
					type:'AoE',
					target:'enemy',
					size:60,
					duration:0,
					rangetype:"ranged",
					x:objects[n].x,
					y:objects[n].y,
					pdmgmin:((plsst(1))+(plsin(1)))*3*tpm,
					pdmgmax:((plsst(1))+(plsin(1)))*4*tpm,
					mdmgmin:((plsst(1))+(plsin(1)))*3*tpm,
					mdmgmax:((plsst(1))+(plsin(1)))*4*tpm,
					armorE:1,
					resE:1,
					procc:0.1*tpm,
					hits:new Array(999)
				});
			}
		},
	shieldoverload:function(mprr){
		append(stateffects,{name:'shield overload',pow:max(0,mprr),tick:0,run:function(){
			playertemp.mpregen+=stateffects[n].pow/360;
			if(stateffects[n].tick<45){
				if(render){fill(100+stateffects[n].tick*2,100+stateffects[n].tick*2,200,255-stateffects[n].tick*5.5);
				ellipseMode(CENTER);
				ellipse(400,350,10+stateffects[n].tick*2,10+stateffects[n].tick*2);}
			}
			if(stateffects[n].tick>=360){
				stateffects.splice(n,1);
				n-=1;
			}
		}
		});
	},
	venompool:function(tpm,durm,sizem){
			append(stateffects,{tpm:tpm,name:'venom pool',size:45*sizem,pow:(plsin(1))*0.15*tpm,x:playertemp.x-cos(playertemp.action.dir+PI/2)*30,y:playertemp.y-sin(playertemp.action.dir+PI/2)*30,tick:0,run:function(){
				if(render){fill(50,140,50,(240*durm-stateffects[n].tick));
				ellipseMode(CENTER);
				ellipse(400+stateffects[n].x-playertemp.x,350+stateffects[n].y-playertemp.y,stateffects[n].size*2,stateffects[n].size*2);}
				for(i=0;i<enemies.length;i+=1){
					if(enemies[i].x-stateffects[n].x<stateffects[n].size&enemies[i].y-stateffects[n].y<stateffects[n].size&enemies[i].x-stateffects[n].x>-stateffects[n].size&enemies[i].y-stateffects[n].y>-stateffects[n].size){
						if(pow(enemies[i].x-stateffects[n].x,2)+pow(enemies[i].y-stateffects[n].y,2)<pow(stateffects[n].size+enemies[i].size,2)){
							damage("enemies",i,0,stateffects[n].pow,0.012,0.012,"DoT","player",0);
							if(enemies[i].spdmod>0.6){
								enemies[i].spdmod-=0.035*stateffects[n].tpm;
								if(enemies[i].spdmod<0.6){
									enemies[i].spdmod=0.6;
								}
							}
							if(options.loadAudio){sfx.poison.play();}
						}
					}
				}
				if(stateffects[n].tick>=240*durm){
					stateffects.splice(n,1);
					n-=1;
				}
			}});
	},
};
var stemp;
/////////////////////////////PLAYER ACTIONS===========================================================
//========================================================================================================
//Should be set only in full actions
var traitpow;
var hits=0;
var doaction = new Array ();
//Sword Slash
append(doaction,function(lv,hand){
	spendmana("melee",3,3);
	playertemp.action={
		name:'swordswing',
		tick:0,
		dir:0,
		level:lv,
		speedm:0.7,
		empowered:0
	};
	playertemp.bswordct=120;
	findbuff(1);
	if(buffind>=0){
		removebuff(buffind);
		playertemp.bswordc=max(playertemp.bswordc,2);
	}
	if(playertemp.bswordc%2==0){
		playertemp.action.swingdir=1;
	}
	else{
		playertemp.action.swingdir=0;
	}
	if(mouseY<350){
		playertemp.action.dir=-atan((mouseX-400)/(mouseY-350));
		playertemp.action.diro=-atan((mouseX-400)/(mouseY-350));
	}
	else{
		playertemp.action.dir=PI-atan((mouseX-400)/(mouseY-350));
		playertemp.action.diro=PI-atan((mouseX-400)/(mouseY-350));
	}
	if(playertemp.action.swingdir){
		playertemp.action.dir-=1.8;
	}
	else{
		playertemp.action.dir+=1.8;
	}
	playertemp.action.run=function(){
		if(player.traits[39]>0){
			traitpow=player.traits[39];
		}
		else{
			traitpow=0;
		}
		if(playertemp.action.tick<=30){
			translate(400,350);
			rotate(playertemp.action.dir);
			if(render){shape(sprites.sword,0,0,30,45);}
			resetMatrix();
		}
		if(playertemp.action.swingdir){
			playertemp.action.dir+=0.12;
		}
		else{
			playertemp.action.dir-=0.12;
		}
		if(playertemp.action.tick==1){
			if(options.loadAudio){
				if(playertemp.bswordc>1){
					sfx.pswing.play();
				}
				else{
					sfx.swing.play();
				}
			}
		}
		if(player.traits[64]>0&playertemp.action.tick==11){
			ts.windslash(0.85);
		}
		if(playertemp.action.tick==15){
			hits=0;
			for(i=0;i<enemies.length;i+=1){
				if(pow(enemies[i].x-playertemp.x,2)+pow(enemies[i].y-playertemp.y,2)<pow(60+enemies[i].size,2)&
				(enemies[i].x-playertemp.x)*sin(-playertemp.action.diro)+(enemies[i].y-playertemp.y)*cos(-playertemp.action.diro)<0
				){
					hits+=1;
					if(playertemp.bswordc==3){
						if(enemies[i].isBoss){
							damage("enemies",i,random(20*(plsst(1)),22*(plsst(1)))+max(0,min(50*(plsst(1))+2*(plshp(1)),(enemies[i].mhp-enemies[i].hp)*6)),0,1,1,"melee","player",1);
						}
						else{
							damage("enemies",i,random(20*(plsst(1)),22*(plsst(1)))+max(0,min(100*(plsst(1))+4*(plshp(1)),(enemies[i].mhp-enemies[i].hp)*6)),0,1,1,"melee","player",1);
						}
					}
					else{
						damage("enemies",i,random(20*(plsst(1)),22*(plsst(1))),0,1,1,"melee","player",1);
					}
				}
			}
			if(hits>=1){
				if(playertemp.bswordc==2){
					playertemp.fortify=360;
					if(options.loadAudio){sfx.shield.play();}
				}
				if(playertemp.bswordc==3){
					playertemp.bswordc=-1;
					if(options.loadAudio){sfx.slash.play();}
				}
				else{
					if(options.loadAudio){sfx.slice.play();}
				}
				playertemp.bswordc+=1;
				playertemp.bswordct=120;
			}
			else{
				playertemp.bswordc=0;
			}
		}
		if(playertemp.action.tick>=30){
			stopaction();
		}
	}
});
//Spectral Shield
append(doaction,function(lv,hand){
	if(player.mp>=5){
		player.mp-=5;
	spendmana("shield",5,5);
	playertemp.action={
		name:'shield bash',
		tick:0,
		dir:0,
		level:lv,
		speedm:0.2
	};
	if(mouseY<350){
		playertemp.action.dir=-atan((mouseX-400)/(mouseY-350));
	}
	else{
		playertemp.action.dir=PI-atan((mouseX-400)/(mouseY-350));
	}
	playertemp.action.run=function(){
		if(player.traits[40]>0){
			traitpow=player.traits[40];
		}
		else{
			traitpow=0;
		}
		if(playertemp.action.tick==1){
				if(options.loadAudio){sfx.MoS.start.play();}
		}
		if(playertemp.action.tick==8){
				append(objects,{
					type:'projectile',
					sprite:sprites.shieldBash,
					target:'enemy',
					size:40,
					speed:6,
					pierce:999,
					duration:60,
					stun:45,
					sound:sfx.bong,
					dir:playertemp.action.dir,
					x:playertemp.x,
					y:playertemp.y,
					shieldval:((plsar(1))*0.02+(plshp(1))*0.05)*(1+traitpow/10),
					pdmgmin:(plsst(1))*10+(plsar(1))*6,
					pdmgmax:(plsst(1))*13+(plsar(1))*8,
					mdmgmin:(plsin(1))*10+(plsre(1))*6,
					mdmgmax:(plsin(1))*13+(plsre(1))*8,
					armorE:1,
					resE:1,
					procc:1.2,
					hits:new Array(999),
					run:function(){
						objects[n].speed-=0.1;
					},
					specialdraw:function(){
						if(options.light){
							fill(150+abs(tick%25-12.5)*4,150+abs(tick%25-12.5)*4,255,2);
							ellipseMode(CENTER);
							for(cal=0;cal<80;cal+=1){
								ellipse(0,0,cal,cal);
							}
						}
					},
						endfunc:function(){
							append(objects,{
								type:'projectile',
								sprite:sprites.shieldBash,
								target:'enemy',
								size:40,
								speed:0,
								pierce:999,
								duration:999,
								stun:45,
								sound:sfx.bong,
								dir:dirtoplayerfromobject(n),
								x:objects[n].x,
								y:objects[n].y,
								shieldval:objects[n].shieldval,
								caught:0,
								pdmgmin:(plsst(1))*10+(plsar(1))*6,
								pdmgmax:(plsst(1))*13+(plsar(1))*8,
								mdmgmin:(plsin(1))*10+(plsre(1))*6,
								mdmgmax:(plsin(1))*13+(plsre(1))*8,
								armorE:1,
								resE:1,
								procc:1.2,
								hits:new Array(999),
								run:function(){
									objects[n].dir=dirtoplayerfromobject(n);
									objects[n].speed+=0.2;
									if(!(objects[n].caught)){
									if(pow(playertemp.x-objects[n].x,2)+pow(playertemp.y-objects[n].y,2)<pow(10+player.size+objects[n].speed*2,2)){
										objects[n].caught=1;
										objects[n].duration=1;
										if(options.loadAudio){sfx.shield.play();}
										playertemp.guard=min((plshp(1))*(player.traits[91]/100)+playertemp.guardmb,playertemp.guard+((plshp(1))*(player.traits[91]/100)+playertemp.guardmb)*0.4);
										shield(objects[n].shieldval,180+player.traits[18]*120);
										shield(objects[n].shieldval,150+player.traits[18]*100);
										shield(objects[n].shieldval,120+player.traits[18]*80);
										shield(objects[n].shieldval,90+player.traits[18]*60);
										shield(objects[n].shieldval,60+player.traits[18]*40);
										shield(objects[n].shieldval,30+player.traits[18]*20);
									}
									}
								},
								specialdraw:function(){
									if(options.light){
										fill(150+abs(tick%25-12.5)*4,150+abs(tick%25-12.5)*4,255,2);
										ellipseMode(CENTER);
										for(cal=0;cal<80;cal+=1){
											ellipse(0,0,cal,cal);
										}
									}
								}
							});
							
						}
				});
		}
		if(playertemp.action.tick>=10){
				stopaction();
		}
	}
}
else{
	playertemp.traitcd[hand]=5;
}
});
//Shortbow
append(doaction,function(lv,hand){
	player.mp+=8.5*player.rcostm[0]*playertemp.rcostm[0];
	playertemp.action={
		name:'arrow',
		tick:0,
		dir:0,
		level:lv,
		fired:0,
		speedm:0.8
	};
	if(mouseY<350){
		playertemp.action.dir=-atan((mouseX-400)/(mouseY-350));
	}
	else{
		playertemp.action.dir=PI-atan((mouseX-400)/(mouseY-350));
	}
	playertemp.action.run=function(){
		if(playertemp.action.tick==1){
			if(options.loadAudio){sfx.bow.play();}
		}
		if(player.traits[41]>0){
			playertemp.action.tick+=min(10,player.traits[41])*0.08;
			traitpow=player.traits[41];
		}
		else{
			traitpow=0;
		}
		translate(400,350);
		rotate(playertemp.action.dir);
		if(!(playertemp.action.fired)){
			if(mouseY<350){
				playertemp.action.dir=-atan((mouseX-400)/(mouseY-350));
			}
			else{
				playertemp.action.dir=PI-atan((mouseX-400)/(mouseY-350));
			}
			if(render){shape(sprites.lbow,0,0,30,45);}
		}
		else{
			if(render){shape(sprites.bow,0,0,30,45);}
		}
		resetMatrix();
		if(playertemp.action.tick>=60&!(playertemp.action.fired)){
			append(objects,{
				type:'projectile',
				sprite:sprites.arrow,
				target:'enemy',
				size:18,
				speed:15,
				pierce:0,
				duration:30,
				sound:sfx.arrowhit,
				dir:playertemp.action.dir,
				x:playertemp.x,
				y:playertemp.y,
				pdmgmin:(plsst(1))*47,
				pdmgmax:(plsst(1))*55,
				mdmgmin:0,
				mdmgmax:0,
				armorE:1,
				resE:1,
				procc:2.1,
				hits:new Array(999),
				endfunc:function(){
					if(player.traits[65]>0){
						ts.explosivemunitions(2);
					}
				}
			});
			player.mp-=8.5*(1-0.04*min(10,traitpow))*player.rcostm[0]*playertemp.rcostm[0];
			spendmana("ranged",8.5,8.5*(1-0.04*min(10,traitpow)));
			playertemp.action.fired=1;
			playertemp.action.tick=0;
			if(options.loadAudio){sfx.arrow.play();}
		}
		if(!(mousePressed)&playertemp.action.tick>=12&!(playertemp.action.fired)){
			append(objects,{
				type:'projectile',
				sprite:sprites.arrow,
				target:'enemy',
				size:18,
				speed:playertemp.action.tick/4,
				pierce:0,
				duration:20+playertemp.action.tick/6,
				sound:sfx.arrowhit,
				dir:playertemp.action.dir,
				x:playertemp.x,
				y:playertemp.y,
				pdmgmin:(plsst(1))*playertemp.action.tick*4.7/60*10,
				pdmgmax:(plsst(1))*playertemp.action.tick*5.5/60*10,
				mdmgmin:0,
				mdmgmax:0,
				armorE:1,
				resE:1,
				procc:playertemp.action.tick*2.1/60,
				hits:new Array(999),
				endfunc:function(){
					if(player.traits[65]>0){
						ts.explosivemunitions(playertemp.action.tick/30);
						}
					}
			});
			player.mp-=(playertemp.action.tick/8+1)*(1-0.04*min(10,traitpow))*player.rcostm[0]*playertemp.rcostm[0];
			spendmana("ranged",(playertemp.action.tick/8+1),(playertemp.action.tick/8+1)*(1-0.04*min(10,traitpow)));
			playertemp.action.fired=1;
			playertemp.action.tick=0;
			if(options.loadAudio){sfx.arrow.play();}
		}
		if(playertemp.action.tick>=12&playertemp.action.fired){
			stopaction();
		}
	}
});
//Bubble
append(doaction,function(lv,hand){
	playertemp.action={
		name:'bubble',
		tick:0,
		dir:0,
		level:lv,
		speedm:0.6
	};
	if(mouseY<350){
		playertemp.action.dir=-atan((mouseX-400)/(mouseY-350));
	}
	else{
		playertemp.action.dir=PI-atan((mouseX-400)/(mouseY-350));
	}
	spendmana("magic",1.2,1.2-min(10,player.traits[42])/20*1.2);
	if(player.traits[42]>0){
		player.mp+=min(10,player.traits[42])/20*3;
	}
	playertemp.action.run=function(){
		if(player.traits[42]>0){
			traitpow=player.traits[42];
		}
		else{
			traitpow=0;
		}
		if(playertemp.action.tick==1){
			if(options.loadAudio){sfx.water.play();}
		}
		translate(400,350);
		rotate(playertemp.action.dir);
		if(render){shape(sprites.bubblewand,0,0,30,45);}
		resetMatrix();
		if(playertemp.action.tick==1){
			append(objects,{
				type:'projectile',
				sprite:sprites.bubble,
				target:'enemy',
				size:14,
				speed:4,
				pierce:0,
				duration:random(15,100),
				timer:0,
				sound:sfx.pop,
				dir:playertemp.action.dir+random(-0.25*(1-min(10,traitpow)/20),0.25*(1-min(10,traitpow)/20)),
				x:playertemp.x,
				y:playertemp.y,
				pdmgmin:0,
				pdmgmax:0,
				mdmgmin:(plsin(1))*3,
				mdmgmax:(plsin(1))*9,
				dmggain:(plsin(1))*3/100,
				armorE:1,
				resE:1,
				procc:0.5,
				hits:new Array(999),
				run:function(){
					objects[n].timer+=1;
					objects[n].mdmgmin+=objects[n].dmggain;
					objects[n].mdmgmax+=objects[n].dmggain*3;
				},
				endfunc:function(){
					append(stateffects,{name:'puddle',pow:((plsin(1))*0.01+(plshp(1))*0.005),mult:(1+(objects[n].timer/100)*4),x:objects[n].x,y:objects[n].y,tick:0,run:function(){
						fill(50,50,255,300-stateffects[n].tick);
						ellipseMode(CENTER);
						ellipse(400+stateffects[n].x-playertemp.x,350+stateffects[n].y-playertemp.y,30,30);
						if(pow(playertemp.x-stateffects[n].x,2)+pow(playertemp.y-stateffects[n].y,2)<pow(18+player.size,2)){
							heal(stateffects[n].mult*stateffects[n].pow/60,"HoT");
							player.mp+=stateffects[n].mult*0.01;
						}
						if(stateffects[n].tick>=300){
							stateffects.splice(n,1);
							n-=1;
						}
					}});
				}
			});
			
		}
		if(playertemp.action.tick>=5){
			stopaction();
		}
	}
});
//Crossbow
append(doaction,function(lv,hand){
	spendmana("ranged",3,3);
	playertemp.action={
		name:'xbow',
		tick:0,
		dir:0,
		level:lv,
		speedm:1
	};
	if(mouseY<350){
		playertemp.action.dir=-atan((mouseX-400)/(mouseY-350));
	}
	else{
		playertemp.action.dir=PI-atan((mouseX-400)/(mouseY-350));
	}
	if(render){shape(sprites.xbow,0,0,30,45);}
	resetMatrix();
	playertemp.action.run=function(){
		if(player.traits[41]>0){
			traitpow=player.traits[41];
		}
		else{
			traitpow=0;
		}
		if(playertemp.action.tick==1){
			if(options.loadAudio){sfx.arrow.play();}
		}
		if(playertemp.action.tick==1){
			append(objects,{
				type:'projectile',
				sprite:sprites.bolt,
				target:'enemy',
				size:10,
				speed:9,
				pierce:0,
				duration:35,
				sound:sfx.arrowhit,
				dir:playertemp.action.dir+random(-0.03,0.03),
				x:playertemp.x,
				y:playertemp.y,
				pdmgmin:(plsst(1))*8.7,
				pdmgmax:(plsst(1))*10.5,
				mdmgmin:0,
				mdmgmax:0,
				armorE:1,
				resE:1,
				procc:0.5,
				hits:new Array(999),
				endfunc:function(){
					if(player.traits[65]>0){
						ts.explosivemunitions(1);
					}
				}
			});
		}
			if(mouseY<350){
				playertemp.action.dir=-atan((mouseX-400)/(mouseY-350));
			}
			else{
				playertemp.action.dir=PI-atan((mouseX-400)/(mouseY-350));
			}
			translate(400,350);
			rotate(playertemp.action.dir);
			if(render){shape(sprites.xbow,0,0,30,45);}
			resetMatrix();
		if(playertemp.action.tick>=20-min(10,traitpow)){
			stopaction();
		}
	}
});
//Decimate
append(doaction,function(lv,hand){
	spendmana("melee",9,9);
	playertemp.action={
		name:'decimate',
		tick:0,
		dir:0,
		level:lv,
		speedm:1
	};
	if(mouseY<350){
		playertemp.action.dir=-atan((mouseX-400)/(mouseY-350));
	}
	else{
		playertemp.action.dir=PI-atan((mouseX-400)/(mouseY-350));
	}
	playertemp.action.dir+=0.5;
	playertemp.action.run=function(){
		if(player.traits[39]>0){
			if(playertemp.action.tick%3==0){
				buff(2,3,min(10,player.traits[39])*3);
			}
		}
		if(playertemp.action.tick<=45){
			if(render){
			ellipseMode(CENTER);
			noFill();
			stroke(100+playertemp.action.tick*3,0,0,50+playertemp.action.tick*2);
			strokeWeight(40);
			ellipse(400,350,110,110);
			noStroke();
			playertemp.action.dir+=0.04;
			translate(400,350);
			rotate(playertemp.action.dir);shape(sprites.dariusaxe,0,0,30,45);}
			resetMatrix();
			
		}
		else if(playertemp.action.tick<=55){
			if(render){
			ellipseMode(CENTER);
			noFill();
			stroke(125,75,75,200);
			strokeWeight(40);
			ellipse(400,350,110,110);
			noStroke();
			playertemp.action.dir-=0.7;
			translate(400,350);
			rotate(playertemp.action.dir);shape(sprites.dariusaxe,0,0,30,45);}
			resetMatrix();
		}
		if(playertemp.action.tick==1){
			if(options.loadAudio){sfx.decimatec.play();}
		}
		if(playertemp.action.tick==45){
			hits=0;
			for(i=0;i<enemies.length;i+=1){
				if(pow(enemies[i].x-playertemp.x,2)+pow(enemies[i].y-playertemp.y,2)<pow(90+enemies[i].size,2)){
					if(pow(enemies[i].x-playertemp.x,2)+pow(enemies[i].y-playertemp.y,2)<pow(30,2)){
						damage("enemies",i,random(13*(plsst(1)),(plsst(1))*14),0,1,1,"melee","player",0.5);
					}
					else{
						damage("enemies",i,random(38*(plsst(1)),40*(plsst(1))),0,1,1,"melee","player",1.7);
						
						if(options.loadAudio){sfx.decimateh.play();}
						hits+=1;
					}
				}
			}
			if(hits>0&player.hp<(plshp(1))){
				if(hits>=3){
					heal(((plshp(1))-player.hp)*0.36,"direct");
				}
				else{
					heal(((plshp(1))-player.hp)*0.12*hits,"direct");
				}
			}
		}
		if(playertemp.action.tick>=90){
			stopaction();
		}
	}
});
//Mace of Spades
append(doaction,function(lv,hand){
	playertemp.action={
		name:'mace of spades',
		tick:0,
		dir:0,
		diro:0,
		level:lv,
		speedm:0.2
	};
	if(playertemp.combo[hand].num==0&player.hp>0.5*10*player.rcostm[1]*playertemp.rcostm[1]){
		player.hp-=0.5*(player.level+9)*player.rcostm[1]*playertemp.rcostm[1];
		playertemp.combo[hand].num=1;
	}
	if(mouseY<350){
		playertemp.action.dir=-atan((mouseX-400)/(mouseY-350));
		playertemp.action.diro=-atan((mouseX-400)/(mouseY-350));
	}
	else{
		playertemp.action.dir=PI-atan((mouseX-400)/(mouseY-350));
		playertemp.action.diro=PI-atan((mouseX-400)/(mouseY-350));
	}
	if(playertemp.combo[hand].num==1){
			playertemp.action.dir+=2.5;
	}
	if(playertemp.combo[hand].num==2){
			playertemp.action.dir-=2.5;
	}
	playertemp.action.run=function(){
		if(player.traits[42]>0){
			traitpow=player.traits[42];
		}
		else{
			traitpow=0;
		}
		playertemp.combo[hand].timer=90;
		if(playertemp.combo[hand].num==0){
			stopaction();
		}
		else if(playertemp.combo[hand].num==1){
			translate(400,350);
			rotate(playertemp.action.dir);
			if(render){shape(sprites.mordekaisermace,0,0,30,45);}
			resetMatrix();
			if(playertemp.action.tick==1){
				
						if(options.loadAudio){sfx.MoS.start.play();}
			}
			if(playertemp.action.tick==24){
				
						if(options.loadAudio){sfx.MoS.swing.play();}
			}
			if(playertemp.action.tick<=35){
				playertemp.action.dir-=playertemp.action.tick/200;
			}
			else{
				playertemp.action.dir-=0.04;
				ellipseMode(CENTER);
				fill(140,120,140,500-playertemp.action.tick*10);
				ellipse(400+sin(playertemp.action.diro)*35,350-cos(playertemp.action.diro)*35,60*(1+traitpow/10),60*(1+traitpow/10));
				if(playertemp.action.tick==36){
					hits=0;
					for(i=0;i<enemies.length;i+=1){
						if(hits<2&pow(enemies[i].x-playertemp.x+cos(playertemp.action.diro+PI/2)*30,2)+pow(enemies[i].y-playertemp.y+sin(playertemp.action.diro+PI/2)*30,2)<pow(30*(1+traitpow/10)+enemies[i].size,2)){
								hits+=1;
								damage("enemies",i,random(13*(plsst(1)),
								(plsst(1))*14),random(
								(plsin(1))*17,
								(plsin(1))*18),1,1,"melee","player",1.3
								);
								
						if(options.loadAudio){sfx.MoS.one.play();}
						}
					}
				}
			}
			if(playertemp.action.tick>=40){
				playertemp.action.speedm=1;
				if(playertemp.action.tick>=55){
					playertemp.combo[hand].num=2;
					stopaction();
				}
			}
		}
		else if(playertemp.combo[hand].num==2){
			translate(400,350);
			rotate(playertemp.action.dir);
			if(render){shape(sprites.mordekaisermace,0,0,30,45);}
			resetMatrix();
			if(playertemp.action.tick==24){
				
						if(options.loadAudio){sfx.MoS.swing.play();}
			}
			if(playertemp.action.tick<=35){
				playertemp.action.dir+=playertemp.action.tick/200;
			}
			else{
				playertemp.action.dir+=0.04;
				ellipseMode(CENTER);
				fill(140,120,140,500-playertemp.action.tick*10);
				ellipse(400+sin(playertemp.action.diro)*35,350-cos(playertemp.action.diro)*35,60*(1+traitpow/10),60*(1+traitpow/10));
				if(playertemp.action.tick==36){
					hits=0;
					for(i=0;i<enemies.length;i+=1){
						if(hits<2&pow(enemies[i].x-playertemp.x+cos(playertemp.action.diro+PI/2)*30,2)+pow(enemies[i].y-playertemp.y+sin(playertemp.action.diro+PI/2)*30,2)<pow(30*(1+traitpow/10)+enemies[i].size,2)){
								hits+=1;
								damage("enemies",i,random(1.3*(plsst(1))*10,
								(plsst(1))*1.4*10),random(
								(plsin(1))*1.7*10,
								(plsin(1))*1.8*10),1,1,"melee","player",1.3
								);
								
						if(options.loadAudio){sfx.MoS.too.play();}
						}
					}
				}
			}
			if(playertemp.action.tick>=40){
				playertemp.action.speedm=1;
				if(playertemp.action.tick>=55){
					playertemp.combo[hand].num=3;
					stopaction();
				}
			}
		}
		else if(playertemp.combo[hand].num==3){
			if(playertemp.action.tick==1){
				if(options.loadAudio){sfx.MoS.swing.play();}
			}
			if(playertemp.action.tick<=29){
				translate(400,350);
				rotate(playertemp.action.dir);
				if(render){shape(sprites.mordekaisermace,0,0,60-playertemp.action.tick,90-playertemp.action.tick*1.5);}
				resetMatrix();
			}
			else{
				translate(400,350);
				rotate(playertemp.action.dir);
				if(render){shape(sprites.mordekaisermace,0,0,30,45);}
				resetMatrix();
				ellipseMode(CENTER);
				fill(140,120,140,500-playertemp.action.tick*10);
				ellipse(400+sin(playertemp.action.diro)*35,350-cos(playertemp.action.diro)*35,90*(1+traitpow/10),90*(1+traitpow/10));
				if(playertemp.action.tick==30){
					for(i=0;i<enemies.length;i+=1){
						if(pow(enemies[i].x-playertemp.x+cos(playertemp.action.diro+PI/2)*30,2)+pow(enemies[i].y-playertemp.y+sin(playertemp.action.diro+PI/2)*30,2)<pow(45*(1+traitpow/10)+enemies[i].size,2)){
								hits+=1;
								damage("enemies",i,random(1.3*(plsst(1))*10,
								(plsst(1))*1.4*10),random(
								(plsin(1))*3.4*10,
								(plsin(1))*3.6*10),1,1,"melee","player",1.7
								);
								
						if(options.loadAudio){sfx.MoS.three.play();}
						}
					}
				}
			}
			if(playertemp.action.tick>=40){
				playertemp.action.speedm=1;
				if(playertemp.action.tick>=55){
					playertemp.combo[hand].num=0;
					stopaction();
				}
			}
		}
	}
});
//Relic Shield
append(doaction,function(lv,hand){
	playertemp.action={
		name:'relic shield',
		tick:0,
		dir:0,
		level:lv,
		speedm:0.5
	};
	playertemp.action.run=function(){
		if(player.traits[40]>0){
			traitpow=player.traits[40];
		}
		else{
			traitpow=0;
		}
		if(playertemp.action.tick==0){
			if(options.loadAudio){sfx.relicshield.play();}
			playertemp.armor+=0.36;
			playertemp.res+=0.36;
			buff(2,720,player.traits[6]*2+23+min(10,traitpow));
			playertemp.speed-=0.25;
			append(stateffects,{name:'relic shield',tick:0,run:function(){
				playertemp.armor-=0.0005;
				playertemp.res-=0.0005;
				if(stateffects[n].tick<690){
					translate(400,350);
					rotate(stateffects[n].tick/20);
					fill(200,200,150,200-stateffects[n].tick/4.8);
					ellipseMode(CENTER);
					ellipse(0,-24,20,10);
					ellipse(24,0,10,20);
					ellipse(0,24,20,10);
					ellipse(-24,0,10,20);
				}
				else{
					translate(400,350);
					rotate(36);
					fill(200,200,150,65);
					ellipseMode(CENTER);
					ellipse(0,-24+(stateffects[n].tick-690)/2,20,10);
					ellipse(24-(stateffects[n].tick-690)/2,0,10,20);
					ellipse(0,24-(stateffects[n].tick-690)/2,20,10);
					ellipse(-24+(stateffects[n].tick-690)/2,0,10,20);
				}
				
				resetMatrix();
				if(stateffects[n].tick>=720){
					playertemp.speed+=0.25;
					heal((plshp(1))*0.15,"direct");
					stateffects.splice(n,1);
					n-=1;
				}
			}
			});
		}
		if(playertemp.action.tick<30){
			ellipseMode(CENTER);
			fill(255,255,100,180-abs(playertemp.action.tick-15)*8);
			ellipse(400,350,45-abs(playertemp.action.tick-15)*2,45-abs(playertemp.action.tick-15)*2);
		}
		if(playertemp.action.tick>=30){
			stopaction();
		}
	}
});
//Shield Overload		
append(doaction,function(lv,hand){
	
						if(options.loadAudio){sfx.shieldoverload.play();}
	for(y=1;y<=36;y+=1){
		shield((0.42+player.traits[13]*0.08)*((plsre(1))*0.75+(plshp(1))/10)/36,y*10);
	}
	if(player.traits[40]>0){
		playertemp.mpregen-=max(0,0.648-player.traits[40]/10);
		ts.shieldoverload(0.648-player.traits[40]/10);
	}
	else{
		playertemp.mpregen-=0.648;
		ts.shieldoverload(0.648);
	}
});
//Roar
append(doaction,function(lv,hand){
	
						if(options.loadAudio){sfx.roar.play();}
	for(b=0;b<enemies.length;b+=1){
		if(pow(enemies[b].x-playertemp.x,2)+pow(enemies[b].y-playertemp.y,2)<pow(120+enemies[b].size,2)){
			enemies[b].stun+=round(180*(100-enemies[b].tenacity)/100);
		}
	}
	playertemp.str+=0.21+player.traits[14]*0.09;
	playertemp.mpregen+=0.3;
	append(stateffects,{name:'roar',tick:0,lv:player.traits[14],run:function(){
		playertemp.str-=0.00035+stateffects[n].lv*0.00015;
		playertemp.mpregen-=0.0005;
		if(stateffects[n].tick<30){
			stroke(255,180,0,255-stateffects[n].tick*8.8);
			noFill();
			strokeWeight(40);
			ellipseMode(CENTER);
			ellipse(400,350,10+stateffects[n].tick*6,10+stateffects[n].tick*6);
			noStroke();
		}
		if(stateffects[n].tick>=600){
			stateffects.splice(n,1);
			n-=1;
		}
	}
	});
});
//Dash
append(doaction,function(lv,hand){
	if(player.mp>=4.5-0.5*player.traits[15]){
		player.mp-=4.5-0.5*player.traits[15];
		playertemp.traitcd[hand]=63-3*player.traits[15];
			playertemp.speed-=1;
			append(stateffects,{name:'dash',dir:lastDir,tick:0,run:function(){
					if(input[0]){
						if(input[1]){
							stateffects[n].dir=7*PI/4;
						}
						else if(input[3]){
							stateffects[n].dir=PI/4;
						}
						else{
							stateffects[n].dir=0;
						}
					}
					else if(input[3]){
						if(input[2]){
							stateffects[n].dir=3*PI/4;
						}
						else{
							stateffects[n].dir=PI/2;
						}
					}
					else if(input[2]){
						if(input[1]){
							stateffects[n].dir=5*PI/4;
						}
						else{
							stateffects[n].dir=PI;
						}
					}
					else if(input[1]){
							stateffects[n].dir=3*PI/2;
					}
				playertemp.xvelo+=2*(playertemp.action.speedm+1)*player.speed*sin(stateffects[n].dir)/(stateffects[n].tick+1);
				playertemp.yvelo-=2*(playertemp.action.speedm+1)*player.speed*cos(stateffects[n].dir)/(stateffects[n].tick+1);
				dowalk(100*player.speed/(stateffects[n].tick+1)/player.size);
				resetMatrix();
				if(stateffects[n].tick==3){
					if(options.loadAudio){sfx.dash.play();}
				}
				if(stateffects[n].tick>=5){
					playertemp.xvelo*=0.6;
					playertemp.yvelo*=0.6;
				}
				if(stateffects[n].tick>=10){
					playertemp.speed+=1;
					stateffects.splice(n,1);
					n-=1;
				}
			}
			});
	}
	else{
		playertemp.traitcd[hand]=1;
	}
});
//Focus
append(doaction,function(lv,hand){
	playertemp.action={
		name:'focus',
		tick:0,
		dir:0,
		level:lv,
		speedm:0
	};
	if(hand=='space'){
		playertemp.action.code=5;
	}
	if(hand=='shift'){
		playertemp.action.code=4;
	}
	if(hand=='q'){
		playertemp.action.code=6;
	}
	if(hand=='e'){
		playertemp.action.code=7;
	}
	playertemp.action.run=function(){
		ellipseMode(CENTER);
		fill(255,255,0,210-abs(tick%30-15)*14);
		ellipse(400,350,abs(tick%30-15)*2.5,abs(tick%30-15)*2.5);
		playertemp.traitcd[hand]=480;
		if(playertemp.action.tick>=90||!(input[playertemp.action.code])){
			playertemp.str+=(0.53+player.traits[17]*0.07)*playertemp.action.tick/90;
			playertemp.intel+=(0.53+player.traits[17]*0.07)*playertemp.action.tick/90;
			playertemp.speed+=0.1;
			append(stateffects,{name:'',tick:0,power:(0.53+player.traits[17]*0.07)*playertemp.action.tick/90,run:function(){
				if(stateffects[n].tick<380){
					translate(400,350);
					rotate(0-stateffects[n].tick/40);
					fill(255,180,0);
					ellipseMode(CENTER);
					ellipse(0,-24,20,20);
					ellipse(0,24,20,20);
				}
				else{
					translate(400,350);
					rotate(0-stateffects[n].tick/40);
					fill(255,180,0,255-(stateffects[n].tick-380)*2.5);
					ellipseMode(CENTER);
					ellipse(0,-24,20+(stateffects[n].tick-380)/10,20+(stateffects[n].tick-380)/10);
					ellipse(0,24,20+(stateffects[n].tick-380)/10,20+(stateffects[n].tick-380)/10);
				}
				
				resetMatrix();
				if(stateffects[n].tick>=480){
					playertemp.str-=stateffects[n].power;
					playertemp.intel-=stateffects[n].power;
					playertemp.speed-=0.1;
					stateffects.splice(n,1);
					n-=1;
				}
			}
			});
			if(options.loadAudio){sfx.focus.play();}
			stopaction();
		}
	}
});
//Defend
append(doaction,function(lv,hand){
	playertemp.action={
		name:'defend',
		tick:0,
		dir:0,
		level:lv,
		proc:0,
		active:1,
		speedm:0.45,
		ignorehaste:1
	};
	playertemp.action.run=function(){
		if(playertemp.action.tick==0){
			if(options.loadAudio){sfx.shield.play();}
		}
		if(playertemp.action.active){
			if(playertemp.guard>=((plshp(1))*(player.traits[91]/100)+playertemp.guardmb)*0.8){
				fill(120,120,255,190);
				ellipseMode(CENTER);
				ellipse(400,350,30,30);
			}
			else if(playertemp.guard>=((plshp(1))*(player.traits[91]/100)+playertemp.guardmb)*0.4){
				fill(110,255,110,170);
				ellipseMode(CENTER);
				ellipse(400,350,30,30);
			}
			else if(playertemp.guard>=((plshp(1))*(player.traits[91]/100)+playertemp.guardmb)*0.1){
				fill(255,220,120,160);
				ellipseMode(CENTER);
				ellipse(400,350,30,30);
			}
			else if(playertemp.guard>0){
				fill(255,100,0,150);
				ellipseMode(CENTER);
				ellipse(400,350,30,30);
			}
			else{
				stroke(255,0,0,90);
				strokeWeight(7);
				noFill();
				ellipseMode(CENTER);
				ellipse(400,350,39,39);
				noStroke();
			}
			if(!(mousePressed)){
				playertemp.action.active=0;
				if(playertemp.action.proc){
					playertemp.strfb+=plshp(0.15)+plsar(0.1)+plsre(0.1);
					playertemp.intelfb+=plshp(0.15);
					append(stateffects,{name:'Counter attack',pow:plshp(0.15),strpow:plsar(0.1)+plsre(0.1),tick:0,run:function(){
						playertemp.strfb-=(stateffects[n].pow+stateffects[n].strpow)/120;
						playertemp.intelfb-=(stateffects[n].pow)/120;
						if(stateffects[n].tick>=60){
							playertemp.strfb-=(stateffects[n].pow+stateffects[n].strpow)/2;
							playertemp.intelfb-=(stateffects[n].pow)/2;
							stateffects.splice(n,1);
							n-=1;
						}
					}
					});
					buff(1,60,1);
				}
			}
		}
		else{
			stopaction();
		}
	}
});
//Master Sword
append(doaction,function(lv,hand){
	playertemp.action={
		name:'master sword',
		tick:0,
		dir:0,
		level:lv,
		speedm:0,
		empowered:0
	};
	if(mouseY<350){
		playertemp.action.dir=-atan((mouseX-400)/(mouseY-350));
		playertemp.action.diro=-atan((mouseX-400)/(mouseY-350));
	}
	else{
		playertemp.action.dir=PI-atan((mouseX-400)/(mouseY-350));
		playertemp.action.diro=PI-atan((mouseX-400)/(mouseY-350));
	}
	playertemp.action.dir+=1.3;
		if(player.traits[39]>0){
			playertemp.action.speedm=min(10,player.traits[39])/10;
		}
	playertemp.action.run=function(){
		if(playertemp.action.tick<=10){
			translate(400,350);
			rotate(playertemp.action.dir);
			if(render){shape(sprites.masterSword,0,0,30,45);}
			resetMatrix();
		}
		playertemp.action.dir-=0.3;
		if(playertemp.action.tick==1){
			if(player.hp>=(plshp(1))){
				playertemp.action.empowered=1;
				if(options.loadAudio){sfx.mswordbeam.play();}
			}
			if(options.loadAudio){sfx.mswordswing.play();}
		}
		
		if(player.traits[64]>0&playertemp.action.tick==3){
			ts.windslash(0.5);
		}
		if(playertemp.action.tick==5){
			for(i=0;i<enemies.length;i+=1){
				if(pow(enemies[i].x-playertemp.x,2)+pow(enemies[i].y-playertemp.y,2)<pow(75+enemies[i].size,2)&
				(enemies[i].x-playertemp.x)*sin(-playertemp.action.diro)+(enemies[i].y-playertemp.y)*cos(-playertemp.action.diro)<0
				){
					damage("enemies",i,random(12*(plsst(1)),14*(plsst(1))),0,1,1,"melee","player",0.6);
					if(options.loadAudio){sfx.mswordhit.play();}
				}
			}
			if(playertemp.action.empowered==1){
				append(objects,{
					type:'projectile',
					sprite:sprites.mswordbeam,
					target:'enemy',
					size:26,
					speed:7,
					pierce:1,
					duration:30,
					sound:sfx.mswordhit,
					dir:playertemp.action.diro,
					x:playertemp.x,
					y:playertemp.y,
					pdmgmin:0,
					pdmgmax:0,
					mdmgmin:(plsin(1))*12,
					mdmgmax:(plsin(1))*14,
					armorE:1,
					resE:1,
					procc:0.55,
					specialdraw:function(){
						if(options.light){
							fill(200,150,255,3);
							ellipseMode(CENTER);
							for(cal=0;cal<50;cal+=1){
								ellipse(0,0,cal,cal*2);
							}
						}
					},
					hits:new Array(999)
				});
			}
		}
		if(playertemp.action.tick>=12){
			playertemp.action.speedm=1;
			if(!(mousePressed)){
				stopaction();
			}
		}
	}
});
//Rapier
append(doaction,function(lv,hand){
	spendmana("melee",3,3);
	playertemp.action={
		name:'rapier',
		tick:0,
		dir:0,
		level:lv,
		swingdir:round(random(-0.49,1.49)),
		speedm:0.4,
		empowered:0
	};
	if(mouseY<350){
		playertemp.action.dir=-atan((mouseX-400)/(mouseY-350));
		playertemp.action.diro=-atan((mouseX-400)/(mouseY-350));
	}
	else{
		playertemp.action.dir=PI-atan((mouseX-400)/(mouseY-350));
		playertemp.action.diro=PI-atan((mouseX-400)/(mouseY-350));
	}
	if(playertemp.action.swingdir){
		playertemp.action.dir-=1.2;
	}
	else{
		playertemp.action.dir+=1.2;
	}
	playertemp.action.run=function(){
		if(player.traits[39]>0){
			traitpow=player.traits[39];
		}
		else{
			traitpow=0;
		}
		if(playertemp.action.tick<=8){
			translate(400,350);
			rotate(playertemp.action.dir);
			if(render){shape(sprites.rapier,0,0,30,45);}
			resetMatrix();
			fill(100,100,180,10);
			strokeWeight(10);
			ellipseMode(CENTER);
			stroke(100,100,200,20);
			stroke(100,100,200,20);
			arc(400,350,75,75,playertemp.action.diro-PI,playertemp.action.diro);
			noStroke();
		}
		if(playertemp.action.swingdir){
			playertemp.action.dir+=0.3;
		}
		else{
			playertemp.action.dir-=0.3;
		}
		if(playertemp.action.tick==1){
						if(options.loadAudio){
						sfx.rapier.play();}
			findbuff(1);
			if(buffind>=0){
				removebuff(buffind);
				playertemp.action.empowered=1;
			}
		}
		
		if(player.traits[64]>0&playertemp.action.tick==5){
			ts.windslash(0.55);
		}
		if(playertemp.action.tick==4&playertemp.action.empowered==1){
			for(i=0;i<enemies.length;i+=1){
				if(pow(enemies[i].x-playertemp.x,2)+pow(enemies[i].y-playertemp.y,2)<pow(65+enemies[i].size,2)&
				(enemies[i].x-playertemp.x)*sin(-playertemp.action.diro)+(enemies[i].y-playertemp.y)*cos(-playertemp.action.diro)<0
				){
					damage("enemies",i,random(2.2*(plsst(1))*10,2.5*(plsst(1))*10),0,1-min(10,traitpow)/20,1,"melee","player",1);
				}
			}
		}
		if(playertemp.action.tick==8&playertemp.action.empowered==0){
			for(i=0;i<enemies.length;i+=1){
				if(pow(enemies[i].x-playertemp.x,2)+pow(enemies[i].y-playertemp.y,2)<pow(65+enemies[i].size,2)&
				(enemies[i].x-playertemp.x)*sin(-playertemp.action.diro)+(enemies[i].y-playertemp.y)*cos(-playertemp.action.diro)<0
				){
					damage("enemies",i,random(10*(plsst(1)),13*(plsst(1))),0,1-min(10,traitpow)/20,1,"melee","player",0.6);
				}
			}
		}
		if(playertemp.action.tick>=11){
			playertemp.action.speedm=1;
		}
		if(playertemp.action.tick>=(25-min(10,traitpow)/2)*0.75){
			stopaction();
		}
	}
});
//Void Barrier
append(doaction,function(lv,hand){
	playertemp.action={
		name:'void barrier',
		tick:0,
		dir:0,
		level:lv,
		proc:0,
		active:1,
		speedm:0.6,
		ignorehaste:1
	};
	if(hand=='space'){
		playertemp.action.code=5;
	}
	if(hand=='shift'){
		playertemp.action.code=4;
	}
	if(hand=='q'){
		playertemp.action.code=6;
	}
	if(hand=='e'){
		playertemp.action.code=7;
	}
	
	playertemp.action.run=function(){
		if(playertemp.action.tick==0){
			if(options.loadAudio){
			sfx.voidbarrier.play();}
		}
		playertemp.traitcd[hand]=Number(playertemp.traitcd[hand])+player.haste*playertemp.haste;
		if(playertemp.action.active){
				fill(65-playertemp.action.tick/3,0,65-playertemp.action.tick/3,150);
				ellipseMode(CENTER);
				ellipse(400,350,30+abs(playertemp.action.tick%30-15)/2,37.5-abs(playertemp.action.tick%30-15)/2);
				if(playertemp.action.tick%3==0){
					buff(2,4,100);
				}
			if(!(input[playertemp.action.code])||playertemp.action.tick>180){
				playertemp.action.active=0;
			}
		}
		if(playertemp.action.active==0){
			for(b=0;b<enemies.length;b+=1){
				if(pow(enemies[b].x-playertemp.x,2)+pow(enemies[b].y-playertemp.y,2)<pow(120+enemies[b].size,2)){
					enemies[b].stun+=round(30+player.traits[33]*30*(100-enemies[b].tenacity)/100);
				}
			}
			append(stateffects,{name:'void barrier',tick:0,run:function(){
				if(stateffects[n].tick<25){
					stroke(20,0,20,255-stateffects[n].tick*10);
					noFill();
					strokeWeight(40+stateffects[n].tick);
					ellipseMode(CENTER);
					ellipse(400,350,10+stateffects[n].tick*18,10+stateffects[n].tick*18);
					noStroke();
					for(b=1;b<objects.length;b+=1){
						if(objects[b].type=="projectile"){
							if(pow(objects[b].x-playertemp.x,2)+pow(objects[b].y-playertemp.y,2)<pow(5+stateffects[n].tick*9+objects[b].size,2)){
								objects[b].speed+=0.3;
								if(objects[b].x-playertemp.x<0){
									objects[b].dir=PI+atan((objects[b].y-playertemp.y)/(objects[b].x-playertemp.x))+PI/2;
								}
								else{
									objects[b].dir=PI+atan((objects[b].y-playertemp.y)/(objects[b].x-playertemp.x))-PI/2;
								}
							}
						}
					}
					for(b=0;b<enemies.length;b+=1){
						if(pow(enemies[b].x-playertemp.x,2)+pow(enemies[b].y-playertemp.y,2)<pow(5+stateffects[n].tick*9+enemies[b].size,2)){
								if(enemies[b].x-playertemp.x<0){
									stemp=atan((enemies[b].y-playertemp.y)/(enemies[b].x-playertemp.x))+PI/2;
								}
								else{
									stemp=atan((enemies[b].y-playertemp.y)/(enemies[b].x-playertemp.x))-PI/2;
								}
								enemies[b].x-=12*(100-enemies[b].tenacity)/100*sin(stemp);
								enemies[b].y+=12*(100-enemies[b].tenacity)/100*cos(stemp);
							}
					}
				}
				if(stateffects[n].tick>=25){
					stateffects.splice(n,1);
					n-=1;
				}
			}
			});
			buff(7,60+playertemp.action.tick/3,1);
			stopaction();
						if(options.loadAudio){
			sfx.voidbarrier.stop();
						sfx.voidbarrierr.play();}
		}
	}
});
//Void Blast
append(doaction,function(lv,hand){
	spendmana("magic",8,8);
	playertemp.action={
		name:'void blast',
		tick:0,
		dir:0,
		level:lv,
		speedm:0.6
	};
	if(mouseY<350){
		playertemp.action.dir=-atan((mouseX-400)/(mouseY-350));
	}
	else{
		playertemp.action.dir=PI-atan((mouseX-400)/(mouseY-350));
	}
	playertemp.action.run=function(){
		if(player.traits[42]>0){
			traitpow=player.traits[42];
		}
		else{
			traitpow=0;
		}
		if(playertemp.action.tick==1){
						if(options.loadAudio){
						sfx.voidblast.play();}
		}
		translate(400,350);
		rotate(playertemp.action.dir);
		if(render){shape(sprites.voidstaff,0,0,30,45);}
		resetMatrix();
		if(playertemp.action.tick<15){
			fill(0,0,0,playertemp.action.tick*7);
			ellipseMode(CENTER);
			ellipse(400,350,playertemp.action.tick*6,playertemp.action.tick*6);
		}
		if(playertemp.action.tick==15){
			append(objects,{
				type:'projectile',
				sprite:sprites.voidblast,
				target:'enemy',
				size:17,
				speed:0.2,
				pierce:9999,
				duration:90,
				traitpow:traitpow,
				fuel:pow(pow(abs(mouseX-400),2)+pow(abs(mouseY-350),2),0.5),
				dir:playertemp.action.dir,
				x:playertemp.x,
				y:playertemp.y,
				hitc:0,
				pdmgmin:0,
				pdmgmax:0,
				mdmgmin:(plsin(1))*12,
				mdmgmax:(plsin(1))*13,
				armorE:1,
				resE:1,
				procc:0.55,
				hits:new Array(999),
				specialdraw:function(){
					if(options.light){
						fill(0,0,0,2);
						ellipseMode(CENTER);
						for(cal=0;cal<80;cal+=1){
							ellipse(0,0,cal,cal);
						}
					}
				},
				run:function(){
					objects[n].speed+=0.08+objects[n].traitpow*0.008;
					objects[n].fuel-=objects[n].speed;
					if(objects[n].fuel<=0){
						objects[n].duration=0;
					}
				},
				endfunc:function(){
						if(options.loadAudio){
						sfx.voidboom.play();}
					reducecd(33,objects[n].hitc*60);
					append(particles,new createparticle(objects[n].x,objects[n].y,0,0,0,0,'circle','',180+objects[n].traitpow*9,-4,255,-13,40,0,40,1));
					append(particles,new createparticle(objects[n].x,objects[n].y,0,0,0,0,'circle','',90+objects[n].traitpow*4.5,3,160,-5,100,40,100,1));
					append(objects,{
						type:'AoE',
						target:'enemy',
						size:90+objects[n].traitpow*4.5,
						duration:0,
						rangetype:"ranged",
						x:objects[n].x,
						y:objects[n].y,
						pdmgmin:0,
						pdmgmax:0,
						hitc:0,
						mdmgmin:(plsin(1))*18,
						mdmgmax:(plsin(1))*20,
						armorE:1,
						resE:1,
						procc:0.9,
						hits:new Array(999),
						endfunc:function(){
							reducecd(33,objects[n].hitc*60);
						}
					});
				}
			});
			
		}
		if(playertemp.action.tick>=30){
			stopaction();
		}
	}
});
//Arcane Reconstruction
append(doaction,function(lv,hand){
	if(player.mp>=25*player.rcostm[0]*playertemp.rcostm[0]){
		player.mp-=25*player.rcostm[0]*playertemp.rcostm[0];
		spendmana("magic",25,25);
						if(options.loadAudio){
						sfx.arcanereconstruction.play();}
						
		heal((player.intel/100)*8*player.traits[63]*(1+min(1,max(0,playertemp.timesincedamagetaken-120)/120)),"direct");
		append(stateffects,{name:'arcane reconstruction',tick:0,run:function(){
			if(stateffects[n].tick<45){
				fill(150,0,150,255-stateffects[n].tick*255/45);
				translate(400,350);
				rotate(stateffects[n].tick/4);
				rect(-14,-28,28,56);
				rect(-28,-14,56,28);
				resetMatrix();
			}
			else{
				stateffects.splice(n,1);
				n-=1;
			}
		}
		});
	}
	else{
		playertemp.traitcd[hand]=0;
	}
});
//Minigun
append(doaction,function(lv,hand){
	playertemp.action={
		name:'minigun',
		tick:0,
		dir:0,
		level:lv,
		speedm:0.3
	};
	if(mouseY<350){
		playertemp.action.dir=-atan((mouseX-400)/(mouseY-350));
	}
	else{
		playertemp.action.dir=PI-atan((mouseX-400)/(mouseY-350));
	}
			if(render){shape(sprites.minigun,0,0,30,45);}
			resetMatrix();
	playertemp.action.run=function(){
		playertemp.timesinceaction=0;
		if(player.traits[41]>0){
			traitpow=player.traits[41];
		}
		else{
			traitpow=0;
		}
		if(getbuffind(11)>=0){
			playertemp.buffs[getbuffind(11)].pow+=(1+min(10,traitpow)/10)*(1+min(3,playertemp.action.tick/60));
			playertemp.buffs[getbuffind(11)].dur=10;
		}
		else{
			buff(11,10,(1+min(10,traitpow)/10)*(1+min(3,playertemp.action.tick/60)));
		}
		if(playertemp.buffs[getbuffind(11)].pow>=15){
			playertemp.buffs[getbuffind(11)].pow-=15;
			if(player.mp>=0.6*player.rcostm[0]*playertemp.rcostm[0]){
				player.mp-=0.6*player.rcostm[0]*playertemp.rcostm[0];
				spendmana("ranged",0.6,0.6);
				if(options.loadAudio){sfx.minigun.play();}
				append(objects,{
					type:'projectile',
					vfx:1,
					draw:function(){
						fill(objects[n].duration*14,objects[n].duration*6,objects[n].duration*5);
						ellipseMode(CENTER);
						ellipse(0,0,5,5);
						if(options.light){
							fill(255,220,100,5-abs(objects[n].duration-10)/2);
							for(cal=0;cal<30;cal+=1){
								ellipse(0,35,cal,cal*2);
							}
						}
					},
					fast:3,
					target:'enemy',
					size:11,
					speed:50,
					pierce:0,
					duration:20,
					sound:sfx.arrowhit,
					dir:playertemp.action.dir+random(-0.08,0.08),
					x:playertemp.x,
					y:playertemp.y,
					pdmgmin:(plsst(1))*3,
					pdmgmax:(plsst(1))*3.5,
					mdmgmin:(plsin(1))*3,
					mdmgmax:(plsin(1))*3.5,
					armorE:0.8,
					resE:0.8,
					procc:0.13,
					hits:new Array(999),
					endfunc:function(){
						if(player.traits[65]>0){
							ts.explosivemunitions(0.25);
						}
					}
				});
				append(particles,new createparticle(400+sin(playertemp.action.dir)*30,350-cos(playertemp.action.dir)*30,0,0,0,0,'circle','',10,3,255,-35,255,210,70));
				
			}
		}
			if(mouseY<350){
				playertemp.action.dir=-atan((mouseX-400)/(mouseY-350));
			}
			else{
				playertemp.action.dir=PI-atan((mouseX-400)/(mouseY-350));
			}
			translate(400,350);
			rotate(playertemp.action.dir);
			if(render){shape(sprites.minigun,0,0,30,45);}
			resetMatrix();
		if(!(mousePressed)){
			stopaction();
		}
	}
});
//Siphon of Harvesting
append(doaction,function(lv,hand){
	if(player.hp>(player.level*2+9)*player.rcostm[1]*playertemp.rcostm[1]){
		player.hp-=(player.level*2+9)*player.rcostm[1]*playertemp.rcostm[1];
	playertemp.action={
		name:'siphon of harvesting',
		tick:0,
		dir:0,
		level:lv,
		speedm:0.2,
		active:0
	};
	playertemp.action.run=function(){
		if(playertemp.action.tick==0){
			if(options.loadAudio){sfx.SoH.play();}
		}
		if(playertemp.action.tick<=5){
			fill(150,130,170,playertemp.action.tick*40);
			ellipseMode(CENTER);
			ellipse(400,350,200,200);
		}
		else{
			fill(150,130,170,200);
			ellipseMode(CENTER);
			ellipse(400,350,200,200);
			stroke(200,200,220,150);
			noFill();
			strokeWeight(25);;
			ellipse(400,350,200-(playertemp.action.tick-5)*12,200-(playertemp.action.tick-5)*12);
			noStroke();
			if(playertemp.action.tick==18){
				hits=0;
			for(i=0;i<enemies.length;i+=1){
				if(pow(enemies[i].x-playertemp.x,2)+pow(enemies[i].y-playertemp.y,2)<pow(100+enemies[i].size,2)){
					damage("enemies",i,0,random(26*(plsin(1)),29*(plsin(1))),1,1,"ranged","player",1.2);
					hits+=1;
				}
			}
			if(hits>0){
			if(options.loadAudio){sfx.SoHh.play();}
					if(getbuffind(12)>=0){
						playertemp.buffs[getbuffind(12)].pow+=hits*((plsin(1))*2+(plshp(1)))*(0.2+0.2*player.traits[73])*(0.11+0.04*player.traits[74]);
						playertemp.buffs[getbuffind(12)].dur=999;
						if(playertemp.buffs[getbuffind(12)].pow>((plsin(1))*2+(plshp(1)))*(0.2+0.2*player.traits[73])){
							playertemp.buffs[getbuffind(12)].pow=((plsin(1))*2+(plshp(1)))*(0.2+0.2*player.traits[73]);	
						}
					}
					else{
						buff(12,999,hits*((plsin(1))*2+(plshp(1)))*(0.2+0.2*player.traits[73])*(0.11+0.04*player.traits[74]));
					}
			}
		
			
		}
		}
		if(playertemp.action.tick>=20){
			playertemp.action.speedm=1;
			if(playertemp.action.tick>=30){
				stopaction();
			}
		}
		
	}
}
else{
	playertemp.traitcd[hand]=1;
}
});
//Boomerang
append(doaction,function(lv,hand){
		buff(13,120,0);
		spendmana("ranged",16,16);
		playertemp.action={
			name:'boomerang',
			tick:0,
			dir:0,
			level:lv,
			speedm:0.6
		};
		playertemp.action.run=function(){
		if(mouseY<350){
			playertemp.action.dir=-atan((mouseX-400)/(mouseY-350));
		}
		else{
			playertemp.action.dir=PI-atan((mouseX-400)/(mouseY-350));
		}
			if(player.traits[41]>0){
				traitpow=min(10,player.traits[41]);
			}
			else{
				traitpow=0;
			}
			
			if(playertemp.action.tick==1){
				if(options.loadAudio){sfx.boomerang.play();}
					append(objects,{
						type:'projectile',
						vfx:1,
						draw:function(){
							rotate(objects[n].dirvfx);
							if(render){shape(sprites.boomerang,0,0,30,45);}
							if(objects[n].paused>0){
								ellipseMode(CENTER);
								fill(140,140,255,objects[n].paused);
								ellipse(0,0,35,35);
							}
						},
						target:'enemy',
						size:33,
						speed:11,
						pierce:0,
						duration:180,
						stun:0,
						sound:sfx.arrowhit,
						dir:playertemp.action.dir,
						dirvfx:0,
						x:playertemp.x,
						y:playertemp.y,
						empowered:0,
						hitc:0,
						paused:0,
						allowpausedrun:1,
						pdmgmin:(plsst(1))*7*(1+0.07*traitpow),
						pdmgmax:(plsst(1))*9*(1+0.07*traitpow),
						mdmgmin:0,
						mdmgmax:0,
						armorE:1,
						resE:1,
						procc:0.35,
						traitpow:traitpow,
						hits:new Array(999),
						run:function(){
							if(objects[n].paused<=0){
								objects[n].dirvfx+=0.15;
								objects[n].speed*=0.965;
							}
							if(playertemp.action.name=="recall boomers"){
								objects[n].paused=0;
								objects[n].duration=0;
								objects[n].empowered=1;
							}
							if(playertemp.action.name=="freeze boomers"&objects[n].paused<=0){
								objects[n].paused=210;
								sfx.freezeboomers.play();
								append(particles,new createparticle(objects[n].x,objects[n].y,0,0,0,0,'circle','',100,0,210,-10,150,150,255,1));
								for(b=0;b<enemies.length;b+=1){
									if(pow(enemies[b].x-objects[n].x,2)+pow(enemies[b].y-objects[n].y,2)<pow(120+enemies[b].size,2)){
										enemies[b].stun+=round(60*(100-enemies[b].tenacity)/100);
									}
								}
							}
							if(playertemp.action.name=="detonate boomers"&objects[n].duration>0){
								objects[n].paused=0;
								objects[n].duration=0;
								sfx.bomb.play();
								append(particles,new createparticle(objects[n].x,objects[n].y,0,0,0,0,'circle','',70,7,255,-13,180,150,0,1));
								append(objects,{
									type:'AoE',
									target:'enemy',
									size:100,
									duration:0,
									rangetype:"ranged",
									x:objects[n].x,
									y:objects[n].y,
									pdmgmin:((plsst(1))+(plsin(1)))*13,
									pdmgmax:((plsst(1))+(plsin(1)))*15,
									mdmgmin:((plsst(1))+(plsin(1)))*13,
									mdmgmax:((plsst(1))+(plsin(1)))*15,
									armorE:1,
									resE:1,
									procc:0.45,
									hits:new Array(999)
								});
							}
							if(objects[n].speed<1){
								if(objects[n].hitc==0){
									objects[n].empowered=1;
								}
							}
						},
						endfunc:function(){
							append(objects,{
								type:'projectile',
								vfx:1,
								draw:function(){
									rotate(objects[n].dirvfx);
									if(render){shape(sprites.boomerang,0,0,30,45);}
									if(objects[n].paused>0){
										ellipseMode(CENTER);
										fill(140,140,255,objects[n].paused);
										ellipse(0,0,35,35);
									}
								},
								target:'enemy',
								size:33,
								speed:8,
								pierce:999,
								duration:75+objects[n].traitpow*5,
								stay:objects[n].traitpow*5,
								stun:0,
								sound:sfx.arrowhit,
								dir:dirtoplayerfromobject(n),
								dirvfx:0,
								x:objects[n].x,
								y:objects[n].y,
								caught:0,
								paused:0,
								allowpausedrun:1,
								pdmgmin:(plsst(1))*(7+objects[n].empowered*30)*(1+0.07*objects[n].traitpow),
								pdmgmax:(plsst(1))*(9+objects[n].empowered*30)*(1+0.07*objects[n].traitpow),
								mdmgmin:0,
								mdmgmax:0,
								armorE:1,
								resE:1,
								procc:0.4*(0.7+objects[n].empowered*3),
								hits:new Array(999),
								run:function(){
									if(playertemp.action.name=="recall boomers"){
										objects[n].paused=0;
										objects[n].speed=12;
									}
									if(playertemp.action.name=="freeze boomers"&objects[n].paused<=0){
										objects[n].paused=210;
										sfx.freezeboomers.play();
										append(particles,new createparticle(objects[n].x,objects[n].y,0,0,0,0,'circle','',100,0,210,-10,150,150,255,1));
										for(b=0;b<enemies.length;b+=1){
											if(pow(enemies[b].x-objects[n].x,2)+pow(enemies[b].y-objects[n].y,2)<pow(120+enemies[b].size,2)){
												enemies[b].stun+=round(60*(100-enemies[b].tenacity)/100);
											}
										}
									}
									
									if(playertemp.action.name=="detonate boomers"){
										objects[n].paused=0;
										objects[n].duration=0;
										sfx.bomb.play();
										append(particles,new createparticle(objects[n].x,objects[n].y,0,0,0,0,'circle','',70,7,255,-13,180,150,0,1));
										append(objects,{
											type:'AoE',
											target:'enemy',
											size:100,
											duration:0,
											rangetype:"ranged",
											x:objects[n].x,
											y:objects[n].y,
											pdmgmin:((plsst(1))+(plsin(1)))*13,
											pdmgmax:((plsst(1))+(plsin(1)))*15,
											mdmgmin:((plsst(1))+(plsin(1)))*13,
											mdmgmax:((plsst(1))+(plsin(1)))*15,
											armorE:1,
											resE:1,
											procc:0.45,
											hits:new Array(999)
										});
									}
									if(objects[n].paused<=0){
										objects[n].dirvfx-=0.3;
									}
									if(!(objects[n].caught)){
									if(pow(playertemp.x-objects[n].x,2)+pow(playertemp.y-objects[n].y,2)<pow(35+player.size,2)){
										objects[n].paused=0;
										objects[n].caught=1;
										objects[n].duration=1;
										player.mp+=13;
										if(options.loadAudio){sfx.boomerangcatch.play();}
									}
									}
									if(objects[n].duration<objects[n].stay){
										objects[n].speed=0;
									}
									if(objects[n].duration<40+objects[n].stay&objects[n].x>playertemp.x+400&objects[n].x<playertemp.x-400&objects[n].y>playertemp.y+400&objects[n].y<playertemp.y-400){
										objects[n].duration=0;
									}
								},
							});
							
						}
					});
			}
			if(playertemp.action.tick==30){
				stopaction();
			}
		}
});
//Recall Boomers
append(doaction,function(lv,hand){
	playertemp.action={
		name:'recall boomers',
		tick:0,
		dir:0,
		level:lv,
		speedm:1
	};
	playertemp.traitcd[hand]=90-player.traits[76]*30;
	playertemp.action.run=function(){
		if(playertemp.action.tick==0){
			if(options.loadAudio){sfx.sprint.play();}
		}
			fill(130,130,130,200);
			translate(400,350);
			rotate(PI/4);
			rect(-5,-15,10,30);
			rect(-15,-5,30,10);
			resetMatrix();
		if(playertemp.action.tick>=10){
			stopaction();
		}
	}
});
//Boom Boomers
append(doaction,function(lv,hand){
	playertemp.action={
		name:'detonate boomers',
		tick:0,
		dir:0,
		level:lv,
		speedm:1
	};
	playertemp.traitcd[hand]=180-player.traits[77]*60;
	playertemp.action.run=function(){
		if(playertemp.action.tick==0){
			if(options.loadAudio){sfx.sprint.play();}
		}
			fill(255,200,130,200);
			translate(400,350);
			rotate(PI/4);
			rect(-5,-15,10,30);
			rect(-15,-5,30,10);
			resetMatrix();
		if(playertemp.action.tick>=10){
			stopaction();
		}
	}
});
//Freeze Boomers
append(doaction,function(lv,hand){
	if(player.mp>=5*player.rcostm[0]*playertemp.rcostm[0]){
		player.mp-=5*player.rcostm[0]*playertemp.rcostm[0];
		playertemp.action={
			name:'freeze boomers',
			tick:0,
			dir:0,
			level:lv,
			speedm:1
		};
		playertemp.traitcd[hand]=720-player.traits[78]*240;
		playertemp.action.run=function(){
			if(playertemp.action.tick==0){
				if(options.loadAudio){sfx.sprint.play();}
			}
				fill(100,100,200,200);
				translate(400,350);
				rotate(PI/4);
				rect(-5,-15,10,30);
				rect(-15,-5,30,10);
				resetMatrix();
			if(playertemp.action.tick>=10){
				stopaction();
			}
		}
	}
});
//Ancient Fang
append(doaction,function(lv,hand){
	spendmana("arcane",7,7);
	playertemp.action={
		name:'venom strike',
		tick:0,
		dir:0,
		level:lv,
		speedm:0.7
	};
	if(mouseY<350){
		playertemp.action.dir=-atan((mouseX-400)/(mouseY-350));
	}
	else{
		playertemp.action.dir=PI-atan((mouseX-400)/(mouseY-350));
	}
	playertemp.action.diro=playertemp.action.dir;
	playertemp.action.run=function(){
		if(player.traits[39]>0){
			traitpow=player.traits[39];
		}
		else{
			traitpow=0;
		}
		if(playertemp.action.tick<=30){
			translate(400,350);
			rotate(playertemp.action.dir);
			translate(0,abs(playertemp.action.tick-15)*2.5-25);
			if(render){shape(sprites.ancientfang,0,0,30,45);}
			resetMatrix();
		}
		if(playertemp.action.tick==1){
				if(options.loadAudio){sfx.swing.play();}
		}
		if(player.traits[64]>0&playertemp.action.tick==11){
			ts.windslash(1.15);
		}
		if(playertemp.action.tick==5){
			hits=0;
			for(i=0;i<enemies.length;i+=1){
				if(pow(enemies[i].x-playertemp.x,2)+pow(enemies[i].y-playertemp.y,2)<pow(50+enemies[i].size,2)&
				(enemies[i].x-playertemp.x)*sin(-playertemp.action.dir)+(enemies[i].y-playertemp.y)*cos(-playertemp.action.dir)<0
				){
					hits+=1;
					damage("enemies",i,random(19*((plsin(1))*0.25+(plsst(1))*0.75),2.3*((plsin(1))*0.25+(plsst(1))*0.75)*10),0,1,1,"melee","player",0.9);
					if(options.loadAudio){sfx.pslice.play();}
				}
			}
			if(hits>0){
				ts.venompool(2.5,0.5,1.25);
			}
			else{
				ts.venompool(1,1,1);
			}
		}
		if(playertemp.action.tick>=50-2*min(10,traitpow)){
			stopaction();
		}
	}
});
//Timewarp
append(doaction,function(lv,hand){
	if(player.mp>=(max(0,40-player.traits[86]*10))*player.rcostm[0]*playertemp.rcostm[0]){
		player.mp-=max(0,40-player.traits[86]*10)*player.rcostm[0]*playertemp.rcostm[0];
	playertemp.action={
		name:'timewarp',
		tick:0,
		dir:0,
		level:lv,
		speedm:0.5
	};
	playertemp.action.run=function(){
		if(playertemp.action.tick==0){
			
						if(options.loadAudio){sfx.warp.play();}
			playertemp.haste+=1;
			append(stateffects,{name:'timewarp',tick:0,run:function(){
					translate(400,350);
					rotate(stateffects[n].tick/5);
					fill(170,170,170,200-stateffects[n].tick*0.4);
					ellipseMode(CENTER);
					ellipse(0,-24,10,20);
					ellipse(24,0,20,10);
					ellipse(0,24,10,20);
					ellipse(-24,0,20,10);
				
				resetMatrix();
				if(stateffects[n].tick>=240){
					playertemp.haste-=1;
					stateffects.splice(n,1);
					n-=1;
				}
			}
			});
		}
		if(playertemp.action.tick<30){
			ellipseMode(CENTER);
			fill(180,180,100,180-abs(playertemp.action.tick-15)*8);
			ellipse(400,350,45-abs(playertemp.action.tick-15)*2,45-abs(playertemp.action.tick-15)*2);
		}
		if(playertemp.action.tick>=30){
			stopaction();
		}
	}
	}
});
//Energy Bolt
append(doaction,function(lv,hand){
	playertemp.action={
		name:'energy bolt',
		tick:0,
		dir:0,
		level:lv,
		speedm:0.8
	};
	if(mouseY<350){
		playertemp.action.dir=-atan((mouseX-400)/(mouseY-350));
	}
	else{
		playertemp.action.dir=PI-atan((mouseX-400)/(mouseY-350));
	}
	spendmana("magic",2,2);
	playertemp.action.run=function(){
		if(player.traits[42]>0){
			traitpow=player.traits[42];
		}
		else{
			traitpow=0;
		}
		if(playertemp.action.tick==1){
			if(options.loadAudio){sfx.energystaff.play();}
		}
		if(mouseY<350){
				playertemp.action.dir=-atan((mouseX-400)/(mouseY-350));
			}
			else{
				playertemp.action.dir=PI-atan((mouseX-400)/(mouseY-350));
			}
		translate(400,350);
		rotate(playertemp.action.dir);
		if(render){shape(sprites.energystaff,0,0,30,45);}
		resetMatrix();
		if(playertemp.action.tick==1){
			for(spp=0;spp<2;spp+=1){
			append(objects,{
				type:'projectile',
				vfx:1,
				draw:function(){
					fill(100+objects[n].duration*7,100+objects[n].duration*7,100+objects[n].duration*7);
					ellipseMode(CENTER);
					ellipse(0,0,10+(tick%30-15)/3,10+(tick%30-15)/3);
					if(options.light){
						fill(255,255,200,3);
						for(cal=0;cal<40;cal+=1){
							ellipse(0,0,cal+10+(tick%30-15)/3,cal+10+(tick%30-15)/3);
						}
					}
				},
				target:'enemy',
				size:15,
				speed:7,
				pierce:0,
				duration:45*(1+min(10,traitpow)/20),
				sound:sfx.energyh,
				dir:playertemp.action.dir,
				curve:0.1-spp/5,
				curvelock:spp,
				x:playertemp.x,
				y:playertemp.y,
				pdmgmin:0,
				pdmgmax:0,
				mdmgmin:(plsin(1))*8.5,
				mdmgmax:(plsin(1))*10.5,
				armorE:1,
				resE:1,
				procc:0.45,
				hits:new Array(999),
				run:function(){
					if(objects[n].curvelock){
						objects[n].curve+=0.015;
					}
					else{
						objects[n].curve-=0.015;
					}
					if(objects[n].curve<-0.1){
						objects[n].curvelock=1;
					}
					if(objects[n].curve>0.1){
						objects[n].curvelock=0;
					}
					objects[n].dir+=objects[n].curve;
				},
			});
			}
		}
		if(playertemp.action.tick>=30*(1-min(0.6,(player.mp/(plsmp(1)))*0.6))){
			stopaction();
		}
	}
});
//Phase Door
append(doaction,function(lv,hand){
	if(playertemp.phasedoor>0){
		playertemp.traitcd[hand]=600;
		damage("player",0,999999999999999999999999999999999999999999,999999999999999999999999999999999999999999,0,0,"pure","player",0);
		if(player.hp<1){
			player.hp=1;
		}
		player.mp=0;
	}
	playertemp.phasedoor=180;
	if(options.loadAudio){sfx.pdoor.play();}
	append(stateffects,{name:'phase door',dir:targetdir(),tick:0,run:function(){
		playertemp.xvelo+=120*sin(stateffects[n].dir)/(stateffects[n].tick+1);
		playertemp.yvelo-=120*cos(stateffects[n].dir)/(stateffects[n].tick+1);
		if(stateffects[n].tick>=3){
			playertemp.xvelo*=0.3;
			playertemp.yvelo*=0.3;
		}
		if(stateffects[n].tick>=6){
			stateffects.splice(n,1);
			n-=1;
		}
	}
	});
});
//Overload
append(doaction,function(lv,hand){
	if(player.mp>=80){
		append(particles,new createparticle(400,350,0,0,0,0,'circle','',5,2,255,-7,100,0,255,0));
		append(particles,new createparticle(400,350,0,0,0,0,'circle','',30,1,255,-8,170,170,255,0));
		if(options.loadAudio){sfx.pdoor.play();}
		append(stateffects,{name:'overload',tick:0,run:function(){
			if(stateffects[n].tick==1){
				stateffects[n].pow=max(0,(player.mp-70)*0.3*(3.5+player.traits[117]/2))/100;
				if(player.mp>80){
					player.mp-=player.mp*0.3;
					playertemp.str+=stateffects[n].pow;
					playertemp.intel+=stateffects[n].pow;
				}
			}
			else{
				playertemp.str-=stateffects[n].pow/719;
				playertemp.intel-=stateffects[n].pow/719;
			}
			if(stateffects[n].tick>=720){
				stateffects.splice(n,1);
				n-=1;
			}
		}
		});
	}
else{
	playertemp.traitcd[hand]=1;
}
});
var dirtoplayerfromobject=function(n){
	if(objects[n].x-playertemp.x<0){
		return(atan((objects[n].y-playertemp.y)/(objects[n].x-playertemp.x))+PI/2);
	}
	else{
		return(atan((objects[n].y-playertemp.y)/(objects[n].x-playertemp.x))-PI/2);
	}
}
var reducecd=function(traitID,amount){
	if(player.activetraits.shift==traitID){
		playertemp.traitcd.shift=max(0,playertemp.traitcd.shift-amount);
	}
	if(player.activetraits.space==traitID){
		playertemp.traitcd.space=max(0,playertemp.traitcd.space-amount);
	}
	if(player.activetraits.q==traitID){
		playertemp.traitcd.q=max(0,playertemp.traitcd.q-amount);
	}
	if(player.activetraits.e==traitID){
		playertemp.traitcd.e=max(0,playertemp.traitcd.e-amount);
	}
}
//=========================
var sprites={
	sword:loadShape('Data/Graphics/attack/sword.svg'),
	shieldBash:loadShape('Data/Graphics/attack/shield bash.svg'),
	arrow:loadShape('Data/Graphics/attack/arrow.svg'),
	bow:loadShape('Data/Graphics/attack/bow.svg'),
	lbow:loadShape('Data/Graphics/attack/bowloaded.svg'),
	bubblewand:loadShape('Data/Graphics/attack/bubble wand.svg'),
	bubble:loadShape('Data/Graphics/attack/bubble.svg'),
	xbow:loadShape('Data/Graphics/attack/xbow.svg'),
	bolt:loadShape('Data/Graphics/attack/bolt.svg'),
	dariusaxe:loadShape('Data/Graphics/attack/darius axe.svg'),
	mordekaisermace:loadShape('Data/Graphics/attack/mordekaiser mace.svg'),
	hp:loadShape('Data/Graphics/miscellaneous/hp.svg'),
	hpregen:loadShape('Data/Graphics/miscellaneous/hpregen.svg'),
	str:loadShape('Data/Graphics/miscellaneous/str.svg'),
	intel:loadShape('Data/Graphics/miscellaneous/int.svg'),
	armor:loadShape('Data/Graphics/miscellaneous/arm.svg'),
	res:loadShape('Data/Graphics/miscellaneous/res.svg'),
	mp:loadShape('Data/Graphics/miscellaneous/mp.svg'),
	mpregen:loadShape('Data/Graphics/miscellaneous/mpregen.svg'),
	passive:loadShape('Data/Graphics/miscellaneous/passive.svg'),
	masterSword:loadShape('Data/Graphics/attack/master sword.svg'),
	mswordbeam:loadShape('Data/Graphics/attack/master sword beam.svg'),
	anvil:loadShape('Data/Graphics/miscellaneous/anvil.svg'),
	rapier:loadShape('Data/Graphics/attack/rapier.svg'),
	voidblast:loadShape('Data/Graphics/attack/voidblast.svg'),
	voidstaff:loadShape('Data/Graphics/attack/void staff.svg'),
	minigun:loadShape('Data/Graphics/attack/minigun.svg'),
	boomerang:loadShape('Data/Graphics/attack/boomerang.svg'),
	ancientfang:loadShape('Data/Graphics/attack/ancientFang.svg'),
	energystaff:loadShape('Data/Graphics/attack/energyStaff.svg'),
	stattrait:loadShape('Data/Graphics/miscellaneous/stat trait.svg'),
	statkeystone:loadShape('Data/Graphics/miscellaneous/stat keystone.svg'),
};
if(options.loadAudio){
var sfx={	
		hurt: new Howl({  src: ['Data/Sound/sfx/hurt.ogg'], autoplay: false,loop: false, volume: 0.3,}),
		hurtpow: new Howl({ src: ['Data/Sound/sfx/hurt.ogg'],autoplay: false, loop: false,  volume: 0.7,}),
		hurtpow2: new Howl({src: ['Data/Sound/sfx/hurt.ogg'],  autoplay: false,  loop: false, volume: 1,}),
		hurt2: new Howl({  src: ['Data/Sound/sfx/hurt2.wav'], autoplay: false,loop: false, volume: 0.6,}),
		death: new Howl({src: ['Data/Sound/sfx/death.wav'], autoplay: false,loop: false,volume: 1,}),
		swing: new Howl({src: ['Data/Sound/sfx/swing.wav'], autoplay: false, loop: false,volume: 0.65,}),
		slice: new Howl({  src: ['Data/Sound/sfx/slice.wav'], autoplay: false,  loop: false,volume: 0.55,}),
		bong: new Howl({ src: ['Data/Sound/sfx/shield hit.wav'], autoplay: false,loop: false, volume: 0.1,}),
		bow: new Howl({ src: ['Data/Sound/sfx/bow.wav'], autoplay: false,loop: false, volume: 0.7,}),
		arrow: new Howl({src: ['Data/Sound/sfx/arrow.wav'], autoplay: false, loop: false,volume: 0.7,}),
		arrowhit: new Howl({ src: ['Data/Sound/sfx/arrow hit.wav'], autoplay: false, loop: false, volume: 0.7,}),
		shield: new Howl({src: ['Data/Sound/sfx/shield.wav'], autoplay: false,loop: false,volume: 1,}),
		pop: new Howl({src: ['Data/Sound/sfx/pop.wav'], autoplay: false,loop: false,volume: 0.65,}),
		water: new Howl({src: ['Data/Sound/sfx/water drop.wav'], autoplay: false,loop: false,volume: 0.2,}),
		decimatec: new Howl({src: ['Data/Sound/sfx/decimateC.wav'], autoplay: false,loop: false,volume: 1,}),
		decimateh: new Howl({src: ['Data/Sound/sfx/decimateH.wav'], autoplay: false,loop: false,volume: 0.7,}),
		MoS:{start:new Howl({src: ['Data/Sound/sfx/MoSstart.wav'], autoplay: false,loop: false,volume: 0.7,}),
			one:new Howl({src: ['Data/Sound/sfx/MoS1.wav'], autoplay: false,loop: false,volume: 0.7,}),
			too:new Howl({src: ['Data/Sound/sfx/MoS2.wav'], autoplay: false,loop: false,volume: 0.7,}),
			three:new Howl({src: ['Data/Sound/sfx/MoS3.wav'], autoplay: false,loop: false,volume: 0.7,}),
			swing:new Howl({src: ['Data/Sound/sfx/MoSwing.wav'], autoplay: false,loop: false,volume: 0.7,}),
		},
		relicshield:new Howl({src: ['Data/Sound/sfx/relic shield.wav'], autoplay: false,loop: false,volume: 1,}),
		shieldoverload:new Howl({src: ['Data/Sound/sfx/shield overload.wav'], autoplay: false,loop: false,volume: 1,}),
		roar:new Howl({src: ['Data/Sound/sfx/roar.wav'], autoplay: false,loop: false,volume: 1,}),
		block:new Howl({src: ['Data/Sound/sfx/block.wav'], autoplay: false,loop: false,volume: 0.6,}),
		fullblock:new Howl({src: ['Data/Sound/sfx/full block.wav'], autoplay: false,loop: false,volume: 0.15,}),
		pswing:new Howl({src: ['Data/Sound/sfx/pswing.wav'], autoplay: false,loop: false,volume: 0.7,}),
		pslice:new Howl({src: ['Data/Sound/sfx/pslice.wav'], autoplay: false,loop: false,volume: 0.7,}),
		focus:new Howl({src: ['Data/Sound/sfx/focus.wav'], autoplay: false,loop: false,volume: 0.7,}),
		sprint:new Howl({src: ['Data/Sound/sfx/sprint.wav'], autoplay: false,loop: false,volume: 0.5,}),
		mswordswing:new Howl({src: ['Data/Sound/sfx/master sword swing.wav'], autoplay: false,loop: false,volume: 0.7,}),
		mswordbeam:new Howl({src: ['Data/Sound/sfx/master sword beam.wav'], autoplay: false,loop: false,volume: 0.7,}),
		mswordhit:new Howl({src: ['Data/Sound/sfx/master sword hit.wav'], autoplay: false,loop: false,volume: 0.7,}),
		upgrade:new Howl({src: ['Data/Sound/sfx/upgrade.wav'], autoplay: false,loop: false,volume: 0.7,}),
		enchant:new Howl({src: ['Data/Sound/sfx/enchant.wav'], autoplay: false,loop: false,volume: 0.4,}),
		obliteration:new Howl({src: ['Data/Sound/sfx/obliteration.wav'], autoplay: false,loop: false,volume: 0.3,}),
		glacialwardcharge:new Howl({src: ['Data/Sound/sfx/glacial ward charge.wav'], autoplay: false,loop: false,volume: 0.3,}),
		glacialwardshatter:new Howl({src: ['Data/Sound/sfx/glacial ward shatter.wav'], autoplay: false,loop: false,volume: 0.3,}),
		warp:new Howl({src: ['Data/Sound/sfx/warp.wav'], autoplay: false,loop: false,volume: 0.7,}),
		rapiersw:new Howl({src: ['Data/Sound/sfx/rapier swing.wav'], autoplay: false,loop: false,volume: 0.75,}),
		voidbarrier:new Howl({src: ['Data/Sound/sfx/void barrier.wav'], autoplay: false,loop: false,volume: 0.6,}),
		voidbarrierr:new Howl({src: ['Data/Sound/sfx/void barrier release.wav'], autoplay: false,loop: false,volume: 0.6,}),
		voidblast:new Howl({src: ['Data/Sound/sfx/void blast.wav'], autoplay: false,loop: false,volume: 0.6,}),
		voidboom:new Howl({src: ['Data/Sound/sfx/void explosion.wav'], autoplay: false,loop: false,volume: 0.6,}),
		bomb:new Howl({src: ['Data/Sound/sfx/bomb.wav'], autoplay: false,loop: false,volume: 0.6,}),
		windslash:new Howl({src: ['Data/Sound/sfx/wind slash.wav'], autoplay: false,loop: false,volume: 1,}),
		minigun:new Howl({src: ['Data/Sound/sfx/minigun.wav'], autoplay: false,loop: false,volume: 0.3,}),
		boomerang:new Howl({src: ['Data/Sound/sfx/boomerang.wav'], autoplay: false,loop: false,volume: 0.6,}),
		boomerangcatch:new Howl({src: ['Data/Sound/sfx/boomerang catch.wav'], autoplay: false,loop: false,volume: 0.6,}),
		SoH:new Howl({src: ['Data/Sound/sfx/SoH.wav'], autoplay: false,loop: false,volume: 0.6,}),
		SoHh:new Howl({src: ['Data/Sound/sfx/SoHh.wav'], autoplay: false,loop: false,volume: 0.6,}),
		freezeboomers:new Howl({src: ['Data/Sound/sfx/boomerang freeze.wav'], autoplay: false,loop: false,volume: 0.6,}),
		poison:new Howl({src: ['Data/Sound/sfx/poison.wav'], autoplay: false,loop: false,volume: 0.03,}),
		energystaff:new Howl({src: ['Data/Sound/sfx/energy bolt.wav'], autoplay: false,loop: false,volume: 0.35,}),
		energyh:new Howl({src: ['Data/Sound/sfx/energy hit.wav'], autoplay: false,loop: false,volume: 0.11,}),
		dash:new Howl({src: ['Data/Sound/sfx/dash.wav'], autoplay: false,loop: false,volume: 1,}),
		burn:new Howl({src: ['Data/Sound/sfx/burn.wav'], autoplay: false,loop: true,volume: 1,}),
		bleed:new Howl({src: ['Data/Sound/sfx/bleed.wav'], autoplay: false,loop: true,volume: 1,}),
		poisoned:new Howl({src: ['Data/Sound/sfx/poisoned.wav'], autoplay: false,loop: true,volume: 1,}),
		raining:new Howl({src: ['Data/Sound/sfx/rain.ogg'], autoplay: false,loop: true,volume: 2,}),
		plunge:new Howl({src: ['Data/Sound/sfx/plunge.wav'], autoplay: false,loop: false,volume: 1.5,}),
		eldritch:new Howl({src: ['Data/Sound/sfx/eldritch.wav'], autoplay: false,loop: false,volume: 0.7,}),
		arcanereconstruction:new Howl({src: ['Data/Sound/sfx/heal.ogg'], autoplay: false,loop: false,volume: 0.9,}),
		prime:new Howl({src: ['Data/Sound/sfx/distortion.ogg'], autoplay: false,loop: false,volume: 1.3,}),
		pdoor:new Howl({src: ['Data/Sound/sfx/warp.ogg'], autoplay: false,loop: false,volume: 1.3,}),
		slash:new Howl({src: ['Data/Sound/sfx/slash.ogg'], autoplay: false,loop: false,volume: 1,}),
		rapier:new Howl({src: ['Data/Sound/sfx/rapier.ogg'], autoplay: false,loop: false,volume: 0.6,}),
		click:new Howl({src: ['Data/Sound/sfx/click.ogg'], autoplay: false,loop: false,volume: 0.8,}),
		click2:new Howl({src: ['Data/Sound/sfx/click2.ogg'], autoplay: false,loop: false,volume: 0.8,}),
		click3:new Howl({src: ['Data/Sound/sfx/click3.ogg'], autoplay: false,loop: false,volume: 0.8,}),
		shrek:new Howl({src: ['Data/Sound/sfx/shrek.ogg'], autoplay: false,loop: false,volume: 1,}),
		shrekdeath:new Howl({src: ['Data/Sound/sfx/shrek death.ogg'], autoplay: false,loop: false,volume: 1,}),
		dashbig:new Howl({src: ['Data/Sound/sfx/dashbig.ogg'], autoplay: false,loop: false,volume: 1,}),
		earthquake:new Howl({src: ['Data/Sound/sfx/earthquake.wav'], autoplay: false,loop: false,volume: 1,}),
		jumpbig:new Howl({src: ['Data/Sound/sfx/jumpbig.ogg'], autoplay: false,loop: false,volume: 1,}),
};
}
var anticlipc;
var projectiles= new Array();
append(projectiles,loadShape('Data/Graphics/projectiles/branch.svg'));
var projectilekey= loadStrings('Data/Text/projectile key.txt');
for(i=0;i<projectilekey.length;i+=1){
	append(projectiles,loadShape('Data/Graphics/projectiles/'+projectilekey[i]));
}
projectilekey='';
key={code:0};
var drawcount=0;
var cdraw=0;
drawcap*=(urf*2+1);
var render=0;
var playeractionstock=0;
var playeractionstockr=0;
// Main draw loop
void draw(){
	cdraw=0;
	fps.count+=1;
	fps.second=second();
	if(!(fps.second==fps.lastsecond)){
		fps.fps=fps.count;
		fps.lastsecond=fps.second;
		fps.count=0;
	}
	if(options.frameskip){
		ms=millis();
		drawcount+=(ms-mslast)*(urf*2+1);
		mslast=ms;
		if(inventory){
			drawcount=17;
		}
		if(drawcount>170*(urf*2+1)){
			drawcount=17;
			console.log("Resetting ticks - too much lag");
		}
	}
	else{
		drawcount=17*(urf*2+1);
	}
while(drawcount>=17&cdraw<=drawcap){
	drawcount-=17;
	cdraw+=1;
	if(drawcount<17
	){
		render=1;
	}
	else{
		render=0;
	}
tick += 1;
	tooltipdraw=0;
//====================In Game=============================================================================================================================
//========================================================================================================================================================
if(loaded==1){
	if(inventory==0){
gametick += 1;
showdots[0]=0;
showdots[1]=0;
showdots[2]=0;
	if(!(cinematic||dialoga)){
	if(inwater){
		playertemp.traction=0.5;
		playertemp.wspeed=0.82;
	}
	else{
		playertemp.traction=1;
		playertemp.wspeed=1;
		
	}
	///////////////PLAYER CONTROLS=================================================
	///////WALK============================
	playeractionstock+=player.haste*playertemp.haste;
	playertemp.cspeed=max(0,player.speed*playertemp.speed*playertemp.wspeed*playertemp.action.speedm);
	if(!(inventory)){
		if(keyPressed&movelock==0&(input[0]||input[1]||input[2]||input[3])){
			playertemp.timesincemove=0;
			if(player.traits[16]>0){
				player.mp+=player.mpregen/1200*(min(20,player.traits[16]));
			}
			if(inwater){
				player.mp-=0.03;
			}
			dowalk(2*playertemp.cspeed*6/player.size);
			if(input[0]){
				if(input[1]){
					playertemp.xvelo-=playertemp.cspeed*.7*(1-player.traction*playertemp.traction);
					playertemp.yvelo-=playertemp.cspeed*.7*(1-player.traction*playertemp.traction);
				}
				else if(input[3]){
					playertemp.xvelo+=playertemp.cspeed*.7*(1-player.traction*playertemp.traction);
					playertemp.yvelo-=playertemp.cspeed*.7*(1-player.traction*playertemp.traction);
				}
				else{
					playertemp.yvelo-=playertemp.cspeed*(1-player.traction*playertemp.traction);
				}
			}
			else if(input[3]){
				if(input[2]){
					playertemp.xvelo+=playertemp.cspeed*.7*(1-player.traction*playertemp.traction);
					playertemp.yvelo+=playertemp.cspeed*.7*(1-player.traction*playertemp.traction);
				}
				else{
					playertemp.xvelo+=playertemp.cspeed*(1-player.traction*playertemp.traction);
				}
			}
			else if(input[2]){
				if(input[1]){
					playertemp.xvelo-=playertemp.cspeed*.7*(1-player.traction*playertemp.traction);
					playertemp.yvelo+=playertemp.cspeed*.7*(1-player.traction*playertemp.traction);
				}
				else{
					playertemp.yvelo+=playertemp.cspeed*(1-player.traction*playertemp.traction);
				}
			}
			else if(input[1]){
					playertemp.xvelo-=playertemp.cspeed*(1-player.traction*playertemp.traction);
			}
		}
		else{
			if(playertemp.walktick>-playertemp.cspeed&playertemp.walktick<playertemp.cspeed){
				playertemp.walktick=0;
			}
			else if(playertemp.walktick<0){
				playertemp.walktick+=playertemp.cspeed;
			}
			else{
				playertemp.walktick-=playertemp.cspeed;
			}
			
		}
		if(playertemp.xvelo<0.01&playertemp.xvelo>-0.01){
			playertemp.xvelo=0;
		}
		if(playertemp.yvelo<0.01&playertemp.yvelo>-0.01){
			playertemp.yvelo=0;
		}
		while(playeractionstock>=1){
			playeractionstock-=1;
			playeractionstockr+=1;
		//PLAYER ACTIONS========================================================================
		if(playertemp.combo.LH.timer>0){
			playertemp.combo.LH.timer-=1;
		}
		else if(!(playertemp.combo.LH.num==0)){
			playertemp.combo.LH={num:0,timer:1};
		}
		if(playertemp.combo.RH.timer>0){
			playertemp.combo.RH.timer-=1;
		}
		else if(!(playertemp.combo.RH.num==0)){
			playertemp.combo.RH={num:0,timer:1};
		}
		if(playertemp.traitcd.shift>0){
			playertemp.traitcd.shift-=1;
		}
		if(playertemp.traitcd.space>0){
			playertemp.traitcd.space-=1;
		}
		if(playertemp.traitcd.q>0){
			playertemp.traitcd.q-=1;
		}
		if(playertemp.traitcd.e>0){
			playertemp.traitcd.e-=1;
		}
		if(playertemp.actionlock<=0){
			if(playertemp.action.name==0){
				if(mousePressed&mouseButton==LEFT&player.mp>=itemdata[player.inventory.LH.id*10+7]*player.rcostm[0]*playertemp.rcostm[0]){
					player.mp-=itemdata[player.inventory.LH.id*10+7]*player.rcostm[0]*playertemp.rcostm[0];
					doaction[itemdata[player.inventory.LH.id*10+2]](player.inventory.LH.level,'LH');
					playertemp.timesinceaction=0;
				}
				if(mousePressed&mouseButton==RIGHT&player.mp>=itemdata[player.inventory.RH.id*10+7]*player.rcostm[0]*playertemp.rcostm[0]){
					player.mp-=itemdata[player.inventory.RH.id*10+7]*player.rcostm[0]*playertemp.rcostm[0];
					doaction[itemdata[player.inventory.RH.id*10+2]](player.inventory.RH.level,'RH');
					playertemp.timesinceaction=0;
				}
		}}
		else{
			playertemp.actionlock-=1;
		}
		if(playertemp.traitcd.shift<=0&input[4]){
			if(player.activetraits.shift){
				if(player.traits[player.activetraits.shift]){
					if(traitusage[player.activetraits.shift-1]==1||(playertemp.actionlock<=0&playertemp.action.name==0)){
						playertemp.traitcd.shift=traitcd[player.activetraits.shift];
						doaction[activetraits[player.activetraits.shift]](player.traits[player.activetraits.shift],'shift');
						playertemp.timesinceaction=0;
					}
				}
			}
		}
		if(playertemp.traitcd.space<=0&input[5]){
			if(player.activetraits.space){
				if(player.traits[player.activetraits.space]){
					if(traitusage[player.activetraits.space-1]==1||(playertemp.actionlock<=0&playertemp.action.name==0)){
						playertemp.traitcd.space=traitcd[player.activetraits.space];
						doaction[activetraits[player.activetraits.space]](player.traits[player.activetraits.space],'space');
						playertemp.timesinceaction=0;
					}
				}
			}
		}
		if(playertemp.traitcd.q<=0&input[6]){
			if(player.activetraits.q){
				if(player.traits[player.activetraits.q]){
					if(traitusage[player.activetraits.q-1]==1||(playertemp.actionlock<=0&playertemp.action.name==0)){
						playertemp.traitcd.q=traitcd[player.activetraits.q];
						doaction[activetraits[player.activetraits.q]](player.traits[player.activetraits.q],'q');
						playertemp.timesinceaction=0;
					}
				}
			}
		}
		if(playertemp.traitcd.e<=0&input[7]){
			if(player.activetraits.e){
				if(player.traits[player.activetraits.e]){
					if(traitusage[player.activetraits.e-1]==1||(playertemp.actionlock<=0&playertemp.action.name==0)){
						playertemp.traitcd.e=traitcd[player.activetraits.e];
						doaction[activetraits[player.activetraits.e]](player.traits[player.activetraits.e],'e');
						playertemp.timesinceaction=0;
					}
				}
			}
		}
	}
		playertemp.xvelo*=player.traction*playertemp.traction;
		playertemp.x+=playertemp.xvelo;
		playertemp.yvelo*=player.traction*playertemp.traction;
		playertemp.y+=playertemp.yvelo;
	}
	}
	////////////////////////=================MainDisplay===================//////////////////////////////////////////////
	if(render){fill(biomedata[2][0],biomedata[2][1],biomedata[2][2]);
	rect(0,0,1133,700);}
	if(input[0]||input[1]||input[2]||input[3]){
		if(playertemp.yvelo>0.1){
			lastDir = PI-atan(playertemp.xvelo/playertemp.yvelo);
		}
		else if(playertemp.yvelo<-0.1){
			lastDir = -atan(playertemp.xvelo/playertemp.yvelo)
		}
		else if(playertemp.xvelo>0.4){
			lastDir = PI/2
		}
		else if(playertemp.xvelo<-0.4){
			lastDir = -PI/2
		}
	}
	/////////////////DECORATE FLOOR=============================
	if(render){for(i=5;i>-5;i-=1){
		for(n=5;n>-5;n-=1){
			image(bg,i*300-playertemp.x%600,n*300-playertemp.y%600,300,300);
		}
	}}
	//DRAW LIQUIDS============================
	rectMode(CENTER);
	inwater=0;
	for(i=0;i<waters.length;i+=1){
		if(render){translate(waters[i].x-playertemp.x+400,waters[i].y-playertemp.y+350);
				fill(0,0,255,75);
			rect(0,0,waters[i].width*2,waters[i].height*2,99);}
			//Hitboxes
			if(waters[i].x-playertemp.x>-(waters[i].width)&
					waters[i].x-playertemp.x<(waters[i].width)&
					waters[i].y-playertemp.y>-(waters[i].height)&
					waters[i].y-playertemp.y<(waters[i].height)){
						inwater=1;
					}
					resetMatrix();
			if(tick%60==0){
				if(waters[i].x-playertemp.x>1200||waters[i].x-playertemp.x<-1200||waters[i].y-playertemp.y>1200||waters[i].y-playertemp.y<-1200){
					defaultwater(i,450);
					
				}
			}
	}
	rectMode(CORNER);
	//DRAW PLAYER===================================================
	if(render){
	for(tful=0;tful<traitfuncs.underlay.length;tful+=1){
		traitfuncs.underlay[tful]();
	}
	for(tful=0;tful<keystonefuncs.underlay.length;tful+=1){
		keystonefuncs.underlay[tful]();
	}
	translate(400,350);
	rotate(lastDir);
	if(abs(playertemp.walktick)>10){
		shape(VRPlayer.leg,-4,0,80*player.size/6,(10+playertemp.walktick)*player.size/6);
		rotate(PI);
		shape(VRPlayer.leg,-4,0,80*player.size/6,(10+playertemp.walktick)*player.size/6);
		rotate(PI);
	}
	shape(VRPlayer.main,0,0,30*player.size/6,45*player.size/6);
	shape(VRPlayer.head,0,0,30*player.size/6,45*player.size/6);
	resetMatrix();
	}
	////////////////RUN PLAYER ACTIONS===========================================================
	//===========================================================================================
	if(!(cinematic||dialoga)){
	if(playertemp.action.ignorehaste){
		playeractionstockr=1;
	}
	while(playeractionstockr>0){
		playeractionstockr-=1;
	if(!(playertemp.action.name==0)){
		playertemp.action.run();
		playertemp.action.tick+=1;
	}
	}
	}
	//DRAW ENEMIES================================================================================
	for(i=0;i<enemies.length;i+=1){
		if(enemies[i].dots){
			for(d=0;d<enemies[i].dots.length;d+=1){
				damage("enemies",i,enemies[i].dots[d].pdmg,enemies[i].dots[d].mdmg,enemies[i].dots[d].armorE,enemies[i].dots[d].resE,"DoT","player",0);
				enemies[i].dots[d].dur-=1;
				if(enemies[i].dots[d].dur<=0){
					enemies[i].dots.splice(d,1);
					d-=1;
				}
			}
		}
		if(enemies[i].hp<=0){
			playertemp.timesincekill=0;
			append(particles,new createparticle(enemies[i].x,enemies[i].y,0,0,0,-0.1,'circle','',20,-0.3,255,-6,200,0,140,1));
			if(enemies[i].reactant){
				append(particles,new createparticle(275+random(150),300,0,-1,0,0,'text','+ '+round(enemies[i].reactant)+' Reactant',22,0,255,-2,160,130,50));
				player.reactant+=round(enemies[i].reactant);
			}
			player.xp+=round(enemies[i].xp*(pow(1.1,min(player.level,enemies[i].lv)-1)));
			if(player.traits[22]>0){
				player.xp+=round(enemies[i].xp*(pow(1.1,min(player.level,enemies[i].lv)-1))*player.traits[22]/100);
			}
			if(player.traits[23]>0){
				player.xp-=round(enemies[i].xp*(pow(1.1,min(player.level,enemies[i].lv)-1))*player.traits[23]/100);
			}
			if(enemies[i].loot){
				getloot(i);
			}
			for(kq=0;kq<killquests.length;kq+=1){
				if(enemies[i].name==killquests[kq].name){
					killquests[kq].run();
				}
			}
			if(enemies[i].ondeath){
				enemies[i].ondeath(i);
			}
		}
	}
	for(i=0;i<enemies.length;i+=1){
			if((enemies[i].x-playertemp.x<enemies[i].vision&enemies[i].x-playertemp.x>-enemies[i].vision&
			enemies[i].y-playertemp.y>-enemies[i].vision&enemies[i].y-playertemp.y<enemies[i].vision)||enemies[i].persistent){
				if(!(cinematic||dialoga)){
					ai[enemies[i].ai](i);
				}
				if(render){
					translate(enemies[i].x-playertemp.x+400,enemies[i].y-playertemp.y+350);
					if(enemies[i].turnstyle==1){
						rotate(enemies[i].dir);
					}
					if(enemies[i].imgtype==1){
						shape(enemiesimg[enemies[i].sprite][floor(enemies[i].anc)],0,0,30,45);
					}
					if(enemies[i].imgtype==2){
						shape(enemies[i].sprite[floor(enemies[i].anc)],0,0,30,45);
					}
					if(enemies[i].imgtype==3){
						enemies[i].draw(i);
					}
					resetMatrix();
					if(!(enemies[i].disablehpbar)&(options.healthbars==2||(options.healthbars==1&enemies[i].hp<enemies[i].mhp))){
						translate(enemies[i].x-playertemp.x+400,enemies[i].y-playertemp.y+350);
						fill(0,0,0);
						rect(-15,-10-enemies[i].size,30,5);
						fill(0,200,0);
						rect(-15,-10-enemies[i].size,enemies[i].hp/enemies[i].mhp*30,5);
				}}
				
			}
				resetMatrix();
				if(!(enemies[i].persistent)){
				if(enemies[i].x-playertemp.x>1200||enemies[i].x-playertemp.x<-1200||enemies[i].y-playertemp.y>1200||enemies[i].y-playertemp.y<-1200){
					if(enemies[i].ondespawn){
						enemies[i].ondespawn(i);
					}
				}
				}
	}
	//DRAW TERRAIN==============================
	for(i=0;i<terrain.length;i+=1){
			if(render){translate(terrain[i].x-playertemp.x+400,terrain[i].y-playertemp.y+350);
			rotate(terrain[i].angle);
			if(terrain[i].x-playertemp.x<450&terrain[i].x-playertemp.x>-450&
			terrain[i].y-playertemp.y>-450&terrain[i].y-playertemp.y<450){
				shape(terrainimg[terrain[i].sprite],0,0,30,45);
			}}
			//Hitboxes
			if(terrain[i].isWall==1
				&terrain[i].x-playertemp.x>-(terrain[i].size+player.size)&
					terrain[i].x-playertemp.x<(terrain[i].size+player.size)&
					terrain[i].y-playertemp.y>-(terrain[i].size+player.size)&
					terrain[i].y-playertemp.y<(terrain[i].size+player.size)){
						if(abs(playertemp.x-terrain[i].x)>abs(playertemp.y-terrain[i].y)){
							if(playertemp.x-terrain[i].x>0){
								//right
								playertemp.x=terrain[i].x+(terrain[i].size+player.size);
							}
							else{
								//left
								playertemp.x=terrain[i].x-(terrain[i].size+player.size);
							}
						}
						else{
							if(playertemp.y-terrain[i].y>0){
								//down
								playertemp.y=terrain[i].y+(terrain[i].size+player.size);
							}
							else{
								//up
								playertemp.y=terrain[i].y-(terrain[i].size+player.size);
							}
						}
					}
			resetMatrix();
			if(tick%60==0){
				if(terrain[i].x-playertemp.x>1200||terrain[i].x-playertemp.x<-1200||terrain[i].y-playertemp.y>1200||terrain[i].y-playertemp.y<-1200){
					defaultterrain(i,450);
				}
			}
	}
	//RUN OBJECTS==================================================================================
	//DRAW OBJECTS=================================================================================
	if(!(cinematic||dialoga)){
	for(n=1;n<objects.length;n+=1){
		if(objects[n].type=='projectile'){
				if(render){translate(objects[n].x-playertemp.x+400,objects[n].y-playertemp.y+350);
				rotate(objects[n].dir);
				if(!(inventory)&objects[n].x-playertemp.x<450&objects[n].x-playertemp.x>-450&
				objects[n].y-playertemp.y>-450&objects[n].y-playertemp.y<450){
					if(objects[n].vfx==1){
						objects[n].draw();
					}
					else{
						shape(objects[n].sprite,0,0,30,45);
						if(objects[n].specialdraw){
							objects[n].specialdraw();
						}
					}
				}}
			if(objects[n].allowpausedrun&!(objects[n].paused<=0||!(objects[n].paused))){
				if(objects[n].run){
					objects[n].run();
				}
			}
		}
		if(objects[n].paused<=0||!(objects[n].paused)){
			if(objects[n].type=='projectile'){
				if(objects[n].run){
					objects[n].run();
				}
				if(!(objects[n].cannothit)){
					if(objects[n].fast>0){
						anticlipc=objects[n].fast;
					}
					else{
						anticlipc=1;
					}
					for(antcc=0;antcc<anticlipc;antcc+=1){
					if(objects[n].target=='enemy'){
						for(i=0;i<enemies.length;i+=1){
							if(enemies[i].hp>0&objects[n].duration>0&!(objects[n].hits[i])&inboxrange(i,objects[n].size,playertemp.x-objects[n].x,playertemp.y-objects[n].y)){
								objects[n].hits[i]=1;
								objects[n].hitc+=1;
								objects[n].pierce-=1;
								if(objects[n].pierce<0){
									objects[n].duration=0;
								}
								damage("enemies",i,random(objects[n].pdmgmin,objects[n].pdmgmax),random(objects[n].mdmgmin,objects[n].mdmgmax),objects[n].armorE,objects[n].resE,"ranged","player",objects[n].procc);
								if(objects[n].stun){
									enemies[i].stun+=round(objects[n].stun*(100-enemies[i].tenacity)/100);
								}
								if(objects[n].sound){
								if(options.loadAudio){
								objects[n].sound.play();}
								}
							}
						}
					}
					if(objects[n].target=='player'){
							if(objects[n].x-playertemp.x>-(objects[n].size+player.size)&
							objects[n].x-playertemp.x<objects[n].size+player.size&
							objects[n].y-playertemp.y>-(objects[n].size+player.size)&
							objects[n].y-playertemp.y<objects[n].size+player.size){
								objects[n].duration=0;
								damage('player',0,random(objects[n].pdmgmin,objects[n].pdmgmax),random(objects[n].mdmgmin,objects[n].mdmgmax),objects[n].armorE,objects[n].resE,"ranged",objects[n].source,objects[n].procc);
								if(objects[n].oh){
									nmeonhit(objects[n].oh.effect,objects[n].oh.chance,objects[n].oh.power,objects[n].oh.duration);
								}
								if(objects[n].stun){
									player.stun+=objects[n].stun;
								}
							}
					}
				}
					objects[n].x+=sin(objects[n].dir)*objects[n].speed/anticlipc;
					objects[n].y-=cos(objects[n].dir)*objects[n].speed/anticlipc;
				}
			}
			if(objects[n].type=='AoE'&objects[n].duration<=1){
				if(objects[n].target=='enemy'){
					for(i=0;i<enemies.length;i+=1){
						if(enemies[i].hp>0&pow(enemies[i].x-objects[n].x,2)+pow(enemies[i].y-objects[n].y,2)<pow(objects[n].size+enemies[i].size,2)){
							damage("enemies",i,random(objects[n].pdmgmin,objects[n].pdmgmax),random(objects[n].mdmgmin,objects[n].mdmgmax),objects[n].armorE,objects[n].resE,objects[n].rangetype,"player",objects[n].procc);
							if(objects[n].stun){
								enemies[i].stun+=round(objects[n].stun*(100-enemies[i].tenacity)/100);
							}
							objects[n].hitc+=1;
							if(objects[n].sound){
							if(options.loadAudio){
							objects[n].sound.play();}
							}
						}
					}
				}
				if(objects[n].target=='player'){
						if(pow(playertemp.x-objects[n].x,2)+pow(playertemp.y-objects[n].y,2)<pow(objects[n].size+player.size,2)){
							damage('player',0,random(objects[n].pdmgmin,objects[n].pdmgmax),random(objects[n].mdmgmin,objects[n].mdmgmax),objects[n].armorE,objects[n].resE,objects[n].rangetype,objects[n].source,objects[n].procc);
							objects[n].hitc+=1;
							if(objects[n].stun){
								player.stun+=objects[n].stun;
							}
						}
				}
			}
			objects[n].duration-=1;
			if(objects[n].duration<=0){
			if(objects[n].endfunc){
				objects[n].endfunc();
			}
			objects.splice(n,1);
			n-=1;
		}
		}
		else{
			objects[n].paused-=1;
		}
			resetMatrix();
	}
	}
	ellipseMode(CENTER);
	//DRAW GATEWAYS=========================
	for(i=gateways.length-1;i>=0;i-=1){
		if(!(skip)){
			if(tick%60==0){
				if(player.level>biomedata[9]){
					if(gateways[i].x-playertemp.x>max(1000,biomedata[11]*0.75)||gateways[i].x-playertemp.x<-max(1000,biomedata[11]*0.75)||gateways[i].y-playertemp.y>max(1000,biomedata[11]*0.75)||gateways[i].y-playertemp.y<-max(1000,biomedata[11]*0.75)){
						placegateway(i,550);
					}
				}
				else{
					if(gateways[i].x-playertemp.x>biomedata[11]||gateways[i].x-playertemp.x<-biomedata[11]||gateways[i].y-playertemp.y>biomedata[11]||gateways[i].y-playertemp.y<-biomedata[11]){
						placegateway(i,700);
					}
				}
			}
			if(gateways[i].exists){
				if(gateways[i].x-playertemp.x<450&gateways[i].x-playertemp.x>-450&gateways[i].y-playertemp.y>-450&gateways[i].y-playertemp.y<450){
					if(render){translate(gateways[i].x-playertemp.x+400,gateways[i].y-playertemp.y+350);
					if(player.level-10>gateways[i].destlv){
						fill(80,20,255,160);
					}
					else if(player.level+10>gateways[i].destlv){
						fill(75,0,75);
					}
					else{
						fill(255,0,0,160);
					}
					ellipse(0,0,45,60);
					fill(200,255,255);
					textFont(0,16);
					textAlign(CENTER);
					text(gateways[i].destname,0,-26);}
					if(tick%4==0&player.level-10<gateways[i].destlv&player.level+10>gateways[i].destlv){
						append(particles,new createparticle(gateways[i].x+random(-20,20),gateways[i].y+random(-25,25),random(-2,2),random(-2,2),0,0,
						'circle','',random(5,7),random(-0.2,0.2),random(160,220),random(-4,-3),80,0,80,1));
					}
					//Enter GTW
					if(!(cinematic||dialoga)){
									if(keyPressed&keyCode==UP&gateways[i].x-playertemp.x>-(60)&
											gateways[i].x-playertemp.x<(60)&
											gateways[i].y-playertemp.y>-(60)&
											gateways[i].y-playertemp.y<(60)){
												player.biomeID=gateways[i].dest;
												playertemp.x=0;
												playertemp.y=0;
												loadArea();
												skip=1;
												if(options.autosave){
													temp= new Array(JSON.stringify(player),1);
													saveStrings("player "+player.name+".txt",temp);
													append(particles,new createparticle(300,150,0,0,0,0,'text','GAME SAVED',30,0,255,-3,150,255,0));
												}
											}
					}
					resetMatrix();
				}
						
				//textFont(15);
				//text('X: '+gateways[i].x+'  Y: '+gateways[i].y,gateways[i].x-playertemp.x+400,gateways[i].y-playertemp.y+350);
			}
		}
	}
	skip=0;
	//==============Grounded stat effects====
	for(n=0;n<stateffectsg.length;n+=1){
		stateffectsg[n].tick+=1;
		stateffectsg[n].run();
	}
	//===================PASSIVE EFFECTS===============================================================
	//===========AND STAT EFFECT==============================================
	if(!(cinematic||dialoga)){
	showdots[3]=0;
	showdots[4]=0;
	showdots[5]=0;
			if(player.hp<=0){
				if(player.traits[32]>0){
					if(playertemp.indestructible<=0){
						buff(2,player.traits[32]*60,100);
						player.hp=1;
						playertemp.indestructible=3600;
						playertemp.indestructiblea=player.traits[32]*60;
					}
					else{
						if(!(player.record.deaths)){
							player.record.deaths=0;
						}
						player.record.deaths+=1;
						if(options.loadAudio){
							bgm.stop();
						}
								if(options.loadAudio){
								sfx.death.play();}
						player.hp=0;
						cinematic=["death",0];
					}
				}
				else{
					if(options.loadAudio){
					bgm.stop();
					sfx.death.play();}
					player.hp=0;
					cinematic=["death",0];
				}
			}
			if(playertemp.shield.dur.length>0){
				for(i=0;i<playertemp.shield.dur.length;i+=1){
					playertemp.shield.dur[i]-=1;
					if(playertemp.shield.dur[i]<=0){
						removeshield(i);
						i-=1;
					}
				}
			}
			for(tfp=0;tfp<traitfuncs.passives.length;tfp+=1){
				traitfuncs.passives[tfp]();
			}
			for(tfp=0;tfp<keystonefuncs.passives.length;tfp+=1){
				keystonefuncs.passives[tfp]();
			}
			heal((plshr(1))/60,"regeneration");
			if(!(player.traits[75]>0)){
				if(player.traits[62]>0){
					stemp=3*(1+player.traits[62]/10);
				}
				else{
					stemp=3;
				}
				player.mp+=(plsmr(1))/60*(1+min(stemp,min(playertemp.timesincedamagetaken,playertemp.timesincemove,playertemp.timesinceaction)/120));
			}
			if(player.mp<=0){
				player.mp=0;
			}
			
			if(playertemp.buffs.length>0){
				for(i=0;i<playertemp.buffs.length;i+=1){
					playertemp.buffs[i].dur-=1;
					if(playertemp.buffs[i].dur<=0){
						removebuff(i);
						i-=1;
					}
				}
			}
			ellipseMode(CENTER);
			levelup();
			playertemp.timesincedamagetaken+=1;
			playertemp.timesincehittaken+=1;
			playertemp.timesincemove+=1;
			playertemp.timesinceaction+=1;
			playertemp.timesincedamagedealt+=1;
			playertemp.timesincekill+=1;
	}
	for(n=0;n<biomescripts.length;n+=1){
		biomescripts[n]();
	}
	
	if(player.hp>(plshp(1))&!(player.traits[24]>0)){
		player.hp=(plshp(1));
	}
	if(player.mp>(plsmp(1))){
		player.mp=(plsmp(1));
	}
	//DISPLAY======================================================
	if(render){
	fill(110,110,20);
	rect(801,0,332,700);
	textAlign(LEFT,TOP);
	if(!(playertemp.maxhp==1&playertemp.maxhpfb==0)){
		shape(sprites.hp,850,30,90,135);
		textFont(0,16);
		if(playertemp.maxhp<1){
			fill(255,0,0);
			text(round((playertemp.maxhp-1)*100)+"%",830,50);
		}
		else if(playertemp.maxhp>1){
			fill(0,255,0);
			text("+"+round((playertemp.maxhp-1)*100)+"%",830,50);
		}
		if(playertemp.maxhp<1.000001&playertemp.maxhp>0.999999){
			playertemp.maxhp=1;
		}
		textFont(0,13);
		if(playertemp.maxhpfb<0){
			fill(200,0,0);
			text(round(playertemp.maxhpfb),830,2);
		}
		else if(playertemp.maxhpfb>0){
			fill(0,175,0);
			text("+"+round(playertemp.maxhpfb),830,2);
		}
		if(playertemp.maxhpfb<0.000001&playertemp.maxhpfb>-0.000001){
			playertemp.maxhpfb=0;
		}
	}
	if(!(playertemp.hpregen==1&playertemp.hpregenfb==0)){
		shape(sprites.hpregen,850,105,90,135);
		textFont(0,16);
		if(playertemp.hpregen<1){
			fill(255,0,0);
			text(round((playertemp.hpregen-1)*100)+"%",830,125);
		}
		else if(playertemp.hpregen>1){
			fill(0,255,0);
			text("+"+round((playertemp.hpregen-1)*100)+"%",830,125);
		}
		if(playertemp.hpregen<1.000001&playertemp.hpregen>0.999999){
			playertemp.hpregen=1;
		}
		textFont(0,13);
		if(playertemp.hpregenfb<0){
			fill(200,0,0);
			text(round(playertemp.hpregenfb*10)/10,830,70);
		}
		else if(playertemp.hpregenfb>0){
			fill(0,175,0);
			text("+"+round(playertemp.hpregenfb*10)/10,830,70);
		}
		if(playertemp.hpregenfb<0.000001&playertemp.hpregenfb>-0.000001){
			playertemp.hpregenfb=0;
		}
	}
	if(!(playertemp.maxmp==1&playertemp.maxmpfb==0)){
		shape(sprites.mp,920,30,90,135);
		textFont(0,16);
		if(playertemp.maxmp<1){
			fill(255,0,0);
			text(round((playertemp.maxmp-1)*100)+"%",900,50);
		}
		else if(playertemp.maxmp>1){
			fill(0,255,0);
			text("+"+round((playertemp.maxmp-1)*100)+"%",900,50);
		}
		if(playertemp.maxmp<1.000001&playertemp.maxmp>0.999999){
			playertemp.maxmp=1;
		}
		textFont(0,13);
		if(playertemp.maxmpfb<0){
			fill(200,0,0);
			text(round(playertemp.maxmpfb),900,2);
		}
		else if(playertemp.maxmpfb>0){
			fill(0,175,0);
			text("+"+round(playertemp.maxmpfb),900,2);
		}
		if(playertemp.maxmpfb<0.000001&playertemp.maxmpfb>-0.000001){
			playertemp.maxmpfb=0;
		}
	}
	if(!(playertemp.mpregen==1&playertemp.mpregenfb==0)){
		shape(sprites.mpregen,920,105,90,135);
		textFont(0,16);
		if(playertemp.mpregen<1){
			fill(255,0,0);
			text(round((playertemp.mpregen-1)*100)+"%",900,125);
		}
		else if(playertemp.mpregen>1){
			fill(0,255,0);
			text("+"+round((playertemp.mpregen-1)*100)+"%",900,125);
		}
		if(playertemp.mpregen<1.000001&playertemp.mpregen>0.999999){
			playertemp.mpregen=1;
		}
		textFont(0,13);
		if(playertemp.mpregenfb<0){
			fill(200,0,0);
			text(round(playertemp.mpregenfb*10)/10,900,70);
		}
		else if(playertemp.mpregenfb>0){
			fill(0,175,0);
			text("+"+round(playertemp.mpregenfb*10)/10,900,70);
		}
		if(playertemp.mpregenfb<0.000001&playertemp.mpregenfb>-0.000001){
			playertemp.mpregenfb=0;
		}
	}
	if(!(playertemp.str==1&playertemp.strfb==0)){
		shape(sprites.str,1000,30,90,135);
		textFont(0,16);
		if(playertemp.str<1){
			fill(255,0,0);
			text(round((playertemp.str-1)*100)+"%",980,50);
		}
		else if(playertemp.str>1){
			fill(0,255,0);
			text("+"+round((playertemp.str-1)*100)+"%",980,50);
		}
		if(playertemp.str<1.000001&playertemp.str>0.999999){
			playertemp.str=1;
		}
		textFont(0,13);
		if(playertemp.strfb<0){
			fill(200,0,0);
			text(round(playertemp.strfb),980,2);
		}
		else if(playertemp.strfb>0){
			fill(0,175,0);
			text("+"+round(playertemp.strfb),980,2);
		}
		if(playertemp.strfb<0.000001&playertemp.strfb>-0.000001){
			playertemp.strfb=0;
		}
	}
	if(!(playertemp.intel==1&playertemp.intelfb==0)){
		shape(sprites.intel,1000,105,90,135);
		textFont(0,16);
		if(playertemp.intel<1){
			fill(255,0,0);
			text(round((playertemp.intel-1)*100)+"%",980,125);
		}
		else if(playertemp.intel>1){
			fill(0,255,0);
			text("+"+round((playertemp.intel-1)*100)+"%",980,125);
		}
		if(playertemp.intel<1.000001&playertemp.intel>0.999999){
			playertemp.intel=1;
		}
		textFont(0,13);
		if(playertemp.intelfb<0){
			fill(200,0,0);
			text(round(playertemp.intelfb),980,70);
		}
		else if(playertemp.intelfb>0){
			fill(0,175,0);
			text("+"+round(playertemp.intelfb),980,70);
		}
		if(playertemp.intelfb<0.000001&playertemp.intelfb>-0.000001){
			playertemp.intelfb=0;
		}
	}
	if(!(playertemp.armor==1&playertemp.armorfb==0)){
		shape(sprites.armor,1100,30,90,135);
		textFont(0,16);
		if(playertemp.armor<1){
			fill(255,0,0);
			text(round((playertemp.armor-1)*100)+"%",1080,50);
		}
		else if(playertemp.armor>1){
			fill(0,255,0);
			text("+"+round((playertemp.armor-1)*100)+"%",1080,50);
		}
		if(playertemp.armor<1.000001&playertemp.armor>0.999999){
			playertemp.armor=1;
		}
		textFont(0,13);
		if(playertemp.armorfb<0){
			fill(200,0,0);
			text(round(playertemp.armorfb),1080,2);
		}
		else if(playertemp.armorfb>0){
			fill(0,175,0);
			text("+"+round(playertemp.armorfb),1080,2);
		}
		if(playertemp.armorfb<0.000001&playertemp.armorfb>-0.000001){
			playertemp.armorfb=0;
		}
	}
	if(!(playertemp.res==1&playertemp.resfb==0)){
		shape(sprites.res,1100,105,90,135);
		textFont(0,16);
		if(playertemp.res<1){
			fill(255,0,0);
			text(round((playertemp.res-1)*100)+"%",1080,125);
		}
		else if(playertemp.res>1){
			fill(0,255,0);
			text("+"+round((playertemp.res-1)*100)+"%",1080,125);
		}
		if(playertemp.res<1.000001&playertemp.res>0.999999){
			playertemp.res=1;
		}
		textFont(0,13);
		if(playertemp.resfb<0){
			fill(200,0,0);
			text(round(playertemp.resfb),1080,70);
		}
		else if(playertemp.resfb>0){
			fill(0,175,0);
			text("+"+round(playertemp.resfb),1080,70);
		}
		if(playertemp.resfb<0.000001&playertemp.resfb>-0.000001){
			playertemp.resfb=0;
		}
	}
	textFont(0,21);
	fill(150,255,200);
	text(player.name,825,140);
	textFont(0,21);
	fill(0,150,255);
	text('Level: '+player.level,825,175);
	textFont(0,19);
	fill(100,0,0);
	text('Health: '+round(player.hp)+' / '+round((plshp(1))),825,220);
	fill(0,0,100);
	text('Mana: '+round(player.mp)+' / '+round((plsmp(1))),825,310);
	textFont(0,15);
	fill(0,100,0);
	text('XP: '+player.xp+' / '+player.xpr,825,390);
	fill(0,0,0);
	rect(825,245,300,30);
	fill(255-(min(1,player.hp/((plshp(1)))))*100,0,0);
	rect(825,245,(min(1,player.hp/((plshp(1)))))*300,30);
	if(player.hp>(plshp(1))){
		fill(0,180,0);
		rect(825,245,(min(1,(player.hp-(plshp(1)))/max(player.level*10+90,(plshp(1)))))*300,30);
	}
	if(playertemp.shield.hp.reduce(add,0)>0){
		fill(100,100,200,125);
		stroke(100,100,255);
		strokeWeight(5);
		if(playertemp.shield.hp.reduce(add,0)>max(player.level*10+90,(plshp(1)))){
			rect(825,245,300,30);
			fill(140,140,255);
			noStroke();
			if(playertemp.shield.hp.reduce(add,0)>max(player.level*10+90,(plshp(1)))*11){
				rect(827.5,247.5,295,30);
			}
			else{
				rect(827.5,247.5,playertemp.shield.hp.reduce(add,0)/max(player.level*10+90,(plshp(1)))*29.5-29.5,25);
			}
		}
		else{
			rect(825,245,playertemp.shield.hp.reduce(add,0)/max(player.level*10+90,(plshp(1)))*300,30);
		}
		noStroke();
		fill(255,255,255);
		text(round(playertemp.shield.hp.reduce(add,0)),835,252);
	}
	if(losthp>5){
		noFill();
		strokeWeight(8+min(22,losthp/2));
		stroke(255,0,0,50+losthp*2);
		rect(834-(8+min(22,losthp/2)),254-(8+min(22,losthp/2)),282+(8+min(22,losthp/2))*2,12+(8+min(22,losthp/2))*2);
		noStroke();
	}
	losthp=max(0,losthp-losthp/30-0.15);
	if(playertemp.inBossFight){
		if(bosshpbar){
			fill(0,0,0);
			rect(200,20,400,40,15);
			fill(255,0,0);
			rect(200,20,max(0,400*bosshpbar.val),40,15);
			fill(0,255,255);
			textFont(0,20);
			text(bosshpbar.name,215,25);
		}
	}
	}
	//STATEFFECTS===================================================
	if(!(cinematic||dialoga)){
	for(n=1;n<stateffects.length;n+=1){
		stateffects[n].tick+=1;
		stateffects[n].run();
	}
	for(n=1;n<dots.length;n+=1){
		dots[n].dur-=1;
		dots[n].run();
	}
	}
	if(showdots[0]){
		append(particles,new createparticle(random(825,825+(min(1,player.hp/((plshp(1)))))*300),275,random(-0.5,2),random(-1.4,0.3),random(-0.01,0.01),random(-0.02,-0.01),
		'circle','',random(5,14)+random(5,14),random(-0.2,0.2),random(200,255),random(-3,-2),random(180,255),random(130,180),0));
	}
	else{
		if(options.loadAudio){
			sfx.burn.stop();
		}
	}
	
	if(showdots[1]){
		append(particles,new createparticle(random(825,825+(min(1,player.hp/((plshp(1)))))*300),275,0,0,0,0.1,
		'circle','',random(4,7)+random(4,7),0,random(200,255),random(-4,-3),255,0,0));
	}
	else{
		if(options.loadAudio){
			sfx.bleed.stop();
		}
	}
	if(showdots[2]){
		append(particles,new createparticle(825+(min(1,player.hp/((plshp(1)))))*300,random(245,275),random(0.2,2),random(-0.5,1.2),random(0,0.015),random(-0.02,-0.02),
		'circle','',random(5,14)+random(5,14),random(-0.2,0.2),random(200,255),random(-6,-5),random(120,180),0,random(120,180)));
	}
	else{
		if(options.loadAudio){
			sfx.poisoned.stop();
		}
	}
	
	if(render){
	fill(0,0,0);
	rect(825,335,300,30);
	fill(0,0,155+player.mp/((plsmp(1)))*100);
	rect(825,335,player.mp/((plsmp(1)))*300,30);
	fill(0,0,0);
	rect(825,410,300,15);
	fill(0,80,0);
	rect(825,410,player.xp/player.xpr*300,15);
	fill(0,0,0);
	textFont(0,15);
	text(biomedata[0],900,675);
	if(player.activetraits.space>0&player.traits[player.activetraits.space]>0){
		ellipseMode(CENTER);
		fill(255,255,0);
		ellipse(950,500,90,90);
		shape(playertemp.activetraitsprites.space,950,507,210,315);
		fill(0,0,255);
		textFont(0,15);
		text("SPACE",925,462);
		if(traitcd[player.activetraits.space]>=30){
			fill(0,0,0,130+playertemp.traitcd.space/traitcd[player.activetraits.space]*125);
			ellipseMode(CENTER);
			arc(950,500,90,90,-PI/2-playertemp.traitcd.space/traitcd[player.activetraits.space]*2*PI,-PI/2);
		}
	}
	if(player.activetraits.shift>0&player.traits[player.activetraits.shift]>0){
		ellipseMode(CENTER);
		fill(255,255,0);
		ellipse(950,600,90,90);
		shape(playertemp.activetraitsprites.shift,950,607,210,315);
		fill(0,0,255);
		textFont(0,15);
		text("SHIFT",925,562);
		if(traitcd[player.activetraits.shift]>=30){
			fill(0,0,0,130+playertemp.traitcd.shift/traitcd[player.activetraits.shift]*125);
			ellipseMode(CENTER);
			arc(950,600,90,90,-PI/2-playertemp.traitcd.shift/traitcd[player.activetraits.shift]*2*PI,-PI/2);
		}
	}
	if(player.activetraits.q>0&player.traits[player.activetraits.q]>0){
		ellipseMode(CENTER);
		fill(255,255,0);
		ellipse(1075,500,90,90);
		shape(playertemp.activetraitsprites.q,1075,507,210,315);
		fill(0,0,255);
		textFont(0,30);
		text("Q",1062,455);
		if(traitcd[player.activetraits.q]>=30){
			fill(0,0,0,130+playertemp.traitcd.q/traitcd[player.activetraits.q]*125);
			ellipseMode(CENTER);
			arc(1075,500,90,90,-PI/2-playertemp.traitcd.q/traitcd[player.activetraits.q]*2*PI,-PI/2);
		}
	}
	if(player.activetraits.e>0&player.traits[player.activetraits.e]>0){
		ellipseMode(CENTER);
		fill(255,255,0);
		ellipse(1075,600,90,90);
		shape(playertemp.activetraitsprites.e,1075,607,210,315);
		fill(0,0,255);
		textFont(0,30);
		text("E",1062,555);
		if(traitcd[player.activetraits.e]>=30){
			fill(0,0,0,130+playertemp.traitcd.e/traitcd[player.activetraits.e]*125);
			ellipseMode(CENTER);
			arc(1075,600,90,90,-PI/2-playertemp.traitcd.e/traitcd[player.activetraits.e]*2*PI,-PI/2);
		}
	}
	textFont(0,15);
	fill(255,100,150);
	text('FPS: '+fps.fps,825,675);
	for(tfo=0;tfo<traitfuncs.overlay.length;tfo+=1){
		traitfuncs.overlay[tfo]();
	}
	for(tfo=0;tfo<keystonefuncs.overlay.length;tfo+=1){
		keystonefuncs.overlay[tfo]();
	}
	if(!(cinematic==0)){
		if(cinematic[0]=="death"){
			cinematic[1]+=1;
			if(cinematic[1]<150){if(render){
			fill(0,0,0,cinematic[1]*2);
			rect(0,0,1133,700);}
			}
			else{
				if(cinematic[1]==150){
					playertemp.inBossFight=0;
					player.hp=(plshp(1));
					player.mp=(plsmp(1));
					player.xp-=round(player.xpr/5);
					dots=new Array();
					if(player.xp<0){
						player.xp=0
					}
					player.biomeID=1;
					playertemp.x=0;
					playertemp.y=0;
					playertemp.xvelo=0;
					playertemp.yvelo=0;
					loadArea();
					temp= new Array(JSON.stringify(player),1);
					saveStrings("player "+player.name+".txt",temp);
				}if(render){
				fill(0,0,0,255-(cinematic[1]-150)*3);
				rect(0,0,1133,700);}
				if(cinematic[1]==220){
					cinematic=0;
				}
			}
			
		}
	}
	}}
	//INVENTORY/GUIS================================================
	else{
	if(inventory==1){
		if(!(mousePressed)){
			mouselock=0;
		}
			fill(120,120,120);
			rect(0,0,1133,700);
			//Normal inventory=========
			if(inventype==1){
			fill(100,200,200);
			textFont(0,26);
			text('SP: '+player.sp,1000,650);
			fill(200,170,50);
			textFont(0,17);
			text('Reactant: '+player.reactant,1000,620);
			fill(200,200,100);
			textFont(0,30);
			text('Inventory',725,50);
			statpanel();
			textAlign(CENTER,CENTER);
			if(player.autoanvil){
				fill(110,255,160);
			}
			else{
				fill(110,110,160);
			}
			rect(375,150,100,85,5);
			textFont(0,17);
			fill(0,0,0);
			text('Upgrade items',381,143,90,75);
			if(player.autoanvil){
				textFont(0,14);
				fill(0,50,0);
				text('Auto Enabled',378,175,90,75);
			}
			textAlign(CENTER,CENTER);
			fill(150,0,150);
			rect(400,45,200,80,10);
			fill(150,255,150);
			textFont(0,40);
			text('Traits',400,35,200,80);
			if(playertemp.timesincedamagetaken>=180){
				fill(150+abs(tick%180-90)/3,150+abs(tick%180-90)/3,255);
			}
			else{
				fill(255,150,150);
			}
			if(!(player.biomeID==1||playertemp.inBossFight)){
			rect(400,605,200,80,10);
			fill(150,255,150);
			textFont(0,40);
			text('Nexus',400,595,200,80);
			if(player.record.atlas[player.biomeID]==2){
				if(player.record.biocomp[player.biomeID]){
					fill(0,0,255);
				}
				else{
					fill(100,255,100);
				}
			}
			else{
				fill(255,0,0);
			}
			ellipse(620,625,40,40);
			if(cursorbox(620,660,630,670)){
				tooltipdraw={
					type:0,
					x:mouseX,
					y:mouseY-50,
					w:150,
					h:100,
					title:"Notice",
					tip:"",
					colors:0
				};
					if(player.record.atlas[player.biomeID]==2){
						if(player.record.biocomp[player.biomeID]){
							tooltipdraw.tip="This area has been completed.";
						}
						else{
							tooltipdraw.tip="This area has been unlocked in the Atlas.";
						}
					}
					else{
						tooltipdraw.title="WARNING";
						tooltipdraw.tip="This area has not been unlocked yet.";
						tooltipdraw.colors=[[255,0,0],0];
					}
				}
			}
			if(!(cursorbox(780,1200,0,215))){
				invquicksell=0;
			}
			if(invquicksell){
				textAlign(CENTER,CENTER);
				fill(255,0,0);
				rect(1000,75,100,40,3);
				textFont(0,18);
				fill(0,0,0);
				text('SELL ALL',1003,65,90,50);
				if(cursorbox(1000,1100,75,115)){
					tooltipdraw={
						type:0,
						x:mouseX,
						y:mouseY-100,
						w:200,
						h:200,
						title:"SELL ALL",
						tip:"Sell all unlocked items in your bag. Excludes those with a rune.",
						colors:0
					};
					if(!(mouselock)&mousePressed){
						mouselock=1;
						if(mouseButton==LEFT){
							if(options.loadAudio){sfx.click.play();}
							for(i=0;i<player.inventory.bag.length;i+=1){
								if(player.inventory.bag[i]){
									if(!(player.inventory.bag[i].lock||player.inventory.bag[i].rune)){
										if(player.inventory.bag[i]){
											player.sp+=itemdata[player.inventory.bag[i].id*10+9];
										}
										player.inventory.bag[i]=0;
									}
								}
							}
						}
					}
				}
				textAlign(CENTER,CENTER);
				fill(200,100,100);
				rect(880,75,100,40,3);
				textFont(0,18);
				fill(0,0,0);
				text('SELL NON-ORBS',883,65,90,50);
				if(cursorbox(880,980,75,115)){
					tooltipdraw={
						type:0,
						x:mouseX,
						y:mouseY-100,
						w:200,
						h:200,
						title:"SELL NON-ORBS",
						tip:"Sell all unlocked items that aren't orbs in your bag. Excludes those with a rune.",
						colors:0
					};
					if(!(mouselock)&mousePressed){
						mouselock=1;
						if(mouseButton==LEFT){
							if(options.loadAudio){sfx.click.play();}
							for(i=0;i<player.inventory.bag.length;i+=1){
								if(player.inventory.bag[i]){
									if(!(player.inventory.bag[i].id==44||player.inventory.bag[i].lock||player.inventory.bag[i].rune)){
										if(player.inventory.bag[i]){
											player.sp+=itemdata[player.inventory.bag[i].id*10+9];
										}
										player.inventory.bag[i]=0;
									}
								}
							}
						}
					}
				}
			}
			else{
				textAlign(CENTER,CENTER);
				fill(200,100,150);
				rect(880,75,220,40,3);
				textFont(0,18);
				fill(0,0,0);
				text('Quick Sell',938,65,90,50);
				if(cursorbox(880,1100,75,115)){
					tooltipdraw={
						type:0,
						x:mouseX,
						y:mouseY-100,
						w:200,
						h:200,
						title:"Quick Sell",
						tip:"Open quick-sell options",
						colors:0
					};
					if(!(mouselock)&mousePressed){
						mouselock=1;
						if(mouseButton==LEFT){
							if(options.loadAudio){sfx.click.play();}
							invquicksell=1;
						}
					}
				}
			}
		rectMode(CORNER);
		fill(20,20,40);
		rect(500,175,50,50,2);
		rect(500,250,50,50,2);
		rect(500,325,50,50,2);
		rect(500,400,50,50,2);
		rect(425,250,50,50,2);
		rect(575,250,50,50,2);
		rect(575,325,50,50,2);
		if(player.inventory.LH){
		if(player.inventory.LH.rune){
			if(player.inventory.LH.runet==1){
				fill(20,20,180);
			}
			if(player.inventory.LH.runet==2){
				fill(140,20,140);
			}
			if(player.inventory.LH.runet==3){
				fill(150,150,0);
			}
			rect(425,250,50,50,2);
		}}
		if(player.inventory.RH){
		if(player.inventory.RH.rune){
			if(player.inventory.RH.runet==1){
				fill(20,20,180);
			}
			if(player.inventory.RH.runet==2){
				fill(140,20,140);
			}
			if(player.inventory.RH.runet==3){
				fill(150,150,0);
			}
			rect(575,250,50,50,2);
		}}
		if(player.inventory.helmet){
		if(player.inventory.helmet.rune){
			if(player.inventory.helmet.runet==1){
				fill(20,20,180);
			}
			if(player.inventory.helmet.runet==2){
				fill(140,20,140);
			}
			if(player.inventory.helmet.runet==3){
				fill(150,150,0);
			}
			rect(500,175,50,50,2);
		}}
		if(player.inventory.chest){
		if(player.inventory.chest.rune){
			if(player.inventory.chest.runet==1){
				fill(20,20,180);
			}
			if(player.inventory.chest.runet==2){
				fill(140,20,140);
			}
			if(player.inventory.chest.runet==3){
				fill(150,150,0);
			}
			rect(500,250,50,50,2);
		}}
		if(player.inventory.pants){
		if(player.inventory.pants.rune){
			if(player.inventory.pants.runet==1){
				fill(20,20,180);
			}
			if(player.inventory.pants.runet==2){
				fill(140,20,140);
			}
			if(player.inventory.pants.runet==3){
				fill(150,150,0);
			}
			rect(500,325,50,50,2);
		}}
		if(player.inventory.shoes){
		if(player.inventory.shoes.rune){
			if(player.inventory.shoes.runet==1){
				fill(20,20,180);
			}
			if(player.inventory.shoes.runet==2){
				fill(140,20,140);
			}
			if(player.inventory.shoes.runet==3){
				fill(150,150,0);
			}
			rect(500,400,50,50,2);
		}}
		if(player.inventory.gloves){
		if(player.inventory.gloves.rune){
			if(player.inventory.gloves.runet==1){
				fill(20,20,180);
			}
			if(player.inventory.gloves.runet==2){
				fill(140,20,140);
			}
			if(player.inventory.gloves.runet==3){
				fill(150,150,0);
			}
			rect(575,325,50,50,2);
		}}
		renderinventory();
		for(x=0;x<15;x+=1){
			for(n=0;n<15;n+=1){
				if(cursorbox(650+30*n,675+30*n,125+30*x,150+30*x)){
					if(player.inventory.bag[15*x+n]){
						equiptooltip('bag',15*x+n);
					}
					if(!(mouselock)&mousePressed){
						mouselock=1;
						if(mouseButton==LEFT){
							if(invselect[0]=='anvil'){
								if(player.inventory.bag[15*x+n]){
									if(!(player.inventory.bag[15*x+n].id==44)){
										if(keyPressed&keyCode==16){
											if(player.level-player.inventory.bag[15*x+n].level>0){
												if(player.sp>=(player.level-player.inventory.bag[15*x+n].level)*5){
													if(options.loadAudio){
														sfx.upgrade.play();
													}
													player.sp-=(player.level-player.inventory.bag[15*x+n].level)*5;
													player.inventory.bag[15*x+n].level=player.level;
												}
												else{
													if(options.loadAudio){
														sfx.upgrade.play();
													}
													stemp=floor(player.sp/5);
													player.sp-=floor(player.sp/5)*5;
													player.inventory.bag[15*x+n].level+=floor(stemp);
												}
											}
										}
										else{
											if(player.sp>=5&player.inventory.bag[15*x+n].level<player.level){
												if(options.loadAudio){
													sfx.upgrade.play();
												}
												player.sp-=5;
												player.inventory.bag[15*x+n].level+=1;
											}
										}
									}
								}
							}
							else{
								if(options.loadAudio){sfx.click2.play();}
								if(invselect[1]<0){
									invselect[0]='bag';
									invselect[1]=15*x+n;
								}
								else if(invselect[1]==15*x+n){
									invselect[0]=0;
									invselect[1]=-1;
								}
								else{
									swapitems(invselect[0],invselect[1],'bag',15*x+n);
									invselect[1]=-1;
								}
							}
						}
						else{
							if(player.inventory.bag[15*x+n]){
								if(player.inventory.bag[15*x+n].level<=player.level){
									if(options.loadAudio){sfx.click3.play();}
									if(itemdata[player.inventory.bag[15*x+n].id*10+1]=='weapon'){
										if(!(player.inventory.LH)){
											swapitems('bag',15*x+n,'LH','');
										}
										else if(!(player.inventory.RH)){
											swapitems('bag',15*x+n,'RH','');
										}
										else{
											swapitems('bag',15*x+n,'LH','');
										}
									}
									if(itemdata[player.inventory.bag[15*x+n].id*10+1]=='chest'){
										swapitems('bag',15*x+n,'chest','');
									}
									if(itemdata[player.inventory.bag[15*x+n].id*10+1]=='helmet'){
										swapitems('bag',15*x+n,'helmet','');
									}
									if(itemdata[player.inventory.bag[15*x+n].id*10+1]=='pants'){
										swapitems('bag',15*x+n,'pants','');
									}
									if(itemdata[player.inventory.bag[15*x+n].id*10+1]=='gloves'){
										swapitems('bag',15*x+n,'gloves','');
									}
									if(itemdata[player.inventory.bag[15*x+n].id*10+1]=='shoes'){
										swapitems('bag',15*x+n,'shoes','');
									}
									loadtraits();
									recalstats();
									getplayersprite();
								}
								else{
									append(particles,new createparticle(mouseX,mouseY-30,0,0,0,0,'text','Your level is too low to equip this!',20,0,255,-3,255,0,0));
								}
							}
							invselect=['',-1];
						}
					}
				}
			}
		}
		
		if(player.inventory.LH){
			shape(inventorysprites[itemdata[player.inventory.LH.id*10+4]],450,275,75,110);
			if(cursorbox(425,475,250,300)){
				equiptooltip('LH');
				if(!(mouselock)&mousePressed&mouseButton==LEFT){
						mouselock=1;
					if(invselect[0]=='anvil'){
						if(player.sp>=5&player.inventory.LH.level<player.level){
						if(options.loadAudio){
						sfx.upgrade.play();}
							player.sp-=5;
							player.inventory.LH.level+=1;
									recalstats();
						}
					}
					else{
						if(options.loadAudio){sfx.click3.play();}
						swapitems('LH','','RH','');
					}
				}
				if(!(mouselock)&mousePressed&mouseButton==RIGHT){
					mouselock=1;
					if(findemptyslot()>-1){
						if(options.loadAudio){sfx.click3.play();}
						swapitems('LH','','bag',findemptyslot());
						loadtraits();
						recalstats();
						getplayersprite();
					}
				}
			}
		}
		if(player.inventory.RH){
			shape(inventorysprites[itemdata[player.inventory.RH.id*10+4]],600,275,75,110);
			if(cursorbox(575,625,250,300)){
				equiptooltip('RH');
				if(!(mouselock)&mousePressed&mouseButton==LEFT){
						mouselock=1;
					if(invselect[0]=='anvil'){
						if(player.sp>=5&player.inventory.RH.level<player.level){
						if(options.loadAudio){
						sfx.upgrade.play();}
							player.sp-=5;
							player.inventory.RH.level+=1;
							recalstats();
						}
					}
					else{
						if(options.loadAudio){sfx.click3.play();}
						swapitems('RH','','LH','');
					}
				}
				if(!(mouselock)&mousePressed&mouseButton==RIGHT){
					mouselock=1;
					if(findemptyslot()>-1){
						if(options.loadAudio){sfx.click3.play();}
					swapitems('RH','','bag',findemptyslot());
						loadtraits();
						recalstats();
						getplayersprite();
					}
				}
			}
		}
		if(player.inventory.helmet){
			shape(inventorysprites[itemdata[player.inventory.helmet.id*10+4]],525,200,75,110);
			if(cursorbox(500,550,175,225)){
				equiptooltip('helmet');
				if(!(mouselock)&mousePressed&mouseButton==LEFT){
					mouselock=1;
					if(invselect[0]=='anvil'){
						if(player.sp>=5&player.inventory.helmet.level<player.level){
							if(options.loadAudio){
								sfx.upgrade.play();
							}
							player.sp-=5;
							player.inventory.helmet.level+=1;
							recalstats();
						}
					}
				}
				if(!(mouselock)&mousePressed&mouseButton==RIGHT){
					mouselock=1;
					if(findemptyslot()>-1){
						if(options.loadAudio){sfx.click3.play();}
						swapitems('helmet','','bag',findemptyslot());
						loadtraits();
						recalstats();
						getplayersprite();
					}
				}
			}
		}
		if(player.inventory.chest){
			shape(inventorysprites[itemdata[player.inventory.chest.id*10+4]],525,275,75,110);
			if(cursorbox(500,550,250,300)){
				equiptooltip('chest');
				if(!(mouselock)&mousePressed&mouseButton==LEFT){
					mouselock=1;
					if(invselect[0]=='anvil'){
						if(player.sp>=5&player.inventory.chest.level<player.level){
							if(options.loadAudio){
								sfx.upgrade.play();
							}
							player.sp-=5;
							player.inventory.chest.level+=1;
							recalstats();
						}
					}
				}
				if(!(mouselock)&mousePressed&mouseButton==RIGHT){
					mouselock=1;
					if(findemptyslot()>-1){
						if(options.loadAudio){sfx.click3.play();}
						swapitems('chest','','bag',findemptyslot());
						loadtraits();
						recalstats();
						getplayersprite();
					}
				}
			}
		}
		if(player.inventory.pants){
			shape(inventorysprites[itemdata[player.inventory.pants.id*10+4]],525,350,75,110);
			if(cursorbox(500,550,325,375)){
				equiptooltip('pants');
				if(!(mouselock)&mousePressed&mouseButton==LEFT){
					mouselock=1;
					if(invselect[0]=='anvil'){
						if(player.sp>=5&player.inventory.pants.level<player.level){
							if(options.loadAudio){
								sfx.upgrade.play();
							}
							player.sp-=5;
							player.inventory.pants.level+=1;
							recalstats();
						}
					}
				}
				if(!(mouselock)&mousePressed&mouseButton==RIGHT){
					mouselock=1;
					if(findemptyslot()>-1){
						if(options.loadAudio){sfx.click3.play();}
						swapitems('pants','','bag',findemptyslot());
						loadtraits();
						recalstats();
						getplayersprite();
					}
				}
			}
		}
		if(player.inventory.shoes){
			shape(inventorysprites[itemdata[player.inventory.shoes.id*10+4]],525,425,75,110);
			if(cursorbox(500,550,400,450)){
				equiptooltip('shoes');
				if(!(mouselock)&mousePressed&mouseButton==LEFT){
					mouselock=1;
					if(invselect[0]=='anvil'){
						if(player.sp>=5&player.inventory.shoes.level<player.level){
							if(options.loadAudio){
								sfx.upgrade.play();
							}
							player.sp-=5;
							player.inventory.shoes.level+=1;
							recalstats();
						}
					}
				}
				if(!(mouselock)&mousePressed&mouseButton==RIGHT){
					mouselock=1;
					if(findemptyslot()>-1){
						if(options.loadAudio){sfx.click3.play();}
						swapitems('shoes','','bag',findemptyslot());
						loadtraits();
						recalstats();
						getplayersprite();
					}
				}
			}
		}
		if(player.inventory.gloves){
			shape(inventorysprites[itemdata[player.inventory.gloves.id*10+4]],600,350,75,110);
			if(cursorbox(575,625,325,375)){
				equiptooltip('gloves');
				if(!(mouselock)&mousePressed&mouseButton==LEFT){
					mouselock=1;
					if(invselect[0]=='anvil'){
						if(player.sp>=5&player.inventory.gloves.level<player.level){
							if(options.loadAudio){
								sfx.upgrade.play();
							}
							player.sp-=5;
							player.inventory.gloves.level+=1;
							recalstats();
						}
					}
				}
				if(!(mouselock)&mousePressed&mouseButton==RIGHT){
					mouselock=1;
					if(findemptyslot()>-1){
						if(options.loadAudio){sfx.click3.play();}
						swapitems('gloves','','bag',findemptyslot());
						loadtraits();
						recalstats();
						getplayersprite();
					}
				}
			}
		}
		if(cursorbox(375,475,150,235)){
			tooltipdraw={
				type:0,
				x:mouseX,
				y:mouseY-100,
				w:250,
				h:250,
				title:"Upgrade items",
				tip:"Right click to toggle automatic anvil (will upgrade equipped items once every time you level). Left click to use the anvil. Click items with the anvil to upgrade them. Hold shift while clicking an unequipped item to upgrade it to your level. Upgrading costs 5 SP per level.",
				colors:0
			};
			if(!(mouselock)&mousePressed){
				mouselock=1;
				if(mouseButton==LEFT){
					if(options.loadAudio){sfx.click.play();}
					if(invselect[0]=='anvil'){
						invselect=['',-1];
					}
					else{
						invselect=['anvil',-1];
					}
				}
				if(mouseButton==RIGHT){
					if(options.loadAudio){sfx.click.play();}
					if(player.autoanvil){
						player.autoanvil=0;
					}
					else{
						player.autoanvil=1;
					}
				}
			}
		}	
		if(!(mouselock)&mousePressed&cursorbox(400,600,45,125)){
			mouselock=1;
			if(mouseButton==LEFT){
				if(options.loadAudio){sfx.click.play();}
				invselect=['',-1];
				tooltipcache[0]=-1;
				inventory=2;
				helpscreen={active:0,help:0};
				inventorysprites={};
				gettraits();
			}
		}
		if(!(player.biomeID==1||playertemp.inBossFight)&!(mouselock)&mousePressed&cursorbox(400,600,605,685)){
			mouselock=1;
			if(mouseButton==LEFT){
				if(playertemp.timesincedamagetaken>=180){
					player.biomeID=1;
					playertemp.x=0;
					playertemp.y=0;
					loadArea();
					inventory=0;
				helpscreen={active:0,help:0};
					if(options.loadAudio){
					sfx.warp.play();
					}
					if(player.hp<(plshp(1))){
						player.hp=(plshp(1));
					}
					if(player.mp<(plsmp(1))){
						player.mp=(plsmp(1));
					}
					for(n=0;n<25;n+=1){
						append(particles,new createparticle(random(385,415),random(335,365),random(-1,1),random(-1,1),0,0,'circle','',10,-0.2,255,-4,random(120,255),150,255));
					}
				}
				else{
					append(particles,new createparticle(mouseX-150,mouseY-50,0,0,0,0,'text','Cannot be used in combat!',20,0,255,-3,255,0,0));
				}
			}
		}
		}
			//Enchanter=============
			else if(inventype==2){
			fill(150,130,150);
			rect(0,0,350,700);
			fill(100,200,200);
			textFont(0,26);
			text('SP: '+player.sp,1000,650);
			fill(200,170,50);
			textFont(0,17);
			text('Reactant: '+player.reactant,1000,620);
			fill(150,80,150);
			textFont(0,35);
			text('Enchanter',500,20);
			fill(100,0,130);
			rect(65,55,180,180,8);
				if(invselect[1]>=0){
				if(player.inventory.bag[invselect[1]]){
					if(player.inventory.bag[invselect[1]].id==44){
						ellipseMode(CENTER);
						if(player.inventory.bag[invselect[1]].suffix&player.inventory.bag[invselect[1]].prefix){
							fill(suffixdata[player.inventory.bag[invselect[1]].suffix*5-4][2][0],suffixdata[player.inventory.bag[invselect[1]].suffix*5-4][2][1],suffixdata[player.inventory.bag[invselect[1]].suffix*5-4][2][2]);
							ellipse(150,150,140,140);
							fill(prefixdata[player.inventory.bag[invselect[1]].prefix*5-4][2][0],prefixdata[player.inventory.bag[invselect[1]].prefix*5-4][2][1],prefixdata[player.inventory.bag[invselect[1]].prefix*5-4][2][2]);
							arc(150,150,140,140,PI/2,3*PI/2);
						}
						else if(player.inventory.bag[invselect[1]].prefix){
							fill(prefixdata[player.inventory.bag[invselect[1]].prefix*5-4][2][0],prefixdata[player.inventory.bag[invselect[1]].prefix*5-4][2][1],prefixdata[player.inventory.bag[invselect[1]].prefix*5-4][2][2]);
							ellipse(150,150,140,140);
						}
						else if(player.inventory.bag[invselect[1]].suffix){
							fill(suffixdata[player.inventory.bag[invselect[1]].suffix*5-4][2][0],suffixdata[player.inventory.bag[invselect[1]].suffix*5-4][2][1],suffixdata[player.inventory.bag[invselect[1]].suffix*5-4][2][2]);
							ellipse(150,150,140,140);
						}
						else{
							fill(0,0,0);
							ellipse(150,150,140,140);
						}
						if(player.inventory.bag[invselect[1]].suffix||player.inventory.bag[invselect[1]].prefix){
							noFill();
							strokeWeight(14);
							stroke(255,255,255,280-(tick%180*2));
							ellipse(150,150,(tick%180),(tick%180));
						}
						noStroke();
					}
					else{
						shape(inventorysprites[itemdata[player.inventory.bag[invselect[1]].id*10+4]],150,150,259,385);
					}
						temp=new Array();
										if(itemdata[player.inventory.bag[invselect[1]].id*10+8]){
									for(a=0;a<itemdata[player.inventory.bag[invselect[1]].id*10+8].length;a+=1){
										append(temp,traitkey[itemdata[player.inventory.bag[invselect[1]].id*10+8][a][0]-1]+' + '+itemdata[player.inventory.bag[invselect[1]].id*10+8][a][1]);
									}
								}
								if(prefixdata[player.inventory.bag[invselect[1]].prefix*5-1]){
									for(a=0;a<prefixdata[player.inventory.bag[invselect[1]].prefix*5-1].length;a+=1){
										append(temp,traitkey[prefixdata[player.inventory.bag[invselect[1]].prefix*5-1][a][0]-1]+' + '+prefixdata[player.inventory.bag[invselect[1]].prefix*5-1][a][1]);
									}
								}
								if(suffixdata[player.inventory.bag[invselect[1]].suffix*5-1]){
									for(a=0;a<suffixdata[player.inventory.bag[invselect[1]].suffix*5-1].length;a+=1){
										append(temp,traitkey[suffixdata[player.inventory.bag[invselect[1]].suffix*5-1][a][0]-1]+' + '+suffixdata[player.inventory.bag[invselect[1]].suffix*5-1][a][1]);
									}
								}
								temp3=1;
									temp3=itemdata[player.inventory.bag[invselect[1]].id*10+6];
								if(player.inventory.bag[invselect[1]].prefix){
									temp3*=prefixdata[(player.inventory.bag[invselect[1]].prefix-1)*5+3];
								}
								if(player.inventory.bag[invselect[1]].suffix){
									temp3*=suffixdata[(player.inventory.bag[invselect[1]].suffix-1)*5+3];
								}
								if(!(temp3==1)){
									append(temp,'Move Speed: '+(round((temp3-1)*1000))/10+"%");
								}
								temp3="";
								if(player.inventory.bag[invselect[1]].prefix){
									temp3+=prefixdata[(player.inventory.bag[invselect[1]].prefix-1)*5];
									temp3+=" ";
								}
									temp3+=itemdata[player.inventory.bag[invselect[1]].id*10];
								if(player.inventory.bag[invselect[1]].suffix){
									temp3+=" ";
									temp3+=suffixdata[(player.inventory.bag[invselect[1]].suffix-1)*5];
								}
					textFont(0,26-temp3.length/4);
					fill(0,0,0);
					text(temp3,40,250);
					textFont(0,19);
					text("Health: "+round(10*(getitemstat(0,invselect[1])))/10,40,285);
					text("Mana: "+round(10*(getitemstat(1,invselect[1])))/10,40,335);
					text("Health Regen: "+round(100*(getitemstat(2,invselect[1])))/100,40,310);
					text("Mana Regen: "+round(100*(getitemstat(3,invselect[1])))/100,40,360);
					text("Strength: "+round(10*(getitemstat(4,invselect[1])))/10,40,385);
					text("Intelligence: "+round(10*(getitemstat(5,invselect[1])))/10,40,410);
					text("Armor: "+round(10*(getitemstat(6,invselect[1])))/10,40,435);
					text("Resistance: "+round(10*(getitemstat(7,invselect[1])))/10,40,460);
					for(v=0;v<temp.length;v+=1){
						text(temp[v],40,490+v*20);
					}
					fill(200,100,0);
					if(cursorbox(825,975,5,65)){
						fill(255,175,50);
						if(!(mouselock)&mousePressed){
							mouselock=1;
							if(mouseButton==LEFT){
								if(options.loadAudio){sfx.click.play();}
								if(enchantmode>0){
									enchantmode=0;
								}
								else{
									invselect[0]='bag';
									invselect[1]=-1;
								}
							}
						}
					}
					rect(825,5,150,60,30);
					fill(0,0,100);
					textFont(0,28);
					text("Back",866,14,100,50);
					if(enchantmode==0){
						fill(0,75,0);
						if(cursorbox(575,875,225,325)){
							fill(0,150,0);
							if(!(mouselock)&mousePressed){
								mouselock=1;
								if(mouseButton==LEFT){
									if(options.loadAudio){sfx.click.play();}
									getenchprefixes();
									enchantmode=1;
								}
							}
						}
						rect(575,225,300,100,30);
						fill(255,255,255);
						textFont(0,28);
						text("Browse Prefixes",625,260,250,50);
						fill(0,0,75);
						if(cursorbox(575,875,425,525)){
							fill(0,0,150);
							if(!(mouselock)&mousePressed){
								mouselock=1;
								if(mouseButton==LEFT){
									if(options.loadAudio){sfx.click.play();}
									getenchsuffixes();
									enchantmode=2;
								}
							}
						}
						rect(575,425,300,100,30);
						fill(255,255,255);
						textFont(0,28);
						text("Browse Suffixes",625,460,250,50);
					}
					else if(enchantmode==1){
						textAlign(CENTER);
						strokeWeight(5);
						for(reo=0;reo<enchantercache.enchants.length;reo+=1){
							fill(enchantercache.enchants[reo].R,enchantercache.enchants[reo].G,enchantercache.enchants[reo].B);
							if(player.record.prefixes[enchantercache.enchants[reo].id]){
								noStroke();
							}
							else{
								stroke(90,90,90);
							}
							rect(400+floor(reo/25)*100,70+(reo%25)*25,95,20,4);
							fill(0,0,0);
							textFont(0,min(17,5+(50/enchantercache.enchants[reo].name.length)));
							text(enchantercache.enchants[reo].name,400+floor(reo/25)*100,75+(reo%25)*25,95,20);
							if(cursorbox(400+floor(reo/25)*100,495+floor(reo/25)*100,70+(reo%25)*25,90+(reo%25)*25)){
								stemp=new Array();
								temp=260;
								if(player.record.prefixes[enchantercache.enchants[reo].id]){
									append(stemp,"SP to purchase: 50");
								}
								else{
									append(stemp,"Reactant to unlock: "+(round(5000/enchantercache.enchants[reo].dropweight)-40));
								}
								append(stemp,"Health: "+prefixdata[enchantercache.enchants[reo].id*5+2][0]);
								append(stemp,"Mana: "+prefixdata[enchantercache.enchants[reo].id*5+2][1]);
								append(stemp,"Health Regen: "+prefixdata[enchantercache.enchants[reo].id*5+2][2]);
								append(stemp,"Mana Regen: "+prefixdata[enchantercache.enchants[reo].id*5+2][3]);
								append(stemp,"Strength: "+prefixdata[enchantercache.enchants[reo].id*5+2][4]);
								append(stemp,"Intelligence: "+prefixdata[enchantercache.enchants[reo].id*5+2][5]);
								append(stemp,"Armor: "+prefixdata[enchantercache.enchants[reo].id*5+2][6]);
								append(stemp,"Resistance: "+prefixdata[enchantercache.enchants[reo].id*5+2][7]);
								append(stemp,"Movement Speed: "+prefixdata[enchantercache.enchants[reo].id*5+3]*100+"%");
								for(greot=0;greot<prefixdata[enchantercache.enchants[reo].id*5+4].length;greot+=1){
									temp+=20;
									append(stemp,traitkey[prefixdata[enchantercache.enchants[reo].id*5+4][greot][0]-1]+" + "+prefixdata[enchantercache.enchants[reo].id*5+4][greot][1]);
								}
								if(player.record.prefixes[enchantercache.enchants[reo].id]){
									tooltipdraw={
										type:1,
										x:mouseX,
										y:mouseY-100,
										w:300,
										h:temp,
										title:enchantercache.enchants[reo].name,
										tip:stemp,
										colors:[[100,100,255],0]
									};
								}
								else{
									tooltipdraw={
										type:1,
										x:mouseX,
										y:mouseY-100,
										w:300,
										h:temp,
										title:enchantercache.enchants[reo].name,
										tip:stemp,
										colors:[[255,200,50],0]
									};
								}
								if(!(mouselock)&mousePressed){
									mouselock=1;
									if(mouseButton==LEFT){
										if(player.record.prefixes[enchantercache.enchants[reo].id]){
											if(player.sp>=50){
												player.sp-=50;
												if(options.loadAudio){sfx.enchant.play();}
												player.inventory.bag[invselect[1]].prefix=enchantercache.enchants[reo].id+1;
												enchantmode=0;
											}
										}
										else{
											if(player.reactant>=round(5000/enchantercache.enchants[reo].dropweight)-40){
												player.reactant-=round(5000/enchantercache.enchants[reo].dropweight)-40;
												if(options.loadAudio){sfx.click.play();}
												player.record.prefixes[enchantercache.enchants[reo].id]=1;
											}
										}
									}
								}
							}
						}
						noStroke();
						textAlign(TOP,LEFT);
					}
					else if(enchantmode==2){
						textAlign(CENTER);
						strokeWeight(5);
						for(reo=0;reo<enchantercache.enchants.length;reo+=1){
							fill(enchantercache.enchants[reo].R,enchantercache.enchants[reo].G,enchantercache.enchants[reo].B);
							if(player.record.suffixes[enchantercache.enchants[reo].id]){
								noStroke();
							}
							else{
								stroke(90,90,90);
							}
							rect(400+floor(reo/25)*100,70+(reo%25)*25,95,20,4);
							fill(0,0,0);
							textFont(0,min(17,5+(50/enchantercache.enchants[reo].name.length)));
							text(enchantercache.enchants[reo].name,400+floor(reo/25)*100,75+(reo%25)*25,95,20);
							if(cursorbox(400+floor(reo/25)*100,495+floor(reo/25)*100,70+(reo%25)*25,90+(reo%25)*25)){
								stemp=new Array();
								temp=260;
								if(player.record.suffixes[enchantercache.enchants[reo].id]){
									append(stemp,"SP to purchase: 50");
								}
								else{
									append(stemp,"Reactant to unlock: "+(round(5000/enchantercache.enchants[reo].dropweight)-40));
								}
								append(stemp,"Health: "+suffixdata[enchantercache.enchants[reo].id*5+2][0]);
								append(stemp,"Mana: "+suffixdata[enchantercache.enchants[reo].id*5+2][1]);
								append(stemp,"Health Regen: "+suffixdata[enchantercache.enchants[reo].id*5+2][2]);
								append(stemp,"Mana Regen: "+suffixdata[enchantercache.enchants[reo].id*5+2][3]);
								append(stemp,"Strength: "+suffixdata[enchantercache.enchants[reo].id*5+2][4]);
								append(stemp,"Intelligence: "+suffixdata[enchantercache.enchants[reo].id*5+2][5]);
								append(stemp,"Armor: "+suffixdata[enchantercache.enchants[reo].id*5+2][6]);
								append(stemp,"Resistance: "+suffixdata[enchantercache.enchants[reo].id*5+2][7]);
								append(stemp,"Movement Speed: "+suffixdata[enchantercache.enchants[reo].id*5+3]*100+"%");
								for(greot=0;greot<suffixdata[enchantercache.enchants[reo].id*5+4].length;greot+=1){
									temp+=20;
									append(stemp,traitkey[suffixdata[enchantercache.enchants[reo].id*5+4][greot][0]-1]+" + "+suffixdata[enchantercache.enchants[reo].id*5+4][greot][1]);
								}
								if(player.record.suffixes[enchantercache.enchants[reo].id]){
									tooltipdraw={
										type:1,
										x:mouseX,
										y:mouseY-100,
										w:300,
										h:temp,
										title:enchantercache.enchants[reo].name,
										tip:stemp,
										colors:[[100,100,255],0]
									};
								}
								else{
									tooltipdraw={
										type:1,
										x:mouseX,
										y:mouseY-100,
										w:300,
										h:temp,
										title:enchantercache.enchants[reo].name,
										tip:stemp,
										colors:[[255,200,50],0]
									};
								}
								if(!(mouselock)&mousePressed){
									mouselock=1;
									if(mouseButton==LEFT){
										if(player.record.suffixes[enchantercache.enchants[reo].id]){
											if(player.sp>=50){
												player.sp-=50;
												if(options.loadAudio){sfx.enchant.play();}
												player.inventory.bag[invselect[1]].suffix=enchantercache.enchants[reo].id+1;
												enchantmode=0;
											}
										}
										else{
											if(player.reactant>=round(5000/enchantercache.enchants[reo].dropweight)-40){
												player.reactant-=round(5000/enchantercache.enchants[reo].dropweight)-40;
												if(options.loadAudio){sfx.click.play();}
												player.record.suffixes[enchantercache.enchants[reo].id]=1;
											}
										}
									}
								}
							}
						}
						noStroke();
						textAlign(TOP,LEFT);
					}
				}
				}
				
				if(!(player.inventory.bag[invselect[1]])){
					renderinventory();
					for(x=0;x<15;x+=1){
						for(n=0;n<15;n+=1){
							if(cursorbox(650+30*n,675+30*n,125+30*x,150+30*x)){
								if(player.inventory.bag[15*x+n]){
									equiptooltip('bag',15*x+n);
								}
								if(!(mouselock)&mousePressed){
									mouselock=1;
									if(mouseButton==LEFT){
										if(options.loadAudio){sfx.click2.play();}
											invselect[0]='bag';
											invselect[1]=15*x+n;
									}
								}
							}
						}
					}
				}
			}
			//Infuser
			else if(inventype==3){
			fill(10,0,15);
			rect(350,0,783,700);
			fill(abs(tick%1440-720)/10,abs(tick%720-360)/5,abs(tick%360-180)/2.5);
			for(k=0;k<13;k+=1){
				ellipse(365+k*60,(k*30+tick*(k/9+2))%700,20+(k%3)*5,30-k%4);
			}
			statpanel();
			if(keystoneselec[0]<=0){
				if(keystoneselec[0]==0){
					if(mouseX>661&mouseX<821&mouseY>270&mouseY<430){
						keystoneselec[1]=min(60,keystoneselec[1]+1.5);
					}
					else{
						keystoneselec[1]=max(0,keystoneselec[1]-2);
					}
				}
				if(keystoneselec[0]==-1){
					keystoneselec[1]-=1.5;
					if(keystoneselec[1]<=0){
						keystoneselec[0]=0;
					}
				}
				fill(55,55,55);
				rectMode(CENTER);
				translate(741,350);
				rect(0,0,160,160,75);
				if(keystoneselec[0]==0){
					fill(0,100,0,keystoneselec[1]*4);
				}
				else{
					fill(200,0,0,keystoneselec[1]*4);
				}
				rotate(tick/50);
				for(k=0;k<4;k+=1){
					triangle(-53,-60,-45,-30,45,-45);
					rotate(PI/2);
				}
				resetMatrix();
				if(!(mouselock)&mousePressed&mouseX>661&mouseX<821&mouseY>270&mouseY<430){
					if(options.loadAudio){sfx.click.play();}
					mouselock=1;
					getkeystone();
				}
			}
			else{
				for(o=0;o<8;o+=1){
					if(keystones[keystoneselec[0]*50+4+o*5]){
						fill(55,55,55);
						rectMode(CENTER);
						translate(741+cos((o-2)*PI/4)*270,350+sin((o-2)*PI/4)*270);
						rect(0,0,160,160,70);
						fill(o*45-60,abs(o-4)*90,255-o*90,abs(tick%180-90)*3);
						rotate(round(2*(o%2)-1)*tick/50);
						for(k=0;k<4;k+=1){
							triangle(-53,-60,-45,-30,45,-45);
							rotate(PI/2);
						}
						resetMatrix();
						if(mouseX>661+cos((o-2)*PI/4)*270&mouseX<821+cos((o-2)*PI/4)*270&mouseY<430+sin((o-2)*PI/4)*270&mouseY>270+sin((o-2)*PI/4)*270){
							tooltipdraw={
								type:0,
								x:mouseX,
								y:mouseY-100,
								w:300,
								h:300,
								title:keystones[keystoneselec[0]*50+o*5+4],
								tip:keystones[keystoneselec[0]*50+o*5+5],
								colors:0
							};
							if(!(mouselock)&mousePressed){
								mouselock=1;
								if(options.loadAudio){sfx.click.play();}
								player.record.keystones[keystoneselec[0]]=o+1;
								stemp=split(keystones[keystoneselec[0]*50+o*5+6],"/");
								player.keystonestats.hp+=Number(stemp[0]);
								player.keystonestats.hpregen+=Number(stemp[1]);
								player.keystonestats.mp+=Number(stemp[2]);
								player.keystonestats.mpregen+=Number(stemp[3]);
								player.keystonestats.str+=Number(stemp[4]);
								player.keystonestats.intel+=Number(stemp[5]);
								player.keystonestats.armor+=Number(stemp[6]);
								player.keystonestats.res+=Number(stemp[7]);
								player.keystonestats.speed+=Number(stemp[8]);
								player.keystonestats.size+=Number(stemp[9]);
								player.keystonestats.haste+=Number(stemp[10]);
								player.keystonestats.power+=Number(stemp[11]);
								player.passives[0]+=Number(stemp[11]);
								player.keystonestats.fortitude+=Number(stemp[12]);
								player.passives[1]+=Number(stemp[12]);
								player.keystonestats.omnipotency+=Number(stemp[13]);
								player.passives[2]+=Number(stemp[13]);
								stemp=split(keystones[keystoneselec[0]*50+o*5+7],"/");
								player.passivemults.power.hp+=Number(stemp[0]);
								player.passivemults.power.hpregen+=Number(stemp[1]);
								player.passivemults.power.str+=Number(stemp[2]);
								player.passivemults.power.intel+=Number(stemp[3]);
								player.passivemults.power.armor+=Number(stemp[4]);
								player.passivemults.power.res+=Number(stemp[5]);
								player.passivemults.fortitude.hp+=Number(stemp[6]);
								player.passivemults.fortitude.hpregen+=Number(stemp[7]);
								player.passivemults.fortitude.str+=Number(stemp[8]);
								player.passivemults.fortitude.intel+=Number(stemp[9]);
								player.passivemults.fortitude.armor+=Number(stemp[10]);
								player.passivemults.fortitude.res+=Number(stemp[11]);
								player.passivemults.omnipotency.hp+=Number(stemp[12]);
								player.passivemults.omnipotency.hpregen+=Number(stemp[13]);
								player.passivemults.omnipotency.str+=Number(stemp[14]);
								player.passivemults.omnipotency.intel+=Number(stemp[15]);
								player.passivemults.omnipotency.armor+=Number(stemp[16]);
								player.passivemults.omnipotency.res+=Number(stemp[17]);
								if(keystones[keystoneselec[0]*50+o*5+8]){
									stemp=split(keystones[keystoneselec[0]*50+o*5+8],",");
									for(gksp=0;gksp<stemp.length;gksp+=1){
										player.keystonepassives[split(stemp[gksp],"/")[0]]+=Number(split(stemp[gksp],"/")[1]);
									}
								}
								keystoneselec=[0,100];
								recalstats();
								loadkeystoneps();
							}
						}
					}
				}
			}
			}
			//Artisan Bench
			else if(inventype==4){
			fill(170,140,100);
			rect(0,0,450,700);
			fill(100,200,200);
			textFont(0,26);
			text('SP: '+player.sp,1000,650);
			fill(150,80,150);
			textFont(0,35);
			text("Artisan's Bench",500,30);
			fill(140,140,150);
			rect(65,55,180,180,8);
			renderinventory();
				for(x=0;x<15;x+=1){
					for(n=0;n<15;n+=1){
						if(cursorbox(650+30*n,675+30*n,125+30*x,150+30*x)){
							if(player.inventory.bag[15*x+n]){
								equiptooltip('bag',15*x+n);
							}
							if(!(mouselock)&mousePressed){
								mouselock=1;
								if(mouseButton==LEFT){
									if(options.loadAudio){sfx.click.play();}
									invselect[0]='bag';
									invselect[1]=15*x+n;
								}
							}
						}
					}
				}
				if(invselect[1]>=0){
				if(player.inventory.bag[invselect[1]]){
					if(player.inventory.bag[invselect[1]].id==44){
						ellipseMode(CENTER);
						if(player.inventory.bag[invselect[1]].suffix&player.inventory.bag[invselect[1]].prefix){
							fill(suffixdata[player.inventory.bag[invselect[1]].suffix*5-4][2][0],suffixdata[player.inventory.bag[invselect[1]].suffix*5-4][2][1],suffixdata[player.inventory.bag[invselect[1]].suffix*5-4][2][2]);
							ellipse(150,150,140,140);
							fill(prefixdata[player.inventory.bag[invselect[1]].prefix*5-4][2][0],prefixdata[player.inventory.bag[invselect[1]].prefix*5-4][2][1],prefixdata[player.inventory.bag[invselect[1]].prefix*5-4][2][2]);
							arc(150,150,140,140,PI/2,3*PI/2);
						}
						else if(player.inventory.bag[invselect[1]].prefix){
							fill(prefixdata[player.inventory.bag[invselect[1]].prefix*5-4][2][0],prefixdata[player.inventory.bag[invselect[1]].prefix*5-4][2][1],prefixdata[player.inventory.bag[invselect[1]].prefix*5-4][2][2]);
							ellipse(150,150,140,140);
						}
						else if(player.inventory.bag[invselect[1]].suffix){
							fill(suffixdata[player.inventory.bag[invselect[1]].suffix*5-4][2][0],suffixdata[player.inventory.bag[invselect[1]].suffix*5-4][2][1],suffixdata[player.inventory.bag[invselect[1]].suffix*5-4][2][2]);
							ellipse(150,150,140,140);
						}
						else{
							fill(0,0,0);
							ellipse(150,150,140,140);
						}
						if(player.inventory.bag[invselect[1]].suffix||player.inventory.bag[invselect[1]].prefix){
							noFill();
							strokeWeight(14);
							stroke(255,255,255,280-(tick%180*2));
							ellipse(150,150,(tick%180),(tick%180));
						}
						noStroke();
					}
					else{
						shape(inventorysprites[itemdata[player.inventory.bag[invselect[1]].id*10+4]],150,150,259,385);
					}
								temp3=1;
									temp3=itemdata[player.inventory.bag[invselect[1]].id*10+6];
								if(player.inventory.bag[invselect[1]].prefix){
									temp3*=prefixdata[(player.inventory.bag[invselect[1]].prefix-1)*5+3];
								}
								if(player.inventory.bag[invselect[1]].suffix){
									temp3*=suffixdata[(player.inventory.bag[invselect[1]].suffix-1)*5+3];
								}
								if(!(temp3==1)){
									append(temp,'Move Speed: '+(round((temp3-1)*1000))/10+"%");
								}
								temp3="";
								if(player.inventory.bag[invselect[1]].prefix){
									temp3+=prefixdata[(player.inventory.bag[invselect[1]].prefix-1)*5];
									temp3+=" ";
								}
									temp3+=itemdata[player.inventory.bag[invselect[1]].id*10];
								if(player.inventory.bag[invselect[1]].suffix){
									temp3+=" ";
									temp3+=suffixdata[(player.inventory.bag[invselect[1]].suffix-1)*5];
								}
					textFont(0,26-temp3.length/4);
					fill(0,0,0);
					text(temp3,40,250);
					textFont(0,19);
					textAlign(TOP,LEFT);
					
			if(player.inventory.bag[invselect[1]].id==44){
				text("Orbs do not have stat rolls to modify.",40,285);
			}
			else{
				if(!(player.inventory.bag[invselect[1]].lockartrolls)){
					player.inventory.bag[invselect[1]].artmrolls={
						hp:player.inventory.bag[invselect[1]].rolls.hp,
						hpregen:player.inventory.bag[invselect[1]].rolls.hpregen,
						mp:player.inventory.bag[invselect[1]].rolls.mp,
						mpregen:player.inventory.bag[invselect[1]].rolls.mpregen,
						str:player.inventory.bag[invselect[1]].rolls.str,
						intel:player.inventory.bag[invselect[1]].rolls.intel,
						armor:player.inventory.bag[invselect[1]].rolls.armor,
						res:player.inventory.bag[invselect[1]].rolls.res,
					};
					player.inventory.bag[invselect[1]].lockartrolls=1;
				}
				if(player.inventory.bag[invselect[1]].freepts){
					text("Free Points: "+player.inventory.bag[invselect[1]].freepts,275,80);
				}
				else{
					text("Free Points: 0",275,80);
				}
					textFont(0,15);
				textAlign(CENTER,CENTER);
				stemp=0;
				if(player.inventory.bag[invselect[1]].tinker){
					stemp=player.inventory.bag[invselect[1]].tinker;
				}
				fill(200,200,100);
				rect(275,120,120,50,4);
				fill(0,0,0);
				textFont(0,25);
				text('Tinker',275,120,120,50);
					if(cursorbox(275,395,120,170)){
						tooltipdraw={
							type:0,
							x:mouseX,
							y:mouseY-100,
							w:250,
							h:200,
							title:"Tinker",
							tip:"Adds a free point. Costs "+round(75*(stemp*0.5+(pow(1.05,stemp))))+" SP.",
							colors:0
						};
						if(!(mouselock)&mousePressed){
							mouselock=1;
							if(mouseButton==LEFT){
								if(invselect[0]=='bag'){
									if(options.loadAudio){sfx.click.play();}
									if(player.sp>=round(75*(stemp*0.5+(pow(1.05,stemp))))){
										if(options.loadAudio){
											sfx.upgrade.play();
										}
										player.sp-=round(75*(stemp*0.5+(pow(1.05,stemp))));
										if(stemp>0){
											player.inventory.bag[invselect[1]].tinker+=1;
										}
										else{
											player.inventory.bag[invselect[1]].tinker=1;
										}
										if(player.inventory.bag[invselect[1]].freepts>0){
											player.inventory.bag[invselect[1]].freepts+=1;
										}
										else{
											player.inventory.bag[invselect[1]].freepts=1;
										}
									}
									else{
										append(particles,new createparticle(mouseX-150,mouseY-50,0,0,0,0,'text','Insufficient SP!',20,0,255,-3,255,0,0));
									}
								}
							}
						}
					}
					textAlign(TOP,LEFT);
					stemp=5;
					if(player.inventory.bag[invselect[1]].ptfree){
						stemp=5+player.inventory.bag[invselect[1]].ptfree;
					}
					if(player.record.bosses[1]>0){
						artisanmbox("hp",0);
						artisanmbox("hpregen",40);
						artisanmbox("mp",80);
						artisanmbox("mpregen",120);
						artisanmbox("str",160);
						artisanmbox("intel",200);
						artisanmbox("armor",240);
						artisanmbox("res",280);
					}
						artisanpbox("hp",0);
						artisanpbox("hpregen",40);
						artisanpbox("mp",80);
						artisanpbox("mpregen",120);
						artisanpbox("str",160);
						artisanpbox("intel",200);
						artisanpbox("armor",240);
						artisanpbox("res",280);
					textFont(0,19);
					fill(0,0,0);
					text("Health: "+round(1000*(player.inventory.bag[invselect[1]].rolls.hp))/10+"%",150,320);
					text("Health Regen: "+round(1000*(player.inventory.bag[invselect[1]].rolls.hpregen))/10+"%",150,360);
					text("Mana: "+round(1000*(player.inventory.bag[invselect[1]].rolls.mp))/10+"%",150,400);
					text("Mana Regen: "+round(1000*(player.inventory.bag[invselect[1]].rolls.mpregen))/10+"%",150,440);
					text("Strength: "+round(1000*(player.inventory.bag[invselect[1]].rolls.str))/10+"%",150,480);
					text("Intelligence: "+round(1000*(player.inventory.bag[invselect[1]].rolls.intel))/10+"%",150,520);
					text("Armor: "+round(1000*(player.inventory.bag[invselect[1]].rolls.armor))/10+"%",150,560);
					text("Resistance: "+round(1000*(player.inventory.bag[invselect[1]].rolls.res))/10+"%",150,600);
			}
					
				}
				}
			}
		//=======
		if(invselect[0]=='anvil'){
			shape(sprites.anvil,mouseX,mouseY,45,67.5);
			if(mousePressed&mouseButton==RIGHT){
				invselect=['',-1];
			}
		}
	rectMode(CORNER);
	textAlign(LEFT,CENTER);
	}
	if(inventory==2){
		if(!(mousePressed||keyPressed)){
			mouselock=0;
		}
		fill(70,140,70);
		rect(0,0,1133,700);
		fill(140,70,70);
		rect(400,0,733,700);
		fill(0,0,140);
		textFont(0,30);
		text('Available Active Traits',55,10);
		fill(0,140,140);
		text('Equipped Traits',700,10);
		fill(0,0,0);
		textFont(0,25);
		text('SPACE',1000,75);
		text('SHIFT',1000,225);
		text('Q',1000,375);
		text('E',1000,525);
		for(i=0;i<traits.inactive.length;i+=1){
			shape(traits.sprites[traits.inactive[i]],75+floor(i/5)*100,125+(i%5)*100,300,425);
		}
		for(i=0;i<traits.inactive.length;i+=1){
			if(cursorbox(30+floor(i/5)*100,120+floor(i/5)*100,80+(i%5)*100,160+(i%5)*100)){
				if(!(tooltipcache[0]==i)){
					tooltipcache[1]=converttext(traits.tt[traits.inactive[i]][1],traits.tt[traits.inactive[i]][2]);
					tooltipcache[0]=i;
				}
				tooltipdraw={
					type:0,
					x:mouseX,
					y:mouseY-100,
					w:300,
					h:300,
					title:traits.tt[traits.inactive[i]][0],
					tip:tooltipcache[1],
					colors:0
				};
				if(mouselock==0&keyPressed&key.code==65535){
					tooltipcache[0]=-1;
					mouselock=1;
					if(options.loadAudio){sfx.click.play();}
					player.activetraits.shift=traits.inactive[i];
					gettraits();
					playertemp.traitcd.shift=traitcd[player.activetraits.shift];
				}
				if(mouselock==0&keyPressed&key.code==32){
					tooltipcache[0]=-1;
					mouselock=1;
					if(options.loadAudio){sfx.click.play();}
					player.activetraits.space=traits.inactive[i];
					gettraits();
					playertemp.traitcd.space=traitcd[player.activetraits.space];
				}
				if(mouselock==0&keyPressed&(key.code==113||key.code==81)){
					tooltipcache[0]=-1;
					mouselock=1;
					if(options.loadAudio){sfx.click.play();}
					player.activetraits.q=traits.inactive[i];
					gettraits();
					playertemp.traitcd.q=traitcd[player.activetraits.q];
				}
				if(mouselock==0&keyPressed&(key.code==101||key.code==69)){
					tooltipcache[0]=-1;
					mouselock=1;
					if(options.loadAudio){sfx.click.play();}
					player.activetraits.e=traits.inactive[i];
					gettraits();
					playertemp.traitcd.e=traitcd[player.activetraits.e];
				}
			}
		}
		for(i=0;i<traits.active.length;i+=1){
			shape(traits.sprites[traits.active[i]],475+floor(i/5)*100,125+(i%5)*100,300,425);
		}
		for(i=0;i<traits.active.length;i+=1){
			if(cursorbox(430+floor(i/5)*100,520+floor(i/5)*100,80+(i%5)*100,160+(i%5)*100)){
				if(!(tooltipcache[0]==i+1000)){
					tooltipcache[1]=converttext(traits.tt[traits.active[i]][1],traits.tt[traits.active[i]][2]);
					tooltipcache[0]=i+1000;
				}
				tooltipdraw={
					type:0,
					x:mouseX,
					y:mouseY-100,
					w:300,
					h:300,
					title:traits.tt[traits.active[i]][0],
					tip:tooltipcache[1],
					colors:0
				};
			}
		}
		if(player.activetraits.space>0&player.traits[player.activetraits.space]>0){
			shape(traits.sprites[player.activetraits.space],1040,150,300,425);
		}
		if(player.activetraits.shift>0&player.traits[player.activetraits.shift]>0){
			shape(traits.sprites[player.activetraits.shift],1040,300,300,425);
		}
		if(player.activetraits.q>0&player.traits[player.activetraits.q]>0){
			shape(traits.sprites[player.activetraits.q],1040,450,300,425);
		}
		if(player.activetraits.e>0&player.traits[player.activetraits.e]>0){
			shape(traits.sprites[player.activetraits.e],1040,600,300,425);
		}
		if(player.activetraits.space>0&player.traits[player.activetraits.space]>0&cursorbox(995,1085,105,195)){
				if(!(tooltipcache[0]==2001)){
					tooltipcache[1]=converttext(traits.tt[player.activetraits.space][1],traits.tt[player.activetraits.space][2]);
					tooltipcache[0]=2001;
				}
				tooltipdraw={
					type:0,
					x:mouseX,
					y:mouseY-100,
					w:300,
					h:300,
					title:traits.tt[player.activetraits.space][0],
					tip:tooltipcache[1],
					colors:0
				};
			if(mousePressed&mouselock==0){
				mouselock=1;
				if(options.loadAudio){sfx.click.play();}
				player.activetraits.space=0;
				gettraits();
			}
		}
		if(player.activetraits.shift>0&player.traits[player.activetraits.shift]>0&cursorbox(995,1085,255,345)){
				if(!(tooltipcache[0]==2002)){
					tooltipcache[1]=converttext(traits.tt[player.activetraits.shift][1],traits.tt[player.activetraits.shift][2]);
					tooltipcache[0]=2002;
				}
				tooltipdraw={
					type:0,
					x:mouseX,
					y:mouseY-100,
					w:300,
					h:300,
					title:traits.tt[player.activetraits.shift][0],
					tip:tooltipcache[1],
					colors:0
				};
			if(mousePressed&mouselock==0){
				mouselock=1;
				if(options.loadAudio){sfx.click.play();}
				player.activetraits.shift=0;
				gettraits();
			}
		}
		if(player.activetraits.q>0&player.traits[player.activetraits.q]>0&cursorbox(995,1085,405,495)){
				if(!(tooltipcache[0]==2003)){
					tooltipcache[1]=converttext(traits.tt[player.activetraits.q][1],traits.tt[player.activetraits.q][2]);
					tooltipcache[0]=2003;
				}
				tooltipdraw={
					type:0,
					x:mouseX,
					y:mouseY-100,
					w:300,
					h:300,
					title:traits.tt[player.activetraits.q][0],
					tip:tooltipcache[1],
					colors:0
				};
			if(mousePressed&mouselock==0){
				mouselock=1;
				if(options.loadAudio){sfx.click.play();}
				player.activetraits.q=0;
				gettraits();
			}
		}
		if(player.activetraits.e>0&player.traits[player.activetraits.e]>0&cursorbox(995,1085,555,645)){
				if(!(tooltipcache[0]==2004)){
					tooltipcache[1]=converttext(traits.tt[player.activetraits.e][1],traits.tt[player.activetraits.e][2]);
					tooltipcache[0]=2004;
				}
				tooltipdraw={
					type:0,
					x:mouseX,
					y:mouseY-100,
					w:300,
					h:300,
					title:traits.tt[player.activetraits.e][0],
					tip:tooltipcache[1],
					colors:0
				};
			if(mousePressed&mouselock==0){
				mouselock=1;
				if(options.loadAudio){sfx.click.play();}
				player.activetraits.e=0;
				gettraits();
			}
		}
	}
	if(inventory==3){
		fill(20,0,20);
		rect(0,0,1133,700);
		fill(140,100,80);
		textFont(0,30);
		text("The  World  Atlas",400,10);
		ellipseMode(CENTER);
		for(i=0;i<atlasbiomes.length;i+=1){
			if(atlasbiomes[i][4]){
				fill(100,255,200);
			}
			else{
				fill(200,200,200);
			}
			ellipse(atlasbiomes[i][2],atlasbiomes[i][3],30,30);
			if(mouseX<atlasbiomes[i][2]+15&mouseX>atlasbiomes[i][2]-15&mouseY<atlasbiomes[i][3]+15&mouseY>atlasbiomes[i][3]-15){
				if(player.record.atlas[atlasbiomes[i][0]]==1){
					tooltipdraw={
						type:0,
						x:mouseX,
						y:mouseY-100,
						w:250,
						h:150,
						title:atlasbiomes[i][1],
						tip:"This area has not been unlocked.",
						colors:0
					};
				}
				else{
					tooltipdraw={
						type:0,
						x:mouseX,
						y:mouseY-100,
						w:250,
						h:150,
						title:atlasbiomes[i][1],
						tip:"Click to travel to "+atlasbiomes[i][1]+".",
						colors:0
					};
					if(mousePressed){
						player.biomeID=atlasbiomes[i][0];
						toloadarea=1;
						inventory=0;
				helpscreen={active:0,help:0};
						if(options.loadAudio){
							if(player.hp<(plshp(1))){
								player.hp=(plshp(1));
							}
							if(player.mp<(plsmp(1))){
								player.mp=(plsmp(1));
							}
							sfx.warp.play();
						}
						for(n=0;n<25;n+=1){
							append(particles,new createparticle(random(385,415),random(335,365),random(-1,1),random(-1,1),0,0,'circle','',10,-0.2,255,-4,random(120,255),150,255));
						}
					}
				}
			}
		}
	}
	}
	if(toloadarea){
		loadArea();
		toloadarea=0;
	}
	}
//=====================Menu Screen==============================================
//Mode: 0 = game selectt, 1 = champ select
else{
		textAlign(LEFT,TOP);
	if(menuscreentemp[3]==1){
		append(particles,new createparticle(300,300,0,-2,0,0,'text','Player data not found!',30,0,255,-4,255,0,0));
		menuscreentemp[3]=0;
	}
	fill(70,70,120);
	rect(0,0,1133,700);
	textFont(font, 20); 
	fill(255,255,255);
	if(mode==0){
		if(textinput==''){
			menuscreentemp[2]=max(0,menuscreentemp[2]-1);
		}
		else{
			menuscreentemp[2]=min(50,menuscreentemp[2]+1);
			
		}
		fill(255,40,40,5+menuscreentemp[2]*5);
		rect(50,350,200,100,40);
		
		fill(0,0,0,5+menuscreentemp[2]*5);
		textFont(font, 30); 
		text("New Game",75,383,500,65);
		fill(40,180,255,5+menuscreentemp[2]*5);
		rect(400,350,200,100,40);
		fill(0,0,0,5+menuscreentemp[2]*5);
		textFont(font, 30); 
		text("Load Game",420,385,500,60);
		fill(100,100,255,150);
		rect(50,600,200,100,40);
		fill(0,0,0,150);
		textFont(font, 38); 
		text("Import",100,630,500,60);
			fill(255,200,40);
			rect(400,570,200,100,40);
			fill(255,255,90);
			rect(415,585,170,70,40);
			fill(0,0,0);
			textFont(font, 37); 
			text("Credits",437,600,500,60);
		if(menuscreentemp[0]){
			fill(40,255,40);
			rect(800,270,200,100,40);
			fill(0,0,0);
			textFont(font, 37); 
			text("Continue",820,305,500,60);
			fill(30,30,60);
			rect(720,385,350,130);
			textAlign(CENTER,CENTER);
			fill(255,200,255);
			textFont(font, 30); 
			text(loadStrings("namecache.txt")[0],720,385,350,75);
			text("Level: "+menuscreentemp[1],720,430,350,75);
			textAlign(LEFT,TOP);
		}
		fill(0,0,0);
		textFont(font, 20); 
		text("Current Version: "+version,875,670,300,30);
		fill(200,200,0);
		textFont(font, 30); 
		text("Name: "+textinput,75,220,700,90);
		fill(255,255,abs(tick%120-60)*1.5);
		rect(165,255,400,5);
		fill(0,0,0);
		textFont(font, 77); 
		text("Project Infinity",360,logoY*1.06-10,700,90);
		fill(logoR,0,0);
		textFont(font, 75); 
		text("Project Infinity",355,logoY,500,90);
		if(urf){
			tint(255,255,255,200);
		}
		else{
			tint(255,255,255,20);
		}
		image(urfim,1080,13,40,40);
		noTint();
		logoY += logoYvelo;
		if(logoYlock==1){
			logoYvelo+=0.015;
			if(logoYvelo>1.5){
				logoYlock=0;
			}
		}
		else{
			logoYvelo-=0.015;
			if(logoYvelo<-1.5){
				logoYlock=1;
			}
		}
		logoR += logoRvelo;
		if(logoRlock==1){
			logoRvelo+=0.0035;
			if(logoRvelo>0.7){
				logoRlock=0;
			}
		}
		else{
			logoRvelo-=0.0035;
			if(logoRvelo<-0.7){
				logoRlock=1;
			}
		}
		if(tick%2==0){
			append(particles,new createparticle(random(355,820),logoY+70,random(-0.5,2),random(-1.4,0.3)+logoYvelo/2,random(-0.01,0.01),random(-0.02,-0.01),'circle','',random(9,20)+random(9,20),random(-0.2,0.2),random(200,255),random(-2,-1),logoR,0,0));
		}
	}
	else{
		fill(0,0,0,menuscreentemp[4]*4);
		rect(0,0,1133,700);
		fill(180,0,0);
		rect(1093,5,35,35);
		stroke(255,255,255);
		strokeWeight(10);
		noFill();
		line(1098,10,1123,35);
		line(1098,35,1123,10);
		noStroke();
		menuscreentemp[4]=min(200,menuscreentemp[4]+1);
		textAlign(CENTER);
		textFont(0,30);
		fill(200,200,255,(menuscreentemp[4]-30)*4);
		// (everything except audio and some sprites)
		text("Game Developer",200,20,733,100);
		fill(200,200,255,(menuscreentemp[4]-60)*4);
		text("Sprite Helpers",200,170,733,100);
		fill(200,200,255,(menuscreentemp[4]-90)*4);
		text("Beta Testers",200,350,733,100);
		textFont(0,25);
		fill(200,200,255,(menuscreentemp[4]-120)*4);
		text("In memory of",100,535,933,100);
		fill(255,255,255,(menuscreentemp[4]-40)*4);
		text("Jonathan Jensen",200,85,733,160);
		fill(255,255,200,(menuscreentemp[4]-130)*4);
		text("Juan Teyssandier (Mr. JJ)",200,570,733,100);
		fill(255,255,255,(menuscreentemp[4]-130)*4);
		text("The engineering / computer science teacher who cared about his students and encouraged me to continue programming",20,620,690,80);
		text("July 31, 1955 - September 8, 2018",870,600,250,80);
		if(menuscreentemp[4]>130){
			tint(255,255,255,(menuscreentemp[4]-130)*4);
			image(mrjj,740,545,100,130);
			noTint();
		}
		textFont(0,30);
		textFont(0,30);
		textFont(0,27);
		textAlign(TOP,LEFT);
		fill(255,255,255,(menuscreentemp[4]-70)*4);
		//Sprite helpers
		text("TBD",500,240);
		textFont(0,25);
		fill(255,255,255,(menuscreentemp[4]-100)*4);
		//Beta testers
		text("Bryceton Welch",150,415);
		text("Charlton Welch",150,445);
		fill(160,160,50,(menuscreentemp[4]-50)*2);
		rect(0,150,1133,14);
		rect(0,330,1133,14);
		rect(0,510,1133,14);
	}
}
	if(buttonCD>0){
		buttonCD-=1;
	}
	if(tooltipdraw){
		if(tooltipdraw.x-tooltipdraw.w/2<0){
			tooltipdraw.x=tooltipdraw.w/2;
		}
		if(tooltipdraw.y-tooltipdraw.h/2<0){
			tooltipdraw.y=tooltipdraw.h/2;
		}
		if(tooltipdraw.x+tooltipdraw.w/2>1133){
			tooltipdraw.x=1133-tooltipdraw.w/2;
		}
		if(tooltipdraw.y+tooltipdraw.h/2>700){
			tooltipdraw.y=700-tooltipdraw.h/2;
		}
		rectMode(CENTER);
		fill(0,0,50,175);
		rect(tooltipdraw.x,tooltipdraw.y,tooltipdraw.w,tooltipdraw.h);
		textFont(0,16);
		fill(255,225,190);
		textAlign(LEFT,TOP);
		text(tooltipdraw.title,13+tooltipdraw.x-tooltipdraw.w/2,7+tooltipdraw.y-tooltipdraw.h/2);
		textFont(0,14);
		fill(255,255,255);
		if(tooltipdraw.type==0){
		textAlign(CENTER,CENTER);
		text(tooltipdraw.tip,tooltipdraw.x-tooltipdraw.w/2,40+tooltipdraw.y-tooltipdraw.h/2,tooltipdraw.w,tooltipdraw.h-40);
		}
		else{
			for(i=0;i<tooltipdraw.tip.length;i+=1){
				if(tooltipdraw.colors){
					if(tooltipdraw.colors[i]){
						fill(tooltipdraw.colors[i][0],tooltipdraw.colors[i][1],tooltipdraw.colors[i][2]);
					}
					else{
						fill(255,255,255);
					}
				}
				text(tooltipdraw.tip[i],10+tooltipdraw.x-tooltipdraw.w/2,40+tooltipdraw.y-tooltipdraw.h/2+20*i);
			}
		}
			rectMode(CORNER);
	}
//============Particles=============
textAlign(CENTER,CENTER);
ellipseMode(CENTER);
for(i=0;i<particles.length;i+=1){
	if(particles[i].size<0||particles[i].opacity<0){
		particles.splice(i,1);
		i-=1;
	}
}
for(i=0;i<particles.length;i+=1){if(render||!(loaded)){
		fill(particles[i].r,particles[i].g,particles[i].b,particles[i].opacity);
		if(particles[i].type=='circle'){
			if(particles[i].relative){
				ellipse(400+particles[i].x-playertemp.x,350+particles[i].y-playertemp.y,particles[i].size,particles[i].size);
			}
			else{
				ellipse(particles[i].x,particles[i].y,particles[i].size,particles[i].size);
			}
		}
		else if(particles[i].type=='text'){
			textFont(0,particles[i].size);
			if(particles[i].relative){
				text(particles[i].name,400+particles[i].x-playertemp.x,350+particles[i].y-playertemp.y);
			}
			else{
				text(particles[i].name,particles[i].x,particles[i].y);
			}
}}
		particles[i].x+=particles[i].xvelo;
		particles[i].xvelo+=particles[i].xveloc;
		particles[i].y+=particles[i].yvelo;
		particles[i].yvelo+=particles[i].yveloc;
		particles[i].size+=particles[i].sizec;
		particles[i].opacity+=particles[i].opacityc;
}
for(y=0;y<dmgind.length;y+=1){
	if(dmgind[y].size<5){
		dmgind.splice(y,1);
		y-=1;
	}
}
textAlign(CENTER,CENTER);
for(y=0;y<dmgind.length;y+=1){if(render){
		fill(dmgind[y].r,dmgind[y].g,dmgind[y].b);
			textFont(0,dmgind[y].size);
text(dmgind[y].text,400+dmgind[y].x-playertemp.x,350+dmgind[y].y-playertemp.y);}
			if(dmgind[y].t<=1){
				dmgind[y].size*=1.5;
			}
			else if(dmgind[y].t>=24){
				dmgind[y].size*=0.9;
			}
			dmgind[y].t+=1;
}
textAlign(LEFT,TOP);
if(helpscreen.active){
	helpscreen.help();
}
if(dialog){
	dialog();
}
}
}
void mouseClicked(){
	if(loaded==0){
		if(mode){
			if(cursorbox(1093,1128,5,40)){
				mode=0;
			}
		}
		else{
			if(mouseX>1080&mouseX<1120&mouseY>12&mouseY<52){
				if(urf){
					urf=0;
				}
				else{
					urf=1;
				}
			}
			if(cursorbox(400,600,570,670)){
				menuscreentemp[4]=0;
				particles=new Array();
				mode=1;
			}
			//NEW GAME======================================
			if(!(textinput=='')&mouseX>50&mouseX<250&mouseY>350&mouseY<450){
				saveStrings("namecache.txt",[textinput,1]);
				player={
					baseStats:{
						hp:100,
						hpregen:3,
						mp:100,
						mpregen:3,
						armor:0,
						res:0,
						str:30,
						intel:30,
						speed:4,
						size:6,
						haste:1
					},
					keystonestats:{
						hp:0,
						hpregen:0,
						mp:0,
						mpregen:0,
						armor:0,
						res:0,
						str:0,
						intel:0,
						speed:0,
						size:0,
						haste:0,
						power:0,
						fortitude:0,
						omnipotency:0
					},
					keystonepassives:new Array(9999),
					passivemults:{
						power:{
							hp:0,
							hpregen:0,
							str:1,
							intel:1,
							armor:0,
							res:0
						},
						fortitude:{
							hp:1,
							hpregen:1,
							str:0,
							intel:0,
							armor:1,
							res:1
						},
						omnipotency:{
							hp:1,
							hpregen:1,
							str:1,
							intel:1,
							armor:1,
							res:1
						},
					},
					hp:100,
					mp:100,
					//Normal spd:4
					speed:4,
					maxhp:100,
					maxmp:100,
					size:6,
					level:1,
					traction:0.9,
					biomeID:1
					,
					hpregen:3,
					mpregen:3,
					armor:0,
					res:0,
					str:30,
					intel:30,
					haste:1,
					rcostm:[1,1],
					name:textinput,
					xp:0,
					xpr:100,
					sp:100,
					pp:500,
					reactant:200,
					record:{
						enemies:new Array(9999),
						bosses:new Array(999),
						atlas:new Array(9999),
						biomes:new Array(9999),
						keystones:new Array(9999)
					},
					passives:new Array(99),
					activetraits:{
						shift:0,
						space:0,
						q:0,
						e:0
					},
					traits:new Array(9999),
					inventory:{
						LH:0,
						RH:0,
						bag:new Array(225)
						}
				};
				for(i=1;i<9999;i+=1){
					player.traits[i]={};
				}
				for(i=0;i<9999;i+=1){
					player.keystonepassives[i]=0;
				}
				for(i=0;i<9999;i+=1){
					player.record.enemies[i]=0;
				}
				for(i=0;i<9999;i+=1){
					player.record.atlas[i]=0;
				}
				player.record.atlas[2]=2;
				for(i=0;i<9999;i+=1){
					player.record.biomes[i]=0;
				}
				for(i=0;i<9999;i+=1){
					player.record.keystones[i]=0;
				}
				for(i=0;i<99;i+=1){
					player.passives[i]=0;
				}
				for(i=0;i<999;i+=1){
					player.record.bosses[i]=0;
				}
				updateplayerdat();
				loadtraits();
				recalstats();
				loadkeystoneps();
				if(options.loadAudio){
				bgm.stop();
				}
				getplayersprite();
				loadArea();
				loaded=1;
			}
			//LOAD GAME=============================================
			else if(!(textinput=='')&mouseX>400&mouseX<600&mouseY>350&mouseY<450){
					menuscreentemp[3]=1;
				if(loadStrings('player '+textinput+'.txt')){
					saveStrings("namecache.txt",[textinput,1]);
					temp=loadStrings('player '+textinput+'.txt');
					player=JSON.parse(temp[0]);
					updateplayerdat();
					loadtraits();
					recalstats();
					loadkeystoneps();
					if(player.activetraits.shift>0){
						playertemp.activetraitsprites.shift=loadShape('Data/Graphics/traits/'+player.activetraits.shift+'.svg');
					}
					if(player.activetraits.space>0){
						playertemp.activetraitsprites.space=loadShape('Data/Graphics/traits/'+player.activetraits.space+'.svg');
					}
					if(player.activetraits.q>0){
						playertemp.activetraitsprites.q=loadShape('Data/Graphics/traits/'+player.activetraits.q+'.svg');
					}
					if(player.activetraits.e>0){
						playertemp.activetraitsprites.e=loadShape('Data/Graphics/traits/'+player.activetraits.e+'.svg');
					}
					if(player.name=="Wizard"){
						console.log(player);
					}
					console.log(JSON.stringify(player).substring(0,200000));
					console.log(JSON.stringify(player).substring(200000,400000));
					if(options.loadAudio){
					bgm.stop();
					}
					getplayersprite();
					loadArea();
					loaded=1;
				}
			}
			else if(menuscreentemp[0]&mouseX>800&mouseX<1000&mouseY>270&mouseY<370){
					temp=loadStrings('player '+loadStrings("namecache.txt")[0]+'.txt');
					player=JSON.parse(temp[0]);
					updateplayerdat();
					loadtraits();
					recalstats();
					loadkeystoneps();
					if(player.activetraits.shift>0){
						playertemp.activetraitsprites.shift=loadShape('Data/Graphics/traits/'+player.activetraits.shift+'.svg');
					}
					if(player.activetraits.space>0){
						playertemp.activetraitsprites.space=loadShape('Data/Graphics/traits/'+player.activetraits.space+'.svg');
					}
					if(player.activetraits.q>0){
						playertemp.activetraitsprites.q=loadShape('Data/Graphics/traits/'+player.activetraits.q+'.svg');
					}
					if(player.activetraits.e>0){
						playertemp.activetraitsprites.e=loadShape('Data/Graphics/traits/'+player.activetraits.e+'.svg');
					}
					if(player.name=="Wizard"){
						console.log(player);
					}
					console.log(JSON.stringify(player).substring(0,200000));
					console.log(JSON.stringify(player).substring(200000,400000));
					if(options.loadAudio){
					bgm.stop();
					}
					getplayersprite();
					loadArea();
					loaded=1;
			}
			else if(mouseX>150&mouseX<450&mouseY>600&mouseY<700){
				if(!(importdata[0]=="Insert import data here.")){
				player=importdata[0];
					saveStrings("namecache.txt",[player.name,1]);
				updateplayerdat();
				loadtraits();
				recalstats();
				loadkeystoneps();
				if(player.activetraits.shift>0){
					playertemp.activetraitsprites.shift=loadShape('Data/Graphics/traits/'+player.activetraits.shift+'.svg');
				}
				if(player.activetraits.space>0){
					playertemp.activetraitsprites.space=loadShape('Data/Graphics/traits/'+player.activetraits.space+'.svg');
				}
				if(player.activetraits.q>0){
					playertemp.activetraitsprites.q=loadShape('Data/Graphics/traits/'+player.activetraits.q+'.svg');
				}
				if(player.activetraits.e>0){
					playertemp.activetraitsprites.e=loadShape('Data/Graphics/traits/'+player.activetraits.e+'.svg');
				}
				if(player.name=="Wizard"){
					console.log(player);
				}
				if(options.loadAudio){
				bgm.stop();
				}
				getplayersprite();
				loadArea();
				loaded=1;
			}
		}
		}
	}
}
void mouseMoved(){
	movemousef();
}
var updateplayerdat=function(){
	player.stun=0;
	if(!(player.sp)){
		player.sp=0;
	}
	if(!(player.biomeID)){
		player.biomeID=1;
	}
		if(!(player.record.bosses)){
			player.record.bosses=new Array(999);
			for(i=0;i<999;i+=1){
				player.record.bosses[i]=0;
			}
		}
		if(!(player.record.quests)){
			player.record.quests=new Array(999);
			for(i=0;i<999;i+=1){
				player.record.quests[i]=0;
			}
		}
		if(!(player.record.biocomp)){
			player.record.biocomp=new Array(99999);
			for(i=0;i<99999;i+=1){
				player.record.biocomp[i]=0;
			}
		}
		if(!(player.record.prefixes)){
			player.record.prefixes=new Array(9999);
			for(i=0;i<9999;i+=1){
				player.record.prefixes[i]=0;
			}
		}
		if(!(player.record.suffixes)){
			player.record.suffixes=new Array(9999);
			for(i=0;i<9999;i+=1){
				player.record.suffixes[i]=0;
			}
		}
		if(!(player.record.keyitems)){
			player.record.keyitems=new Array(9999);
			for(i=0;i<9999;i+=1){
				player.record.keyitems[i]=0;
			}
		}
		if(!(player.reactant)){
			player.reactant=0;
		}
		if(!(player.gameversion==version)){
			console.log("updating player data");
			//=============CROSS VERSION UPDATING======================
			player.passives[0]-=player.keystonestats.power;
			player.passives[1]-=player.keystonestats.fortitude;
			player.passives[2]-=player.keystonestats.omnipotency;
			player.keystonestats={
					hp:0,
					hpregen:0,
					mp:0,
					mpregen:0,
					armor:0,
					res:0,
					str:0,
					intel:0,
					speed:0,
					size:0,
					haste:0,
					power:0,
					fortitude:0,
					omnipotency:0
				};
				player.keystonepassives=new Array(9999);
				for(cv=0;cv<9999;cv+=1){
					player.keystonepassives[cv]=0;
				}
				player.passivemults={
					power:{
						hp:0,
						hpregen:0,
						str:1,
						intel:1,
						armor:0,
						res:0
					},
					fortitude:{
						hp:1,
						hpregen:1,
						str:0,
						intel:0,
						armor:1,
						res:1
					},
					omnipotency:{
						hp:1,
						hpregen:1,
						str:1,
						intel:1,
						armor:1,
						res:1
					},
				};
			for(cv=1;cv<9999;cv+=1){
				if(player.record.keystones[cv]>0){
					stemp=split(keystones[cv*50+player.record.keystones[cv]*5+1],"/");
					player.keystonestats.hp+=Number(stemp[0]);
					player.keystonestats.hpregen+=Number(stemp[1]);
					player.keystonestats.mp+=Number(stemp[2]);
					player.keystonestats.mpregen+=Number(stemp[3]);
					player.keystonestats.str+=Number(stemp[4]);
					player.keystonestats.intel+=Number(stemp[5]);
					player.keystonestats.armor+=Number(stemp[6]);
					player.keystonestats.res+=Number(stemp[7]);
					player.keystonestats.speed+=Number(stemp[8]);
					player.keystonestats.size+=Number(stemp[9]);
					player.keystonestats.haste+=Number(stemp[10]);
					player.keystonestats.power+=Number(stemp[11]);
					player.passives[0]+=Number(stemp[11]);
					player.keystonestats.fortitude+=Number(stemp[12]);
					player.passives[1]+=Number(stemp[12]);
					player.keystonestats.omnipotency+=Number(stemp[13]);
					player.passives[2]+=Number(stemp[13]);
					stemp=split(keystones[cv*50+player.record.keystones[cv]*5+2],"/");
					player.passivemults.power.hp+=Number(stemp[0]);
					player.passivemults.power.hpregen+=Number(stemp[1]);
					player.passivemults.power.str+=Number(stemp[2]);
					player.passivemults.power.intel+=Number(stemp[3]);
					player.passivemults.power.armor+=Number(stemp[4]);
					player.passivemults.power.res+=Number(stemp[5]);
					player.passivemults.fortitude.hp+=Number(stemp[6]);
					player.passivemults.fortitude.hpregen+=Number(stemp[7]);
					player.passivemults.fortitude.str+=Number(stemp[8]);
					player.passivemults.fortitude.intel+=Number(stemp[9]);
					player.passivemults.fortitude.armor+=Number(stemp[10]);
					player.passivemults.fortitude.res+=Number(stemp[11]);
					player.passivemults.omnipotency.hp+=Number(stemp[12]);
					player.passivemults.omnipotency.hpregen+=Number(stemp[13]);
					player.passivemults.omnipotency.str+=Number(stemp[14]);
					player.passivemults.omnipotency.intel+=Number(stemp[15]);
					player.passivemults.omnipotency.armor+=Number(stemp[16]);
					player.passivemults.omnipotency.res+=Number(stemp[17]);
					if(keystones[cv*50+player.record.keystones[cv]*5+3]){
						stemp=split(keystones[cv*50+player.record.keystones[cv]*5+3],",");
						for(gksp=0;gksp<stemp.length;gksp+=1){
							player.keystonepassives[Number(split(stemp[gksp],"/")[0])]+=Number(split(stemp[gksp],"/")[1]);
						}
					}
				}
			}
		}
	player.gameversion=version;
}
	console.log(ascii);
void keyPressed(){
	if(!(loaded)){
		if(keyCode==8){
			textinput=textinput.substring(0,textinput.length-1);
		}
		else if(ascii[key.code]){
			textinput+=ascii[key.code];
		}
	}
}