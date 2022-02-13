/************************************************** Show/Hide Password **********************************************************/
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
/*************************** Check Login Credentials *******************************************************/
function submitform(){
	disabledalerts();
	var Email_ID = $("#Email_ID").val();
	var Password = $("#Password").val();

	if(Email_ID == "" || Email_ID == null || Email_ID == undefined)
		{
		$("#emailalert1").css("display","block");
		}
	else if (Password == "" || Password == null || Password == undefined)
	{
		$("#passwordalert1").css("display","block");
	}
	else
		{
		$("#emailalert1").css("display","none");
		$("#passwordalert1").css("display","none");
		$("#spinner").css("display","block");
	 $.ajax({
         beforeSend: function (request)
         {
             request.setRequestHeader("Authorization", "Negotiate");
         },
         async : true,
         type : 'POST',
         url : projectpath+'/Userlogin',
         dataType : 'json',
         data : {
        	 Email_ID : Email_ID,Password : Password
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
        		 var url = "../HTML/Comments.html";
        		 window.location = url;
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
	 $("#secretalert1").css("display","none");
	 $("#spinner").css("display","none");
}
/************************************************* Forgot Password *************************************************/
function findpassword(Email_IDval,secvalue)
{

	disabledalerts();
	var Email_ID = $("#Email_ID").val();
	var secvalue = $("#secretcode").val();

	if(Email_ID == "" || Email_ID == null || Email_ID == undefined)
		{
		$("#emailalert1").css("display","block");
		}
	else
		{
		if(secvalue != "" && secvalue != null && secvalue != undefined)
			{
		
	 $.ajax({
         beforeSend: function (request)
         {
             request.setRequestHeader("Authorization", "Negotiate");
         },
         async : true,
         type : 'POST',
         url : projectpath+'/Forgotpassword',
         dataType : 'json',
         data : {
        	 Email_ID : Email_ID,SecretCode : secvalue
         },
         success: function(data)
         {
        	 if(data != null)
        		 {
        		 $.each(data.Forgotlogin,function(i,j){
        			 var Password = j.Password;
        			 $("#Password").val(Password);
        			 $("#signin").click();
        		 });
        		 }
        	 else
        		 {
        		 $("#secretalert1").css("display","block");
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
}