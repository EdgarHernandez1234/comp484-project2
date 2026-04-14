$(function() { // Makes sure that your function is called once all the DOM elements of the page are ready to be used.
    var welcomeMessageShown = false 
  
    // Called function to update the name, happiness, and weight of our pet in our HTML
  $('.pet-image').attr('src', buildPetImage());
  checkAndUpdatePetInfoInHtml()
    // When each button is clicked, it will "call" function for that button (functions are below)
  $('.treat-button').click(clickedTreatButton)
  $('.play-button').click(clickedPlayButton)
  $('.exercise-button').click(clickedExerciseButton)
  $('.nap-button').click(clickedNapButton)
  })
  
    // Add a variable "pet_info" equal to a object with the name (string), weight (number), and happiness (number) of your pet
    var pet_info = {name: 'Princess', weight: 12, happiness: 8,energy: 6}
  
function clickedTreatButton() {
  pet_info.happiness += 1
  pet_info.weight += 1
  pet_info.energy += 1

  reactToAction('Treat', chooseComment('treat'))
}

function clickedPlayButton() {
  pet_info.happiness += 2
  pet_info.weight -= 1
  pet_info.energy -= 1

  reactToAction('Play', chooseComment('play'))
}

function clickedExerciseButton() {
  pet_info.happiness -= 1
  pet_info.weight -= 2
  pet_info.energy -= 1

  reactToAction('Exercise', chooseComment('exercise'))
}

function clickedNapButton() {
  pet_info.energy += 3
  pet_info.happiness += 1

  reactToAction('Nap', chooseComment('nap'))
}

function reactToAction(actionName, commentText) {
  checkAndUpdatePetInfoInHtml()
  showNotification(actionName, commentText)
  bouncePet()
}

function checkAndUpdatePetInfoInHtml() {
  checkPetStatsBeforeUpdating()
  updatePetInfoInHtml()
}

function checkPetStatsBeforeUpdating() {
  // These conditionals fix the key bug from the starter code by keeping
  // all changing values from dropping below zero.
  if (pet_info.weight < 0) {
    pet_info.weight = 0
  }

  if (pet_info.happiness < 0) {
    pet_info.happiness = 0
  }

  if (pet_info.energy < 0) {
    pet_info.energy = 0
  }
}

function updatePetInfoInHtml() {
  $('.name').text(pet_info.name)
  $('.weight').text(pet_info.weight)
  $('.happiness').text(pet_info.happiness)
  $('.energy').text(pet_info.energy)
  $('.mood').text(determineMood())
}

function determineMood() {
  if (pet_info.energy <= 2) {
    return 'Sleepy'
  }

  if (pet_info.happiness <= 2) {
    return 'Grumpy'
  }

  if (pet_info.happiness >= 12) {
    return 'Ecstatic'
  }

  return 'Happy'
}

function chooseComment(actionType) {
  if (actionType === 'treat') {
    return 'Yum! Snacks make my tail wag faster.'
  }

  if (actionType === 'play') {
    return 'That was fun. I feel lighter on my paws!'
  }

  if (actionType === 'exercise') {
    return 'Whew. Cardio is tough, but I know it helps.'
  }

  return 'Best nap ever. My energy meter is back up!'
}
    
    // Updates your HTML with the current values in your pet_info object
function updatePetInfoInHtml() {
  $('.name').text(pet_info.name)
  $('.weight').text(pet_info.weight)
  $('.happiness').text(pet_info.happiness)
  $('.energy').text(pet_info.energy)
  $('.mood').text(determineMood())
}

function determineMood() {
  if (pet_info.energy <= 2) {
    return 'Sleepy'
  }

  if (pet_info.happiness <= 2) {
    return 'Grumpy'
  }

  if (pet_info.happiness >= 12) {
    return 'Ecstatic'
  }

  return 'Happy'
}

function chooseComment(actionType) {
  if (actionType === 'treat') {
    return 'Yum! Snacks make my tail wag faster.'
  }

  if (actionType === 'play') {
    return 'That was fun. I feel lighter on my paws!'
  }

  if (actionType === 'exercise') {
    return 'Whew. Cardio is tough, but I know it helps.'
  }

  return 'Best nap ever. My energy meter is back up!'
}

function showNotification(actionName, commentText) {
  $('.pet-comment').hide().text(commentText).fadeIn(200)

  // jQuery .clone() is the second requested extra method.
  // I copy the hidden template so every action creates a new styled
  // notification card without rebuilding the HTML from scratch.
  var historyItem = $('.comment-template').clone()

  historyItem.removeClass('comment-template hidden')
  historyItem.find('.comment-action').text(actionName + ': ')
  historyItem.find('.comment-text').text(commentText)

  $('.comment-log').prepend(historyItem)
  $('.comment-log .comment-entry').slice(5).remove()
}

function bouncePet() {
  $('.pet-image').removeClass('pet-bounce')

  // Reading offsetWidth forces the browser to restart the CSS animation
  // so the bounce effect plays every time a button is pressed.
  $('.pet-image')[0].offsetWidth

  $('.pet-image').addClass('pet-bounce')

  setTimeout(function () {
    $('.pet-image').removeClass('pet-bounce')
  }, 450)
}

function buildPetImage() {
  return 'images/hound.jpg'
}