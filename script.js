$(function () { // Makes sure that your function is called once all the DOM elements of the page are ready to be used.
  
  // When the page loads, we want to set the pet image and show a welcome message.
  $('.pet-image')
    .attr('src', buildPetImage())
    .load(function () {
      showNotification('Welcome', 'Woof! I am Princess, and I am ready to play.');
  });
  // Called function to update the name, happiness, and weight of our pet in our HTML
  checkAndUpdatePetInfoInHtml();

  // When each button is clicked, it will "call" function for that button (functions are below)
  $('.treat-button').click(clickedTreatButton);
  $('.play-button').click(clickedPlayButton);
  $('.exercise-button').click(clickedExerciseButton);
  $('.nap-button').click(clickedNapButton);
});

// Add a variable "pet_info" equal to a object with the name (string), weight (number), and happiness (number) of your pet
var pet_info = {
  name: 'Princess',
  weight: 12,
  happiness: 8,
  energy: 6
};

function buildPetImage() {
  return 'images/hound.png';
}

function clickedTreatButton() {
  pet_info.happiness += 1; // Increase pet happiness
  pet_info.weight += 1; // Increase pet weight
  pet_info.energy += 1; // Increase pet energy
  reactToAction('Treat', chooseComment('treat'));
}

function clickedPlayButton() {
  pet_info.happiness += 2; // Increase pet happiness
  pet_info.weight -= 1; // Decrease pet weight
  pet_info.energy -= 1; // Decrease pet energy
  reactToAction('Play', chooseComment('play'));
}

function clickedExerciseButton() {
  pet_info.happiness -= 1; // Decrease pet happiness
  pet_info.weight -= 2; // Decrease pet weight
  pet_info.energy -= 1; // Decrease pet energy
  reactToAction('Exercise', chooseComment('exercise'));
}

function clickedNapButton() {
  pet_info.energy += 3; // Increase pet energy
  pet_info.happiness += 1; // Increase pet happiness
  reactToAction('Nap', chooseComment('nap'));
}

function reactToAction(actionName, commentText) {
  checkAndUpdatePetInfoInHtml();
  showNotification(actionName, commentText);
  bouncePet();
}

function checkAndUpdatePetInfoInHtml() {
  checkPetStatsBeforeUpdating();
  updatePetInfoInHtml();
}

function checkPetStatsBeforeUpdating() {
  // Add conditional so if weight is lower than zero.
  if (pet_info.weight < 0) {
    pet_info.weight = 0;
  }

  if (pet_info.happiness < 0) {
    pet_info.happiness = 0;
  }

  if (pet_info.energy < 0) {
    pet_info.energy = 0;
  }
}

// Updates your HTML with the current values in your pet_info object
function updatePetInfoInHtml() {
  $('.name').text(pet_info.name);
  $('.weight').text(pet_info.weight);
  $('.happiness').text(pet_info.happiness);
  $('.energy').text(pet_info.energy);
  $('.mood').text(determineMood());
}

function determineMood() {
  if (pet_info.energy <= 2) {
    return 'Sleepy';
  }

  if (pet_info.happiness <= 2) {
    return 'Grumpy';
  }

  if (pet_info.happiness >= 12) {
    return 'Ecstatic';
  }

  return 'Happy';
}

function chooseComment(actionType) {
  if (actionType === 'treat') {
    return 'Yum! Snacks make my tail wag faster.';
  }

  if (actionType === 'play') {
    return 'That was fun. I feel lighter on my paws!';
  }

  if (actionType === 'exercise') {
    return 'Whew. Cardio is tough, but I know it helps.';
  }

  return 'Best nap ever. My energy meter is back up!';
}

function showNotification(actionName, commentText) {
  $('.pet-comment').hide().text(commentText).fadeIn(200);

  // jQuery .clone() copies the hidden template so each activity entry
  // keeps the same structure and styling without rebuilding the HTML.
  var historyItem = $('.comment-template').clone();

  historyItem.removeClass('comment-template hidden');
  historyItem.find('.comment-action').text(actionName + ': ');
  historyItem.find('.comment-text').text(commentText);

  $('.comment-log').prepend(historyItem);
  $('.comment-log .comment-entry').slice(5).remove();
}

function bouncePet() {
  $('.pet-image').removeClass('pet-bounce');
  $('.pet-image')[0].offsetWidth;
  $('.pet-image').addClass('pet-bounce');

  setTimeout(function () {
    $('.pet-image').removeClass('pet-bounce');
  }, 450);
}