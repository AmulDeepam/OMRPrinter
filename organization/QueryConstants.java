package organization;

public interface QueryConstants {

	
	  String ORG_VERIFY_MOBILENO="SELECT contactNo FROM CompanyTable where contactNo = ?";
	  
	  String ORG_VERIFY_EMAIL="SELECT emailId FROM CompanyTable where emailId = ? ";
	  
	  String UPDATE_LICENSE_KEY="update CompanyTable set licenseKey= ? where companyId= ? ";
	  
	  String Organization_Insert ="insert into CompanyTable(companyName,emailId,contactNo,plan,licenseKey,status,fromdate,todate,doorNo,floor,city,street,place,staffName,landlineNo,feedbackNo) VALUES(?,?,?,?,?,'inactive',?,?,?,?,?,?,?,?,?,?)";
		
	  String Staff_Insert ="insert into StaffTable(emailId,contactNo,roleName,companyId,staffName) VALUES(?,?,'Proprietor',?,?)";
		 
	  String SITE_ALREADYEXIST_EMAILID = "SELECT EmailId  From StaffTable WHERE EmailId = ? ";
	  
	  String SITE_ALREADYEXIST_MOBILENO = "SELECT ContactNo From StaffTable WHERE ContactNo = ? ";
	  
	  String SITE_SELECTID = "SELECT CompanyId FROM CompanyTable WHERE EmailId = ? OR ContactNo = ? ";
	  
	  String SITE_INSERTPERMISSION_TABLE = "INSERT INTO PermissionTable (CompanyId,roleName,Permission)values( ? , 'Proprietor' ,?)";

	  
	  String SITE_INSERTROLE_TABLE="INSERT INTO RoleTable (CompanyId,roleName,roleDate) values(? , 'Proprietor',now())";
}
