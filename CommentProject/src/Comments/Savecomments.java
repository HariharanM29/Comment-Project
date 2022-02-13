package Comments;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.ResultSet;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.json.JSONArray;
import org.json.JSONObject;

import DBConnection.DBCON;

/**
 * Servlet implementation class Savecomments
 */
@WebServlet("/Savecomments")
public class Savecomments extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Savecomments() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		
		DBCON con =new DBCON();
		String comments = request.getParameter("comments");
		
		HttpSession session=request.getSession();
		String UserCode = (String) session.getAttribute("User_ID");
		
		JSONObject obj = null;
		JSONObject obj1 = null;
		JSONArray array = new JSONArray();
		int status = 0;
		String UserAccess = "";
		try
		{
			con.connec();
			con.setAutoCommit(false);
			
			String insertqry = "insert into UserComments(User_ID,Comments,ActiveStatus,CreatedDate)\r\n" + 
					"values('"+UserCode+"','"+comments+"','Active',NOW())";
			status = con.indel(insertqry);
			
			String qry = "select * from UserComments";
			ResultSet res = con.executeQuery(qry);
			
			if(res.next())
			{
				obj = new JSONObject();
				String User_ID = res.getString("User_ID");
				obj.put("User_ID", User_ID);
				
				String Comments = res.getString("Comments");
				obj.put("Comments", Comments);
				
				array.put(obj);		
				obj1 = new JSONObject();
				obj1.put("Comments", array);

			}
			
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		{
			if(status > 0)
			{
				UserAccess = "Success";
				con.commit();
			}
			else
			{
				UserAccess = "Failure";
				con.rollback();
			}
			con.close();
			PrintWriter out = response.getWriter();
			System.out.println("Response :" +obj1);
			out.print(UserAccess+"&#"+obj1);		
			
		}
	}

}
