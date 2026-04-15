// Used Jquery methods .load() and .clone().
// .load() is used to trigger a function when the pet image has finished loading.
// .clone() is used to create a copy of the comment template for each new activity entry in the comment log. 

$(function () { // Makes sure that your function is called once all the DOM elements of the page are ready to be used.
  var $petImage = $('.pet-image');
  
  // Used .load() here for one of my jQuery methods. 
  $petImage.load(function () {
    showNotification('Welcome', 'Woof! New Friend!');
  });
  $petImage.attr('src', buildPetImage());
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

function chooseComment(actionType) { // What princess can say when clicking one of the buttons
  if (actionType === 'treat') {
    return 'Yum! I love treats!';
  }

  if (actionType === 'play') {
    return 'Let\'s play fetch! I love fetch!';
  }

  if (actionType === 'exercise') {
    return 'I rather play than exercise, but I know it\'s good for me!';
  }
 // Added nap as last option so this acts as a default if the other options are not chosen.
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

function bouncePet() { // Helps Princess bounce when clicking one of the buttons
  $('.pet-image').removeClass('pet-bounce');
  $('.pet-image')[0].offsetWidth;
  $('.pet-image').addClass('pet-bounce');

  setTimeout(function () {
    $('.pet-image').removeClass('pet-bounce');
  }, 450);
}
// This allows the pet image to be displayed from JavaScript instead of hardcoding it in the HTML.
function buildPetImage() {
  return 'images/hound.png';
}