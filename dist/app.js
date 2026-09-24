(() => {
  'use strict';
  const body = document.body;
  const hero = document.querySelector('.hero');
  const landscape = document.querySelector('[data-layer="landscape"]');
  const eden = document.querySelector('[data-layer="eden"]');
  const character = document.querySelector('[data-layer="character"]');
  const motionButton = document.querySelector('.motion-toggle');
  const motionMedia = window.matchMedia('(prefers-reduced-motion: reduce)');
  const touchMedia = window.matchMedia('(pointer: coarse)');
  const announcer = document.querySelector('#announcer');
  const immersionUI = document.querySelector('.immersion-ui');
  const canvas = document.querySelector('#atmosphere');
  const ctx = canvas.getContext('2d');
  const worldData = {
    rift: {title:'THE RIFT',subtitle:'BEYOND THE LAST FRONTIER',caption:'EXPEDITION_001',color:[216,225,146]},
    eden: {title:'EDEN',subtitle:'WHERE THE WILD TAKES OVER',caption:'EXPEDITION_002',color:[126,210,196]}
  };
  let world = 'rift';
  let motion = !motionMedia.matches;
  let immersed = false;
  let originFocus = null;
  let savedScroll = 0;
  let frame = null;
  let width = 0, height = 0, dpr = 1, time = 0, lastFrame = 0;
  let pointer = {x:0,y:0}, eased = {x:0,y:0};
  let scrollY = window.scrollY;
  let isHeroVisible = true;
  const particles = Array.from({length:touchMedia.matches ? 52 : 115}, () => ({
    x:(Math.random()-.5)*2000,y:(Math.random()-.5)*1450,z:Math.random()*1400+100,
    radius:Math.random()*1.35+.3,speed:Math.random()*.13+.045,phase:Math.random()*Math.PI*2
  }));

  function announce(text) { announcer.textContent = text; }
  function selectWorld(next, announceChange = true) {
    if (!worldData[next]) return;
    world = next;
    body.classList.toggle('scene-eden', next === 'eden');
    document.querySelectorAll('[data-world]').forEach(button => {
      const selected = button.dataset.world === next;
      button.classList.toggle('is-active', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
    document.querySelector('#immersion-title').textContent = worldData[next].title;
    document.querySelector('#immersion-world-name').textContent = worldData[next].title;
    document.querySelector('#immersion-subtitle').textContent = worldData[next].subtitle;
    document.querySelector('.scene-caption span:first-child').textContent = worldData[next].caption;
    document.querySelector('.scene-caption span:last-child').textContent = worldData[next].title;
    if (audio) updateAudioTone();
    if (!motion) drawParticles();
    if (announceChange) announce(worldData[next].title + ' selected');
  }

  document.querySelectorAll('[data-world]').forEach(button => button.addEventListener('click', () => selectWorld(button.dataset.world)));
  function enterImmersion(next, source) {
    if (immersed) return;
    selectWorld(next || world, false);
    originFocus = source || document.activeElement;
    savedScroll = window.scrollY;
    immersed = true;
    body.classList.add('immersed');
    immersionUI.hidden = false;
    immersionUI.setAttribute('role', 'dialog');
    immersionUI.setAttribute('aria-modal', 'true');
    immersionUI.setAttribute('aria-label', 'Immersive world explorer');
    document.querySelector('.site-header').inert = true;
    document.querySelector('main').inert = true;
    document.querySelector('.site-footer').inert = true;
    // The shared scene remains visible inside main; its controls are all in this dialog.
    document.querySelector('.exit-immersion').focus({preventScroll:true});
    pointer = {x:0,y:0};
    resize();
    startAnimation();
    window.dispatchEvent(new CustomEvent('nexus:immersionchange', {detail:{active:true}}));
    announce('Immersion opened. ' + worldData[world].title + '. Escape returns to the page.');
  }
  function exitImmersion() {
    if (!immersed) return;
    immersed = false;
    body.classList.remove('immersed');
    immersionUI.hidden = true;
    document.querySelector('.site-header').inert = false;
    document.querySelector('main').inert = false;
    document.querySelector('.site-footer').inert = false;
    window.scrollTo({top:savedScroll,behavior:'instant'});
    originFocus?.focus({preventScroll:true});
    pointer = {x:0,y:0};
    resize();
    window.dispatchEvent(new CustomEvent('nexus:immersionchange', {detail:{active:false}}));
    announce('Returned to NEXUS');
  }
  document.querySelectorAll('[data-immerse]').forEach(button => button.addEventListener('click', () => enterImmersion(world, button)));
  document.querySelectorAll('[data-open-world]').forEach(button => button.addEventListener('click', () => enterImmersion(button.dataset.openWorld, button)));
  document.querySelector('.exit-immersion').addEventListener('click', exitImmersion);
  document.querySelector('.next-world').addEventListener('click', () => selectWorld(world === 'rift' ? 'eden' : 'rift'));
  document.addEventListener('keydown', event => {
    if (!immersed) return;
    if (event.key === 'Escape') exitImmersion();
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();
      selectWorld(world === 'rift' ? 'eden' : 'rift');
    }
    if (event.key === 'Tab') {
      const focusable = [...immersionUI.querySelectorAll('button'), motionButton];
      const current = focusable.indexOf(document.activeElement);
      const next = event.shiftKey ? (current - 1 + focusable.length) % focusable.length : (current + 1) % focusable.length;
      event.preventDefault();
      focusable[next].focus();
    }
  });

  function setMotion(enabled) {
    window.dispatchEvent(new CustomEvent('nexus:beforemotionchange', {detail:{enabled}}));
    motion = enabled;
    body.classList.toggle('motion-paused', !motion);
    motionButton.setAttribute('aria-pressed', String(motion));
    motionButton.setAttribute('aria-label', motion ? 'Pause visual motion' : 'Enable visual motion');
    motionButton.querySelector('span').textContent = motion ? 'Motion on' : 'Motion off';
    motionButton.querySelector('use').setAttribute('href', motion ? '#icon-pause' : '#icon-play');
    if (!motion) {
      cancelAnimationFrame(frame);
      frame = null;
      pointer = {x:0,y:0}; eased = {x:0,y:0};
      landscape.style.transform = 'scale(1.03)';
      eden.style.transform = 'scale(1.03)';
      character.style.transform = 'none';
      document.querySelectorAll('.world-card').forEach(card => {card.style.transform = '';});
      drawParticles();
    } else startAnimation();
    window.dispatchEvent(new CustomEvent('nexus:motionchange', {detail:{enabled:motion}}));
  }
  motionButton.addEventListener('click', () => setMotion(!motion));
  motionMedia.addEventListener('change', event => setMotion(!event.matches));

  function updatePointer(event) {
    if (!motion || (!immersed && !isHeroVisible)) return;
    const rect = hero.getBoundingClientRect();
    pointer.x = Math.max(-1, Math.min(1, (event.clientX / window.innerWidth - .5) * 2));
    pointer.y = Math.max(-1, Math.min(1, ((event.clientY - rect.top) / rect.height - .5) * 2));
  }
  window.addEventListener('pointermove', updatePointer, {passive:true});
  document.addEventListener('pointerleave', () => {pointer = {x:0,y:0};});
  window.addEventListener('scroll', () => {scrollY = window.scrollY;}, {passive:true});
  if (touchMedia.matches) {
    document.querySelector('.immersive-hint').textContent = 'Drag anywhere to look around';
  }
  document.querySelectorAll('.world-card').forEach(card => {
    card.addEventListener('pointermove', event => {
      if (!motion || touchMedia.matches) return;
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - .5;
      const y = (event.clientY - rect.top) / rect.height - .5;
      card.style.transform = `rotateX(${-y * 11}deg) rotateY(${x * 14}deg) translateZ(12px)`;
    });
    card.addEventListener('pointerleave', () => {card.style.transform = '';});
    card.addEventListener('blur', () => {card.style.transform = '';});
  });

  function resize() {
    const rect = hero.getBoundingClientRect();
    width = rect.width; height = rect.height;
    dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    if (ctx) {ctx.setTransform(dpr,0,0,dpr,0,0); drawParticles();}
  }
  window.addEventListener('resize', resize, {passive:true});
  new ResizeObserver(resize).observe(hero);
  function drawParticles() {
    if (!ctx || !width || !height) return;
    ctx.clearRect(0,0,width,height);
    const rgb = worldData[world].color;
    const viewX = eased.x * (immersed ? 70 : 28);
    const viewY = eased.y * (immersed ? 45 : 18);
    const focalLength = width * .7;
    particles.forEach(p => {
      const perspective = focalLength / (focalLength + p.z);
      const x = (p.x - viewX) * perspective * (width / 1300) + width * .62;
      const y = (p.y - viewY) * perspective * (height / 900) + height * .5;
      const alpha = Math.max(.08, (1 - p.z / 1650) * (.4 + Math.sin(time*.0007 + p.phase)*.15));
      ctx.beginPath();
      ctx.arc(x,y, Math.max(.35,p.radius * perspective),0,Math.PI*2);
      ctx.fillStyle = `rgba(${rgb.join(',')},${alpha})`;
      ctx.fill();
    });
  }
  function animate(now) {
    frame = null;
    if (!motion || document.hidden || (!isHeroVisible && !immersed)) return;
    const delta = Math.min(now - (lastFrame || now), 50);
    lastFrame = now;
    time += delta;
    eased.x += (pointer.x - eased.x) * .047;
    eased.y += (pointer.y - eased.y) * .047;
    const drift = Math.sin(time * .00018) * 3;
    const scroll = immersed ? 0 : Math.min(scrollY, height) * .26;
    const journeyProgress = immersed ? 0 : Math.min(scrollY / Math.max(height,1),1);
    const amplitude = immersed ? 2.1 : 1.3;
    const bgTransform = `translate3d(${-eased.x * 21 * amplitude + drift}px,${-eased.y * 15 * amplitude + scroll}px,0) scale(${1.08+journeyProgress*.36})`;
    landscape.style.transform = bgTransform;
    eden.style.transform = bgTransform;
    character.style.transform = `translate3d(${-eased.x * 43 * amplitude}px,${-eased.y * 25 * amplitude - scroll * .42 + Math.sin(time*.00055)*4}px,0) rotateY(${eased.x * -4}deg) scale(${1+journeyProgress*.19})`;
    document.querySelector('.hero-copy').style.transform = `translateY(${journeyProgress*height*.12}px)`;
    document.querySelectorAll('.hero h1>span').forEach((line,index) => {line.style.transform = `translateX(${journeyProgress*[40,-32,55][index]}px)`;});
    for (const p of particles) {
      p.z -= p.speed * delta;
      p.y -= .015 * delta;
      if (p.z < 25) {p.z = 1500; p.y = (Math.random()-.5)*1450;}
    }
    drawParticles();
    frame = requestAnimationFrame(animate);
  }
  function startAnimation() {
    if (frame !== null || !motion || document.hidden) return;
    lastFrame = performance.now();
    frame = requestAnimationFrame(animate);
  }
  new IntersectionObserver(entries => {
    isHeroVisible = entries[0].isIntersecting;
    if (isHeroVisible || immersed) startAnimation();
  }).observe(hero);

  let audio = null;
  let soundOn = false;
  function initAudio() {
    const Audio = window.AudioContext || window.webkitAudioContext;
    if (!Audio) return false;
    const context = new Audio();
    const master = context.createGain();
    master.gain.value = 0;
    master.connect(context.destination);
    const filter = context.createBiquadFilter();
    filter.type = 'lowpass'; filter.frequency.value = 320;
    const pad = context.createGain(); pad.gain.value = .035;
    filter.connect(pad); pad.connect(master);
    const oscillators = [55,82.407,110.15,164.814].map(frequency => {
      const oscillator = context.createOscillator();
      oscillator.type = 'sine'; oscillator.frequency.value = frequency;
      oscillator.connect(filter); oscillator.start();
      return oscillator;
    });
    const length = context.sampleRate * 4;
    const noiseBuffer = context.createBuffer(1,length,context.sampleRate);
    const samples = noiseBuffer.getChannelData(0);
    let last = 0;
    for (let i=0;i<length;i++) { last = (last + Math.random()*.03-.015)/1.018; samples[i] = last; }
    const noise = context.createBufferSource(); noise.buffer=noiseBuffer; noise.loop=true;
    const noiseFilter=context.createBiquadFilter();noiseFilter.type='lowpass';noiseFilter.frequency.value=600;
    const noiseGain=context.createGain();noiseGain.gain.value=.15;
    noise.connect(noiseFilter);noiseFilter.connect(noiseGain);noiseGain.connect(master);noise.start();
    audio = {context,master,filter,oscillators};
    return true;
  }
  function updateAudioTone() {
    if (!audio) return;
    const shift = world === 'eden' ? 1.3333 : 1;
    [55,82.407,110.15,164.814].forEach((frequency,index) => {
      audio.oscillators[index].frequency.setTargetAtTime(frequency*shift,audio.context.currentTime,1.5);
    });
    audio.filter.frequency.setTargetAtTime(world==='eden'?480:320,audio.context.currentTime,1.5);
  }
  async function toggleSound() {
    try {
      if (!audio && !initAudio()) {announce('Ambient audio is not available in this browser');return;}
      if (audio.context.state === 'suspended') await audio.context.resume();
      soundOn = !soundOn;
      audio.master.gain.cancelScheduledValues(audio.context.currentTime);
      audio.master.gain.setTargetAtTime(soundOn ? .6 : 0,audio.context.currentTime,.5);
      updateAudioTone();
      document.querySelector('.sound-toggle').setAttribute('aria-pressed',String(soundOn));
      document.querySelector('.sound-toggle').setAttribute('aria-label',soundOn?'Disable ambient sound':'Enable ambient sound');
      document.querySelector('.sound-label').textContent = soundOn?'SOUND ON':'SOUND OFF';
      const immersiveSound=document.querySelector('.immersion-sound');
      immersiveSound.setAttribute('aria-pressed',String(soundOn));
      immersiveSound.firstChild.textContent = soundOn?'SOUND ON ':'SOUND OFF ';
      announce('Ambient sound '+(soundOn?'on':'off'));
    } catch {announce('Audio could not start. Try enabling sound again.');}
  }
  document.querySelector('.sound-toggle').addEventListener('click',toggleSound);
  document.querySelector('.immersion-sound').addEventListener('click',toggleSound);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      if(frame!==null) cancelAnimationFrame(frame);
      frame=null;
      if(audio) audio.context.suspend().catch(()=>{});
    } else {
      startAnimation();
      if(audio&&soundOn) audio.context.resume().catch(()=>{});
    }
  });
  setMotion(motion);
  resize();
})();
