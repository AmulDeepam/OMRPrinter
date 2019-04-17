package report.sales;

import java.text.ParseException;



import java.util.ArrayList;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;





@Path(value="/SalesReport")
public class SalesReportWebservice {

	
	
	/*
	 * API CALL FOR DAILY SALES REPORT
	 */
	@POST
	@Path("/DailySalesReport")
	@Consumes(value= {"application/json"})
	@Produces(value={"application/json"})
	public Response DailySalesReport(SalesReportJSON json)
	     {
		System.out.println("GENERATING DAILY SALES REPORT DETAILS \n");
		
		ArrayList <SalesReportJSON> dailySalesList=new ArrayList <SalesReportJSON>();
		dailySalesList =SalesReportLogic.DailyReport(json);
		
		System.out.println("GENERATING DAILY SALES REPORT DETAILS  COMPLETED\n");
		return Response.status(200).entity(dailySalesList).build();
		
	
	     }  
	
	
	   		/*
		 	 * API CALL FOR DAILY SALES REPORT DELETE
		 	 */
		 	@POST
		 	@Path("/DailySalesReportDelete")
		 	@Consumes(value= {"application/json"})
		 	@Produces(value={"application/json"})
		 	public Response DailySalesReportDelete(SalesReportJSON json)
		 	     {
		 		System.out.println("DELETING FROM DAILY SALES REPORT DETAILS \n");
		 		
		 		SalesReportJSON dailySalesList=new SalesReportJSON();
		 		dailySalesList =SalesReportLogic.DailyReportDelete(json);
		 		
		 		System.out.println("DELETING FROM DAILY SALES REPORT COMPLETED\n");
		 		return Response.status(200).entity(dailySalesList).build();
		 		
		 	
		 	     } 
		
		  			/*
				 	 * API CALL FOR MONTHLY SALES REPORT 
				 	 */
				 	@POST
				 	@Path("/MonthlySalesReport")
				 	@Consumes(value= {"application/json"})
				 	@Produces(value={"application/json"})
				 	public Response MonthlySalesReport(SalesReportJSON json)
				 	     {
				 		System.out.println("GENERATING MONTHLY SALES REPORT DETAILS \n");
				 		
				 		ArrayList <SalesReportJSON> monthlySalesList=new ArrayList <SalesReportJSON>();
				 		monthlySalesList =SalesReportLogic.MonthlyReport(json);
				 		
				 		System.out.println("GENERATING MONTHLY SALES REPORT  COMPLETED\n");
				 		return Response.status(200).entity(monthlySalesList).build();
				 		
				 	
				 	     }  
				
	
				 	     
				 	     	/*
						 	 * API CALL FOR YEARLY SALES REPORT 
						 	 */
						 	@POST
						 	@Path("/YearlySalesReport")
						 	@Consumes(value= {"application/json"})
						 	@Produces(value={"application/json"})
						 	public Response YearlySalesReport(SalesReportJSON json)
						 	     {
						 		System.out.println("GENERATING YEARLY SALES REPORT DETAILS \n");
						 		
						 		ArrayList <SalesReportJSON> yearlySalesList=new ArrayList <SalesReportJSON>();
						 		yearlySalesList =SalesReportLogic.YearlyReport(json);
						 		
						 		System.out.println("GENERATING YEARLY SALES REPORT  COMPLETED\n");
						 		return Response.status(200).entity(yearlySalesList).build();
						 		
						 	
						 	     }  
				 	     

					     	/*
						 	 * API CALL FOR DATE_WISE SALES REPORT 
						 	 */
						 	@POST
						 	@Path("/DateWiseSalesReport")
						 	@Consumes(value= {"application/json"})
						 	@Produces(value={"application/json"})
						 	public Response DateWiseSalesReport(SalesReportJSON json)
						 	     {
						 		System.out.println("GENERATING DATE WISE SALES REPORT DETAILS \n");
						 		
						 		ArrayList <SalesReportJSON> yearlySalesList=new ArrayList <SalesReportJSON>();
						 		yearlySalesList =SalesReportLogic.DateWiseReport(json);
						 		
						 		System.out.println("GENERATING DATE WISE SALES REPORT  COMPLETED\n");
						 		return Response.status(200).entity(yearlySalesList).build();
						 		
						 	
						 	     }
						 	
						 	
					     	/*
						 	 * API CALL FOR CUSTOMER STATEMENT SALES REPORT 
						 	 */
						 	@POST
						 	@Path("/CustomerStmtSalesReport")
						 	@Consumes(value= {"application/json"})
						 	@Produces(value={"application/json"})
						 	public Response CustomerStmtSalesReport(SalesReportJSON json)
						 	     {
						 		System.out.println("GENERATING CUSTOMER STATEMENT SALES REPORT DETAILS \n");
						 		
						 		ArrayList <SalesReportJSON> customerSalesList=new ArrayList <SalesReportJSON>();
						 		customerSalesList =SalesReportLogic.CustomerStatementReport(json);
						 		
						 		System.out.println("GENERATING CUSTOMER STATEMENT SALES REPORT  COMPLETED\n");
						 		return Response.status(200).entity(customerSalesList).build();
						 		
						 	
						 	     }  
								 	
								 	
		
						 	     

				/*
				 * API CALL FOR DAILY SALES REPORT DATA
				*/
			    @POST
				@Path("/DailySalesReportData")
			    @Consumes(value= {"application/json"})
				@Produces(value={"application/json"})
			    public Response DailySalesReportData(SalesReportJSON json)
			      {
					System.out.println("GETTING DAILY SALES REPORT DATA DETAILS FOR VIEW \n");
								 		
					ArrayList<SalesReportJSON> salesViewList=new ArrayList<SalesReportJSON>();
					salesViewList =SalesReportLogic.DailyReportView(json);
								 		
					System.out.println("GETTING DAILY SALES REPORT DATA FOR VIEW COMPLETED\n");
				    return Response.status(200).entity(salesViewList).build();
								 		
								 	
				} 
			    
				/*
				 * API for registering and adding new customer	
				 */
					
					    @POST
					    @Produces(value="application/json" )
					    @Path(value="/SalesReportEdit")
					    @Consumes(value="application/json")
					 
					 public Response SalesReportEdit(SalesReportJSON json) throws ParseException {
					    	System.out.println("going to add customer.......");
					    	SalesReportLogic mas=new SalesReportLogic();
					    	mas.SalesReportEdit(json);		
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
					    public Response invoicepaymentreport(SalesReportJSON json) throws ParseException {
					    	System.out.println("going to generate invoice payment report details.......");		    		    
					    	SalesReportLogic SalesReportLogic =new SalesReportLogic();
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
					    @Path(value="/salescustomerstatementreport")
					    @Consumes(value="application/json")
					    public Response salescustomerstatementreport(SalesReportJSON json) throws ParseException {
					    	System.out.println("going to generate invoicepaymentreport details.......");		    		    
					    	SalesReportLogic SalesReportLogic =new SalesReportLogic();
					    	json=SalesReportLogic.salescustomerstatementreport(json);
					    	
					    	/*reportAndCount.setEmployeeRetrievelist(employeeRetrievelist);
					    	*/
					        System.out.println("generated  invoicepaymentreport details successfully.......");
					     	return Response.status(200).entity(json).build();
					    }
				 	     
	
}