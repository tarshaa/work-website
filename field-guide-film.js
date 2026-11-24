document.addEventListener('DOMContentLoaded',()=>{
 const bookSpread=document.querySelector('.detail-media img[src="assets/operating-manual-field-guide.webp"]')?.closest('.custom-design');
 if(!bookSpread)return;
 const film=document.createElement('figure');
 film.className='detail-design field-guide-film';
 film.innerHTML=`<video controls playsinline preload="none" poster="assets/field-guide-book-film-poster.webp" width="2560" height="1418" aria-label="A look through the printed Field Guide"><source src="assets/field-guide-book-film.mp4" type="video/mp4"></video><figcaption>A look through the printed Field Guide.</figcaption>`;
 bookSpread.parentElement.append(film);
});
