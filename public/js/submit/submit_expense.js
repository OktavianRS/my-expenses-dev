//$( "#expense" ).submit(function( event ) {
//  // Stop form from submitting normally
//  event.preventDefault();
//    
//    if($('#refresh').hasClass('uk-icon-spin')){
//        //do nothing
//    }else {
//        $('#refresh').toggleClass('uk-icon-refresh uk-icon-spin');
//        // Get some values from elements on the page:
//        var $form = $( this ),
//            date = $('#date').val(),
//            categorie = document.getElementById('categoryName').value,
//            what = $form.find( "input[name='what']" ).val(),
//            dollar = document.getElementById('dollar').value,
//            cent = document.getElementById('cent').value;
//
//        // Send the data using post
//        var posting = $.post("/new_expense", {date: date, categorie: categorie, what: what, dollar: dollar, cent: cent});
//        
//        // Put the results in a div
//        posting.done(function( data ) {
//            UIkit.notify('All fine', {status: 'success', timeout: 450});
//            $('#refresh').toggleClass('uk-icon-refresh uk-icon-spin');
//            document.getElementById('hiddenCategorie').value = '';
//            document.getElementById('dollar').value = '';
//            document.getElementById('cent').value = '';
//            $form.find( "input[name='what']" ).val('');
//        });
//    }
//});