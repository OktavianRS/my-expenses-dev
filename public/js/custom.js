var but = document.querySelector('.uk-button');
but.addEventListener('click', function() {
   UIkit.notify({
    message : 'Bazinga!',
    status  : 'info',
    timeout : 5000,
    pos     : 'top-center'
});
UIkit.notify('My message');
UIkit.notify("Message...", {timeout: 0}); 
});
