const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
const visibility=new IntersectionObserver(entries=>entries.forEach(({target,isIntersecting})=>{if(isIntersecting&&!reduced.matches&&target.dataset.userPaused!=='true')target.play().catch(()=>{});else target.pause();}),{rootMargin:'100px'});
document.querySelectorAll('video').forEach(video=>{
 video.controls=false;
 const tools=document.createElement('div');tools.className='video-tools';
 const pause=document.createElement('button');pause.type='button';pause.textContent='Pause animation';
 pause.addEventListener('click',()=>{if(video.paused){video.dataset.userPaused='false';video.play().catch(()=>{});}else{video.dataset.userPaused='true';video.pause();}});
 const update=()=>{pause.textContent=video.paused?'Play animation':'Pause animation';};video.addEventListener('play',update);video.addEventListener('pause',update);tools.append(pause);
 const full=document.createElement('button');full.type='button';full.textContent='View fullscreen';full.addEventListener('click',()=>{if(video.requestFullscreen)video.requestFullscreen().catch(()=>{});else if(video.webkitEnterFullscreen)video.webkitEnterFullscreen();});tools.append(full);
 if(video.parentElement.classList.contains('pattern-scroll'))video.parentElement.after(tools);else video.after(tools);
 visibility.observe(video);
});
