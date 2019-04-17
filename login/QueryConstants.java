package login;

public interface QueryConstants {

	String LOGIN_VERIFY = "SELECT staffId,roleName,companyId FROM StaffTable WHERE ( EmailId = ? OR ContactNo = ? ) AND Password = ? ";

	 String ROLE_PERMISSION="SELECT Permission FROM PermissionTable where roleName = ? and companyId = ?";
	 
	 String EMP_LIST="SELECT DISTINCT staffId FROM StaffTable"; 
	 
	 String EMP_GET_ROLE="SELECT DISTINCT roleName FROM PermissionTable";  
	   
	 String Select_CompanyAddress="SELECT address FROM StaffTable where staffId = '1' ";

	 String companyName="SELECT companyName,licenseKey,status,fromdate,todate,companyAddress,emailId,contactNo,doorNo,street,city,floor,place,staffName,landlineNo,feedbackNo FROM CompanyTable where companyId = ?";

	 String UPDATE_ACTIVE="UPDATE CompanyTable set status='active' where companyId= ? " ;
	 
	 String UPDATE_EXPIRED="UPDATE CompanyTable set status='expired' where companyId= ? "  ;
	 
	 String Status_Update="UPDATE CompanyTable set status= 'active' where companyId = ? ";
}

