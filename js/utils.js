var getRandomElement = function(array){
    return array[Math.floor(Math.random() * array.length)];
};

$('[data-affix]').each(function(){
    var affixableElement = $(this);
    var elementScrollTop = $(this).offset().top;
    var elementHeight = $(this).outerHeight();
    var isAffixed = false;
    $(window).on('scroll', function (event) {
        var scrollValue = $(window).scrollTop();
        if (!isAffixed && scrollValue > elementScrollTop) {
            isAffixed = true;
            affixableElement.addClass('affixed');
            var bodyMarginTop = parseInt($('body').css('marginTop'));
            $('body').css('marginTop', bodyMarginTop + elementHeight);
        } else if (isAffixed && scrollValue < elementScrollTop) {
            affixableElement.removeClass('affixed');
            var bodyMarginTop = parseInt($('body').css('marginTop'));
            $('body').css('marginTop', parseInt(bodyMarginTop - elementHeight));
            isAffixed = false;
        }
    });
});

var getFormData = function ($form) {
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};

    $.map(unindexed_array, function (n, i) {
        var name = n['name'];
        var value = n['value'];
        if (matches = name.match(/(.+)\[\]$/)) {
            name = matches[1];
            if (!indexed_array[name]) {
                indexed_array[name] = [];
            }
            indexed_array[name].push(value);
        } else {
            indexed_array[name] = value;
        }
    });

    return indexed_array;
}