package login;

import java.sql.Connection;


import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import java.util.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import DBUtil.DatabaseUtil;


public class LoginLogic {

	/*
	 * FUNCTION FOR VERIFYING LOGIN
	 */
	public static LoginJSON LoginCheck(LoginJSON json) {

		Connection connection = null;
		ArrayList<LoginJSON> employeePermisionlist = new ArrayList<LoginJSON>();
		ArrayList<LoginJSON> employeeRolelist = new ArrayList<LoginJSON>();
		ArrayList<LoginJSON> employeeList = new ArrayList<LoginJSON>();

		LoginJSON loginData = new LoginJSON();
		String staffId = null;
		String permission = null;
		String companyName = null;
		String companyAddress =null;
		String CompanyId = null;
		String licenseKey = null;
		String status = null;
		String fromdate = null;
		String todate = null;
		String role = null;
		String companyEmailId = null;
		String contactNo = null;
		String doorNo=null;
		String floor=null;
		String street=null;
		String place=null;
		String state=null;
		String staffName=null;
		String feedbackNo =null;
		String landlineNo= null;
		

		try {

			connection = DatabaseUtil.getDBConnection();
			// saleInvoiceId invoiceNo invoiceDate customerName contactNo status
			// balance_amount total
			System.out.println("inside login function............");

			String querySelect = QueryConstants.LOGIN_VERIFY;
			PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
			preparedStmt.setString(1, json.getEmailId());
			preparedStmt.setString(2, json.getEmailId());
			preparedStmt.setString(3, json.getPassword());
			ResultSet rs = preparedStmt.executeQuery();
			while (rs.next()) {

				staffId = rs.getString("staffId");
				role = rs.getString("roleName");
				CompanyId = rs.getString("companyId");

			}
			System.out.println("inside login function............");

			String rolePer = QueryConstants.ROLE_PERMISSION;
			PreparedStatement preparedStmtPer = connection.prepareStatement(rolePer);
			preparedStmtPer.setString(1, role);
			preparedStmtPer.setString(2, CompanyId);
			ResultSet rsPer = preparedStmtPer.executeQuery();
			while (rsPer.next()) {
				permission = rsPer.getString("Permission");

			}
			System.out.println("permission for the employee role is............" + permission);
			if (permission != null) {
				List<String> aList = Arrays.asList(permission.split(","));
				for (int i = 0; i < aList.size(); i++) {
					System.out.println("permission for the employee role in list is............" + aList.get(i));
					LoginJSON empConf = new LoginJSON();
					empConf.setPermission(aList.get(i));
					employeePermisionlist.add(empConf);
					System.out.println("completed employee permission successfully......." + employeePermisionlist);

				}

			}

			// System.out.println("inside company address retrive............");

			// String comAddress=QueryConstants.Select_CompanyAddress;
			// PreparedStatement preparedStmtAddr = connection.prepareStatement(comAddress);
			// preparedStmtAddr.setString(1,role);
			// ResultSet rsAddr=preparedStmtPer.executeQuery();
			// while(rsAddr.next()) {
			// companyAddress=rsAddr.getString("address");

			// }
			// json.setCompanyAddress(companyAddress);
			json.setStaffId(staffId);
			json.setRoleName(role);
			json.setCompanyId(CompanyId);

			String compName = QueryConstants.companyName;
			PreparedStatement preparedStmtCompName = connection.prepareStatement(compName);
			preparedStmtCompName.setString(1, CompanyId);
			ResultSet rsCompName = preparedStmtCompName.executeQuery();
			while (rsCompName.next()) {

				companyName = rsCompName.getString("companyName");
				licenseKey = rsCompName.getString("licenseKey");
				status = rsCompName.getString("status");
				fromdate = rsCompName.getString("fromdate");
				todate = rsCompName.getString("todate");
				companyAddress = rsCompName.getString("companyAddress");
				companyEmailId = rsCompName.getString("emailId");				
				contactNo =rsCompName.getString("contactNo");
				doorNo=rsCompName.getString("doorNo");
				floor=rsCompName.getString("floor");
				street=rsCompName.getString("street");
				place=rsCompName.getString("city");
				state=rsCompName.getString("place");
				staffName=rsCompName.getString("staffName");
				landlineNo=rsCompName.getString("landlineNo");
				feedbackNo=rsCompName.getString("feedbackNo");

				
			}
			
			/* 	if(companyAddress!=null) {
			    List<String> aList= Arrays.asList(companyAddress.split(","));
				for(int i=0;i<aList.size();i=i+5)					
				{
					doorNo=aList.get(i);
					floor=aList.get(i+1);
					street=aList.get(i+2);
					place=aList.get(i+3);
					state=aList.get(i+4);
					
					}
				}
			*/
			if (status.equals("active")) {

				SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
				sdf.setLenient(false);

				Date d1 = sdf.parse(fromdate);
				Date d2 = sdf.parse(json.getDate());
				Date d3 = sdf.parse(todate);

				if (d2.compareTo(d1) >= 0) {
					if (d2.compareTo(d3) <= 0) {
						if (status.equals("inactive")) { 
							// update status has active
							String changStatus = QueryConstants.UPDATE_ACTIVE;
							PreparedStatement preparedStmtchangStatus = connection.prepareStatement(changStatus);
							preparedStmtchangStatus.setString(1, CompanyId);
							preparedStmtchangStatus.executeUpdate();

						}

						System.out.println("today date is in between FROM and TO validity date");
					} else {
						System.out.println("d2 is NOT in between d1 and d2");
						// update status has expiered
						String changStatus = QueryConstants.UPDATE_EXPIRED;
						PreparedStatement preparedStmtchangStatus = connection.prepareStatement(changStatus);
						preparedStmtchangStatus.setString(1, CompanyId);
						preparedStmtchangStatus.executeUpdate();
						
						
						status = "expired";
						
					}
				} else {

					// update status has expiered
					String changStatus = QueryConstants.UPDATE_EXPIRED;
					PreparedStatement preparedStmtchangStatus = connection.prepareStatement(changStatus);
					preparedStmtchangStatus.setString(1, CompanyId);
					preparedStmtchangStatus.executeUpdate();
					status = "expired";
					System.out.println("d2 is NOT in between d1 and d2");
				}

			}
			json.setCompanyName(companyName);
			json.setLicenseKey(licenseKey);
			json.setCompanyAddress(companyAddress);
			json.setStatus(status);
			json.setCompanyEmailId(companyEmailId);
			json.setContactNo(contactNo);
			json.setDoorNo(doorNo);
			json.setFloor(floor);
			json.setStreet(street);
			json.setPlace(place);
			json.setState(state);
			json.setStaffName(staffName);
			json.setLandlineNo(landlineNo);
			json.setFeedbackNo(feedbackNo);

			System.out.println("entering  into process of getting company name......." + companyName);
			System.out.println("entering  into process of getting license key......." + licenseKey);
			System.out.println("entering  into process of getting company status......." + status);
			System.out.println("entering  into process of getting company address......." + companyAddress);
			System.out.println("entering  into process of getting company emailId......." + companyEmailId);
			System.out.println("entering  into process of getting company contactNo......" + contactNo);
			System.out.println("entering  into process of getting door no......" + doorNo);
			System.out.println("entering  into process of getting floor......." + floor);
			System.out.println("entering  into process of getting street......." + street);
			System.out.println("entering  into process of getting place......." + place);
			System.out.println("entering  into process of getting state......" + state);

			System.out.println("entering  into process of getting permission for each role......." + staffId);
			employeeRolelist = LoginLogic.RoleDropDownDetails();
			employeeList = LoginLogic.EmployeeList();

			json.setEmployeeRolelist(employeeRolelist);
			json.setEmployeePermisionlist(employeePermisionlist);
			json.setEmployeeList(employeeList);
			System.out.println("completed employee permission successfully.......");

			if (staffId == null) {
				System.out.println("No Login Available Due To Incorrect Credentials \n");
				json.setEmailId("Failed");
			} else {
				System.out.println("Login Success \n");
				json.setEmailId("Success");
			}

			connection.close();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {

		}

		return json;
	}

	/*
	 * function for getting EmployeeList
	 */

	public static ArrayList<LoginJSON> EmployeeList() {

		ArrayList<LoginJSON> employeeList = new ArrayList<LoginJSON>();
		Connection connection = null;

		try {
			System.out.println("going to get Employee List............");
			connection = DatabaseUtil.getDBConnection();
			String querySelect = QueryConstants.EMP_LIST;
			PreparedStatement preparedStmt = connection.prepareStatement(querySelect);

			ResultSet rs = preparedStmt.executeQuery();
			while (rs.next()) {
				LoginJSON emp = new LoginJSON();

				emp.setStaffId(rs.getString("staffId"));

				employeeList.add(emp);
			}
			System.out.println("getting Employee List was done successfully............");

			System.out.println("employee list:" + employeeList);
			connection.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}

		finally {

		}

		return employeeList;

	}

	public static ArrayList<LoginJSON> RoleDropDownDetails() {

		ArrayList<LoginJSON> employeeRolelist = new ArrayList<LoginJSON>();
		Connection connection = null;

		try {

			connection = DatabaseUtil.getDBConnection();
			String querySelect = QueryConstants.EMP_GET_ROLE;
			PreparedStatement preparedStmt = connection.prepareStatement(querySelect);

			ResultSet rs = preparedStmt.executeQuery();
			while (rs.next()) {
				LoginJSON roleObj = new LoginJSON();
				String role = rs.getString("roleName");
				if (role != null) {
					roleObj.setRoleName(rs.getString("roleName"));
					employeeRolelist.add(roleObj);
				}
			}

			System.out.println("getting role was done successfully............");
			System.out.println("role list successfully:" + employeeRolelist);
			connection.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}

		finally {

		}

		return employeeRolelist;

	}

	public static LoginJSON UpdateStatus(LoginJSON json) {
		// TODO Auto-generated method stub
		
		Connection connection=null;
	
		
		
		try {
			connection=DatabaseUtil.getDBConnection();
		
			
			System.out.println("inside Update Status Function............");
			String querySelect = QueryConstants.Status_Update;
			System.out.println("inside  Status query updated............"+json.getCompanyId());
			PreparedStatement preparedStmt=connection.prepareStatement(querySelect);	
			preparedStmt.setString(1,json.getCompanyId());
			preparedStmt.executeUpdate();
			connection.close(); 
		}
		catch (Exception e) {
				e.printStackTrace();
		} finally {
				
			
		}
		return json;
	}

}
