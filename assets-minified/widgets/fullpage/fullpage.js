!function(a){a.fn.fullpage=function(b){function c(){a("body").append('<div id="fp-nav"><ul></ul></div>'),db=a("#fp-nav"),db.css("color",b.navigationColor),db.addClass(b.navigationPosition);for(var c=0;c<a(".fp-section").length;c++){var d="";b.anchors.length&&(d=b.anchors[c]);var e=b.navigationTooltips[c];"undefined"==typeof e&&(e=""),db.find("ul").append('<li data-tooltip="'+e+'"><a href="#'+d+'"><span></span></a></li>')}}function d(){a(".fp-section").each(function(){var b=a(this).find(".fp-slide");b.length?b.each(function(){H(a(this))}):H(a(this))}),a.isFunction(b.afterRender)&&b.afterRender.call(this)}function e(){if(!b.autoScrolling||b.scrollBar){var c=a(window).scrollTop(),d=0,e=Math.abs(c-a(".fp-section").first().offset().top);a(".fp-section").each(function(b){var f=Math.abs(c-a(this).offset().top);e>f&&(d=b,e=f)});var f=a(".fp-section").eq(d)}if(!b.autoScrolling&&!f.hasClass("active")){ob=!0;var g=a(".fp-section.active").index(".fp-section")+1,h=F(f),i=f.data("anchor");f.addClass("active").siblings().removeClass("active"),jb||(a.isFunction(b.onLeave)&&b.onLeave.call(this,g,f.index(".fp-section")+1,h),a.isFunction(b.afterLoad)&&b.afterLoad.call(this,i,f.index(".fp-section")+1)),D(i,0),b.anchors.length&&!jb&&(bb=i,location.hash=i),clearTimeout(mb),mb=setTimeout(function(){ob=!1},100)}b.scrollBar&&(clearTimeout(nb),nb=setTimeout(function(){jb||n(f)},1e3))}function f(a){return scrollable=a.find(".fp-slides").length?a.find(".fp-slide.active").find(".fp-scrollable"):a.find(".fp-scrollable")}function g(b,c){if("down"==b)var d="bottom",e=a.fn.fullpage.moveSectionDown;else var d="top",e=a.fn.fullpage.moveSectionUp;if(c.length>0){if(!E(d,c))return!0;e()}else e()}function h(c){var d=c.originalEvent;if(!i(c.target)){b.autoScrolling&&c.preventDefault();var e=a(".fp-section.active"),h=f(e);if(!jb&&!eb){var j=W(d);rb=j.y,sb=j.x,e.find(".fp-slides").length&&Math.abs(qb-sb)>Math.abs(pb-rb)?Math.abs(qb-sb)>a(window).width()/100*b.touchSensitivity&&(qb>sb?a.fn.fullpage.moveSlideRight():a.fn.fullpage.moveSlideLeft()):b.autoScrolling&&Math.abs(pb-rb)>a(window).height()/100*b.touchSensitivity&&(pb>rb?g("down",h):rb>pb&&g("up",h))}}}function i(c,d){d=d||0;var e=a(c).parent();return d<b.normalScrollElementTouchThreshold&&e.is(b.normalScrollElements)?!0:d==b.normalScrollElementTouchThreshold?!1:i(e,++d)}function j(a){var b=a.originalEvent,c=W(b);pb=c.y,qb=c.x}function k(c){if(b.autoScrolling){c=window.event||c;var d=Math.max(-1,Math.min(1,c.wheelDelta||-c.deltaY||-c.detail));b.scrollBar&&(c.preventDefault?c.preventDefault():c.returnValue=!1);var e=a(".fp-section.active"),h=f(e);return jb||(0>d?g("down",h):g("up",h)),!1}}function l(c){var d=a(".fp-section.active"),e=d.find(".fp-slides");if(e.length&&!eb){var f=e.find(".fp-slide.active"),g=null;if(g="prev"===c?f.prev(".fp-slide"):f.next(".fp-slide"),!g.length){if(!b.loopHorizontal)return;g=f.siblings("prev"===c?":last":":first")}eb=!0,v(e,g)}}function m(){a(".fp-slide.active").each(function(){X(a(this))})}function n(c,d,e){var f=c.position();if("undefined"!=typeof f){var g={element:c,callback:d,isMovementUp:e,dest:f,dtop:f.top,yMovement:F(c),anchorLink:c.data("anchor"),sectionIndex:c.index(".fp-section"),activeSlide:c.find(".fp-slide.active"),activeSection:a(".fp-section.active"),leavingSection:a(".fp-section.active").index(".fp-section")+1,localIsResizing:kb};if(!(g.activeSection.is(c)&&!kb||b.scrollBar&&a(window).scrollTop()===g.dtop)){if(g.activeSlide.length)var h=g.activeSlide.data("anchor"),i=g.activeSlide.index();b.autoScrolling&&b.continuousVertical&&"undefined"!=typeof g.isMovementUp&&(!g.isMovementUp&&"up"==g.yMovement||g.isMovementUp&&"down"==g.yMovement)&&(g=q(g)),c.addClass("active").siblings().removeClass("active"),jb=!0,"undefined"!=typeof g.anchorLink&&P(i,h,g.anchorLink),a.isFunction(b.onLeave)&&!g.localIsResizing&&b.onLeave.call(this,g.leavingSection,g.sectionIndex+1,g.yMovement),o(g),bb=g.anchorLink,b.autoScrolling&&D(g.anchorLink,g.sectionIndex)}}}function o(c){if(b.css3&&b.autoScrolling&&!b.scrollBar){var d="translate3d(0px, -"+c.dtop+"px, 0px)";L(d,!0),setTimeout(function(){s(c)},b.scrollingSpeed)}else{var e=p(c);a(e.element).animate(e.options,b.scrollingSpeed,b.easing).promise().done(function(){s(c)})}}function p(a){var c={};return b.autoScrolling&&!b.scrollBar?(c.options={top:-a.dtop},c.element="."+lb):(c.options={scrollTop:a.dtop},c.element="html, body"),c}function q(b){return b.isMovementUp?a(".fp-section.active").before(b.activeSection.nextAll(".fp-section")):a(".fp-section.active").after(b.activeSection.prevAll(".fp-section").get().reverse()),Y(a(".fp-section.active").position().top),m(),b.wrapAroundElements=b.activeSection,b.dest=b.element.position(),b.dtop=b.dest.top,b.yMovement=F(b.element),b}function r(b){b.wrapAroundElements&&b.wrapAroundElements.length&&(b.isMovementUp?a(".fp-section:first").before(b.wrapAroundElements):a(".fp-section:last").after(b.wrapAroundElements),Y(a(".fp-section.active").position().top),m())}function s(c){r(c),a.isFunction(b.afterLoad)&&!c.localIsResizing&&b.afterLoad.call(this,c.anchorLink,c.sectionIndex+1),setTimeout(function(){jb=!1,a.isFunction(c.callback)&&c.callback.call(this)},ab)}function t(){var a=window.location.hash.replace("#","").split("/"),b=a[0],c=a[1];b&&M(b,c)}function u(){if(!ob){var a=window.location.hash.replace("#","").split("/"),b=a[0],c=a[1];if(b.length){var d="undefined"==typeof bb,e="undefined"==typeof bb&&"undefined"==typeof c&&!eb;(b&&b!==bb&&!d||e||!eb&&cb!=c)&&M(b,c)}}}function v(c,d){var e=d.position(),f=c.find(".fp-slidesContainer").parent(),g=d.index(),h=c.closest(".fp-section"),i=h.index(".fp-section"),j=h.data("anchor"),k=h.find(".fp-slidesNav"),l=d.data("anchor"),m=kb;if(b.onSlideLeave){var n=h.find(".fp-slide.active").index(),o=G(n,g);m||"none"===o||a.isFunction(b.onSlideLeave)&&b.onSlideLeave.call(this,j,i+1,n,o)}d.addClass("active").siblings().removeClass("active"),"undefined"==typeof l&&(l=g),b.loopHorizontal||(h.find(".fp-controlArrow.fp-prev").toggle(0!=g),h.find(".fp-controlArrow.fp-next").toggle(!d.is(":last-child"))),h.hasClass("active")&&P(g,l,j);var p=function(){m||a.isFunction(b.afterSlideLoad)&&b.afterSlideLoad.call(this,j,i+1,l,g),eb=!1};if(b.css3){var q="translate3d(-"+e.left+"px, 0px, 0px)";y(c.find(".fp-slidesContainer"),b.scrollingSpeed>0).css(Z(q)),setTimeout(function(){p()},b.scrollingSpeed,b.easing)}else f.animate({scrollLeft:e.left},b.scrollingSpeed,b.easing,function(){p()});k.find(".active").removeClass("active"),k.find("li").eq(g).find("a").addClass("active")}function w(){x(),fb?"text"!==a(document.activeElement).attr("type")&&a.fn.fullpage.reBuild(!0):(clearTimeout(tb),tb=setTimeout(function(){a.fn.fullpage.reBuild(!0)},500))}function x(){if(b.responsive){var c=hb.hasClass("fp-responsive");a(window).width()<b.responsive?c||(a.fn.fullpage.setAutoScrolling(!1),a("#fp-nav").hide(),hb.addClass("fp-responsive")):c&&(a.fn.fullpage.setAutoScrolling(!0),a("#fp-nav").show(),hb.removeClass("fp-responsive"))}}function y(a,c){var d="all "+b.scrollingSpeed+"ms "+b.easingcss3;return c?(a.removeClass("fp-notransition"),a.css({"-webkit-transition":d,transition:d})):z(a)}function z(a){return a.addClass("fp-notransition")}function A(b,c){var d=825,e=900;if(d>b||e>c){var f=100*b/d,g=100*c/e,h=Math.min(f,g),i=h.toFixed(2);a("body").css("font-size",i+"%")}else a("body").css("font-size","100%")}function B(c,d){b.navigation&&(a("#fp-nav").find(".active").removeClass("active"),c?a("#fp-nav").find('a[href="#'+c+'"]').addClass("active"):a("#fp-nav").find("li").eq(d).find("a").addClass("active"))}function C(c){b.menu&&(a(b.menu).find(".active").removeClass("active"),a(b.menu).find('[data-menuanchor="'+c+'"]').addClass("active"))}function D(a,b){C(a),B(a,b)}function E(a,b){return"top"===a?!b.scrollTop():"bottom"===a?b.scrollTop()+1+b.innerHeight()>=b[0].scrollHeight:void 0}function F(b){var c=a(".fp-section.active").index(".fp-section"),d=b.index(".fp-section");return c==d?"none":c>d?"up":"down"}function G(a,b){return a==b?"none":a>b?"left":"right"}function H(a){a.css("overflow","hidden");var c=a.closest(".fp-section"),d=a.find(".fp-scrollable");if(d.length)var e=d.get(0).scrollHeight;else{var e=a.get(0).scrollHeight;b.verticalCentered&&(e=a.find(".fp-tableCell").get(0).scrollHeight)}var f=ib-parseInt(c.css("padding-bottom"))-parseInt(c.css("padding-top"));e>f?d.length?d.css("height",f+"px").parent().css("height",f+"px"):(b.verticalCentered?a.find(".fp-tableCell").wrapInner('<div class="fp-scrollable" />'):a.wrapInner('<div class="fp-scrollable" />'),a.find(".fp-scrollable").slimScroll({allowPageScroll:!0,height:f+"px",size:"10px",alwaysVisible:!0})):I(a),a.css("overflow","")}function I(a){a.find(".fp-scrollable").children().first().unwrap().unwrap(),a.find(".slimScrollBar").remove(),a.find(".slimScrollRail").remove()}function J(a){a.addClass("fp-table").wrapInner('<div class="fp-tableCell" style="height:'+K(a)+'px;" />')}function K(a){var c=ib;if(b.paddingTop||b.paddingBottom){var d=a;d.hasClass("fp-section")||(d=a.closest(".fp-section"));var e=parseInt(d.css("padding-top"))+parseInt(d.css("padding-bottom"));c=ib-e}return c}function L(a,b){y(hb,b),hb.css(Z(a))}function M(b,c){if("undefined"==typeof c&&(c=0),isNaN(b))var d=a('[data-anchor="'+b+'"]');else var d=a(".fp-section").eq(b-1);b===bb||d.hasClass("active")?N(d,c):n(d,function(){N(d,c)})}function N(a,b){if("undefined"!=typeof b){var c=a.find(".fp-slides"),d=c.find('[data-anchor="'+b+'"]');d.length||(d=c.find(".fp-slide").eq(b)),d.length&&v(c,d)}}function O(a,c){a.append('<div class="fp-slidesNav"><ul></ul></div>');var d=a.find(".fp-slidesNav");d.addClass(b.slidesNavPosition);for(var e=0;c>e;e++)d.find("ul").append('<li><a href="#"><span></span></a></li>');d.css("margin-left","-"+d.width()/2+"px"),d.find("li").first().find("a").addClass("active")}function P(a,c,d){var e="";b.anchors.length&&(a?("undefined"!=typeof d&&(e=d),"undefined"==typeof c&&(c=a),cb=c,location.hash=e+"/"+c):"undefined"!=typeof a?(cb=c,location.hash=d):location.hash=d)}function Q(){var a,b=document.createElement("p"),c={webkitTransform:"-webkit-transform",OTransform:"-o-transform",msTransform:"-ms-transform",MozTransform:"-moz-transform",transform:"transform"};document.body.insertBefore(b,null);for(var d in c)void 0!==b.style[d]&&(b.style[d]="translate3d(1px,1px,1px)",a=window.getComputedStyle(b).getPropertyValue(c[d]));return document.body.removeChild(b),void 0!==a&&a.length>0&&"none"!==a}function R(){document.addEventListener?(document.removeEventListener("mousewheel",k,!1),document.removeEventListener("wheel",k,!1)):document.detachEvent("onmousewheel",k)}function S(){document.addEventListener?(document.addEventListener("mousewheel",k,!1),document.addEventListener("wheel",k,!1)):document.attachEvent("onmousewheel",k)}function T(){(fb||gb)&&(MSPointer=V(),a(document).off("touchstart "+MSPointer.down).on("touchstart "+MSPointer.down,j),a(document).off("touchmove "+MSPointer.move).on("touchmove "+MSPointer.move,h))}function U(){(fb||gb)&&(MSPointer=V(),a(document).off("touchstart "+MSPointer.down),a(document).off("touchmove "+MSPointer.move))}function V(){var a;return a=window.PointerEvent?{down:"pointerdown",move:"pointermove"}:{down:"MSPointerDown",move:"MSPointerMove"}}function W(a){var b=new Array;return window.navigator.msPointerEnabled?(b.y=a.pageY,b.x=a.pageX):(b.y=a.touches[0].pageY,b.x=a.touches[0].pageX),b}function X(c){var d=b.scrollingSpeed;a.fn.fullpage.setScrollingSpeed(0),v(c.closest(".fp-slides"),c),a.fn.fullpage.setScrollingSpeed(d)}function Y(a){if(b.scrollBar)hb.scrollTop(a);else if(b.css3){var c="translate3d(0px, -"+a+"px, 0px)";L(c,!1)}else hb.css("top",-a)}function Z(a){return{"-webkit-transform":a,"-moz-transform":a,"-ms-transform":a,transform:a}}function $(){Y(0),a("#fp-nav, .fp-slidesNav, .fp-controlArrow").remove(),a(".fp-section").css({height:"","background-color":"",padding:""}),a(".fp-slide").css({width:""}),hb.css({height:"",position:"","-ms-touch-action":"","touch-action":""}),a(".fp-section, .fp-slide").each(function(){I(a(this)),a(this).removeClass("fp-table active")}),z(hb),z(hb.find(".fp-easing")),hb.find(".fp-tableCell, .fp-slidesContainer, .fp-slides").each(function(){a(this).replaceWith(this.childNodes)}),a("html, body").scrollTop(0)}function _(){b.continuousVertical&&(b.loopTop||b.loopBottom)&&(b.continuousVertical=!1,console&&console.warn&&console.warn("Option `loopTop/loopBottom` is mutually exclusive with `continuousVertical`; `continuousVertical` disabled")),b.continuousVertical&&b.scrollBar&&(b.continuousVertical=!1,console&&console.warn&&console.warn("Option `scrollBar` is mutually exclusive with `continuousVertical`; `continuousVertical` disabled"))}b=a.extend({menu:!1,anchors:[],navigation:!1,navigationPosition:"right",navigationColor:"#000",navigationTooltips:[],slidesNavigation:!1,slidesNavPosition:"bottom",scrollBar:!1,css3:!0,scrollingSpeed:700,autoScrolling:!0,easing:"easeInQuart",easingcss3:"ease",loopBottom:!1,loopTop:!1,loopHorizontal:!0,continuousVertical:!1,normalScrollElements:null,scrollOverflow:!1,touchSensitivity:5,normalScrollElementTouchThreshold:5,keyboardScrolling:!0,animateAnchor:!0,controlArrowColor:"#fff",verticalCentered:!0,resize:!0,sectionsColor:[],paddingTop:0,paddingBottom:0,fixedElements:null,responsive:0,sectionSelector:".section",slideSelector:".slide",afterLoad:null,onLeave:null,afterRender:null,afterResize:null,afterReBuild:null,afterSlideLoad:null,onSlideLeave:null},b),_();var ab=600;a.fn.fullpage.setAutoScrolling=function(c){b.autoScrolling=c;var d=a(".fp-section.active");b.autoScrolling&&!b.scrollBar?(a("html, body").css({overflow:"hidden",height:"100%"}),hb.css({"-ms-touch-action":"none","touch-action":"none"}),d.length&&Y(d.position().top)):(a("html, body").css({overflow:"visible",height:"initial"}),hb.css({"-ms-touch-action":"","touch-action":""}),Y(0),a("html, body").scrollTop(d.position().top))},a.fn.fullpage.setScrollingSpeed=function(a){b.scrollingSpeed=a},a.fn.fullpage.setMouseWheelScrolling=function(a){a?S():R()},a.fn.fullpage.setAllowScrolling=function(b){b?(a.fn.fullpage.setMouseWheelScrolling(!0),T()):(a.fn.fullpage.setMouseWheelScrolling(!1),U())},a.fn.fullpage.setKeyboardScrolling=function(a){b.keyboardScrolling=a},a.fn.fullpage.moveSectionUp=function(){var c=a(".fp-section.active").prev(".fp-section");c.length||!b.loopTop&&!b.continuousVertical||(c=a(".fp-section").last()),c.length&&n(c,null,!0)},a.fn.fullpage.moveSectionDown=function(){var c=a(".fp-section.active").next(".fp-section");c.length||!b.loopBottom&&!b.continuousVertical||(c=a(".fp-section").first()),c.length&&n(c,null,!1)},a.fn.fullpage.moveTo=function(b,c){var d="";d=isNaN(b)?a('[data-anchor="'+b+'"]'):a(".fp-section").eq(b-1),"undefined"!=typeof c?M(b,c):d.length>0&&n(d)},a.fn.fullpage.moveSlideRight=function(){l("next")},a.fn.fullpage.moveSlideLeft=function(){l("prev")},a.fn.fullpage.reBuild=function(c){kb=!0;var d=a(window).width();ib=a(window).height(),b.resize&&A(ib,d),a(".fp-section").each(function(){ib-parseInt(a(this).css("padding-bottom"))-parseInt(a(this).css("padding-top"));if(b.verticalCentered&&a(this).find(".fp-tableCell").css("height",K(a(this))+"px"),a(this).css("height",ib+"px"),b.scrollOverflow){var c=a(this).find(".fp-slide");c.length?c.each(function(){H(a(this))}):H(a(this))}var c=a(this).find(".fp-slides");c.length&&v(c,c.find(".fp-slide.active"))});var e=(a(".fp-section.active").position(),a(".fp-section.active"));e.index(".fp-section")&&n(e),kb=!1,a.isFunction(b.afterResize)&&c&&b.afterResize.call(this),a.isFunction(b.afterReBuild)&&!c&&b.afterReBuild.call(this)};var bb,cb,db,eb=!1,fb=navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|BB10|Windows Phone|Tizen|Bada)/),gb="ontouchstart"in window||navigator.msMaxTouchPoints>0,hb=a(this),ib=a(window).height(),jb=!1,kb=!1,lb="fullpage-wrapper";a.fn.fullpage.setAllowScrolling(!0),b.css3&&(b.css3=Q()),a(this).length?(hb.css({height:"100%",position:"relative"}),hb.addClass(lb)):console.error("Error! Fullpage.js needs to be initialized with a selector. For example: $('#myContainer').fullpage();"),a(b.sectionSelector).each(function(){a(this).addClass("fp-section")}),a(b.slideSelector).each(function(){a(this).addClass("fp-slide")}),b.navigation&&c(),a(".fp-section").each(function(c){var d=a(this),e=a(this).find(".fp-slide"),f=e.length;if(c||0!==a(".fp-section.active").length||a(this).addClass("active"),a(this).css("height",ib+"px"),(b.paddingTop||b.paddingBottom)&&a(this).css("padding",b.paddingTop+" 0 "+b.paddingBottom+" 0"),"undefined"!=typeof b.sectionsColor[c]&&a(this).css("background-color",b.sectionsColor[c]),"undefined"!=typeof b.anchors[c]&&a(this).attr("data-anchor",b.anchors[c]),f>1){var g=100*f,h=100/f;e.wrapAll('<div class="fp-slidesContainer" />'),e.parent().wrap('<div class="fp-slides" />'),a(this).find(".fp-slidesContainer").css("width",g+"%"),a(this).find(".fp-slides").after('<div class="fp-controlArrow fp-prev"></div><div class="fp-controlArrow fp-next"></div>'),"#fff"!=b.controlArrowColor&&(a(this).find(".fp-controlArrow.fp-next").css("border-color","transparent transparent transparent "+b.controlArrowColor),a(this).find(".fp-controlArrow.fp-prev").css("border-color","transparent "+b.controlArrowColor+" transparent transparent")),b.loopHorizontal||a(this).find(".fp-controlArrow.fp-prev").hide(),b.slidesNavigation&&O(a(this),f),e.each(function(){a(this).css("width",h+"%"),b.verticalCentered&&J(a(this))});var i=d.find(".fp-slide.active");0==i.length?e.eq(0).addClass("active"):X(i)}else b.verticalCentered&&J(a(this))}).promise().done(function(){a.fn.fullpage.setAutoScrolling(b.autoScrolling);var c=a(".fp-section.active").find(".fp-slide.active");c.length&&(0!=a(".fp-section.active").index(".fp-section")||0==a(".fp-section.active").index(".fp-section")&&0!=c.index())&&X(c),b.fixedElements&&b.css3&&a(b.fixedElements).appendTo("body"),b.navigation&&(db.css("margin-top","-"+db.height()/2+"px"),db.find("li").eq(a(".fp-section.active").index(".fp-section")).find("a").addClass("active")),b.menu&&b.css3&&a(b.menu).closest(".fullpage-wrapper").length&&a(b.menu).appendTo("body"),b.scrollOverflow?("complete"===document.readyState&&d(),a(window).on("load",d)):a.isFunction(b.afterRender)&&b.afterRender.call(this),x();var e=window.location.hash.replace("#","").split("/"),f=e[0];if(f.length){var g=a('[data-anchor="'+f+'"]');!b.animateAnchor&&g.length&&(b.autoScrolling?Y(g.position().top):(Y(0),a("html, body").scrollTop(g.position().top)),D(f,null),a.isFunction(b.afterLoad)&&b.afterLoad.call(this,f,g.index(".fp-section")+1),g.addClass("active").siblings().removeClass("active"))}a(window).on("load",function(){t()})});var mb,nb,ob=!1;a(window).on("scroll",e);var pb=0,qb=0,rb=0,sb=0;a(window).on("hashchange",u),a(document).keydown(function(c){if(b.keyboardScrolling&&!jb&&b.autoScrolling)switch(c.which){case 38:case 33:a.fn.fullpage.moveSectionUp();break;case 40:case 34:a.fn.fullpage.moveSectionDown();break;case 36:a.fn.fullpage.moveTo(1);break;case 35:a.fn.fullpage.moveTo(a(".fp-section").length);break;case 37:a.fn.fullpage.moveSlideLeft();break;case 39:a.fn.fullpage.moveSlideRight();break;default:return}}),a(document).on("click touchstart","#fp-nav a",function(b){b.preventDefault();var c=a(this).parent().index();n(a(".fp-section").eq(c))}),a(document).on("click touchstart",".fp-slidesNav a",function(b){b.preventDefault();var c=a(this).closest(".fp-section").find(".fp-slides"),d=c.find(".fp-slide").eq(a(this).closest("li").index());v(c,d)}),a(document).on({mouseenter:function(){var c=a(this).data("tooltip");a('<div class="fp-tooltip '+b.navigationPosition+'">'+c+"</div>").hide().appendTo(a(this)).fadeIn(200)},mouseleave:function(){a(this).find(".fp-tooltip").fadeOut(200,function(){a(this).remove()})}},"#fp-nav li"),b.normalScrollElements&&(a(document).on("mouseenter",b.normalScrollElements,function(){a.fn.fullpage.setMouseWheelScrolling(!1)}),a(document).on("mouseleave",b.normalScrollElements,function(){a.fn.fullpage.setMouseWheelScrolling(!0)})),a(".fp-section").on("click touchstart",".fp-controlArrow",function(){a(this).hasClass("fp-prev")?a.fn.fullpage.moveSlideLeft():a.fn.fullpage.moveSlideRight()}),a(window).resize(w);var tb;a.fn.fullpage.destroy=function(c){a.fn.fullpage.setAutoScrolling(!1),a.fn.fullpage.setAllowScrolling(!1),a.fn.fullpage.setKeyboardScrolling(!1),a(window).off("scroll",e).off("hashchange",u).off("resize",w),a(document).off("click","#fp-nav a").off("mouseenter","#fp-nav li").off("mouseleave","#fp-nav li").off("click",".fp-slidesNav a").off("mouseover",b.normalScrollElements).off("mouseout",b.normalScrollElements),a(".fp-section").off("click",".fp-controlArrow"),c&&$()}}}(jQuery);