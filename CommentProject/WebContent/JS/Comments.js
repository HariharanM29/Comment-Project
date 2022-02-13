/**************************************** Calling Filter Function to Get All Comment**************************************/
$(document).ready(function(){
	Filtercomments("All");
});

/****************************************************** Save User Comments ****************************************************/
function Savecomments(){
	var comments = $("#comments").val();
	
	if(comments == "" || comments == null || comments == undefined)
	{
		$("#textalert1").css("display","block");
	}
	else
		{
		$("#spinner1").css("display","block");
	 $.ajax({
         beforeSend: function (request)
         {
             request.setRequestHeader("Authorization", "Negotiate");
         },
         async : true,
         type : 'POST',
         url : projectpath+'/Savecomments',
         dataType : 'text',
         data : {
        	 comments : comments
         },
         success: function(data)
         {
        	 $("#spinner1").css("display","none");
        	 $("#comments").val("");
        	var dataspliter = data.split("&#");
        	
        	 if(dataspliter[0] == "Success")
        		 {
        		 $("#successalert1").css("display","block");
        		 Filtercomments("All");
        		 }
        	 else
        		 {
        		 $("#successalert2").css("display","block");
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
/******************************************************Filter User Comments ******************************************/
function Filtercomments(filterval){
	
	if(filterval != "" && filterval != null && filterval != undefined)
		{
	 $.ajax({
         beforeSend: function (request)
         {
             request.setRequestHeader("Authorization", "Negotiate");
         },
         async : true,
         type : 'POST',
         url : projectpath+'/Filtercomments',
         dataType : 'json',
         data : {
        	 filterval : filterval
         },
         success: function(data)
         {
        	 $("#commentssec").empty();
        	 
        	 if(data == null)
        		 {
        		 $("#commentssec").append("<tr><td colspan='2'>No Comments</td></tr>");
        		 }
        	 else
        		 {
        		
        		 $.each(data.Comments,function(i,j){
        			 var User_ID = j.User_ID;
        			 var Comments = j.Comments;	 
        			 $("#commentssec").append("<tr><td>"+User_ID+"</td><td>"+Comments+"</td></tr>");
        		 });
        		 
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
	 $("#textalert1").css("display","none");
	 $("#failalert1").css("display","none");
	 $("#successalert1").css("display","none");
	 $("#successalert2").css("display","none");
	 $("#spinner1").css("display","none");
	 $("#spinner2").css("display","none");
}


/*************************************************** Session Invalid ***************************************/
$("#logout").click(function(){
	$.ajax({
        beforeSend: function(request) {
            request.setRequestHeader("Authorization", "Negotiate");
        },
        async: true,
        type: 'POST',
        url: projectpath+'/LogoutSession',
        dataType: 'html',
        data: {},
        success: function(data) {
        	window.location="../HTML/LoginPage.html";
                    },
        error: function(data) {},
        complete: function() {

        }
    });
    });	