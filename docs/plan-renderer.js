(function () {
  const PLAN_WEEKS_DATA = Array.isArray(window.PLAN_WEEKS) ? window.PLAN_WEEKS : [];
  if (!PLAN_WEEKS_DATA.length) return;

  function focusTag(focus, sessionNumber) {
    const text = (focus || '').toLowerCase();
    if (text.includes('คาร์ดิโอ') || text.includes('cardio')) return 'Cardio';
    if (text.includes('โมบิ') || text.includes('เคลื่อนไหว') || text.includes('mobility')) return 'Mobility';
    if (sessionNumber === 2) return 'Cardio';
    return 'Strength';
  }

  function createKey(label) {
    const div = document.createElement('div');
    div.className = 'k';
    div.textContent = label;
    return div;
  }

  function appendKV(parent, label, value) {
    parent.appendChild(createKey(label));
    const val = document.createElement('div');
    val.textContent = value && value.trim() ? value : '—';
    parent.appendChild(val);
  }

  function buildSpec(item) {
    const [, slug, name, qty, intensity, rest, equipment] = item;
    const fragment = document.createDocumentFragment();
    const title = document.createElement('h5');
    title.className = 'ex-name';
    title.textContent = name;
    fragment.appendChild(title);
    const spec = document.createElement('div');
    spec.className = 'spec';
    appendKV(spec, 'จำนวน/เวลา', qty);
    appendKV(spec, 'ความหนัก', intensity);
    appendKV(spec, 'พัก', rest);
    appendKV(spec, 'อุปกรณ์', equipment);
    spec.appendChild(createKey('รายละเอียด'));
    const linkWrap = document.createElement('div');
    if (slug) {
      const link = document.createElement('a');
      link.href = `#${slug}`;
      link.textContent = 'ดูรายละเอียด';
      linkWrap.appendChild(link);
    } else {
      linkWrap.textContent = '—';
    }
    spec.appendChild(linkWrap);
    fragment.appendChild(spec);
    return fragment;
  }

  function renderPlan() {
    const root = document.getElementById('plan-root');
    if (!root) return;

    PLAN_WEEKS_DATA.forEach(([weekNum, sessions]) => {
      const sec = document.createElement('section');
      sec.className = 'week';
      sec.dataset.week = weekNum;
      sec.setAttribute('aria-labelledby', `w${weekNum}`);
      sec.dataset.gestationalAge = `${weekNum} weeks 0 days to ${weekNum} weeks 6 days`;

      const h2 = document.createElement('h2');
      h2.id = `w${weekNum}`;
      h2.textContent = `สัปดาห์ที่ ${weekNum}`;
      sec.appendChild(h2);

      const meta = document.createElement('div');
      meta.className = 'week-meta';
      meta.textContent = `อายุครรภ์สัปดาห์ที่ ${weekNum} — วัน 0 ถึง วัน 6 (กล่าวถึงเพื่อกำหนดโครงสร้างการฝึกเท่านั้น)`;
      sec.appendChild(meta);

      sessions.forEach(([sessNum, focus, duration, rpe, metaText, blocks]) => {
        const article = document.createElement('article');
        article.className = 'session';
        article.dataset.session = sessNum;
        article.dataset.focus = focusTag(focus, sessNum);

        const h3 = document.createElement('h3');
        h3.id = `w${weekNum}-s${sessNum}`;
        const parts = [`เซสชันที่ ${sessNum}`];
        if (focus) parts.push(focus);
        if (duration) parts.push(duration);
        if (rpe) parts.push(rpe);
        h3.textContent = parts.join(' — ');
        article.appendChild(h3);

        if (metaText) {
          const metaDiv = document.createElement('div');
          metaDiv.className = 'meta';
          metaDiv.textContent = metaText;
          article.appendChild(metaDiv);
        }

        blocks.forEach(([title, items]) => {
          const blockDiv = document.createElement('div');
          blockDiv.className = 'block';
          const h4 = document.createElement('h4');
          h4.textContent = title;
          blockDiv.appendChild(h4);

          if (items.length) {
            const ul = document.createElement('ul');
            items.forEach(item => {
              const li = document.createElement('li');
              if (item[0] === 0) {
                li.appendChild(buildSpec(item));
              } else {
                li.innerHTML = item[1];
              }
              ul.appendChild(li);
            });
            blockDiv.appendChild(ul);
          }

          article.appendChild(blockDiv);
        });

        sec.appendChild(article);
      });

      root.appendChild(sec);
    });
  }

  renderPlan();
})();
