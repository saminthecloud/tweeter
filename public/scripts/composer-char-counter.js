$(document).ready(function() {
    $("textarea").keyup(function() {
        const tweetLength = $(this).val().length; 
        $(".counter").text(140-tweetLength);
        if (tweetLength > 140) {
            $('.counter').css("color", "red");
        } else {
            $('.counter').css("color", "black");
        }
    })
}); 