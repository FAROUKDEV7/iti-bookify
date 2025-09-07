/* app.js — UI interactions & animations
   Notes:
   - This file contains only frontend interactivity and animations.
   - Replace server-side content in HTML with your backend rendering.
*/

/* --- Utilities --- */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

/* --- small init tasks --- */
document.addEventListener('DOMContentLoaded', () => {
  // set current year
  const y = new Date().getFullYear();
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = y;

  // hover parallax for hero cover stack
  const stack = document.querySelector('.cover-stack');
  if (stack) {
    stack.addEventListener('mousemove', (e) => {
      const r = stack.getBoundingClientRect();
      const cx = (e.clientX - r.left) / r.width - 0.5;
      const cy = (e.clientY - r.top) / r.height - 0.5;
      $$('.cover-stack__img', stack).forEach((img, i) => {
        const depth = (i+1) * 6;
        img.style.transform = `translate(${cx * depth}px, ${cy * depth}px) rotate(${(i-1)*2}deg)`;
      });
    });
    stack.addEventListener('mouseleave', () => {
      $$('.cover-stack__img', stack).forEach((img, i) => {
        img.style.transform = '';
      });
    });
  }

  // card entrance animation (stagger)
  const cards = $$('.book-card');
  cards.forEach((card, idx) => {
    card.style.opacity = 0;
    card.style.transform = 'translateY(12px)';
    setTimeout(() => {
      card.style.transition = 'opacity .45s ease, transform .45s cubic-bezier(.2,.9,.3,1)';
      card.style.opacity = 1;
      card.style.transform = '';
    }, 120 * idx);
  });

  // simple filter (client-side demo; remove when server handles filtering)
  const searchInput = $('#searchInput');
  const filterSelect = $('#filterAvailability');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.trim().toLowerCase();
      $$('.book-card').forEach(card => {
        const title = card.querySelector('.book-card__title')?.textContent.toLowerCase() || '';
        const author = card.querySelector('.book-card__author')?.textContent.toLowerCase() || '';
        card.style.display = (title.includes(q) || author.includes(q)) ? '' : 'none';
      });
    });
  }
  if (filterSelect) {
    filterSelect.addEventListener('change', (e) => {
      const v = e.target.value;
      $$('.book-card').forEach(card => {
        const badge = card.querySelector('.badge')?.textContent.toLowerCase() || 'available';
        if (v === 'all') card.style.display = '';
        else card.style.display = (badge.includes(v)) ? '' : 'none';
      });
    });
  }

  // shelf flow drag-to-scroll (desktop + mobile)
  const shelfFlow = $('#shelfFlow');
  if (shelfFlow) {
    let isDown = false, startX, scrollLeft;
    shelfFlow.addEventListener('mousedown', e => {
      isDown = true;
      shelfFlow.classList.add('active');
      startX = e.pageX - shelfFlow.offsetLeft;
      scrollLeft = shelfFlow.scrollLeft;
    });
    shelfFlow.addEventListener('mouseleave', () => { isDown = false; shelfFlow.classList.remove('active'); });
    shelfFlow.addEventListener('mouseup', () => { isDown = false; shelfFlow.classList.remove('active'); });
    shelfFlow.addEventListener('mousemove', e => {
      if(!isDown) return;
      e.preventDefault();
      const x = e.pageX - shelfFlow.offsetLeft;
      const walk = (x - startX) * 1.5;
      shelfFlow.scrollLeft = scrollLeft - walk;
    });
  }

  // 


  // page transition (fade-out) for internal html links
  document.querySelectorAll('a[href$=".html"]').forEach(a => {
    a.addEventListener('click', (ev) => {
      const href = a.getAttribute('href');
      // allow opening in new tab or external
      if (a.target && a.target === '_blank') return;
      ev.preventDefault();
      document.body.style.transition = 'opacity .28s ease';
      document.body.style.opacity = 0;
      setTimeout(()=> window.location.href = href, 280);
    });
  });

  // If on book.html, optionally load dynamic content based on URL (client-side demo)
  if (location.pathname.endsWith('book.html')) {
    const params = new URLSearchParams(location.search);
    const id = params.get('id');
    if (id) {
      // frontend demo: if card with data-id exists on index, copy values; else placeholders remain
      const source = document.querySelector(`.book-card[data-id="${id}"]`);
      if (source) {
        const title = source.querySelector('.book-card__title')?.textContent;
        const author = source.querySelector('.book-card__author')?.textContent;
        const img = source.querySelector('img')?.src;
        $('#bookTitle') && ( $('#bookTitle').textContent = title );
        $('#bookAuthor') && ( $('#bookAuthor').textContent = 'by ' + author );
        $('#bookCover') && ( $('#bookCover').src = img );
        $('#bookSummary') && ( $('#bookSummary').textContent = 'This summary was copied from demo card. Replace with server content.' );
        $('#bookPrice') && ( $('#bookPrice').textContent = 'Price: $12' );
      }
    }
  }

});


