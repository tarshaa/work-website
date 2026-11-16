const arrow = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 12h16M14 6l6 6-6 6" stroke="currentColor" stroke-width="1.4" stroke-linecap="square" stroke-linejoin="miter"/></svg>';
const assets={
  techniques:'techniques-loop.gif', models:'eval-omni-loop-hd-v33.gif',
  'fauna-settings':'fauna-loop.gif', landing:'flora-blackfriday-promo-loop.gif',
  motion:'elements-cover-loop.gif', physical:'physical-creator-packet-cover.webp',
  'mcp-api':'flora-mcp-api-loop.gif', fundraise:'../images/flora-series-a.gif',
  film:'magnolia-assessment-loop.gif','creative-context-cli':'creative-context-cli-loop.gif'
};
const copy={
  techniques:'Making complex creative workflows easy to discover, set up, and run.',
  models:'Model behavior translated into visual studies and practical creative guidance.',
  'fauna-settings':'Designing how Fauna interprets a request, communicates progress, and keeps people in control.',
  landing:'Creative examples and a clear first step into the FLORA canvas.',
  motion:'Reusable references, generation states, and feedback close to the work.',
  'feature-demos':'Focused product demos that make everyday tools easier to discover.',
  physical:'Field guides, printed matter, and objects that take FLORA beyond the screen.',
  'mcp-api':'Extending FLORA’s visual language into developer tools and connected workflows.',
  fundraise:'Scripting, filming, and editing the story of FLORA’s Series A.',
  film:'Brand and trailer work across five films, shaped through pacing and visual detail.',
  'creative-context-cli':'Pinterest references synced locally and searchable by mood, aesthetic, and pattern.'
};
const newMotion=[
 {id:'image-editor',title:'Image Editor',role:'Motion design · Product marketing',category:'FLORA',summary:'Showing how compositing, inpainting, and image editing work directly on the FLORA canvas.',newMotion:true,pair:'Motion study / 01',asset:'image-editor-loop-1080.gif'},
 {id:'creative-directions',title:'Twenty creative directions',role:'Product marketing · Agent behavior',category:'FLORA',summary:'Demonstrating how an agent develops one brief into multiple creative directions, with outputs people can compare and refine.',newMotion:true,pair:'Motion study / 02',asset:'creative-directions-loop-1080.gif'}
];
const work=window.PORTFOLIO.filter(p=>!p.lab);
const fauna=work.find(p=>p.id==='fauna-settings');
if(fauna){fauna.title='Fauna — designing agent behavior';fauna.role='Product design · Agent behavior';}
work.splice(6,0,...newMotion);
const lab=window.PORTFOLIO.filter(p=>p.lab);
const esc=s=>String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function cover(p,n){
 if(p.id==='operating-manual')return '<img src="assets/operating-manual-field-guide.png" alt="The Mechanics of Meaning book spread on a green surface" width="3824" height="2144" loading="lazy" decoding="async">';
 if(p.id==='fauna-settings')return '<picture><source media="(prefers-reduced-motion: reduce)" srcset="assets/fauna-cover-final-poster.webp"><img src="assets/fauna-cover-large-4k-loop.gif" alt="Fauna agent behavior: prompt, thinking, and output" width="3840" height="2880" loading="eager" decoding="async"></picture>';
 if(p.id==='models')return '<picture><source media="(prefers-reduced-motion: reduce)" srcset="assets/eval-omni-still-hd-v33.png"><img src="assets/eval-omni-loop-hd-v33.gif" alt="Omni model evaluations: animated strengths and weaknesses" width="2392" height="1968" loading="eager" decoding="async"></picture>';
 if(p.id==='mcp-api')return '<img src="assets/fauna-pattern-grid-poster.webp" alt="Six monochrome Fauna orbs">';
 if(p.id==='physical')return '<img src="assets/physical-sticker-pack-figma.png" alt="FLORA sticker pack with controller, ticket, screen, booklet, tag, and illustrated designs" width="2469" height="1575" loading="lazy" decoding="async">';
 if(p.id==='feature-demos')return '<img src="assets/features-zoom-original.png" alt="FLORA Zoom to fit keyboard shortcut and navigation tools" width="3390" height="1966" loading="lazy" decoding="async">';
 let src='assets/'+(p.asset||assets[p.id]);
 const alt=p.newMotion?p.title+' motion study':p.title+' project cover';
 return `<img src="${src}" alt="${esc(alt)}" loading="${n<2?'eager':'lazy'}" decoding="async">`;
}
function card(p,n){
 const href=p.newMotion?'motion-studies.html#'+p.id:p.id+'.html';
 const action='';
 const count=String(n+1).padStart(2,'0');
 const interactive=p.id==='mcp-api';
 const standalone=p.id==='physical';
 const coverTag=interactive||standalone?'div':'a';
 const coverAttrs=interactive?'role="group" aria-label="Interactive Fauna motion studies"':standalone?'':`href="${href}" aria-label="Open ${esc(p.title)}"`;
 return `<article class="project-card" id="${p.id}">
 <${coverTag} class="cover ${interactive?'interactive-orbs':''} ${p.newMotion?'motion-piece':''} ${p.id==='models'?'model-evals':''} ${p.id==='fauna-settings'?'fauna':''} ${p.id==='physical'?'physical':''} ${p.id==='feature-demos'?'feature':''}" ${coverAttrs}>${cover(p,n)}</${coverTag}>
 <div class="card-meta"><span class="tiny-cross" aria-hidden="true"></span><span class="count">${count}</span>${!p.lab&&p.id!=='film'?'<span class="client-name">FLORA</span>':''}<span>${esc(p.lab?'Cook Lab · Build':p.role)}</span></div>
 <div class="card-title"><h2>${standalone?esc(p.title):`<a class="title-link" href="${href}" ${action}>${esc(p.title)}</a>`}</h2>${standalone?'':`<a class="arrow-link" href="${href}" ${action} aria-label="Explore ${esc(p.title)}">${arrow}</a>`}</div>
 <p class="card-summary">${esc(p.summary||copy[p.id])}</p></article>`;
}
document.querySelector('#work').innerHTML=work.map(card).join('');
document.querySelector('#lab-projects').innerHTML=lab.map(card).join('');
document.querySelector('#project-nav').innerHTML=work.map(p=>`<a href="#${p.id}" data-nav="${p.id}"><span class="index-dot" aria-hidden="true"></span>${esc(p.title)}</a>`).join('');

const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){document.querySelectorAll('[data-nav]').forEach(a=>{if(a.dataset.nav===entry.target.id)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});}});},{rootMargin:'-15% 0px -55% 0px',threshold:0});
document.querySelectorAll('#work .project-card').forEach(card=>observer.observe(card));

const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
const playback=new IntersectionObserver(entries=>entries.forEach(({target,isIntersecting})=>{target.dataset.inView=String(isIntersecting);if(isIntersecting&&!reducedMotion.matches&&!document.hidden)target.play().catch(()=>{});else target.pause();}),{rootMargin:'180px'});
document.querySelectorAll('.cover video').forEach(video=>playback.observe(video));
const refreshPlayback=()=>document.querySelectorAll('.cover video').forEach(video=>{if(video.dataset.inView==='true'&&!reducedMotion.matches&&!document.hidden)video.play().catch(()=>{});else video.pause();});
reducedMotion.addEventListener('change',refreshPlayback);
document.addEventListener('visibilitychange',refreshPlayback);
