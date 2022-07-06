$(function($){
  
    //Find first parent of an element with class '.row'
    function getFirstRowParent (element) {
        console.log(element)
        if (element.hasClass('row')) {
            return element
        }
        return getFirstRowParent(element.parent())
    }

    //On clicking on a link, make th eimage appear
    $('a:not(.nav-link)').click((e) => {
        const link = $(e.target);
        const row = getFirstRowParent(link)
        const imageContainer = row.children('.show-image')
        imageContainer.css('display', 'block')
        imageContainer.children().removeClass('hidden')
    })

})
