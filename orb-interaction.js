(() => {
  const grid = document.querySelector('.interactive-orbs');
  const data = window.FAUNA_ORB_DATA;
  if (!grid || !data) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const position = l => `left:${l.x/3}%;top:${l.y/3}%;width:${l.w/3}%;height:${l.h/3}%;`;
  const cells = data.layers.filter(l => l.name.startsWith('Grid/'));
  // Hover responses are a separate overlay; they never alter the base animation.
  const visibleLayers = data.layers.filter(l => !l.name.startsWith('Pencil/'));
  grid.innerHTML = data.tracks.map((tracks, i) => `<button type="button" class="orb-button" style="--orb-phase:${-i*.31}s" aria-label="Fauna orb ${i+1}. Move over it or activate to send a ripple."><span class="orb-art" aria-hidden="true">${visibleLayers.map(l => `<span class="orb-layer ${l.name.split('/')[0].toLowerCase()} ${tracks[l.name] || ''}" style="${position(l)}opacity:${l.opacity}"></span>`).join('')}${cells.map(l => `<span class="orb-response" style="${position(l)}"></span>`).join('')}</span></button>`).join('');
  let visible = false;
  const updatePlayback = () => grid.classList.toggle('is-paused', !visible || document.hidden || document.documentElement.classList.contains('motion-paused'));
  const observer = new IntersectionObserver(entries => {visible = entries[0].isIntersecting;updatePlayback();}, {rootMargin:'100px'});
  observer.observe(grid);
  document.addEventListener('visibilitychange', updatePlayback);
  document.addEventListener('portfolio-motion-change',updatePlayback);
  reduced.addEventListener('change', updatePlayback);
  grid.querySelectorAll('.orb-button').forEach(button => {
    const responses = [...button.querySelectorAll('.orb-response')];
    let frame = 0, point = null;
    const local = event => {const r=button.getBoundingClientRect();return {x:(event.clientX-r.left)/r.width*300,y:(event.clientY-r.top)/r.height*300};};
    const paint = () => {
      frame=0;
      responses.forEach((el,i)=>{const c=cells[i];const distance=point?Math.hypot(c.x+c.w/2-point.x,c.y+c.h/2-point.y):Infinity;el.style.opacity=String(Math.max(0,1-distance/80)*.78);});
    };
    button.addEventListener('pointermove', event => {
      if(event.pointerType==='touch')return;
      point=local(event);
      if(!frame)frame=requestAnimationFrame(paint);
    });
    button.addEventListener('pointerleave',()=>{point=null;if(!frame)frame=requestAnimationFrame(paint);});
    button.addEventListener('click', event => {
      const origin=event.detail?local(event):{x:150,y:150};
      responses.forEach((el,i)=>{
        el.getAnimations().forEach(a=>a.cancel());
        const c=cells[i],distance=Math.hypot(c.x+c.w/2-origin.x,c.y+c.h/2-origin.y);
        if(reduced.matches){el.style.opacity=String(Math.max(0,1-distance/160)*.7);return;}
        el.animate([{opacity:0},{opacity:.9,offset:.22},{opacity:.35,offset:.6},{opacity:0}],{duration:850,delay:distance*2.1,easing:'cubic-bezier(.22,1,.36,1)'});
      });
    });
    button.addEventListener('blur',()=>{point=null;paint();});
  });
})();
