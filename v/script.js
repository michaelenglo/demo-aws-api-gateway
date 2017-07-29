var EMOTION_URL = 'http://demoawsapigatewaysa-dot-michaelenglo01.appspot.com';

$(function () {
	$('.analyzeEmotion').on('click', function() {
		var index = parseInt($(this).attr('id').replace("analyzeEmotion",""));
		
		var content =  $("#postContent" + index).text().trim();
		alert(content);
		console.log("sending content to: " + EMOTION_URL +
					"\nwith parameter : " + content
			);
		var posting = $.post(EMOTION_URL + '/', {
			'text' : content
		});
	
		posting.done(function(data) {
			var pScore = ((data.score + 1)/2).toFixed(2);
			var nScore = (1 - pScore).toFixed(2);
			var neuScore = data.magnitude.toFixed(2);

			$('#analyzeEmotion' + index).remove();
			$('#emotionColumn' + index).append('<strong><p style="color : green;"> Positivity:' + pScore+ '</p></strong>');
			$('#emotionColumn' + index).append('<strong><p style="color : red;"> Negativity:' + nScore + '</p></strong>');
			$('#emotionColumn' + index).append('<strong><p style="color : grey;"> Neutrality:' + neuScore + '</p></strong>');
		});
	});
});