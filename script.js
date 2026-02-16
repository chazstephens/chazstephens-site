
(function(){
  const burger = document.getElementById('burger');
  const drawer = document.getElementById('drawer');
  const backdrop = document.getElementById('backdrop');
  const closeBtn = document.getElementById('closeDrawer');
  const tabLinks = Array.from(document.querySelectorAll('.tabs a'));

  function openDrawer(){
    drawer.classList.add('open');
    backdrop.classList.add('open');
    document.body.style.overflow='hidden';
  }
  function closeDrawer(){
    drawer.classList.remove('open');
    backdrop.classList.remove('open');
    document.body.style.overflow='';
  }
  burger && burger.addEventListener('click', openDrawer);
  closeBtn && closeBtn.addEventListener('click', closeDrawer);
  backdrop && backdrop.addEventListener('click', closeDrawer);
  window.addEventListener('resize', ()=>{ if(window.innerWidth > 720) closeDrawer(); });

  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      const id = a.getAttribute('href');
      const el = document.querySelector(id);
      if(el){
        e.preventDefault();
        closeDrawer();
        el.scrollIntoView({behavior:'smooth', block:'start'});
      }
    });
  });

  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting) entry.target.classList.add('on');
    });
  }, {threshold: 0.12});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

  const sections = Array.from(document.querySelectorAll('section[id]'));
  const io2 = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        const id = entry.target.getAttribute('id');
        tabLinks.forEach(a=>{
          a.classList.toggle('active', a.getAttribute('href') === '#'+id);
        });
      }
    });
  }, {rootMargin: "-25% 0px -65% 0px", threshold: 0.01});
  sections.forEach(s=>io2.observe(s));

  // Experience carousel (manual: dots + arrows, no auto-play)
  const slides = Array.from(document.querySelectorAll('[data-slide]'));
  const dots = Array.from(document.querySelectorAll('[data-dot]'));
  let current = 1;

  function show(i){
    if(!slides.length) return;
    if(i < 1) i = slides.length;
    if(i > slides.length) i = 1;
    current = i;

    slides.forEach(s=>s.classList.toggle('active', s.getAttribute('data-slide') == i));
    dots.forEach(d=>d.classList.toggle('active', d.getAttribute('data-dot') == i));
  }

  dots.forEach(d=>{
    d.addEventListener('click', ()=>show(parseInt(d.getAttribute('data-dot'), 10)));
    d.addEventListener('keydown', (e)=>{
      if(e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        show(parseInt(d.getAttribute('data-dot'), 10));
      }
    });
  });

  prevBtn && prevBtn.addEventListener('click', ()=>show(current - 1));
  nextBtn && nextBtn.addEventListener('click', ()=>show(current + 1));

  show(1);
})();
