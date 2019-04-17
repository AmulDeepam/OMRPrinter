package payroll;

import java.util.ArrayList;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;


@Path(value="/Payroll")
public class PayrollWebservice {

	
	/*
	 * API CALL FOR EMPLOYEE DETAILS
	 */
	@POST
	@Path("/StaffDetails")
	@Consumes(value= {"application/json"})
	@Produces(value={"application/json"})
	public Response StaffDetails(PayrollJSON json)
	     {
		System.out.println(" GETTING EMPLOYEE DETAILS FOR PAYROLL \n");
		
		ArrayList <PayrollJSON> empDetailList=new ArrayList <PayrollJSON>();
		empDetailList =PayrollLogic.GetEmpDetaiils(json);
		
		System.out.println("GETTING EMPLOYEE DETAILS FOR PAYROLL COMPLETED\n");
		return Response.status(200).entity(empDetailList).build();
		
	
	     }   
	
	
	 	/*
	 	 * API CALL FOR INSERTING SALARY
	 	 */
	 	@POST
	 	@Path("/addsalary")
	 	@Consumes(value= {"application/json"})
	 	@Produces(value={"application/json"})
	 	public Response addsalary(PayrollJSON json)
	 	     {
	 		System.out.println(" INSERTING  EMPLOYEE SALARY DETAILS FOR PAYROLL \n");
	 		
	 		PayrollJSON salaryData=new PayrollJSON();
	 		salaryData =PayrollLogic.AddSalary(json);
	 		
	 		System.out.println("INSERTING  EMPLOYEE SALARY DETAILS FOR PAYROLL COMPLETED\n");
	 		return Response.status(200).entity(salaryData).build();
	 		
	 	
	 	     } 
	
	
	 	/*
	 	 * API CALL FOR SALARY REPORT
	 	 */
	 	@POST
	 	@Path("/salaryreport")
	 	@Consumes(value= {"application/json"})
	 	@Produces(value={"application/json"})
	 	public Response salaryreport(PayrollJSON json)
	 	     {
	 		System.out.println(" GETTING  EMPLOYEE SALARY DETAILS FOR PAYROLL \n");
	 		
	 	
	 		ArrayList <PayrollJSON> salaryList=new ArrayList <PayrollJSON>();
	 		salaryList =PayrollLogic.SalaryReport(json);
	 		
	 		System.out.println("GETTING  EMPLOYEE SALARY DETAILS FOR PAYROLL COMPLETED\n");
	 		return Response.status(200).entity(salaryList).build();
	 		
	 	
	 	     } 
	
	 	
	 	/*
	 	 * API CALL FOR SALARY REPORT DELETE
	 	 */
	 	@POST
	 	@Path("/salaryreportDelete")
	 	@Consumes(value= {"application/json"})
	 	@Produces(value={"application/json"})
	 	public Response salaryreportDelete(PayrollJSON json)
	 	     {
	 		System.out.println(" DELETING  EMPLOYEE SALARY DETAILS FOR PAYROLL \n");
	 		
	 	
	 		PayrollJSON salaryData=new PayrollJSON();
	 		salaryData =PayrollLogic.SalaryReportDelete(json);
	 		
	 		System.out.println("DELETING  EMPLOYEE SALARY DETAILS FOR PAYROLL COMPLETED\n");
	 		return Response.status(200).entity(salaryData).build();
	 		
	 	
	 	     } 
	 	
		
	 	/*
	 	 * API CALL FOR SALARY REPORT DELETE
	 	 */
	 	@POST
	 	@Path("/salaryreportView")
	 	@Consumes(value= {"application/json"})
	 	@Produces(value={"application/json"})
	 	public Response salaryreportView(PayrollJSON json)
	 	     {
	 		System.out.println(" GETTING  EMPLOYEE SALARY DETAILS FOR PAYROLL VIEW\n");
	 		
	 	
	 		ArrayList <PayrollJSON> salaryList=new ArrayList <PayrollJSON>();
	 		salaryList =PayrollLogic.SalaryReportView(json);
	 		
	 		System.out.println("GETTING  EMPLOYEE SALARY DETAILS FOR PAYROLL VIEW COMPLETED\n");
	 		return Response.status(200).entity(salaryList).build();
	 		
	 	
	 	     } 
	 	
	 	
	 	
	 	
}