/* ===================================================================
 * javascript plugins
 *
 * ------------------------------------------------------------------- */

/*
     _ _      _       _
 ___| (_) ___| | __  (_)___
/ __| | |/ __| |/ /  | / __|
\__ \ | | (__|   < _ | \__ \
|___/_|_|\___|_|\_(_)/ |___/
                   |__/

 Version: 1.8.0
  Author: Ken Wheeler
 Website: http://kenwheeler.github.io
    Docs: http://kenwheeler.github.io/slick
    Repo: http://github.com/kenwheeler/slick
  Issues: http://github.com/kenwheeler/slick/issues

 */
!(function (i) {
  "use strict";
  "function" == typeof define && define.amd
    ? define(["jquery"], i)
    : "undefined" != typeof exports
    ? (module.exports = i(require("jquery")))
    : i(jQuery);
})(function (i) {
  "use strict";
  var e = window.Slick || {};
  ((e = (function () {
    var e = 0;
    return function (t, o) {
      var s,
        n = this;
      (n.defaults = {
        accessibility: !0,
        adaptiveHeight: !1,
        appendArrows: i(t),
        appendDots: i(t),
        arrows: !0,
        asNavFor: null,
        prevArrow:
          '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
        nextArrow:
          '<button class="slick-next" aria-label="Next" type="button">Next</button>',
        autoplay: !1,
        autoplaySpeed: 3e3,
        centerMode: !1,
        centerPadding: "50px",
        cssEase: "ease",
        customPaging: function (e, t) {
          return i('<button type="button" />').text(t + 1);
        },
        dots: !1,
        dotsClass: "slick-dots",
        draggable: !0,
        easing: "linear",
        edgeFriction: 0.35,
        fade: !1,
        focusOnSelect: !1,
        focusOnChange: !1,
        infinite: !0,
        initialSlide: 0,
        lazyLoad: "ondemand",
        mobileFirst: !1,
        pauseOnHover: !0,
        pauseOnFocus: !0,
        pauseOnDotsHover: !1,
        respondTo: "window",
        responsive: null,
        rows: 1,
        rtl: !1,
        slide: "",
        slidesPerRow: 1,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 500,
        swipe: !0,
        swipeToSlide: !1,
        touchMove: !0,
        touchThreshold: 5,
        useCSS: !0,
        useTransform: !0,
        variableWidth: !1,
        vertical: !1,
        verticalSwiping: !1,
        waitForAnimate: !0,
        zIndex: 1e3,
      }),
        (n.initials = {
          animating: !1,
          dragging: !1,
          autoPlayTimer: null,
          currentDirection: 0,
          currentLeft: null,
          currentSlide: 0,
          direction: 1,
          $dots: null,
          listWidth: null,
          listHeight: null,
          loadIndex: 0,
          $nextArrow: null,
          $prevArrow: null,
          scrolling: !1,
          slideCount: null,
          slideWidth: null,
          $slideTrack: null,
          $slides: null,
          sliding: !1,
          slideOffset: 0,
          swipeLeft: null,
          swiping: !1,
          $list: null,
          touchObject: {},
          transformsEnabled: !1,
          unslicked: !1,
        }),
        i.extend(n, n.initials),
        (n.activeBreakpoint = null),
        (n.animType = null),
        (n.animProp = null),
        (n.breakpoints = []),
        (n.breakpointSettings = []),
        (n.cssTransitions = !1),
        (n.focussed = !1),
        (n.interrupted = !1),
        (n.hidden = "hidden"),
        (n.paused = !0),
        (n.positionProp = null),
        (n.respondTo = null),
        (n.rowCount = 1),
        (n.shouldClick = !0),
        (n.$slider = i(t)),
        (n.$slidesCache = null),
        (n.transformType = null),
        (n.transitionType = null),
        (n.visibilityChange = "visibilitychange"),
        (n.windowWidth = 0),
        (n.windowTimer = null),
        (s = i(t).data("slick") || {}),
        (n.options = i.extend({}, n.defaults, o, s)),
        (n.currentSlide = n.options.initialSlide),
        (n.originalSettings = n.options),
        void 0 !== document.mozHidden
          ? ((n.hidden = "mozHidden"),
            (n.visibilityChange = "mozvisibilitychange"))
          : void 0 !== document.webkitHidden &&
            ((n.hidden = "webkitHidden"),
            (n.visibilityChange = "webkitvisibilitychange")),
        (n.autoPlay = i.proxy(n.autoPlay, n)),
        (n.autoPlayClear = i.proxy(n.autoPlayClear, n)),
        (n.autoPlayIterator = i.proxy(n.autoPlayIterator, n)),
        (n.changeSlide = i.proxy(n.changeSlide, n)),
        (n.clickHandler = i.proxy(n.clickHandler, n)),
        (n.selectHandler = i.proxy(n.selectHandler, n)),
        (n.setPosition = i.proxy(n.setPosition, n)),
        (n.swipeHandler = i.proxy(n.swipeHandler, n)),
        (n.dragHandler = i.proxy(n.dragHandler, n)),
        (n.keyHandler = i.proxy(n.keyHandler, n)),
        (n.instanceUid = e++),
        (n.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/),
        n.registerBreakpoints(),
        n.init(!0);
    };
  })()).prototype.activateADA = function () {
    this.$slideTrack
      .find(".slick-active")
      .attr({ "aria-hidden": "false" })
      .find("a, input, button, select")
      .attr({ tabindex: "0" });
  }),
    (e.prototype.addSlide = e.prototype.slickAdd =
      function (e, t, o) {
        var s = this;
        if ("boolean" == typeof t) (o = t), (t = null);
        else if (t < 0 || t >= s.slideCount) return !1;
        s.unload(),
          "number" == typeof t
            ? 0 === t && 0 === s.$slides.length
              ? i(e).appendTo(s.$slideTrack)
              : o
              ? i(e).insertBefore(s.$slides.eq(t))
              : i(e).insertAfter(s.$slides.eq(t))
            : !0 === o
            ? i(e).prependTo(s.$slideTrack)
            : i(e).appendTo(s.$slideTrack),
          (s.$slides = s.$slideTrack.children(this.options.slide)),
          s.$slideTrack.children(this.options.slide).detach(),
          s.$slideTrack.append(s.$slides),
          s.$slides.each(function (e, t) {
            i(t).attr("data-slick-index", e);
          }),
          (s.$slidesCache = s.$slides),
          s.reinit();
      }),
    (e.prototype.animateHeight = function () {
      var i = this;
      if (
        1 === i.options.slidesToShow &&
        !0 === i.options.adaptiveHeight &&
        !1 === i.options.vertical
      ) {
        var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
        i.$list.animate({ height: e }, i.options.speed);
      }
    }),
    (e.prototype.animateSlide = function (e, t) {
      var o = {},
        s = this;
      s.animateHeight(),
        !0 === s.options.rtl && !1 === s.options.vertical && (e = -e),
        !1 === s.transformsEnabled
          ? !1 === s.options.vertical
            ? s.$slideTrack.animate(
                { left: e },
                s.options.speed,
                s.options.easing,
                t
              )
            : s.$slideTrack.animate(
                { top: e },
                s.options.speed,
                s.options.easing,
                t
              )
          : !1 === s.cssTransitions
          ? (!0 === s.options.rtl && (s.currentLeft = -s.currentLeft),
            i({ animStart: s.currentLeft }).animate(
              { animStart: e },
              {
                duration: s.options.speed,
                easing: s.options.easing,
                step: function (i) {
                  (i = Math.ceil(i)),
                    !1 === s.options.vertical
                      ? ((o[s.animType] = "translate(" + i + "px, 0px)"),
                        s.$slideTrack.css(o))
                      : ((o[s.animType] = "translate(0px," + i + "px)"),
                        s.$slideTrack.css(o));
                },
                complete: function () {
                  t && t.call();
                },
              }
            ))
          : (s.applyTransition(),
            (e = Math.ceil(e)),
            !1 === s.options.vertical
              ? (o[s.animType] = "translate3d(" + e + "px, 0px, 0px)")
              : (o[s.animType] = "translate3d(0px," + e + "px, 0px)"),
            s.$slideTrack.css(o),
            t &&
              setTimeout(function () {
                s.disableTransition(), t.call();
              }, s.options.speed));
    }),
    (e.prototype.getNavTarget = function () {
      var e = this,
        t = e.options.asNavFor;
      return t && null !== t && (t = i(t).not(e.$slider)), t;
    }),
    (e.prototype.asNavFor = function (e) {
      var t = this.getNavTarget();
      null !== t &&
        "object" == typeof t &&
        t.each(function () {
          var t = i(this).slick("getSlick");
          t.unslicked || t.slideHandler(e, !0);
        });
    }),
    (e.prototype.applyTransition = function (i) {
      var e = this,
        t = {};
      !1 === e.options.fade
        ? (t[e.transitionType] =
            e.transformType + " " + e.options.speed + "ms " + e.options.cssEase)
        : (t[e.transitionType] =
            "opacity " + e.options.speed + "ms " + e.options.cssEase),
        !1 === e.options.fade ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t);
    }),
    (e.prototype.autoPlay = function () {
      var i = this;
      i.autoPlayClear(),
        i.slideCount > i.options.slidesToShow &&
          (i.autoPlayTimer = setInterval(
            i.autoPlayIterator,
            i.options.autoplaySpeed
          ));
    }),
    (e.prototype.autoPlayClear = function () {
      var i = this;
      i.autoPlayTimer && clearInterval(i.autoPlayTimer);
    }),
    (e.prototype.autoPlayIterator = function () {
      var i = this,
        e = i.currentSlide + i.options.slidesToScroll;
      i.paused ||
        i.interrupted ||
        i.focussed ||
        (!1 === i.options.infinite &&
          (1 === i.direction && i.currentSlide + 1 === i.slideCount - 1
            ? (i.direction = 0)
            : 0 === i.direction &&
              ((e = i.currentSlide - i.options.slidesToScroll),
              i.currentSlide - 1 == 0 && (i.direction = 1))),
        i.slideHandler(e));
    }),
    (e.prototype.buildArrows = function () {
      var e = this;
      !0 === e.options.arrows &&
        ((e.$prevArrow = i(e.options.prevArrow).addClass("slick-arrow")),
        (e.$nextArrow = i(e.options.nextArrow).addClass("slick-arrow")),
        e.slideCount > e.options.slidesToShow
          ? (e.$prevArrow
              .removeClass("slick-hidden")
              .removeAttr("aria-hidden tabindex"),
            e.$nextArrow
              .removeClass("slick-hidden")
              .removeAttr("aria-hidden tabindex"),
            e.htmlExpr.test(e.options.prevArrow) &&
              e.$prevArrow.prependTo(e.options.appendArrows),
            e.htmlExpr.test(e.options.nextArrow) &&
              e.$nextArrow.appendTo(e.options.appendArrows),
            !0 !== e.options.infinite &&
              e.$prevArrow
                .addClass("slick-disabled")
                .attr("aria-disabled", "true"))
          : e.$prevArrow
              .add(e.$nextArrow)
              .addClass("slick-hidden")
              .attr({ "aria-disabled": "true", tabindex: "-1" }));
    }),
    (e.prototype.buildDots = function () {
      var e,
        t,
        o = this;
      if (!0 === o.options.dots) {
        for (
          o.$slider.addClass("slick-dotted"),
            t = i("<ul />").addClass(o.options.dotsClass),
            e = 0;
          e <= o.getDotCount();
          e += 1
        )
          t.append(i("<li />").append(o.options.customPaging.call(this, o, e)));
        (o.$dots = t.appendTo(o.options.appendDots)),
          o.$dots.find("li").first().addClass("slick-active");
      }
    }),
    (e.prototype.buildOut = function () {
      var e = this;
      (e.$slides = e.$slider
        .children(e.options.slide + ":not(.slick-cloned)")
        .addClass("slick-slide")),
        (e.slideCount = e.$slides.length),
        e.$slides.each(function (e, t) {
          i(t)
            .attr("data-slick-index", e)
            .data("originalStyling", i(t).attr("style") || "");
        }),
        e.$slider.addClass("slick-slider"),
        (e.$slideTrack =
          0 === e.slideCount
            ? i('<div class="slick-track"/>').appendTo(e.$slider)
            : e.$slides.wrapAll('<div class="slick-track"/>').parent()),
        (e.$list = e.$slideTrack.wrap('<div class="slick-list"/>').parent()),
        e.$slideTrack.css("opacity", 0),
        (!0 !== e.options.centerMode && !0 !== e.options.swipeToSlide) ||
          (e.options.slidesToScroll = 1),
        i("img[data-lazy]", e.$slider).not("[src]").addClass("slick-loading"),
        e.setupInfinite(),
        e.buildArrows(),
        e.buildDots(),
        e.updateDots(),
        e.setSlideClasses(
          "number" == typeof e.currentSlide ? e.currentSlide : 0
        ),
        !0 === e.options.draggable && e.$list.addClass("draggable");
    }),
    (e.prototype.buildRows = function () {
      var i,
        e,
        t,
        o,
        s,
        n,
        r,
        l = this;
      if (
        ((o = document.createDocumentFragment()),
        (n = l.$slider.children()),
        l.options.rows > 1)
      ) {
        for (
          r = l.options.slidesPerRow * l.options.rows,
            s = Math.ceil(n.length / r),
            i = 0;
          i < s;
          i++
        ) {
          var d = document.createElement("div");
          for (e = 0; e < l.options.rows; e++) {
            var a = document.createElement("div");
            for (t = 0; t < l.options.slidesPerRow; t++) {
              var c = i * r + (e * l.options.slidesPerRow + t);
              n.get(c) && a.appendChild(n.get(c));
            }
            d.appendChild(a);
          }
          o.appendChild(d);
        }
        l.$slider.empty().append(o),
          l.$slider
            .children()
            .children()
            .children()
            .css({
              width: 100 / l.options.slidesPerRow + "%",
              display: "inline-block",
            });
      }
    }),
    (e.prototype.checkResponsive = function (e, t) {
      var o,
        s,
        n,
        r = this,
        l = !1,
        d = r.$slider.width(),
        a = window.innerWidth || i(window).width();
      if (
        ("window" === r.respondTo
          ? (n = a)
          : "slider" === r.respondTo
          ? (n = d)
          : "min" === r.respondTo && (n = Math.min(a, d)),
        r.options.responsive &&
          r.options.responsive.length &&
          null !== r.options.responsive)
      ) {
        s = null;
        for (o in r.breakpoints)
          r.breakpoints.hasOwnProperty(o) &&
            (!1 === r.originalSettings.mobileFirst
              ? n < r.breakpoints[o] && (s = r.breakpoints[o])
              : n > r.breakpoints[o] && (s = r.breakpoints[o]));
        null !== s
          ? null !== r.activeBreakpoint
            ? (s !== r.activeBreakpoint || t) &&
              ((r.activeBreakpoint = s),
              "unslick" === r.breakpointSettings[s]
                ? r.unslick(s)
                : ((r.options = i.extend(
                    {},
                    r.originalSettings,
                    r.breakpointSettings[s]
                  )),
                  !0 === e && (r.currentSlide = r.options.initialSlide),
                  r.refresh(e)),
              (l = s))
            : ((r.activeBreakpoint = s),
              "unslick" === r.breakpointSettings[s]
                ? r.unslick(s)
                : ((r.options = i.extend(
                    {},
                    r.originalSettings,
                    r.breakpointSettings[s]
                  )),
                  !0 === e && (r.currentSlide = r.options.initialSlide),
                  r.refresh(e)),
              (l = s))
          : null !== r.activeBreakpoint &&
            ((r.activeBreakpoint = null),
            (r.options = r.originalSettings),
            !0 === e && (r.currentSlide = r.options.initialSlide),
            r.refresh(e),
            (l = s)),
          e || !1 === l || r.$slider.trigger("breakpoint", [r, l]);
      }
    }),
    (e.prototype.changeSlide = function (e, t) {
      var o,
        s,
        n,
        r = this,
        l = i(e.currentTarget);
      switch (
        (l.is("a") && e.preventDefault(),
        l.is("li") || (l = l.closest("li")),
        (n = r.slideCount % r.options.slidesToScroll != 0),
        (o = n
          ? 0
          : (r.slideCount - r.currentSlide) % r.options.slidesToScroll),
        e.data.message)
      ) {
        case "previous":
          (s = 0 === o ? r.options.slidesToScroll : r.options.slidesToShow - o),
            r.slideCount > r.options.slidesToShow &&
              r.slideHandler(r.currentSlide - s, !1, t);
          break;
        case "next":
          (s = 0 === o ? r.options.slidesToScroll : o),
            r.slideCount > r.options.slidesToShow &&
              r.slideHandler(r.currentSlide + s, !1, t);
          break;
        case "index":
          var d =
            0 === e.data.index
              ? 0
              : e.data.index || l.index() * r.options.slidesToScroll;
          r.slideHandler(r.checkNavigable(d), !1, t),
            l.children().trigger("focus");
          break;
        default:
          return;
      }
    }),
    (e.prototype.checkNavigable = function (i) {
      var e, t;
      if (((e = this.getNavigableIndexes()), (t = 0), i > e[e.length - 1]))
        i = e[e.length - 1];
      else
        for (var o in e) {
          if (i < e[o]) {
            i = t;
            break;
          }
          t = e[o];
        }
      return i;
    }),
    (e.prototype.cleanUpEvents = function () {
      var e = this;
      e.options.dots &&
        null !== e.$dots &&
        (i("li", e.$dots)
          .off("click.slick", e.changeSlide)
          .off("mouseenter.slick", i.proxy(e.interrupt, e, !0))
          .off("mouseleave.slick", i.proxy(e.interrupt, e, !1)),
        !0 === e.options.accessibility &&
          e.$dots.off("keydown.slick", e.keyHandler)),
        e.$slider.off("focus.slick blur.slick"),
        !0 === e.options.arrows &&
          e.slideCount > e.options.slidesToShow &&
          (e.$prevArrow && e.$prevArrow.off("click.slick", e.changeSlide),
          e.$nextArrow && e.$nextArrow.off("click.slick", e.changeSlide),
          !0 === e.options.accessibility &&
            (e.$prevArrow && e.$prevArrow.off("keydown.slick", e.keyHandler),
            e.$nextArrow && e.$nextArrow.off("keydown.slick", e.keyHandler))),
        e.$list.off("touchstart.slick mousedown.slick", e.swipeHandler),
        e.$list.off("touchmove.slick mousemove.slick", e.swipeHandler),
        e.$list.off("touchend.slick mouseup.slick", e.swipeHandler),
        e.$list.off("touchcancel.slick mouseleave.slick", e.swipeHandler),
        e.$list.off("click.slick", e.clickHandler),
        i(document).off(e.visibilityChange, e.visibility),
        e.cleanUpSlideEvents(),
        !0 === e.options.accessibility &&
          e.$list.off("keydown.slick", e.keyHandler),
        !0 === e.options.focusOnSelect &&
          i(e.$slideTrack).children().off("click.slick", e.selectHandler),
        i(window).off(
          "orientationchange.slick.slick-" + e.instanceUid,
          e.orientationChange
        ),
        i(window).off("resize.slick.slick-" + e.instanceUid, e.resize),
        i("[draggable!=true]", e.$slideTrack).off(
          "dragstart",
          e.preventDefault
        ),
        i(window).off("load.slick.slick-" + e.instanceUid, e.setPosition);
    }),
    (e.prototype.cleanUpSlideEvents = function () {
      var e = this;
      e.$list.off("mouseenter.slick", i.proxy(e.interrupt, e, !0)),
        e.$list.off("mouseleave.slick", i.proxy(e.interrupt, e, !1));
    }),
    (e.prototype.cleanUpRows = function () {
      var i,
        e = this;
      e.options.rows > 1 &&
        ((i = e.$slides.children().children()).removeAttr("style"),
        e.$slider.empty().append(i));
    }),
    (e.prototype.clickHandler = function (i) {
      !1 === this.shouldClick &&
        (i.stopImmediatePropagation(), i.stopPropagation(), i.preventDefault());
    }),
    (e.prototype.destroy = function (e) {
      var t = this;
      t.autoPlayClear(),
        (t.touchObject = {}),
        t.cleanUpEvents(),
        i(".slick-cloned", t.$slider).detach(),
        t.$dots && t.$dots.remove(),
        t.$prevArrow &&
          t.$prevArrow.length &&
          (t.$prevArrow
            .removeClass("slick-disabled slick-arrow slick-hidden")
            .removeAttr("aria-hidden aria-disabled tabindex")
            .css("display", ""),
          t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.remove()),
        t.$nextArrow &&
          t.$nextArrow.length &&
          (t.$nextArrow
            .removeClass("slick-disabled slick-arrow slick-hidden")
            .removeAttr("aria-hidden aria-disabled tabindex")
            .css("display", ""),
          t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.remove()),
        t.$slides &&
          (t.$slides
            .removeClass(
              "slick-slide slick-active slick-center slick-visible slick-current"
            )
            .removeAttr("aria-hidden")
            .removeAttr("data-slick-index")
            .each(function () {
              i(this).attr("style", i(this).data("originalStyling"));
            }),
          t.$slideTrack.children(this.options.slide).detach(),
          t.$slideTrack.detach(),
          t.$list.detach(),
          t.$slider.append(t.$slides)),
        t.cleanUpRows(),
        t.$slider.removeClass("slick-slider"),
        t.$slider.removeClass("slick-initialized"),
        t.$slider.removeClass("slick-dotted"),
        (t.unslicked = !0),
        e || t.$slider.trigger("destroy", [t]);
    }),
    (e.prototype.disableTransition = function (i) {
      var e = this,
        t = {};
      (t[e.transitionType] = ""),
        !1 === e.options.fade ? e.$slideTrack.css(t) : e.$slides.eq(i).css(t);
    }),
    (e.prototype.fadeSlide = function (i, e) {
      var t = this;
      !1 === t.cssTransitions
        ? (t.$slides.eq(i).css({ zIndex: t.options.zIndex }),
          t.$slides
            .eq(i)
            .animate({ opacity: 1 }, t.options.speed, t.options.easing, e))
        : (t.applyTransition(i),
          t.$slides.eq(i).css({ opacity: 1, zIndex: t.options.zIndex }),
          e &&
            setTimeout(function () {
              t.disableTransition(i), e.call();
            }, t.options.speed));
    }),
    (e.prototype.fadeSlideOut = function (i) {
      var e = this;
      !1 === e.cssTransitions
        ? e.$slides
            .eq(i)
            .animate(
              { opacity: 0, zIndex: e.options.zIndex - 2 },
              e.options.speed,
              e.options.easing
            )
        : (e.applyTransition(i),
          e.$slides.eq(i).css({ opacity: 0, zIndex: e.options.zIndex - 2 }));
    }),
    (e.prototype.filterSlides = e.prototype.slickFilter =
      function (i) {
        var e = this;
        null !== i &&
          ((e.$slidesCache = e.$slides),
          e.unload(),
          e.$slideTrack.children(this.options.slide).detach(),
          e.$slidesCache.filter(i).appendTo(e.$slideTrack),
          e.reinit());
      }),
    (e.prototype.focusHandler = function () {
      var e = this;
      e.$slider
        .off("focus.slick blur.slick")
        .on("focus.slick blur.slick", "*", function (t) {
          t.stopImmediatePropagation();
          var o = i(this);
          setTimeout(function () {
            e.options.pauseOnFocus &&
              ((e.focussed = o.is(":focus")), e.autoPlay());
          }, 0);
        });
    }),
    (e.prototype.getCurrent = e.prototype.slickCurrentSlide =
      function () {
        return this.currentSlide;
      }),
    (e.prototype.getDotCount = function () {
      var i = this,
        e = 0,
        t = 0,
        o = 0;
      if (!0 === i.options.infinite)
        if (i.slideCount <= i.options.slidesToShow) ++o;
        else
          for (; e < i.slideCount; )
            ++o,
              (e = t + i.options.slidesToScroll),
              (t +=
                i.options.slidesToScroll <= i.options.slidesToShow
                  ? i.options.slidesToScroll
                  : i.options.slidesToShow);
      else if (!0 === i.options.centerMode) o = i.slideCount;
      else if (i.options.asNavFor)
        for (; e < i.slideCount; )
          ++o,
            (e = t + i.options.slidesToScroll),
            (t +=
              i.options.slidesToScroll <= i.options.slidesToShow
                ? i.options.slidesToScroll
                : i.options.slidesToShow);
      else
        o =
          1 +
          Math.ceil(
            (i.slideCount - i.options.slidesToShow) / i.options.slidesToScroll
          );
      return o - 1;
    }),
    (e.prototype.getLeft = function (i) {
      var e,
        t,
        o,
        s,
        n = this,
        r = 0;
      return (
        (n.slideOffset = 0),
        (t = n.$slides.first().outerHeight(!0)),
        !0 === n.options.infinite
          ? (n.slideCount > n.options.slidesToShow &&
              ((n.slideOffset = n.slideWidth * n.options.slidesToShow * -1),
              (s = -1),
              !0 === n.options.vertical &&
                !0 === n.options.centerMode &&
                (2 === n.options.slidesToShow
                  ? (s = -1.5)
                  : 1 === n.options.slidesToShow && (s = -2)),
              (r = t * n.options.slidesToShow * s)),
            n.slideCount % n.options.slidesToScroll != 0 &&
              i + n.options.slidesToScroll > n.slideCount &&
              n.slideCount > n.options.slidesToShow &&
              (i > n.slideCount
                ? ((n.slideOffset =
                    (n.options.slidesToShow - (i - n.slideCount)) *
                    n.slideWidth *
                    -1),
                  (r = (n.options.slidesToShow - (i - n.slideCount)) * t * -1))
                : ((n.slideOffset =
                    (n.slideCount % n.options.slidesToScroll) *
                    n.slideWidth *
                    -1),
                  (r = (n.slideCount % n.options.slidesToScroll) * t * -1))))
          : i + n.options.slidesToShow > n.slideCount &&
            ((n.slideOffset =
              (i + n.options.slidesToShow - n.slideCount) * n.slideWidth),
            (r = (i + n.options.slidesToShow - n.slideCount) * t)),
        n.slideCount <= n.options.slidesToShow &&
          ((n.slideOffset = 0), (r = 0)),
        !0 === n.options.centerMode && n.slideCount <= n.options.slidesToShow
          ? (n.slideOffset =
              (n.slideWidth * Math.floor(n.options.slidesToShow)) / 2 -
              (n.slideWidth * n.slideCount) / 2)
          : !0 === n.options.centerMode && !0 === n.options.infinite
          ? (n.slideOffset +=
              n.slideWidth * Math.floor(n.options.slidesToShow / 2) -
              n.slideWidth)
          : !0 === n.options.centerMode &&
            ((n.slideOffset = 0),
            (n.slideOffset +=
              n.slideWidth * Math.floor(n.options.slidesToShow / 2))),
        (e =
          !1 === n.options.vertical
            ? i * n.slideWidth * -1 + n.slideOffset
            : i * t * -1 + r),
        !0 === n.options.variableWidth &&
          ((o =
            n.slideCount <= n.options.slidesToShow || !1 === n.options.infinite
              ? n.$slideTrack.children(".slick-slide").eq(i)
              : n.$slideTrack
                  .children(".slick-slide")
                  .eq(i + n.options.slidesToShow)),
          (e =
            !0 === n.options.rtl
              ? o[0]
                ? -1 * (n.$slideTrack.width() - o[0].offsetLeft - o.width())
                : 0
              : o[0]
              ? -1 * o[0].offsetLeft
              : 0),
          !0 === n.options.centerMode &&
            ((o =
              n.slideCount <= n.options.slidesToShow ||
              !1 === n.options.infinite
                ? n.$slideTrack.children(".slick-slide").eq(i)
                : n.$slideTrack
                    .children(".slick-slide")
                    .eq(i + n.options.slidesToShow + 1)),
            (e =
              !0 === n.options.rtl
                ? o[0]
                  ? -1 * (n.$slideTrack.width() - o[0].offsetLeft - o.width())
                  : 0
                : o[0]
                ? -1 * o[0].offsetLeft
                : 0),
            (e += (n.$list.width() - o.outerWidth()) / 2))),
        e
      );
    }),
    (e.prototype.getOption = e.prototype.slickGetOption =
      function (i) {
        return this.options[i];
      }),
    (e.prototype.getNavigableIndexes = function () {
      var i,
        e = this,
        t = 0,
        o = 0,
        s = [];
      for (
        !1 === e.options.infinite
          ? (i = e.slideCount)
          : ((t = -1 * e.options.slidesToScroll),
            (o = -1 * e.options.slidesToScroll),
            (i = 2 * e.slideCount));
        t < i;

      )
        s.push(t),
          (t = o + e.options.slidesToScroll),
          (o +=
            e.options.slidesToScroll <= e.options.slidesToShow
              ? e.options.slidesToScroll
              : e.options.slidesToShow);
      return s;
    }),
    (e.prototype.getSlick = function () {
      return this;
    }),
    (e.prototype.getSlideCount = function () {
      var e,
        t,
        o = this;
      return (
        (t =
          !0 === o.options.centerMode
            ? o.slideWidth * Math.floor(o.options.slidesToShow / 2)
            : 0),
        !0 === o.options.swipeToSlide
          ? (o.$slideTrack.find(".slick-slide").each(function (s, n) {
              if (n.offsetLeft - t + i(n).outerWidth() / 2 > -1 * o.swipeLeft)
                return (e = n), !1;
            }),
            Math.abs(i(e).attr("data-slick-index") - o.currentSlide) || 1)
          : o.options.slidesToScroll
      );
    }),
    (e.prototype.goTo = e.prototype.slickGoTo =
      function (i, e) {
        this.changeSlide({ data: { message: "index", index: parseInt(i) } }, e);
      }),
    (e.prototype.init = function (e) {
      var t = this;
      i(t.$slider).hasClass("slick-initialized") ||
        (i(t.$slider).addClass("slick-initialized"),
        t.buildRows(),
        t.buildOut(),
        t.setProps(),
        t.startLoad(),
        t.loadSlider(),
        t.initializeEvents(),
        t.updateArrows(),
        t.updateDots(),
        t.checkResponsive(!0),
        t.focusHandler()),
        e && t.$slider.trigger("init", [t]),
        !0 === t.options.accessibility && t.initADA(),
        t.options.autoplay && ((t.paused = !1), t.autoPlay());
    }),
    (e.prototype.initADA = function () {
      var e = this,
        t = Math.ceil(e.slideCount / e.options.slidesToShow),
        o = e.getNavigableIndexes().filter(function (i) {
          return i >= 0 && i < e.slideCount;
        });
      e.$slides
        .add(e.$slideTrack.find(".slick-cloned"))
        .attr({ "aria-hidden": "true", tabindex: "-1" })
        .find("a, input, button, select")
        .attr({ tabindex: "-1" }),
        null !== e.$dots &&
          (e.$slides
            .not(e.$slideTrack.find(".slick-cloned"))
            .each(function (t) {
              var s = o.indexOf(t);
              i(this).attr({
                role: "tabpanel",
                id: "slick-slide" + e.instanceUid + t,
                tabindex: -1,
              }),
                -1 !== s &&
                  i(this).attr({
                    "aria-describedby":
                      "slick-slide-control" + e.instanceUid + s,
                  });
            }),
          e.$dots
            .attr("role", "tablist")
            .find("li")
            .each(function (s) {
              var n = o[s];
              i(this).attr({ role: "presentation" }),
                i(this)
                  .find("button")
                  .first()
                  .attr({
                    role: "tab",
                    id: "slick-slide-control" + e.instanceUid + s,
                    "aria-controls": "slick-slide" + e.instanceUid + n,
                    "aria-label": s + 1 + " of " + t,
                    "aria-selected": null,
                    tabindex: "-1",
                  });
            })
            .eq(e.currentSlide)
            .find("button")
            .attr({ "aria-selected": "true", tabindex: "0" })
            .end());
      for (var s = e.currentSlide, n = s + e.options.slidesToShow; s < n; s++)
        e.$slides.eq(s).attr("tabindex", 0);
      e.activateADA();
    }),
    (e.prototype.initArrowEvents = function () {
      var i = this;
      !0 === i.options.arrows &&
        i.slideCount > i.options.slidesToShow &&
        (i.$prevArrow
          .off("click.slick")
          .on("click.slick", { message: "previous" }, i.changeSlide),
        i.$nextArrow
          .off("click.slick")
          .on("click.slick", { message: "next" }, i.changeSlide),
        !0 === i.options.accessibility &&
          (i.$prevArrow.on("keydown.slick", i.keyHandler),
          i.$nextArrow.on("keydown.slick", i.keyHandler)));
    }),
    (e.prototype.initDotEvents = function () {
      var e = this;
      !0 === e.options.dots &&
        (i("li", e.$dots).on(
          "click.slick",
          { message: "index" },
          e.changeSlide
        ),
        !0 === e.options.accessibility &&
          e.$dots.on("keydown.slick", e.keyHandler)),
        !0 === e.options.dots &&
          !0 === e.options.pauseOnDotsHover &&
          i("li", e.$dots)
            .on("mouseenter.slick", i.proxy(e.interrupt, e, !0))
            .on("mouseleave.slick", i.proxy(e.interrupt, e, !1));
    }),
    (e.prototype.initSlideEvents = function () {
      var e = this;
      e.options.pauseOnHover &&
        (e.$list.on("mouseenter.slick", i.proxy(e.interrupt, e, !0)),
        e.$list.on("mouseleave.slick", i.proxy(e.interrupt, e, !1)));
    }),
    (e.prototype.initializeEvents = function () {
      var e = this;
      e.initArrowEvents(),
        e.initDotEvents(),
        e.initSlideEvents(),
        e.$list.on(
          "touchstart.slick mousedown.slick",
          { action: "start" },
          e.swipeHandler
        ),
        e.$list.on(
          "touchmove.slick mousemove.slick",
          { action: "move" },
          e.swipeHandler
        ),
        e.$list.on(
          "touchend.slick mouseup.slick",
          { action: "end" },
          e.swipeHandler
        ),
        e.$list.on(
          "touchcancel.slick mouseleave.slick",
          { action: "end" },
          e.swipeHandler
        ),
        e.$list.on("click.slick", e.clickHandler),
        i(document).on(e.visibilityChange, i.proxy(e.visibility, e)),
        !0 === e.options.accessibility &&
          e.$list.on("keydown.slick", e.keyHandler),
        !0 === e.options.focusOnSelect &&
          i(e.$slideTrack).children().on("click.slick", e.selectHandler),
        i(window).on(
          "orientationchange.slick.slick-" + e.instanceUid,
          i.proxy(e.orientationChange, e)
        ),
        i(window).on(
          "resize.slick.slick-" + e.instanceUid,
          i.proxy(e.resize, e)
        ),
        i("[draggable!=true]", e.$slideTrack).on("dragstart", e.preventDefault),
        i(window).on("load.slick.slick-" + e.instanceUid, e.setPosition),
        i(e.setPosition);
    }),
    (e.prototype.initUI = function () {
      var i = this;
      !0 === i.options.arrows &&
        i.slideCount > i.options.slidesToShow &&
        (i.$prevArrow.show(), i.$nextArrow.show()),
        !0 === i.options.dots &&
          i.slideCount > i.options.slidesToShow &&
          i.$dots.show();
    }),
    (e.prototype.keyHandler = function (i) {
      var e = this;
      i.target.tagName.match("TEXTAREA|INPUT|SELECT") ||
        (37 === i.keyCode && !0 === e.options.accessibility
          ? e.changeSlide({
              data: { message: !0 === e.options.rtl ? "next" : "previous" },
            })
          : 39 === i.keyCode &&
            !0 === e.options.accessibility &&
            e.changeSlide({
              data: { message: !0 === e.options.rtl ? "previous" : "next" },
            }));
    }),
    (e.prototype.lazyLoad = function () {
      function e(e) {
        i("img[data-lazy]", e).each(function () {
          var e = i(this),
            t = i(this).attr("data-lazy"),
            o = i(this).attr("data-srcset"),
            s = i(this).attr("data-sizes") || n.$slider.attr("data-sizes"),
            r = document.createElement("img");
          (r.onload = function () {
            e.animate({ opacity: 0 }, 100, function () {
              o && (e.attr("srcset", o), s && e.attr("sizes", s)),
                e.attr("src", t).animate({ opacity: 1 }, 200, function () {
                  e.removeAttr("data-lazy data-srcset data-sizes").removeClass(
                    "slick-loading"
                  );
                }),
                n.$slider.trigger("lazyLoaded", [n, e, t]);
            });
          }),
            (r.onerror = function () {
              e
                .removeAttr("data-lazy")
                .removeClass("slick-loading")
                .addClass("slick-lazyload-error"),
                n.$slider.trigger("lazyLoadError", [n, e, t]);
            }),
            (r.src = t);
        });
      }
      var t,
        o,
        s,
        n = this;
      if (
        (!0 === n.options.centerMode
          ? !0 === n.options.infinite
            ? (s =
                (o = n.currentSlide + (n.options.slidesToShow / 2 + 1)) +
                n.options.slidesToShow +
                2)
            : ((o = Math.max(
                0,
                n.currentSlide - (n.options.slidesToShow / 2 + 1)
              )),
              (s = n.options.slidesToShow / 2 + 1 + 2 + n.currentSlide))
          : ((o = n.options.infinite
              ? n.options.slidesToShow + n.currentSlide
              : n.currentSlide),
            (s = Math.ceil(o + n.options.slidesToShow)),
            !0 === n.options.fade && (o > 0 && o--, s <= n.slideCount && s++)),
        (t = n.$slider.find(".slick-slide").slice(o, s)),
        "anticipated" === n.options.lazyLoad)
      )
        for (
          var r = o - 1, l = s, d = n.$slider.find(".slick-slide"), a = 0;
          a < n.options.slidesToScroll;
          a++
        )
          r < 0 && (r = n.slideCount - 1),
            (t = (t = t.add(d.eq(r))).add(d.eq(l))),
            r--,
            l++;
      e(t),
        n.slideCount <= n.options.slidesToShow
          ? e(n.$slider.find(".slick-slide"))
          : n.currentSlide >= n.slideCount - n.options.slidesToShow
          ? e(n.$slider.find(".slick-cloned").slice(0, n.options.slidesToShow))
          : 0 === n.currentSlide &&
            e(
              n.$slider.find(".slick-cloned").slice(-1 * n.options.slidesToShow)
            );
    }),
    (e.prototype.loadSlider = function () {
      var i = this;
      i.setPosition(),
        i.$slideTrack.css({ opacity: 1 }),
        i.$slider.removeClass("slick-loading"),
        i.initUI(),
        "progressive" === i.options.lazyLoad && i.progressiveLazyLoad();
    }),
    (e.prototype.next = e.prototype.slickNext =
      function () {
        this.changeSlide({ data: { message: "next" } });
      }),
    (e.prototype.orientationChange = function () {
      var i = this;
      i.checkResponsive(), i.setPosition();
    }),
    (e.prototype.pause = e.prototype.slickPause =
      function () {
        var i = this;
        i.autoPlayClear(), (i.paused = !0);
      }),
    (e.prototype.play = e.prototype.slickPlay =
      function () {
        var i = this;
        i.autoPlay(),
          (i.options.autoplay = !0),
          (i.paused = !1),
          (i.focussed = !1),
          (i.interrupted = !1);
      }),
    (e.prototype.postSlide = function (e) {
      var t = this;
      t.unslicked ||
        (t.$slider.trigger("afterChange", [t, e]),
        (t.animating = !1),
        t.slideCount > t.options.slidesToShow && t.setPosition(),
        (t.swipeLeft = null),
        t.options.autoplay && t.autoPlay(),
        !0 === t.options.accessibility &&
          (t.initADA(),
          t.options.focusOnChange &&
            i(t.$slides.get(t.currentSlide)).attr("tabindex", 0).focus()));
    }),
    (e.prototype.prev = e.prototype.slickPrev =
      function () {
        this.changeSlide({ data: { message: "previous" } });
      }),
    (e.prototype.preventDefault = function (i) {
      i.preventDefault();
    }),
    (e.prototype.progressiveLazyLoad = function (e) {
      e = e || 1;
      var t,
        o,
        s,
        n,
        r,
        l = this,
        d = i("img[data-lazy]", l.$slider);
      d.length
        ? ((t = d.first()),
          (o = t.attr("data-lazy")),
          (s = t.attr("data-srcset")),
          (n = t.attr("data-sizes") || l.$slider.attr("data-sizes")),
          ((r = document.createElement("img")).onload = function () {
            s && (t.attr("srcset", s), n && t.attr("sizes", n)),
              t
                .attr("src", o)
                .removeAttr("data-lazy data-srcset data-sizes")
                .removeClass("slick-loading"),
              !0 === l.options.adaptiveHeight && l.setPosition(),
              l.$slider.trigger("lazyLoaded", [l, t, o]),
              l.progressiveLazyLoad();
          }),
          (r.onerror = function () {
            e < 3
              ? setTimeout(function () {
                  l.progressiveLazyLoad(e + 1);
                }, 500)
              : (t
                  .removeAttr("data-lazy")
                  .removeClass("slick-loading")
                  .addClass("slick-lazyload-error"),
                l.$slider.trigger("lazyLoadError", [l, t, o]),
                l.progressiveLazyLoad());
          }),
          (r.src = o))
        : l.$slider.trigger("allImagesLoaded", [l]);
    }),
    (e.prototype.refresh = function (e) {
      var t,
        o,
        s = this;
      (o = s.slideCount - s.options.slidesToShow),
        !s.options.infinite && s.currentSlide > o && (s.currentSlide = o),
        s.slideCount <= s.options.slidesToShow && (s.currentSlide = 0),
        (t = s.currentSlide),
        s.destroy(!0),
        i.extend(s, s.initials, { currentSlide: t }),
        s.init(),
        e || s.changeSlide({ data: { message: "index", index: t } }, !1);
    }),
    (e.prototype.registerBreakpoints = function () {
      var e,
        t,
        o,
        s = this,
        n = s.options.responsive || null;
      if ("array" === i.type(n) && n.length) {
        s.respondTo = s.options.respondTo || "window";
        for (e in n)
          if (((o = s.breakpoints.length - 1), n.hasOwnProperty(e))) {
            for (t = n[e].breakpoint; o >= 0; )
              s.breakpoints[o] &&
                s.breakpoints[o] === t &&
                s.breakpoints.splice(o, 1),
                o--;
            s.breakpoints.push(t), (s.breakpointSettings[t] = n[e].settings);
          }
        s.breakpoints.sort(function (i, e) {
          return s.options.mobileFirst ? i - e : e - i;
        });
      }
    }),
    (e.prototype.reinit = function () {
      var e = this;
      (e.$slides = e.$slideTrack
        .children(e.options.slide)
        .addClass("slick-slide")),
        (e.slideCount = e.$slides.length),
        e.currentSlide >= e.slideCount &&
          0 !== e.currentSlide &&
          (e.currentSlide = e.currentSlide - e.options.slidesToScroll),
        e.slideCount <= e.options.slidesToShow && (e.currentSlide = 0),
        e.registerBreakpoints(),
        e.setProps(),
        e.setupInfinite(),
        e.buildArrows(),
        e.updateArrows(),
        e.initArrowEvents(),
        e.buildDots(),
        e.updateDots(),
        e.initDotEvents(),
        e.cleanUpSlideEvents(),
        e.initSlideEvents(),
        e.checkResponsive(!1, !0),
        !0 === e.options.focusOnSelect &&
          i(e.$slideTrack).children().on("click.slick", e.selectHandler),
        e.setSlideClasses(
          "number" == typeof e.currentSlide ? e.currentSlide : 0
        ),
        e.setPosition(),
        e.focusHandler(),
        (e.paused = !e.options.autoplay),
        e.autoPlay(),
        e.$slider.trigger("reInit", [e]);
    }),
    (e.prototype.resize = function () {
      var e = this;
      i(window).width() !== e.windowWidth &&
        (clearTimeout(e.windowDelay),
        (e.windowDelay = window.setTimeout(function () {
          (e.windowWidth = i(window).width()),
            e.checkResponsive(),
            e.unslicked || e.setPosition();
        }, 50)));
    }),
    (e.prototype.removeSlide = e.prototype.slickRemove =
      function (i, e, t) {
        var o = this;
        if (
          ((i =
            "boolean" == typeof i
              ? !0 === (e = i)
                ? 0
                : o.slideCount - 1
              : !0 === e
              ? --i
              : i),
          o.slideCount < 1 || i < 0 || i > o.slideCount - 1)
        )
          return !1;
        o.unload(),
          !0 === t
            ? o.$slideTrack.children().remove()
            : o.$slideTrack.children(this.options.slide).eq(i).remove(),
          (o.$slides = o.$slideTrack.children(this.options.slide)),
          o.$slideTrack.children(this.options.slide).detach(),
          o.$slideTrack.append(o.$slides),
          (o.$slidesCache = o.$slides),
          o.reinit();
      }),
    (e.prototype.setCSS = function (i) {
      var e,
        t,
        o = this,
        s = {};
      !0 === o.options.rtl && (i = -i),
        (e = "left" == o.positionProp ? Math.ceil(i) + "px" : "0px"),
        (t = "top" == o.positionProp ? Math.ceil(i) + "px" : "0px"),
        (s[o.positionProp] = i),
        !1 === o.transformsEnabled
          ? o.$slideTrack.css(s)
          : ((s = {}),
            !1 === o.cssTransitions
              ? ((s[o.animType] = "translate(" + e + ", " + t + ")"),
                o.$slideTrack.css(s))
              : ((s[o.animType] = "translate3d(" + e + ", " + t + ", 0px)"),
                o.$slideTrack.css(s)));
    }),
    (e.prototype.setDimensions = function () {
      var i = this;
      !1 === i.options.vertical
        ? !0 === i.options.centerMode &&
          i.$list.css({ padding: "0px " + i.options.centerPadding })
        : (i.$list.height(
            i.$slides.first().outerHeight(!0) * i.options.slidesToShow
          ),
          !0 === i.options.centerMode &&
            i.$list.css({ padding: i.options.centerPadding + " 0px" })),
        (i.listWidth = i.$list.width()),
        (i.listHeight = i.$list.height()),
        !1 === i.options.vertical && !1 === i.options.variableWidth
          ? ((i.slideWidth = Math.ceil(i.listWidth / i.options.slidesToShow)),
            i.$slideTrack.width(
              Math.ceil(
                i.slideWidth * i.$slideTrack.children(".slick-slide").length
              )
            ))
          : !0 === i.options.variableWidth
          ? i.$slideTrack.width(5e3 * i.slideCount)
          : ((i.slideWidth = Math.ceil(i.listWidth)),
            i.$slideTrack.height(
              Math.ceil(
                i.$slides.first().outerHeight(!0) *
                  i.$slideTrack.children(".slick-slide").length
              )
            ));
      var e = i.$slides.first().outerWidth(!0) - i.$slides.first().width();
      !1 === i.options.variableWidth &&
        i.$slideTrack.children(".slick-slide").width(i.slideWidth - e);
    }),
    (e.prototype.setFade = function () {
      var e,
        t = this;
      t.$slides.each(function (o, s) {
        (e = t.slideWidth * o * -1),
          !0 === t.options.rtl
            ? i(s).css({
                position: "relative",
                right: e,
                top: 0,
                zIndex: t.options.zIndex - 2,
                opacity: 0,
              })
            : i(s).css({
                position: "relative",
                left: e,
                top: 0,
                zIndex: t.options.zIndex - 2,
                opacity: 0,
              });
      }),
        t.$slides
          .eq(t.currentSlide)
          .css({ zIndex: t.options.zIndex - 1, opacity: 1 });
    }),
    (e.prototype.setHeight = function () {
      var i = this;
      if (
        1 === i.options.slidesToShow &&
        !0 === i.options.adaptiveHeight &&
        !1 === i.options.vertical
      ) {
        var e = i.$slides.eq(i.currentSlide).outerHeight(!0);
        i.$list.css("height", e);
      }
    }),
    (e.prototype.setOption = e.prototype.slickSetOption =
      function () {
        var e,
          t,
          o,
          s,
          n,
          r = this,
          l = !1;
        if (
          ("object" === i.type(arguments[0])
            ? ((o = arguments[0]), (l = arguments[1]), (n = "multiple"))
            : "string" === i.type(arguments[0]) &&
              ((o = arguments[0]),
              (s = arguments[1]),
              (l = arguments[2]),
              "responsive" === arguments[0] && "array" === i.type(arguments[1])
                ? (n = "responsive")
                : void 0 !== arguments[1] && (n = "single")),
          "single" === n)
        )
          r.options[o] = s;
        else if ("multiple" === n)
          i.each(o, function (i, e) {
            r.options[i] = e;
          });
        else if ("responsive" === n)
          for (t in s)
            if ("array" !== i.type(r.options.responsive))
              r.options.responsive = [s[t]];
            else {
              for (e = r.options.responsive.length - 1; e >= 0; )
                r.options.responsive[e].breakpoint === s[t].breakpoint &&
                  r.options.responsive.splice(e, 1),
                  e--;
              r.options.responsive.push(s[t]);
            }
        l && (r.unload(), r.reinit());
      }),
    (e.prototype.setPosition = function () {
      var i = this;
      i.setDimensions(),
        i.setHeight(),
        !1 === i.options.fade
          ? i.setCSS(i.getLeft(i.currentSlide))
          : i.setFade(),
        i.$slider.trigger("setPosition", [i]);
    }),
    (e.prototype.setProps = function () {
      var i = this,
        e = document.body.style;
      (i.positionProp = !0 === i.options.vertical ? "top" : "left"),
        "top" === i.positionProp
          ? i.$slider.addClass("slick-vertical")
          : i.$slider.removeClass("slick-vertical"),
        (void 0 === e.WebkitTransition &&
          void 0 === e.MozTransition &&
          void 0 === e.msTransition) ||
          (!0 === i.options.useCSS && (i.cssTransitions = !0)),
        i.options.fade &&
          ("number" == typeof i.options.zIndex
            ? i.options.zIndex < 3 && (i.options.zIndex = 3)
            : (i.options.zIndex = i.defaults.zIndex)),
        void 0 !== e.OTransform &&
          ((i.animType = "OTransform"),
          (i.transformType = "-o-transform"),
          (i.transitionType = "OTransition"),
          void 0 === e.perspectiveProperty &&
            void 0 === e.webkitPerspective &&
            (i.animType = !1)),
        void 0 !== e.MozTransform &&
          ((i.animType = "MozTransform"),
          (i.transformType = "-moz-transform"),
          (i.transitionType = "MozTransition"),
          void 0 === e.perspectiveProperty &&
            void 0 === e.MozPerspective &&
            (i.animType = !1)),
        void 0 !== e.webkitTransform &&
          ((i.animType = "webkitTransform"),
          (i.transformType = "-webkit-transform"),
          (i.transitionType = "webkitTransition"),
          void 0 === e.perspectiveProperty &&
            void 0 === e.webkitPerspective &&
            (i.animType = !1)),
        void 0 !== e.msTransform &&
          ((i.animType = "msTransform"),
          (i.transformType = "-ms-transform"),
          (i.transitionType = "msTransition"),
          void 0 === e.msTransform && (i.animType = !1)),
        void 0 !== e.transform &&
          !1 !== i.animType &&
          ((i.animType = "transform"),
          (i.transformType = "transform"),
          (i.transitionType = "transition")),
        (i.transformsEnabled =
          i.options.useTransform && null !== i.animType && !1 !== i.animType);
    }),
    (e.prototype.setSlideClasses = function (i) {
      var e,
        t,
        o,
        s,
        n = this;
      if (
        ((t = n.$slider
          .find(".slick-slide")
          .removeClass("slick-active slick-center slick-current")
          .attr("aria-hidden", "true")),
        n.$slides.eq(i).addClass("slick-current"),
        !0 === n.options.centerMode)
      ) {
        var r = n.options.slidesToShow % 2 == 0 ? 1 : 0;
        (e = Math.floor(n.options.slidesToShow / 2)),
          !0 === n.options.infinite &&
            (i >= e && i <= n.slideCount - 1 - e
              ? n.$slides
                  .slice(i - e + r, i + e + 1)
                  .addClass("slick-active")
                  .attr("aria-hidden", "false")
              : ((o = n.options.slidesToShow + i),
                t
                  .slice(o - e + 1 + r, o + e + 2)
                  .addClass("slick-active")
                  .attr("aria-hidden", "false")),
            0 === i
              ? t
                  .eq(t.length - 1 - n.options.slidesToShow)
                  .addClass("slick-center")
              : i === n.slideCount - 1 &&
                t.eq(n.options.slidesToShow).addClass("slick-center")),
          n.$slides.eq(i).addClass("slick-center");
      } else
        i >= 0 && i <= n.slideCount - n.options.slidesToShow
          ? n.$slides
              .slice(i, i + n.options.slidesToShow)
              .addClass("slick-active")
              .attr("aria-hidden", "false")
          : t.length <= n.options.slidesToShow
          ? t.addClass("slick-active").attr("aria-hidden", "false")
          : ((s = n.slideCount % n.options.slidesToShow),
            (o = !0 === n.options.infinite ? n.options.slidesToShow + i : i),
            n.options.slidesToShow == n.options.slidesToScroll &&
            n.slideCount - i < n.options.slidesToShow
              ? t
                  .slice(o - (n.options.slidesToShow - s), o + s)
                  .addClass("slick-active")
                  .attr("aria-hidden", "false")
              : t
                  .slice(o, o + n.options.slidesToShow)
                  .addClass("slick-active")
                  .attr("aria-hidden", "false"));
      ("ondemand" !== n.options.lazyLoad &&
        "anticipated" !== n.options.lazyLoad) ||
        n.lazyLoad();
    }),
    (e.prototype.setupInfinite = function () {
      var e,
        t,
        o,
        s = this;
      if (
        (!0 === s.options.fade && (s.options.centerMode = !1),
        !0 === s.options.infinite &&
          !1 === s.options.fade &&
          ((t = null), s.slideCount > s.options.slidesToShow))
      ) {
        for (
          o =
            !0 === s.options.centerMode
              ? s.options.slidesToShow + 1
              : s.options.slidesToShow,
            e = s.slideCount;
          e > s.slideCount - o;
          e -= 1
        )
          (t = e - 1),
            i(s.$slides[t])
              .clone(!0)
              .attr("id", "")
              .attr("data-slick-index", t - s.slideCount)
              .prependTo(s.$slideTrack)
              .addClass("slick-cloned");
        for (e = 0; e < o + s.slideCount; e += 1)
          (t = e),
            i(s.$slides[t])
              .clone(!0)
              .attr("id", "")
              .attr("data-slick-index", t + s.slideCount)
              .appendTo(s.$slideTrack)
              .addClass("slick-cloned");
        s.$slideTrack
          .find(".slick-cloned")
          .find("[id]")
          .each(function () {
            i(this).attr("id", "");
          });
      }
    }),
    (e.prototype.interrupt = function (i) {
      var e = this;
      i || e.autoPlay(), (e.interrupted = i);
    }),
    (e.prototype.selectHandler = function (e) {
      var t = this,
        o = i(e.target).is(".slick-slide")
          ? i(e.target)
          : i(e.target).parents(".slick-slide"),
        s = parseInt(o.attr("data-slick-index"));
      s || (s = 0),
        t.slideCount <= t.options.slidesToShow
          ? t.slideHandler(s, !1, !0)
          : t.slideHandler(s);
    }),
    (e.prototype.slideHandler = function (i, e, t) {
      var o,
        s,
        n,
        r,
        l,
        d = null,
        a = this;
      if (
        ((e = e || !1),
        !(
          (!0 === a.animating && !0 === a.options.waitForAnimate) ||
          (!0 === a.options.fade && a.currentSlide === i)
        ))
      )
        if (
          (!1 === e && a.asNavFor(i),
          (o = i),
          (d = a.getLeft(o)),
          (r = a.getLeft(a.currentSlide)),
          (a.currentLeft = null === a.swipeLeft ? r : a.swipeLeft),
          !1 === a.options.infinite &&
            !1 === a.options.centerMode &&
            (i < 0 || i > a.getDotCount() * a.options.slidesToScroll))
        )
          !1 === a.options.fade &&
            ((o = a.currentSlide),
            !0 !== t
              ? a.animateSlide(r, function () {
                  a.postSlide(o);
                })
              : a.postSlide(o));
        else if (
          !1 === a.options.infinite &&
          !0 === a.options.centerMode &&
          (i < 0 || i > a.slideCount - a.options.slidesToScroll)
        )
          !1 === a.options.fade &&
            ((o = a.currentSlide),
            !0 !== t
              ? a.animateSlide(r, function () {
                  a.postSlide(o);
                })
              : a.postSlide(o));
        else {
          if (
            (a.options.autoplay && clearInterval(a.autoPlayTimer),
            (s =
              o < 0
                ? a.slideCount % a.options.slidesToScroll != 0
                  ? a.slideCount - (a.slideCount % a.options.slidesToScroll)
                  : a.slideCount + o
                : o >= a.slideCount
                ? a.slideCount % a.options.slidesToScroll != 0
                  ? 0
                  : o - a.slideCount
                : o),
            (a.animating = !0),
            a.$slider.trigger("beforeChange", [a, a.currentSlide, s]),
            (n = a.currentSlide),
            (a.currentSlide = s),
            a.setSlideClasses(a.currentSlide),
            a.options.asNavFor &&
              (l = (l = a.getNavTarget()).slick("getSlick")).slideCount <=
                l.options.slidesToShow &&
              l.setSlideClasses(a.currentSlide),
            a.updateDots(),
            a.updateArrows(),
            !0 === a.options.fade)
          )
            return (
              !0 !== t
                ? (a.fadeSlideOut(n),
                  a.fadeSlide(s, function () {
                    a.postSlide(s);
                  }))
                : a.postSlide(s),
              void a.animateHeight()
            );
          !0 !== t
            ? a.animateSlide(d, function () {
                a.postSlide(s);
              })
            : a.postSlide(s);
        }
    }),
    (e.prototype.startLoad = function () {
      var i = this;
      !0 === i.options.arrows &&
        i.slideCount > i.options.slidesToShow &&
        (i.$prevArrow.hide(), i.$nextArrow.hide()),
        !0 === i.options.dots &&
          i.slideCount > i.options.slidesToShow &&
          i.$dots.hide(),
        i.$slider.addClass("slick-loading");
    }),
    (e.prototype.swipeDirection = function () {
      var i,
        e,
        t,
        o,
        s = this;
      return (
        (i = s.touchObject.startX - s.touchObject.curX),
        (e = s.touchObject.startY - s.touchObject.curY),
        (t = Math.atan2(e, i)),
        (o = Math.round((180 * t) / Math.PI)) < 0 && (o = 360 - Math.abs(o)),
        o <= 45 && o >= 0
          ? !1 === s.options.rtl
            ? "left"
            : "right"
          : o <= 360 && o >= 315
          ? !1 === s.options.rtl
            ? "left"
            : "right"
          : o >= 135 && o <= 225
          ? !1 === s.options.rtl
            ? "right"
            : "left"
          : !0 === s.options.verticalSwiping
          ? o >= 35 && o <= 135
            ? "down"
            : "up"
          : "vertical"
      );
    }),
    (e.prototype.swipeEnd = function (i) {
      var e,
        t,
        o = this;
      if (((o.dragging = !1), (o.swiping = !1), o.scrolling))
        return (o.scrolling = !1), !1;
      if (
        ((o.interrupted = !1),
        (o.shouldClick = !(o.touchObject.swipeLength > 10)),
        void 0 === o.touchObject.curX)
      )
        return !1;
      if (
        (!0 === o.touchObject.edgeHit &&
          o.$slider.trigger("edge", [o, o.swipeDirection()]),
        o.touchObject.swipeLength >= o.touchObject.minSwipe)
      ) {
        switch ((t = o.swipeDirection())) {
          case "left":
          case "down":
            (e = o.options.swipeToSlide
              ? o.checkNavigable(o.currentSlide + o.getSlideCount())
              : o.currentSlide + o.getSlideCount()),
              (o.currentDirection = 0);
            break;
          case "right":
          case "up":
            (e = o.options.swipeToSlide
              ? o.checkNavigable(o.currentSlide - o.getSlideCount())
              : o.currentSlide - o.getSlideCount()),
              (o.currentDirection = 1);
        }
        "vertical" != t &&
          (o.slideHandler(e),
          (o.touchObject = {}),
          o.$slider.trigger("swipe", [o, t]));
      } else
        o.touchObject.startX !== o.touchObject.curX &&
          (o.slideHandler(o.currentSlide), (o.touchObject = {}));
    }),
    (e.prototype.swipeHandler = function (i) {
      var e = this;
      if (
        !(
          !1 === e.options.swipe ||
          ("ontouchend" in document && !1 === e.options.swipe) ||
          (!1 === e.options.draggable && -1 !== i.type.indexOf("mouse"))
        )
      )
        switch (
          ((e.touchObject.fingerCount =
            i.originalEvent && void 0 !== i.originalEvent.touches
              ? i.originalEvent.touches.length
              : 1),
          (e.touchObject.minSwipe = e.listWidth / e.options.touchThreshold),
          !0 === e.options.verticalSwiping &&
            (e.touchObject.minSwipe = e.listHeight / e.options.touchThreshold),
          i.data.action)
        ) {
          case "start":
            e.swipeStart(i);
            break;
          case "move":
            e.swipeMove(i);
            break;
          case "end":
            e.swipeEnd(i);
        }
    }),
    (e.prototype.swipeMove = function (i) {
      var e,
        t,
        o,
        s,
        n,
        r,
        l = this;
      return (
        (n = void 0 !== i.originalEvent ? i.originalEvent.touches : null),
        !(!l.dragging || l.scrolling || (n && 1 !== n.length)) &&
          ((e = l.getLeft(l.currentSlide)),
          (l.touchObject.curX = void 0 !== n ? n[0].pageX : i.clientX),
          (l.touchObject.curY = void 0 !== n ? n[0].pageY : i.clientY),
          (l.touchObject.swipeLength = Math.round(
            Math.sqrt(Math.pow(l.touchObject.curX - l.touchObject.startX, 2))
          )),
          (r = Math.round(
            Math.sqrt(Math.pow(l.touchObject.curY - l.touchObject.startY, 2))
          )),
          !l.options.verticalSwiping && !l.swiping && r > 4
            ? ((l.scrolling = !0), !1)
            : (!0 === l.options.verticalSwiping &&
                (l.touchObject.swipeLength = r),
              (t = l.swipeDirection()),
              void 0 !== i.originalEvent &&
                l.touchObject.swipeLength > 4 &&
                ((l.swiping = !0), i.preventDefault()),
              (s =
                (!1 === l.options.rtl ? 1 : -1) *
                (l.touchObject.curX > l.touchObject.startX ? 1 : -1)),
              !0 === l.options.verticalSwiping &&
                (s = l.touchObject.curY > l.touchObject.startY ? 1 : -1),
              (o = l.touchObject.swipeLength),
              (l.touchObject.edgeHit = !1),
              !1 === l.options.infinite &&
                ((0 === l.currentSlide && "right" === t) ||
                  (l.currentSlide >= l.getDotCount() && "left" === t)) &&
                ((o = l.touchObject.swipeLength * l.options.edgeFriction),
                (l.touchObject.edgeHit = !0)),
              !1 === l.options.vertical
                ? (l.swipeLeft = e + o * s)
                : (l.swipeLeft = e + o * (l.$list.height() / l.listWidth) * s),
              !0 === l.options.verticalSwiping && (l.swipeLeft = e + o * s),
              !0 !== l.options.fade &&
                !1 !== l.options.touchMove &&
                (!0 === l.animating
                  ? ((l.swipeLeft = null), !1)
                  : void l.setCSS(l.swipeLeft))))
      );
    }),
    (e.prototype.swipeStart = function (i) {
      var e,
        t = this;
      if (
        ((t.interrupted = !0),
        1 !== t.touchObject.fingerCount ||
          t.slideCount <= t.options.slidesToShow)
      )
        return (t.touchObject = {}), !1;
      void 0 !== i.originalEvent &&
        void 0 !== i.originalEvent.touches &&
        (e = i.originalEvent.touches[0]),
        (t.touchObject.startX = t.touchObject.curX =
          void 0 !== e ? e.pageX : i.clientX),
        (t.touchObject.startY = t.touchObject.curY =
          void 0 !== e ? e.pageY : i.clientY),
        (t.dragging = !0);
    }),
    (e.prototype.unfilterSlides = e.prototype.slickUnfilter =
      function () {
        var i = this;
        null !== i.$slidesCache &&
          (i.unload(),
          i.$slideTrack.children(this.options.slide).detach(),
          i.$slidesCache.appendTo(i.$slideTrack),
          i.reinit());
      }),
    (e.prototype.unload = function () {
      var e = this;
      i(".slick-cloned", e.$slider).remove(),
        e.$dots && e.$dots.remove(),
        e.$prevArrow &&
          e.htmlExpr.test(e.options.prevArrow) &&
          e.$prevArrow.remove(),
        e.$nextArrow &&
          e.htmlExpr.test(e.options.nextArrow) &&
          e.$nextArrow.remove(),
        e.$slides
          .removeClass("slick-slide slick-active slick-visible slick-current")
          .attr("aria-hidden", "true")
          .css("width", "");
    }),
    (e.prototype.unslick = function (i) {
      var e = this;
      e.$slider.trigger("unslick", [e, i]), e.destroy();
    }),
    (e.prototype.updateArrows = function () {
      var i = this;
      Math.floor(i.options.slidesToShow / 2),
        !0 === i.options.arrows &&
          i.slideCount > i.options.slidesToShow &&
          !i.options.infinite &&
          (i.$prevArrow
            .removeClass("slick-disabled")
            .attr("aria-disabled", "false"),
          i.$nextArrow
            .removeClass("slick-disabled")
            .attr("aria-disabled", "false"),
          0 === i.currentSlide
            ? (i.$prevArrow
                .addClass("slick-disabled")
                .attr("aria-disabled", "true"),
              i.$nextArrow
                .removeClass("slick-disabled")
                .attr("aria-disabled", "false"))
            : i.currentSlide >= i.slideCount - i.options.slidesToShow &&
              !1 === i.options.centerMode
            ? (i.$nextArrow
                .addClass("slick-disabled")
                .attr("aria-disabled", "true"),
              i.$prevArrow
                .removeClass("slick-disabled")
                .attr("aria-disabled", "false"))
            : i.currentSlide >= i.slideCount - 1 &&
              !0 === i.options.centerMode &&
              (i.$nextArrow
                .addClass("slick-disabled")
                .attr("aria-disabled", "true"),
              i.$prevArrow
                .removeClass("slick-disabled")
                .attr("aria-disabled", "false")));
    }),
    (e.prototype.updateDots = function () {
      var i = this;
      null !== i.$dots &&
        (i.$dots.find("li").removeClass("slick-active").end(),
        i.$dots
          .find("li")
          .eq(Math.floor(i.currentSlide / i.options.slidesToScroll))
          .addClass("slick-active"));
    }),
    (e.prototype.visibility = function () {
      var i = this;
      i.options.autoplay &&
        (document[i.hidden] ? (i.interrupted = !0) : (i.interrupted = !1));
    }),
    (i.fn.slick = function () {
      var i,
        t,
        o = this,
        s = arguments[0],
        n = Array.prototype.slice.call(arguments, 1),
        r = o.length;
      for (i = 0; i < r; i++)
        if (
          ("object" == typeof s || void 0 === s
            ? (o[i].slick = new e(o[i], s))
            : (t = o[i].slick[s].apply(o[i].slick, n)),
          void 0 !== t)
        )
          return t;
      return o;
    });
});

/* PrismJS 1.20.0
 * https://prismjs.com/download.html#themes=prism&languages=markup+css+clike+javascript+markup-templating+php
 */
var _self =
    "undefined" != typeof window
      ? window
      : "undefined" != typeof WorkerGlobalScope &&
        self instanceof WorkerGlobalScope
      ? self
      : {},
  Prism = (function (u) {
    var c = /\blang(?:uage)?-([\w-]+)\b/i,
      n = 0,
      C = {
        manual: u.Prism && u.Prism.manual,
        disableWorkerMessageHandler:
          u.Prism && u.Prism.disableWorkerMessageHandler,
        util: {
          encode: function e(n) {
            return n instanceof _
              ? new _(n.type, e(n.content), n.alias)
              : Array.isArray(n)
              ? n.map(e)
              : n
                  .replace(/&/g, "&amp;")
                  .replace(/</g, "&lt;")
                  .replace(/\u00a0/g, " ");
          },
          type: function (e) {
            return Object.prototype.toString.call(e).slice(8, -1);
          },
          objId: function (e) {
            return (
              e.__id || Object.defineProperty(e, "__id", { value: ++n }), e.__id
            );
          },
          clone: function t(e, r) {
            var a,
              n,
              l = C.util.type(e);
            switch (((r = r || {}), l)) {
              case "Object":
                if (((n = C.util.objId(e)), r[n])) return r[n];
                for (var i in ((a = {}), (r[n] = a), e))
                  e.hasOwnProperty(i) && (a[i] = t(e[i], r));
                return a;
              case "Array":
                return (
                  (n = C.util.objId(e)),
                  r[n]
                    ? r[n]
                    : ((a = []),
                      (r[n] = a),
                      e.forEach(function (e, n) {
                        a[n] = t(e, r);
                      }),
                      a)
                );
              default:
                return e;
            }
          },
          getLanguage: function (e) {
            for (; e && !c.test(e.className); ) e = e.parentElement;
            return e
              ? (e.className.match(c) || [, "none"])[1].toLowerCase()
              : "none";
          },
          currentScript: function () {
            if ("undefined" == typeof document) return null;
            if ("currentScript" in document) return document.currentScript;
            try {
              throw new Error();
            } catch (e) {
              var n = (/at [^(\r\n]*\((.*):.+:.+\)$/i.exec(e.stack) || [])[1];
              if (n) {
                var t = document.getElementsByTagName("script");
                for (var r in t) if (t[r].src == n) return t[r];
              }
              return null;
            }
          },
        },
        languages: {
          extend: function (e, n) {
            var t = C.util.clone(C.languages[e]);
            for (var r in n) t[r] = n[r];
            return t;
          },
          insertBefore: function (t, e, n, r) {
            var a = (r = r || C.languages)[t],
              l = {};
            for (var i in a)
              if (a.hasOwnProperty(i)) {
                if (i == e)
                  for (var o in n) n.hasOwnProperty(o) && (l[o] = n[o]);
                n.hasOwnProperty(i) || (l[i] = a[i]);
              }
            var s = r[t];
            return (
              (r[t] = l),
              C.languages.DFS(C.languages, function (e, n) {
                n === s && e != t && (this[e] = l);
              }),
              l
            );
          },
          DFS: function e(n, t, r, a) {
            a = a || {};
            var l = C.util.objId;
            for (var i in n)
              if (n.hasOwnProperty(i)) {
                t.call(n, i, n[i], r || i);
                var o = n[i],
                  s = C.util.type(o);
                "Object" !== s || a[l(o)]
                  ? "Array" !== s || a[l(o)] || ((a[l(o)] = !0), e(o, t, i, a))
                  : ((a[l(o)] = !0), e(o, t, null, a));
              }
          },
        },
        plugins: {},
        highlightAll: function (e, n) {
          C.highlightAllUnder(document, e, n);
        },
        highlightAllUnder: function (e, n, t) {
          var r = {
            callback: t,
            container: e,
            selector:
              'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code',
          };
          C.hooks.run("before-highlightall", r),
            (r.elements = Array.prototype.slice.apply(
              r.container.querySelectorAll(r.selector)
            )),
            C.hooks.run("before-all-elements-highlight", r);
          for (var a, l = 0; (a = r.elements[l++]); )
            C.highlightElement(a, !0 === n, r.callback);
        },
        highlightElement: function (e, n, t) {
          var r = C.util.getLanguage(e),
            a = C.languages[r];
          e.className =
            e.className.replace(c, "").replace(/\s+/g, " ") + " language-" + r;
          var l = e.parentNode;
          l &&
            "pre" === l.nodeName.toLowerCase() &&
            (l.className =
              l.className.replace(c, "").replace(/\s+/g, " ") +
              " language-" +
              r);
          var i = { element: e, language: r, grammar: a, code: e.textContent };
          function o(e) {
            (i.highlightedCode = e),
              C.hooks.run("before-insert", i),
              (i.element.innerHTML = i.highlightedCode),
              C.hooks.run("after-highlight", i),
              C.hooks.run("complete", i),
              t && t.call(i.element);
          }
          if ((C.hooks.run("before-sanity-check", i), !i.code))
            return C.hooks.run("complete", i), void (t && t.call(i.element));
          if ((C.hooks.run("before-highlight", i), i.grammar))
            if (n && u.Worker) {
              var s = new Worker(C.filename);
              (s.onmessage = function (e) {
                o(e.data);
              }),
                s.postMessage(
                  JSON.stringify({
                    language: i.language,
                    code: i.code,
                    immediateClose: !0,
                  })
                );
            } else o(C.highlight(i.code, i.grammar, i.language));
          else o(C.util.encode(i.code));
        },
        highlight: function (e, n, t) {
          var r = { code: e, grammar: n, language: t };
          return (
            C.hooks.run("before-tokenize", r),
            (r.tokens = C.tokenize(r.code, r.grammar)),
            C.hooks.run("after-tokenize", r),
            _.stringify(C.util.encode(r.tokens), r.language)
          );
        },
        tokenize: function (e, n) {
          var t = n.rest;
          if (t) {
            for (var r in t) n[r] = t[r];
            delete n.rest;
          }
          var a = new l();
          return (
            M(a, a.head, e),
            (function e(n, t, r, a, l, i, o) {
              for (var s in r)
                if (r.hasOwnProperty(s) && r[s]) {
                  var u = r[s];
                  u = Array.isArray(u) ? u : [u];
                  for (var c = 0; c < u.length; ++c) {
                    if (o && o == s + "," + c) return;
                    var g = u[c],
                      f = g.inside,
                      h = !!g.lookbehind,
                      d = !!g.greedy,
                      v = 0,
                      p = g.alias;
                    if (d && !g.pattern.global) {
                      var m = g.pattern.toString().match(/[imsuy]*$/)[0];
                      g.pattern = RegExp(g.pattern.source, m + "g");
                    }
                    g = g.pattern || g;
                    for (
                      var y = a.next, k = l;
                      y !== t.tail;
                      k += y.value.length, y = y.next
                    ) {
                      var b = y.value;
                      if (t.length > n.length) return;
                      if (!(b instanceof _)) {
                        var x = 1;
                        if (d && y != t.tail.prev) {
                          g.lastIndex = k;
                          var w = g.exec(n);
                          if (!w) break;
                          var A = w.index + (h && w[1] ? w[1].length : 0),
                            P = w.index + w[0].length,
                            S = k;
                          for (S += y.value.length; S <= A; )
                            (y = y.next), (S += y.value.length);
                          if (
                            ((S -= y.value.length),
                            (k = S),
                            y.value instanceof _)
                          )
                            continue;
                          for (
                            var O = y;
                            O !== t.tail &&
                            (S < P ||
                              ("string" == typeof O.value &&
                                !O.prev.value.greedy));
                            O = O.next
                          )
                            x++, (S += O.value.length);
                          x--, (b = n.slice(k, S)), (w.index -= k);
                        } else {
                          g.lastIndex = 0;
                          var w = g.exec(b);
                        }
                        if (w) {
                          h && (v = w[1] ? w[1].length : 0);
                          var A = w.index + v,
                            w = w[0].slice(v),
                            P = A + w.length,
                            E = b.slice(0, A),
                            N = b.slice(P),
                            j = y.prev;
                          E && ((j = M(t, j, E)), (k += E.length)), W(t, j, x);
                          var L = new _(s, f ? C.tokenize(w, f) : w, p, w, d);
                          if (
                            ((y = M(t, j, L)),
                            N && M(t, y, N),
                            1 < x && e(n, t, r, y.prev, k, !0, s + "," + c),
                            i)
                          )
                            break;
                        } else if (i) break;
                      }
                    }
                  }
                }
            })(e, a, n, a.head, 0),
            (function (e) {
              var n = [],
                t = e.head.next;
              for (; t !== e.tail; ) n.push(t.value), (t = t.next);
              return n;
            })(a)
          );
        },
        hooks: {
          all: {},
          add: function (e, n) {
            var t = C.hooks.all;
            (t[e] = t[e] || []), t[e].push(n);
          },
          run: function (e, n) {
            var t = C.hooks.all[e];
            if (t && t.length) for (var r, a = 0; (r = t[a++]); ) r(n);
          },
        },
        Token: _,
      };
    function _(e, n, t, r, a) {
      (this.type = e),
        (this.content = n),
        (this.alias = t),
        (this.length = 0 | (r || "").length),
        (this.greedy = !!a);
    }
    function l() {
      var e = { value: null, prev: null, next: null },
        n = { value: null, prev: e, next: null };
      (e.next = n), (this.head = e), (this.tail = n), (this.length = 0);
    }
    function M(e, n, t) {
      var r = n.next,
        a = { value: t, prev: n, next: r };
      return (n.next = a), (r.prev = a), e.length++, a;
    }
    function W(e, n, t) {
      for (var r = n.next, a = 0; a < t && r !== e.tail; a++) r = r.next;
      ((n.next = r).prev = n), (e.length -= a);
    }
    if (
      ((u.Prism = C),
      (_.stringify = function n(e, t) {
        if ("string" == typeof e) return e;
        if (Array.isArray(e)) {
          var r = "";
          return (
            e.forEach(function (e) {
              r += n(e, t);
            }),
            r
          );
        }
        var a = {
            type: e.type,
            content: n(e.content, t),
            tag: "span",
            classes: ["token", e.type],
            attributes: {},
            language: t,
          },
          l = e.alias;
        l &&
          (Array.isArray(l)
            ? Array.prototype.push.apply(a.classes, l)
            : a.classes.push(l)),
          C.hooks.run("wrap", a);
        var i = "";
        for (var o in a.attributes)
          i +=
            " " +
            o +
            '="' +
            (a.attributes[o] || "").replace(/"/g, "&quot;") +
            '"';
        return (
          "<" +
          a.tag +
          ' class="' +
          a.classes.join(" ") +
          '"' +
          i +
          ">" +
          a.content +
          "</" +
          a.tag +
          ">"
        );
      }),
      !u.document)
    )
      return (
        u.addEventListener &&
          (C.disableWorkerMessageHandler ||
            u.addEventListener(
              "message",
              function (e) {
                var n = JSON.parse(e.data),
                  t = n.language,
                  r = n.code,
                  a = n.immediateClose;
                u.postMessage(C.highlight(r, C.languages[t], t)),
                  a && u.close();
              },
              !1
            )),
        C
      );
    var e = C.util.currentScript();
    function t() {
      C.manual || C.highlightAll();
    }
    if (
      (e &&
        ((C.filename = e.src),
        e.hasAttribute("data-manual") && (C.manual = !0)),
      !C.manual)
    ) {
      var r = document.readyState;
      "loading" === r || ("interactive" === r && e && e.defer)
        ? document.addEventListener("DOMContentLoaded", t)
        : window.requestAnimationFrame
        ? window.requestAnimationFrame(t)
        : window.setTimeout(t, 16);
    }
    return C;
  })(_self);
"undefined" != typeof module && module.exports && (module.exports = Prism),
  "undefined" != typeof global && (global.Prism = Prism);
(Prism.languages.markup = {
  comment: /<!--[\s\S]*?-->/,
  prolog: /<\?[\s\S]+?\?>/,
  doctype: {
    pattern:
      /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
    greedy: !0,
    inside: {
      "internal-subset": {
        pattern: /(\[)[\s\S]+(?=\]>$)/,
        lookbehind: !0,
        greedy: !0,
        inside: null,
      },
      string: { pattern: /"[^"]*"|'[^']*'/, greedy: !0 },
      punctuation: /^<!|>$|[[\]]/,
      "doctype-tag": /^DOCTYPE/,
      name: /[^\s<>'"]+/,
    },
  },
  cdata: /<!\[CDATA\[[\s\S]*?]]>/i,
  tag: {
    pattern:
      /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
    greedy: !0,
    inside: {
      tag: {
        pattern: /^<\/?[^\s>\/]+/,
        inside: { punctuation: /^<\/?/, namespace: /^[^\s>\/:]+:/ },
      },
      "attr-value": {
        pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
        inside: {
          punctuation: [{ pattern: /^=/, alias: "attr-equals" }, /"|'/],
        },
      },
      punctuation: /\/?>/,
      "attr-name": {
        pattern: /[^\s>\/]+/,
        inside: { namespace: /^[^\s>\/:]+:/ },
      },
    },
  },
  entity: [
    { pattern: /&[\da-z]{1,8};/i, alias: "named-entity" },
    /&#x?[\da-f]{1,8};/i,
  ],
}),
  (Prism.languages.markup.tag.inside["attr-value"].inside.entity =
    Prism.languages.markup.entity),
  (Prism.languages.markup.doctype.inside["internal-subset"].inside =
    Prism.languages.markup),
  Prism.hooks.add("wrap", function (a) {
    "entity" === a.type &&
      (a.attributes.title = a.content.replace(/&amp;/, "&"));
  }),
  Object.defineProperty(Prism.languages.markup.tag, "addInlined", {
    value: function (a, e) {
      var s = {};
      (s["language-" + e] = {
        pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
        lookbehind: !0,
        inside: Prism.languages[e],
      }),
        (s.cdata = /^<!\[CDATA\[|\]\]>$/i);
      var n = {
        "included-cdata": { pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i, inside: s },
      };
      n["language-" + e] = { pattern: /[\s\S]+/, inside: Prism.languages[e] };
      var t = {};
      (t[a] = {
        pattern: RegExp(
          "(<__[^]*?>)(?:<!\\[CDATA\\[(?:[^\\]]|\\](?!\\]>))*\\]\\]>|(?!<!\\[CDATA\\[)[^])*?(?=</__>)".replace(
            /__/g,
            function () {
              return a;
            }
          ),
          "i"
        ),
        lookbehind: !0,
        greedy: !0,
        inside: n,
      }),
        Prism.languages.insertBefore("markup", "cdata", t);
    },
  }),
  (Prism.languages.html = Prism.languages.markup),
  (Prism.languages.mathml = Prism.languages.markup),
  (Prism.languages.svg = Prism.languages.markup),
  (Prism.languages.xml = Prism.languages.extend("markup", {})),
  (Prism.languages.ssml = Prism.languages.xml),
  (Prism.languages.atom = Prism.languages.xml),
  (Prism.languages.rss = Prism.languages.xml);
!(function (s) {
  var e = /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/;
  (s.languages.css = {
    comment: /\/\*[\s\S]*?\*\//,
    atrule: {
      pattern: /@[\w-]+[\s\S]*?(?:;|(?=\s*\{))/,
      inside: {
        rule: /^@[\w-]+/,
        "selector-function-argument": {
          pattern:
            /(\bselector\s*\((?!\s*\))\s*)(?:[^()]|\((?:[^()]|\([^()]*\))*\))+?(?=\s*\))/,
          lookbehind: !0,
          alias: "selector",
        },
      },
    },
    url: {
      pattern: RegExp("url\\((?:" + e.source + "|[^\n\r()]*)\\)", "i"),
      greedy: !0,
      inside: { function: /^url/i, punctuation: /^\(|\)$/ },
    },
    selector: RegExp("[^{}\\s](?:[^{};\"']|" + e.source + ")*?(?=\\s*\\{)"),
    string: { pattern: e, greedy: !0 },
    property: /[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*(?=\s*:)/i,
    important: /!important\b/i,
    function: /[-a-z0-9]+(?=\()/i,
    punctuation: /[(){};:,]/,
  }),
    (s.languages.css.atrule.inside.rest = s.languages.css);
  var t = s.languages.markup;
  t &&
    (t.tag.addInlined("style", "css"),
    s.languages.insertBefore(
      "inside",
      "attr-value",
      {
        "style-attr": {
          pattern: /\s*style=("|')(?:\\[\s\S]|(?!\1)[^\\])*\1/i,
          inside: {
            "attr-name": { pattern: /^\s*style/i, inside: t.tag.inside },
            punctuation: /^\s*=\s*['"]|['"]\s*$/,
            "attr-value": { pattern: /.+/i, inside: s.languages.css },
          },
          alias: "language-css",
        },
      },
      t.tag
    ));
})(Prism);
Prism.languages.clike = {
  comment: [
    { pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/, lookbehind: !0 },
    { pattern: /(^|[^\\:])\/\/.*/, lookbehind: !0, greedy: !0 },
  ],
  string: {
    pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
    greedy: !0,
  },
  "class-name": {
    pattern:
      /(\b(?:class|interface|extends|implements|trait|instanceof|new)\s+|\bcatch\s+\()[\w.\\]+/i,
    lookbehind: !0,
    inside: { punctuation: /[.\\]/ },
  },
  keyword:
    /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
  boolean: /\b(?:true|false)\b/,
  function: /\w+(?=\()/,
  number: /\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i,
  operator: /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
  punctuation: /[{}[\];(),.:]/,
};
(Prism.languages.javascript = Prism.languages.extend("clike", {
  "class-name": [
    Prism.languages.clike["class-name"],
    {
      pattern:
        /(^|[^$\w\xA0-\uFFFF])[_$A-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\.(?:prototype|constructor))/,
      lookbehind: !0,
    },
  ],
  keyword: [
    { pattern: /((?:^|})\s*)(?:catch|finally)\b/, lookbehind: !0 },
    {
      pattern:
        /(^|[^.]|\.\.\.\s*)\b(?:as|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
      lookbehind: !0,
    },
  ],
  number:
    /\b(?:(?:0[xX](?:[\dA-Fa-f](?:_[\dA-Fa-f])?)+|0[bB](?:[01](?:_[01])?)+|0[oO](?:[0-7](?:_[0-7])?)+)n?|(?:\d(?:_\d)?)+n|NaN|Infinity)\b|(?:\b(?:\d(?:_\d)?)+\.?(?:\d(?:_\d)?)*|\B\.(?:\d(?:_\d)?)+)(?:[Ee][+-]?(?:\d(?:_\d)?)+)?/,
  function:
    /#?[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
  operator:
    /--|\+\+|\*\*=?|=>|&&|\|\||[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?[.?]?|[~:]/,
})),
  (Prism.languages.javascript["class-name"][0].pattern =
    /(\b(?:class|interface|extends|implements|instanceof|new)\s+)[\w.\\]+/),
  Prism.languages.insertBefore("javascript", "keyword", {
    regex: {
      pattern:
        /((?:^|[^$\w\xA0-\uFFFF."'\])\s])\s*)\/(?:\[(?:[^\]\\\r\n]|\\.)*]|\\.|[^/\\\[\r\n])+\/[gimyus]{0,6}(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/,
      lookbehind: !0,
      greedy: !0,
    },
    "function-variable": {
      pattern:
        /#?[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/,
      alias: "function",
    },
    parameter: [
      {
        pattern:
          /(function(?:\s+[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)?\s*\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\))/,
        lookbehind: !0,
        inside: Prism.languages.javascript,
      },
      {
        pattern: /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*=>)/i,
        inside: Prism.languages.javascript,
      },
      {
        pattern: /(\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*=>)/,
        lookbehind: !0,
        inside: Prism.languages.javascript,
      },
      {
        pattern:
          /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*\s*)\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*\{)/,
        lookbehind: !0,
        inside: Prism.languages.javascript,
      },
    ],
    constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/,
  }),
  Prism.languages.insertBefore("javascript", "string", {
    "template-string": {
      pattern:
        /`(?:\\[\s\S]|\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}|(?!\${)[^\\`])*`/,
      greedy: !0,
      inside: {
        "template-punctuation": { pattern: /^`|`$/, alias: "string" },
        interpolation: {
          pattern: /((?:^|[^\\])(?:\\{2})*)\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}/,
          lookbehind: !0,
          inside: {
            "interpolation-punctuation": {
              pattern: /^\${|}$/,
              alias: "punctuation",
            },
            rest: Prism.languages.javascript,
          },
        },
        string: /[\s\S]+/,
      },
    },
  }),
  Prism.languages.markup &&
    Prism.languages.markup.tag.addInlined("script", "javascript"),
  (Prism.languages.js = Prism.languages.javascript);
!(function (h) {
  function v(e, n) {
    return "___" + e.toUpperCase() + n + "___";
  }
  Object.defineProperties((h.languages["markup-templating"] = {}), {
    buildPlaceholders: {
      value: function (a, r, e, o) {
        if (a.language === r) {
          var c = (a.tokenStack = []);
          (a.code = a.code.replace(e, function (e) {
            if ("function" == typeof o && !o(e)) return e;
            for (var n, t = c.length; -1 !== a.code.indexOf((n = v(r, t))); )
              ++t;
            return (c[t] = e), n;
          })),
            (a.grammar = h.languages.markup);
        }
      },
    },
    tokenizePlaceholders: {
      value: function (p, k) {
        if (p.language === k && p.tokenStack) {
          p.grammar = h.languages[k];
          var m = 0,
            d = Object.keys(p.tokenStack);
          !(function e(n) {
            for (var t = 0; t < n.length && !(m >= d.length); t++) {
              var a = n[t];
              if (
                "string" == typeof a ||
                (a.content && "string" == typeof a.content)
              ) {
                var r = d[m],
                  o = p.tokenStack[r],
                  c = "string" == typeof a ? a : a.content,
                  i = v(k, r),
                  u = c.indexOf(i);
                if (-1 < u) {
                  ++m;
                  var g = c.substring(0, u),
                    l = new h.Token(
                      k,
                      h.tokenize(o, p.grammar),
                      "language-" + k,
                      o
                    ),
                    s = c.substring(u + i.length),
                    f = [];
                  g && f.push.apply(f, e([g])),
                    f.push(l),
                    s && f.push.apply(f, e([s])),
                    "string" == typeof a
                      ? n.splice.apply(n, [t, 1].concat(f))
                      : (a.content = f);
                }
              } else a.content && e(a.content);
            }
            return n;
          })(p.tokens);
        }
      },
    },
  });
})(Prism);
!(function (n) {
  (n.languages.php = n.languages.extend("clike", {
    keyword:
      /\b(?:__halt_compiler|abstract|and|array|as|break|callable|case|catch|class|clone|const|continue|declare|default|die|do|echo|else|elseif|empty|enddeclare|endfor|endforeach|endif|endswitch|endwhile|eval|exit|extends|final|finally|for|foreach|function|global|goto|if|implements|include|include_once|instanceof|insteadof|interface|isset|list|namespace|new|or|parent|print|private|protected|public|require|require_once|return|static|switch|throw|trait|try|unset|use|var|while|xor|yield)\b/i,
    boolean: { pattern: /\b(?:false|true)\b/i, alias: "constant" },
    constant: [/\b[A-Z_][A-Z0-9_]*\b/, /\b(?:null)\b/i],
    comment: {
      pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|\/\/.*)/,
      lookbehind: !0,
    },
  })),
    n.languages.insertBefore("php", "string", {
      "shell-comment": {
        pattern: /(^|[^\\])#.*/,
        lookbehind: !0,
        alias: "comment",
      },
    }),
    n.languages.insertBefore("php", "comment", {
      delimiter: { pattern: /\?>$|^<\?(?:php(?=\s)|=)?/i, alias: "important" },
    }),
    n.languages.insertBefore("php", "keyword", {
      variable: /\$+(?:\w+\b|(?={))/i,
      package: {
        pattern: /(\\|namespace\s+|use\s+)[\w\\]+/,
        lookbehind: !0,
        inside: { punctuation: /\\/ },
      },
    }),
    n.languages.insertBefore("php", "operator", {
      property: { pattern: /(->)[\w]+/, lookbehind: !0 },
    });
  var e = {
    pattern:
      /{\$(?:{(?:{[^{}]+}|[^{}]+)}|[^{}])+}|(^|[^\\{])\$+(?:\w+(?:\[[^\r\n\[\]]+\]|->\w+)*)/,
    lookbehind: !0,
    inside: n.languages.php,
  };
  n.languages.insertBefore("php", "string", {
    "nowdoc-string": {
      pattern: /<<<'([^']+)'[\r\n](?:.*[\r\n])*?\1;/,
      greedy: !0,
      alias: "string",
      inside: {
        delimiter: {
          pattern: /^<<<'[^']+'|[a-z_]\w*;$/i,
          alias: "symbol",
          inside: { punctuation: /^<<<'?|[';]$/ },
        },
      },
    },
    "heredoc-string": {
      pattern:
        /<<<(?:"([^"]+)"[\r\n](?:.*[\r\n])*?\1;|([a-z_]\w*)[\r\n](?:.*[\r\n])*?\2;)/i,
      greedy: !0,
      alias: "string",
      inside: {
        delimiter: {
          pattern: /^<<<(?:"[^"]+"|[a-z_]\w*)|[a-z_]\w*;$/i,
          alias: "symbol",
          inside: { punctuation: /^<<<"?|[";]$/ },
        },
        interpolation: e,
      },
    },
    "single-quoted-string": {
      pattern: /'(?:\\[\s\S]|[^\\'])*'/,
      greedy: !0,
      alias: "string",
    },
    "double-quoted-string": {
      pattern: /"(?:\\[\s\S]|[^\\"])*"/,
      greedy: !0,
      alias: "string",
      inside: { interpolation: e },
    },
  }),
    delete n.languages.php.string,
    n.hooks.add("before-tokenize", function (e) {
      if (/<\?/.test(e.code)) {
        n.languages["markup-templating"].buildPlaceholders(
          e,
          "php",
          /<\?(?:[^"'/#]|\/(?![*/])|("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|(?:\/\/|#)(?:[^?\n\r]|\?(?!>))*(?=$|\?>|[\r\n])|\/\*[\s\S]*?(?:\*\/|$))*?(?:\?>|$)/gi
        );
      }
    }),
    n.hooks.add("after-tokenize", function (e) {
      n.languages["markup-templating"].tokenizePlaceholders(e, "php");
    });
})(Prism);

/**
 * Basic Lightbox
 * v. 5.0.3
 * https://basiclightbox.electerious.com/
 *
 */
!(function (e) {
  if ("object" == typeof exports && "undefined" != typeof module)
    module.exports = e();
  else if ("function" == typeof define && define.amd) define([], e);
  else {
    ("undefined" != typeof window
      ? window
      : "undefined" != typeof global
      ? global
      : "undefined" != typeof self
      ? self
      : this
    ).basicLightbox = e();
  }
})(function () {
  return (function e(n, t, o) {
    function r(c, u) {
      if (!t[c]) {
        if (!n[c]) {
          var s = "function" == typeof require && require;
          if (!u && s) return s(c, !0);
          if (i) return i(c, !0);
          var a = new Error("Cannot find module '" + c + "'");
          throw ((a.code = "MODULE_NOT_FOUND"), a);
        }
        var l = (t[c] = { exports: {} });
        n[c][0].call(
          l.exports,
          function (e) {
            return r(n[c][1][e] || e);
          },
          l,
          l.exports,
          e,
          n,
          t,
          o
        );
      }
      return t[c].exports;
    }
    for (
      var i = "function" == typeof require && require, c = 0;
      c < o.length;
      c++
    )
      r(o[c]);
    return r;
  })(
    {
      1: [
        function (e, n, t) {
          "use strict";
          Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.create = t.visible = void 0);
          var o = function (e) {
              var n =
                  arguments.length > 1 &&
                  void 0 !== arguments[1] &&
                  arguments[1],
                t = document.createElement("div");
              return (
                (t.innerHTML = e.trim()), !0 === n ? t.children : t.firstChild
              );
            },
            r = function (e, n) {
              var t = e.children;
              return 1 === t.length && t[0].tagName === n;
            },
            i = function (e) {
              return (
                null != (e = e || document.querySelector(".basicLightbox")) &&
                !0 === e.ownerDocument.body.contains(e)
              );
            };
          t.visible = i;
          t.create = function (e, n) {
            var t = (function (e, n) {
                var t = o(
                    '\n\t\t<div class="basicLightbox '.concat(
                      n.className,
                      '">\n\t\t\t<div class="basicLightbox__placeholder" role="dialog"></div>\n\t\t</div>\n\t'
                    )
                  ),
                  i = t.querySelector(".basicLightbox__placeholder");
                e.forEach(function (e) {
                  return i.appendChild(e);
                });
                var c = r(i, "IMG"),
                  u = r(i, "VIDEO"),
                  s = r(i, "IFRAME");
                return (
                  !0 === c && t.classList.add("basicLightbox--img"),
                  !0 === u && t.classList.add("basicLightbox--video"),
                  !0 === s && t.classList.add("basicLightbox--iframe"),
                  t
                );
              })(
                (e = (function (e) {
                  var n = "string" == typeof e,
                    t = e instanceof HTMLElement == !0;
                  if (!1 === n && !1 === t)
                    throw new Error(
                      "Content must be a DOM element/node or string"
                    );
                  return !0 === n
                    ? Array.from(o(e, !0))
                    : "TEMPLATE" === e.tagName
                    ? [e.content.cloneNode(!0)]
                    : Array.from(e.children);
                })(e)),
                (n = (function () {
                  var e =
                    arguments.length > 0 && void 0 !== arguments[0]
                      ? arguments[0]
                      : {};
                  if (
                    (null == (e = Object.assign({}, e)).closable &&
                      (e.closable = !0),
                    null == e.className && (e.className = ""),
                    null == e.onShow && (e.onShow = function () {}),
                    null == e.onClose && (e.onClose = function () {}),
                    "boolean" != typeof e.closable)
                  )
                    throw new Error("Property `closable` must be a boolean");
                  if ("string" != typeof e.className)
                    throw new Error("Property `className` must be a string");
                  if ("function" != typeof e.onShow)
                    throw new Error("Property `onShow` must be a function");
                  if ("function" != typeof e.onClose)
                    throw new Error("Property `onClose` must be a function");
                  return e;
                })(n))
              ),
              c = function (e) {
                return (
                  !1 !== n.onClose(u) &&
                  (function (e, n) {
                    return (
                      e.classList.remove("basicLightbox--visible"),
                      setTimeout(function () {
                        return (
                          !1 === i(e) || e.parentElement.removeChild(e), n()
                        );
                      }, 410),
                      !0
                    );
                  })(t, function () {
                    if ("function" == typeof e) return e(u);
                  })
                );
              };
            !0 === n.closable &&
              t.addEventListener("click", function (e) {
                e.target === t && c();
              });
            var u = {
              element: function () {
                return t;
              },
              visible: function () {
                return i(t);
              },
              show: function (e) {
                return (
                  !1 !== n.onShow(u) &&
                  (function (e, n) {
                    return (
                      document.body.appendChild(e),
                      setTimeout(function () {
                        requestAnimationFrame(function () {
                          return e.classList.add("basicLightbox--visible"), n();
                        });
                      }, 10),
                      !0
                    );
                  })(t, function () {
                    if ("function" == typeof e) return e(u);
                  })
                );
              },
              close: c,
            };
            return u;
          };
        },
        {},
      ],
    },
    {},
    [1]
  )(1);
});

/*! Lity - v2.4.0 - 2019-08-10
 * http://sorgalla.com/lity/
 * Copyright (c) 2015-2019 Jan Sorgalla; Licensed MIT */

!(function (a, b) {
  "function" == typeof define && define.amd
    ? define(["jquery"], function (c) {
        return b(a, c);
      })
    : "object" == typeof module && "object" == typeof module.exports
    ? (module.exports = b(a, require("jquery")))
    : (a.lity = b(a, a.jQuery || a.Zepto));
})("undefined" != typeof window ? window : this, function (a, b) {
  "use strict";
  function c(a) {
    var b = B();
    return (
      N && a.length
        ? (a.one(N, b.resolve), setTimeout(b.resolve, 500))
        : b.resolve(),
      b.promise()
    );
  }
  function d(a, c, d) {
    if (1 === arguments.length) return b.extend({}, a);
    if ("string" == typeof c) {
      if (void 0 === d) return void 0 === a[c] ? null : a[c];
      a[c] = d;
    } else b.extend(a, c);
    return this;
  }
  function e(a) {
    for (
      var b,
        c = decodeURI(a.split("#")[0]).split("&"),
        d = {},
        e = 0,
        f = c.length;
      e < f;
      e++
    )
      c[e] && ((b = c[e].split("=")), (d[b[0]] = b[1]));
    return d;
  }
  function f(a, c) {
    return a + (a.indexOf("?") > -1 ? "&" : "?") + b.param(c);
  }
  function g(a, b) {
    var c = a.indexOf("#");
    return -1 === c ? b : (c > 0 && (a = a.substr(c)), b + a);
  }
  function h(a) {
    return b('<span class="lity-error"/>').append(a);
  }
  function i(a, c) {
    var d =
        (c.opener() && c.opener().data("lity-desc")) ||
        "Image with no description",
      e = b('<img src="' + a + '" alt="' + d + '"/>'),
      f = B(),
      g = function () {
        f.reject(h("Failed loading image"));
      };
    return (
      e
        .on("load", function () {
          if (0 === this.naturalWidth) return g();
          f.resolve(e);
        })
        .on("error", g),
      f.promise()
    );
  }
  function j(a, c) {
    var d, e, f;
    try {
      d = b(a);
    } catch (a) {
      return !1;
    }
    return (
      !!d.length &&
      ((e = b('<i style="display:none !important"/>')),
      (f = d.hasClass("lity-hide")),
      c.element().one("lity:remove", function () {
        e.before(d).remove(),
          f && !d.closest(".lity-content").length && d.addClass("lity-hide");
      }),
      d.removeClass("lity-hide").after(e))
    );
  }
  function k(a) {
    var c = J.exec(a);
    return (
      !!c &&
      o(
        g(
          a,
          f(
            "https://www.youtube" + (c[2] || "") + ".com/embed/" + c[4],
            b.extend({ autoplay: 1 }, e(c[5] || ""))
          )
        )
      )
    );
  }
  function l(a) {
    var c = K.exec(a);
    return (
      !!c &&
      o(
        g(
          a,
          f(
            "https://player.vimeo.com/video/" + c[3],
            b.extend({ autoplay: 1 }, e(c[4] || ""))
          )
        )
      )
    );
  }
  function m(a) {
    var c = M.exec(a);
    return (
      !!c &&
      (0 !== a.indexOf("http") && (a = "https:" + a),
      o(
        g(
          a,
          f(
            "https://www.facebook.com/plugins/video.php?href=" + a,
            b.extend({ autoplay: 1 }, e(c[4] || ""))
          )
        )
      ))
    );
  }
  function n(a) {
    var b = L.exec(a);
    return (
      !!b &&
      o(
        g(
          a,
          f("https://www.google." + b[3] + "/maps?" + b[6], {
            output: b[6].indexOf("layer=c") > 0 ? "svembed" : "embed",
          })
        )
      )
    );
  }
  function o(a) {
    return (
      '<div class="lity-iframe-container"><iframe frameborder="0" allowfullscreen allow="autoplay; fullscreen" src="' +
      a +
      '"/></div>'
    );
  }
  function p() {
    return z.documentElement.clientHeight
      ? z.documentElement.clientHeight
      : Math.round(A.height());
  }
  function q(a) {
    var b = v();
    b &&
      (27 === a.keyCode && b.options("esc") && b.close(),
      9 === a.keyCode && r(a, b));
  }
  function r(a, b) {
    var c = b.element().find(G),
      d = c.index(z.activeElement);
    a.shiftKey && d <= 0
      ? (c.get(c.length - 1).focus(), a.preventDefault())
      : a.shiftKey ||
        d !== c.length - 1 ||
        (c.get(0).focus(), a.preventDefault());
  }
  function s() {
    b.each(D, function (a, b) {
      b.resize();
    });
  }
  function t(a) {
    1 === D.unshift(a) &&
      (C.addClass("lity-active"), A.on({ resize: s, keydown: q })),
      b("body > *")
        .not(a.element())
        .addClass("lity-hidden")
        .each(function () {
          var a = b(this);
          void 0 === a.data(F) && a.data(F, a.attr(E) || null);
        })
        .attr(E, "true");
  }
  function u(a) {
    var c;
    a.element().attr(E, "true"),
      1 === D.length &&
        (C.removeClass("lity-active"), A.off({ resize: s, keydown: q })),
      (D = b.grep(D, function (b) {
        return a !== b;
      })),
      (c = D.length ? D[0].element() : b(".lity-hidden")),
      c.removeClass("lity-hidden").each(function () {
        var a = b(this),
          c = a.data(F);
        c ? a.attr(E, c) : a.removeAttr(E), a.removeData(F);
      });
  }
  function v() {
    return 0 === D.length ? null : D[0];
  }
  function w(a, c, d, e) {
    var f,
      g = "inline",
      h = b.extend({}, d);
    return (
      e && h[e]
        ? ((f = h[e](a, c)), (g = e))
        : (b.each(["inline", "iframe"], function (a, b) {
            delete h[b], (h[b] = d[b]);
          }),
          b.each(h, function (b, d) {
            return (
              !d ||
              !(!d.test || d.test(a, c)) ||
              ((f = d(a, c)), !1 !== f ? ((g = b), !1) : void 0)
            );
          })),
      { handler: g, content: f || "" }
    );
  }
  function x(a, e, f, g) {
    function h(a) {
      (k = b(a).css("max-height", p() + "px")),
        j.find(".lity-loader").each(function () {
          var a = b(this);
          c(a).always(function () {
            a.remove();
          });
        }),
        j.removeClass("lity-loading").find(".lity-content").empty().append(k),
        (m = !0),
        k.trigger("lity:ready", [l]);
    }
    var i,
      j,
      k,
      l = this,
      m = !1,
      n = !1;
    (e = b.extend({}, H, e)),
      (j = b(e.template)),
      (l.element = function () {
        return j;
      }),
      (l.opener = function () {
        return f;
      }),
      (l.options = b.proxy(d, l, e)),
      (l.handlers = b.proxy(d, l, e.handlers)),
      (l.resize = function () {
        m && !n && k.css("max-height", p() + "px").trigger("lity:resize", [l]);
      }),
      (l.close = function () {
        if (m && !n) {
          (n = !0), u(l);
          var a = B();
          if (
            g &&
            (z.activeElement === j[0] || b.contains(j[0], z.activeElement))
          )
            try {
              g.focus();
            } catch (a) {}
          return (
            k.trigger("lity:close", [l]),
            j.removeClass("lity-opened").addClass("lity-closed"),
            c(k.add(j)).always(function () {
              k.trigger("lity:remove", [l]),
                j.remove(),
                (j = void 0),
                a.resolve();
            }),
            a.promise()
          );
        }
      }),
      (i = w(a, l, e.handlers, e.handler)),
      j
        .attr(E, "false")
        .addClass("lity-loading lity-opened lity-" + i.handler)
        .appendTo("body")
        .focus()
        .on("click", "[data-lity-close]", function (a) {
          b(a.target).is("[data-lity-close]") && l.close();
        })
        .trigger("lity:open", [l]),
      t(l),
      b.when(i.content).always(h);
  }
  function y(a, c, d) {
    a.preventDefault
      ? (a.preventDefault(),
        (d = b(this)),
        (a = d.data("lity-target") || d.attr("href") || d.attr("src")))
      : (d = b(d));
    var e = new x(
      a,
      b.extend({}, d.data("lity-options") || d.data("lity"), c),
      d,
      z.activeElement
    );
    if (!a.preventDefault) return e;
  }
  var z = a.document,
    A = b(a),
    B = b.Deferred,
    C = b("html"),
    D = [],
    E = "aria-hidden",
    F = "lity-" + E,
    G =
      'a[href],area[href],input:not([disabled]),select:not([disabled]),textarea:not([disabled]),button:not([disabled]),iframe,object,embed,[contenteditable],[tabindex]:not([tabindex^="-"])',
    H = {
      esc: !0,
      handler: null,
      handlers: {
        image: i,
        inline: j,
        youtube: k,
        vimeo: l,
        googlemaps: n,
        facebookvideo: m,
        iframe: o,
      },
      template:
        '<div class="lity" role="dialog" aria-label="Dialog Window (Press escape to close)" tabindex="-1"><div class="lity-wrap" data-lity-close role="document"><div class="lity-loader" aria-hidden="true">Loading...</div><div class="lity-container"><div class="lity-content"></div><button class="lity-close" type="button" aria-label="Close (Press escape to close)" data-lity-close>&times;</button></div></div></div>',
    },
    I = /(^data:image\/)|(\.(png|jpe?g|gif|svg|webp|bmp|ico|tiff?)(\?\S*)?$)/i,
    J =
      /(youtube(-nocookie)?\.com|youtu\.be)\/(watch\?v=|v\/|u\/|embed\/?)?([\w-]{11})(.*)?/i,
    K = /(vimeo(pro)?.com)\/(?:[^\d]+)?(\d+)\??(.*)?$/,
    L = /((maps|www)\.)?google\.([^\/\?]+)\/?((maps\/?)?\?)(.*)/i,
    M = /(facebook\.com)\/([a-z0-9_-]*)\/videos\/([0-9]*)(.*)?$/i,
    N = (function () {
      var a = z.createElement("div"),
        b = {
          WebkitTransition: "webkitTransitionEnd",
          MozTransition: "transitionend",
          OTransition: "oTransitionEnd otransitionend",
          transition: "transitionend",
        };
      for (var c in b) if (void 0 !== a.style[c]) return b[c];
      return !1;
    })();
  return (
    (i.test = function (a) {
      return I.test(a);
    }),
    (y.version = "2.4.0"),
    (y.options = b.proxy(d, y, H)),
    (y.handlers = b.proxy(d, y, H.handlers)),
    (y.current = v),
    b(z).on("click.lity", "[data-lity]", y),
    y
  );
});

/*!
 * imagesLoaded PACKAGED v4.1.4
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */
!(function (e, t) {
  "function" == typeof define && define.amd
    ? define("ev-emitter/ev-emitter", t)
    : "object" == typeof module && module.exports
    ? (module.exports = t())
    : (e.EvEmitter = t());
})("undefined" != typeof window ? window : this, function () {
  function e() {}
  var t = e.prototype;
  return (
    (t.on = function (e, t) {
      if (e && t) {
        var i = (this._events = this._events || {}),
          n = (i[e] = i[e] || []);
        return n.indexOf(t) == -1 && n.push(t), this;
      }
    }),
    (t.once = function (e, t) {
      if (e && t) {
        this.on(e, t);
        var i = (this._onceEvents = this._onceEvents || {}),
          n = (i[e] = i[e] || {});
        return (n[t] = !0), this;
      }
    }),
    (t.off = function (e, t) {
      var i = this._events && this._events[e];
      if (i && i.length) {
        var n = i.indexOf(t);
        return n != -1 && i.splice(n, 1), this;
      }
    }),
    (t.emitEvent = function (e, t) {
      var i = this._events && this._events[e];
      if (i && i.length) {
        (i = i.slice(0)), (t = t || []);
        for (
          var n = this._onceEvents && this._onceEvents[e], o = 0;
          o < i.length;
          o++
        ) {
          var r = i[o],
            s = n && n[r];
          s && (this.off(e, r), delete n[r]), r.apply(this, t);
        }
        return this;
      }
    }),
    (t.allOff = function () {
      delete this._events, delete this._onceEvents;
    }),
    e
  );
}),
  (function (e, t) {
    "use strict";
    "function" == typeof define && define.amd
      ? define(["ev-emitter/ev-emitter"], function (i) {
          return t(e, i);
        })
      : "object" == typeof module && module.exports
      ? (module.exports = t(e, require("ev-emitter")))
      : (e.imagesLoaded = t(e, e.EvEmitter));
  })("undefined" != typeof window ? window : this, function (e, t) {
    function i(e, t) {
      for (var i in t) e[i] = t[i];
      return e;
    }
    function n(e) {
      if (Array.isArray(e)) return e;
      var t = "object" == typeof e && "number" == typeof e.length;
      return t ? d.call(e) : [e];
    }
    function o(e, t, r) {
      if (!(this instanceof o)) return new o(e, t, r);
      var s = e;
      return (
        "string" == typeof e && (s = document.querySelectorAll(e)),
        s
          ? ((this.elements = n(s)),
            (this.options = i({}, this.options)),
            "function" == typeof t ? (r = t) : i(this.options, t),
            r && this.on("always", r),
            this.getImages(),
            h && (this.jqDeferred = new h.Deferred()),
            void setTimeout(this.check.bind(this)))
          : void a.error("Bad element for imagesLoaded " + (s || e))
      );
    }
    function r(e) {
      this.img = e;
    }
    function s(e, t) {
      (this.url = e), (this.element = t), (this.img = new Image());
    }
    var h = e.jQuery,
      a = e.console,
      d = Array.prototype.slice;
    (o.prototype = Object.create(t.prototype)),
      (o.prototype.options = {}),
      (o.prototype.getImages = function () {
        (this.images = []), this.elements.forEach(this.addElementImages, this);
      }),
      (o.prototype.addElementImages = function (e) {
        "IMG" == e.nodeName && this.addImage(e),
          this.options.background === !0 && this.addElementBackgroundImages(e);
        var t = e.nodeType;
        if (t && u[t]) {
          for (var i = e.querySelectorAll("img"), n = 0; n < i.length; n++) {
            var o = i[n];
            this.addImage(o);
          }
          if ("string" == typeof this.options.background) {
            var r = e.querySelectorAll(this.options.background);
            for (n = 0; n < r.length; n++) {
              var s = r[n];
              this.addElementBackgroundImages(s);
            }
          }
        }
      });
    var u = { 1: !0, 9: !0, 11: !0 };
    return (
      (o.prototype.addElementBackgroundImages = function (e) {
        var t = getComputedStyle(e);
        if (t)
          for (
            var i = /url\((['"])?(.*?)\1\)/gi, n = i.exec(t.backgroundImage);
            null !== n;

          ) {
            var o = n && n[2];
            o && this.addBackground(o, e), (n = i.exec(t.backgroundImage));
          }
      }),
      (o.prototype.addImage = function (e) {
        var t = new r(e);
        this.images.push(t);
      }),
      (o.prototype.addBackground = function (e, t) {
        var i = new s(e, t);
        this.images.push(i);
      }),
      (o.prototype.check = function () {
        function e(e, i, n) {
          setTimeout(function () {
            t.progress(e, i, n);
          });
        }
        var t = this;
        return (
          (this.progressedCount = 0),
          (this.hasAnyBroken = !1),
          this.images.length
            ? void this.images.forEach(function (t) {
                t.once("progress", e), t.check();
              })
            : void this.complete()
        );
      }),
      (o.prototype.progress = function (e, t, i) {
        this.progressedCount++,
          (this.hasAnyBroken = this.hasAnyBroken || !e.isLoaded),
          this.emitEvent("progress", [this, e, t]),
          this.jqDeferred &&
            this.jqDeferred.notify &&
            this.jqDeferred.notify(this, e),
          this.progressedCount == this.images.length && this.complete(),
          this.options.debug && a && a.log("progress: " + i, e, t);
      }),
      (o.prototype.complete = function () {
        var e = this.hasAnyBroken ? "fail" : "done";
        if (
          ((this.isComplete = !0),
          this.emitEvent(e, [this]),
          this.emitEvent("always", [this]),
          this.jqDeferred)
        ) {
          var t = this.hasAnyBroken ? "reject" : "resolve";
          this.jqDeferred[t](this);
        }
      }),
      (r.prototype = Object.create(t.prototype)),
      (r.prototype.check = function () {
        var e = this.getIsImageComplete();
        return e
          ? void this.confirm(0 !== this.img.naturalWidth, "naturalWidth")
          : ((this.proxyImage = new Image()),
            this.proxyImage.addEventListener("load", this),
            this.proxyImage.addEventListener("error", this),
            this.img.addEventListener("load", this),
            this.img.addEventListener("error", this),
            void (this.proxyImage.src = this.img.src));
      }),
      (r.prototype.getIsImageComplete = function () {
        return this.img.complete && this.img.naturalWidth;
      }),
      (r.prototype.confirm = function (e, t) {
        (this.isLoaded = e), this.emitEvent("progress", [this, this.img, t]);
      }),
      (r.prototype.handleEvent = function (e) {
        var t = "on" + e.type;
        this[t] && this[t](e);
      }),
      (r.prototype.onload = function () {
        this.confirm(!0, "onload"), this.unbindEvents();
      }),
      (r.prototype.onerror = function () {
        this.confirm(!1, "onerror"), this.unbindEvents();
      }),
      (r.prototype.unbindEvents = function () {
        this.proxyImage.removeEventListener("load", this),
          this.proxyImage.removeEventListener("error", this),
          this.img.removeEventListener("load", this),
          this.img.removeEventListener("error", this);
      }),
      (s.prototype = Object.create(r.prototype)),
      (s.prototype.check = function () {
        this.img.addEventListener("load", this),
          this.img.addEventListener("error", this),
          (this.img.src = this.url);
        var e = this.getIsImageComplete();
        e &&
          (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"),
          this.unbindEvents());
      }),
      (s.prototype.unbindEvents = function () {
        this.img.removeEventListener("load", this),
          this.img.removeEventListener("error", this);
      }),
      (s.prototype.confirm = function (e, t) {
        (this.isLoaded = e),
          this.emitEvent("progress", [this, this.element, t]);
      }),
      (o.makeJQueryPlugin = function (t) {
        (t = t || e.jQuery),
          t &&
            ((h = t),
            (h.fn.imagesLoaded = function (e, t) {
              var i = new o(this, e, t);
              return i.jqDeferred.promise(h(this));
            }));
      }),
      o.makeJQueryPlugin(),
      o
    );
  });

/*!
 * MoveTo - A lightweight scroll animation javascript library without any dependency.
 * Version 1.8.2 (28-06-2019 14:30)
 * Licensed under MIT
 * Copyright 2019 Hasan Aydoğdu <hsnaydd@gmail.com>
 */
("use strict");
var MoveTo = (function () {
  var e = {
    tolerance: 0,
    duration: 800,
    easing: "easeOutQuart",
    container: window,
    callback: function () {},
  };
  function o(t, n, e, o) {
    return (t /= o), -e * (--t * t * t * t - 1) + n;
  }
  function v(n, e) {
    var o = {};
    return (
      Object.keys(n).forEach(function (t) {
        o[t] = n[t];
      }),
      Object.keys(e).forEach(function (t) {
        o[t] = e[t];
      }),
      o
    );
  }
  function d(t) {
    return t instanceof HTMLElement ? t.scrollTop : t.pageYOffset;
  }
  function t() {
    var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {},
      n = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {};
    (this.options = v(e, t)), (this.easeFunctions = v({ easeOutQuart: o }, n));
  }
  return (
    (t.prototype.registerTrigger = function (t, n) {
      var e = this;
      if (t) {
        var o = t.getAttribute("href") || t.getAttribute("data-target"),
          r =
            o && "#" !== o
              ? document.getElementById(o.substring(1))
              : document.body,
          i = v(
            this.options,
            (function (e, t) {
              var o = {};
              return (
                Object.keys(t).forEach(function (t) {
                  var n = e.getAttribute(
                    "data-mt-".concat(
                      (function (t) {
                        return t.replace(/([A-Z])/g, function (t) {
                          return "-" + t.toLowerCase();
                        });
                      })(t)
                    )
                  );
                  n && (o[t] = isNaN(n) ? n : parseInt(n, 10));
                }),
                o
              );
            })(t, this.options)
          );
        "function" == typeof n && (i.callback = n);
        var a = function (t) {
          t.preventDefault(), e.move(r, i);
        };
        return (
          t.addEventListener("click", a, !1),
          function () {
            return t.removeEventListener("click", a, !1);
          }
        );
      }
    }),
    (t.prototype.move = function (i) {
      var a = this,
        c = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {};
      if (0 === i || i) {
        c = v(this.options, c);
        var u,
          s = "number" == typeof i ? i : i.getBoundingClientRect().top,
          f = d(c.container),
          l = null;
        s -= c.tolerance;
        window.requestAnimationFrame(function t(n) {
          var e = d(a.options.container);
          l || (l = n - 1);
          var o = n - l;
          if (u && ((0 < s && e < u) || (s < 0 && u < e))) return c.callback(i);
          u = e;
          var r = a.easeFunctions[c.easing](o, f, s, c.duration);
          c.container.scroll(0, r),
            o < c.duration
              ? window.requestAnimationFrame(t)
              : (c.container.scroll(0, s + f), c.callback(i));
        });
      }
    }),
    (t.prototype.addEaseFunction = function (t, n) {
      this.easeFunctions[t] = n;
    }),
    t
  );
})();
"undefined" != typeof module
  ? (module.exports = MoveTo)
  : (window.MoveTo = MoveTo);
