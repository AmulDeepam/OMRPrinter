package login;

import java.util.ArrayList;


import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;



@Path("/Login")
public class LoginWebservice {


	/*
	 * API CALL FOR LOGIN
	 */
	@POST
	@Path("/LoginCheck")
	@Consumes(value= {"application/json"})
	@Produces(value={"application/json"})
	public Response LoginCheck(LoginJSON json)
	     {
		System.out.println("CHECKING LOGIN CREDENTIALS  \n");
		
		LoginJSON login=new LoginJSON();
		login =LoginLogic.LoginCheck(json);
		
		System.out.println("CHECKING LOGIN CREDENTIALS COMPLETED\n");
		return Response.status(200).entity(login).build();
		
	
	     }  
	
    /*
	 	 * API CALL FOR DAILY EXPENSE REPORT UPDATE
	 	 */
	 	@POST
	 	@Path("/UpdateStatus")
	 	@Consumes(value= {"application/json"})
	 	@Produces(value={"application/json"})
	 	public Response UpdateStatus(LoginJSON json)
	 	     {
	 		System.out.println("inside Update Status Function............");
	 		
	 		LoginJSON dailyExpenseList=new LoginJSON();
	 		dailyExpenseList =LoginLogic.UpdateStatus(json);
	 		
	 		System.out.println("inside Update Status Function completed............");
	 		return Response.status(200).entity(dailyExpenseList).build();
	 		
	 	
	 	     }  

}
