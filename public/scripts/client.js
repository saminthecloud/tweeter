/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

  
  const createTweetElement = function(tweet) {
    let $tweet = 
    `<article class="tweet">
    <header>
      <img class="user-pic" src="${tweet.user.avatars}"/>
      <span class="tweet-name">${tweet.user.name}</span>
      <span class="tweet-handle">${tweet.user.handle}</a></span>
    </header>
    <p class="tweet-text">${tweet.content.text}</p>
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
    for (let tweet of tweets) {
        $(".tweets-container").prepend(createTweetElement(tweet));
    }
  }

  $(document).ready(() => {
    renderTweets(data);
})


$("#target").submit( function (event) {
    event.preventDefault();
    $.post("/tweets", $("#target").serialize(), (data) => {
        $('#tweet-text').val("")
    })
    })
