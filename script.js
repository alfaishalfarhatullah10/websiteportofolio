    /* =============================================
       CUSTOM CURSOR
    ============================================= */
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursorFollower');
    let mx = 0, my = 0;
    let fx = 0, fy = 0;

    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      cursor.style.left = mx + 'px';
      cursor.style.top  = my + 'px';
    });

    (function animateFollower() {
      fx += (mx - fx) * 0.12;
      fy += (my - fy) * 0.12;
      follower.style.left = fx + 'px';
      follower.style.top  = fy + 'px';
      requestAnimationFrame(animateFollower);
    })();

    document.querySelectorAll('a, button, [role="button"]').forEach(el => {
      el.addEventListener('mouseenter', () => {
        follower.style.width  = '56px';
        follower.style.height = '56px';
        follower.style.borderColor = '#F2C94C';
        cursor.style.background = '#F2C94C';
      });
      el.addEventListener('mouseleave', () => {
        follower.style.width  = '36px';
        follower.style.height = '36px';
        follower.style.borderColor = '#C84B31';
        cursor.style.background = '#C84B31';
      });
    });

    /* =============================================
       NAVBAR SCROLL
    ============================================= */
    const nav = document.getElementById('mainNav');
    window.addEventListener('scroll', () => {
      const s = window.scrollY > 60;
      nav.classList.toggle('scrolled', s);
      document.getElementById('backTop').classList.toggle('visible', window.scrollY > 400);
      if (s) {
        document.getElementById('hamburgerIcon').style.color = '#F5F0E8';
      } else {
        document.getElementById('hamburgerIcon').style.color = '#1A1A1A';
      }
    });

    /* =============================================
       MOBILE MENU
    ============================================= */
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileNav    = document.getElementById('mobileNav');
    let menuOpen = false;

    mobileToggle.addEventListener('click', () => {
      menuOpen = !menuOpen;
      mobileNav.classList.toggle('open', menuOpen);
      document.getElementById('hamburgerIcon').className = menuOpen
        ? 'bi bi-x-lg'
        : 'bi bi-list';
    });

    mobileNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        menuOpen = false;
        mobileNav.classList.remove('open');
        document.getElementById('hamburgerIcon').className = 'bi bi-list';
      });
    });

    /* =============================================
       SCROLL REVEAL
    ============================================= */
    const revealEls = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    revealEls.forEach(el => io.observe(el));

    /* =============================================
       SMOOTH SCROLL
    ============================================= */
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    /* =============================================
       CONTACT FORM
    ============================================= */
    document.getElementById('contactForm').addEventListener('submit', function(e) {
      e.preventDefault();
      const fields = ['fName', 'fEmail', 'fSubject', 'fMessage'];
      let valid = true;

      fields.forEach(id => {
        const el = document.getElementById(id);
        if (!el.value.trim()) {
          el.style.borderColor = '#C84B31';
          valid = false;
          setTimeout(() => { el.style.borderColor = ''; }, 2500);
        }
      });

      if (!valid) return;

      const btn = this.querySelector('button[type=submit]');
      btn.innerHTML = '<i class="bi bi-hourglass-split"></i> Mengirim...';
      btn.disabled = true;

      setTimeout(() => {
        btn.innerHTML = '<i class="bi bi-send-fill"></i> Kirim Pesan';
        btn.disabled = false;
        this.reset();

        const toast = document.getElementById('toastMsg');
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 4500);
      }, 1500);
    });
