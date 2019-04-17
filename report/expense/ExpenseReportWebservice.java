package report.expense;

import java.util.ArrayList;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;


@Path(value="/ExpenseReport")
public class ExpenseReportWebservice {

	
	/*
	 * API CALL FOR DAILY EXPENSE REPORT
	 */
	@POST
	@Path("/DailyExpenseReport")
	@Consumes(value= {"application/json"})
	@Produces(value={"application/json"})
	public Response DailyExpenseReport(ExpenseReportJSON json)
	     {
		System.out.println("GENERATING DAILY EXPENSE REPORT DETAILS \n");
		
		ArrayList <ExpenseReportJSON> dailyExpenseList=new ArrayList <ExpenseReportJSON>();
		dailyExpenseList =ExpenseReportLogic.DailyReport(json);
		
		System.out.println("GENERATING DAILY EXPENSE REPORT DETAILS  COMPLETED\n");
		return Response.status(200).entity(dailyExpenseList).build();
		
	
	     }  
	
	     
	     /*
	 	 * API CALL FOR DAILY EXPENSE REPORT DELETE
	 	 */
	 	@POST
	 	@Path("/DailyExpenseReportDelete")
	 	@Consumes(value= {"application/json"})
	 	@Produces(value={"application/json"})
	 	public Response DailyExpenseReportDelete(ExpenseReportJSON json)
	 	     {
	 		System.out.println("DELETING FROM DAILY EXPENSE REPORT DETAILS \n");
	 		
	 		ExpenseReportJSON dailyExpenseList=new ExpenseReportJSON();
	 		dailyExpenseList =ExpenseReportLogic.DailyReportDelete(json);
	 		
	 		System.out.println("DELETING FROM DAILY EXPENSE REPORT COMPLETED\n");
	 		return Response.status(200).entity(dailyExpenseList).build();
	 		
	 	
	 	     } 
	
	 	    /*
	 	 	 * API CALL FOR DAILY EXPENSE REPORT UPDATE
	 	 	 */
	 	 	@POST
	 	 	@Path("/DailyExpenseReportUpdate")
	 	 	@Consumes(value= {"application/json"})
	 	 	@Produces(value={"application/json"})
	 	 	public Response DailyExpenseReportUpdate(ExpenseReportJSON json)
	 	 	     {
	 	 		System.out.println("UPDATING DAILY EXPENSE REPORT DETAILS \n");
	 	 		
	 	 		ExpenseReportJSON dailyExpenseList=new ExpenseReportJSON();
	 	 		dailyExpenseList =ExpenseReportLogic.DailyReportUpdate(json);
	 	 		
	 	 		System.out.println("UPDATING DAILY EXPENSE REPORT COMPLETED\n");
	 	 		return Response.status(200).entity(dailyExpenseList).build();
	 	 		
	 	 	
	 	 	     }  
	
	
	 	 		/*
	 	 		 * API CALL FOR MONTHLY EXPENSE REPORT
	 	 		 */
	 	 		@POST
	 	 		@Path("/MonthlyExpenseReport")
	 	 		@Consumes(value= {"application/json"})
	 	 		@Produces(value={"application/json"})
	 	 		public Response MonthlyExpenseReport(ExpenseReportJSON json)
	 	 		     {
	 	 			System.out.println("GENERATING MONTHLY EXPENSE REPORT DETAILS \n");
	 	 			
	 	 			ArrayList <ExpenseReportJSON> dailyExpenseList=new ArrayList <ExpenseReportJSON>();
	 	 			dailyExpenseList =ExpenseReportLogic.MonthlyReport(json);
	 	 			
	 	 			System.out.println("GENERATING MONTHLY EXPENSE REPORT DETAILS  COMPLETED\n");
	 	 			return Response.status(200).entity(dailyExpenseList).build();
	 	 			
	 	 		
	 	 		     }   
	 	 	     
	 	 		   /*
	 	 	 		 * API CALL FOR YEARLY EXPENSE REPORT
	 	 	 		 */
	 	 	 		@POST
	 	 	 		@Path("/YearlyExpenseReport")
	 	 	 		@Consumes(value= {"application/json"})
	 	 	 		@Produces(value={"application/json"})
	 	 	 		public Response YearlyExpenseReport(ExpenseReportJSON json)
	 	 	 		     {
	 	 	 			System.out.println("GENERATING YEARLY EXPENSE REPORT DETAILS \n");
	 	 	 			
	 	 	 			ArrayList <ExpenseReportJSON> dailyExpenseList=new ArrayList <ExpenseReportJSON>();
	 	 	 			dailyExpenseList =ExpenseReportLogic.YearlyReport(json);
	 	 	 			
	 	 	 			System.out.println("GENERATING YEARLY EXPENSE REPORT DETAILS  COMPLETED\n");
	 	 	 			return Response.status(200).entity(dailyExpenseList).build();
	 	 	 			
	 	 	 		
	 	 	 		     }   
	 	 	     
	 	 	 		  /*
	 	 	 	 		 * API CALL FOR DATE WISE EXPENSE REPORT
	 	 	 	 		 */
	 	 	 	 		@POST
	 	 	 	 		@Path("/DateWiseExpenseReport")
	 	 	 	 		@Consumes(value= {"application/json"})
	 	 	 	 		@Produces(value={"application/json"})
	 	 	 	 		public Response DateWiseExpenseReport(ExpenseReportJSON json)
	 	 	 	 		     {
	 	 	 	 			System.out.println("GENERATING DATE WISE EXPENSE REPORT DETAILS \n");
	 	 	 	 			
	 	 	 	 			ArrayList <ExpenseReportJSON> dailyExpenseList=new ArrayList <ExpenseReportJSON>();
	 	 	 	 			dailyExpenseList =ExpenseReportLogic.DateWiseReport(json);
	 	 	 	 			
	 	 	 	 			System.out.println("GENERATING DATE WISE EXPENSE REPORT DETAILS  COMPLETED\n");
	 	 	 	 			return Response.status(200).entity(dailyExpenseList).build();
	 	 	 	 			
	 	 	 	 		
	 	 	 	 		     } 
	
}