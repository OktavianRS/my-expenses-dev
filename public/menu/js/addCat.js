function newCat() {
    UIkit.modal.prompt("Category name:", '', function(newvalue){
        $.post('/new_category/' + newvalue);
    });
}