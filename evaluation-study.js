window.EVALUATION_BOARDS = [
 {id:1,title:'Reproducibility and reporting',note:'Protocol · inputs, model versions, settings and review criteria.'},
 {id:2,title:'Edit success and background preservation',note:'Original AI-generated illustration · qualitative inspection, without numerical scores.'},
 {id:3,title:'Omni: ratings and temporal consistency',note:'Published human ratings · temporal and reference consistency.',motion:true},
 {id:4,title:'Recraft v4: qualitative assessment',note:'Eight domains · four reported strengths, four limitations and a proposed 120-image study.'},
 {id:5,title:'Opus 4.5: reference-conditioned generation',note:'Workflow analysis · reference interpretation, prompt specification and image generation.',motion:true},
 {id:6,title:'Case-level evidence records',note:'Reporting structure · prompts, outputs, annotations and exclusions.'},
 {id:7,title:'Evaluation coverage by edit category',note:'PixLens × MagicBrush · 285 source edits, 260 evaluated and 25 excluded.',motion:true},
 {id:8,title:'Image generation under explicit constraints',note:'GenOlympiad, October 2026 · nine task categories and five native image models.'}
];
window.renderEvaluationStudy = () => `<section class="eval-graphs" aria-labelledby="eval-heading"><h2 id="eval-heading">Methods and results</h2><p class="eval-intro">Published measurements, qualitative observations and proposed evaluation protocols. Sources and study status are identified on each board.</p><div class="eval-toolbar"><p id="eval-position" aria-live="polite">Reproducibility and reporting</p><div><button type="button" data-eval-step="-1" aria-label="Previous evaluation board">←</button><button type="button" data-eval-step="1" aria-label="Next evaluation board">→</button></div></div><div class="eval-gallery" role="region" aria-label="Evaluation boards. Scroll horizontally or use the arrow buttons." tabindex="0">${window.EVALUATION_BOARDS.map(b=>`<figure class="eval-figure" id="eval-board-${b.id}"><button type="button" class="eval-open" data-eval-open="${b.id}" aria-label="View ${b.title} at full size">${b.motion?`<video class="eval-animation" src="assets/evaluation-study-${b.id}.mp4?v=mono-20261116" poster="assets/evaluation-study-${b.id}.png?v=mono-20261116" muted loop playsinline preload="none" width="3200" height="2584" aria-label="${b.title}"></video>`:`<img src="assets/evaluation-study-${b.id}.png?v=mono-20261116" alt="${b.title}" width="3200" height="2584" loading="lazy" decoding="async">`}</button><figcaption><strong>${b.title}</strong><span>${b.note}</span></figcaption></figure>`).join('')}</div><nav class="eval-contents" aria-label="Choose an evaluation board">${window.EVALUATION_BOARDS.map(b=>`<button type="button" data-eval-jump="${b.id}" ${b.id===1?'aria-current="true"':''}>${b.title}</button>`).join('')}</nav></section><dialog class="eval-lightbox" aria-label="Full-size evaluation board"><header><span data-eval-title></span><button type="button" data-eval-close aria-label="Close full-size board">Close ×</button></header><div class="eval-lightbox-media"></div><a data-eval-original target="_blank" rel="noopener">Open original image ↗</a></dialog>`;
document.addEventListener('DOMContentLoaded',()=>{
 const gallery=document.querySelector('.eval-gallery');
 if(!gallery)return;
 const figures=[...gallery.querySelectorAll('.eval-figure')];
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 let current=0,frame=0;
 const jump=index=>{index=Math.max(0,Math.min(figures.length-1,index));gallery.scrollTo({left:figures[index].offsetLeft-figures[0].offsetLeft,behavior:reduced.matches?'instant':'smooth'});};
 const update=()=>{frame=0;current=figures.reduce((best,el,i)=>Math.abs(el.offsetLeft-figures[0].offsetLeft-gallery.scrollLeft)<Math.abs(figures[best].offsetLeft-figures[0].offsetLeft-gallery.scrollLeft)?i:best,0);document.querySelector('#eval-position').textContent=window.EVALUATION_BOARDS[current].title;document.querySelectorAll('[data-eval-jump]').forEach((b,i)=>{if(i===current)b.setAttribute('aria-current','true');else b.removeAttribute('aria-current');});document.querySelector('[data-eval-step="-1"]').disabled=current===0;document.querySelector('[data-eval-step="1"]').disabled=current===figures.length-1;};
 gallery.addEventListener('scroll',()=>{if(!frame)frame=requestAnimationFrame(update);},{passive:true});
 gallery.addEventListener('keydown',e=>{if(e.target!==gallery)return;if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();jump(current+(e.key==='ArrowRight'?1:-1));}});
 document.querySelectorAll('[data-eval-step]').forEach(b=>b.addEventListener('click',()=>jump(current+Number(b.dataset.evalStep))));
 document.querySelectorAll('[data-eval-jump]').forEach(b=>b.addEventListener('click',()=>jump(Number(b.dataset.evalJump)-1)));
 const videos=[...gallery.querySelectorAll('video')];
 const playback=()=>videos.forEach(v=>{if(v.dataset.visible==='true'&&!reduced.matches&&!document.hidden)v.play().catch(()=>{});else v.pause();});
 const observer=new IntersectionObserver(entries=>{entries.forEach(e=>e.target.dataset.visible=String(e.isIntersecting));playback();},{threshold:.1});
 videos.forEach(v=>observer.observe(v));
 reduced.addEventListener('change',playback);document.addEventListener('visibilitychange',playback);
 const dialog=document.querySelector('.eval-lightbox'),media=dialog.querySelector('.eval-lightbox-media');
 document.querySelectorAll('[data-eval-open]').forEach(b=>b.addEventListener('click',()=>{const item=window.EVALUATION_BOARDS.find(x=>x.id===Number(b.dataset.evalOpen));dialog.querySelector('[data-eval-title]').textContent=item.title;dialog.querySelector('[data-eval-original]').href=`assets/evaluation-study-${item.id}.png`;media.innerHTML=item.motion?`<video src="assets/evaluation-study-${item.id}.mp4?v=mono-20261116" poster="assets/evaluation-study-${item.id}.png?v=mono-20261116" controls ${reduced.matches?'':'autoplay'} muted loop playsinline aria-label="${item.title}"></video>`:`<img src="assets/evaluation-study-${item.id}.png?v=mono-20261116" alt="${item.title}">`;dialog.showModal();}));
 dialog.querySelector('[data-eval-close]').addEventListener('click',()=>dialog.close());
 dialog.addEventListener('close',()=>{media.innerHTML='';});
 dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
 update();
});
