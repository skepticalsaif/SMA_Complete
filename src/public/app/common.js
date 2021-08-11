$(() => {

  $('#navbar').load('components/navbar.html', loginIfNeeded)
  $('#footer').load('components/footer.html')
  $('#content').load('components/all-posts.html')  // this contains it's own scripts too

  // loginIfNeeded() not here, because if this function gets loaded before the upper .html files then no output will be produced,
  // but if it is provided as a callback after navbar.html then it will be loaded only after navbar.html has loaded and no aync problems will arise.
  // refer to [ .load() ] function of jQuery for more info.
  // loginIfNeeded is provided as a complete parameter in above function.

})

function loginIfNeeded() {
  // setting the currentUser varibale as window.currentUser instead of let currentUser makes this variable 
  // available as an object in the browser console
  // this could make this varibale available to other functions
  window.currentUser = window.localStorage.user ? JSON.parse(window.localStorage.user) : null
  if (!currentUser) {

    $.post('/api/users', {}, (user) => {
      if (user) {
        console.log('registered current user as ', user.username)
        window.localStorage.user = JSON.stringify(user)
        currentUser = user
        $('#nav-username').text(currentUser.username)
      }
    })
  } else {
    console.log('resuming session as ', currentUser.username)
    $('#nav-username').text(currentUser.username)

  }
}

