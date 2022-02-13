package ForgotPassword;

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
 * Servlet implementation class PasswordForgot
 */
@WebServlet("/PasswordForgot")
public class PasswordForgot extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public PasswordForgot() {
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
		String Email_ID = request.getParameter("Email_ID");
		String Password = request.getParameter("Password");
		JSONObject obj = null;
		JSONObject obj1 = null;
		JSONArray array = new JSONArray();	
		
		try
		{
			con.connec();
			
			String qry = "select User_ID,EmailID,SecretCode,Password,ActiveStatus from UserDetails"
					+ " where EmailID='"+Email_ID+"' and Password='"+Password+"'";
			ResultSet res = con.executeQuery(qry);
			
			if(res.next())
			{
				obj = new JSONObject();
				String User_ID = res.getString("User_ID");
				obj.put("User_ID", User_ID);
				
				String EmailID = res.getString("EmailID");
				obj.put("EmailID", EmailID);
				
				String SecretCode = res.getString("SecretCode");
				obj.put("SecretCode", SecretCode);
				
				String ActiveStatus=res.getString("ActiveStatus");
                obj.put("ActiveStatus", ActiveStatus);
                
				array.put(obj);		
				obj1 = new JSONObject();
				obj1.put("loginDesignation", array);

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
