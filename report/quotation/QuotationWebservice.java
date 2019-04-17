package report.quotation;

import java.util.ArrayList;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;



@Path(value="/QuotationReport")
public class QuotationWebservice {

	
	/*
	 * API CALL FOR DELETING DATA IN QUOTAION 
	 * WITH GST
	 */
	@POST
	@Path("/DeleteGSTQuotationReport")
	@Consumes(value= {"application/json"})
	@Produces(value={"application/json"})
	public Response DailyPurchaseReport(QuotationJSON json)
	     {
		System.out.println("DELETING QUOTATION REPORT DETAILS \n");
		
		QuotationJSON deletedata=new  QuotationJSON();
		json.setTableName("GSTQuotationTable");
		deletedata =QuotationLogic.DeleteReport(json);
		
		System.out.println("DELETING QUOTATION REPORT DETAILS COMPLETED\n");
		return Response.status(200).entity(deletedata).build();
		
	
	     }   
	
	
	/*
	 * API CALL FOR DELETING DATA IN QUOTAION 
	 * WITHOUT GST
	 */
	@POST
	@Path("/DeleteWithoutGSTQuotationReport")
	@Consumes(value= {"application/json"})
	@Produces(value={"application/json"})
	public Response DeleteWithoutGSTQuotationReport(QuotationJSON json)
	     {
		System.out.println("DELETING WITHOUT GST QUOTATION REPORT DETAILS \n");
		
		QuotationJSON deletedata=new  QuotationJSON();
		json.setTableName("WithoutGSTQuotationTable");
		deletedata =QuotationLogic.DeleteReport(json);
		
		System.out.println("DELETING WITHOUT GST QUOTATION REPORT DETAILS COMPLETED\n");
		return Response.status(200).entity(deletedata).build();
		
	
	     }    
	
	 	
	 	/*
	 	 * API CALL FOR VIEWING DATA IN QUOTAION 
	 	 * WITH GST
	 	 */
	 	@POST
	 	@Path("/ViewGSTQuotationReport")
	 	@Consumes(value= {"application/json"})
	 	@Produces(value={"application/json"})
	 	public Response ViewGSTQuotationReport(QuotationJSON json) {
	 	    
	 		System.out.println("VIEWING DATA WITH GST  \n");
	 		
	 		ArrayList <QuotationJSON> quotationDataList=new ArrayList <QuotationJSON>();
	 		quotationDataList =QuotationLogic.ViewGSTReport(json);
	 		
	 		System.out.println("VIEWING DATA WITH GST  COMPLETED\n");
	 		return Response.status(200).entity(quotationDataList).build();
	 		
	 	
	 	     }       
	
	
		/*
	 	 * API CALL FOR VIEWING DATA IN QUOTAION 
	 	 * WITH GST
	 	 */
	 	@POST
	 	@Path("/ViewWithoutGSTQuotationReport")
	 	@Consumes(value= {"application/json"})
	 	@Produces(value={"application/json"})
	 	public Response ViewWithoutGSTQuotationReport(QuotationJSON json) {
	 	    
	 		System.out.println("VIEWING DATA WITHOUT GST  \n");
	 		
	 		ArrayList <QuotationJSON> quotationDataList=new ArrayList <QuotationJSON>();
	 		quotationDataList =QuotationLogic.ViewWithoutGSTReport(json);
	 		
	 		System.out.println("VIEWING DATA WITHOUT GST  COMPLETED\n");
	 		return Response.status(200).entity(quotationDataList).build();
	 		
	 	
	 	     }   
	
}