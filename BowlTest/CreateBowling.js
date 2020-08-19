function clearValues(form) {
	for (var i = 0; i <= 20; i++)  
	{
		form.ball[i].value = "";
	}
	for (var i = 0; i < 10; i++) 
	{
		form.score[i].value = "";
	}
	for (var frame = 0; frame < 11; frame++)  
	{
		for (var pin = 1; pin < 11; pin++) {
			imgName = form.name + frame + pin;
			
		}
	}
	form.maxScore.value = "300"; 
	form.player.value = ""; 
}

function displayTable(formname) {
	document.write("<form name='" + formname + "' onSubmit='return false'>");
	document.write("<table><tr><td style='padding: 10px;'><input name='player' type='text' size='30' value='" + formname + "'/></td></tr></table>");
	document.write("<table><tr>");
	for (var i = 1; i <= 10; i++) {
		document.write("<td colspan='2' id='frame'>" + i + "</td>");
	}
	document.write("</tr><tr>");
	for (var i = 0; i <= 20; i++) {
		document.write("<td><input type='text' name='ball' size='1' maxLength='1' onChange='calculate(" + formname + ")' /></td>");
	}
	document.write("<td>&nbsp;</td><td>Max Score</td></tr><tr>");

	for (var i = 0; i < 10; i++) {
		document.write("<td colspan='2'><input type='text' name='score' size='7' readOnly='true' /></td>");
	}
	document.write("<td colspan='2'>&nbsp;</td><td><input type='text' name='maxScore' size='8' readOnly='true' value='300'/></td></tr>");


	document.write("</tr>");
	document.write("<tr><td colspan='4' id='tip'><input style='font-weight: normal;' type='button' name='clear' value='Reset' onClick='clearValues(" + formname + ")' /></td></tr></table>");
	document.write("</form>");
}

function calculate(form) {
	var nextBall = "";
	var thirdBall = "";
	var totalScore = 0;  
	for (var i = 0; i < 10; i++)  
	{
		form.score[i].value = "";
	}

	
	for (var i = 0; i <= 18; i++)  
	{
		if (form.ball[i].value == '-') 
			form.ball[i].value = '0';
		fieldValue = form.ball[i].value;
		if (i % 2 == 0 && fieldValue != '0' && fieldValue != '1' && fieldValue != '2' && fieldValue != '3' && fieldValue != '4' && fieldValue != '5' && fieldValue != '6' && fieldValue != '7' && fieldValue != '8' && fieldValue != '9' && fieldValue.toLowerCase() != 'x')
			form.ball[i].value = ""; 
		if (i % 2 != 0 && fieldValue != '0' && fieldValue != '1' && fieldValue != '2' && fieldValue != '3' && fieldValue != '4' && fieldValue != '5' && fieldValue != '6' && fieldValue != '7' && fieldValue != '8' && fieldValue != '9' && fieldValue != '/')
			form.ball[i].value = ""; 
	}
	
	for (var i = 19; i <= 20; i++) {
		if (form.ball[i].value == '-')
			form.ball[i].value = '0';
		fieldValue = form.ball[i].value;
		if (fieldValue != '0' && fieldValue != '1' && fieldValue != '2' && fieldValue != '3' && fieldValue != '4' && fieldValue != '5' && fieldValue != '6' && fieldValue != '7' && fieldValue != '8' && fieldValue != '9' && fieldValue != '/' && fieldValue != 'x')
			form.ball[i].value = "";
	}
	

	for (var j = 0; j <= 18; j += 2)  
	{
		var frameScore = 0;  
		var shouldDisplay = false;  

		
		if (form.ball[j].value.toLowerCase() == 'x') 
		{
			frameScore += 10;
			if (j < 16)  
			{
				if (form.ball[j + 1].value != '')		
					form.ball[j + 1].value = '';			  
				nextBall = form.ball[j + 2].value;   
				if (nextBall.toLowerCase() == 'x')  
					thirdBall = form.ball[j + 4].value; 
				else
					thirdBall = form.ball[j + 3].value;  
			}
			if (j == 16)  
			{
				nextBall = form.ball[j + 2].value;  
				thirdBall = form.ball[j + 3].value; 
			}
			if (j == 18) 
			{
				nextBall = form.ball[j + 1].value;  
				thirdBall = form.ball[j + 2].value; 
			}
			if (nextBall != '' && thirdBall != '') 
			{
				if (nextBall.toLowerCase() == 'x')  
				{
					frameScore += 10;
					if (thirdBall.toLowerCase() == 'x') 
						frameScore += 10;
					else
						frameScore += parseInt(thirdBall); 
				}
				else  
				{
					if (thirdBall == '/')  
					{
						frameScore += 10;
					}
					else  
					{
						frameScore += parseInt(nextBall);
						frameScore += parseInt(thirdBall);
					}
				}
				shouldDisplay = true;
			}
		}
		else if (form.ball[j].value != '' && form.ball[j + 1].value != '')  
		{
			if (form.ball[j + 1].value == '/')  
			{
				frameScore += 10;
				if (form.ball[j + 2].value != '')  
				{
					if (form.ball[j + 2].value.toLowerCase() == 'x')  
					{
						frameScore += 10;
						shouldDisplay = true;
					}
					else											
					{
						frameScore += parseInt(form.ball[j + 2].value);
						shouldDisplay = true;
					}
				}
			}
			else								
			{
				frameScore += parseInt(form.ball[j].value);
				frameScore += parseInt(form.ball[j + 1].value);
				shouldDisplay = true;
			}
		}
		totalScore += frameScore;  
		if (shouldDisplay)  
		{
			k = j / 2;  
			form.score[k].value = totalScore;
			form.maxScore.value = ((9 - k) * 30) + totalScore;  
		}
	}
}

function collapse(element) {
	if (document.getElementById) 
		var state = document.getElementById(element).style.display;
	else if (document.all)      
		var state = document.all[element].style.display;

	if (state == "none")
		state = "block";
	else
		state = "none";

	if (document.getElementById)
		document.getElementById(element).style.display = state;
	else if (document.all)
		document.all[element].style.display = state;
}