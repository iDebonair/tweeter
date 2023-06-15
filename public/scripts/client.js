/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
$(document).ready(function() {
  const renderTweets = function(tweets) {
    const $tweetSection = $("#tweet-section");
    tweets.sort((a, b) => a.created_at - b.created_at);
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $tweetSection.append($tweet);
    }
  };

const createTweetElement = (tweetData) =>{
  const $tweet = `<article class="tweet-container">
  <header>
  <div class="grouped-class"> 
    <div class="group-1">
      <img src="${tweetData.user.avatars}">
      <h3>${tweetData.user.name} </h3>
    </div>
    <div class="group-2">
      ${tweetData.user.handle}
    </div>
  </div>

    <div class="group-3">
     ${tweetData.content.text}
    </div>
  </header> 
  <footer>
    <p>${formatDate(tweetData.created_at)}</p>
    <div class="tweet-icons">
    <i class="fa-solid fa-heart"></i>
      <i class="fas fa-retweet"></i>
      <i class="fas fa-share"></i>
    </div>
  </footer>
</article>`

return $tweet;
}

// format date of tweet to reflect in days
const formatDate = function(timestamp) {
  const currentDate = new Date();
  const tweetDate = new Date(timestamp);
  const diffInDays = Math.floor((currentDate - tweetDate) / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) {
    return "Today";
  } else if (diffInDays === 1) {
    return "Yesterday";
  } else {
    return `${diffInDays} days ago`;
  }
};
// To submit new tweet to on the web app, the trigger is when the tweet button is clicked
$('form').on ('submit', function(event){
  // to prevent the web app from automatically loading another url, default should be prevented.
  event.preventDefault();
  const info = $(this).serialize()
  const tweetText = $("#tweet-text").val();
  $("#tweet-text").val("");

  if (tweetText.trim().length === 0) {
    alert("No tweet is present. Please enter tweet");
    return;
  }

  if (tweetText.length > 140) {
    alert("Tweet content is too long. It has exceeded maximum character limit");
    return;
  }

  // send new post to server
  $.ajax({
    method: 'POST',
    url: '/tweets',
    data: info
  })
  .then(response =>{
    console.log(response)
    loadTweets();
  })
})

// to load new tweets and pass into defined key:value pair
const loadTweets = function() {
  $.ajax({
    method: 'GET',
    url: 'http://localhost:8080/tweets',
    dataType: 'json',
    success: function(tweets) {
      renderTweets(tweets);
    }
  });
};
loadTweets();
})