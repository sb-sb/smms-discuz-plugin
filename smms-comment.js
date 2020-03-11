jQuery("#fastposteditor").append('<div class="zz-add-img"><input id="zz-img-file" type="file" accept="image/*" multiple="multiple"><div id="zz-img-add">上传图片</div><div id="zz-img-show"></div></div>')
var style = document.createElement('style');
style.type="text/css";
style.appendChild(document.createTextNode("div#zz-img-show img{margin:5px 10px 0 0;height:60px}.zz-add-img{overflow:hidden;width:100%;height: 65px;}input#zz-img-file{position:relative;float:left;width:120px;height:100%;opacity:0;}div#zz-img-show{float:left}div#zz-img-add{float:left;margin: 0px 15px 0 -120px;width:120px;height: 60px;border:1px solid #eee;background-color:#51ADED;color:#FFF;text-align:center;font-size:16px;line-height:60px;}.comment_text img{display:block;margin:15px 0;max-width:85%}"));
document.body.appendChild(style);
jQuery('#zz-img-file').change(function() {
    for (var i = 0; i < this.files.length; i++) {
        var f = this.files[i];
        var formData = new FormData();
        formData.append('smfile', f);
        jQuery.ajax({
            url: '/plugin.php?id=smms_image:update',
            type: 'POST',
            processData: false,
            contentType: false,
            data: formData,
            beforeSend: function(xhr) {
                jQuery('#zz-img-add').text('Uploading...')
            },
            success: function(res) {
                console.log(res);
                jQuery("#zz-img-add").text('上传图片');
                jQuery('#zz-img-show').append('<img src="' + res.data.url + '" />');
                //jQuery('textarea[name="comment"]').val(jQuery('textarea[name="comment"]').val() + '<img src="' + res.data.url + '" />').focus(); 
                jQuery('textarea[name="message"]').insertAtCaret('[img]' + res.data.url + '[/img]');  
            }
        })
    }
});

(function($) {  
    $.fn.extend({  
        insertAtCaret: function(myValue) {  
            var $t = jQuery(this)[0];  
              //IE  
            if (document.selection) {  
                this.focus();  
                sel = document.selection.createRange();  
                sel.text = myValue;  
                this.focus();  
            } else  
            //!IE  
            if ($t.selectionStart || $t.selectionStart == "0") {  
                var startPos = $t.selectionStart;  
                var endPos = $t.selectionEnd;  
                var scrollTop = $t.scrollTop;  
                $t.value = $t.value.substring(0, startPos) + myValue + $t.value.substring(endPos, $t.value.length);  
                this.focus();  
                $t.selectionStart = startPos + myValue.length;  
                $t.selectionEnd = startPos + myValue.length;  
                $t.scrollTop = scrollTop;  
            } else {  
                this.value += myValue;  
                this.focus();  
            }  
        }  
    })  
})(jQuery);  