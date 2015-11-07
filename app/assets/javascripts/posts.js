$(document).ready(function() {

    $('#main-container > form').submit(function(e){
        event.preventDefault();

        /* get some values from elements on the page: */
        var $form = $( this ),
            url = $form.attr( 'action' );
        /* Send the data using post */
        var post_name = $('#post_name').val();
        var post_description = $('#post_description').val();
        var posting = $.post( url, {post: { name: post_name, description: post_description } } );
        debugger;

        /* Alerts the results */
        posting.done(function( data ) {
            $('#post_name').val('');
            $('#post_description').val('');
        });
    });

    $('#main-container > form > button').click(function () {
        debugger;
        event.preventDefault();
    });

    // get data every 5 mins and refresh the list

    setInterval(function() {
        debugger;
        var html_string = $('#main-container > ul').html();
        var get_posts = $.get("/posts", { reload: true });
        get_posts.done(function( data ) {
            debugger;
            var new_html_string = build_message_lists(data);
            $('#main-container > ul').html(new_html_string);
        });
    }, 1000);

    function build_message_lists(posts){
        var html_string = ''
        posts.forEach(function(post){
            html_string += "<li><span class='msgSender'><span>"+post.name+"</span><span>:</span></span><span></span><span>"
                +post.description + "</span></li>";
        });
        return html_string;
    }
});