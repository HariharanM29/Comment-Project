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
 * Servlet implementation class Filtercomments
 */
@WebServlet("/Filtercomments")
public class Filtercomments extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Filtercomments() {
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
		String filterval = request.getParameter("filterval");
		
		JSONObject obj = null;
		JSONObject obj1 = null;
		JSONArray array = new JSONArray();
		HttpSession session=request.getSession();	
		String UserCode = (String) session.getAttribute("User_ID");
		String qry = "";
		try
		{
			con.connec();
			
			if(filterval.equalsIgnoreCase("User"))
			{
				qry = "select * from UserComments where User_ID = '"+UserCode+"'";	
			}
			else
			{
				qry = "select * from UserComments";
			}
			ResultSet res = con.executeQuery(qry);
			
			while(res.next())
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
			con.close();
			PrintWriter out = response.getWriter();
			System.out.println("Response :" +obj1);
			out.print(obj1);		
		}
	
	}

}
