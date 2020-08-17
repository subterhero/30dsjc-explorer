var initMenu = function(){
    $('.menu-wrapper .nav-link[data-related-view]').on('click tap', function(event){
        event.preventDefault();
        showView($(this).data('related-view'));
    });
}

var showView = function (viewId){
    if (viewId == "bookmarks-view") {
        loadBookmarksView();
    }
    $('.menu-wrapper .nav-link').removeClass('active');
    $('.menu-wrapper .nav-link[data-related-view='+viewId+']').addClass('active');
    $(".view").hide();
    $(window).scrollTop(0);
    $("#"+viewId).show();
}

var populateDaySelect = function(){
    var select = $("#day-select");
    days.forEach(function(element){
        select.append(new Option(element.day + " - " + element.subject, element.day));
    });
}

var populateAuthorSelect = function(){
    var select = $("#author-select");
    authors.forEach(function(element){
        select.append(new Option(element.name + " (@" + element.screen_name + ")", element.screen_name));
    });
}



var bindResetBtns = function(){
    $('.form-group select, .form-group input').on("change keydown", function(){
        if ($(this).val() != 0){
            $(this).closest('.form-group').find('.reset-btn').show();
        } else {
            $(this).closest('.form-group').find('.reset-btn').hide();
        }
    })
    $('.reset-btn').on("click tap", function(){
        $(this).closest('.form-group').find('select,input').val("");
        $(this).hide();
    });
}

var initDb = function(){
    var adapter = new LocalStorage('db')
    var db = low(adapter);

    if (!db.has('posts').value()) {
        db.setState({'posts': posts});
    }
    
    return db;
};

var getDaySubject = function(day){
    var subject = "";
    var dayObj = _.find(days, {day: day})
    if (dayObj){
        subject = dayObj.subject;
    }
    return subject;
};

var storeBookmarks = function(bookmarks){
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}

var getBookmarksIds = function(){
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    if (!bookmarks || !Array.isArray(bookmarks)) {
        bookmarks = [];
    }
    return bookmarks;
};

var getBookmarkedPosts = function(db){
    var bookmarksIds = getBookmarksIds();
    var result = db.get('posts')
        .filter(function(post){
            return $.inArray(post.id, bookmarksIds) !== -1
        }).value();
    return result;
}


var setBookmarked = function(bookmarkBlock){
    var postId = bookmarkBlock.data('post-id');
    var bookmarks = getBookmarksIds();
    if ($.inArray(postId, bookmarks) === -1){
        bookmarks.push(postId);
        storeBookmarks(bookmarks);
    }
    bookmarkBlock.closest('.tweet-item').addClass('bookmarked');
    bookmarkBlock.find('.bookmarks-label').text('Remove from bookmarks');
}

var setUnbookmarked = function (bookmarkBlock) {
    var postId = bookmarkBlock.data('post-id');
    var bookmarks = getBookmarksIds();
    if ($.inArray(postId, bookmarks) !== -1){
        bookmarks = _.without(bookmarks, postId)
        storeBookmarks(bookmarks);
    }
    bookmarkBlock.closest('.tweet-item').removeClass('bookmarked');
    bookmarkBlock.find('.bookmarks-label').text('Add to bookmarks');
}

var bindBookmarkActions = function(){
    $('.bookmarks-block').off().on('click tap', function () {
        if (!$(this).closest('.tweet-item').hasClass('bookmarked')) {
            // add bookmark
            setBookmarked($(this));
        } else {
            // remove bookmark
            setUnbookmarked($(this));
        }
    });
};

var loadBookmarksView = function(){
    var db = initDb();
    var posts = getBookmarkedPosts(db);
    buildPostList(posts, "#bookmarks-view .items-list");
    if (posts.length == 0) {
        $("#bookmarks-view .no-items-message").show();
    } else {
        $("#bookmarks-view .no-items-message").hide();
    }
}

var getAuthorName = function(screen_name){
    var author =  _.find(authors, {screen_name: screen_name});
    return author.name;
};

var buildPostList = function(posts, container){
    var bookmarks = getBookmarksIds();
    $(container).html('');
    $.each(posts, function(index, element){
        var authorName = getAuthorName(element.username);
        var tplBlock = $($("#tweet-item-tpl").prop("content")).find(".tweet-item-wrapper").clone();
        tplBlock.find('.author').html(authorName);
        tplBlock.find('.screen-name').html("@"+element.username);
        tplBlock.find('.subject').html(getDaySubject(element.day));
        tplBlock.find('.text').html(element.text);
        var urls = element.urls.split(",");
        var urlsContainer = tplBlock.find('.attachment-link').html('');
        $.each(urls, function(index, url){
            urlsContainer.append('<a target="_blank" href="'+url+'">'+url+'</a><br/>')
        })
        tplBlock.find('.twitter-link a').attr('href', element.permalink);
        var bookmarkBlock = tplBlock.find('.bookmarks-block');
        bookmarkBlock.attr('data-post-id', element.id);
        if ($.inArray(element.id, bookmarks) !== -1) {
            setBookmarked(bookmarkBlock);
        }
        $(container).append(tplBlock.html());
    });
    bindBookmarkActions();
}


var main = function(){
    initMenu();
    populateDaySelect();
    populateAuthorSelect();
    bindResetBtns();
    showView('search-form-view');

    var db = initDb();

    $('#search-form .submit-button').on('click tap', function (event) {
        event.preventDefault();
        var formData = getFormData($('#search-form'));

        var filters = {};
        if (formData.day){
            filters.day = parseInt(formData.day);
        }
        if (formData.author){
            filters.username = formData.author;
        }

        var results = db.get('posts')
            .filter(filters)
            .sortBy('id')
            .value();
        
        if (formData.text) {
            var textRegexp = new RegExp(formData.text, "i");
            _.remove(results, function (result) {
                return !textRegexp.test(result.text);
            });
        }
        
        buildPostList(results, "#search-results-view .items-list");
        if (results.length == 0){
            $("#search-results-view .no-items-message").show();
        } else {
            $("#search-results-view .no-items-message").hide();
        }
        showView('search-results-view');
    });
}