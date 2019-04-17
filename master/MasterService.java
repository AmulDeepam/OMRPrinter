package master;

import java.text.ParseException;


import java.util.ArrayList;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;
import master.MasterController;
import master.MasterJSON;

@Path(value="/master")
public class MasterService {
	/*
	 * API for registering and adding new customer	
	 */
		
		    @POST
		    @Produces(value="application/json" )
		    @Path(value="/addcustomer")
		    @Consumes(value="application/json")
		 
		 public Response addcustomer(MasterJSON json) throws ParseException {
		    	System.out.println("going to add customer.......");
		    	MasterController mas=new MasterController();
		    	mas.addcustomer(json);		
		    	System.out.println(json);
		     	return Response.status(200).entity(json).build();
	}
		    /*
			 * API for retrieving customer list 	
			 */
				  
		    
		    @POST
		    @Produces(value="application/json" )
		    @Path(value="/customerreport")
		    @Consumes(value="application/json")
		    public Response customerreport(MasterJSON json) throws ParseException {
		    	System.out.println("going to generate customer report details.......");		    		    
		    	MasterController customerList =new MasterController();
		    	json=customerList.customerReport(json);
		    	
		    	/*reportAndCount.setEmployeeRetrievelist(employeeRetrievelist);
		    	*/
		        System.out.println("generated  customer report details successfully.......");
		     	return Response.status(200).entity(json).build();
		    }
		    
		    /*
			 * API for retrieving customer list 	
			 */
				  
		    
		    @POST
		    @Produces(value="application/json" )
		    @Path(value="/deletecustomer")
		    @Consumes(value="application/json")
		    public Response deletecustomer(MasterJSON json) throws ParseException {
		    	System.out.println("going to delete customer report details.......");		    		    
		    	MasterController deletecustomerList =new MasterController();
		    	json=deletecustomerList.deletecustomer(json);
		    	
		    	/*reportAndCount.setEmployeeRetrievelist(employeeRetrievelist);
		    	*/
		        System.out.println("deleted  customer report details successfully.......");
		     	return Response.status(200).entity(json).build();
		    }

		    /*
			 * API for updating customer details	
			 */

		    
		    
		   @POST
		    @Produces(value="application/json" )
		    @Path(value="/CustomerDetailsUpdate")
		    @Consumes(value="application/json")
		    public Response updatecustomer(MasterJSON json) throws ParseException {
		    	System.out.println("going to delete customer report details.......");		    		    
		    	MasterController updatecustomerList =new MasterController();
		    	json=updatecustomerList.updatecustomer(json);
		    	
		    	/*reportAndCount.setEmployeeRetrievelist(employeeRetrievelist);
		    	*/
		        System.out.println("deleted  customer report details successfully.......");
		    	return Response.status(200).entity(json).build();
		    }

		    
		    /*
			 * API for registering and adding new vendor	
			 */
				
				    @POST
				    @Produces(value="application/json" )
				    @Path(value="/addvendor")
				    @Consumes(value="application/json")
				 
				 public Response addvendor(MasterJSON json) throws ParseException {
				    	System.out.println("going to add vendor.......");
				    	MasterController mas=new MasterController();
				    	mas.addvendor(json);		
				    	System.out.println(json);
				     	return Response.status(200).entity(json).build();
			}
				
				    /*
					 * API for retrieving vendor list 	
					 */
						  
				    
				    @POST
				    @Produces(value="application/json" )
				    @Path(value="/vendorreport")
				    @Consumes(value="application/json")
				    public Response vendorreport(MasterJSON json) throws ParseException {
				    	System.out.println("going to generate vendor report details.......");		    		    
				    	MasterController vendorList =new MasterController();
				    	json=vendorList.vendorReport(json);				    	
				        System.out.println("generated  vendor report details successfully.......");
				     	return Response.status(200).entity(json).build();
				    }
				    
				    
				    /*
					 * API for retrieving customer list 	
					 */
						  
				    
				    @POST
				    @Produces(value="application/json" )
				    @Path(value="/deletevendor")
				    @Consumes(value="application/json")
				    public Response deletevendor(MasterJSON json) throws ParseException {
				    	System.out.println("going to delete vendor report details.......");		    		    
				    	MasterController deletevendorList =new MasterController();
				    	json=deletevendorList.deletevendor(json);
				    	
				    	/*reportAndCount.setEmployeeRetrievelist(employeeRetrievelist);
				    	*/
				        System.out.println("deleted vendor report details successfully.......");
				     	return Response.status(200).entity(json).build();
				    }
				    
				    /*
					 * API for updating vendor details	
					 */

				    
				    
				   @POST
				    @Produces(value="application/json" )
				    @Path(value="/VendorDetailsUpdate")
				    @Consumes(value="application/json")
				    public Response updatevendor(MasterJSON json) throws ParseException {
				    	System.out.println("going to delete customer report details.......");		    		    
				    	MasterController updatecustomerList =new MasterController();
				    	json=updatecustomerList.updatevendor(json);
				    	
				    	/*reportAndCount.setEmployeeRetrievelist(employeeRetrievelist);
				    	*/
				        System.out.println("deleted  customer report details successfully.......");
				    	return Response.status(200).entity(json).build();
				    }

				    /*
					 * API for registering and adding new product	
					 */
						
						    @POST
						    @Produces(value="application/json" )
						    @Path(value="/addproduct")
						    @Consumes(value="application/json")
						 
						 public Response addproduct(MasterJSON json) throws ParseException {
						    	System.out.println("going to add product.......");
						    	MasterController mas=new MasterController();
						    	mas.addproduct(json);		
						    	System.out.println(json);
						     	return Response.status(200).entity(json).build();
					}

						    /*
							 * API for retrieving sale product list 	
							 */
								  
						    
						    @POST
						    @Produces(value="application/json" )
						    @Path(value="/saleproductreport")
						    @Consumes(value="application/json")
						    public Response saleproductreport(MasterJSON json) throws ParseException {
						    	System.out.println("going to generate saleproduct report details.......");		    		    
						    	MasterController saleproductList =new MasterController();
						    	json=saleproductList.saleproductreport(json);				    	
						        System.out.println("generated  saleproduct report details successfully.......");
						     	return Response.status(200).entity(json).build();
						    }
						    
						    /*
							 * API for retrieving customer list 	
							 */
								  
						    
						    @POST
						    @Produces(value="application/json" )
						    @Path(value="/deletesaleproduct")
						    @Consumes(value="application/json")
						    public Response deletesaleproduct(MasterJSON json) throws ParseException {
						    	System.out.println("going to DELETE SALE PRODUCT report details.......");		    		    
						    	MasterController deletesaleproductList =new MasterController();
						    	json=deletesaleproductList.deletesaleproduct(json);
						    	
						    	/*reportAndCount.setEmployeeRetrievelist(employeeRetrievelist);
						    	*/
						        System.out.println("deleted sale product details successfully.......");
						     	return Response.status(200).entity(json).build();
						    }
						    
						    /*
							 * API for retrieving purchase product list 	
							 */
								  
						    
						    @POST
						    @Produces(value="application/json" )
						    @Path(value="/purchaseproductreport")
						    @Consumes(value="application/json")
						    public Response purchaseproductreport(MasterJSON json) throws ParseException {
						    	System.out.println("going to generate purchaseproductr report details.......");		    		    
						    	MasterController purchaseproductList =new MasterController();
						    	json=purchaseproductList.purchaseproductreport(json);				    	
						        System.out.println("generated  purchaseproduct report details successfully.......");
						     	return Response.status(200).entity(json).build();
						    }
						    
						    /*
							 * API for retrieving customer list 	
							 */
								  
						    
						    @POST
						    @Produces(value="application/json" )
						    @Path(value="/deletepurchaseproduct")
						    @Consumes(value="application/json")
						    public Response deletepurchaseproduct(MasterJSON json) throws ParseException {
						    	System.out.println("going to DELETE PURCHASE PRODUCT report details.......");		    		    
						    	MasterController deletepurchaseproductList =new MasterController();
						    	json=deletepurchaseproductList.deletepurchaseproduct(json);
						    	
						    	/*reportAndCount.setEmployeeRetrievelist(employeeRetrievelist);
						    	*/
						        System.out.println("deleted purchase product report details successfully.......");
						     	return Response.status(200).entity(json).build();
						    }
						    /*
							 * API for updating customer details	
							 */

						    
						    
						   @POST
						    @Produces(value="application/json" )
						    @Path(value="/ProductDetailsUpdate")
						    @Consumes(value="application/json")
						    public Response updateproduct(MasterJSON json) throws ParseException {
						    	System.out.println("going to update product report details.......");		    		    
						    	MasterController updatecustomerList =new MasterController();
						    	json=updatecustomerList.updateproduct(json);
						    	
						    	/*reportAndCount.setEmployeeRetrievelist(employeeRetrievelist);
						    	*/
						        System.out.println("updated  product report details successfully.......");
						    	return Response.status(200).entity(json).build();
						    }

						    
}
