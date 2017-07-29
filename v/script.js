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
			$('#emotionColumn' + index).append("<strong> Score: " + data.score + "</strong>");
		});
	});
});