const projects=window.PORTFOLIO;
const slideFile=n=>`assets/slide-${String(n).padStart(2,'0')}.${[5,7,9,11].includes(n)?'jpg':'png'}`;
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const external=(label,url)=>`<a href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(label)} ↗</a>`;
const href=p=>p.live||`${p.id}.html`;
const projectLink=(p,label)=>p.live?external(label,p.live):`<a href="${href(p)}">${esc(label)} →</a>`;
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
function video(file,label,controls=false){return `<video class="uncropped-video" ${controls?'controls':''} ${reduced?'':'autoplay'} muted loop playsinline preload="metadata" aria-label="${esc(label)}"><source src="assets/${file}" type="video/mp4"></video>`;}
function image(n,label,separate=false){
 const p=projects.find(p=>p.slide===n);
 const regions=n===7?[[.351,.147,.313,.382],[.677,.146,.304,.765],[.375,.68,.285,.21]]:n===9?[[.225,.17,.325,.285],[.214,.552,.167,.30],[.597,.463,.344,.392]]:n===11?[[.453,.09,.381,.38],[.448,.525,.408,.405]]:n===3?[[.414,.207,.218,.746],[.684,.216,.267,.282],[.677,.739,.26,.18]]:[p?.crop||(n===11?[.443,.084,.414,.86]:[0,0,1,1])];
 const detailRegions=n===10?[[.039,.301,.153,.41],[.233,.374,.139,.146],[.379,.337,.144,.192],[.234,.572,.138,.143],[.425,.573,.065,.14],[.233,.747,.105,.125],[.562,.098,.375,.862]]:n===8?[[.617,.176,.363,.645],[.382,.745,.194,.132],[.065,.632,.12,.227]]:regions;
 const titles={7:['Shared team usage','Claude Opus 4.5 tasting notes','Model workflow on the canvas'],9:['Feature demonstration','Editing interaction','Zoom-to-fit'],11:['FAUNA identity','Creative directions'],8:['Assistant preferences','Assistant entry point','FAUNA visual identity'],10:['Field guide','Operating manual','Personal creator packet','Magnets','Physical object','Sticker','Manual spreads']};
 if(separate)return detailRegions.map(([x,y,w,h],i)=>`<figure class="detail-design"><div class="design-surface"><div class="design-window" style="--design-ratio:${w*16/(h*9)};aspect-ratio:var(--design-ratio);--asset-width:${100/w}%;--asset-left:${-x/w*100}%;--asset-top:${-y/h*100}%"><img src="${slideFile(n)}" alt="${esc(titles[n]?.[i]||label)}" loading="lazy"></div></div><figcaption>${esc(titles[n]?.[i]||label)}</figcaption></figure>`).join('');
 return `<div class="asset-gallery ${n===3?'medal-assets':''}">${regions.map(([x,y,w,h],i)=>`<div class="asset-window" style="--asset-ratio:${w*16/(h*9)};--asset-width:${100/w}%;--asset-left:${-x/w*100}%;--asset-top:${-y/h*100}%"><img src="${slideFile(n)}" alt="${esc(label)}${regions.length>1?' — asset '+(i+1):''}" loading="lazy" decoding="async"></div>`).join('')}</div>`;
}
const funding=projects.find(p=>p.id==='fundraise');
funding.animation='https://tarshaakrishnaraj.com/images/flora-series-a.gif';
const animatedImage=p=>`<img class="uncropped-image" src="${p.animation}" alt="${esc(p.title)} project visual">`;
const detailStyle=document.createElement('style');
detailStyle.textContent='.eval-graphs{margin:8px 0 48px}.eval-graphs h2{font-size:19px;letter-spacing:-.02em;margin-bottom:12px}.eval-intro{font-size:13px;line-height:1.6;color:var(--muted);margin-bottom:28px}.eval-figure{margin:0 0 32px}.eval-figure img{display:block;width:100%;height:auto;border-radius:8px}.eval-figure figcaption{display:flex;flex-wrap:wrap;justify-content:space-between;gap:10px;margin-top:11px;font-size:11px;color:var(--muted)}.eval-figure figcaption a{color:#99c9ff}'+'.detail-media{gap:42px}.detail-design{margin:0;min-width:0}.design-surface{padding:24px;background:#000;border-radius:10px;display:flex;justify-content:center}.design-window{position:relative;overflow:hidden;width:min(100%,calc(600px * var(--design-ratio)));max-width:720px;max-height:none}.design-window img{position:absolute;width:var(--asset-width);max-width:none;height:auto;left:var(--asset-left);top:var(--asset-top)}.detail-design figcaption{font-size:12px;color:var(--muted);margin-top:12px}.model-context{margin:0 0 40px;padding-top:4px;max-width:680px}.model-context h2{font-size:18px;letter-spacing:-.02em;margin:24px 0 10px}.model-context p{font-size:14px;line-height:1.65;margin-bottom:14px;color:var(--muted)}.model-context a{color:#99c9ff}.design-window:has(img[alt="Claude Opus 4.5 tasting notes"]){max-width:420px}@media(max-width:600px){.design-surface{padding:14px}.detail-media{gap:30px}}';
document.head.append(detailStyle);
const evalSources={omni:'https://flora.ai/blog/omni-is-an-editor-not-a-filmmaker.-use-it-accordingly.',recraft:'https://flora.ai/blog/tasting-notes-recraft-v4',opus:'https://flora.ai/blog/tasting-notes-claude-opus-4.5'};
const modelGraphs=`<section class="eval-graphs" aria-label="Model evaluation graphics"><h2>Reading model behavior</h2><p class="eval-intro">Three views of published FLORA evaluations: scored observations where available, qualitative findings where they are not.</p>${[['omni','Omni — selected human ratings','Published team evaluation · article by Megha Narayan'],['recraft','Recraft v4 — workflow strengths and limits','My authored review · qualitative findings'],['opus','Opus 4.5 — visual reasoning workflow','My authored review · qualitative findings']].map(([id,title,credit])=>`<figure class="eval-figure"><a href="assets/eval-${id}.svg" target="_blank" rel="noopener noreferrer" aria-label="Open ${title}"><img src="assets/eval-${id}.svg" alt="${title}" width="1200" height="800"></a><figcaption><span>${credit}</span>${external('Read source',evalSources[id])}</figcaption></figure>`).join('')}</section>`;
const modelContext=`<section class="model-context" aria-label="Model evaluation context"><h2>From model behavior to product decisions</h2><p>I explore where a model belongs in a creative workflow: which inputs it understands, where it preserves intent, and where users need clearer expectations. My Recraft v4 and Opus 4.5 reviews translate those observations into practical guidance.</p><h2>What the findings change</h2><p>Recraft v4 is useful for generating visual directions, with limitations around structural preservation and dense text. Opus 4.5 adds a reasoning step between references and image generation. The team’s Omni evaluation points toward transformation tasks, with specific constraints around camera behavior and consistency.</p><h2>Context alongside the choice</h2><p>The designs below connect model exploration with the product experience: shared team usage, published tasting notes, and a canvas workflow. The goal is to help creators decide what to try and understand the resources available to iterate.</p></section>`;
const selected=document.body.dataset.project;
if(selected){
 const p=projects.find(p=>p.id===selected);
 document.getElementById('main').innerHTML=`<a class="detail-back" href="./#${p.id}">← Back to work</a><h1>${esc(p.title)}</h1><p class="detail-meta">${esc(p.role||p.category)}${p.date?' · '+esc(p.date):''}</p><p class="detail-description">${esc(p.journey||p.focus)}</p>${p.id==='models'?modelGraphs+modelContext:''}<div class="detail-media">${p.animation?animatedImage(p):p.video?video(p.video,p.title,true):''}${p.assetImage?`<img class="uncropped-image" src="${p.assetImage}" alt="${esc(p.title)} — Elements panel">`:p.slide&&!p.animation&&(!p.video||p.id==='fauna-settings')?image(p.slide,p.title+' — project assets',true):''}${p.extraVideo?video(p.extraVideo,p.title,true):''}${p.extraDescription?`<p>${esc(p.extraDescription)}</p>`:''}${(p.extraSlides||[]).map(n=>image(n,p.title+' — additional work',true)).join('')}</div>${p.objects?`<div class="detail-objects">${p.objects.map(([n,d])=>`<p>${esc(n)}<br><small>${esc(d)}</small></p>`).join('')}</div>`:''}<div class="detail-links">${p.links.map(([l,u])=>external(l,u)).join('')}</div>`;
}else{
 const work=projects.filter(p=>!p.lab),lab=projects.filter(p=>p.lab);
 const nav=(ps)=>ps.map((p,i)=>`<a data-project-nav="${p.id}" href="${href(p)}" ${p.live?'target="_blank" rel="noopener noreferrer"':''}><span>${i+1}</span>${esc(p.title)}</a>`).join('');
 document.getElementById('project-index').innerHTML=nav(work);document.getElementById('lab-index').innerHTML=nav(lab);
 const sidebar=document.querySelector('.sidebar');
 const toggle=document.createElement('button');toggle.className='mobile-menu-toggle';toggle.type='button';toggle.textContent='+';toggle.setAttribute('aria-label','Open navigation menu');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-controls','mobile-menu');sidebar.prepend(toggle);
 const menu=document.createElement('dialog');menu.id='mobile-menu';menu.className='mobile-menu';menu.setAttribute('aria-label','Navigation menu');
 menu.innerHTML=`<div class="mobile-menu-bar"><span>Explore</span><button type="button" class="mobile-menu-close" aria-label="Close navigation menu">×</button></div><h2>Work</h2><nav aria-label="Mobile work">${nav(work)}</nav><h2>Cook Lab</h2><nav aria-label="Mobile Cook Lab">${nav(lab)}</nav><div class="mobile-menu-contacts">${document.querySelector('.sidebar-bottom').innerHTML}</div>`;document.body.append(menu);
 toggle.addEventListener('click',()=>{menu.showModal();toggle.setAttribute('aria-expanded','true');});
 menu.querySelector('.mobile-menu-close').addEventListener('click',()=>menu.close());
 menu.addEventListener('click',e=>{if(e.target===menu){const r=menu.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)menu.close();}if(e.target.closest('a'))menu.close();});
 menu.addEventListener('close',()=>{toggle.setAttribute('aria-expanded','false');toggle.focus();});

 function card(p){const primary=p.animation?animatedImage(p):p.video?video(p.video,p.title):image(p.slide,p.title);return `<section class="project-section" id="${p.id}"><div class="project-copy"><h2>${projectLink(p,p.title)}</h2><p class="journey">${esc(p.journey||p.focus)}</p><div class="project-links">${projectLink(p,p.live?'Explore live':'Learn more')}</div></div><div class="project-visual"><p class="category">${esc(p.category)}</p><a class="media-link topic-box ${p.assetImage?'topic-pair':''}" href="${href(p)}" ${p.live?'target="_blank" rel="noopener noreferrer"':''} aria-label="Open ${esc(p.title)}">${primary}${p.assetImage?`<img class="uncropped-image" src="${p.assetImage}" alt="${esc(p.title)} — Elements panel">`:''}</a></div></section>`;}
 document.getElementById('projects').innerHTML=work.map(card).join('')+`<h2 class="lab-heading">Cook Lab</h2>`+lab.map(card).join('');
 const navStyle=document.createElement('style');
 navStyle.textContent='.topic-box{display:flex;width:100%;aspect-ratio:16/9;background:#000;border-radius:10px;padding:18px;align-items:center;justify-content:center;gap:14px;overflow:hidden}.topic-box>.uncropped-image,.topic-box>.uncropped-video{width:100%;height:100%;min-width:0;object-fit:contain;background:transparent;border-radius:0}.topic-box>.asset-gallery{height:100%;padding:0;border-radius:0;aspect-ratio:auto}.topic-pair{flex-direction:column}.topic-pair>.uncropped-image{height:calc(50% - 7px)}nav a[data-project-nav]{color:var(--muted);text-decoration:none}nav a[data-project-nav]:hover,nav a[data-project-nav][aria-current="location"]{color:#fff}nav a[data-project-nav]:hover span,nav a[data-project-nav][aria-current="location"] span{color:#99c9ff}';
 document.head.append(navStyle);
 const sections=[...document.querySelectorAll('.project-section')];
 const navLinks=[...document.querySelectorAll('[data-project-nav]')];
 function updateCurrentProject(){
  const marker=innerHeight*.3;
  let current=sections[0];
  for(const section of sections){if(section.getBoundingClientRect().top<=marker)current=section;else break;}
  for(const link of navLinks){if(link.dataset.projectNav===current?.id)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');}
 }
 let navFrame=0;
 addEventListener('scroll',()=>{if(!navFrame)navFrame=requestAnimationFrame(()=>{navFrame=0;updateCurrentProject();});},{passive:true});
 addEventListener('resize',updateCurrentProject);
 addEventListener('load',updateCurrentProject);
 updateCurrentProject();

 const dialog=document.getElementById('slide-dialog');
 document.querySelector('[data-slide="1"]')?.addEventListener('click',()=>{document.getElementById('slide-title').textContent='About & background';document.getElementById('slide-image').src=slideFile(1);document.getElementById('slide-image').alt='Portfolio experience and education';document.getElementById('slide-original').href='https://www.figma.com/deck/8pdDowjy9j9aVVz4kEyEts';dialog.showModal();});
 document.getElementById('close-dialog').addEventListener('click',()=>dialog.close());
}
