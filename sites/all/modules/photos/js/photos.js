(function ($) {
Drupal.behaviors.photos = {
  attach: function(context) {
    if ($("#photos-sortable").length)  {
      $("#photos-sortable").sortable({
        stop: function(event, ui) {
          var pid = Drupal.settings.photos.pid;
          var uid = Drupal.settings.photos.uid;
          var type = Drupal.settings.photos.sort;
          var sortedIDs = $("#photos-sortable").sortable("toArray");
          var sortUrl = Drupal.settings.basePath + '?q=photos/ajax/sort';
          $('#photos-sort-updates').load(sortUrl, { order : sortedIDs, pid : pid, uid : uid, type : type }, function() {
            $('#photos-sort-updates').show();
            $('#photos-sort-updates').delay(500).fadeOut(500);
          });
        }
      });
      $( "#photos-sortable" ).disableSelection();
    }
    $('.photos_block_sub_open').click(function(){
      v = $(this).parent().siblings('.photos_block_sub_body');
      v.toggle(300);
      ck = $(this);
      $(this).toggleClass('photos_block_sub_open_c');
      if (url = $(this).attr('alt')) {
        $.getJSON(url, function(json){
            var h = '';
            for (i = 0; i < json.count; i++) {
              h += '<a href="' + json[i].link + '"><img src="' +json[i].url+ '" title="' +json[i].filename+ '"/></a>';
            }
            v.html(h);
            ck.attr('alt', '');
            v.removeClass('photos_block_sub_body_load');
          }
        );
      }
    }).hover(function(){
      $(this).addClass('photos_block_sub_open_hover');
    },function(){
      $(this).removeClass('photos_block_sub_open_hover');
    });
    $('#del_check').click(function(){
      if(this.checked) {
        $(".edit-del-all input:checkbox").attr('checked', true);
        $('.edit-del-all').parents('tr').addClass('selected');
      }else{
        $(".edit-del-all input:checkbox").attr('checked', false);
        $('.edit-del-all').parents('tr').removeClass('selected');
        $('textarea, input, select', $('.edit-del-all').parents('tr')).not(this).attr('disabled', false).removeClass('photos_check');
      }
    });
    $('.photos_imagehtml').hover(function(){
      $(this).children('.photos_imagehtml_colorbox').css('display', 'block');
    },function(){
      $(this).children('.photos_imagehtml_colorbox').css('display', 'none');
    });

    $('.edit-del-all input').click(function(){
      if(this.checked){
        $(this).parents('tr').addClass('selected');
      }else{
        $(this).parents('tr').removeClass('selected');
      }
    });
    $('a.photos-vote').click(function(){
      var $$ = $(this);
      u = $(this).attr('href');
      url = u.split('destination=');
      var c = $(this).hasClass('photos-vote-up');
      $.getJSON(url[0], function(json){
        $$.addClass('photos-vote-load');
        if(json.count > 0){
          if(c) {
            $$.siblings('.photos-vote-down').removeClass('photos-vote-down-x');
            $$.addClass('photos-vote-up-x').unbind('click');
          }else{
            $$.siblings('.photos-vote-up').removeClass('photos-vote-up-x');
            $$.addClass('photos-vote-down-x').unbind('click');
          }
          $('.photos-vote-sum_' + $$.attr('alt')).text(json.sum + ' / ' +json.count);
        }else{
          alert(Drupal.t('Operation failed.'));
        }
        $$.removeClass('photos-vote-load').attr('href', '#');
      });
      return false;
    });
    $('#photos_share li').hover(function(){
      $(this).addClass('photos_share_hover');
    },function(){
      $(this).removeClass('photos_share_hover');
    })
    $('#photos_share_ul li select.photos_share_select_val').change(function(){
      $(this).parents('li')[ $(this).val() != 0 ? 'addClass' : 'removeClass' ]('photos_share_selected');
    });
    $('a.photos_share_copy').click(function(){
      var alt = $(this).attr('alt');
      var text = '';
      $('#photos_share_ul li select.photos_share_select_val').each(function(){
        if ($(this).val() != 0) {
          if (alt == 'ubb') {
            text += '[photo=image]id=' + $(this).attr('alt') + '|label=' + $('option:selected', this).text() + '[/photo]\n';
          }else{
            text += '<a href="' + $(this).parents('li').attr('alt') + '" title="' + $(this).parents('li').attr('title') + '"><img src="' + $('option:selected', this).val() + '" alt="' + $(this).parents('li').attr('title') + '" /></a>\n';
          }
        }
      });
      $('#photos_share_textarea').val(text).select();
      $('.photos_share_textarea').show(300);
      return false;
    });

    $('input.image-quote-link, .photos_share_textarea').click(function(){
      $(this).select();
    });
    $('input.photos-p').change(function() {
      i = 0;
      $('#edit-insert-wrapper').show(500);
      $("input.photos-p, input.photos-pp").each(function() {
        if($(this).attr("checked")) {
          t = $(this).val().split('&&&');
          img = '<a class="image-quote" href="http://' + window.location.host + '/photos/image/' + t[2] + '">' + '<img alt="' + t[1] + '" src="' + t[0] + '" /></a>\n';
          inval = $('#edit-insert').val();
          $('#edit-insert').val(inval + img).select();
          $(this).parents('.photos-quote').hide(600,function(){
            $(this).remove();
          });
          i++;
        }
      })
      if(i > 0) {
        $('.photo-msg').text(Drupal.t('Please copy the above code.')).show(500);
      }
      return false;
    })
  }
};
})(jQuery);
