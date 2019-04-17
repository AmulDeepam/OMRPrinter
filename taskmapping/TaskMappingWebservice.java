package taskmapping;

import java.text.ParseException;


import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;

@Path(value="/taskmapping")

public class TaskMappingWebservice {
	/*
	    * API for specifying permission for each role
	    */
	    
	    @POST
	    @Produces(value="application/json" )
	    @Path(value="/retrievePermission")
	    @Consumes(value="application/json")
	    
	    public Response retreivePermission(TaskMappingJSON config) throws ParseException {
	    	TaskMappingJSON retreivepermission=new TaskMappingJSON();
		    
	    	System.out.println("entering  into process of setting permission for each role......."+ config.getPermission());
	    	retreivepermission=TaskMappingLogic.RetreivePermission(config);
	    	
	    		System.out.println("completed setting permission.......");	
	    	
	    	
	    	System.out.println("completed employee permission successfully.......");
	     	return Response.status(200).entity(retreivepermission).build();
}	   

	  	/*
		    * API for specifying permission for each role
		    */
		    
		    @POST
		    @Produces(value="application/json" )
		    @Path(value="/employeePermission")
		    @Consumes(value="application/json")
		    
		    public Response employeepermission(TaskMappingJSON config) throws ParseException {
		    	
		    	System.out.println("entering  into process of setting permission for each role......."+ config.getPermission());
		    	config=TaskMappingLogic.SetPermission(config);
		    	
		    		System.out.println("completed setting permission.......");	
		    	
		    	
		    	System.out.println("completed employee permission successfully.......");
		     	return Response.status(200).entity(config).build();
	}	   



}
