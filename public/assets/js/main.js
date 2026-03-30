/**
 * FJS Topografia — Landing Page
 * GSAP ScrollTrigger (parallax / reveals) — scroll nativo, sem snap que "puxa" a página
 */
(function () {
  'use strict';

  var hasGsap = typeof window.gsap !== 'undefined';
  var hasScrollTrigger = typeof window.ScrollTrigger !== 'undefined';
  var connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  var saveData = !!(connection && connection.saveData);
  var lowCpu = typeof navigator.hardwareConcurrency === 'number' && navigator.hardwareConcurrency > 0 && navigator.hardwareConcurrency <= 4;
  var lowMemory = typeof navigator.deviceMemory === 'number' && navigator.deviceMemory > 0 && navigator.deviceMemory <= 4;
  var touchOnly = window.matchMedia('(hover: none)').matches;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches || saveData;
  var lowPowerMode = reduceMotion || lowCpu || lowMemory || touchOnly;

  if (hasGsap && hasScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.defaults({ invalidateOnRefresh: true });
  }

  // Failsafe para navegação de volta (bfcache/histórico):
  // garante que a página nunca fique "presa" sem scroll.
  document.body.style.overflow = 'auto';
  window.addEventListener('pageshow', function () {
    document.body.style.overflow = 'auto';
  });

  if (!hasGsap || !hasScrollTrigger) {
    var heroFallback = document.getElementById('hero');
    var heroLayoutFallback = document.querySelector('.hero-layout');
    if (heroFallback) heroFallback.style.opacity = '1';
    if (heroLayoutFallback) heroLayoutFallback.style.opacity = '1';
    return;
  }

  if (reduceMotion) {
    var sobrePhotoStatic = document.querySelector('.sobre-bg__photo');
    if (sobrePhotoStatic) {
      sobrePhotoStatic.style.opacity = '1';
      sobrePhotoStatic.style.transform = 'none';
    }
    var clientesPhotoStatic = document.querySelector('.clientes-bg__photo');
    if (clientesPhotoStatic) {
      clientesPhotoStatic.style.opacity = '1';
      clientesPhotoStatic.style.transform = 'none';
    }
    var contatoPhotoStatic = document.querySelector('.contato-bg__photo');
    if (contatoPhotoStatic) {
      contatoPhotoStatic.style.opacity = '1';
      contatoPhotoStatic.style.transform = 'none';
    }
    var servicosPhotoStatic = document.querySelector('.servicos-bg__photo');
    if (servicosPhotoStatic) {
      servicosPhotoStatic.style.opacity = '1';
      servicosPhotoStatic.style.transform = 'none';
    }
  }

  // ═══════════════════════════════════════════════════
  // THREE.JS (DESKTOP ONLY) — camada 3D sutil no hero
  // ═══════════════════════════════════════════════════
  function initDesktopThreeHero() {
    var isDesktop = window.matchMedia('(min-width: 1024px)').matches;
    if (!isDesktop || lowPowerMode) return;
    if (!window.THREE) return;

    var heroBg = document.querySelector('#hero .hero-bg');
    if (!heroBg) return;
    if (heroBg.querySelector('[data-three-hero="1"]')) return;

    var THREE = window.THREE;
    var width = heroBg.clientWidth || window.innerWidth;
    var height = heroBg.clientHeight || window.innerHeight;
    if (!width || !height) return;

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
    camera.position.z = 42;

    var renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.8));
    renderer.setSize(width, height);
    renderer.domElement.setAttribute('data-three-hero', '1');
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.inset = '0';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.pointerEvents = 'none';
    renderer.domElement.style.zIndex = '1';
    heroBg.appendChild(renderer.domElement);

    var particlesCount = lowCpu || lowMemory ? 600 : 1200;
    var positions = new Float32Array(particlesCount * 3);
    var randomScale = 30;
    for (var i = 0; i < particlesCount; i++) {
      var i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * randomScale * 2;
      positions[i3 + 1] = (Math.random() - 0.5) * randomScale * 1.5;
      positions[i3 + 2] = (Math.random() - 0.5) * randomScale;
    }

    var geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    var material = new THREE.PointsMaterial({
      color: 0xe8742a,
      size: 0.14,
      transparent: true,
      opacity: 0.25,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });

    var points = new THREE.Points(geometry, material);
    points.rotation.x = 0.12;
    scene.add(points);

    var rafId = 0;
    function animate() {
      rafId = requestAnimationFrame(animate);
      points.rotation.y += 0.00075;
      points.rotation.x += 0.00018;
      renderer.render(scene, camera);
    }
    animate();

    var parallaxX = 0;
    var parallaxY = 0;
    var moveTicking = false;
    function onMouseMove(e) {
      if (moveTicking) return;
      moveTicking = true;
      requestAnimationFrame(function () {
        moveTicking = false;
        var nx = (e.clientX / window.innerWidth) * 2 - 1;
        var ny = -(e.clientY / window.innerHeight) * 2 + 1;
        parallaxX = nx * 1.2;
        parallaxY = ny * 0.8;
        camera.position.x += (parallaxX - camera.position.x) * 0.03;
        camera.position.y += (parallaxY - camera.position.y) * 0.03;
        camera.lookAt(scene.position);
      });
    }

    function onVisibilityChange() {
      if (document.hidden) {
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = 0;
        }
      } else if (!rafId) {
        animate();
      }
    }

    function destroyThreeHero() {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    }

    window.addEventListener('beforeunload', destroyThreeHero);
    document.addEventListener('visibilitychange', onVisibilityChange);

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    function onResize() {
      var w = heroBg.clientWidth || window.innerWidth;
      var h = heroBg.clientHeight || window.innerHeight;
      if (!w || !h) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }
    window.addEventListener('resize', onResize, { passive: true });
  }

  function shouldUseThreeHero() {
    return window.matchMedia('(min-width: 1024px)').matches && !lowPowerMode;
  }

  function loadThreeScript() {
    return new Promise(function (resolve, reject) {
      if (window.THREE) {
        resolve();
        return;
      }
      var existing = document.querySelector('script[data-threejs-cdn="1"]');
      if (existing) {
        existing.addEventListener('load', function () { resolve(); }, { once: true });
        existing.addEventListener('error', function () { reject(new Error('three.js falhou ao carregar')); }, { once: true });
        return;
      }
      var script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
      script.defer = true;
      script.setAttribute('data-threejs-cdn', '1');
      script.onload = function () { resolve(); };
      script.onerror = function () { reject(new Error('three.js falhou ao carregar')); };
      document.head.appendChild(script);
    });
  }

  function setupAnchorNavigation() {
    var navbarEl = document.querySelector('.navbar');

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      var href = link.getAttribute('href');
      if (!href || href === '#' || link.classList.contains('skip-link')) return;

      link.addEventListener('click', function (event) {
        var target = document.querySelector(href);
        if (!target) return;
        event.preventDefault();
        var navHeight = navbarEl ? navbarEl.getBoundingClientRect().height : 0;
        var top = target.getBoundingClientRect().top + (window.pageYOffset || 0) - navHeight - 8;
        window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
      });
    });
  }

  // ═══════════════════════════════════════════════════
  // Tilt 3D nos cartões
  // ═══════════════════════════════════════════════════
  function bindFxTilt(root) {
    if (lowPowerMode) return;
    var mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!mq.matches) return;

    var scope = root || document;
    scope.querySelectorAll('.fx-tilt:not([data-tilt-wired])').forEach(function (card) {
      card.setAttribute('data-tilt-wired', '1');
      var maxTilt = parseFloat(card.getAttribute('data-tilt-max'));
      if (isNaN(maxTilt)) maxTilt = 10;
      var lift = parseFloat(card.getAttribute('data-tilt-lift'));
      if (isNaN(lift)) lift = 6;

      function onEnter() {
        card.style.transition = 'none';
      }

      function onMove(e) {
        var r = card.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width;
        var y = (e.clientY - r.top) / r.height;
        var rx = (0.5 - y) * 2 * maxTilt;
        var ry = (x - 0.5) * 2 * maxTilt;
        card.style.transform =
          'perspective(960px) rotateX(' + rx +
          'deg) rotateY(' + ry +
          'deg) translateY(-' + lift +
          'px) translateZ(14px)';
      }

      function onLeave() {
        card.style.transition =
          'transform 0.65s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.35s ease, border-color 0.35s ease, background 0.35s ease';
        card.style.transform =
          'perspective(960px) rotateX(0deg) rotateY(0deg) translateY(0) translateZ(0)';
      }

      card.addEventListener('mouseenter', onEnter);
      card.addEventListener('mousemove', onMove);
      card.addEventListener('mouseleave', onLeave);
    });
  }

  // ═══════════════════════════════════════════════════
  // HERO — entrada cinematográfica refinada
  // ═══════════════════════════════════════════════════
  var heroTl = gsap.timeline({
    defaults: { ease: 'power3.out' }
  });

  heroTl
    .to('#hero', { opacity: 1, duration: 0.8, ease: 'power2.inOut' }, 0)
    .to('.hero-layout', { opacity: 1, duration: 0.01 }, 0)
    .from('.hero-bg__image', {
      scale: 1.12,
      filter: 'saturate(0.5) brightness(0.62) contrast(1.08)',
      duration: 2.4,
      ease: 'power2.out'
    }, 0)
    .from('.navbar-inner', { opacity: 0, duration: 0.7 }, 0.15)
    .from('.nav-item', {
      opacity: 0,
      y: -12,
      duration: 0.45,
      stagger: 0.05
    }, 0.25)
    .from('.hero-eyebrow', { opacity: 0, x: -20, duration: 0.6 }, 0.5)
    .from('.hero-title', { opacity: 0, y: 40, duration: 1, ease: 'power3.out' }, 0.6)
    .from('.hero-subtitle', { opacity: 0, y: 28, duration: 0.8 }, 0.8)
    .from('.hero-equipment', { opacity: 0, y: 12, duration: 0.55 }, 1.0)
    .from('.hero-trust', { opacity: 0, y: 20, duration: 0.6 }, 1.1)
    .from('.scroll-indicator', { opacity: 0, y: -10, duration: 0.5 }, 1.4)
    .from('.vignette-overlay', { opacity: 0, duration: 1.8 }, 0)
    .from('.film-grain', { opacity: 0, duration: 1.4 }, 0.3);

  // ═══════════════════════════════════════════════════
  // HERO — parallax + dessaturação progressiva no scroll
  // ═══════════════════════════════════════════════════
  if (!reduceMotion) {
    gsap.to('.hero-bg__parallax', {
      y: '10%',
      scale: 0.94,
      ease: 'none',
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 0.6
      }
    });

    var heroImg = document.querySelector('.hero-bg__image');
    if (heroImg) {
      gsap.to(heroImg, {
        filter: 'saturate(0.62) brightness(0.84) contrast(1.08)',
        ease: 'none',
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8
        }
      });
    }

    // plan2.png — reveal cinematográfico via GSAP ScrollTrigger
    var sobrePhoto = document.querySelector('#sobre .sobre-bg__photo');
    if (sobrePhoto) {
      gsap.fromTo(
        sobrePhoto,
        {
          autoAlpha: 0,
          scale: 1.08,
          yPercent: 4
        },
        {
          autoAlpha: 1,
          scale: 1,
          yPercent: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: '#sobre',
            start: 'top 88%',
            end: 'top 45%',
            scrub: 0.9
          }
        }
      );
    }

    // master-en-topografia.jpg — reveal cinematográfico na seção de serviços
    var servicosPhoto = document.querySelector('#servicos .servicos-bg__photo');
    if (servicosPhoto) {
      gsap.fromTo(
        servicosPhoto,
        {
          autoAlpha: 0.25,
          scale: 1.08,
          yPercent: 4
        },
        {
          autoAlpha: 0.58,
          scale: 1,
          yPercent: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: '#servicos',
            start: 'top 88%',
            end: 'top 45%',
            scrub: 0.9
          }
        }
      );
    }

    // basex2.png — reveal cinematográfico na seção de clientes
    var clientesPhoto = document.querySelector('#clientes .clientes-bg__photo');
    if (clientesPhoto) {
      gsap.fromTo(
        clientesPhoto,
        {
          autoAlpha: 0,
          scale: 1.08,
          yPercent: 5
        },
        {
          autoAlpha: 1,
          scale: 1,
          yPercent: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: '#clientes',
            start: 'top 88%',
            end: 'top 45%',
            scrub: 0.9
          }
        }
      );
    }

    // basex3.png — reveal cinematográfico na seção de contato
    var contatoPhoto = document.querySelector('#contato .contato-bg__photo');
    if (contatoPhoto) {
      gsap.fromTo(
        contatoPhoto,
        {
          autoAlpha: 0,
          scale: 1.08,
          yPercent: 5
        },
        {
          autoAlpha: 1,
          scale: 1,
          yPercent: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: '#contato',
            start: 'top 88%',
            end: 'top 45%',
            scrub: 0.9
          }
        }
      );
    }
  }

  // ═══════════════════════════════════════════════════
  // CINEMATIC SECTION TRANSITIONS
  // ═══════════════════════════════════════════════════
  function cinematicEntrance(sectionSelector, childSelector, opts) {
    var section = document.querySelector(sectionSelector);
    if (!section || reduceMotion) return;
    var target = childSelector ? section.querySelector(childSelector) : section;
    if (!target) return;

    var defaults = {
      startY: 36,
      startScale: 0.98,
      startRotateX: 2,
      startOpacity: 0,
      chromatic: false,
      stStart: 'top 88%',
      stEnd: 'top 45%',
      scrub: 0.85
    };
    var cfg = Object.assign({}, defaults, opts || {});

    gsap.fromTo(
      target,
      {
        autoAlpha: cfg.startOpacity,
        y: cfg.startY,
        scale: cfg.startScale,
        rotateX: cfg.startRotateX,
        transformPerspective: 1200
      },
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        ease: 'none',
        immediateRender: false,
        scrollTrigger: {
          trigger: section,
          start: cfg.stStart,
          end: cfg.stEnd,
          scrub: cfg.scrub
        }
      }
    );

    if (cfg.chromatic && !reduceMotion) {
      var heading = section.querySelector('h2');
      if (heading) {
        ScrollTrigger.create({
          trigger: section,
          start: cfg.stStart,
          end: cfg.stEnd,
          onEnter: function () { heading.classList.add('chromatic-shift'); },
          onLeaveBack: function () { heading.classList.remove('chromatic-shift'); }
        });
      }
    }
  }

  cinematicEntrance('#sobre', '.section-header', { startY: 40, chromatic: true });
  cinematicEntrance('#sobre', '.about-content', { startY: 60, startScale: 0.95, startRotateX: 3 });

  cinematicEntrance('#servicos', '.section-header', { startY: 35, chromatic: true });
  var servicosGridNarrow = window.matchMedia('(max-width: 768px)').matches;
  cinematicEntrance('#servicos', '.card-grid', servicosGridNarrow
    ? {
        startY: 10,
        startScale: 1,
        startRotateX: 0.35,
        startOpacity: 0.98,
        stStart: 'top 84%',
        duration: 0.48,
        ease: 'power2.out'
      }
    : {
        startY: 22,
        startScale: 0.99,
        startRotateX: 1,
        startOpacity: 0.92,
        stStart: 'top 86%',
        duration: 0.65,
        ease: 'power2.out'
      });

  cinematicEntrance('#clientes', '.section-header', { startY: 30, chromatic: true });
  cinematicEntrance('#clientes', '.clientes-grid', { startY: 55, startScale: 0.96, startRotateX: 2 });

  // Stagger individual cliente cards
  (function () {
    var clienteCards = document.querySelectorAll('.cliente-card');
    if (clienteCards.length && !reduceMotion) {
      gsap.fromTo(
        clienteCards,
        {
          autoAlpha: 0,
          y: 40,
          scale: 0.9
        },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '#clientes .clientes-grid',
            start: 'top 82%',
            once: true
          }
        }
      );

      clienteCards.forEach(function (card) {
        card.addEventListener('mouseenter', function () {
          gsap.to(card, {
            scale: 1.05,
            duration: 0.35,
            ease: 'power2.out'
          });
        });
        card.addEventListener('mouseleave', function () {
          gsap.to(card, {
            scale: 1,
            duration: 0.45,
            ease: 'power2.inOut'
          });
        });
      });
    }
  })();

  cinematicEntrance('#contato', '.section-header', { startY: 30, chromatic: true });
  cinematicEntrance('#contato', '.contact-container', { startY: 55, startScale: 0.96, startRotateX: 2 });

  gsap.utils.toArray('.section-divider').forEach(function (el) {
    var parent = el.closest('.section-container') || el.closest('.snap-section');
    if (!parent || reduceMotion) return;
    gsap.fromTo(
      el,
      { scaleX: 0, transformOrigin: 'left center' },
      {
        scaleX: 1,
        ease: 'none',
        immediateRender: false,
        scrollTrigger: {
          trigger: parent,
          start: 'top 90%',
          end: 'top 72%',
          scrub: 0.7
        }
      }
    );
  });

  // ═══════════════════════════════════════════════════
  // SURREAL EFFECTS — grain pulse on scroll
  // ═══════════════════════════════════════════════════
  if (!reduceMotion) {
    var filmGrain = document.querySelector('.film-grain');
    if (filmGrain) {
      gsap.to(filmGrain, {
        opacity: 0.038,
        ease: 'none',
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1
        }
      });
    }
  }

  // ═══════════════════════════════════════════════════
  // ANIMATED COUNTERS
  // ═══════════════════════════════════════════════════
  gsap.utils.toArray('.stat-value').forEach(function (el) {
    var target = parseInt(el.getAttribute('data-target'), 10);
    if (isNaN(target)) return;
    var suffix = el.getAttribute('data-suffix') || '';

    gsap.to(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true
      },
      textContent: target,
      duration: 2.2,
      snap: { textContent: 1 },
      ease: 'power2.out',
      onUpdate: function () {
        var n = Math.round(parseFloat(el.textContent));
        el.textContent = String(n);
      },
      onComplete: function () {
        el.textContent = String(target) + suffix;
      }
    });
  });

  // ═══════════════════════════════════════════════════
  // CTA PULSE — orange glow
  // ═══════════════════════════════════════════════════
  if (!reduceMotion) {
    gsap.to('.hero-section .btn-primary', {
      boxShadow: '0 0 28px rgba(232,116,42,.25)',
      duration: 2.2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  }

  // ═══════════════════════════════════════════════════
  // SCROLL INDICATOR
  // ═══════════════════════════════════════════════════
  var scrollInd = document.querySelector('.scroll-indicator');
  if (scrollInd && !reduceMotion) {
    gsap.to(scrollInd, {
      y: 8,
      opacity: 0.45,
      duration: 1.2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  }

  // ═══════════════════════════════════════════════════
  // HAMBURGER MENU
  // ═══════════════════════════════════════════════════
  var hamburger = document.querySelector('.hamburger');
  var navMenu = document.querySelector('.nav-menu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', function () {
      var isOpen = navMenu.classList.toggle('active');
      hamburger.classList.toggle('active');
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });

    document.querySelectorAll('.nav-item, .nav-cta--mobile').forEach(function (link) {
      link.addEventListener('click', function () {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ═══════════════════════════════════════════════════
  // NAVBAR — fixa de forma estática (sem animação em scroll)
  // ═══════════════════════════════════════════════════
  var navbar = document.querySelector('.navbar');
  if (navbar) {
    navbar.classList.remove('navbar--hidden');
    navbar.classList.add('navbar--glass');
    navbar.style.transform = 'none';

    var navbarLogo = navbar.querySelector('.navbar-logo');
    var navbarCtas = navbar.querySelectorAll('.nav-cta');
    var navbarItemsToToggle = [];

    if (navbarLogo) navbarItemsToToggle.push(navbarLogo);
    navbarCtas.forEach(function (cta) {
      navbarItemsToToggle.push(cta);
    });

    navbarItemsToToggle.forEach(function (el) {
      el.style.transition = 'opacity 0.24s ease, visibility 0.24s ease';
    });

    function toggleNavbarLogoAndCta() {
      var shouldHide = (window.scrollY || window.pageYOffset || 0) > 12;
      navbarItemsToToggle.forEach(function (el) {
        el.style.opacity = shouldHide ? '0' : '1';
        el.style.visibility = shouldHide ? 'hidden' : 'visible';
        el.style.pointerEvents = shouldHide ? 'none' : '';
      });
    }

    window.addEventListener('scroll', toggleNavbarLogoAndCta, { passive: true });
    toggleNavbarLogoAndCta();
  }

  // ═══════════════════════════════════════════════════
  // SCROLL PROGRESS + VOLTAR AO TOPO
  // ═══════════════════════════════════════════════════
  var scrollProgressBtn = document.getElementById('scroll-progress-btn');
  if (scrollProgressBtn) {
    var progressTicking = false;
    var minShow = 120;

    function updateScrollProgress() {
      var scrollTop = window.scrollY || window.pageYOffset || 0;
      var docHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight
      );
      var viewport = window.innerHeight || document.documentElement.clientHeight || 1;
      var maxScroll = Math.max(docHeight - viewport, 1);
      var progress = Math.min(Math.max(scrollTop / maxScroll, 0), 1);
      var progressDeg = (progress * 360).toFixed(2) + 'deg';

      scrollProgressBtn.style.setProperty('--scroll-progress', progressDeg);
      scrollProgressBtn.classList.toggle('is-visible', scrollTop > minShow);
      progressTicking = false;
    }

    function onProgressScroll() {
      if (!progressTicking) {
        requestAnimationFrame(updateScrollProgress);
        progressTicking = true;
      }
    }

    window.addEventListener('scroll', onProgressScroll, { passive: true });
    window.addEventListener('resize', onProgressScroll, { passive: true });

    scrollProgressBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    updateScrollProgress();
  }

  // ═══════════════════════════════════════════════════
  // CONTACT FORM → WhatsApp
  // ═══════════════════════════════════════════════════
  var WHATSAPP_CONTACT_NUMBER = '5517997712838';

  var contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }

      var nameEl = document.getElementById('contact-name');
      var emailEl = document.getElementById('contact-email');
      var phoneEl = document.getElementById('contact-phone');
      var messageEl = document.getElementById('contact-message');

      var name = (nameEl && nameEl.value) ? nameEl.value.trim() : '';
      var email = (emailEl && emailEl.value) ? emailEl.value.trim() : '';
      var phone = (phoneEl && phoneEl.value) ? phoneEl.value.trim() : '';
      var message = (messageEl && messageEl.value) ? messageEl.value.trim() : '';

      var phoneBlock = phone
        ? '*Telefone:* ' + phone
        : '*Telefone:* _não informado_';

      var text =
        '*FJS Topografia* — contato pelo site\n\n' +
        '*Nome completo:* ' + name + '\n' +
        '*E-mail:* ' + email + '\n' +
        phoneBlock + '\n\n' +
        '*Mensagem:*\n' + message;

      var waUrl =
        'https://wa.me/' + WHATSAPP_CONTACT_NUMBER + '?text=' + encodeURIComponent(text);
      window.open(waUrl, '_blank', 'noopener,noreferrer');

      var success = document.getElementById('form-success');
      if (success) success.classList.add('visible');
      contactForm.reset();
      setTimeout(function () {
        if (success) success.classList.remove('visible');
      }, 5000);
    });
  }

  // ═══════════════════════════════════════════════════
  // INIT
  // ═══════════════════════════════════════════════════
  document.addEventListener('DOMContentLoaded', function () {
    if (shouldUseThreeHero()) {
      loadThreeScript()
        .then(function () {
          initDesktopThreeHero();
        })
        .catch(function () {
          // Sem impacto crítico para navegação/conteúdo.
        });
    }
    bindFxTilt(document);
    setupAnchorNavigation();
  });

  window.addEventListener('load', function () {
    requestAnimationFrame(function () {
      var saved = window.pageYOffset || 0;
      ScrollTrigger.refresh();
      window.scrollTo(0, saved);
    });
  });
})();
