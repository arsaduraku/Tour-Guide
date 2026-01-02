$(function () {
  const $track = $("#reviewsTrack");
  const $prev = $("#revPrev");
  const $next = $("#revNext");
  const $dotsWrap = $("#reviewsDots");

  if ($track.length && $prev.length && $next.length && $dotsWrap.length) {
    const $slides = $track.children();
    let index = 0;

    // build dots
    $slides.each(function (i) {
      const $b = $("<button/>", {
        type: "button",
        "aria-label": "Go to review " + (i + 1),
      });

      $b.on("click", function () {
        goTo(i);
      });
      $dotsWrap.append($b);
    });

    const $dots = $dotsWrap.children("button");

    function update() {
      $track.css("transform", `translateX(-${index * 100}%)`);
      $prev.prop("disabled", index === 0);
      $next.prop("disabled", index === $slides.length - 1);
      $dots.removeClass("active").eq(index).addClass("active");
    }

    function goTo(i) {
      index = Math.max(0, Math.min($slides.length - 1, i));
      update();
    }

    $prev.on("click", function () {
      goTo(index - 1);
    });
    $next.on("click", function () {
      goTo(index + 1);
    });

    const $viewport = $track.closest(".reviews-viewport");
    let startX = 0,
      currentX = 0,
      down = false;

    function onDown(x) {
      down = true;
      startX = x;
      currentX = x;
    }
    function onMove(x) {
      if (down) currentX = x;
    }
    function onUp() {
      if (!down) return;
      down = false;
      const dx = currentX - startX;
      const threshold = 50;
      if (dx > threshold) goTo(index - 1);
      else if (dx < -threshold) goTo(index + 1);
    }

    $viewport.on("touchstart", function (e) {
      onDown(e.originalEvent.touches[0].clientX);
    });
    $viewport.on("touchmove", function (e) {
      onMove(e.originalEvent.touches[0].clientX);
    });
    $viewport.on("touchend", onUp);

    $viewport.on("mousedown", function (e) {
      onDown(e.clientX);
    });
    $(window).on("mousemove", function (e) {
      onMove(e.clientX);
    });
    $(window).on("mouseup", onUp);

    update();
  }

  /* Perdorimi i map/filter/reduce*/
  const ratings = $("#reviewsTrack .stars")
    .toArray()
    .map((el) => {
      const text = $(el).text();
      return (text.match(/★/g) || []).length;
    });

  const goodRatings = ratings.filter((r) => r > 4);

  const avgRating =
    ratings.reduce((sum, r) => sum + r, 0) / (ratings.length || 1);

  console.log("All ratings:", ratings);
  console.log("Good ratings:", goodRatings);
  console.log("Average rating:", avgRating.toFixed(2));

  /* -NAVBAR- */
  const $dropBtn = $("#exploreBtn");
  const $menu = $("#exploreMenu");

  function openMenu() {
    $menu.css({
      opacity: "1",
      visibility: "visible",
      transform: "translateX(-50%) translateY(10px)",
    });
    $dropBtn.attr("aria-expanded", "true");
  }

  function closeMenu() {
    $menu.css({ opacity: "", visibility: "", transform: "" });
    $dropBtn.attr("aria-expanded", "false");
  }

  function isMenuOpen() {
    return $dropBtn.attr("aria-expanded") === "true";
  }

  $dropBtn.on("click", function (e) {
    e.preventDefault();
    isMenuOpen() ? closeMenu() : openMenu();
  });

  $(document).on("click", function (e) {
    if (!$(e.target).closest(".dropdown").length) closeMenu();
  });

  $menu.find("a").on("click", closeMenu);
  $(document).on("keydown", function (e) {
    if (e.key === "Escape") closeMenu();
  });

  /* new */
  $('a[href^="#"]').on("click", function (e) {
    const href = $(this).attr("href");
    if (!href || href === "#" || href === "#profile") return;

    const $target = $(href);
    if (!$target.length) return;
    e.preventDefault();
    closeMenu(); // nese hapet dropdown
    $("html, body").animate({ scrollTop: $target.offset().top - 65 }, 450);
  });
});