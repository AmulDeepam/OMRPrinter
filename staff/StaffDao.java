package staff;

import java.sql.Connection;




import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import DBUtil.DatabaseUtil;






public class StaffDao {

	public StaffJSON addstaff(StaffJSON json) {
		Connection connection=null;
		String mobileNo=null;
		String email=null;
		try {
			       connection = DatabaseUtil.getDBConnection();
			      	String querySelect0=QueryConstants.Staff_VERIFY_MAIL;
					PreparedStatement preparedStmt0 = connection.prepareStatement(querySelect0);
					preparedStmt0.setString(1,json.getEmail());
					preparedStmt0.setString(2,json.getCompanyId());
					ResultSet rs0=preparedStmt0.executeQuery();
					
					while(rs0.next()) {
						email=rs0.getString("emailId");
						System.out.print("emailId Already exits "+email );
						
						
					}
			       String querySelect01=QueryConstants.Staff_VERIFY_MOBILENO;			
					PreparedStatement preparedStmt01 = connection.prepareStatement(querySelect01);			
					preparedStmt01.setString(1,json.getContactNo());
					preparedStmt01.setString(2,json.getCompanyId());
					ResultSet rs01=preparedStmt01.executeQuery();			
					while(rs01.next()) {
						mobileNo = rs01.getString("contactNo");
						System.out.print("MobileNo Already exits "+mobileNo );
						
					}
					if(email==null && mobileNo==null) {
					String querySelect=QueryConstants.Staff_Insert;
					PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
					preparedStmt.setString(1,json.getStaffName());
					preparedStmt.setString(2,json.getAddress());
					preparedStmt.setString(3,json.getCity());
					preparedStmt.setString(4,json.getContactNo());
					preparedStmt.setString(5,json.getDob());
					preparedStmt.setString(6,json.getGender());
					preparedStmt.setString(7,json.getReligion());
					preparedStmt.setString(8,json.getNationality());
					preparedStmt.setString(9,json.getSalary());
					preparedStmt.setString(10,json.getDate());
					preparedStmt.setString(11,json.getRoleName());
					preparedStmt.setString(12,json.getEmail());
					preparedStmt.setString(13,json.getCompanyId());
					preparedStmt.executeUpdate();
					System.out.println("completed adding staff returing to webservice............");	
					connection.close();     
					}
					else if(email!=null) {
						json.setEmail("Email");
						System.out.print("Email Already exists");
						
						
						}
					else if(mobileNo!=null){
						json.setContactNo("Mobile");
						System.out.print("Mobile Already exists");
						
					}
					}
					catch (SQLException e)
		        {
		        e.printStackTrace();
		        }
		         	
			   finally {
				   DatabaseUtil.closeConnection(connection);
			}
				return json;



}

	public StaffJSON selectstaff(StaffJSON json) {
	 	ArrayList<StaffJSON> staffRetrievelist = new ArrayList<StaffJSON>();	
	 	StaffJSON res=new StaffJSON();
		Connection connection=null;
		try {
			
			connection =DatabaseUtil.getDBConnection();
			
			String querySelect=QueryConstants.Staff_Report;
			//System.out.println("companyID...."+querySelect);
			PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
			preparedStmt.setString(1,json.getCompanyId());			
	        ResultSet rs=preparedStmt.executeQuery();
	               
	        while(rs.next())
	        {
	        	StaffJSON staffRetrieveobj = new StaffJSON();
	        	staffRetrieveobj.setStaffId(rs.getString("staffId"));
	        	staffRetrieveobj.setStaffName(rs.getString("staffName"));
	        	staffRetrieveobj.setAddress(rs.getString("address"));
	        	staffRetrieveobj.setContactNo(rs.getString("contactNo"));	
	        	staffRetrieveobj.setRoleName(rs.getString("roleName"));
	        	staffRetrieveobj.setSalary(rs.getString("salary"));	
	        	staffRetrieveobj.setCity(rs.getString("city"));	
	        	staffRetrieveobj.setDob(rs.getString("dob"));	
	        	staffRetrieveobj.setGender(rs.getString("gender"));
	        	staffRetrieveobj.setReligion(rs.getString("religion"));
	        	staffRetrieveobj.setNationality(rs.getString("nationality"));
	        	staffRetrieveobj.setJoiningDate(rs.getString("joiningDate"));
	        	staffRetrieveobj.setEmail(rs.getString("emailId"));
	        	staffRetrievelist.add(staffRetrieveobj);
	        }
	        System.out.println("list length...."+staffRetrievelist.size());	       
	        
	        res.setStaffRetrievelist(staffRetrievelist);
	        
	        connection.close();  
	        } catch (SQLException e)
	        {
	        e.printStackTrace();
	        }
	         	
		   finally {
			DatabaseUtil.closeConnection(connection);
		}
	        
		   return res;
		
	}

	public StaffJSON addsalary(StaffJSON json) {
		Connection connection=null;
		try {
			       connection = DatabaseUtil.getDBConnection();
					String querySelect=QueryConstants.Salary_Insert;
					PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
					preparedStmt.setString(1,json.getStaffName());
					preparedStmt.setString(2,json.getSalary());
					preparedStmt.setString(3,json.getPay());
					preparedStmt.setString(4,json.getDeduction());
					preparedStmt.setString(5,json.getDate());
					preparedStmt.setString(6,json.getSalaryMonth());
					preparedStmt.setString(7,json.getRemark());
					
					preparedStmt.executeUpdate();
					System.out.println("completed adding salary returing to webservice............");			connection.close();     
					
					}
					catch (SQLException e)
		        {
		        e.printStackTrace();
		        }
		         	
			   finally {
				   DatabaseUtil.closeConnection(connection);
			}
				return json;

			
		
	}

	public StaffJSON salaryreport(StaffJSON json) {
		ArrayList<StaffJSON> salaryRetrievelist = new ArrayList<StaffJSON>();	
	 	StaffJSON res=new StaffJSON();
		Connection connection=null;
		try {
			
			connection =DatabaseUtil.getDBConnection();
			
			String querySelect=QueryConstants.Salary_Report;
			//System.out.println("companyID...."+querySelect);
			PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
						
	        ResultSet rs=preparedStmt.executeQuery();
	               
	        while(rs.next())
	        {
	        	StaffJSON setSalaryRetrieveobj = new StaffJSON();
	        	setSalaryRetrieveobj.setSalaryId(rs.getString("salaryId"));
	        	setSalaryRetrieveobj.setStaffName(rs.getString("staffName"));
	        	setSalaryRetrieveobj.setSalary(rs.getString("salary"));
	        	setSalaryRetrieveobj.setPay(rs.getString("pay"));
	        	setSalaryRetrieveobj.setDeduction(rs.getString("deduction"));	
	        	setSalaryRetrieveobj.setDate(rs.getString("date"));
	        	setSalaryRetrieveobj.setRemark(rs.getString("remark"));
	        	salaryRetrievelist.add(setSalaryRetrieveobj);
	        }
	        System.out.println("list length...."+salaryRetrievelist.size());	       
	        
	        res.setSalaryRetrievelist(salaryRetrievelist);
	        
	        connection.close();  
	        } catch (SQLException e)
	        {
	        e.printStackTrace();
	        }
	         	
		   finally {
			DatabaseUtil.closeConnection(connection);
		}
	        
		   return res;
	}

	public StaffJSON deletestaff(StaffJSON json) {
	Connection connection=null;

		
		
		try {
			connection=DatabaseUtil.getDBConnection();
			
			String querySelect=QueryConstants.DELETE_STAFF;
			PreparedStatement preparedStmt=connection.prepareStatement(querySelect);
			preparedStmt.setString(1,json.getContactNo());
			preparedStmt.setString(2,json.getCompanyId());	
			//preparedStmt.setString(2,json.getDate());
			preparedStmt.executeUpdate();
			connection.close(); 
		}
		catch (Exception e) {
				e.printStackTrace();
		} finally {
				
			
		}
		return json;
	}

	public StaffJSON updateemployee(StaffJSON json) {
		Connection connection=null;
		ArrayList <StaffJSON> CustomerList=new ArrayList <StaffJSON>();
		
		
		try {
			connection=DatabaseUtil.getDBConnection();
		//	expenseId = ? , CategoryName = ? ,Username = ? , " +"Amount = ? , Date = ?
			System.out.println("inside update customer....");  
			String querySelect=QueryConstants.EmployeeList_UPDATE;
			PreparedStatement preparedStmt=connection.prepareStatement(querySelect);
			preparedStmt.setString(1,json.getAddress());
			preparedStmt.setString(2,json.getCity());
			preparedStmt.setString(3,json.getContactNo());
			preparedStmt.setString(4,json.getDob());
			preparedStmt.setString(5,json.getGender());
			preparedStmt.setString(6,json.getReligion());
			preparedStmt.setString(7,json.getNationality());			
			preparedStmt.setString(8,json.getSalary());		
			preparedStmt.setString(9,json.getRoleName());		
			preparedStmt.setString(10,json.getEmail());
			preparedStmt.setString(11,json.getStaffId());
			preparedStmt.setString(12,json.getCompanyId());
			
			preparedStmt.executeUpdate();
			
			System.out.println("updated employee...."+json.getStaffName()); 
			System.out.println("updated employee...."+json.getAddress()); 
			System.out.println("updated employee...."+json.getCity()); 
			System.out.println("updated employee...."+json.getContactNo()); 
			System.out.println("updated employee...."+json.getDob()); 
			System.out.println("updated employee...."+json.getGender()); 
			System.out.println("updated employee...."+json.getReligion()); 
			System.out.println("updated employee...."+json.getRoleName()); 
			System.out.println("updated employee...."+json.getSalary());
			System.out.println("updated employee...."+json.getEmail()); 
			System.out.println("updated employee...."+json.getNationality()); 
			System.out.println("for where ....");
			
		 
			System.out.println("updated employee...."+json.getStaffId()); 
			System.out.println("updated employee...."+json.getCompanyId()); 
		
			
			
			
			
			connection.close(); 
		}
		catch (Exception e) {
				e.printStackTrace();
		} finally {
				
			
		}
		return json;
	}
		
	}


