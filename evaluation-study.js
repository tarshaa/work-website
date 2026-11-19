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
window.renderEvaluationStudy = () => `<section class="eval-graphs" aria-labelledby="eval-heading"><h2 id="eval-heading">Methods and results</h2><p class="eval-intro">Published measurements, qualitative observations and proposed evaluation protocols.</p><div class="eval-gallery" role="region" aria-label="Evaluation boards">${window.EVALUATION_BOARDS.map(b=>`<figure class="eval-figure" id="eval-board-${b.id}"><button type="button" class="eval-open" data-eval-open="${b.id}" aria-label="View ${b.title} at full size">${b.motion?`<video class="eval-animation" src="assets/evaluation-study-${b.id}.mp4?v=labels-cleanup-20261116" poster="assets/evaluation-study-${b.id}.png?v=labels-cleanup-20261116" muted loop playsinline preload="none" width="3200" height="2584" aria-label="${b.title}"></video>`:`<img src="assets/evaluation-study-${b.id}.png?v=labels-cleanup-20261116" alt="${b.title}" width="3200" height="2584" loading="lazy" decoding="async">`}</button>${b.id===8?'':`<figcaption><strong>${b.title}</strong><span>${b.note}</span></figcaption>`}</figure>`).join('')}</div></section><dialog class="eval-lightbox" aria-label="Full-size evaluation board"><header><span data-eval-title></span><button type="button" data-eval-close aria-label="Close full-size board">Close ×</button></header><div class="eval-lightbox-media"></div><a data-eval-original target="_blank" rel="noopener">Open original image ↗</a></dialog>`;
document.addEventListener('DOMContentLoaded',()=>{
 const gallery=document.querySelector('.eval-gallery');
 if(!gallery)return;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const videos=[...gallery.querySelectorAll('video')];
 const playback=()=>videos.forEach(v=>{if(v.dataset.visible==='true'&&!reduced.matches&&!document.hidden)v.play().catch(()=>{});else v.pause();});
 const observer=new IntersectionObserver(entries=>{entries.forEach(e=>e.target.dataset.visible=String(e.isIntersecting));playback();},{threshold:.1});
 videos.forEach(v=>observer.observe(v));
 reduced.addEventListener('change',playback);document.addEventListener('visibilitychange',playback);
 const dialog=document.querySelector('.eval-lightbox'),media=dialog.querySelector('.eval-lightbox-media');
 document.querySelectorAll('[data-eval-open]').forEach(b=>b.addEventListener('click',()=>{const item=window.EVALUATION_BOARDS.find(x=>x.id===Number(b.dataset.evalOpen));dialog.dataset.board=String(item.id);dialog.querySelector('[data-eval-title]').textContent=item.title;dialog.querySelector('[data-eval-original]').href=`assets/evaluation-study-${item.id}.png?v=labels-cleanup-20261116`;media.innerHTML=item.motion?`<video src="assets/evaluation-study-${item.id}.mp4?v=labels-cleanup-20261116" poster="assets/evaluation-study-${item.id}.png?v=labels-cleanup-20261116" controls ${reduced.matches?'':'autoplay'} muted loop playsinline aria-label="${item.title}"></video>`:`<img src="assets/evaluation-study-${item.id}.png?v=labels-cleanup-20261116" alt="${item.title}">`;dialog.showModal();}));
 dialog.querySelector('[data-eval-close]').addEventListener('click',()=>dialog.close());
 dialog.addEventListener('close',()=>{media.innerHTML='';});
 dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
});
