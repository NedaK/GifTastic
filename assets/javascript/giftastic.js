

$(document).ready(function(){


    var animals = ["owl", "cat", "bear", "hedgehog", "dog"];
    var isAnimated = false;
    // var apiKey = "uctcZpCXFUZgjrYike9UZEXV7A6u4Otj";
    // var url = "https://api.giphy.com/v1/gifs/search?api_key=uctcZpCXFUZgjrYike9UZEXV7A6u4Otj&q=" + skunk + "&limit=10&offset=0";


    function renderButtons(){
        $("#button-wrapper").empty();
        for (var i = 0; i< animals.length; i++){
        var $button = $("<button>");
        $button.addClass("gif-button");
        $button.attr("name", animals[i]);
        $button.text(animals[i]);
        $("#button-wrapper").append($button);

    }
    }
    //renderButtons();

    //$( "gif-button" ).on( "click", displayGifImg);
    // function notify() {
    //   alert( "clicked" );
    // }

    //  $(".gif-button").on("click", function(){
    //      console.log("clicked");
    //  });
        

    function displayGifImg(){
        
        var gif = $(this).attr("name");
        console.log(gif);
        var queryUrl = "https://api.giphy.com/v1/gifs/search?api_key=uctcZpCXFUZgjrYike9UZEXV7A6u4Otj&q=" + gif + "&limit=10&offset=0";


        $.ajax({
            url: queryUrl,
            method: "GET"
        }).then(function(response){
            console.log(response);
            console.log(response.data.length);
            $("#gif-display").empty();

            for(i=0; i < response.data.length; i++){
                var $imgContainer = $("<div class='img-container'>");
                var $foundGifs = $("<img>");
                $foundGifs.addClass("gif-imgs");
                $foundGifs.attr("gif", response.data[i].images.downsized_medium.url);
                $foundGifs.attr("still", response.data[i].images.downsized_still.url);

                $foundGifs.attr("index", i);
                $foundGifs.attr("src", response.data[i].images.downsized_still.url);

                var $gifRating = $("<div class='img-rating'>");
                $gifRating.text(response.data[i].rating);

                $imgContainer.append($foundGifs, $gifRating);
                $("#gif-display").append($imgContainer);
            }

            //this click event wont work unless it is inside this displayGifImg function.
            //how do i fix it so I can write it as the animate function outside of the displayGifImg function?
            $( ".gif-imgs" ).on( "click", function(){
                var animatedUrl = $(this).attr("gif");
                var stillUrl = $(this).attr("still");
                
                if (!isAnimated){
                    isAnimated = true;
                    $(this).attr("src", animatedUrl);
                    //var imgToGif = $(this).attr("gif");
                    //$(this).attr("src", imgToGif);
                    
                }
                else{
                    isAnimated = false;
                    $(this).attr("src", stillUrl);
                    // var imgToGif = $(this).attr("still");
                    // $(this).attr("src", imgToGif);
                } 
            }); 
            //////////////////////////////////////////////
        });
    }

    //$( ".gif-button" ).on( "click", displayGifImg);

    function animate(){
        var imgToGif = $(this).attr("gif");
        console.log(imgToGif);
        console.log("animate!");
        

    }

    $("#add-gif").on("click", function(event){
        event.preventDefault();
        var addedGif = $("#gif-input").val().trim();

        if (animals.indexOf(addedGif) === -1 && addedGif !== ""){
            animals.push(addedGif);
            renderButtons();
        }
        else {
            alert("That is not a valid entry!");
        }
        
        
    })

    //$( ".gif-imgs" ).on( "click", animate);

    // renderButtons();
    //displayGifImg();

    // $(".gif-imgs").on("click", function(){
    //     var imgToGif = $(this).attr("index");
    //     console.log(imgToGif);
    //     console.log("boooo");
        // $.ajax({
        //     url: "https://api.giphy.com/v1/gifs/search?api_key=uctcZpCXFUZgjrYike9UZEXV7A6u4Otj&q=skunk&limit=10&offset=0",
        //     method: "GET"
        // }).then(function(response){
        //     console.log(response);
            
        // })
    // });

    //look into what this line specifically does....code did not work without it once search was implemented....
    $(document).on("click", ".gif-button", displayGifImg);

    renderButtons();
    // displayGifImg();

    // $(".gif-imgs").on("click", animate);

});

