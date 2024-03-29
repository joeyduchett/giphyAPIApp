$(document).ready(function () {
    const buttonArray = ["yes", "no", "maybe", "hmm", "run", "clapping", "nope", "dance", "laugh"];
    for (let i = 0; i < buttonArray.length; i++) {
        $(".grid-buttons").append("<button type='button' class='btn'>" + buttonArray[i] + "</button>");
    };

    $("input[type=button]").on('click', function () {
        event.preventDefault();
        if ($("input[type=text]").val().trim() === "") {
            return;
        }
        //    console.log("submit was clicked")
        const newBtn = $("input[type=text]").val().trim();
        $(".grid-buttons").append("<button type='button' class='btn'>" + newBtn + "</button>");
        $("form")[0].reset();
    });

    $('.grid-buttons').on('click', ".btn", function (){
        console.log(this + " has been clicked")
        $(".grid-gif-holder").empty();
        let search = $(this).text();
        let queryURL = "https://api.giphy.com/v1/gifs/search?api_key=cNpllW0hS2ijH350IhtE3CNhk869bpVi&q=" + search + "&limit=10&rating=PG-13&lang=en"
        console.log(queryURL);

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                console.log(response);
                for (var i = 0; i < response.data.length; i++)
                    $(".grid-gif-holder").append("<img src=" + '"' + response.data[i].images.fixed_height_still.url + '"' + "class='gif'>" + "</img>");
            });
    });
    $('.grid-gif-holder').on('click', '.gif', function() {
        let src = $(this).attr("src");
      if($(this).hasClass('playing')){
         //stop
         $(this).attr('src', src.replace(/\.gif/i, "_s.gif"))
         $(this).removeClass('playing');
      } else {
        //play
        $(this).addClass('playing');
        $(this).attr('src', src.replace(/\_s.gif/i, ".gif"))
      }
    });
    
});