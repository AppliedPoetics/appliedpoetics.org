function powerball() {
	var balls = []
	var powerball = "";
	if(balls.length<5)
	{
		$.ajax({
			dataType: 'json',
			url: "https://data.ny.gov/api/views/d6yy-54nr/rows.json",
			success: function (data) {
				var obj = data;
					balls = obj.data[0][9].split(" ");
					powerball = balls[5].toString();
					balls.splice(-1,1);
					$('#powerball').html(balls.join(" ") + " <div style = 'color:#d72e27; display: inline-block;'>"+powerball+"</div>");
			}
		});
	} else {
		$('#powerball').html(balls + ",<div style = 'color: #d72e27; display: inline-block;'>"+powerball+"</div>");
	}
}