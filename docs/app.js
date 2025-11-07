(function() {
  const weekSelect = document.getElementById('week-select');
  const goBtn = document.getElementById('go-btn');
  const resetBtn = document.getElementById('reset-btn');
  const rootEl = document.documentElement;
  const menuEl = document.querySelector('nav.menu');

  function updateMenuOffset() {
    if (!menuEl) return;
    const h = menuEl.offsetHeight || 72;
    rootEl.style.setProperty('--menu-h', h + 'px');
  }
  updateMenuOffset();
  window.addEventListener('resize', updateMenuOffset);

  if (!weekSelect) { return; }

  // Populate week options 1–40
  const frag = document.createDocumentFragment();
  const empty = document.createElement('option');
  empty.value = '';
  empty.textContent = '—';
  frag.appendChild(empty);
  for (let i = 1; i <= 40; i++) {
    const opt = document.createElement('option');
    opt.value = String(i);
    opt.textContent = i;
    frag.appendChild(opt);
  }
  weekSelect.appendChild(frag);

  // Ensure each week has a dedicated headline (h2#wN);
  // If missing, insert it just before the first session (#wN-s1)
  (function ensureWeekHeadlines() {
    for (let i = 1; i <= 40; i++) {
      const id = `w${i}`;
      if (!document.getElementById(id)) {
        const first = document.getElementById(`w${i}-s1`);
        if (first) {
          const h2 = document.createElement('h2');
          h2.id = id;
          h2.textContent = `สัปดาห์ที่ ${i}`;
          const art = first.closest('article.session');
          if (art && art.parentNode) {
            art.parentNode.insertBefore(h2, art);
          }
        }
      }
    }
  })();

  // Flatten: move each week's sessions into its own <section class="week"> with <h2 id="wN">
  (function flattenWeeksIntoSections() {
    // If sections already carry explicit data-week attributes, the layout is normalized.
    if (document.querySelector('section.week[data-week]')) {
      return;
    }

    // Find a container that still holds multiple weeks (legacy wrapper)
    let legacyContainer = null;
    document.querySelectorAll('section.week').forEach(sec => {
      if (!legacyContainer && (sec.querySelector('#w1-s1') || sec.querySelector('#w2-s1') || sec.querySelector('#w3-s1'))) {
        legacyContainer = sec;
      }
    });
    if (!legacyContainer) return;

    const host = legacyContainer.parentNode;
    const frag = document.createDocumentFragment();

    // Helper to check if a week section already exists outside the legacy container
    function existingWeekSection(n) {
      const h2 = document.querySelector(`section.week > h2#w${n}`);
      if (!h2) return null;
      const sec = h2.closest('section.week');
      return (sec && sec !== legacyContainer) ? sec : null;
    }

    for (let n = 1; n <= 40; n++) {
      // Skip if a proper week section already exists outside the legacy container
      if (existingWeekSection(n)) continue;

      const ids = [1,2,3].map(m => `w${n}-s${m}`);
      const articles = [];
      ids.forEach(id => {
        const el = legacyContainer.querySelector(`#${id}`);
        if (el) {
          const art = el.closest('article.session');
          if (art && !articles.includes(art)) articles.push(art);
        }
      });
      if (articles.length === 0) continue;

      const sec = document.createElement('section');
      sec.className = 'week';
      sec.setAttribute('data-week', String(n));
      sec.setAttribute('aria-labelledby', `w${n}`);

      // Move or create the week heading
      let h2 = legacyContainer.querySelector(`#w${n}`) || document.querySelector(`#w${n}`);
      if (h2) {
        // If heading is not already inside another proper week section, move it
        const existing = existingWeekSection(n);
        if (!existing) sec.appendChild(h2);
      } else {
        h2 = document.createElement('h2');
        h2.id = `w${n}`;
        h2.textContent = `สัปดาห์ที่ ${n}`;
        sec.appendChild(h2);
      }

      // Append the sessions in order
      articles.forEach(art => sec.appendChild(art));

      frag.appendChild(sec);
    }

    // Insert the new week sections just before the legacy container, then remove it
    if (frag.childNodes.length) {
      host.insertBefore(frag, legacyContainer);
      legacyContainer.remove();
    }
  })();

  function getReferenceSection() {
    const ref = document.getElementById('reference');
    return ref ? ref.closest('section.week') : null;
  }

  function showAll() {
    document.querySelectorAll('section.week').forEach(s => s.classList.remove('hidden'));
    document.querySelectorAll('section.week article.session').forEach(a => a.classList.remove('hidden'));
  }

  // Do NOT hide Exercise Reference — keep it visible for in-session links
  function hideAll() {
    const refSec = getReferenceSection();
    document.querySelectorAll('section.week').forEach(s => {
      if (refSec && s === refSec) return; // keep Exercise Reference visible
      s.classList.add('hidden');
    });
  }

  function showWeekSession(week, sess) {
    hideAll();
    const head = document.getElementById(`w${week}`);
    const wrapper = head ? head.closest('section.week') : null;
    if (!wrapper) return;
    wrapper.classList.remove('hidden');
    const allSessions = wrapper.querySelectorAll('article.session');
    allSessions.forEach(a => a.classList.add('hidden'));
    if (sess === 'all') {
      allSessions.forEach(a => a.classList.remove('hidden'));
      location.hash = `#w${week}`;
      head.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      const target = document.getElementById(`w${week}-s${sess}`);
      const art = target ? target.closest('article.session') : null;
      if (art) {
        art.classList.remove('hidden');
        location.hash = `#w${week}-s${sess}`;
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        allSessions.forEach(a => a.classList.remove('hidden'));
      }
    }
  }

  function applyFromHash() {
    const h = location.hash.replace('#','');
    if (!h) return;
    if (h === 'howto' || h === 'reference') {
      weekSelect.value = '';
      showAll();
      const target = document.getElementById(h);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    const m = h.match(/^w(\d+)(?:-s(\d))?$/);
    if (m) {
      const wk = m[1];
      const ss = m[2] || 'all';
      weekSelect.value = wk;
      showWeekSession(wk, ss);
    }
  }

  goBtn.addEventListener('click', () => {
    const wk = weekSelect.value;
    if (!wk) {
      showAll();
      history.replaceState(null, '', ' ');
      return;
    }
    showWeekSession(wk, 'all');
  });

  resetBtn.addEventListener('click', () => {
    showAll();
    weekSelect.value = '';
    history.replaceState(null, '', ' ');
    const how = document.getElementById('howto');
    if (how) how.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  window.addEventListener('hashchange', applyFromHash);
  applyFromHash();
})();
