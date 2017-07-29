var SENTIMENT_URL = 'https://demoawsapigatewaysa-dot-michaelenglo01.appspot.com';
var EMOJI_URL = 'https://demoawsapigatewayemoji-dot-michaelenglo01.appspot.com';

$(function () {
	$('.analyzeEmotion').on('click', function() {
		var index = parseInt($(this).attr('id').replace("analyzeEmotion",""));
		
		var content =  $("#postContent" + index).text().trim();
		console.log("sending content to: " + SENTIMENT_URL +
					"\nwith parameter : " + content
			);
		var posting = $.post(SENTIMENT_URL + '/', {
			'text' : content
		});
	
		posting.done(function(data) {
			var pScore = ((data.score + 1)/2).toFixed(2);
			var nScore = (1 - pScore).toFixed(2);
			var neuScore = (data.magnitude + 1).toFixed(2);

			$('#analyzeEmotion' + index).remove();
			$('#emotionColumn' + index).append('<img src="' + EMOJI_URL + '/?score=' + pScore + '&magnitude=' + neuScore + 
				'" height="150px" width="150px">');

			if (pScore > 0.67)
				$('#emotionColumn' + index).append('<strong><h3 style="color : green;">Positive</h3></strong>');
			else if (pScore > 0.33)
				$('#emotionColumn' + index).append('<strong><h3 style="color : grey;">Neutral</h3></strong>');
			else
				$('#emotionColumn' + index).append('<strong><h3 style="color : red;">Negative</h3></strong>');


			$('#emotionColumn' + index).append('<strong><p style="color : green;"> Positivity:' + pScore+ '</p></strong>');
			$('#emotionColumn' + index).append('<strong><p style="color : red;"> Negativity:' + nScore + '</p></strong>');
		});
	});
});