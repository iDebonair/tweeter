/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
$(document).ready(function() {
$('form').submit(submitForm)
  loadTweets();
});
  const renderTweets = function(tweets) {
    const $tweetSection = $("#tweet-section");
    $tweetSection.empty();
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
     ${$("<div>").text(tweetData.content.text).html()}
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
// Function to show the error message
const showError = function(message) {
  const $errorMessage = $('.error-message');
  $errorMessage.text(message);
  $errorMessage.addClass('show');
  $errorMessage.slideDown();
};

// Function to hide the error message
const hideError = function() {
  const $errorMessage = $('.error-message');
  $errorMessage.removeClass('show');
  $errorMessage.slideUp();
};

// To submit new tweet to on the web app, the trigger is when the tweet button is clicked
const submitForm = function (event) {
  event.preventDefault();
  const info = $(this).serialize()
  const tweetText = $("#tweet-text").val();
  $("#tweet-text").val("");

  if (tweetText.trim().length === 0) {
    errorMessage = ("No tweet is present. Please enter tweet");
    showError(errorMessage);
    return;
  }

  if (tweetText.length > 140) {
    errorMessage = ("Tweet content is too long. It has exceeded maximum character limit");
    showError(errorMessage);
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
    hideError();
  })
  .then(() => {
    loadTweets();
  })
}


// to load new tweets and pass into defined key:value pair
const loadTweets = function() {
  $.ajax({
    method: 'GET',
    url: '/tweets',
    dataType: 'json',
    success: function(tweets) {
      renderTweets(tweets);
    }
  });
};


