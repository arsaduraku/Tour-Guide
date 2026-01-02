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

      $b.on("click", function () { goTo(i); });
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

    $prev.on("click", function () { goTo(index - 1); });
    $next.on("click", function () { goTo(index + 1); });

    const $viewport = $track.closest(".reviews-viewport");
    let startX = 0, currentX = 0, down = false;

    function onDown(x) { down = true; startX = x; currentX = x; }
    function onMove(x) { if (down) currentX = x; }
    function onUp() {
      if (!down) return;
      down = false;
      const dx = currentX - startX;
      const threshold = 50;
      if (dx > threshold) goTo(index - 1);
      else if (dx < -threshold) goTo(index + 1);
    }

    $viewport.on("touchstart", function (e) { onDown(e.originalEvent.touches[0].clientX); });
    $viewport.on("touchmove", function (e) { onMove(e.originalEvent.touches[0].clientX); });
    $viewport.on("touchend", onUp);

    $viewport.on("mousedown", function (e) { onDown(e.clientX); });
    $(window).on("mousemove", function (e) { onMove(e.clientX); });
    $(window).on("mouseup", onUp);

    update();
  }





  
});