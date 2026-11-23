/** Run in the browser after the route has rendered. Coordinates use CSS pixels. */
export function measureLayout() {
  const root = document.querySelector('#root');
  const html = document.documentElement;
  const viewportWidth = html.clientWidth;
  const issues = [];
  const overflowing = [];
  const items = [];
  const styles = new Map();
  const style = (el) => {
    if (!styles.has(el)) styles.set(el, getComputedStyle(el));
    return styles.get(el);
  };
  const bounds = (el) => el.getBoundingClientRect();
  const visible = (el) => !el.closest('.visually-hidden, .sr-only, .pw-flip-face[aria-hidden="true"]') &&
    el.checkVisibility({ opacityProperty: true, visibilityProperty: true });
  const describe = (el, text) => {
    const name = text || el.getAttribute('aria-label') || el.getAttribute('alt') || '';
    const classes = [...el.classList].slice(0, 3).join('.');
    return `${el.localName}${classes ? `.${classes}` : ''}${name ? ` "${name.trim().replace(/\s+/g, ' ').slice(0, 60)}"` : ''}`;
  };

  if (html.scrollWidth > viewportWidth + 1) {
    issues.push({ kind: 'page-horizontal-overflow', detail: `${html.scrollWidth} > ${viewportWidth}` });
  }

  function measure(el, rect, text = '') {
    if (rect.right - rect.left <= 1 || rect.bottom - rect.top <= 1) return;
    const name = describe(el, text);
    const painted = { left: rect.left, top: rect.top, right: rect.right, bottom: rect.bottom };
    let scrollsHorizontally = false;
    let fixedLayer = null;
    let clipped = false;
    for (let parent = el; parent && parent !== html; parent = parent.parentElement) {
      const s = style(parent);
      if (!fixedLayer && (s.position === 'fixed' || s.position === 'sticky')) fixedLayer = parent;
      if (!/(hidden|clip|auto|scroll)/.test(s.overflowX + s.overflowY)) continue;
      // An SVG's default viewport clips its own paint, which was measured as a separate candidate.
      if (parent === el && !text) continue;
      const box = bounds(parent);
      const scrollX = /auto|scroll/.test(s.overflowX) && parent.scrollWidth > parent.clientWidth + 1;
      const scrollY = /auto|scroll/.test(s.overflowY) && parent.scrollHeight > parent.clientHeight + 1;
      const spillX = /hidden|clip|auto|scroll/.test(s.overflowX) ? Math.max(box.left - rect.left, rect.right - box.right) : 0;
      const spillY = /hidden|clip|auto|scroll/.test(s.overflowY) ? Math.max(box.top - rect.top, rect.bottom - box.bottom) : 0;
      const spill = Math.max(scrollX ? 0 : spillX, scrollY ? 0 : spillY);
      if (spill > 3 && !clipped) {
        issues.push({ kind: parent === el ? 'text-clipped' : 'clipped-by-ancestor', el: name, ancestor: describe(parent), by: Math.round(spill) });
        clipped = true;
      }
      if (scrollX) {
        scrollsHorizontally = true;
        painted.left = Math.max(painted.left, box.left);
        painted.right = Math.min(painted.right, box.right);
      }
      if (scrollY) {
        painted.top = Math.max(painted.top, box.top);
        painted.bottom = Math.min(painted.bottom, box.bottom);
      }
    }
    if (!scrollsHorizontally && (rect.right > viewportWidth + 2 || rect.left < -2)) {
      const kind = rect.right > viewportWidth + 2 ? 'off-viewport-right' : 'off-viewport-left';
      issues.push({ kind, el: name, left: Math.round(rect.left), right: Math.round(rect.right) });
    }
    if (painted.right > painted.left && painted.bottom > painted.top) {
      const background = !text && Number(style(el).zIndex) < 0;
      items.push({ el, name, text, rect: painted, fixedLayer, background });
    }
  }

  if (root) {
    for (const el of root.querySelectorAll('*')) {
      if (el.ownerSVGElement || !visible(el)) continue;
      const r = bounds(el);
      if (r.width > 1 && (r.right > viewportWidth + 1 || r.left < -1)) {
        overflowing.push({ el: describe(el), left: Math.round(r.left), right: Math.round(r.right) });
      }
      if (el.matches('svg, img') && r.width * r.height <= 0.15 * viewportWidth * innerHeight) {
        // Vector art can have transparent viewBox padding. Use its drawing bounds for intersections.
        let drawing = r;
        if (el instanceof SVGSVGElement) {
          const matrix = el.getScreenCTM();
          const { x, y, width, height } = el.getBBox();
          if (matrix && width && height) {
            const points = [[x, y], [x + width, y], [x, y + height], [x + width, y + height]]
              .map(([px, py]) => new DOMPoint(px, py).matrixTransform(matrix));
            drawing = {
              left: Math.min(...points.map((p) => p.x)), top: Math.min(...points.map((p) => p.y)),
              right: Math.max(...points.map((p) => p.x)), bottom: Math.max(...points.map((p) => p.y)),
            };
          }
        }
        measure(el, drawing);
      }
    }

    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const range = document.createRange();
    for (let node = walker.nextNode(); node; node = walker.nextNode()) {
      const el = node.parentElement;
      const text = node.textContent?.trim();
      if (!text || !el || el.closest('svg, script, style') || !visible(el)) continue;
      range.selectNodeContents(node);
      for (const rect of range.getClientRects()) measure(el, rect, text);
    }

    for (const sticker of root.querySelectorAll('.pw-poster .pw-sticker:has(svg[aria-label^="Pulau "])')) {
      if (!visible(sticker)) continue;
      const r = bounds(sticker);
      const p = bounds(sticker.closest('.pw-poster'));
      if (r.top < p.top - 2 || r.bottom > p.bottom + 2 || r.left < p.left - 2 || r.right > p.right + 2) {
        issues.push({ kind: 'poster-sticker-outside', el: describe(sticker.querySelector('svg')) });
      }
    }

    // Compare painted text runs and images in the same scroll layer. Fixed or sticky bars
    // intentionally cover the page as it scrolls. Negative-stacked art belongs below the content.
    const sharesInlineFlow = (a, b) => {
      if (!a.text || !b.text) return false;
      const inner = a.el.contains(b.el) ? b.el : b.el.contains(a.el) ? a.el : null;
      return inner && style(inner).position === 'static' && style(inner).display === 'inline';
    };
    items.sort((a, b) => a.rect.top - b.rect.top);
    for (const [index, a] of items.entries()) {
      for (let j = index + 1; j < items.length && items[j].rect.top < a.rect.bottom - 4; j += 1) {
        const b = items[j];
        if ((!a.text && !b.text) || a.background || b.background || a.fixedLayer !== b.fixedLayer ||
            a.el === b.el || sharesInlineFlow(a, b)) continue;
        const x = Math.min(a.rect.right, b.rect.right) - Math.max(a.rect.left, b.rect.left);
        const y = Math.min(a.rect.bottom, b.rect.bottom) - b.rect.top;
        const area = Math.min(...[a.rect, b.rect].map((r) => (r.right - r.left) * (r.bottom - r.top)));
        if (x > 4 && y > 4 && x * y / area > 0.12) {
          issues.push({ kind: 'overlap', a: a.name, b: b.name, px: `${Math.round(x)}x${Math.round(y)}` });
        }
      }
    }
  }

  return {
    path: location.pathname,
    windowWidth: innerWidth,
    viewportWidth,
    viewportHeight: innerHeight,
    scrollWidth: html.scrollWidth,
    horizontalScroll: html.scrollWidth > viewportWidth + 1,
    rootChildren: root?.children.length ?? 0,
    textLength: root?.innerText.trim().length ?? 0,
    mode: html.dataset.mode,
    theme: html.dataset.theme,
    overflowing: overflowing.slice(0, 20),
    issues: [...new Map(issues.map((issue) => [JSON.stringify(issue), issue])).values()],
  };
}
