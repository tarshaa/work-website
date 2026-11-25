window.EVALUATION_BOARDS = [
 {id:1,title:'Reproducibility and reporting',note:'Protocol · inputs, model versions, settings and review criteria.'},
 {id:2,title:'Edit success and background preservation',note:'Original AI-generated illustration · qualitative inspection, without numerical scores.'},
 {id:3,title:'Omni: ratings and temporal consistency',note:'Published human ratings · temporal and reference consistency.',motion:true},
 {id:4,title:'Recraft v4: qualitative assessment',note:'Eight domains · four reported strengths, four limitations and a proposed 120-image study.'},
 {id:5,title:'Opus 4.5: reference-conditioned generation',note:'Workflow analysis · reference interpretation, prompt specification and image generation.',motion:true},
 {id:6,title:'Case-level evidence records',note:'Reporting structure · prompts, outputs, annotations and exclusions.'},
 {id:7,title:'Evaluation coverage by edit category',motion:true}
];

const constraintCategories = [
 'Text fidelity', 'Counterfactual instructions', 'Symbolic systems',
 'World knowledge', 'Physical consistency', 'Quantity and precision',
 'Spatial and 3D reasoning', 'Latent computation', 'Long-range consistency'
];
// Relaxed category scores and published overall scores from GenOlympiad Table 1.
const constraintModels = [
 {name:'Nano Banana Pro', strict:23.9, relaxed:40.0, scores:[55.8,39.3,38.6,29.5,33.8,27.0,30.7,56.0,43.2]},
 {name:'GPT-Image-2.5', strict:14.9, relaxed:29.6, scores:[41.8,36.4,34.8,24.1,23.7,25.0,34.6,21.9,25.9]},
 {name:'Seedream 5.0 Pro', strict:15.1, relaxed:28.4, scores:[30.8,36.0,32.7,16.6,30.8,20.7,23.7,34.7,26.6]},
 {name:'Nano Banana 2', strict:12.4, relaxed:25.4, scores:[28.5,27.3,18.4,27.0,23.0,18.3,20.9,32.5,29.3]},
 {name:'GPT-Image-2', strict:10.2, relaxed:23.4, scores:[32.8,26.7,29.6,17.2,20.3,17.3,24.9,18.2,25.1]}
];

function renderConstraintBoard() {
 const first = constraintModels[0];
 return `<section class="eval-figure constraint-board" id="eval-board-8" aria-labelledby="constraint-title">
  <header>
   <h3 id="constraint-title">How well do image models follow constraints?</h3>
   <p>Five highest-scoring text-to-image models by overall relaxed score in <a href="https://arxiv.org/html/2610.26850v1#S4.T1">GenOlympiad</a>.</p>
  </header>
  <div class="constraint-layout">
   <div class="constraint-ranking">
    <h4>Overall scores <span>/ 100</span></h4>
    <div class="constraint-columns" aria-hidden="true"><span>Model</span><span>Strict</span><span>Relaxed</span></div>
    ${constraintModels.map((model,index)=>`<button type="button" class="constraint-model" aria-pressed="${index===0}" aria-controls="constraint-breakdown" aria-label="${model.name}, strict ${model.strict.toFixed(1)}, relaxed ${model.relaxed.toFixed(1)} out of 100"><span>${model.name}</span><span>${model.strict.toFixed(1)}</span><span>${model.relaxed.toFixed(1)}</span></button>`).join('')}
    <p class="constraint-note">Strict requires all hard constraints to be met. Relaxed gives partial credit.</p>
   </div>
   <div id="constraint-breakdown">
    <h4>Relaxed scores by category <span>/ 100</span></h4>
    <p class="constraint-active-model">${first.name}</p>
    <dl class="constraint-scores">
     ${constraintCategories.map((label,index)=>`<div><dt>${label}</dt><dd><span class="constraint-track" aria-hidden="true"><span style="--score:${first.scores[index]/100}"></span></span><span class="constraint-value">${first.scores[index].toFixed(1)}</span></dd></div>`).join('')}
    </dl>
   </div>
  </div>
  <blockquote class="constraint-prompt">“Create a clean overhead photograph of twelve ceramic tiles arranged in 4 rows and 3 columns. Use exactly four blue, four red and four yellow tiles. Place every blue tile in the left column.”</blockquote>
 </section>`;
}

function setupConstraintBoard(reduced) {
 const board = document.getElementById('eval-board-8');
 const buttons = [...board.querySelectorAll('.constraint-model')];
 const values = board.querySelectorAll('.constraint-value');
 const bars = board.querySelectorAll('.constraint-track > span');
 const name = board.querySelector('.constraint-active-model');
 let previewTimer;
 const show = index => {
  const model = constraintModels[index];
  buttons.forEach((button,i)=>button.setAttribute('aria-pressed', String(i===index)));
  name.textContent = model.name;
  model.scores.forEach((score,i)=>{
   values[i].textContent = score.toFixed(1);
   bars[i].style.setProperty('--score', score/100);
  });
 };
 const observer = new IntersectionObserver(([entry])=>{
  if(!entry.isIntersecting || reduced.matches)return;
  observer.disconnect();
  let index = 0;
  previewTimer = setInterval(()=>{
   index = (index+1)%buttons.length;
   show(index);
   if(index===0)clearInterval(previewTimer);
  }, 1600);
 }, {threshold:.15});
 const stopPreview = () => {
  observer.disconnect();
  clearInterval(previewTimer);
 };
 buttons.forEach((button,index)=>{
  const select = () => { stopPreview(); show(index); };
  button.addEventListener('pointerenter',select);
  button.addEventListener('focus',select);
  button.addEventListener('click',select);
 });
 reduced.addEventListener('change',stopPreview);
 if(!reduced.matches)observer.observe(board);
}

const evidenceTimeline = (id, image) => id === 6 ? `<span class="evidence-timeline">${image}<span class="evidence-timeline-marker" aria-hidden="true"></span></span>` : image;

window.renderEvaluationStudy = () => `<section class="eval-graphs" aria-labelledby="eval-heading"><h2 id="eval-heading">Methods and results</h2><p class="eval-intro">Published measurements, qualitative observations and proposed evaluation protocols.</p><div class="eval-gallery" role="region" aria-label="Evaluation boards">${window.EVALUATION_BOARDS.map(b=>`<figure class="eval-figure" id="eval-board-${b.id}">${b.id===7?`<h3 class="eval-coverage-title">${b.title}</h3>`:''}<button type="button" class="eval-open" data-eval-open="${b.id}" aria-label="View ${b.title} at full size">${b.motion?`<video class="eval-animation" src="assets/evaluation-study-${b.id}.mp4?v=labels-cleanup-20261116" poster="assets/evaluation-study-${b.id}.png?v=labels-cleanup-20261116" muted loop playsinline preload="none" width="3200" height="2584" aria-label="${b.title}"></video>`:evidenceTimeline(b.id,`<img src="assets/evaluation-study-${b.id}.png?v=labels-cleanup-20261116" alt="${b.title}" width="3200" height="2584" loading="lazy" decoding="async">`)}</button>${b.id===7?'':`<figcaption><strong>${b.title}</strong><span>${b.note}</span></figcaption>`}</figure>`).join('')}${renderConstraintBoard()}</div></section><dialog class="eval-lightbox" aria-label="Full-size evaluation board"><header><span data-eval-title></span><button type="button" data-eval-close aria-label="Close full-size board">Close ×</button></header><div class="eval-lightbox-media"></div><a data-eval-original target="_blank" rel="noopener">Open original image ↗</a></dialog>`;
document.addEventListener('DOMContentLoaded',()=>{
 const gallery=document.querySelector('.eval-gallery');
 if(!gallery)return;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 setupConstraintBoard(reduced);
 const videos=[...gallery.querySelectorAll('video')];
 const playback=()=>videos.forEach(v=>{if(v.dataset.visible==='true'&&!reduced.matches&&!document.hidden)v.play().catch(()=>{});else v.pause();});
 const observer=new IntersectionObserver(entries=>{entries.forEach(e=>e.target.dataset.visible=String(e.isIntersecting));playback();},{threshold:.1});
 videos.forEach(v=>observer.observe(v));
 reduced.addEventListener('change',playback);document.addEventListener('visibilitychange',playback);
 const dialog=document.querySelector('.eval-lightbox'),media=dialog.querySelector('.eval-lightbox-media');
 document.querySelectorAll('[data-eval-open]').forEach(b=>b.addEventListener('click',()=>{const item=window.EVALUATION_BOARDS.find(x=>x.id===Number(b.dataset.evalOpen));dialog.dataset.board=String(item.id);dialog.querySelector('[data-eval-title]').textContent=item.title;dialog.querySelector('[data-eval-original]').href=`assets/evaluation-study-${item.id}.png?v=labels-cleanup-20261116`;media.innerHTML=item.motion?`<video src="assets/evaluation-study-${item.id}.mp4?v=labels-cleanup-20261116" poster="assets/evaluation-study-${item.id}.png?v=labels-cleanup-20261116" controls ${reduced.matches?'':'autoplay'} muted loop playsinline aria-label="${item.title}"></video>`:evidenceTimeline(item.id,`<img src="assets/evaluation-study-${item.id}.png?v=labels-cleanup-20261116" alt="${item.title}">`);dialog.showModal();}));
 dialog.querySelector('[data-eval-close]').addEventListener('click',()=>dialog.close());
 dialog.addEventListener('close',()=>{media.innerHTML='';});
 dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
});
