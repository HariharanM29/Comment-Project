var projectpath="";

function getContextPath() {
        var url=window.location.hostname;
        var portname=window.location.port;
        var backend="/CommentProject";

        return "http://"+url+":"+portname+backend;
}

projectpath = getContextPath();