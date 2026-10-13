const projects=window.PORTFOLIO;
const slideFile=n=>`assets/slide-${String(n).padStart(2,'0')}.${[5,7,9,11].includes(n)?'jpg':'png'}`;
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const external=(label,url)=>`<a href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(label)} ↗</a>`;
const href=p=>p.live||`${p.id}.html`;
const projectLink=(p,label)=>p.live?external(label,p.live):`<a href="${href(p)}">${esc(label)} →</a>`;
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
function video(file,label,controls=false){return `<video class="uncropped-video" ${controls?'controls':''} ${reduced?'':'autoplay'} muted loop playsinline preload="metadata" aria-label="${esc(label)}"><source src="assets/${file}" type="video/mp4"></video>`;}
function image(n,label){
 const p=projects.find(p=>p.slide===n);
 const regions=n===7?[[.351,.147,.313,.382],[.677,.146,.304,.765],[.375,.68,.285,.21]]:n===9?[[.225,.17,.325,.285],[.214,.552,.167,.30],[.597,.463,.344,.392]]:n===11?[[.453,.09,.381,.38],[.448,.525,.408,.405]]:n===3?[[.414,.207,.218,.746],[.684,.216,.267,.282],[.677,.739,.26,.18]]:[p?.crop||(n===11?[.443,.084,.414,.86]:[0,0,1,1])];
 return `<div class="asset-gallery ${n===3?'medal-assets':''}">${regions.map(([x,y,w,h],i)=>`<div class="asset-window" style="--asset-ratio:${w*16/(h*9)};--asset-width:${100/w}%;--asset-left:${-x/w*100}%;--asset-top:${-y/h*100}%"><img src="${slideFile(n)}" alt="${esc(label)}${regions.length>1?' — asset '+(i+1):''}" loading="lazy" decoding="async"></div>`).join('')}</div>`;
}
const funding=projects.find(p=>p.id==='fundraise');
funding.animation='https://tarshaakrishnaraj.com/images/flora-series-a.gif';
const animatedImage=p=>`<img class="uncropped-image" src="${p.animation}" alt="${esc(p.title)} announcement animation">`;
const selected=document.body.dataset.project;
if(selected){
 const p=projects.find(p=>p.id===selected);
 document.getElementById('main').innerHTML=`<a class="detail-back" href="./#${p.id}">← Back to work</a><h1>${esc(p.title)}</h1><p class="detail-meta">${esc(p.role||p.category)}${p.date?' · '+esc(p.date):''}</p><p class="detail-description">${esc(p.journey||p.focus)}</p><div class="detail-media">${p.animation?animatedImage(p):p.video?video(p.video,p.title,true):''}${p.slide&&!p.animation?image(p.slide,p.title+' — project assets'):''}${p.extraVideo?video(p.extraVideo,p.title,true):''}${p.extraDescription?`<p>${esc(p.extraDescription)}</p>`:''}${(p.extraSlides||[]).map(n=>image(n,p.title+' — additional work')).join('')}</div>${p.objects?`<div class="detail-objects">${p.objects.map(([n,d])=>`<p>${esc(n)}<br><small>${esc(d)}</small></p>`).join('')}</div>`:''}<div class="detail-links">${p.links.map(([l,u])=>external(l,u)).join('')}</div>`;
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

 function card(p){return `<section class="project-section" id="${p.id}"><div class="project-copy"><h2>${projectLink(p,p.title)}</h2><p class="journey">${esc(p.journey||p.focus)}</p><div class="project-links">${projectLink(p,p.live?'Explore live':'Learn more')}</div></div><div class="project-visual"><p class="category">${esc(p.category)}</p><a class="media-link" href="${href(p)}" ${p.live?'target="_blank" rel="noopener noreferrer"':''} aria-label="Open ${esc(p.title)}">${p.animation?animatedImage(p):p.video?video(p.video,p.title):image(p.slide,p.title)}</a></div></section>`;}
 document.getElementById('projects').innerHTML=work.map(card).join('')+`<h2 class="lab-heading">Cook Lab</h2>`+lab.map(card).join('');
 const navStyle=document.createElement('style');
 navStyle.textContent='nav a[data-project-nav]{color:var(--muted);text-decoration:none}nav a[data-project-nav]:hover,nav a[data-project-nav][aria-current="location"]{color:#fff}nav a[data-project-nav]:hover span,nav a[data-project-nav][aria-current="location"] span{color:#99c9ff}';
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
