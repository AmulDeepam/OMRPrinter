package staff;

import java.text.ParseException;



import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;


import staff.StaffController;
import staff.StaffJSON;
@Path(value="/staff")
public class StaffService {
	  /*
	 * API for add staff name
	 */
		
		    @POST
		    @Produces(value="application/json" )
		    @Path(value="/addstaff")
		    @Consumes(value="application/json")
		 
		 public Response addstaff(StaffJSON json) throws ParseException {
		    	System.out.println("going to add staff.......");
		    	StaffController mas=new StaffController();
		    	mas.addstaff(json);	
		    	System.out.println("call returned from controller");
		    	System.out.println(json);
		     	return Response.status(200).entity(json).build();

		    }
		    
		    /*
			 * API for retrieving staff list 	
			 */
				  
		    
		    @POST
		    @Produces(value="application/json" )
		    @Path(value="/selectstaff")
		    @Consumes(value="application/json")
		    public Response selectstaff(StaffJSON json) throws ParseException {
		    	System.out.println("going to generate staff report details.......");		    		    
		    	StaffController staffList =new StaffController();
		    	json=staffList.selectstaff(json);
		    	
		    	/*reportAndCount.setEmployeeRetrievelist(employeeRetrievelist);
		    	*/
		        System.out.println("generated  staff report details successfully.......");
		     	return Response.status(200).entity(json).build();
		    }
		    
		    /*
		 			 * API for retrieving customer list 	
		 			 */
		 				  
		 		    
		 		    @POST
		 		    @Produces(value="application/json" )
		 		    @Path(value="/deletestaff")
		 		    @Consumes(value="application/json")
		 		    public Response deletestaff(StaffJSON json) throws ParseException {
		 		    	System.out.println("going to delete customer report details.......");		    		    
		 		    	StaffController deletestaffList =new StaffController();
		 		    	json=deletestaffList.deletestaff(json);
		 		    	
		 		    	/*reportAndCount.setEmployeeRetrievelist(employeeRetrievelist);
		 		    	*/
		 		        System.out.println("deleted  customer report details successfully.......");
		 		     	return Response.status(200).entity(json).build();
		 		    }
		 		    
		 		    
		 		   @POST
				    @Produces(value="application/json" )
				    @Path(value="/EmployeeDetailsUpdate")
				    @Consumes(value="application/json")
				    public Response updateemployee(StaffJSON json) throws ParseException {
				    	System.out.println("going to delete customer report details.......");		    		    
				    	StaffController updateemployeeList =new StaffController();
				    	json=updateemployeeList.updateemployee(json);
				    	
				    	/*reportAndCount.setEmployeeRetrievelist(employeeRetrievelist);
				    	*/
				        System.out.println("deleted  customer report details successfully.......");
				    	return Response.status(200).entity(json).build();
				    }

		 		    
		    /*
			 * API for add salary
			 */
				
				    @POST
				    @Produces(value="application/json" )
				    @Path(value="/addsalary")
				    @Consumes(value="application/json")
				 
				 public Response addsalary(StaffJSON json) throws ParseException {
				    	System.out.println("going to add salary.......");
				    	StaffController mas=new StaffController();
				    	mas.addsalary(json);	
				    	System.out.println("call returned from controller");
				    	System.out.println(json);
				     	return Response.status(200).entity(json).build();
				    }
				    
				    /*
					 * API for retrieving salary report 	
					 */
						  
				    
				    @POST
				    @Produces(value="application/json" )
				    @Path(value="/salaryreport")
				    @Consumes(value="application/json")
				    public Response salaryreport(StaffJSON json) throws ParseException {
				    	System.out.println("going to generate staff report details.......");		    		    
				    	StaffController staffList =new StaffController();
				    	json=staffList.salaryreport(json);
				    	
				    	/*reportAndCount.setEmployeeRetrievelist(employeeRetrievelist);
				    	*/
				        System.out.println("generated  staff report details successfully.......");
				     	return Response.status(200).entity(json).build();
				    }
}
