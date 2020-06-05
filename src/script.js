(() => {
  if (
    !("IntersectionObserver" in window) ||
    !("IntersectionObserverEntry" in window) ||
    !("intersectionRatio" in window.IntersectionObserverEntry.prototype)
  ) {
    return;
  }

  const slides = document.querySelectorAll(".scroll-show__slide");
  const options = {
    rootMargin: "0px 0px -300px 0px",
  };
  // スクロール検知
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const slide = entry.target;
      const imgContainer = slide.querySelector(".scroll-show__image-container");
      const id = slide.getAttribute("id");

      // 画面に入ってきたか
      if (entry.intersectionRatio > 0) {
        // 画像の表示
        imgContainer.classList.add("show");

        // url hash 設定
        slide.setAttribute("id", "");
        window.location.hash = "#" + id;
        slide.setAttribute("id", id);
      } else {
        imgContainer.classList.remove("show");
        if (window.location.hash === "#" + id) {
          history.pushState(
            "",
            document.title,
            window.location.pathname + window.location.search
          );
        }
      }
    });
  }, options);

  // 各スライド
  slides.forEach((slide) => {
    // attach scroll observer to slides
    observer.observe(slide);
  });
})();
(() => {
  if (
    !("IntersectionObserver" in window) ||
    !("IntersectionObserverEntry" in window) ||
    !("intersectionRatio" in window.IntersectionObserverEntry.prototype)
  ) {
    return;
  }
  // 画像の固定
  const scrollShow = document.querySelectorAll(".js-scroll-show");
  document.addEventListener("scroll", onScroll, { passive: true });
  function onScroll(event) {
    const scrollThreshold = 0;
    const scrollY = window.scrollY;
    scrollShow.forEach((_scrollShow) => {
      const scrollShowOffsetTop = _scrollShow.getBoundingClientRect().top;
      const scrollShowOffsetBottom = _scrollShow.getBoundingClientRect().bottom;
      const slides = _scrollShow.querySelectorAll(".scroll-show__slide");
      const slideMediaEls = _scrollShow.querySelectorAll(
        ".scroll-show__image-container"
      );

      if (
        scrollShowOffsetTop <= scrollThreshold &&
        scrollShowOffsetBottom > window.innerHeight
      ) {
        slideMediaEls.forEach((slideEl) => {
          slideEl.classList.add("viewport-fix");
        });
        slides.forEach((scrollSlide) => {
          scrollSlide.style.alignItems = "flex-end";
        });
      } else if (scrollShowOffsetBottom <= window.innerHeight) {
        slideMediaEls.forEach((slideEl) => {
          slideEl.classList.remove("viewport-fix");
        });
      } else {
        slideMediaEls.forEach(function (slideEl) {
          slideEl.classList.remove("viewport-fix");
        });
        slides.forEach(function (scrollSlide) {
          scrollSlide.style.alignItems = "";
        });
      }
    });
  }
})();
