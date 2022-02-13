package DBConnection;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ResourceBundle;

public class DBCON {

	Connection con = null;
	Statement ss = null;
	ResultSet rs = null;
	Connection conn = null;
	Connection connus = null;
	
	public String connec() {

		try {

			ResourceBundle resource = ResourceBundle.getBundle("database");
			/// commonVariable.properties file will be in WEB-INF/classess folder

			String db_server = resource.getString("db_Server");
			String db_database = resource.getString("db_database");
			String db_username = resource.getString("db_username");
			String db_password = resource.getString("db_password");
			String db_port = resource.getString("db_port");
			System.out.println("Server : " + db_server + "," + db_port + "database: " + db_database + "username: "
					+ db_username + "password: " + db_password + "");
			
			Class.forName("com.mysql.jdbc.Driver");
			
			con =  DriverManager.getConnection("jdbc:mysql://"+db_server+":"+db_port+"/"+db_database+"?user="+db_username+"&password="+db_password+"");
			 
			if (con != null) {
				System.out.println("Connection Created");
			} else {
				System.out.println("Connection failure");

			}
			// System.out.println("Connection Created");
			return "success";
		} catch (Exception e) {
			e.printStackTrace();
			return "failure";
		}

	}
	
	public ResultSet executeQuery(String query) {
		try {

			System.out.println("Select Query :" + query);
			ss = con.createStatement(ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_UPDATABLE);
			rs = ss.executeQuery(query);
			System.out.println("Inside the DB connection DB con.java " + rs);

		} catch (Exception e) {
			e.printStackTrace();
			// return rs;
		}
		return rs;
	}

	public int indel(String query) {
		int ret = 0;
		try {
			System.out.println("Insert/Delete Query :" + query);
			ss = con.createStatement(ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_UPDATABLE);
			ret = ss.executeUpdate(query);

		} catch (Exception e2) {
			e2.printStackTrace();
		}
		return ret;
	}

	public void setAutoCommit(boolean b) {
		// TODO Auto-generated method stub
		try {
			con.setAutoCommit(b);
		} catch (SQLException e) {
			System.out.println(e);
		}
	}

	public void commit() {
		// TODO Auto-generated method stub
		try {
			con.commit();
		} catch (SQLException e) {
			System.out.println(e);
		}

	}

	public void rollback() {
		// TODO Auto-generated method stub
		try {
			con.rollback();
		} catch (SQLException e) {
			System.out.println(e);
		}
	}

	public boolean close() {
		try {
			con.close();
			System.out.println("Connection Closed");
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}

	}
}
