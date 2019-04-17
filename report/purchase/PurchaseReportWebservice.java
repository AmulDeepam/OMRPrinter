package report.purchase;

import java.text.ParseException;


import java.util.ArrayList;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;




@Path(value="/PurchaseReport")
public class PurchaseReportWebservice {

	/*
	 * API CALL FOR DAILY SALES REPORT
	 */
	@POST
	@Path("/DailyPurchaseReport")
	@Consumes(value= {"application/json"})
	@Produces(value={"application/json"})
	public Response DailyPurchaseReport(PurchaseReportJSON json)
	     {
		System.out.println("GENERATING DAILY PURCHASE REPORT DETAILS \n");
		
		ArrayList <PurchaseReportJSON> dailyEstimateList=new ArrayList <PurchaseReportJSON>();
		dailyEstimateList =PurchaseReportLogic.DailyReport(json);
		
		System.out.println("GENERATING DAILY PURCHASE REPORT DETAILS  COMPLETED\n");
		return Response.status(200).entity(dailyEstimateList).build();
		
	
	     }   
	
	     
	     /*
	 	 * API CALL FOR DAILY PURCHASE REPORT DELETE
	 	 */
	 	@POST
	 	@Path("/DailyPurchaseReportDelete")
	 	@Consumes(value= {"application/json"})
	 	@Produces(value={"application/json"})
	 	public Response DailyPurchaseReportDelete(PurchaseReportJSON json)
	 	     {
	 		System.out.println("DELETING DAILY PURCHASE REPORT DETAILS \n");
	 		
	 		PurchaseReportJSON dailyEstimateList=new PurchaseReportJSON();
	 		dailyEstimateList =PurchaseReportLogic.DailyReportDelete(json);
	 		
	 		System.out.println("DELETING DAILY PURCHASE REPORT DETAILS  COMPLETED\n");
	 		return Response.status(200).entity(dailyEstimateList).build();
	 		
	 	
	 	     }  
	 	     
	 	    /*
	 	 	 * API CALL FOR MONTHLY PURCHASE REPORT DELETE
	 	 	 */
	 	 	@POST
	 	 	@Path("/MonthlyPurchaseReport")
	 	 	@Consumes(value= {"application/json"})
	 	 	@Produces(value={"application/json"})
	 	 	public Response MonthlyPurchaseReport(PurchaseReportJSON json)
	 	 	     {
	 	 		System.out.println("MONTHLY PURCHASE REPORT DETAILS \n");
	 	 		
	 	 		ArrayList <PurchaseReportJSON> monthlyEstimateList=new ArrayList <PurchaseReportJSON>();
	 	 		monthlyEstimateList =PurchaseReportLogic.MonthlyReport(json);
	 	 		
	 	 		System.out.println("MONTHLY PURCHASE REPORT DETAILS  COMPLETED\n");
	 	 		return Response.status(200).entity(monthlyEstimateList).build();
	 	 		
	 	 	
	 	 	     }  
	 	     
	 	     
	 	 	   /*
	 	 	 	 * API CALL FOR YEARLY PURCHASE REPORT DELETE
	 	 	 	 */
	 	 	 	@POST
	 	 	 	@Path("/YearlyPurchaseReport")
	 	 	 	@Consumes(value= {"application/json"})
	 	 	 	@Produces(value={"application/json"})
	 	 	 	public Response YearlyPurchaseReport(PurchaseReportJSON json)
	 	 	 	     {
	 	 	 		System.out.println("YEARLY PURCHASE REPORT DETAILS \n");
	 	 	 		
	 	 	 		ArrayList <PurchaseReportJSON> yearlyEstimateList=new ArrayList <PurchaseReportJSON>();
	 	 	 		yearlyEstimateList =PurchaseReportLogic.YearlyReport(json);
	 	 	 		
	 	 	 		System.out.println("YEARLY PURCHASE REPORT DETAILS  COMPLETED\n");
	 	 	 		return Response.status(200).entity(yearlyEstimateList).build();
	 	 	 		
	 	 	 	
	 	 	 	     }  
	 	     
	 	 	 	   /*
	 	 	 	 	 * API CALL FOR YEARLY PURCHASE REPORT DELETE
	 	 	 	 	 */
	 	 	 	 	@POST
	 	 	 	 	@Path("/DateWisePurchaseReport")
	 	 	 	 	@Consumes(value= {"application/json"})
	 	 	 	 	@Produces(value={"application/json"})
	 	 	 	 	public Response DateWisePurchaseReport(PurchaseReportJSON json)
	 	 	 	 	     {
	 	 	 	 		System.out.println("DATE WISE PURCHASE REPORT DETAILS \n");
	 	 	 	 		
	 	 	 	 		ArrayList <PurchaseReportJSON> yearlyEstimateList=new ArrayList <PurchaseReportJSON>();
	 	 	 	 		yearlyEstimateList =PurchaseReportLogic.DateWiseReport(json);
	 	 	 	 		
	 	 	 	 		System.out.println("DATE WISE PURCHASE REPORT DETAILS  COMPLETED\n");
	 	 	 	 		return Response.status(200).entity(yearlyEstimateList).build();
	 	 	 	 		
	 	 	 	 	
	 	 	 	 	     }  
	 	 	 	 	     
	 	 	 	 	     
	 	 	 	 	     
				 	     

				/*
				 * API CALL FOR DAILY PURCHASE REPORT DATA
				*/
			    @POST
				@Path("/DailyPurchaseReportData")
			    @Consumes(value= {"application/json"})
				@Produces(value={"application/json"})
			    public Response DailyPurchaseReportData(PurchaseReportJSON json)
			      {
					System.out.println("GETTING DAILY PURCHASE REPORT DATA DETAILS FOR VIEW \n");
								 		
					ArrayList<PurchaseReportJSON> purchaseViewList=new ArrayList<PurchaseReportJSON>();
					purchaseViewList =PurchaseReportLogic.DailyReportView(json);
								 		
					System.out.println("GETTING DAILY PURCHASE REPORT DATA FOR VIEW COMPLETED\n");
				    return Response.status(200).entity(purchaseViewList).build();
								 		
								 	
				} 
				 	     
			    
				/*
				 * API for registering and adding new customer	
				 */
					
					    @POST
					    @Produces(value="application/json" )
					    @Path(value="/PurchaseReportEdit")
					    @Consumes(value="application/json")
					 
					 public Response PurchaseReportEdit(PurchaseReportJSON json) throws ParseException {
					    	System.out.println("going to add data into Vendor Statement.......");
					    	PurchaseReportLogic mas=new PurchaseReportLogic();
					    	mas.PurchaseReportEdit(json);		
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
					    public Response invoicepaymentreport(PurchaseReportJSON json) throws ParseException {
					    	System.out.println("going to generate invoicepaymentreport details.......");		    		    
					    	PurchaseReportLogic SalesReportLogic =new PurchaseReportLogic();
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
					    @Path(value="/vendorstatementreport")
					    @Consumes(value="application/json")
					    public Response vendorstatementreport(PurchaseReportJSON json) throws ParseException {
					    	System.out.println("going to generate invoicepaymentreport details.......");		    		    
					    	PurchaseReportLogic SalesReportLogic =new PurchaseReportLogic();
					    	json=SalesReportLogic.vendorstatementreport(json);
					    	
					    	/*reportAndCount.setEmployeeRetrievelist(employeeRetrievelist);
					    	*/
					        System.out.println("generated  invoicepaymentreport details successfully.......");
					     	return Response.status(200).entity(json).build();
					    }
				 	     
	 	     
	 	 	 	 	     
	 	 	 	 	     
	 	 	 	 	     
	 	     
}