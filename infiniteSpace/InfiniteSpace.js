var version="DEMO 0.3b";
void setup(){
  size(1000,700);
  frameRate(60);  
}
var tick=0;
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
	music:0.7,
	sfx:0.7
};
var enemies=new Array();
var projectiles=new Array();
var objects=new Array();
var controlmode=0;
var ingame=0;
var menumode=0;
var getshipstatcolor=function(val){
	if(val<2){
		fill(255,0,0);
	}
	else if(val<3){
		fill(255,150,0);
	}
	else if(val<5){
		fill(255,255,50);
	}
	else if(val<7){
		fill(0,255,0);
	}
	else if(val<9){
		fill(0,0,255);
	}
	else{
		fill(100,100,255);
	}
}
var shoot=[
	function(){
		player.shootcd=7;
		if(player.ammo>4){
			player.ammo-=4;
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
					speed:25,
					scans:3,
					size:9,
					damage:15,
					isSingleTarget:true
				});
			}
			sfx.minigun.rate(random(0.9,1.1));
			sfx.minigun.play();
		}
		else{
			if(player.mods[8]){
				player.shield=max(0,player.shield-4.5);
			}
			sfx.click.rate(random(0.9,1.1));
			sfx.click.play();
		}
	},
	function(){
		player.shootcd=15;
		if(player.ammo>10){
			player.ammo-=10;
			append(projectiles,{
				target:1,
				draw:function(){
					ellipseMode(CENTER);
					fill(180,200,255);
					triangle(projectiles[a].x-10,projectiles[a].y,projectiles[a].x+10,projectiles[a].y,projectiles[a].x,projectiles[a].y-15);
					triangle(projectiles[a].x-10,projectiles[a].y,projectiles[a].x+10,projectiles[a].y,projectiles[a].x,projectiles[a].y+15);
					if(options.graphics){
						fill(200,200,255,10);
						for(b=0;b<10;b+=1){
							ellipse(projectiles[a].x,projectiles[a].y,10+b*3,10+b*3);
						}
					}
				},
				x:player.x,
				y:player.y,
				end:1,
				pierce:0,
				dir:0,
				speed:20,
				scans:2,
				size:16,
				damage:50,
				onend:function(){
				sfx.glacialhit.rate(random(0.9,1.1));
				sfx.glacialhit.play();
					for(b=0;b<12;b+=1){
						append(projectiles,{
							target:1,
							draw:function(){
								ellipseMode(CENTER);
								fill(180,200,255);
								triangle(projectiles[a].x-6,projectiles[a].y,projectiles[a].x+6,projectiles[a].y,projectiles[a].x,projectiles[a].y-10);
								triangle(projectiles[a].x-6,projectiles[a].y,projectiles[a].x+6,projectiles[a].y,projectiles[a].x,projectiles[a].y+10);
								if(options.graphics){
									fill(200,200,255,10);
									for(b=0;b<8;b+=1){
										ellipse(projectiles[a].x,projectiles[a].y,7+b*2.5,7+b*2.5);
									}
								}
							},
							x:projectiles[a].x,
							y:projectiles[a].y,
							hits:projectiles[a].hits,
							dur:10,
							pierce:0,
							dir:random(2*PI),
							speed:20,
							scans:2,
							size:14,
							damage:10
						});
					}
				}
			});
			sfx.glacialshoot.rate(random(0.9,1.1));
			sfx.glacialshoot.play();
		}
		else{
			if(player.mods[8]){
				player.shield=max(0,player.shield-17.5);
			}
			sfx.click.rate(random(0.9,1.1));
			sfx.click.play();
		}
	},
	function(){
		player.shootcd=6;
		if(player.ammo>3.5){
			player.ammo-=3.5;
			append(projectiles,{
				target:1,
				draw:function(){
					ellipseMode(CENTER);
					fill(20,140,60);
					ellipse(projectiles[a].x,projectiles[a].y+30,projectiles[a].size,projectiles[a].size);
					ellipse(projectiles[a].x,projectiles[a].y,projectiles[a].size*2,projectiles[a].size*2);
					if(options.graphics){
						fill(70,200,50,10);
						for(b=0;b<6;b+=1){
							ellipse(projectiles[a].x,projectiles[a].y,projectiles[a].size*2+b*2,projectiles[a].size*2+b*4);
						}
						append(particles,{x:projectiles[a].x+random(-projectiles[a].size,projectiles[a].size),y:projectiles[a].y+random(-projectiles[a].size,projectiles[a].size),xvelo:random(-5,5),yvelo:random(-8,-3),
						size:random(7,10),op:random(180,220),opc:-12,exp:1,color:[random(40,60),random(100,120),random(70,90)]});
					}
				},
				run:function(){
					projectiles[a].size+=1;
				},
				x:player.x,
				y:player.y,
				dur:18,
				pierce:999,
				dir:0,
				speed:15,
				scans:2,
				size:15,
				damage:10
			});
			sfx.incinerate.rate(random(0.93,1.07));
			sfx.incinerate.play();
		}
		else{
			if(player.mods[8]){
				player.shield=max(0,player.shield-4.5);
			}
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
								projectiles[b].scans*=2;
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
	function(){
		player.shootcd=5;
		player.specialcd=15;
		if(player.energy>=1){
			player.shootcd=20;
			player.specialcd=240;
			player.energy-=1;
			sfx.distortion.rate(random(0.9,1.1));
			sfx.distortion.play();
			playertemp.crystalstorm=240;
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
		ellipse(player.x,player.y,86+(abs(tick%12-6)-3)*min(20,player.shieldboing)/3,100+(abs((tick+6)%12-6)-3)*min(20,player.shieldboing)/3);
	},
	function(){
		ellipseMode(CENTER);
		fill(150,170,215+abs(tick%40-20)*2,110+abs(tick%60-30));
		ellipse(player.x,player.y,95+(abs(tick%12-6)-3)*min(20,player.shieldboing)/3,95+(abs((tick+6)%12-6)-3)*min(20,player.shieldboing)/3);
	},
	function(){
		ellipseMode(CENTER);
		fill(40,170+abs(tick%40-20)*2,150,70+abs(tick%60-30));
		ellipse(player.x,player.y,70+(abs(tick%12-6)-3)*min(20,player.shieldboing)/3,115+(abs((tick+6)%12-6)-3)*min(20,player.shieldboing)/2.5);
	},
	function(){
		ellipseMode(CENTER);
		fill(200+abs(tick%40-20)*2,50,80,120+abs(tick%60-30));
		ellipse(player.x,player.y,130+(abs(tick%12-6)-3)*min(20,player.shieldboing)/2,130+(abs((tick+6)%12-6)-3)*min(20,player.shieldboing)/2);
	},
];
var playerdraw=[
	function(){
		shape(sprites.astrohawk,player.x,player.y,450,600);
	},
	function(){
		shape(sprites.crystalvanguard,player.x,player.y,450,600);
	},
	function(){
		shape(sprites.fairgravesvessel,player.x,player.y,450,600);
		if(tick%2==0){
			append(objects,{
				x:player.x,
				y:player.y,
				dur:15,
				draw:function(){
					fill(0,150,75,objects[a].dur*4);
					ellipseMode(CENTER);
					ellipse(objects[a].x,objects[a].y,45,90);
				},
				run:function(){
					objects[a].dur-=1;
					if(objects[a].dur<=0){
						objects.splice(a,1);
						a-=1;
					}
				}
			});
		}
	},
	function(){
		shape(sprites.cybersphere,player.x,player.y,450,600);
	},
];
var applyshipstats=[
	function(){
		player.shipId=0;
		player.shipName="Astro Hawk";
		player.hp=100;
		player.mhp=100;
		player.shield=40;
		player.mshield=40;
		player.energy=10;
		player.menergy=10;
		player.shieldregen=7;
		player.shielddecay=10;
		player.speed=7;
		player.ammor=18;
		player.size=20;
		player.shipfuncs={};
	},
	function(){
		player.shipId=1;
		player.shipName="Crystal Vanguard";
		player.hp=40;
		player.mhp=40;
		player.shield=33;
		player.mshield=33;
		player.energy=8;
		player.menergy=8;
		player.shieldregen=5.5;
		player.shielddecay=8;
		player.speed=6.2;
		player.ammor=20;
		player.size=20;
		player.shipfuncs={
			passive:function(){
				if(playertemp.crystalstorm>0){
					if(playertemp.crystalstorm<60){
						fill(160+abs(tick%30-15)*5,40,60,255-playertemp.crystalstorm*3);
						triangle(player.x-40,player.y,player.x+40,player.y,player.x,player.y-55);
						triangle(player.x-40,player.y,player.x+40,player.y,player.x,player.y+55);
					}
					playertemp.crystalstorm-=1;
					append(objects,{
						x1:player.x+random(-90,90),
						y1:player.y+random(-90,90),
						x2:player.x+random(-90,90),
						y2:player.y+random(-90,90),
						x3:player.x+random(-90,90),
						y3:player.y+random(-90,90),
						dur:6,
						draw:function(){
							fill(160+abs(tick%30-15)*5,210,255,objects[a].dur*15);
							triangle(objects[a].x1-6,objects[a].y1,objects[a].x1+6,objects[a].y1,objects[a].x1,objects[a].y1-10);
							triangle(objects[a].x1-6,objects[a].y1,objects[a].x1+6,objects[a].y1,objects[a].x1,objects[a].y1+10);
							triangle(objects[a].x2-6,objects[a].y2,objects[a].x2+6,objects[a].y2,objects[a].x2,objects[a].y2-10);
							triangle(objects[a].x2-6,objects[a].y2,objects[a].x2+6,objects[a].y2,objects[a].x2,objects[a].y2+10);
							triangle(objects[a].x3-6,objects[a].y3,objects[a].x3+6,objects[a].y3,objects[a].x3,objects[a].y2-10);
							triangle(objects[a].x3-6,objects[a].y3,objects[a].x3+6,objects[a].y3,objects[a].x3,objects[a].y2+10);
						},
						run:function(){
							objects[a].dur-=1;
							if(objects[a].dur<=0){
								objects.splice(a,1);
								a-=1;
							}
						}
					});
					if(tick%6==0){
						for(b=0;b<enemies.length;b+=1){
							if(playerhitbox(enemies[b].x,enemies[b].y,enemies[b].size+95)){
								enemies[b].hp-=dealdamage(12,b);
								sfx.hit.rate(random(0.8,1.2));
								sfx.hit.volume(0.6);
								sfx.hit.play();
								for(cp=0;cp<6;cp+=1){
									append(particles,{x:enemies[b].x+random(-enemies[b].size,enemies[b].size),y:enemies[b].y+random(-enemies[b].size,enemies[b].size),xvelo:random(-2,2),yvelo:random(-2,2),
									size:random(7,10),op:random(120,180),opc:-7,exp:1,color:[random(200,255),random(120,160),random(70,120)]});
								}
							}
						}
					}
				}
			},
			dmgtaken:function(){
				if(playertemp.crystalstorm>0){
					dmg.dmg=max(0,dmg.dmg-5);
					dmg.dmg*=0.25;
				}
			}
		};
	},
	function(){
		player.shipId=2;
		player.shipName="Fairgrave's Vessel";
		player.hp=80;
		player.mhp=80;
		player.shield=25;
		player.mshield=25;
		player.energy=7;
		player.menergy=7;
		player.shieldregen=4;
		player.shielddecay=6;
		player.speed=8.2;
		player.ammor=16;
		player.size=22;
		player.shipfuncs={
			passive:function(){
				if(player.energy>0.05){
					playertemp.cannotdie=1;
				}
				else{
					playertemp.cannotdie=0;
				}
				if(player.hp<0){
					player.energy+=player.hp/6000;
				}
			},
			onkill:function(a){
				player.hp=min(player.mhp,player.hp+(enemies[a].mhp/60)*(2-player.hp/player.mhp));
			}
		};
	},
	function(){
		player.shipId=3;
		player.shipName="Cyber Sphere";
		player.hp=180;
		player.mhp=180;
		player.shield=56;
		player.mshield=56;
		player.energy=12;
		player.menergy=12;
		player.shieldregen=9.5;
		player.shielddecay=12;
		player.speed=2.3;
		player.ammor=18;
		player.size=30;
		player.shipfuncs={};
	},
];
var applymods=function(){
	player.modfuncs={
		passive:new Array(),
		damagetaken:new Array(),
		damagetakenps:new Array(),
		damagedealt:new Array(),
	};
	if(player.mods[0]){
		player.mhp*=1.5;
		player.hp*=1.5;
		player.speed*=0.85;
	}
	if(player.mods[1]){
		player.mshield*=0.8;
		player.shield*=0.8;
		append(player.modfuncs.passive,function(){
			player.energy=min(player.menergy,player.energy+0.0008+player.menergy*0.00004);
		});
		append(player.modfuncs.damagetakenps,function(){
			if(random(1)<0.4){
				dmg.dmg*=1.5;
				for(cp=0;cp<dmg.dmg*2;cp+=1){
					append(particles,{x:player.x+random(-player.size,player.size),y:player.y+random(-player.size,player.size),xvelo:random(-2,2),yvelo:random(-2,2),
					size:random(7,10),op:random(120,180),opc:-7,exp:1,color:[random(200,255),random(160,190),random(70,120)]});
				}
			}
		});
	}
	if(player.mods[2]){
		player.mshield*=1.5;
		player.shield*=1.5;
		player.menergy*=0.3;
		player.energy*=0.3;
	}
	if(player.mods[3]){
		append(player.modfuncs.passive,function(){
			if(player.shield<player.mshield*0.5){
				if(player.energy>=0.003){
					player.energy-=0.003;
					player.shield+=0.06+player.mshield*0.0015;
					append(particles,{x:player.x+random(-player.size,player.size),y:player.y+random(-player.size,player.size),xvelo:random(-2,2),yvelo:random(-2,2),
					size:random(7,10),op:random(120,180),opc:-10,exp:1,color:[random(60,100),random(150,200),random(200,255)]});
				}
				if(!(player.shielding)){
					if(player.energy>=0.0015){
						player.energy-=0.0015;
						player.shield+=0.06+player.mshield*0.0015;
						append(particles,{x:player.x+random(-player.size,player.size),y:player.y+random(-player.size,player.size),xvelo:random(-2,2),yvelo:random(-2,2),
						size:random(7,10),op:random(120,180),opc:-10,exp:1,color:[random(60,100),random(150,200),random(200,255)]});
					}
				}
			}
		});
	}
	if(player.mods[4]){
		append(player.modfuncs.damagetaken,function(){
			playertemp.mobileshield=dmg.dmg/20;
		});
		append(player.modfuncs.damagetakenps,function(){
			dmg.dmg+=playertemp.mobileshield;
		});
	}
	if(player.mods[6]){
		append(player.modfuncs.passive,function(){
			if(playertemp.timesincedamagetaken>240){
				if(player.hp<player.mhp&player.energy>0.002){
					player.energy-=0.002;
					player.hp+=0.0002+player.mhp*0.0001;
					append(particles,{x:player.x+random(-player.size,player.size),y:player.y+random(-player.size,player.size),xvelo:random(-2,2),yvelo:random(-2,2),
					size:random(7,10),op:random(120,180),opc:-7,exp:1,color:[random(60,100),random(150,190),random(90,130)]});
				}
			}
		});
	}
	if(player.mods[7]){
		append(player.modfuncs.passive,function(){
			player.energy=max(0,player.energy-0.001);
		});
		append(player.modfuncs.damagetaken,function(){
			playertemp.energycapacitor=dmg.dmg;
		});
		append(player.modfuncs.damagetakenps,function(){
			player.energy=min(player.menergy,player.energy+(playertemp.energycapacitor-dmg.dmg)/30);
		});
	}
	if(player.mods[10]){
		append(player.modfuncs.damagedealt,function(edmg,target){
			player.energy=min(player.menergy,player.energy+edmg/300);
		});
		append(player.modfuncs.damagetaken,function(){
			player.energy=max(0,player.energy-dmg.dmg/30);
		});
		append(player.modfuncs.damagetakenps,function(){
			player.energy=max(0,player.energy-dmg.dmg/30);
		});
	}
	if(player.mods[11]){
		append(player.modfuncs.damagedealt,function(edmg,target){
			dmg*=1.5;
			if(!(playertemp.heavyimpact)){
				playertemp.heavyimpact=0;
			}
			playertemp.heavyimpact+=edmg;
			while(playertemp.heavyimpact>5){
				playertemp.heavyimpact-=5;
				append(projectiles,{
					target:0,
					draw:function(){
						ellipseMode(CENTER);
						fill(100,80,60);
						ellipse(projectiles[a].x,projectiles[a].y,14,14);
						if(options.graphics){
							if(projectiles[a].target){
								fill(0,0,255,10);
							}
							else{
								fill(255,0,0,10);
							}
							for(b=0;b<7;b+=1){
								ellipse(projectiles[a].x,projectiles[a].y,b*10,b*10);
							}
						}
					},
					x:enemies[target].x,
					y:enemies[target].y,
					end:0,
					dur:90,
					pierce:0,
					dir:random(2*PI),
					speed:4,
					size:10,
					damage:6
				});
			}
		});
	}
	if(player.mods[12]){
		player.mhp*=0.65;
		player.hp*=0.65;
		player.menergy*=1.5;
		player.energy*=1.5;
	}
}
var playertemp={};
var mods=[
	{name:"Reinforced Hull",desc:"Extra plating for survivability",pro:"Increases ship health by 50%",con:"Reduces speed by 15%"},
	{name:"Reactors",desc:"Adds reactors to your ship",pro:"Passively generates energy",con:"Hits to your ship (after shields) have a 40% chance to deal 150% damage, reduces maximum shield by 20%"},
	{name:"Augmented Shields",desc:"Rerouts most of your ship's batteries to its shield",pro:"Increases maximum shields by 50%",con:"Reduces maximum energy by 70%"},
	{name:"Shield Recharger",desc:"Activates while below 50% shield - recharge is doubled while not shielding",pro:"Rapidly recharges shield",con:"Uses energy"},
	{name:"Mobile Shield",desc:"Allows your ship's thrusters to bypass its shield",pro:"Allows movement while shielding",con:"Also allows 5% of damage to bypass shield"},
	{name:"Reactive Shield",desc:"Adds automatic collision detection to your ship",pro:"Your shield has a 50% chance to block hits even while inactive",con:"Uses energy"},
	{name:"Nano Repairbots",desc:"Adds repair bots on your ship",pro:"Passively repairs your ship if it hasn't taken damage recently",con:"Uses a fair amount of energy"},
	{name:"Energy Capacitor",desc:"Replaces your energy storage with a capacitor",pro:"Gain energy when your shield is hit",con:"Slowly lose energy passively"},
	{name:"Charged Weapons",desc:"Charges your main weapon",pro:"Increases rate of fire by 40%",con:"Attempting to fire without sufficient ammo damages your shield"},
	{name:"Rapid Reload",desc:"Boosts your ammo regeneration",pro:"Increases ammo recharge rate by 50%",con:"Your shield cannot recharge unless at full ammo"},
	{name:"Energized Feedback",desc:"Absorbs the entropy created from destruction",pro:"Gain energy when you deal damage",con:"Backfires when you take damage, losing energy (halved for damage blocked by shielding)"},
	{name:"Heavy Impact",desc:"Makes things go boom",pro:"Increases damage dealt by 50%",con:"Your hits fling debris which can hit you"},
	{name:"Additional Energy",desc:"Adds more batteries to store energy",pro:"Increases maximum energy by 50%",con:"Your ship becomes less structurally stable, reducing ship health by 35%."},
];
var ships=[
	{name:"Astrohawk",unlocked:1,sprite:"astrohawk",damage:6,health:5,shield:5,energy:10,speed:6,special:"Emits a screech which deals heavy damage to enemies caught in the AoE while reflecting enemy projectiles.",misc:"A well-rounded ship."},
	{name:"Crystal Vanguard",unlocked:1,sprite:"crystalvanguard",damage:7,health:2,shield:4,energy:8,speed:5,special:"Surrounds your ship with razor-sharp crystals which deal continuous damage to nearby enemies while greatly reducing damage taken.",misc:"Normal shots fragment on hit."},
	{name:"Fairgrave's Vessel",unlocked:1,sprite:"fairgravesvessel",damage:4,health:4,shield:3,energy:7,speed:7,special:"Unleashes raging spirits which fly around randomly.",misc:"Gain health on kill. Additionally, you cannot die while you have energy (lose energy based on health below 0)."},
	{name:"Cyber Sphere",sprite:"cybersphere",damage:9,health:9,shield:7,energy:12,speed:2,special:"Fire a steady laser of death.",misc:"Basically a flying fortress of doom."},
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
	shootcd:0,
	specialcd:0,
	movedir:0,
	score:0,
	deathtimer:0,
	mods:new Array(99),
	modfuncs:{
		passive:new Array(),
		damagetaken:new Array(),
	},
	shipfuncs:{}
};
var spawnplayer=function(){
	player.hpl=0;
	player.shielding=0;
	player.shieldboing=0;
	player.x=500;
	player.y=600;
	player.staticspeed=15;
	player.stun=0;
	player.shielddisable=0;
	player.ammo=100;
	player.shootcd=0;
	player.specialcd=0;
	player.movedir=0;
	player.score=0;
	player.deathtimer=0;
	playertemp={timesincedamagetaken:999};
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
		if(navigator.getGamepads()[0]){
			return({dir:ctrdir(),scl:ctrmov()});
		}
	}
	return({dir:0,scl:0});
}
var moveinf;
var temp;
var domove=function(){
	if(player.shielding&!(player.mods[4])){
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
		player.shielddisable=15;
		player.shield=0.1;
	}
	temp=player.shielding;
	player.shielding=0;
	if(player.shield>0&!(player.shielddisable)){
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
			if(navigator.getGamepads()[0]){
				if(navigator.getGamepads()[0].buttons[8].value||navigator.getGamepads()[0].buttons[9].value){
					player.shielding=1;
				}
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
		if(navigator.getGamepads()[0]){
			if(navigator.getGamepads()[0].buttons[1].value){
				input.shoot=1;
			}
			if(navigator.getGamepads()[0].buttons[0].value){
				input.special=1;
			}
		}
	}
}
var parallax=new Array();
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
			crystalvanguard:loadShape('Data/Graphics/ships/crystalvanguard.svg'),
			fairgravesvessel:loadShape('Data/Graphics/ships/fairgravesvessel.svg'),
			cybersphere:loadShape('Data/Graphics/ships/cybersphere.svg'),
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
			glacialshoot:new Howl({src: ['Data/Sound/sfx/glacial ward charge.wav'],autoplay:false,loop:false,volume:options.sfx*0.3}),
			glacialhit:new Howl({src: ['Data/Sound/sfx/glacial ward shatter.wav'],autoplay:false,loop:false,volume:options.sfx*0.2}),
			distortion:new Howl({src: ['Data/Sound/sfx/distortion.ogg'],autoplay:false,loop:false,volume:options.sfx*0.9}),
			incinerate:new Howl({src: ['Data/Sound/sfx/incinerate.ogg'],autoplay:false,loop:false,volume:options.sfx*0.9}),
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
var viewmod=0;
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
			if(options.stars>1){
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
var dmg;
var takedamage=function(dmgs){
	dmg=dmgs;
	for(z=0;z<player.modfuncs.damagetaken.length;z+=1){
		player.modfuncs.damagetaken[z]();
	}
	if(player.shipfuncs.dmgtaken){
		player.shipfuncs.dmgtaken();
	}
	dmg.blocked=0;
	if(player.shielding){
		dmg.blocked=true;
	}
	if(!(dmg.blocked)&(player.mods[5]&random(1)<=0.5&player.energy>=0.2)){
		dmg.blocked=true;
		player.energy-=0.2;
		dmg.dmg*=0.9;
	}
	if(dmg.blocked){
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
	for(z=0;z<player.modfuncs.damagetakenps.length;z+=1){
		player.modfuncs.damagetakenps[z]();
	}
	if(dmg.dmg>0){
		playertemp.timesincedamagetaken=0;
		sfx.hull.rate(random(0.9,1.1));
		sfx.hull.play();
		player.hp-=dmg.dmg;
		player.hpl+=dmg.dmg;
	}
}
var dealdamage=function(dmgs,target){
	dmg=dmgs;
	for(z=0;z<player.modfuncs.damagedealt.length;z+=1){
		player.modfuncs.damagedealt[z](min(enemies[target].hp,dmgs),target);
	}
	return(dmg);
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
var shootlock=0;
void draw(){
textAlign(TOP,LEFT);
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
	if(options.stars>0){
		if(tick%12==0){
			createstar(-100);
		}
		ellipseMode(CENTER);
		runpara();
	}
	//Run objects
	for(a=0;a<objects.length;a+=1){
		if(render){
			objects[a].draw();
		}
		if(objects[a].run){
			objects[a].run();
		}
	}
	//Run projectiles
	for(a=0;a<projectiles.length;a+=1){
		if(!(projectiles[a].scans)){
			projectiles[a].scans=1;
		}
		if(render){
			projectiles[a].draw();
		}
		if(projectiles[a].run){
			projectiles[a].run();
		}
		for(scn=0;scn<projectiles[a].scans;scn+=1){
			projectiles[a].x+=sin(projectiles[a].dir)*projectiles[a].speed/projectiles[a].scans;
			projectiles[a].y-=cos(projectiles[a].dir)*projectiles[a].speed/projectiles[a].scans;
			if(projectiles[a].target){
				if(!(projectiles[a].hits)){
					projectiles[a].hits=new Array();
				}
				for(b=0;b<enemies.length;b+=1){
					if(!(projectiles[a].pierce<0)){
						if(enemies[b].hp>0){
							if(projectiles[a].x-enemies[b].x<projectiles[a].size+enemies[b].size&projectiles[a].x-enemies[b].x>-projectiles[a].size-enemies[b].size&
							projectiles[a].y-enemies[b].y<projectiles[a].size+enemies[b].size&projectiles[a].y-enemies[b].y>-projectiles[a].size-enemies[b].size){
								if(canhitenemy()){
									projectiles[a].pierce-=1;
									append(projectiles[a].hits,enemies[b].id);
									enemies[b].hp-=dealdamage(projectiles[a].damage,b);
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
			}
			else{
				if(playerhitbox(projectiles[a].x,projectiles[a].y,projectiles[a].size)){
					takedamage({dmg:projectiles[a].damage});
					projectiles[a].exp=1;
				}
			}
		}
		if(projectiles[a].end==1){
			if(projectiles[a].y<-100){
				projectiles[a].exp=1;
			}
		}
		else if(projectiles[a].end==2){
			if(projectiles[a].y>800){
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
			if(projectiles[a].onend){
				projectiles[a].onend();
			}
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
			if(player.shipfuncs.onkill){
				player.shipfuncs.onkill(a);
			}
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
	if(player.hp<=0&!(playertemp.cannotdie)){
		if(player.deathtimer>60){
			if(input.shoot){
				spawnplayer();
				applyshipstats[player.shipId]();
				applymods();
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
		playertemp.timesincedamagetaken+=1;
		for(z=0;z<player.modfuncs.passive.length;z+=1){
			player.modfuncs.passive[z]();
		}
		if(player.shipfuncs.passive){
			player.shipfuncs.passive();
		}
		if(render&tick>2){
			playerdraw[player.shipId]();
		}
		if(player.shielddisable>0){
			player.shielddisable-=1;
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
						if(special[player.shipId]){
							special[player.shipId]();
						}
					}
				}
				else if(input.shoot){
					if(player.shootcd<=0){
						if(shoot[player.shipId]){
							shoot[player.shipId]();
						}
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
		if(player.mods[9]){
			player.ammo=min(100,player.ammo+player.ammor/120);
		}
		if(!(player.mods[9])||player.ammo==100){
			player.shield=min(player.mshield,player.shield+player.shieldregen/60);
		}
		if(player.shootcd>0){
			player.shootcd-=1;
			if(player.mods[8]){
				player.shootcd-=0.4;
			}
		}
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
			textFont(0,25);
			fill(150,150,150);
			text("Version: "+version,380,95);
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
			ellipse(750,600,100+abs(tick%120-60)/6,100+abs(tick%120-60)/6);
			noStroke();
			textFont(0,18);
			fill(255,255,200);
			text("Start",730,295);
			text("Game",725,315);
			text("Change",165,295);
			text("Ship",180,315);
			text("Ship",180,615);
			text("Options",720,605);
			textFont(0,14);
			text("Customize",170,595);
			if(pow(pow(player.x-750,2)+pow(player.y-300,2),0.5)<75&input.shoot){
				setbgm[choosebgm(-1)]();
				spawnplayer();
				applyshipstats[player.shipId]();
				applymods();
				player.staticspeed=0;
				gametick=0;
				ingame=1;
			}
			if(pow(pow(player.x-200,2)+pow(player.y-300,2),0.5)<75&input.shoot){
				menumode=1;
				viewmod=player.shipId;
				player.x=500;
				player.y=500;
			}
			if(pow(pow(player.x-200,2)+pow(player.y-600,2),0.5)<75&input.shoot){
				menumode=2;
				viewmod=0;
				player.x=500;
				player.y=500;
			}
			if(pow(pow(player.x-750,2)+pow(player.y-600,2),0.5)<75&input.shoot){
				menumode=3;
				player.x=500;
				player.y=500;
			}
		}
		else if(menumode==1){
			noFill();
			ellipseMode(CENTER);
			strokeWeight(20+abs(tick%120-60)/6);
			stroke(220,255,140+abs(tick%90-45));
			ellipse(770,50,100+abs(tick%120-60)/6,100+abs(tick%120-60)/6);
			noStroke();
			
			
			textAlign(CENTER);
			if(!(input.shoot)){
				shootlock=0;
			}
			for(a=0;a<ships.length;a+=1){
				if(ships[a].unlocked){
					if(player.shipId==a){
						fill(0,255,0);
					}
					else{
						noFill();
					}
					ellipseMode(CENTER);
					strokeWeight(20+abs(tick%120-60)/12);
					stroke(220,255,140+abs(tick%90-45));
					ellipse(150+floor(a/6)*120,50+(a%6)*120,100+abs(tick%120-60)/12,100+abs(tick%120-60)/12);
					noStroke();
					shape(sprites[ships[a].sprite],150+floor(a/6)*120,50+(a%6)*120,300,400);
					if(pow(pow(player.x-150-floor(a/6)*120,2)+pow(player.y-50-(a%6)*120,2),0.5)<55){
						viewmod=a;
						if(input.shoot&!(shootlock)){
							shootlock=1;
							player.shipId=a;
							menumode=0;
							spawnplayer();
							applyshipstats[player.shipId]();
							applymods();
						}
					}
				}
			}
			textAlign(CENTER);
			textFont(0,25);
			fill(255,255,255);
			text(ships[viewmod].name,500,130,400,100);
			textFont(0,22);
			fill(220,220,220);
			text(ships[viewmod].misc,500,210,400,120);
			fill(255,255,0);
			text("Special:  "+ships[viewmod].special,500,330,400,120);
			fill(255,255,255);
			textFont(0,20);
			text("Damage",550,445,100,50);
			text("Health",550,475,100,50);
			text("Shield",550,505,100,50);
			text("Speed",550,535,100,50);
			text("Energy",550,565,100,50);
			
			strokeWeight(3);
			stroke(0,0,0);
			getshipstatcolor(ships[viewmod].damage);
			for(a=0;a<ships[viewmod].damage;a+=1){
				rect(660+a*20,450,18,10,4);
			}
			getshipstatcolor(ships[viewmod].health);
			for(a=0;a<ships[viewmod].health;a+=1){
				rect(660+a*20,480,18,10,4);
			}
			getshipstatcolor(ships[viewmod].shield);
			for(a=0;a<ships[viewmod].shield;a+=1){
				rect(660+a*20,510,18,10,4);
			}
			getshipstatcolor(ships[viewmod].speed);
			for(a=0;a<ships[viewmod].speed;a+=1){
				rect(660+a*20,540,18,10,4);
			}
			getshipstatcolor(ships[viewmod].energy*0.7);
			for(a=0;a<ships[viewmod].energy;a+=1){
				rect(660+a*15,570,14,10,4);
			}
			noStroke();
			ellipseMode(CENTER);
			
			textFont(0,25);
			fill(255,255,200);
			text("Back",770,55);
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
			textFont(0,20);
			fill(255,255,200);
			textAlign(TOP,LEFT);
			text("Confirm",735,55);
			if(pow(pow(player.x-770,2)+pow(player.y-50,2),0.5)<75&input.shoot){
				menumode=0;
				spawnplayer();
				applyshipstats[player.shipId]();
				applymods();
			}
			textAlign(CENTER);
			if(!(input.shoot)){
				shootlock=0;
			}
			for(a=0;a<mods.length;a+=1){
				if(player.mods[a]){
					fill(0,255,0);
				}
				else{
					noFill();
				}
				strokeWeight(20+abs(tick%120-60)/12);
				stroke(220,255,140+abs(tick%90-45));
				ellipse(150+floor(a/6)*120,50+(a%6)*120,100+abs(tick%120-60)/12,100+abs(tick%120-60)/12);
				noStroke();
				textFont(0,14);
				fill(255,255,200);
				text(mods[a].name,125+floor(a/6)*120,25+(a%6)*120,55,55);
				if(pow(pow(player.x-150-floor(a/6)*120,2)+pow(player.y-50-(a%6)*120,2),0.5)<55){
					viewmod=a;
					if(input.shoot&!(shootlock)){
						shootlock=1;
						if(player.mods[a]){
							player.mods[a]=0;
						}
						else{
							player.mods[a]=1;
						}
					}
				}
			}
			textAlign(CENTER);
			textFont(0,25);
			fill(255,255,255);
			text(mods[viewmod].name,660,130,240,100);
			textFont(0,22);
			fill(220,220,220);
			text(mods[viewmod].desc,660,230,240,150);
			fill(0,255,0);
			text(mods[viewmod].pro,660,380,240,150);
			fill(255,0,0);
			text(mods[viewmod].con,660,530,240,150);
			if(player.mods[viewmod]){
				textFont(0,28);
				fill(100,100,255);
				text("SELECTED",700,650,200,50);
			}
			textAlign(TOP,LEFT);
			
		}
		else if(menumode==3){
			noFill();
			strokeWeight(20+abs(tick%120-60)/6);
			stroke(220,255,140+abs(tick%90-45));
			ellipseMode(CENTER);
			ellipse(770,50,100+abs(tick%120-60)/6,100+abs(tick%120-60)/6);
			noStroke();
			
			
			textAlign(CENTER);
			if(!(input.shoot)){
				shootlock=0;
			}
			if(options.stars>0){
				if(options.stars>1){
					fill(0,255,0,150);
				}
				else{
					fill(255,220,140,150);
				}
			}
			else{
				noFill();
			}
			strokeWeight(20+abs(tick%120-60)/6);
			stroke(220,255,140+abs(tick%90-45));
			ellipse(150,100,100+abs(tick%120-60)/6,100+abs(tick%120-60)/6);
			noStroke();
			textFont(0,16);
			fill(255,255,255);
			text("Stars",125,95,55,55);
			if(pow(pow(player.x-150,2)+pow(player.y-50,2),0.5)<75){
				if(input.shoot&!(shootlock)){
					shootlock=1;
					options.stars+=1;
					if(options.stars>2){
						options.stars=0;
					}
				}
			}
			if(options.graphics>0){
				fill(0,255,0,150);
			}
			else{
				noFill();
			}
			strokeWeight(20+abs(tick%120-60)/6);
			stroke(220,255,140+abs(tick%90-45));
			ellipse(150,220,100+abs(tick%120-60)/6,100+abs(tick%120-60)/6);
			noStroke();
			textFont(0,15);
			fill(255,255,255);
			text("Graphics",125,215,55,55);
			if(pow(pow(player.x-150,2)+pow(player.y-170,2),0.5)<75){
				if(input.shoot&!(shootlock)){
					shootlock=1;
					options.graphics+=1;
					if(options.graphics>1){
						options.graphics=0;
					}
				}
			}
			textAlign(TOP,LEFT);
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
			if(gametick%600==0){
				append(objects,{
					x:random(130,870),
					y:-30,
					draw:function(){
						fill(abs(tick%120-60)*2,255,abs(tick%120-60)*2,180+abs(tick%90-45));
						ellipseMode(CENTER);
						ellipse(objects[a].x,objects[a].y,20+abs(tick%50-25)/5,20+abs((tick+25)%50-25)/5);
					},
					run:function(){
						if(playerhitbox(objects[a].x,objects[a].y,15)){
							objects[a].y=999;
							player.energy=min(player.menergy,player.energy+1);
							for(cp=0;cp<30;cp+=1){
								append(particles,{x:random(15,85),y:random(340,360),xvelo:random(-2,2),yvelo:random(-6,-3),
								size:random(7,10),op:random(120,180),opc:-7,exp:1,color:[random(50,100),random(200,255),random(50,100)]});
							}
						}
						objects[a].y+=3;
						if(objects[a].y>730){
							objects.splice(a,1);
							a-=1;
						}
					}
				});
			}
			if(gametick%(round(35-min(10,max(0,gametick-7200)/720)))==0){
				if(random(1)<0.85-min(0.1,gametick/72000)){
					append(enemies,{
						name:"meteor",
						isTerrain:1,
						hp:40,
						mhp:40,
						size:15,
						x:random(100,900),
						xvelo:random(-1,1),
						y:-20,
						id:tick%6000,
						color:[random(40,80),random(20,60),random(0,40)],
						rockpos:[[random(-20,20),random(-20,20)],[random(-20,20),random(-20,20)],[random(-20,20),random(-20,20)],[random(-20,20),random(-20,20)]],
						draw:function(){
							ellipseMode(CENTER);
							if(options.graphics){
								fill(255,255,255,10);
								for(b=0;b<16;b+=1){
									ellipse(enemies[a].x,enemies[a].y,b*5,b*5);
								}
							}
							else{
								fill(255,255,255,10);
								for(b=0;b<4;b+=1){
									ellipse(enemies[a].x,enemies[a].y,b*20,b*20);
								}
							}
							fill(enemies[a].color[0],enemies[a].color[1],enemies[a].color[2]);
							ellipse(enemies[a].x,enemies[a].y,18,18);
							ellipse(enemies[a].x+enemies[a].rockpos[0][0],enemies[a].y+enemies[a].rockpos[0][1],15,15);
							ellipse(enemies[a].x+enemies[a].rockpos[1][0],enemies[a].y+enemies[a].rockpos[1][1],15,15);
							ellipse(enemies[a].x+enemies[a].rockpos[2][0],enemies[a].y+enemies[a].rockpos[2][1],15,15);
							ellipse(enemies[a].x+enemies[a].rockpos[3][0],enemies[a].y+enemies[a].rockpos[3][1],15,15);
						},
						run:function(){
							enemies[a].x+=enemies[a].xvelo;
							enemies[a].y+=2;
							if(playerhitbox(enemies[a].x,enemies[a].y,enemies[a].size)){
								enemies[a].exp=1;
								takedamage({dmg:10});
							}
							if(enemies[a].y>720||enemies[a].x>930||enemies[a].x<70){
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
						xvelo:random(-1.5,1.5),
						x:random(100,900),
						y:-20,
						id:tick%6000,
						ammo:0,
						color:[random(40,80),random(20,60),random(0,40)],
						rockpos:[[random(-20,20),random(-20,20)],[random(-20,20),random(-20,20)],[random(-20,20),random(-20,20)],[random(-20,20),random(-20,20)]],
						draw:function(){
							ellipseMode(CENTER);
							if(options.graphics){
								fill(255,255,255,10);
								for(b=0;b<16;b+=1){
									ellipse(enemies[a].x,enemies[a].y,b*5,b*5);
								}
							}
							else{
								fill(255,255,255,10);
								for(b=0;b<4;b+=1){
									ellipse(enemies[a].x,enemies[a].y,b*20,b*20);
								}
							}
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
							if(enemies[a].ammo>60){
								append(particles,{x:enemies[a].x+random(-enemies[a].size,enemies[a].size),y:enemies[a].y+random(enemies[a].size),xvelo:random(-2,2),yvelo:random(-2,2),
								size:random(7,10),op:random(160,200),opc:-7,exp:1,color:[random(120,150),random(100,130),random(30,55)]});
							}
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
												if(projectiles[a].target){
													fill(0,0,255,10);
												}
												else{
													fill(255,0,0,10);
												}
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
										damage:10,
										isSingleTarget:true
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
												if(projectiles[a].target){
													fill(0,0,255,10);
												}
												else{
													fill(255,0,0,10);
												}
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
										damage:9,
										isSingleTarget:true
									});
									append(projectiles,{
										target:0,
										timer:0,
										draw:function(){
											ellipseMode(CENTER);
											fill(100,80,20);
											ellipse(projectiles[a].x,projectiles[a].y,18,18);
											if(options.graphics){
												if(projectiles[a].target){
													fill(0,0,255,10);
												}
												else{
													fill(255,0,0,10);
												}
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
										damage:9,
										isSingleTarget:true
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
													if(projectiles[a].target){
														fill(0,0,255,10);
													}
													else{
														fill(255,0,0,10);
													}
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
											damage:7,
											isSingleTarget:true
										});
									}
								}
							}
							if(random(1)<0.03){
								enemies[a].xvelo=random(-1.5,1.5);
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
		rect(915,600-(max(0,min(1,player.hp/player.mhp)))*500,50,(max(0,min(1,player.hp/player.mhp)))*500);
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
		for(a=0;a<floor(player.energy);a+=1){
			rect(30,340-a*300/player.menergy-220/player.menergy,40,220/player.menergy,6);
		}
		if(player.energy%1>0){
			noStroke();
			rect(30,340-floor(player.energy)*300/player.menergy-220/player.menergy,player.energy%1*40,220/player.menergy,6);
		}
		noStroke();
		textFont(0,15);
		fill(255,100,150);
		text('FPS: '+fps.fps,920,680);
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
