var EMOTION_URL = 'http://demoawsapigatewaysa-dot-michaelenglo01.appspot.com';

$(function () {
	$('.analyzeEmotion').on('click', function() {
		var index = parseInt($(this).attr('id').replace("analyzeEmotion",""));
		
		var content =  $("#postContent" + index).text();
		console.log("sending content to: " + EMOTION_URL +
					"\nwith parameter : " + content
			);
		var posting = $.post(EMOTION_URL + '/', {
			'text' : content
		});
	
		posting.done(function(data) {
			$('#analyzeEmotion' + index).remove();
			$('#emotionColumn' + index).append('<strong><p style="color : green;"> Positivity:' + ((data.score + 1)*100/2)  + '</p></strong>');
			$('#emotionColumn' + index).append('<strong><p style="color : red;"> Negativity:' + (100 - (data.score + 1)*100/2) + '</p></strong>');
		});
	});
});