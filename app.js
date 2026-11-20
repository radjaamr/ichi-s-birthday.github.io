const openButton=document.querySelector('#open'),opening=document.querySelector('#opening'),bloom=document.querySelector('#bloom'),app=document.querySelector('#app'),audio=document.querySelector('#song'),audioButton=document.querySelector('#toggle-audio');let openingStarted=false;
const audioLabel=()=>{audioButton.innerHTML=audio.paused?'♫ <span>putar musik</span>':'♫ <span>jeda musik</span>';audioButton.setAttribute('aria-label',audio.paused?'Putar musik':'Jeda musik')};audio.addEventListener('play',audioLabel);audio.addEventListener('pause',audioLabel);audioButton.addEventListener('click',()=>{if(audio.paused)audio.play().catch(audioLabel);else audio.pause()});
openButton.addEventListener('click', () => {
  if (openingStarted) return;

  openingStarted = true;

  // Musik mulai ketika surat dipencet
  audio.play().catch(audioLabel);

  // Animasi surat terbuka
  opening.classList.add('opened');

  setTimeout(() => {
    const tempatBunga = document.querySelector('.bouquet-art');

    // GIF baru dimuat ketika surat dibuka
    const gambarBunga = document.createElement('img');
    gambarBunga.src = 'assets/bunga-opening.gif';
    gambarBunga.alt = '';

    tempatBunga.replaceChildren(gambarBunga);
    bloom.classList.add('show');

    // Tunggu sekitar 8,1 detik, sesuai durasi GIF
    setTimeout(() => {
      opening.hidden = true;
      app.hidden = false;

      // Tampilkan halaman kartu ucapan
      showView('card', false);
      audioLabel();

      // Hilangkan tampilan bunga dengan transisi
      bloom.classList.remove('show');
    }, 8100);

  }, 450);
});
function showView(name,update=true){const valid=['card','bouquet','playlist','album'];if(!valid.includes(name))name='card';document.querySelectorAll('.view').forEach(x=>x.hidden=x.id!==name);document.querySelectorAll('nav [data-view]').forEach(x=>{const active=x.dataset.view===name;x.classList.toggle('active',active);if(active)x.setAttribute('aria-current','page');else x.removeAttribute('aria-current')});if(update)history.replaceState(null,'','#'+name);window.scrollTo({top:0,behavior:'auto'})}document.querySelectorAll('[data-view]').forEach(el=>el.addEventListener('click',e=>{e.preventDefault();showView(el.dataset.view)}));
const photos=document.querySelector('#photos'),dialog=document.querySelector('#lightbox');const captions=['a little moment ♡','my favorite smile','you, always','a favorite of mine','so much love ♡','pretty girl','my favorite person','this one ♡','you make me smile','always you'];for(let i=1;i<=10;i++){const fig=document.createElement('figure');fig.style.setProperty('--rotate',`${[-2,2,-1,1][(i-1)%4]}deg`);const button=document.createElement('button');button.type='button';button.setAttribute('aria-label',`Perbesar foto ${i}`);const img=document.createElement('img');img.src=`assets/photos/${String(i).padStart(2,'0')}.jpg`;img.alt=`Foto favorit Ichi ${i}`;img.loading='lazy';button.append(img);button.onclick=()=>{document.querySelector('#large-photo').src=img.src;dialog.showModal()};const caption=document.createElement('figcaption');caption.textContent=captions[i-1];fig.append(button,caption);photos.append(fig)}document.querySelector('#close-photo').onclick=()=>dialog.close();dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
