const arrow = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 12h16M14 6l6 6-6 6" stroke="currentColor" stroke-width="1.4" stroke-linecap="square" stroke-linejoin="miter"/></svg>';
const assets={
  techniques:'techniques-loop.gif', models:'eval-omni-loop-hd-v33.gif',
  'fauna-settings':'fauna-loop.gif', landing:'flora-blackfriday-promo-loop.gif',
  motion:'elements-cover-loop.gif', physical:'physical-creator-packet-cover.webp',
  fundraise:'../images/flora-series-a.gif',
  film:'magnolia-assessment-loop.gif','creative-context-cli':'creative-context-cli-loop.gif'
};
const copy={
  "techniques": "Find and run a reusable workflow without rebuilding it.",
  models:'Model behavior translated into visual studies and practical creative guidance.',
  "fauna-settings": "See what an agent is doing and decide how it should proceed.",
  "landing": "Understand what FLORA does and where to start.",
  "motion": "Reuse visual references and see when a generation is ready.",
  "feature-demos": "Find shortcuts, share feedback, and understand team controls.",
  "image-editor": "Refine part of an image without leaving the canvas.",
  "creative-directions": "Turn a canvas workflow into a tool others can run.",
  "physical": "Bring FLORA’s visual identity into print and physical objects.",
  "operating-manual": "Give creative teams a practical guide to generative tools.",
  "mcp-api": "Use FLORA tools from your own agent or workflow.",
  "fundraise": "Explain what the Series A means for FLORA and its users.",
  "film": "Give audiences a feel for each film before they watch.",
  "creative-context-cli": "Find visual references without digging through saved boards."
};
const newMotion=[
 {id:'image-editor',title:'Image Editor',role:'Motion design · Product marketing',category:'FLORA',summary:'Showing how compositing, inpainting, and image editing work directly on the FLORA canvas.',newMotion:true,pair:'Motion study / 01',asset:'image-editor-loop-1080.gif'},
 {id:'creative-directions',title:'Product marketing',role:'Motion design · Interface design',category:'FLORA',summary:'Showing how Technique Builder turns a canvas workflow into a reusable tool that others can run.',newMotion:true,pair:'Motion study / 02',asset:'technique-builder-loop-4k.gif'}
];
const work=window.PORTFOLIO.filter(p=>!p.lab);
const fauna=work.find(p=>p.id==='fauna-settings');
if(fauna){fauna.title='Fauna: designing agent behavior';fauna.role='Product design · Agent behavior';}
const faunaIndex=work.indexOf(fauna);
const featuresIndex=work.findIndex(p=>p.id==='feature-demos');
if(faunaIndex>=0&&featuresIndex>=0){
 [work[faunaIndex],work[featuresIndex]]=[work[featuresIndex],work[faunaIndex]];
}
work.splice(6,0,...newMotion);
const lab=window.PORTFOLIO.filter(p=>p.lab);
const esc=s=>String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const coverVideos={
 'techniques-loop.gif':'techniques.mp4',
 'eval-omni-loop-hd-v33.gif':'cover-videos/omni.mp4',
 'fauna-cover-large-4k-loop.gif':'cover-videos/fauna.mp4',
 'flora-blackfriday-promo-loop.gif':'flora-blackfriday-promo.mp4',
 'elements-cover-loop.gif':'elements-cover.mp4',
 'image-editor-loop-1080.gif':'image-editor.mp4',
 'technique-builder-loop-4k.gif':'technique-builder-from-5s-4k.mp4',
 'flora-series-a.gif':'cover-videos/series-a.mp4',
 'magnolia-assessment-loop.gif':'magnolia-assessment.mp4',
 'creative-context-cli-loop.gif':'creative-context-cli.mp4'
};
function loopVideo(src, alt, eager=false, dimensions='') {
 const filename=src.split('/').pop();
 const poster='assets/cover-posters/'+filename.replace(/\.gif$/,'.webp');
 return `<video class="cover-loop" data-video-src="assets/${coverVideos[filename]}" poster="${poster}" aria-label="${esc(alt)}" ${dimensions} muted autoplay loop playsinline preload="none" disablepictureinpicture></video>`;
}
function cover(p,n){
 if(p.id==='operating-manual')return '<img src="assets/operating-manual-field-guide.webp" alt="The Mechanics of Meaning book spread on a green surface" width="3824" height="2144" loading="lazy" decoding="async">';
 if(p.id==='fauna-settings')return loopVideo('assets/fauna-cover-large-4k-loop.gif','Fauna agent behavior: prompt, thinking, and output',false,'width="3840" height="2880"');
 if(p.id==='models')return loopVideo('assets/eval-omni-loop-hd-v33.gif','Omni model evaluations: animated strengths and weaknesses',true,'width="2392" height="1968"');
 if(p.id==='mcp-api')return '<video class="cover-loop" data-video-src="assets/flora-mcp-api.mp4#t=7" data-loop-start="7" poster="assets/cover-posters/flora-mcp-api-at-7s.webp" aria-label="FLORA MCP and API launch animation" width="1920" height="1080" muted autoplay playsinline preload="none" disablepictureinpicture></video>';
 if(p.id==='physical')return '<img src="assets/physical-sticker-pack-updated.webp" alt="FLORA sticker pack with controller, ticket, screen, booklet, tag, and illustrated designs" width="2469" height="1575" loading="lazy" decoding="async">';
 if(p.id==='feature-demos')return '<img src="assets/features-product-design.png" alt="FLORA canvas with collaborator comments, sharing permissions, team credits, and a keyboard shortcut panel" width="1498" height="723" loading="lazy" decoding="async">';
 let src='assets/'+(p.asset||assets[p.id]);
 const alt=p.newMotion?p.title+' motion study':p.title+' project cover';
 return src.endsWith('.gif') ? loopVideo(src,alt,n<2&&!p.lab) : `<img src="${src}" alt="${esc(alt)}" loading="lazy" decoding="async">`;
}
function card(p,n){
 const href=p.newMotion?'motion-studies.html#'+p.id:p.id+'.html';
 const action='';
 const count=String(n+1).padStart(2,'0');
 const standalone=p.id==='physical';
 const coverTag=standalone?'div':'a';
 const coverAttrs=standalone?'':`href="${href}" aria-label="Open ${esc(p.title)}"`;
 return `<article class="project-card" id="${p.id}">
 <${coverTag} class="cover ${p.newMotion?'motion-piece':''} ${p.id==='models'?'model-evals':''} ${p.id==='fauna-settings'?'fauna':''} ${p.id==='physical'?'physical':''} ${p.id==='feature-demos'?'feature':''}" ${coverAttrs}>${cover(p,n)}</${coverTag}>
 <div class="card-meta"><span class="tiny-cross" aria-hidden="true"></span><span class="count">${count}</span>${!p.lab&&p.id!=='film'?'<span class="client-name">FLORA</span>':''}<span>${esc(p.lab?'Cook Lab · Build':p.role)}</span></div>
 <div class="card-title"><h2>${standalone?esc(p.title):`<a class="title-link" href="${href}" ${action}>${esc(p.title)}</a>`}</h2>${standalone?'':`<a class="arrow-link" href="${href}" ${action} aria-label="Explore ${esc(p.title)}">${arrow}</a>`}</div>
 <p class="card-summary">${esc(copy[p.id]||p.summary)}</p></article>`;
}
document.querySelector('#work').innerHTML=work.map(card).join('');
document.querySelector('#lab-projects').innerHTML=lab.map(card).join('');
document.querySelector('#project-nav').innerHTML=work.map(p=>`<a href="#${p.id}" data-nav="${p.id}"><span class="index-dot" aria-hidden="true"></span>${esc(p.title)}</a>`).join('');

const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){document.querySelectorAll('[data-nav]').forEach(a=>{if(a.dataset.nav===entry.target.id)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});}});},{rootMargin:'-15% 0px -55% 0px',threshold:0});
document.querySelectorAll('#work .project-card').forEach(card=>observer.observe(card));

// Start automatically near the viewport. Offscreen covers never compete for downloads.
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
let motionPaused=reducedMotion.matches;
const coverLoops=[...document.querySelectorAll('.cover video')];
function refreshPlayback(){
 coverLoops.forEach(video=>{
  video.muted=true;
  if(video.dataset.inView==='true'&&!motionPaused&&!document.hidden){
   if(!video.getAttribute('src')){video.src=video.dataset.videoSrc;video.load();}
   video.play().then(()=>{video.controls=false;}).catch(()=>{video.controls=true;});
  }else video.pause();
 });
}
function updateMotion(){
 document.documentElement.classList.toggle('motion-paused',motionPaused);
 refreshPlayback();
 document.dispatchEvent(new CustomEvent('portfolio-motion-change',{detail:{paused:motionPaused}}));
}
const playback=new IntersectionObserver(entries=>{
 entries.forEach(({target,isIntersecting})=>target.dataset.inView=String(isIntersecting));
 refreshPlayback();
},{rootMargin:'120px 0px'});
coverLoops.forEach(video=>playback.observe(video));
const mcpCover=document.querySelector('#mcp-api .cover-loop');
mcpCover?.addEventListener('ended',()=>{
 mcpCover.currentTime=Number(mcpCover.dataset.loopStart);
 refreshPlayback();
});
reducedMotion.addEventListener('change',()=>{motionPaused=reducedMotion.matches;updateMotion();});
document.addEventListener('visibilitychange',refreshPlayback);
updateMotion();
