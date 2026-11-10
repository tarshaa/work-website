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
 const regions=n===7?[[.351,.147,.313,.382]]:n===9?[[.225,.17,.325,.285],[.214,.552,.167,.30],[.597,.463,.344,.392]]:n===11?[[.453,.09,.381,.38],[.448,.525,.408,.405]]:n===3?[[.414,.207,.218,.746],[.684,.216,.267,.282],[.677,.739,.26,.18]]:[p?.crop||(n===11?[.443,.084,.414,.86]:[0,0,1,1])];
 const detailRegions=n===10?[[.039,.301,.153,.41],[.562,.100,.181,.435],[.379,.337,.144,.192],[.234,.572,.138,.143],[.425,.573,.065,.14],[.233,.747,.105,.125],[.747,.100,.188,.435],[.562,.538,.375,.419]]:n===8?[[.617,.176,.363,.645],[.382,.745,.194,.132],[.065,.632,.12,.227]]:regions;
 const titles={7:['Shared team usage','Claude Opus 4.5 tasting notes','Model workflow on the canvas'],9:['Feature demonstration','Editing interaction','Zoom-to-fit'],11:['FAUNA identity','Creative directions'],8:['Assistant preferences','Assistant entry point','FAUNA visual identity'],10:['Field guide','Operating manual','Personal creator packet','Magnets','Physical object','Sticker','Creative evolution spread','Workflow spread']};
 if(separate)return detailRegions.map(([x,y,w,h],i)=>`<figure class="detail-design"><div class="design-surface"><div class="design-window" style="--native-display-width:${([5,7,9,11].includes(n)?3840:1920)*w/2}px;--design-ratio:${w*16/(h*9)};aspect-ratio:var(--design-ratio);--asset-width:${100/w}%;--asset-left:${-x/w*100}%;--asset-top:${-y/h*100}%"><img src="${slideFile(n)}" alt="${esc(titles[n]?.[i]||label)}" loading="lazy"></div></div><figcaption>${esc(titles[n]?.[i]||label)}</figcaption></figure>`).join('');
 return `<div class="asset-gallery ${n===3?'medal-assets':''}">${regions.map(([x,y,w,h],i)=>`<div class="asset-window" style="--asset-ratio:${w*16/(h*9)};--asset-width:${100/w}%;--asset-left:${-x/w*100}%;--asset-top:${-y/h*100}%"><img src="${slideFile(n)}" alt="${esc(label)}${regions.length>1?' — asset '+(i+1):''}" loading="lazy" decoding="async"></div>`).join('')}</div>`;
}
const funding=projects.find(p=>p.id==='fundraise');
funding.animation='https://tarshaakrishnaraj.com/images/flora-series-a.gif';
const animatedImage=p=>`<img class="uncropped-image" src="${p.animation}" alt="${esc(p.title)} project visual" style="max-width:${p.id==='motion'?500:600}px;margin-inline:auto">`;
const detailStyle=document.createElement('style');
detailStyle.textContent='.custom-surface{display:flex;justify-content:center}.custom-surface img{width:100%;height:auto;object-fit:contain;border-radius:12px}.custom-design figcaption h2{font-size:15px;letter-spacing:0;color:var(--ink);margin:14px 0 8px}.custom-design figcaption p{font-size:13px;line-height:1.65;max-width:660px}.benchmark-thumbnails{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;width:100%}.benchmark-thumbnails img{width:100%;height:auto;border-radius:8px}.topic-box.benchmark-preview{background:transparent;padding:0;aspect-ratio:auto;overflow:visible}.detail-media>.uncropped-image{max-width:600px;margin-inline:auto}'+ '.eval-graphs{margin:8px 0 48px}.eval-graphs h2{font-size:19px;letter-spacing:-.02em;margin-bottom:12px}.eval-intro{font-size:13px;line-height:1.6;color:var(--muted);margin-bottom:28px}.eval-figure{max-width:600px;margin:0 0 28px}.eval-figure img{display:block;width:100%;height:auto;border-radius:8px}.eval-figure figcaption{display:flex;flex-wrap:wrap;justify-content:space-between;gap:10px;margin-top:11px;font-size:11px;color:var(--muted)}.eval-figure figcaption a{color:#99c9ff}'+'.detail-media{gap:42px}.detail-design{margin:0;min-width:0}.design-surface{padding:24px;background:#000;border-radius:10px;display:flex;justify-content:center}.design-window{position:relative;overflow:hidden;width:min(100%,calc(600px * var(--design-ratio)));max-width:min(720px,var(--native-display-width,720px));max-height:none}.design-window img{position:absolute;width:var(--asset-width);max-width:none;height:auto;left:var(--asset-left);top:var(--asset-top)}.detail-design figcaption{font-size:12px;color:var(--muted);margin-top:12px}.model-context{margin:0 0 40px;padding-top:4px;max-width:680px}.model-context h2{font-size:18px;letter-spacing:-.02em;margin:24px 0 10px}.model-context p{font-size:14px;line-height:1.65;margin-bottom:14px;color:var(--muted)}.model-context a{color:#99c9ff}.design-window:has(img[alt="Claude Opus 4.5 tasting notes"]){max-width:420px}@media(max-width:600px){.design-surface{padding:14px}.detail-media{gap:30px}}';
detailStyle.textContent += `
  .case-notes {
    max-width: 680px;
    margin: 0 0 44px;
    display: grid;
    gap: 24px;
  }
  .case-note {
    position: relative;
    padding-left: 24px;
  }
  .case-note h2 {
    margin: 0 0 7px;
    font-size: 16px;
    letter-spacing: -.01em;
  }
  .case-note p {
    margin: 0;
    color: var(--muted);
    font-size: 14px;
    line-height: 1.65;
  }
  .case-plus {
    position: absolute;
    left: 0;
    top: .15em;
    color: var(--micro-blue, #2763dc);
    font: 600 16px/1.25 ui-monospace, monospace;
  }
  .mcp-designs {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 28px 18px;
    margin: 0 0 42px;
  }
  .mcp-design:first-child { grid-column: 1 / -1; }
  .mcp-design { margin: 0; min-width: 0; }
  .mcp-design .design-window { width: 100%; max-width: none; border-radius: 12px; }
  .mcp-design figcaption h2 { font-size: 16px; margin: 10px 0 5px; }
  .mcp-design figcaption p {
    margin: 0;
    color: var(--muted);
    font-size: 14px;
    line-height: 1.55;
  }
  .landing-pair {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: clamp(8px, 1.5vw, 16px);
    align-items: center;
  }
  .landing-pair .media-link { display: block; min-width: 0; }
  .landing-pair :is(video, img) {
    display: block;
    width: 100%;
    height: auto;
    border-radius: 8px;
    background: transparent;
  }
  @media (max-width: 540px) {
    .mcp-designs, .landing-pair { grid-template-columns: minmax(0, 1fr); }
  }
`;
document.head.append(detailStyle);
const caseNotes = {
  "techniques": [
    ["Make a workflow reusable","A Technique compresses a multi-step canvas workflow into a single node. I designed the discovery surface around visual examples so creators can start with the result they want, then find the workflow that produces it."],
    ["Show what’s needed before a run","Named inputs and readiness checks make setup visible. Cost and time estimates help users decide whether to run, while the breakout action opens the full workflow for edits. Results stay on the canvas, where users can download them, rerun the Technique, or keep working."]
  ],
  "models": [
    ["Turn a model observation into a decision","The benchmark harness section brings together three ways to read model behavior. Omni has published human ratings for selected video tasks, Recraft v4 has qualitative strengths and limitations, and Opus 4.5 is shown as a reasoning step within a creative workflow."],
    ["Keep the evaluation tied to the task","The same model can behave differently when the job changes from exploring a visual direction to preserving a reference. I used the tasting notes to make that distinction concrete so a team can decide what to try, where to inspect the output, and when to keep a human in the loop."]
  ],
  "fauna-settings": [
    ["Give creators a say in the assistant’s behavior","I worked on the preferences and visual identity for FAUNA, an assistant that sits alongside creative work in FLORA. Editable settings give people a place to describe what they make and how they want help, with room to update that context as their work changes."],
    ["Bring guidance into the workspace","The cover shows FAUNA recommending models by task. Putting the task, recommendation, and reason together gives creators enough context to make a choice while they’re still on the canvas."]
  ],
  "landing": [
    ["Start with an example","I designed the landing experience around visible creative work. The examples give visitors something specific to react to and help them imagine what they could make before they decide to try the product."],
    ["Connect the story to a first step","I worked on how the page moves from showing an outcome to inviting someone into the product. The motion gives the examples room to unfold, while the entry point gives visitors a clear next action."]
  ],
  "motion": [
    ["Make references reusable","I designed Elements interfaces for gathering reference images, previewing the result, and finding saved objects again. The preview gives creators a way to inspect the reference before they reuse it across generations."],
    ["Keep feedback close to the work","Canvas microinteractions show what the system is doing while a generation is underway. I designed the working states to stay close to the relevant object so users can follow progress without losing their place."]
  ],
  "feature-demos": [
    ["Teach one action at a time","I made short demos for editing tools and shortcuts. Each clip centers on a single action and its visible result, so the viewer can connect a gesture or command to what changes on the canvas."],
    ["Show the feature in context","The zoom-to-fit demo is a good example. The viewer sees the starting canvas, the action, and the new framing in sequence, which makes it easier to recognize when the shortcut would help in their own work."]
  ],
  "physical": [
    ["Carry the visual language into print","I extended FLORA’s brand into an operating manual, field guides, and smaller physical objects. The printed pieces gave me room to turn ideas about creative workflows into pages people could browse at their own pace."],
    ["Design for a different kind of reading","The manual uses typography, diagrams, and page sequence to explain a workflow across a spread. The smaller pieces use the same visual language at scales where a single image, label, or material can carry the idea."]
  ],
  "mcp-api": [
    ["Make developer capabilities tangible","I designed and marketed the surfaces introducing FLORA’s MCP and API. The examples show what an agent can do in the product, from opening a single editable action to running a named skill for a larger task."],
    ["Design the handoff back to the creator","The three examples show distinct points where the creator can inspect or take over. Action controls allow adjustments before applying a result, and the canvas keeps the intermediate steps connected so someone can pick up the work by hand."]
  ],
  "fundraise": [
    ["Give the announcement a story","I scripted, filmed, and edited the Series A announcement. I structured the piece around the people behind the company and the milestone, giving viewers a way into the story before introducing the funding news."],
    ["Build for the pace of a launch","The edit combines footage, titles, and graphics so each beat has a clear job. I used the sequence to move from context to the announcement while keeping the people and organizations involved easy to identify."]
  ],
  "creative-context-cli": [
    ["Bring visual references into a local workflow","I built a command-line tool that syncs Pinterest boards locally so Claude can search the references. It connects a collection built by browsing images with a workflow that begins with a question about what’s already in it."],
    ["Search the collection by creative intent","The demo shows how to look for patterns, moods, and aesthetics across saved references. That makes the board something I can return to when I’m developing a direction or trying to recover an idea I saved earlier."]
  ],
  "film": [
    ["Find the story in a short format","My work across five Magnolia releases included brand design and trailer edits. I shaped how viewers encounter the material through image selection, pacing, and the order in which information appears."],
    ["Use hierarchy to support the edit","Title treatments and graphic moments have to work alongside the footage. I used those elements to establish tone, give key information a clear place, and keep it readable as the sequence moves."]
  ]
};
const mcpArtwork = 'assets/mcp-api-workflows.jpg';
const mcpExamples = [
  {
    "title": "Actions with manual controls",
    "copy": "An agent opens the color-grade action in the studio. The creator can tune warmth, contrast, saturation, and highlights against the preview, then apply the grade.",
    "region": [
      0.062,
      0.033,
      0.864,
      0.503
    ]
  },
  {
    "title": "Named skills for complete tasks",
    "copy": "An agent can call a named skill such as PDP Creator or Storyboarding. The list groups reusable workflows around the job a creator wants to complete.",
    "region": [
      0.062,
      0.551,
      0.426,
      0.41
    ]
  },
  {
    "title": "An editable canvas trail",
    "copy": "The source image, grading action, and result appear as connected nodes. A creator can inspect the steps, reopen the action, or continue editing on the canvas.",
    "region": [
      0.499,
      0.551,
      0.426,
      0.41
    ]
  }
];

function renderCaseNotes(projectId) {
  const notes = caseNotes[projectId] || [];
  return `<section class="case-notes" aria-label="Design notes">${notes.map(([title, copy]) => `
    <section class="case-note">
      <span class="case-plus" aria-hidden="true">+</span>
      <h2>${esc(title)}</h2>
      <p>${esc(copy)}</p>
    </section>`).join('')}</section>`;
}

function renderMcpExamples() {
  return `<section class="mcp-designs" aria-label="MCP and API design examples">${mcpExamples.map(({title, copy, region: [x, y, w, h]}) => `
    <figure class="mcp-design">
      <div class="design-window" style="aspect-ratio:${2304*w}/${1716*h};--asset-width:${100/w}%;--asset-left:${-x/w*100}%;--asset-top:${-y/h*100}%">
        <img src="${mcpArtwork}" alt="${esc(title)}" width="2304" height="1716" loading="lazy" decoding="async">
      </div>
      <figcaption><h2>${esc(title)}</h2><p>${esc(copy)}</p></figcaption>
    </figure>`).join('')}</section>`;
}

const evalSources={omni:'https://flora.ai/blog/omni-is-an-editor-not-a-filmmaker.-use-it-accordingly.',recraft:'https://flora.ai/blog/tasting-notes-recraft-v4',opus:'https://flora.ai/blog/tasting-notes-claude-opus-4.5'};
const modelGraphs=`<section class="eval-graphs" aria-label="Model evaluation graphics"><h2>Benchmark harness &amp; model behavior</h2><p class="eval-intro">Three views of published FLORA evaluations: scored observations where available, qualitative findings where they are not.</p>${[['omni','Omni — selected human ratings','Published team evaluation'],['recraft','Recraft v4 — workflow strengths and limits','My authored review · qualitative findings'],['opus','Opus 4.5 — visual reasoning workflow','My authored review · qualitative findings']].map(([id,title,credit])=>`<figure class="eval-figure"><a href="assets/eval-riso-${id}.svg?v=neon-14" target="_blank" rel="noopener noreferrer" aria-label="Open ${title}"><img src="assets/eval-riso-${id}.svg?v=neon-14" alt="${title}" width="1200" height="800"></a><figcaption><span>${credit}</span>${external('Read source',evalSources[id])}</figcaption></figure>`).join('')}</section>`;
const modelContext=`<section class="model-context" aria-label="Model evaluation context"><h2>From model behavior to product decisions</h2><p>I explore where a model belongs in a creative workflow: which inputs it understands, where it preserves intent, and where users need clearer expectations. My Recraft v4 and Opus 4.5 reviews translate those observations into practical guidance.</p><h2>What the findings change</h2><p>Recraft v4 is useful for generating visual directions, with limitations around structural preservation and dense text. Opus 4.5 adds a reasoning step between references and image generation. The team’s Omni evaluation points toward transformation tasks, with specific constraints around camera behavior and consistency.</p></section>`;
function designPages(p){return p.designs.map(d=>`<figure class="detail-design custom-design"><div class="custom-surface"><img src="assets/${d.image}" alt="${esc(d.title)}" loading="lazy" decoding="async" style="max-width:${d.width||640}px"></div><figcaption><h2>${esc(d.title)}</h2>${d.copy?`<p>${esc(d.copy)}</p>`:''}</figcaption></figure>`).join('');}
const selected=document.body.dataset.project;
if(selected){
 const p=projects.find(p=>p.id===selected);
 document.getElementById('main').innerHTML=`<a class="detail-back" href="./#${p.id}">← Back to work</a><h1>${esc(p.title)}</h1><p class="detail-meta">${esc(p.role||p.category)}${p.date?' · '+esc(p.date):''}</p><p class="detail-description">${esc(p.journey||p.focus)}</p>${p.id==='models'?modelGraphs:''}${renderCaseNotes(p.id)}${p.id==='models'?modelContext:''}${p.id==='mcp-api'?renderMcpExamples():''}<div class="detail-media">${p.animation&&p.id!=='motion'?animatedImage(p):p.video?video(p.video,p.title,true):''}${p.designs?designPages(p):p.assetImage?`<img class="uncropped-image" src="${p.assetImage}" alt="${esc(p.title)} — Elements panel">`:p.id!=='models'&&p.slide&&!p.animation&&(!p.video||p.id==='fauna-settings')?image(p.slide,p.title+' — project assets',true):''}${p.extraVideo?video(p.extraVideo,p.title,true):''}${p.extraDescription?`<p>${esc(p.extraDescription)}</p>`:''}${(p.extraSlides||[]).map(n=>image(n,p.title+' — additional work',true)).join('')}</div>${p.objects?`<div class="detail-objects">${p.objects.map(([n,d])=>`<p>${esc(n)}<br><small>${esc(d)}</small></p>`).join('')}</div>`:''}<div class="detail-links">${p.links.map(([l,u])=>external(l,u)).join('')}</div>`;
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

 function physicalSpread(designs) {
   const dimensions=[[716,962],[706,946],[272,203],[264,153],[146,151],[197,136],[732,946],[1434,918]];
   return [designs.slice(0,4),designs.slice(4)].map((row,r)=>{
     const columns=row.map((_,i)=>{const [w,h]=dimensions[r*4+i];return `minmax(0,${w/h}fr)`;}).join(' ');
     return `<div class="physical-spread-row" style="grid-template-columns:${columns}">${row.map((d,i)=>{const [w,h]=dimensions[r*4+i];return `<img src="assets/${esc(d.image)}" alt="${esc(d.title)}" width="${w}" height="${h}" loading="lazy" decoding="async">`;}).join('')}</div>`;
   }).join('');
 }
 function card(p) {
   const fauna = p.id === 'fauna-settings';
   const coverVideo = p.id === 'motion' ? 'elements-cover.mp4' : null;
   const coverImage = coverVideo ? null : p.assetImage;
   const primary = coverVideo ? video(coverVideo, p.title)
     : fauna ? `<div class="fauna-pair">${video('fauna-cover-hd.mp4', 'Fauna model recommendations')}${video(p.video, p.title)}</div>`
     : p.id === 'physical' ? physicalSpread(p.designs)
     : p.id === 'models' ? `<div class="benchmark-thumbnails">${['omni', 'recraft', 'opus'].map(id => `<img src="assets/eval-riso-${id}.svg?v=neon-14" alt="${id} evaluation graph">`).join('')}</div>`
     : p.animation ? animatedImage(p)
     : p.video ? video(p.video, p.title)
     : image(p.slide, p.title);
   const preview = p.id === 'landing' ? `<div class="landing-pair">
       <a class="media-link" href="${href(p)}" aria-label="Open FLORA landing page">${primary}</a>
       <a class="media-link" href="mcp-api.html" aria-label="Open FLORA MCP and API design examples">
         <img src="${mcpArtwork}" alt="FLORA action controls, skills, and editable canvas" width="2304" height="1716" loading="lazy" decoding="async">
       </a>
     </div>` : `<a class="media-link topic-box ${p.id==='physical'?'physical-spread':''} ${fauna?'fauna-cover':''} ${p.id==='models'?'benchmark-preview':''} ${coverImage?'topic-pair':''}" href="${href(p)}" ${p.live?'target="_blank" rel="noopener noreferrer"':''} aria-label="Open ${esc(p.title)}">${primary}${coverImage?`<img class="uncropped-image" src="${coverImage}" alt="${esc(p.title)} — Elements panel">`:''}</a>`;
   return `<section class="project-section" id="${p.id}">
     <div class="project-copy"><h2>${projectLink(p, p.title)}</h2><p class="journey">${esc(p.journey || p.focus)}</p><div class="project-links">${projectLink(p, p.live ? 'Explore live' : 'Learn more')}</div></div>
     <div class="project-visual"><p class="category">${esc(p.category)}</p>${preview}</div>
   </section>`;
 }
 document.getElementById('projects').innerHTML=work.filter(p=>p.id!=='film').map(card).join('')+`<h2 class="lab-heading">Cook Lab</h2>`+lab.map(card).join('')+work.filter(p=>p.id==='film').map(card).join('');
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
