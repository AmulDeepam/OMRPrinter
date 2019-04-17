package organization;

import java.sql.Connection;



import java.util.UUID;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Random;


import DBUtil.DatabaseUtil;






public class OrganizationDao {

	public OrganizationJSON siteregistration(OrganizationJSON json) {
		// TODO Auto-generated method stub
		
		Connection connection=null;
		 int check;
		  int licenseKey = 0;
		
		  json.setStaffId(null);
		String mobileNo=null;
		String email=null;
		String companyId = null;
		
		try {

		       connection = DatabaseUtil.getDBConnection();
		    
			
              if(json.getStaffId()==null) {
             	 System.out.println("GENERATING  OTP FOR THE NEW ORGANIZATION \n ");
             	json.setLicenseKey(generateString());
             	System.out.println("Generating lincense key" +generateString());
             	 System.out.println("LICENSE KEY FOR THE NEW ORGANIZATION " +json.getLicenseKey());
             	 
              }
             	 
		       String querySelect02=QueryConstants.ORG_VERIFY_EMAIL;			
				PreparedStatement preparedStmt02 = connection.prepareStatement(querySelect02);			
				preparedStmt02.setString(1,json.getEmailId());			
				ResultSet rs02=preparedStmt02.executeQuery();			
				while(rs02.next()) {
					email = rs02.getString("EmailId");
					System.out.print("EmailId Already exits "+email );
					
				}
		       
            String querySelect01=QueryConstants.ORG_VERIFY_MOBILENO;			
			PreparedStatement preparedStmt01 = connection.prepareStatement(querySelect01);			
			preparedStmt01.setString(1,json.getContactNo());			
			ResultSet rs01=preparedStmt01.executeQuery();			
			while(rs01.next()) {
				mobileNo = rs01.getString("contactNo");
				System.out.print("MobileNo Already exits "+mobileNo );
				
			}
			
			if(email==null && mobileNo==null) {
			
					String querySelect=QueryConstants.Organization_Insert;
					PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
					preparedStmt.setString(1,json.getCompanyName());
					preparedStmt.setString(2,json.getEmailId());
					preparedStmt.setString(3,json.getContactNo());
					
					preparedStmt.setString(4,json.getPlanName());
					preparedStmt.setString(5,json.getLicenseKey());
					preparedStmt.setString(6,json.getFromdate());
					preparedStmt.setString(7,json.getTodate());
					preparedStmt.setString(8,json.getDoorNo());
					preparedStmt.setString(9,json.getFloor());
					preparedStmt.setString(10,json.getCity());
					preparedStmt.setString(11,json.getStreet());
					preparedStmt.setString(12,json.getPincode());
					preparedStmt.setString(13,json.getProprietorName());		
					preparedStmt.setString(14,json.getLandlineNo());
					preparedStmt.setString(15,json.getFeedbackNo());	
				
					preparedStmt.executeUpdate();
					
					json.setCompanyName("INSERTED");
					
					System.out.println("SELECTING THE SITE ID FOR NEWLY REGISTERED SITE \n");
					String querySelectSELORGID=QueryConstants.SITE_SELECTID;
					PreparedStatement preparedStmtSELORGID = connection.prepareStatement(querySelectSELORGID);
					preparedStmtSELORGID.setString(1,json.getEmailId());
					preparedStmtSELORGID.setString(2,json.getContactNo());
					ResultSet rsSELORGID=preparedStmtSELORGID.executeQuery();
					while(rsSELORGID.next()) {
						companyId=rsSELORGID.getString("CompanyId");
					}
					
					System.out.println("CALLING INSERT FUNCTION TO INSERT DATA INTO EMPLLOYEE TABLE \n");
					
					String querySelect03=QueryConstants.Staff_Insert;
					PreparedStatement preparedStmt03 = connection.prepareStatement(querySelect03);
					
					preparedStmt03.setString(1,json.getEmailId());
					preparedStmt03.setString(2,json.getContactNo());
				
					preparedStmt03.setString(3,companyId);
					preparedStmt03.setString(4,json.getProprietorName());
				     preparedStmt03.executeUpdate();
					
				     String config=QueryConstants.SITE_INSERTPERMISSION_TABLE;
						PreparedStatement preparedStmtconfig = connection.prepareStatement(config);
						preparedStmtconfig.setString(1,companyId);
						preparedStmtconfig.setString(2,json.getPermission());
					
						preparedStmtconfig.executeUpdate();
						
						
					     String config1=QueryConstants.SITE_INSERTROLE_TABLE;
							PreparedStatement preparedStmtconfig1 = connection.prepareStatement(config1);
							preparedStmtconfig1.setString(1,companyId);
					preparedStmtconfig1.executeUpdate();


					System.out.println("completed adding customer returning to webservice............");			connection.close();     
			}else if(mobileNo!=null){
				json.setContactNo("MOBILE");
				System.out.print("MobileNo Already exits");
				
			}
			else if(email!=null){
				json.setEmailId("EMAILID");
				System.out.print("Email Already exits");
				
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



	public OrganizationJSON CreateSite(OrganizationJSON json) {
		// TODO Auto-generated method stub
		
		Connection connection=null;
		  int check;
		  int otp = 0;
		  
		  OrganizationJSON org1=new OrganizationJSON();
		  org1.setStaffId(null);
		 try {
			 connection = DatabaseUtil.getDBConnection();
				
				System.out.println("CALLING FUNCTION FOR CHECKING WHETHER THE ORGANIZATION WITH SAME NAME ALREADY EXIST \n");
				org1=CheckOrganizationAlreadyExist(json);
				System.out.println("return");
               if(org1.getStaffId()==null) {
              	 System.out.println("GENERATING  OTP FOR THE NEW ORGANIZATION \n ");
              	 org1.setOtp(GenerateOTP());
              	System.out.println("Generating lincense key" +generateString());
              	 System.out.println("OTP FOR THE NEW ORGANIZATION " +org1.getOtp());
               	 
               }
				 
		 }
		  	catch (Exception e) {
		  		e.printStackTrace();
		  	} finally {
		  		 DatabaseUtil.closeConnection(connection);
		  	}
			 
		return org1;
		
	}
	

	/*
	 * FUNCTION FOR CHECKING WHETHER SITE WITH 
	 * SAME NAME(EMAILID & MOBILR NO) ALREADY EXIST
	 */
	private static OrganizationJSON CheckOrganizationAlreadyExist(OrganizationJSON org) {
		 Connection connection=null;
		 int check=0;
		 String emailId = null;
		 String mobileNo = null;
		 String tableName=null;
		
		  
		 try {
			 connection = DatabaseUtil.getDBConnection();
			
				System.out.println("CHECKING WHETHER THE ORGANIZATION WITH SAME NAME ALREADY EXIST \n");
				String querySelectEMAIL=QueryConstants.SITE_ALREADYEXIST_EMAILID;
				PreparedStatement preparedStmtEMAIL = connection.prepareStatement(querySelectEMAIL);
				preparedStmtEMAIL.setString(1,org.getEmailId());
				ResultSet rsEMAIL=preparedStmtEMAIL.executeQuery();
				
				while(rsEMAIL.next()) {
					emailId=rsEMAIL.getString("EmailId");
					
				}
				System.out.println("EMAILID : \t"+emailId);
				
				String querySelectMOB=QueryConstants.SITE_ALREADYEXIST_MOBILENO;
				PreparedStatement querySelectMOBp = connection.prepareStatement(querySelectMOB);
				querySelectMOBp.setString(1,org.getContactNo());
				ResultSet rsMOB=querySelectMOBp.executeQuery();
				
				while(rsMOB.next()) {
					mobileNo=rsMOB.getString("ContactNo");
					
				}
					
				
				System.out.println("MOBILENO : \t"+mobileNo);
			
				if(emailId==null && mobileNo==null ) {
					org.setEmailId(null);
					org.setContactNo(null);
					//both new
					System.out.println("Both New");
					
				}else if(mobileNo!=null) {
					org.setContactNo("MOBILE");
					System.out.println("Mobile Exits");
					
				}else {
					org.setEmailId("EMAILID");
					System.out.println("emailId Exits");
				}
				
				
				
		 }
		  	catch (Exception e) {
		  		e.printStackTrace();
		  	} finally {
		  		 DatabaseUtil.closeConnection(connection);
		  	}
			 return org;	
	}

	/*
	 * FUNCTION FOR GENERATING OTP IF A NEW ORGANIZATIION IS REGISTERING
	 */
	public static int GenerateOTP() {
		
		Random rnd = new Random();
		int OTP= 100000 + rnd.nextInt(900000);
		System.out.println("generated OTP successfully \n");
		return OTP;
	}

	    public static String generateString() {
	        String uuid = UUID.randomUUID().toString();
	        return  uuid;
	    
	}

}
