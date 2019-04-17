package staff;



public interface QueryConstants {
	
	
	   String DB_CONTEXT_LOOKUP_NAME = "java:jboss/datasources";
		
	   String DB_LOOKUP_NAME = "MySqlERPDS";
	   
	   String Staff_Insert ="insert into StaffTable(staffName,address,city,contactNo,dob,gender,religion,nationality,salary,joiningDate,roleName,emailId,companyId) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)";
		
       String Staff_Report ="select staffId,staffName,address,contactNo,roleName,salary,city,dob,gender,religion,nationality,joiningDate,emailId from StaffTable where companyId= ? and status='0' and roleName <> 'Proprietor' ";
       
       String Salary_Insert="insert into SalaryTable(staffName,salary,pay,deduction,date,salaryMonth,remark) VALUES(?,?,?,?,?,?,?)";

       String Salary_Report ="select salaryId,staffName,salary,pay,deduction,date,remark from SalaryTable ";
      
       String Staff_VERIFY="select staffName from StaffTable where staffName=? and status='0'";	
      	
       String Staff_VERIFY_MOBILENO="select contactNo from StaffTable where contactNo=? and companyId= ?  and status='0' ";
       
       String Staff_VERIFY_MAIL="select emailId from StaffTable where emailId=? and companyId= ?  and status='0' ";
       
     String DELETE_STAFF="Update StaffTable set status='1' where contactNo=? and companyId= ?  ";
       
      // String Select_Staff ="select ST.staffId,A.staffId,staffName,status,count(status) AS NODAYS,address,contactNo,roleName,salary from StaffTable ST inner join AttendanceTable A on ST.staffId = A.staffId ";
       
     //  String LOGIN_VERIFY = "SELECT StaffId,ST.roleName,PT.roleName FROM StaffTable ST inner join PermissionTable PT on ST.roleName = PT.roleName WHERE ( EmailId = ? OR ContactNo = ? ) AND Password = ? ";

    //   String Select_Staff = "SELECT staffId,staffname,status, COUNT(status) FROM AttendanceTable  where staffid=4 and month(date)=12 group by status";

     String EmployeeList_UPDATE="UPDATE StaffTable SET address=?,city=?,contactNo=?,dob=?,gender=?,religion=?,nationality=?,salary=?,roleName=?,emailId=? WHERE  staffId = ?  AND companyId= ?";

     
}
