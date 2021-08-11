let navlinks = $('.navbar-nav .nav-link')

navlinks.click((ev) => {
  // console.log($(ev.target).attr('data-component'))
  let componentUrl = `/components/${$(ev.target).attr('data-component')}.html`
  // here, we've built the name of the component respective to the button clicked

  $('#content').load(componentUrl)
})

// .attr('data-component') extracts those attributes of the button written in the ' data-component = "???" ' 
// in order to identify the buttons.