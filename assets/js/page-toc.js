---
---
// Generate and manage right-side Table of Contents with collapsible sections
(function() {
  'use strict';
  let overlay = null;


  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

function init() {
  initMobileOverlay();
  initTOC();
}

function initMobileOverlay() {
  overlay = document.createElement('div');
  overlay.className = 'sidebar-overlay';
  document.body.appendChild(overlay);

  // Watch left sidebar for nav-open class changes
  const siteNav = document.getElementById('site-nav');
  if (siteNav) {
    new MutationObserver(updateOverlay).observe(siteNav, {
      attributes: true,
      attributeFilter: ['class']
    });
  }

  // Click overlay → close everything
  overlay.addEventListener('click', function () {
    closeLeftSidebar();
    closeRightTOC();
    updateOverlay();
  });
}

function updateOverlay() {
  const siteNav = document.getElementById('site-nav');
  const toc = document.querySelector('.page-toc');
  const leftOpen = siteNav && siteNav.classList.contains('nav-open');
  const rightOpen = toc && toc.classList.contains('toc-mobile-open');
  if (leftOpen || rightOpen) {
    if (overlay) overlay.classList.add('active');
  } else {
    if (overlay) overlay.classList.remove('active');
  }
}

function closeLeftSidebar() {
  const menuBtn = document.getElementById('menu-button');
  if (menuBtn && menuBtn.getAttribute('aria-pressed') === 'true') {
    menuBtn.click();
  }
}

function closeRightTOC() {
  const toc = document.querySelector('.page-toc');
  const tocBtn = document.querySelector('.toc-mobile-toggle-btn');
  if (toc) toc.classList.remove('toc-mobile-open');
  if (tocBtn) {
    tocBtn.classList.remove('toc-btn-active');
    tocBtn.setAttribute('aria-expanded', 'false');
  }
}


  function initTOC() {
    // Only run on pages with main content
    const mainContent = document.querySelector('.main-content');
    if (!mainContent) return;

    // Check if this is a parent page (has child page navigation list)
    // Just the Docs adds an h2.text-delta followed by a ul for child pages
    const textDeltaHeader = mainContent.querySelector('h2.text-delta');
    const isParentPage = textDeltaHeader !== null && textDeltaHeader.nextElementSibling && textDeltaHeader.nextElementSibling.tagName === 'UL';


    // Add class to body to indicate parent page status
    if (isParentPage) {
      document.body.classList.add('parent-page');
      // Don't generate right sidebar TOC for parent pages
      return;
    } else {
      document.body.classList.remove('parent-page');
    }

    // Find all headers in the content (h2, h3, h4)
    const headers = mainContent.querySelectorAll('h2, h3, h4');
    if (headers.length === 0) return;

    // Create TOC container
    const tocContainer = document.createElement('div');
    tocContainer.className = 'page-toc';

    const tocHeading = document.createElement('div');
    tocHeading.className = 'page-toc-heading';
    tocHeading.textContent = 'On this page';

    const tocNav = document.createElement('nav');
    const tocList = document.createElement('ul');

    // Build the TOC structure - only H2s at root level
    let currentH2Li = null;
    let currentH2List = null;

    headers.forEach((header, index) => {
      // Skip headers with .no_toc class
      if (header.classList.contains('no_toc')) return;

      const level = parseInt(header.tagName.substring(1));
      const text = header.textContent.replace(/^#\s*/, '');

      // Ensure header has an ID for linking
      if (!header.id) {
        header.id = 'toc-' + text.toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-');
      }

      if (level === 2) {
        // H2 - top level item
        currentH2Li = document.createElement('li');
        currentH2Li.className = 'toc-h2';

        const wrapper = document.createElement('div');
        wrapper.className = 'toc-h2-wrapper';

        // Expand/collapse button
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'toc-toggle';
        toggleBtn.innerHTML = '▸';
        toggleBtn.setAttribute('aria-expanded', 'false');
        toggleBtn.setAttribute('aria-label', 'Expand section');

        const a = document.createElement('a');
        a.href = '#' + header.id;
        a.textContent = text;
        a.setAttribute('data-header-id', header.id);

        wrapper.appendChild(toggleBtn);
        wrapper.appendChild(a);
        currentH2Li.appendChild(wrapper);

        // Create nested list for H3/H4 (initially hidden)
        currentH2List = document.createElement('ul');
        currentH2List.className = 'toc-nested';
        currentH2List.style.display = 'none';
        currentH2Li.appendChild(currentH2List);

        tocList.appendChild(currentH2Li);

        // Add click handler for toggle button
        toggleBtn.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          const isExpanded = this.getAttribute('aria-expanded') === 'true';

          if (isExpanded) {
            currentH2List.style.display = 'none';
            this.innerHTML = '▸';
            this.setAttribute('aria-expanded', 'false');
            this.setAttribute('aria-label', 'Expand section');
          } else {
            currentH2List.style.display = 'block';
            this.innerHTML = '▾';
            this.setAttribute('aria-expanded', 'true');
            this.setAttribute('aria-label', 'Collapse section');
          }
        });

      } else if (level === 3 && currentH2List) {
        // H3 - nested under current H2
        const li = document.createElement('li');
        li.className = 'toc-h3';
        const a = document.createElement('a');
        a.href = '#' + header.id;
        a.textContent = text;
        a.setAttribute('data-header-id', header.id);
        li.appendChild(a);
        currentH2List.appendChild(li);

      } else if (level === 4 && currentH2List) {
        // H4 - nested under current H2 (indented more)
        const li = document.createElement('li');
        li.className = 'toc-h4';
        const a = document.createElement('a');
        a.href = '#' + header.id;
        a.textContent = text;
        a.setAttribute('data-header-id', header.id);
        li.appendChild(a);
        currentH2List.appendChild(li);
      }
    });

    // Assemble and add TOC to page
    tocNav.appendChild(tocList);
    tocContainer.appendChild(tocHeading);
    tocContainer.appendChild(tocNav);

    // Back to top button
    const backToTop = document.createElement('button');
    backToTop.className = 'toc-back-to-top';
    backToTop.setAttribute('aria-label', 'Back to top');
    backToTop.innerHTML = `
      <img class="toc-back-to-top-icon-default"
        src="{{ '/images/icons/elevator_gray.png' | relative_url }}"
        alt="Back to top">
      <img class="toc-back-to-top-icon-hover"
        src="{{ '/images/icons/elevator.png' | relative_url }}"
        alt="Back to top">
      <img class="toc-back-to-top-icon-dark-hover"
        src="{{ '/images/icons/elevator_dark_hover.png' | relative_url }}"
        alt="Back to top">
    `;
    backToTop.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

tocContainer.appendChild(backToTop);

    document.body.appendChild(tocContainer);

    // Create mobile TOC toggle button and inject into top nav
    const tocToggleBtn = document.createElement('button');
    tocToggleBtn.className = 'toc-mobile-toggle-btn btn-reset';
    tocToggleBtn.setAttribute('aria-label', 'Toggle table of contents');
    tocToggleBtn.setAttribute('aria-expanded', 'false');
    tocToggleBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="toc-btn-icon" aria-hidden="true"><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="12" x2="16" y2="12"></line><line x1="3" y1="18" x2="19" y2="18"></line></svg>';

    const topNavContainer = document.querySelector('.top-nav-container');
    if (topNavContainer) {
      topNavContainer.appendChild(tocToggleBtn);
    }

    // Toggle the TOC panel open/closed
    tocToggleBtn.addEventListener('click', function() {
      const isOpen = tocContainer.classList.contains('toc-mobile-open');
      if (isOpen) {
        tocContainer.classList.remove('toc-mobile-open');
        this.setAttribute('aria-expanded', 'false');
        this.classList.remove('toc-btn-active');
      } else {
        tocContainer.classList.add('toc-mobile-open');
        this.setAttribute('aria-expanded', 'true');
        this.classList.add('toc-btn-active');
      }
      updateOverlay();
    });

    // Close TOC automatically when user taps a link inside it
    tocContainer.addEventListener('click', function(e) {
      if (e.target.tagName === 'A') {
        tocContainer.classList.remove('toc-mobile-open');
        tocToggleBtn.setAttribute('aria-expanded', 'false');
        tocToggleBtn.classList.remove('toc-btn-active');
        updateOverlay(); 
      }
    });


    // Highlight current section on scroll
    setupScrollSpy(headers);
  }

  function setupScrollSpy(headers) {
    const tocLinks = document.querySelectorAll('.page-toc a');
    if (tocLinks.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;
          const tocLink = document.querySelector(`.page-toc a[data-header-id="${id}"]`);

          if (entry.isIntersecting) {
            // Remove active class from all links
            tocLinks.forEach(link => link.classList.remove('active'));
            // Add active class to current link
            if (tocLink) {
              tocLink.classList.add('active');

              // Auto-expand parent section if this is a nested header
              const parentLi = tocLink.closest('.toc-h2');
              if (parentLi && tocLink.closest('.toc-nested')) {
                const toggleBtn = parentLi.querySelector('.toc-toggle');
                const nestedList = parentLi.querySelector('.toc-nested');
                if (toggleBtn && nestedList && nestedList.style.display === 'none') {
                  nestedList.style.display = 'block';
                  toggleBtn.innerHTML = '▾';
                  toggleBtn.setAttribute('aria-expanded', 'true');
                }
              }
            }
          }
        });
      },
      {
        rootMargin: '-80px 0px -80% 0px',
        threshold: 0
      }
    );

    headers.forEach((header) => {
      if (!header.classList.contains('no_toc')) {
        observer.observe(header);
      }
    });
  }
})();
