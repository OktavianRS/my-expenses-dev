$('.na-menu li.item').click(function() {
    $('.na-menu li').removeClass('uk-active');
    this.className = 'uk-active'; 
});