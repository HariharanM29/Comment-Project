/*********************************************** Email Validation ************************************************************/
function isValidEmailAddress() {
	var pattern = /\S+@\S+\.\S+/;
	var emailAddress = $("#Email_ID").val();
    if(emailAddress != "" && emailAddress != null && emailAddress != undefined)
    	{
    	
    if(pattern.test(emailAddress))
    	{
    	$("#emailalert2").css("display","none");
    	}
    else
    	{
    	$("#emailalert2").css("display","block");
    	}
    	}
    else
    	{
    	$("#emailalert2").css("display","none");
    	}
}




















