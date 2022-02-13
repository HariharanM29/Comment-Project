/********************************************* Password SHow/Hide *********************************************************/
var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
function password_show_hide(pass,eye1,eye2) {
  var x = document.getElementById(pass);
  var show_eye = document.getElementById(eye1);
  var hide_eye = document.getElementById(eye2);
  hide_eye.classList.remove("d-none");
  if (x.type === "password") {
    x.type = "text";
    show_eye.style.display = "none";
    hide_eye.style.display = "block";
  } else {
    x.type = "password";
    show_eye.style.display = "block";
    hide_eye.style.display = "none";
  }
}
/*********************************************** Email Validation ************************************************************/
function isValidEmailAddress() {
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
/*************************** Save Login Credentials *******************************************************/
function submitform(){
	disabledalerts();
	var Email_ID = $("#Email_ID").val();
	var Password = $("#Password").val();
	var secretcode = $("#secretcode").val();
	var mailcheckval = $("#mailcheckval").val();
	if(Email_ID == "" || Email_ID == null || Email_ID == undefined)
	{
	$("#emailalert1").css("display","block");
	}
	else  if(!pattern.test(Email_ID))
	{
	$("#emailalert2").css("display","block");
	}
	else if(mailcheckval == "Exists")
		{
		$("#emailalert3").css("display","block");
		}
	else if (Password == "" || Password == null || Password == undefined)
	{
		$("#passwordalert1").css("display","block");
	}
	else if (secretcode == "" || secretcode == null || secretcode == undefined)
	{
		$("#Codealert1").css("display","block");
	}
	else
	{
		$("#spinner").css("display","block");
	 $.ajax({
         beforeSend: function (request)
         {
             request.setRequestHeader("Authorization", "Negotiate");
         },
         async : true,
         type : 'POST',
         url : projectpath+'/Usersignup',
         dataType : 'json',
         data : {
        	 Email_ID : Email_ID,Password : Password,secretcode : secretcode
         },
         success: function(data)
         {
        	 $("#spinner").css("display","none");
        	 if(data == null)
        		 {
        		 $("#failalert1").css("display","block");
        		 }
        	 else
        		 {
        		 $("#failalert2").css("display","block");
        		 var url = "../HTML/LoginPage.html";
        		 
        		 setTimeout( window.location = url, 10000);
        		 
        		
        		 }
        	 
         },
         error: function(data){
         },
         complete: function()
         {
        	 
         }
     });
}
}

/************************************************ hide Alert *************************************************************/
function disabledalerts()
{
	 $("#failalert1").css("display","none");	
	 $("#passwordalert1").css("display","none");
	 $("#emailalert1").css("display","none");
	 $("#Codealert1").css("display","none");
	 $("#spinner").css("display","none");
	 $("#emailalert3").css("display","none");
}

/************************************************ Check Mail Already Exists *************************************************************/
function Mailchecking()
{
	var Email_ID = $("#Email_ID").val();
	if(Email_ID != "" && Email_ID != null && Email_ID != undefined)
	{
	 $.ajax({
         beforeSend: function (request)
         {
             request.setRequestHeader("Authorization", "Negotiate");
         },
         async : true,
         type : 'POST',
         url : projectpath+'/Emailchecking',
         dataType : 'json',
         data : {
        	 Email_ID : Email_ID
         },
         success: function(data)
         {
        	
        	 if(data != null)
        		 {
        		 $("#emailalert3").css("display","block");
        		 $("#mailcheckval").val("Exists");
        		 }
        	 else
        		 {
        		 $("#emailalert3").css("display","none");
        		 $("#mailcheckval").val("");
        		 }
        	 
         },
         error: function(data){
         },
         complete: function()
         {
        	 
         }
     });
}

}