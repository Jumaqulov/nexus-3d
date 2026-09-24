(() => {
  'use strict';
  const $ = (selector) => document.querySelector(selector);
  const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
  const lerp = (a, b, progress) => a + (b - a) * progress;
  const smooth = (a, b, value) => { const p = clamp((value - a) / (b - a)); return p * p * (3 - 2 * p); };
  const body = document.body;
  const header = $('.site-header');
  const chapterNav = $('.chapter-nav');
  const chapterLinks = [...chapterNav.querySelectorAll('a')];
  const sectionIds = ['journey','rift','pathfinder','eden','core','worlds'];
  const sections = Object.fromEntries(sectionIds.map(id => [id, document.getElementById(id)]));
  const watched = [...Object.values(sections), $('.interlude')];
  const visible = new Set();
  const metrics = {};
  const signal = $('.signal-statement');
  const signalSign = $('.signal-sign');
  const originalStatement = signal.textContent;
  signal.setAttribute('aria-label',originalStatement);
  signal.replaceChildren();
  const words = originalStatement.split(' ').map((word, index) => {
    if(index) signal.append(document.createTextNode(' '));
    const span=document.createElement('span');span.className='signal-word';span.textContent=word;span.setAttribute('aria-hidden','true');signal.append(span);return span;
  });
  const riftImage = $('.rift-world');
  const riftBeats = [...document.querySelectorAll('.rift-beat')];
  const riftMeter = $('.stage-meter i');
  const riftPercent = $('.stage-percent');
  const reticle = $('.portal-reticle');
  const ranger = $('.ranger-model');
  const rangerCopy = $('.ranger-copy');
  const rangerDossier = $('.ranger-dossier');
  const rangerTitle = $('.ranger-ghost-title');
  const edenWindow = $('.eden-window');
  const edenImage = $('.eden-world');
  const edenTitle = $('.eden-giant-title');
  const edenCopy = $('.eden-copy');
  const edenWhisper = $('.eden-whisper');
  const interlude = $('.interlude');
  const interludeFirst = $('.interlude-first');
  const interludeSecond = $('.interlude-second');
  const mobile = () => window.innerWidth <= 760;
  let motion = !body.classList.contains('motion-paused');
  let immersed = body.classList.contains('immersed');
  let scroll = window.scrollY, viewHeight = window.innerHeight;
  let raf = null, lastTime = 0, elapsed = 0;
  let targetX = 0, targetY = 0, mouseX = 0, mouseY = 0;
  let lastPercent = '', lastChapter = '';
  let lastNavigationScroll = NaN;
  let motionAnchor = null;
  let pageHeight = document.documentElement.scrollHeight;

  function canvasSurface(id) {
    const canvas=document.getElementById(id);
    const ctx=canvas.getContext('2d');
    return {canvas,ctx,width:0,height:0,dpr:1};
  }
  const warp=canvasSurface('warp-field');
  const dust=canvasSurface('eden-dust');
  const core=canvasSurface('hypercube');
  const streaks=Array.from({length:mobile()?90:170},()=>({angle:Math.random()*Math.PI*2,radius:70+Math.random()*730,depth:Math.random()*1400,brightness:.25+Math.random()*.6}));
  const fireflies=Array.from({length:mobile()?35:70},()=>({x:Math.random(),y:Math.random(),z:.3+Math.random()*.7,r:Math.random()*1.5+.6,phase:Math.random()*Math.PI*2}));

  // A tesseract has 16 vertices and one edge between vertices differing in one coordinate.
  const vertices=Array.from({length:16},(_,i)=>[0,1,2,3].map(axis=>(i&(1<<axis))?1:-1));
  const edges=[];
  for(let a=0;a<16;a++)for(let b=a+1;b<16;b++){
    const bits=a^b;if((bits&(bits-1))===0)edges.push([a,b]);
  }
  const faces=[];
  for(let a=0;a<4;a++)for(let b=a+1;b<4;b++){
    const other=[0,1,2,3].filter(axis=>axis!==a&&axis!==b);
    for(let fixed=0;fixed<4;fixed++){
      const base=((fixed&1)?1<<other[0]:0)|((fixed&2)?1<<other[1]:0);
      faces.push([base,base|(1<<a),base|(1<<a)|(1<<b),base|(1<<b)]);
    }
  }
  let spinX=-.31,spinY=.53,targetSpinX=-.31,targetSpinY=.53;
  let phase=.28,targetPhase=.28,shiftPulse=0;
  let dragging=false,lastDragX=0,lastDragY=0;

  function resizeSurface(surface) {
    const rect=surface.canvas.getBoundingClientRect();
    surface.width=rect.width;surface.height=rect.height;surface.dpr=Math.min(window.devicePixelRatio||1,1.5);
    const width=Math.round(rect.width*surface.dpr),height=Math.round(rect.height*surface.dpr);
    if(surface.canvas.width!==width||surface.canvas.height!==height){surface.canvas.width=width;surface.canvas.height=height;}
    if(surface.ctx)surface.ctx.setTransform(surface.dpr,0,0,surface.dpr,0,0);
  }
  function measure() {
    scroll=window.scrollY;viewHeight=window.innerHeight;pageHeight=document.documentElement.scrollHeight;
    lastNavigationScroll=NaN;
    for(const [id,section] of Object.entries(sections)){
      const rect=section.getBoundingClientRect();const stage=section.querySelector('.journey-stage');
      metrics[id]={top:rect.top+scroll,height:rect.height,stageHeight:stage?stage.offsetHeight:viewHeight};
    }
    const rect=interlude.getBoundingClientRect();metrics.interlude={top:rect.top+scroll,height:rect.height};
    [warp,dust,core].forEach(resizeSurface);
    requestFrame();
  }
  function progress(id) {const m=metrics[id];return m?clamp((scroll-m.top)/Math.max(1,m.height-m.stageHeight)):0;}
  function passage(id) {const m=metrics[id];return m?clamp((scroll+viewHeight-m.top)/(m.height+viewHeight)):0;}
  function updateNavigation() {
    if(scroll===lastNavigationScroll)return;
    lastNavigationScroll=scroll;
    document.documentElement.style.setProperty('--scroll-progress',String(clamp(scroll/Math.max(1,pageHeight-viewHeight))));
    header.classList.toggle('is-scrolled',scroll>70);
    chapterNav.classList.toggle('is-visible',scroll>viewHeight*.65&&!immersed);
    let active='';
    for(const id of sectionIds){if(metrics[id]&&scroll+viewHeight*.45>=metrics[id].top)active=id;}
    if(active!==lastChapter){
      chapterLinks.forEach(link=>{if(link.hash==='#'+active)link.setAttribute('aria-current','true');else link.removeAttribute('aria-current');});
      lastChapter=active;
    }
  }

  function updateJourney() {
    if(visible.has(sections.journey)){
      const m=metrics.journey;
      const p=clamp((scroll+viewHeight*.74-m.top)/(m.height*.79));
      words.forEach((span,index)=>{
        const amount=smooth(index/words.length-.1,(index+1)/words.length+.09,p);
        const accent=index>=words.length-2;
        const end=accent?[214,250,54]:[242,243,236];
        span.style.color=`rgb(${Math.round(lerp(60,end[0],amount))},${Math.round(lerp(68,end[1],amount))},${Math.round(lerp(53,end[2],amount))})`;
      });
      signalSign.style.transform=`rotate(${p*220}deg)`;
    }
    if(visible.has(sections.rift)){
      const p=progress('rift');
      const zoom=1.04+smooth(0,1,p)*2.2;
      riftImage.style.transform=`translate3d(${-mouseX*22}px,${-mouseY*16}px,0) scale(${zoom})`;
      const amounts=[1-smooth(.19,.33,p),smooth(.24,.36,p)*(1-smooth(.56,.69,p)),smooth(.63,.76,p)];
      riftBeats.forEach((beat,index)=>{
        const local=clamp((p-index*.31)*3);
        beat.style.opacity=String(amounts[index]);
        beat.style.transform=`translate3d(${mouseX*(index===1?-16:14)}px,${(1-amounts[index])*58-local*14}px,0) scale(${1+local*.075})`;
      });
      reticle.style.transform=`translate(-50%,-50%) rotate(${45+p*100}deg) scale(${.75+p*1.8})`;
      reticle.style.opacity=String(.24*(1-smooth(.6,1,p)));
      riftMeter.style.transform=`scaleX(${p})`;
      const percent=String(Math.round(p*100)).padStart(3,'0')+'%';
      if(percent!==lastPercent){riftPercent.textContent=percent;lastPercent=percent;}
      drawWarp(p);
    }
    if(visible.has(sections.pathfinder)){
      const p=progress('pathfinder');
      const travel=(p-.5);
      ranger.style.transform=`translate3d(${-mouseX*38+travel*52}px,${travel*-108-mouseY*20}px,0) rotate(${travel*5}deg) scale(${1.01+p*.2})`;
      rangerTitle.style.transform=`translate3d(${-p*window.innerWidth*.16}px,${travel*40}px,0)`;
      rangerCopy.style.transform=`translate3d(${travel*-32}px,${travel*-75}px,0)`;
      rangerDossier.style.transform=`translate3d(${travel*24}px,${travel*75}px,0)`;
    }
    if(visible.has(sections.eden)){
      const p=progress('eden');const opening=smooth(.04,.58,p);
      const vertical=(mobile()?23:17)*(1-opening),horizontal=(mobile()?13:27)*(1-opening),radius=240*(1-opening);
      edenWindow.style.clipPath=`inset(${vertical}% ${horizontal}% round ${radius}px)`;
      edenImage.style.transform=`translate3d(${-mouseX*22}px,${-mouseY*16+(p-.5)*-42}px,0) scale(${1.3-p*.22})`;
      edenTitle.style.transform=`translate(-50%,${-50-p*100}%) scale(${1+p*.17})`;
      edenTitle.style.opacity=String(1-smooth(.2,.58,p));
      const reveal=smooth(.42,.65,p);
      edenCopy.style.opacity=String(reveal);
      edenCopy.style.transform=`translate3d(${mouseX*-8}px,${(1-reveal)*95-(p-.65)*35}px,0)`;
      // Hidden cinematic copy cannot receive focus before it becomes visible.
      edenCopy.inert=reveal<.15;
      edenWhisper.style.opacity=String(1-smooth(.3,.5,p));
      edenWhisper.style.transform=`translateY(${-p*60}px)`;
      drawDust();
    }
    if(visible.has(interlude)){
      const p=passage('interlude');
      interludeFirst.style.transform=`translateX(${(p-.5)*-window.innerWidth*.19}px)`;
      interludeSecond.style.transform=`translateX(${(p-.5)*window.innerWidth*.19}px)`;
    }
  }

  function drawWarp(progressValue) {
    const {ctx,width:w,height:h}=warp;if(!ctx||!w||!h)return;
    ctx.clearRect(0,0,w,h);
    const strength=smooth(.26,.83,progressValue);
    if(strength<.001)return;
    const cx=w*(mobile()?.57:.65)+mouseX*18,cy=h*.43+mouseY*14;
    ctx.save();ctx.globalCompositeOperation='lighter';ctx.lineWidth=1;
    for(const star of streaks){
      const z=((star.depth-elapsed*(.006+strength*.23))%1400+1400)%1400+65;
      const distance=star.radius*700/z;
      const tail=star.radius*700/(z+strength*105+7);
      const x=Math.cos(star.angle),y=Math.sin(star.angle);
      const alpha=star.brightness*strength*clamp(1-z/1600);
      ctx.strokeStyle=`rgba(217,238,167,${alpha})`;
      ctx.beginPath();ctx.moveTo(cx+x*tail,cy+y*tail);ctx.lineTo(cx+x*distance,cy+y*distance);ctx.stroke();
    }
    ctx.restore();
  }
  function drawDust() {
    const {ctx,width:w,height:h}=dust;if(!ctx||!w||!h)return;
    ctx.clearRect(0,0,w,h);
    for(const particle of fireflies){
      const x=particle.x*w+Math.sin(elapsed*.0003+particle.phase)*22-mouseX*particle.z*40;
      const y=(((particle.y*h-elapsed*.009*particle.z)%h)+h)%h;
      const alpha=.18+(Math.sin(elapsed*.0011+particle.phase)*.5+.5)*.5;
      ctx.beginPath();ctx.fillStyle=`rgba(155,245,224,${alpha})`;ctx.shadowBlur=9*particle.z;ctx.shadowColor='#8affdf';ctx.arc(x,y,particle.r*particle.z,0,Math.PI*2);ctx.fill();
    }
    ctx.shadowBlur=0;
  }
  function rotatePlane(point,a,b,angle) {
    const result=point.slice(),cos=Math.cos(angle),sin=Math.sin(angle);
    result[a]=point[a]*cos-point[b]*sin;result[b]=point[a]*sin+point[b]*cos;
    return result;
  }
  function projectVertex(vertex,t) {
    let p=rotatePlane(vertex,0,3,phase+t*.000105);
    p=rotatePlane(p,1,3,t*.000058+.15);
    p=rotatePlane(p,2,3,t*.000039);
    const wPerspective=2.1/(3.2-p[3]);
    let xyz=p.slice(0,3).map(value=>value*wPerspective);
    xyz=rotatePlane(xyz,0,2,spinY+(motion?mouseX*.16:0));
    xyz=rotatePlane(xyz,1,2,spinX+(motion?mouseY*.12:0));
    const perspective=6/(6-xyz[2]);
    const scale=Math.min(core.width*.25,core.height*.24);
    return {x:core.width*.5+xyz[0]*perspective*scale,y:core.height*(mobile()?.51:.45)+xyz[1]*perspective*scale,z:xyz[2],w:p[3]};
  }
  function drawCore() {
    const {ctx,width:w,height:h}=core;if(!ctx||!w||!h)return;
    ctx.clearRect(0,0,w,h);
    const points=vertices.map(vertex=>projectVertex(vertex,elapsed));
    const centerY=h*(mobile()?.51:.45),radius=Math.min(w*.5,h*.5);
    const glow=ctx.createRadialGradient(w*.5,centerY,0,w*.5,centerY,radius);
    glow.addColorStop(0,`rgba(165,241,98,${.025+shiftPulse*.06})`);glow.addColorStop(1,'rgba(165,241,98,0)');
    ctx.fillStyle=glow;ctx.fillRect(0,0,w,h);
    const sortedFaces=faces.map(face=>({face,z:face.reduce((sum,index)=>sum+points[index].z,0)/4})).sort((a,b)=>a.z-b.z);
    for(const {face,z} of sortedFaces){
      ctx.beginPath();face.forEach((index,i)=>{const p=points[index];if(i===0)ctx.moveTo(p.x,p.y);else ctx.lineTo(p.x,p.y);});ctx.closePath();
      ctx.fillStyle=`rgba(185,236,130,${.014+clamp((z+2)/4)*.012})`;ctx.fill();
    }
    const sortedEdges=edges.map(edge=>({edge,z:(points[edge[0]].z+points[edge[1]].z)*.5})).sort((a,b)=>a.z-b.z);
    ctx.save();ctx.globalCompositeOperation='lighter';
    for(const {edge:[a,b],z} of sortedEdges){
      const crossing=(a^b)===8;const alpha=.35+clamp((z+2)/4)*.55;
      const color=crossing?`rgba(143,228,216,${alpha})`:`rgba(211,251,85,${alpha})`;
      ctx.beginPath();ctx.moveTo(points[a].x,points[a].y);ctx.lineTo(points[b].x,points[b].y);
      ctx.strokeStyle=color;ctx.lineWidth=crossing?1:1.4;ctx.shadowColor=crossing?'#82e3d3':'#d6fa36';ctx.shadowBlur=9+shiftPulse*15;ctx.stroke();
    }
    for(const p of points){ctx.beginPath();ctx.arc(p.x,p.y,2.2+clamp((p.z+2)/4),0,Math.PI*2);ctx.fillStyle='#efffbb';ctx.shadowBlur=13;ctx.shadowColor='#d6fa36';ctx.fill();}
    ctx.restore();
  }
  function tick(now) {
    raf=null;if(document.hidden||immersed)return;
    const delta=Math.min(now-(lastTime||now),42);lastTime=now;
    updateNavigation();
    if(motion){
      elapsed+=delta;
      mouseX+=(targetX-mouseX)*.065;mouseY+=(targetY-mouseY)*.065;
      spinX+=(targetSpinX-spinX)*.12;spinY+=(targetSpinY-spinY)*.12;phase+=(targetPhase-phase)*.065;shiftPulse*=.965;
      updateJourney();
    }else{spinX=targetSpinX;spinY=targetSpinY;phase=targetPhase;}
    if(visible.has(sections.core)||dragging)drawCore();
    if(motion&&visible.size>0)requestFrame();
  }
  function requestFrame(){if(raf===null&&!document.hidden&&!immersed)raf=requestAnimationFrame(tick);}
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{if(entry.isIntersecting)visible.add(entry.target);else visible.delete(entry.target);});
    requestFrame();
  },{rootMargin:'120px 0px'});
  watched.forEach(section=>observer.observe(section));
  window.addEventListener('scroll',()=>{scroll=window.scrollY;requestFrame();},{passive:true});
  window.addEventListener('resize',measure,{passive:true});
  window.addEventListener('pointermove',event=>{
    targetX=clamp(event.clientX/window.innerWidth*2-1,-1,1);targetY=clamp(event.clientY/window.innerHeight*2-1,-1,1);
    if(motion&&visible.size)requestFrame();
  },{passive:true});
  window.addEventListener('nexus:beforemotionchange',()=>{
    motionAnchor=null;
    for(const id of sectionIds){
      const m=metrics[id];
      if(m&&scroll>=m.top&&scroll<m.top+m.height){
        motionAnchor={id,offset:sections[id].querySelector('.journey-stage')?0:scroll-m.top};
        break;
      }
    }
  });
  window.addEventListener('nexus:motionchange',event=>{
    motion=event.detail.enabled;
    if(!motion){edenCopy.inert=false;drawWarp(0);drawDust();}
    requestAnimationFrame(()=>{
      measure();
      if(motionAnchor&&!immersed){
        window.scrollTo({top:metrics[motionAnchor.id].top+motionAnchor.offset,behavior:'instant'});
        scroll=window.scrollY;motionAnchor=null;requestFrame();
      }
    });
  });
  window.addEventListener('nexus:immersionchange',event=>{
    immersed=event.detail.active;
    if(immersed&&raf!==null){cancelAnimationFrame(raf);raf=null;}
    if(!immersed)requestAnimationFrame(measure);
  });
  document.addEventListener('visibilitychange',()=>{
    if(document.hidden&&raf!==null){cancelAnimationFrame(raf);raf=null;}
    if(!document.hidden){lastTime=performance.now();requestFrame();}
  });
  let measuredWidth=window.innerWidth,measuredHeight=0;
  new ResizeObserver(()=>{
    const h=document.body.offsetHeight,w=window.innerWidth;
    if(h!==measuredHeight||w!==measuredWidth){measuredHeight=h;measuredWidth=w;measure();}
  }).observe(document.body);
  document.fonts.ready.then(measure);

  function shiftDimension(){targetPhase+=Math.PI/3;shiftPulse=1;if(!motion)phase=targetPhase;requestFrame();$('#announcer').textContent='The hypercube rotated through the fourth dimension.';}
  $('.shift-dimension').addEventListener('click',shiftDimension);
  core.canvas.addEventListener('pointerdown',event=>{
    if(event.button!==0&&event.pointerType==='mouse')return;
    dragging=true;lastDragX=event.clientX;lastDragY=event.clientY;
    if(event.pointerType==='mouse'){core.canvas.setPointerCapture(event.pointerId);core.canvas.focus({preventScroll:true});}
  });
  core.canvas.addEventListener('pointermove',event=>{
    if(!dragging)return;
    targetSpinY+=(event.clientX-lastDragX)*.009;targetSpinX+=(event.clientY-lastDragY)*.009;
    lastDragX=event.clientX;lastDragY=event.clientY;requestFrame();
  });
  const endDrag=()=>{dragging=false;};
  window.addEventListener('pointerup',endDrag);core.canvas.addEventListener('pointercancel',endDrag);core.canvas.addEventListener('lostpointercapture',endDrag);
  core.canvas.addEventListener('keydown',event=>{
    const directions={ArrowLeft:[0,-.22],ArrowRight:[0,.22],ArrowUp:[-.22,0],ArrowDown:[.22,0]};
    if(directions[event.key]){event.preventDefault();targetSpinX+=directions[event.key][0];targetSpinY+=directions[event.key][1];requestFrame();}
    if(event.code==='Space'||event.key==='Enter'){event.preventDefault();shiftDimension();}
  });
  core.canvas.addEventListener('focus',()=>{visible.add(sections.core);requestFrame();});
  // These scenes start readable even if motion is disabled by the visitor's system preference.
  edenCopy.inert=motion;
  measure();
  drawCore();
})();
