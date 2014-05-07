$(document).ready(function() {

  var navMenuOpen = false,
      glossaryNavMenu = $('.glossary-nav .tag-menu'),

      maximizeSections = function() {
        $('section, .tag-profile').map(function() {
          if($(this).height() < $(window).height()) {
            $(this).css({
              'height': $(window).height()
            });
            $(this).find('.inner-block').css({
              'padding' : '0',
              'padding-top' : ($(this).height() - $(this).find('.inner-block').height()) / 2
            });
          }
        });
      },

      tagNav = function() {
        if($('.tag-glossary').offset().top < $(window).scrollTop()) {
          $('.glossary-nav').addClass('sticky');

          $('.tag-profile').each(function() {
            if( $('.glossary-nav').offset().top >= ($(this).offset().top - $(this).height()/3) ) {
              $('.glossary-nav .nav-button').text($(this).data('tag').toString());
            }
          });
        }
        else {
          $('.glossary-nav').removeClass('sticky');
        }
      };

  $('.tag-menu').addClass('tag-menu-hidden');

  $(window).resize(function() {
    maximizeSections();
  });

  $(window).scroll(function() {
    tagNav();
  });

  $(document).keyup(function(e) {
    if(e.keyCode === 27) {
      glossaryNavMenu.addClass('tag-menu-hidden');
      $('.tooltip').remove();
    }
  });

  $(document).mouseup(function(e) {
    if(!glossaryNavMenu.is(e.target) && glossaryNavMenu.has(e.target).length == 0 && !$('.glossary-nav .nav-button').is(e.target)) {
      glossaryNavMenu.addClass('tag-menu-hidden');
    }
    if(!$('.tooltip').is(e.target) && $('.tooltip').has(e.target).length == 0 && !$('.tooltip').is(e.target)) {
      $('.tooltip').remove();
    }
  });

  $('.tag-menu a').click(function(e) {
    if(glossaryNavMenu.is(':visible')) {
      glossaryNavMenu.addClass('tag-menu-hidden');
      e.preventDefault();
    }
  });

  $('.glossary-nav .nav-button').click(function(e) {
    glossaryNavMenu.toggleClass('tag-menu-hidden');
    e.preventDefault();
  });

  $('abbr').click(function() {
    $abbr = $(this);
    $('body').prepend("<div class=\"tooltip\" data-offset=\"" + $abbr.offset().left + "\">" + $abbr.attr('title') + "<div class=\"arrow-down\"></div></div>");
    $('.tooltip').css({
      'left': $abbr.offset().left - Math.floor($('.tooltip').width()/2) + Math.floor($(this).width()/2),
      'top' : $abbr.offset().top - 45
    });
  });

  maximizeSections();
  $('.tag-menu').localScroll();
  hljs.initHighlightingOnLoad();

});
