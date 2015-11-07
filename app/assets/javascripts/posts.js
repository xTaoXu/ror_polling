$(document).ready(function() {
    /* Handle form submit w/o page refreshing */
    $('#main-container > form').submit(function(e){
        event.preventDefault();
        var $form = $( this ),
            url = $form.attr( 'action' );
        /* Send the data using post */
        var post_name = $('#post_name').val();
        var post_description = $('#post_description').val();

        if(post_name && post_description) {
            var posting = $.post(url, {post: {name: post_name, description: post_description}});
            posting.done(function (data) {
                $('#post_name').val('');
                $('#post_description').val('');
            });
        }
        else {
            alert("Name and description fields cannot be empty.");
        }
    });

    /* reload the messages periodically */
    setInterval(function() {
        var html_string = $('#main-container > ul').html();
        var get_posts = $.get("/posts", { reload: true });
        get_posts.done(function( data ) {
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