/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  

  const createTweetElement = function(tweet) {
    let $tweet = 
    `<article class="tweet">
    <header>
      <img class="user-pic" src="${tweet.user.avatars}"/>
      <span class="tweet-name">${tweet.user.name}</span>
      <span class="tweet-handle">${tweet.user.handle}</a></span>
    </header>
    <p class="tweet-text">${escape(tweet.content.text)}</p>
    <footer>
      <span class="date-tweeted">${timeago.format(tweet.created_at)}</span>
      <span class="actions">
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-retweet"></i>
        <i class="fa-solid fa-heart"></i>
      </span>
    </footer>
  </article>`
    return $tweet;
  }   

  const renderTweets = function(tweets) {
    $('.tweets-container').val("");
    for (let tweet of tweets) {
        $(".tweets-container").prepend(createTweetElement(tweet));
    }
  }

  const renderNewTweet = function(tweets) {
    $('.tweets-container').val("");
    $(".tweets-container").prepend(createTweetElement(tweets[tweets.length - 1]));
    
  }

  const loadTweets = function(showTweets) {
      $.get("/tweets", {}, function(data, textStatus, jqXHR) {
        if (textStatus === 'success') {
            showTweets(data);
            console.log('Status:', textStatus);
            console.log("Data:", data);
        } else alert ("Error retrieving tweets. Status code:", textStatus);
        
      })
  }

  $(document).ready(() => {
    $('#error-message').hide();
    $(".tweets-container").val("");
    loadTweets(renderTweets);

    $("#target").submit( function (event) {
        event.preventDefault();
        if ($('#tweet-text').val().length === 0) {
            $('#error-message').text("Empty tweet!");
            $('#error-message').show();
        } else if ($('#tweet-text').val().length > 140) {
            $('#error-message').text("Tweet is more than 140 characters!");
            $('#error-message').show();
        } else {
            $.post("/tweets", $("#target").serialize(), (data) => {
                $('#tweet-text').val("");
                $('#error-message').hide();
                $(".tweets-container").val("");
                loadTweets(renderNewTweet);
            })
        }
    })
})
