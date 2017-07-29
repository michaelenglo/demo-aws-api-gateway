var EMOTION_URL = 'http://demoawsapigatewaysa-dot-michaelenglo01.appspot.com';

$(function () {
	$('.eAnalyzeEmotion').on('click', function() {
		var content =  $(".postContent").text();
		console.log(content);
		var posting = $.post(EMOTION_URL + '/', {
			'text' : content
		});
	
		posting.done(function(data) {
			$('#eAnalyzeEmotion1').remove();
			$('#emotionColumn1').append("<strong> score: " + data.score + "</strong>");
		});
	});
});