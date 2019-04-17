package report.estimate;

import java.text.ParseException;


import java.util.ArrayList;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;




@Path(value="/EstimateReport")
public class EstimateReportWebservice {


	/*
	 * API CALL FOR DAILY SALES REPORT
	 */
	@POST
	@Path("/DailyEstimateReport")
	@Consumes(value= {"application/json"})
	@Produces(value={"application/json"})
	public Response DailyEstimateReport(EstimateReportJSON json)
	     {
		System.out.println("GENERATING DAILY ESTIMATE REPORT DETAILS \n");
		
		ArrayList <EstimateReportJSON> dailyEstimateList=new ArrayList <EstimateReportJSON>();
		dailyEstimateList =EstimateReportLogic.DailyReport(json);
		
		System.out.println("GENERATING DAILY ESTIMATE REPORT DETAILS  COMPLETED\n");
		return Response.status(200).entity(dailyEstimateList).build();
		
	
	     }  
	     
	     

	   		/*
		 	 * API CALL FOR ESTIMATE  REPORT DELETE
		 	 */
		 	@POST
		 	@Path("/DailyEstimateReportDelete")
		 	@Consumes(value= {"application/json"})
		 	@Produces(value={"application/json"})
		 	public Response DailyEstimateReportDelete(EstimateReportJSON json)
		 	     {
		 		System.out.println("DELETING FROM DAILY ESTIMATE REPORT DETAILS \n");
		 		
		 		EstimateReportJSON dailyEstimateList=new EstimateReportJSON();
		 		dailyEstimateList =EstimateReportLogic.DailyReportDelete(json);
		 		
		 		System.out.println("DELETING FROM DAILY ESTIMATE REPORT COMPLETED\n");
		 		return Response.status(200).entity(dailyEstimateList).build();
		 		
		 	
		 	     }   
	     
		 	    /*
				 	 * API CALL FOR MONTHLY ESTIMATE  REPORT DELETE
				 	 */
				 	@POST
				 	@Path("/MonthlyEstimateReport")
				 	@Consumes(value= {"application/json"})
				 	@Produces(value={"application/json"})
				 	public Response MonthlyEstimateReport(EstimateReportJSON json)
				 	     {
				 		System.out.println("GETTING MONTHLY ESTIMATE REPORT DETAILS \n");
				 		
				 		ArrayList <EstimateReportJSON> monthlyEstimateList=new ArrayList <EstimateReportJSON>();
				 		monthlyEstimateList =EstimateReportLogic.MonthlyReport(json);
				 		
				 		System.out.println("GETTING MONTHLY ESTIMATE REPORT DETAILS COMPLETED\n");
				 		return Response.status(200).entity(monthlyEstimateList).build();
				 		
				 	
				 	     }   
	     
				 	    	/*
						 	 * API CALL FOR YEARLY ESTIMATE  REPORT DELETE
						 	 */
						 	@POST
						 	@Path("/YearlyEstimateReport")
						 	@Consumes(value= {"application/json"})
						 	@Produces(value={"application/json"})
						 	public Response YearlyEstimateReport(EstimateReportJSON json)
						 	     {
						 		System.out.println("GETTING YEARLY ESTIMATE REPORT DETAILS \n");
						 		
						 		ArrayList <EstimateReportJSON> yearlyEstimateList=new ArrayList <EstimateReportJSON>();
						 		yearlyEstimateList =EstimateReportLogic.YearlyReport(json);
						 		
						 		System.out.println("GETTING YEARLY ESTIMATE REPORT DETAILS COMPLETED\n");
						 		return Response.status(200).entity(yearlyEstimateList).build();
						 		
						 	
						 	     }  
						 	     
						 			/*
								 	 * API CALL FOR DATE WISE ESTIMATE  REPORT DELETE
								 	 */
								 	@POST
								 	@Path("/DateWiseEstimateReport")
								 	@Consumes(value= {"application/json"})
								 	@Produces(value={"application/json"})
								 	public Response DateWiseEstimateReport(EstimateReportJSON json)
								 	     {
								 		System.out.println("GETTING DATE WISE ESTIMATE REPORT DETAILS \n");
								 		
								 		ArrayList <EstimateReportJSON> dateWiseEstimateList=new ArrayList <EstimateReportJSON>();
								 		dateWiseEstimateList =EstimateReportLogic.DateWiseReport(json);
								 		
								 		System.out.println("GETTING DATE WISE ESTIMATE REPORT DETAILS COMPLETED\n");
								 		return Response.status(200).entity(dateWiseEstimateList).build();
								 		
								 	
								 	     } 	     
						 	     
	     
									/*
									 * API CALL FOR DAILY SALES REPORT DATA
									*/
								    @POST
									@Path("/DailyEstimateReportData")
								    @Consumes(value= {"application/json"})
									@Produces(value={"application/json"})
								    public Response DailyEstimateReportData(EstimateReportJSON json)
								      {
										System.out.println("GETTING DAILY ESTIMATE REPORT DATA DETAILS FOR VIEW \n");
													 		
										ArrayList<EstimateReportJSON> estimateViewList=new ArrayList<EstimateReportJSON>();
										estimateViewList =EstimateReportLogic.DailyReportView(json);
													 		
										System.out.println("GETTING DAILY ESTIMATE REPORT DATA FOR VIEW COMPLETED\n");
									    return Response.status(200).entity(estimateViewList).build();
													 		
													 	
									} 
									/*
									 * API for registering and adding new customer	
									 */
										
										    @POST
										    @Produces(value="application/json" )
										    @Path(value="/EstimateReportEdit")
										    @Consumes(value="application/json")
										 
										 public Response EstimateReportEdit(EstimateReportJSON json) throws ParseException {
										    	System.out.println("going to add customer.......");
										    	EstimateReportLogic mas=new EstimateReportLogic();
										    	mas.EstimateReportEdit(json);		
										    	System.out.println(json);
										     	return Response.status(200).entity(json).build();
									}
										
										    /*
											 * API for retrieving category list 	
											 */
												  
										    
										    @POST
										    @Produces(value="application/json" )
										    @Path(value="/invoicepaymentreport")
										    @Consumes(value="application/json")
										    public Response invoicepaymentreport(EstimateReportJSON json) throws ParseException {
										    	System.out.println("going to generate invoicepaymentreport details.......");		    		    
										    	EstimateReportLogic SalesReportLogic =new EstimateReportLogic();
										    	json=SalesReportLogic.invoicepaymentreport(json);
										    	
										    	/*reportAndCount.setEmployeeRetrievelist(employeeRetrievelist);
										    	*/
										        System.out.println("generated  invoicepaymentreport details successfully.......");
										     	return Response.status(200).entity(json).build();
										    }
										    
										    /*
											 * API for retrieving category list 	
											 */
												  
										    
										    @POST
										    @Produces(value="application/json" )
										    @Path(value="/Estimatecustomerstatementreport")
										    @Consumes(value="application/json")
										    public Response Estimatecustomerstatementreport(EstimateReportJSON json) throws ParseException {
										    	System.out.println("going to generate invoicepaymentreport details.......");		    		    
										    	EstimateReportLogic EstimateReportLogic =new EstimateReportLogic();
										    	json=EstimateReportLogic.Estimatecustomerstatementreport(json);
										    	
										    	/*reportAndCount.setEmployeeRetrievelist(employeeRetrievelist);
										    	*/
										        System.out.println("generated  invoicepaymentreport details successfully.......");
										     	return Response.status(200).entity(json).build();
										    }
									 	     
}