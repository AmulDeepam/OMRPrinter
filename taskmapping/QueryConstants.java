package taskmapping;

public interface QueryConstants {
	
     String DB_CONTEXT_LOOKUP_NAME = "java:jboss/datasources";
	
	 String DB_LOOKUP_NAME = "MySqlERPDS";
	
	
	 String ROLE_PERMISSION="SELECT Permission FROM PermissionTable where roleName = ? and companyId= ? "; 
	
	 
	 String EMP_SET_PERMISSION="UPDATE PermissionTable SET Permission =? WHERE roleName = ? and companyId= ? ";
	



}
