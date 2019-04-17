package expense;

import java.text.ParseException;


import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;

import expense.ExpenseJSON;


@Path(value="/expense")
public class ExpenseService {
	/*
	 * API for registering and adding new category	
	 */
		
		    @POST
		    @Produces(value="application/json" )
		    @Path(value="/addcategory")
		    @Consumes(value="application/json")
		 
		 public Response addcategory(ExpenseJSON json) throws ParseException {
		    	System.out.println("going to add Category.......");
		    	ExpenseController exp=new ExpenseController();
		    	exp.addcategory(json);		
		    	System.out.println(json);
		     	return Response.status(200).entity(json).build();
	}
		    /*
			 * API for registering and adding new user	
			 */
				
				    @POST
				    @Produces(value="application/json" )
				    @Path(value="/adduser")
				    @Consumes(value="application/json")
				 
				 public Response adduser(ExpenseJSON json) throws ParseException {
				    	System.out.println("going to add user.......");
				    	ExpenseController exp=new ExpenseController();
				    	exp.adduser(json);		
				    	System.out.println(json);
				     	return Response.status(200).entity(json).build();
			}
				    
				    /*
					 * API for registering and adding expense	
					 */
						
						    @POST
						    @Produces(value="application/json" )
						    @Path(value="/addexpense")
						    @Consumes(value="application/json")
						 
						 public Response addexpense(ExpenseJSON json) throws ParseException {
						    	System.out.println("going to add expense.......");
						    	ExpenseController exp=new ExpenseController();
						    	exp.addexpense(json);		
						    	System.out.println(json);
						     	return Response.status(200).entity(json).build();
					}
						    
						    
						    /*
							 * API for retrieving category list 	
							 */
								  
						    
						    @POST
						    @Produces(value="application/json" )
						    @Path(value="/categoryreport")
						    @Consumes(value="application/json")
						    public Response customerreport(ExpenseJSON json) throws ParseException {
						    	System.out.println("going to generate customer report details.......");		    		    
						    	ExpenseController categoryList =new ExpenseController();
						    	json=categoryList.categoryReport(json);
						    	
						    	/*reportAndCount.setEmployeeRetrievelist(employeeRetrievelist);
						    	*/
						        System.out.println("generated  category report details successfully.......");
						     	return Response.status(200).entity(json).build();
						    }

						    /*
							 * API for retrieving category list 	
							 */
								  
						    
						    @POST
						    @Produces(value="application/json" )
						    @Path(value="/deletecategory")
						    @Consumes(value="application/json")
						    public Response deletecategory(ExpenseJSON json) throws ParseException {
						    	System.out.println("going to generate customer report details.......");		    		    
						    	ExpenseController deletecategoryList =new ExpenseController();
						    	json=deletecategoryList.deletecategory(json);
						    	
						    	/*reportAndCount.setEmployeeRetrievelist(employeeRetrievelist);
						    	*/
						        System.out.println("generated  category report details successfully.......");
						     	return Response.status(200).entity(json).build();
						    }
						    /*
							 * API for retrieving user list 	
							 */
								  
						    
						    @POST
						    @Produces(value="application/json" )
						    @Path(value="/userreport")
						    @Consumes(value="application/json")
						    public Response userreport(ExpenseJSON json) throws ParseException {
						    	System.out.println("going to generate user report details.......");		    		    
						    	ExpenseController userList =new ExpenseController();
						    	json=userList.userreport(json);
						    	
						    	/*reportAndCount.setEmployeeRetrievelist(employeeRetrievelist);
						    	*/
						        System.out.println("generated  user report details successfully.......");
						     	return Response.status(200).entity(json).build();
						    }
      
						    /*
							 * API for retrieving category list 	
							 */
								  
						    
						    @POST
						    @Produces(value="application/json" )
						    @Path(value="/deleteuser")
						    @Consumes(value="application/json")
						    public Response deleteuser(ExpenseJSON json) throws ParseException {
						    	System.out.println("going to generate customer report details.......");		    		    
						    	ExpenseController deleteuserList =new ExpenseController();
						    	json=deleteuserList.deleteuser(json);
						    	
						    	/*reportAndCount.setEmployeeRetrievelist(employeeRetrievelist);
						    	*/
						        System.out.println("generated  category report details successfully.......");
						     	return Response.status(200).entity(json).build();
						    }
						    /*
							 * API for retrieving user list 	
							 */
								  
						    
						    @POST
						    @Produces(value="application/json" )
						    @Path(value="/expensereport")
						    @Consumes(value="application/json")
						    public Response expensereport(ExpenseJSON json) throws ParseException {
						    	System.out.println("going to generate customer report details.......");		    		    
						    	ExpenseController expenseList =new ExpenseController();
						    	json=expenseList.expensereport(json);
						    	
						    	/*reportAndCount.setEmployeeRetrievelist(employeeRetrievelist);
						    	*/
						        System.out.println("generated  expense report details successfully.......");
						     	return Response.status(200).entity(json).build();
						    }

						    
						    @POST
						    @Produces(value="application/json" )
						    @Path(value="/deleteexpense")
						    @Consumes(value="application/json")
						    public Response deleteexpense(ExpenseJSON json) throws ParseException {
						    	System.out.println("going to generate customer report details.......");		    		    
						    	ExpenseController deleteexpenseList =new ExpenseController();
						    	json=deleteexpenseList.deleteexpense(json);
						    	
						    	/*reportAndCount.setEmployeeRetrievelist(employeeRetrievelist);
						    	*/
						        System.out.println("generated  category report details successfully.......");
						     	return Response.status(200).entity(json).build();
						    }

}
