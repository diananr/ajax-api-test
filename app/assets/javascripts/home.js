$(function() {
    
    var $addMusic = $("#new_music"),
        $musicList = $("#music_list").find("tbody"),
        $deleteMusic = $(".music_delete"),
        $status = $(".status"),
        $noMusic = $(".no_music")
        addAPIPath = $addMusic.attr("action");
        
    var template = "<tr>";
        template += "<td>{{title}}</td>";
        template += "<td>{{artist}}</td>";
        template += "<td>{{year}}</td>";
        template += "<td>{{genre}}</td>";
        template += "<td><a class='music_delete' data-method='delete' href='/musics/{{id}}'>x</a></td>";
        template += "</tr>"
    
    var  manageStatus = function (message, doShow) {
        $status.text(message);
        doShow ? $status.fadeIn(10, "linear") : $status.fadeOut(4000, "linear");
    };
    
    var addSong = function (event) {
        event.preventDefault();
        event.stopImmediatePropagation();
        
        var nohayvacios = true;
    	var correcto = true;
    	var mensaje = "Invalid";
    
    	if ($("#music_title").val()==0 || $("#music_artist").val()==0 ||
    		$("#music_year").val()==0 || $("#music_genre").val()==0){
    		nohayvacios = false;
    		var mensaje = "Llene los campos ";
    		$(".errors").append(mensaje).addClass("alert alert-danger");
    	}
    
    	if (nohayvacios) {
    		if ($("#music_title").val().trim().length > 40){
    			correcto =  false;
    			var mensaje = "Invalid title";
    			$(".errors").append(mensaje).addClass("alert alert-danger");
    		}
    		if ($("#music_artist").val().trim().length > 60){
    			correcto =  false;
    			var mensaje = "Invalid artist";
    			$(".errors").append(mensaje).addClass("alert alert-danger");
    		}
    		if ($("#music_genre").val().trim().length > 30){
    			correcto =  false;
    			var mensaje = "Invalid genre";
    			$(".errors").append(mensaje).addClass("alert alert-danger");
    		}
    		if ($("#music_year").val() < 1899 || $("#music_year").val() > 2017){
    			correcto = false;
    			var mensaje = "Invalid year";
    			$(".errors").append(mensaje).addClass("alert alert-danger");
    		}
    	}
    	
    	if(correcto){
    	    $("#music_list").removeClass("hidden");
    	    $(".no_music").addClass("hidden");
    	    var song = {
                title: $("#music_title").val(),
                artist: $("#music_artist").val(),
                year: $("#music_year").val(),
                genre: $("#music_genre").val()
            };
            
            manageStatus("Status: Sending request...", true);
            
            $.ajax({
                url: addAPIPath,
                type: 'post',
                dataType: 'json',
                data: song,
                success: function (response) {
                    $musicList.append(template.replace("{{title}}", response.title)
                                              .replace("{{artist}}", response.artist)
                                              .replace("{{year}}", response.year)
                                              .replace("{{genre}}", response.genre)
                                              .replace("{{id}}", response.id));
                                              
                                              
                    manageStatus("Status: OK", false);
                },
                error: function (error) {
                    manageStatus("Status: Request Failed", false);
                }
            });
    	}
    };
    
    var deleteSong = function (event) {
        event.preventDefault();
        event.stopImmediatePropagation();
        
        $(this).parent().parent().remove();
    };
    
    var init = function () {
        $addMusic.submit(addSong);
        $deleteMusic.click(deleteSong);
    };
    
    init();
    
});