package taskmapping;

import java.sql.Connection;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;



import DBUtil.DatabaseUtil;


public class TaskMappingLogic {

	public static TaskMappingJSON RetreivePermission(TaskMappingJSON config) {

		TaskMappingJSON reportAndCount=new TaskMappingJSON();
	    
		ArrayList<TaskMappingJSON> employeePermisionlist=new ArrayList<TaskMappingJSON>();
        
		Connection connection=null;
		String permission=null;	
			try {
				System.out.println("going to get Permision List for Particular Role............");
				connection =DatabaseUtil.getDBConnection();
				  String querySelect=QueryConstants.ROLE_PERMISSION;
					PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
					preparedStmt.setString(1,config.getRoleName());					
					preparedStmt.setString(2,config.getCompanyId());
					ResultSet rs=preparedStmt.executeQuery();
					  while(rs.next()) {
						  permission=rs.getString("permission");
						  
		        	       }  
					  System.out.println("permission for the employee role is............"+permission);
						if(permission!=null) {
					    List<String> aList= Arrays.asList(permission.split(","));
						for(int i=0;i<aList.size();i++)
						{
						System.out.println("permission for the employee role in list is............"+aList.get(i));
						TaskMappingJSON empConf=new TaskMappingJSON();
						empConf.setPermission(aList.get(i));
						employeePermisionlist.add(empConf);
						}
						
						}     
			        	
						reportAndCount.setEmployeePermisionlist(employeePermisionlist);
				    	
				System.out.println("getting Employee List was done successfully............");
				connection.close();
			}
			catch (SQLException e)
		    {
		    e.printStackTrace();
		    }
		     	
		   finally {
			
		}

		return reportAndCount;	
	}

	public static TaskMappingJSON SetPermission(TaskMappingJSON config) {

		Connection connection=null;
		ArrayList<TaskMappingJSON> employeePermisionlist=new ArrayList<TaskMappingJSON>();
		String permission = null;
		
		
		try {
			System.out.println("going to set permission............");
			connection =DatabaseUtil.getDBConnection();
		
			
			String querySelect=QueryConstants.EMP_SET_PERMISSION;
			PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
			preparedStmt.setString(1,config.getPermission());
			preparedStmt.setString(2,config.getRoleName());
			preparedStmt.setString(3,config.getCompanyId());
			
			preparedStmt.executeUpdate();		
		
				
			
			 permission=config.getPermission();
		      
			if(config.getPermission()!=null) {
			    List<String> aList= Arrays.asList(permission.split(","));
				for(int i=0;i<aList.size();i++)
				{
				System.out.println("permission for the employee role in list is............"+aList.get(i));
				TaskMappingJSON empConf=new TaskMappingJSON();
				empConf.setPermission(aList.get(i));
				employeePermisionlist.add(empConf);
			
				}
				config.setPermisionlist(employeePermisionlist);
			}
		
			System.out.println("setting permission was done successfully............");
			connection.close();
		}
		catch (SQLException e)
	    {
	    e.printStackTrace();
	    }
	     	
	   finally {
		
	}
		return config;
	}

	
}
