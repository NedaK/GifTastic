

$(document).ready(function(){


    var animals = ["owl", "cat", "bear", "hedgehog", "dog"];
    //var gif = "";
    var offset = 0;

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
        
    function setGifName(){
        gif = $(this).attr("name");
        //gif = "skunk";
        console.log(gif);
        //return gif;
        offset = 0;
        displayGifImg();
    }

    function displayGifImg(){
    
    
        //var gif = $(this).attr("name");
    
        //var offset = 0;
        console.log(gif);
        console.log("Offset: " + offset);

        

       
        var queryUrl = "https://api.giphy.com/v1/gifs/search?api_key=uctcZpCXFUZgjrYike9UZEXV7A6u4Otj&q=" + gif + "&limit=10&offset=" + offset;

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
                $gifRating.text("Rating: " + response.data[i].rating);

                $imgContainer.append($foundGifs, $gifRating);
                $("#gif-display").append($imgContainer);
            }

            $("#gif-to-offset").text(gif+ " ");

            //this click event wont work unless it is inside this displayGifImg function.
            //how do i fix it so I can write it as the animate function outside of the displayGifImg function?

            $( ".gif-imgs" ).on( "click", function(){
                var animatedUrl = $(this).attr("gif");
                var stillUrl = $(this).attr("still");
                
                if($(this).attr("src")===stillUrl){
                    $(this).attr("src", animatedUrl);
                }
                else{
                    $(this).attr("src", stillUrl);
                }

               
            }); 
            //////////////////////////////////////////////

        });
       
    }


    //this function not used......
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
        
        
    });

    $("#change-offset").on("click", function(){
        //$("#gif-to-offset").text(gif);
        offset += 10;
        displayGifImg();
    });

   

    //$( ".gif-imgs" ).on( "click", animate);

    // renderButtons();
    //displayGifImg();

    

    //look into what this line specifically does....code did not work without it once search was implemented....
    $(document).on("click", ".gif-button", setGifName);
    //$(document).on("click", ".gif-button", displayGifImg);

    renderButtons();
    // displayGifImg();

    // $(".gif-imgs").on("click", animate);

});

