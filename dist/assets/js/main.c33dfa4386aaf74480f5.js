(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{c0Aq:function(n,e,t){},dO7Y:function(n,e,t){"use strict";t.r(e);t("c0Aq"),t("wawO");var i=t("9ZTT"),o=t("Womt"),a=t("RyHr");new class{constructor(){this.init()}init(){var n=window.innerWidth,e=window.innerHeight,t=(this.app,new o.o);t.add(new o.f(1e3,100)),t.add(new o.b(20));var r=new o.l(75,n/e,.5,1e4),d=new o.u({antialias:true,preserveDrawingBuffer:true});d.setSize(n,e),document.body.appendChild(d.domElement),r.position.set(-50,50,50),r.lookAt(t.position),t.add(r),t.add(new o.a(16777215,.5));var s=new o.d(16777215,.35);s.position.set(1,1,1).normalize(),t.add(s);var w=new o.k,c=new o.k;new o.k,t.add(c,w);var u,h,l,p=new a.a(r,d.domElement),f=[],m=[],v=[],g=new o.g;function y(){(u=new i.World).gravity.set(0,-10,0);var n=new i.Plane,e=new i.Body({mass:0,shape:n});e.quaternion.setFromAxisAngle(new i.Vec3(0,1,0),-Math.PI/2),e.position.set(25,0,0),m.push(e),u.add(e);var a=new i.Body({mass:0,shape:n});a.position.set(-25,0,0),a.quaternion.setFromAxisAngle(new i.Vec3(0,1,0),-Math.PI/2),m.push(a),u.add(a);var r=new i.Box(new i.Vec3(.5,.5,.5));(h=new i.Body({mass:5,position:new i.Vec3(0,5,0),shape:r})).position.set(Math.random()-.5,8,Math.random()-.5);var d=new o.n;h.quaternion.copy(d),u.add(h);var s=0;h.addEventListener("collide",function(n){s++,document.getElementById("ctimes").innerHTML=s});var w=new o.m(50,50,1,1);for(let n=0;n<2;n++){var c=new o.j({color:16777215*Math.random()}),p=new o.i(w,c);p.castShadow=true,p.receiveShadow=true,f.push(p),t.add(p)}var v=new o.c(1,1,1,10,10),g=new o.j({color:16777215*Math.random()});(l=new o.i(v,g)).castShadow=true,t.add(l)}g.onStart=function(n,e,t){},g.onLoad=function(){y&&y()},g.onProgress=function(n,e,t){parseInt(e/t*100)},g.onError=function(n){},new o.r(g).load("/assets/favicon.ico",function(n){v.color=n}),window.addEventListener("resize",function(){r.aspect=window.innerWidth/window.innerHeight,r.updateProjectionMatrix(),d.setSize(window.innerWidth,window.innerHeight)},false);var E=function(){if(requestAnimationFrame(E),p&&p.update(),u&&u.step(1/60),f.length){l.position.copy(h.position),l.quaternion.copy(h.quaternion);for(let n=0;n<m.length;n++)f[n].position.copy(m[n].position),f[n].quaternion.copy(m[n].quaternion)}d.render(t,r)};E()}create(){}};window.h5={isPc:function(){for(var n=navigator.userAgent,e=new Array("Android","iPhone","SymbianOS","Windows Phone","iPad","iPod"),t=true,i=0;i<e.length;i++)if(n.indexOf(e[i])>0){t=false;break}return t},rootResize:function(){var n,e=document.documentElement.clientWidth||window.innerWidth,t=document.documentElement.clientHeight||window.innerHeight;n=e>t?t/750*100:e/750*100,document.getElementsByTagName("html")[0].style.fontSize=n+"px"},eventInit:function(){return document.addEventListener("touchstart",function(n){},{passive:false}),document.addEventListener("touchmove",function(n){n.preventDefault()},{passive:false}),this},cssInit:function(){var n=this;return n.rootResize(),window.addEventListener("onorientationchange"in window?"orientationchange":"resize",function(){var e,t,i,o,a,r;i=function(){clearInterval(e),clearTimeout(t),e=null,t=null,n.rootResize()},e=setInterval(function(){window.innerWidth===o&&window.innerHeight===a?100===++r&&i():(o=window.innerWidth,a=window.innerHeight,r=0)}),t=setTimeout(function(){i()},1e3)}),n},init:function(){this.cssInit().eventInit()}},window.onload=function(){window.h5.init()}}},[["dO7Y",1,2]]]);
//# sourceMappingURL=main.c33dfa4386aaf74480f5.js.map