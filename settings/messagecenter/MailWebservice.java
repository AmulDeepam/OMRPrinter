package settings.messagecenter;

import java.io.BufferedReader;



import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.annotation.Resource;
import javax.ejb.Stateless;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;


import DBUtil.DatabaseUtil;



@Path(value="/MessageCenter")


@Stateless
public class MailWebservice {


	@Resource(name="java:jboss/mail/Gmail")
	private Session session;
	
	
	
	/*
	 * API CALL FOR GETTING CUSTOMER LIST
	 */
	@POST
	@Path("/GetMailCustomerDetails")
	@Consumes(value= {"application/json"})
	@Produces(value={"application/json"})
	public Response GetCustomerDetails(MailJSON json)
	     {
		System.out.println("SELECTING CUSTOMER LIST DETAILS \n");
		
		ArrayList <MailJSON> customerList=new ArrayList <MailJSON>();
		customerList =MailLogic.SelectMailCustomerList(json);
		
		System.out.println("SELECTING CUSTOMER LIST COMPLETED\n");
		return Response.status(200).entity(customerList).build();
		
	
	     }    
	   @POST
	    @Produces(value="application/json" )
	    @Path(value="/MessageCenterReport")
	    @Consumes(value="application/json")
	    public Response MessageCenterReport(MailJSON json) throws ParseException {
	    	System.out.println("going to generate Message Center report details.......");
	    //	ArrayList<MailJSON> MessageCenterReportList = new ArrayList<MailJSON>();
	    	MailLogic MessageCenterReportList=new MailLogic();
	    	MailJSON testJson=new MailJSON();
	    	testJson=MessageCenterReportList.MessageCenterReportDisplay(json);
	    	
	    	/*reportAndCount.setEmployeeRetrievelist(employeeRetrievelist);
	    	*/
	        System.out.println("generated  Message Center report details successfully.......");
	     	return Response.status(200).entity(testJson).build();
	    }
	
	/*
	 * API CALL FOR SENDING EMAIL
	 */
	@POST
	@Path("/SendMail")
	@Consumes(value= {"application/json"})
	@Produces(value={"application/json"})
	public Response SendMail(MailJSON json)
	     {
		System.out.println("SENDING EMAIL \n");
		
		List<String> emailIdList = Arrays.asList(json.getSendTo().split(","));
		String subject="Message Center Notification ";
		  String body=json.getMessage();
		  System.out.println("Message : \t"+ json.getMessage() );
	
		  try {
	         System.out.println("MailId List Length : \t"+ emailIdList.size() );
	       System.out.println("MailId List  : \t"+json.getSendTo());
	       MimeMessage message=new MimeMessage(session);
	       
	       
	        for(int i=0;i<emailIdList.size();i++)
			{
	        message.addRecipients(Message.RecipientType.BCC, InternetAddress.parse(emailIdList.get(i)));
			}
	                  
			message.setSubject(subject);
			message.setContent(body, "text/html");
			Transport.send(message);
			json.setType("Email");
			StoreMessageCenter(json,0);
		}catch(MessagingException e) {
			System.out.println("Cannot Send Mail"+e);
		
		}
	 
		System.out.println("SENDING EMAIL COMPLETED\n");
		return Response.status(200).entity(json).build();
		
	
	     } 
	
	 	/*
	 	 * API CALL FOR GETTING CUSTOMER LIST FOR MESSAGE
	 	 */
	 	@POST
	 	@Path("/GetMessageCustomerDetails")
	 	@Consumes(value= {"application/json"})
	 	@Produces(value={"application/json"})
	 	public Response   GetMessageCustomerDetails(MailJSON json)
	 	     {
	 		System.out.println("SELECTING CUSTOMER LIST DETAILS FOR MESSAGE \n");
	 		
	 		ArrayList <MailJSON> customerList=new ArrayList <MailJSON>();
	 		customerList =MailLogic.SelectMessageCustomerList(json);
	 		
	 		System.out.println("SELECTING CUSTOMER LIST FOR MESSAGE COMPLETED\n");
	 		return Response.status(200).entity(customerList).build();
	 		
	 	
	 	     }  
	
	/*
	 * API CALL FOR SENDING MESSAGE
	 */
	@POST
	@Path("/SendMessage")
	@Consumes(value= {"application/json"})
	@Produces(value={"application/json"})
	
	  public Response SendMessage(MailJSON json) throws SQLException {
		
		System.out.println("SENDING MESSAGE FOR CUSTOMERS \n");
	 	

	HttpURLConnection httpConnection = null;
try {
//Url that will be called to submit the message
URL sendUrl = new URL("http://alerts.digimiles.in/sendsms/bulksms?");

String username="di80-arun";   
String password="digimile";
String type="0";
String meessage=json.getMessage();
String phn=json.getSendTo();
System.out.println("SENDING MESSAGE to MobileNo: \n"+phn);
httpConnection = (java.net.HttpURLConnection) sendUrl.openConnection();
//This method sets the method type to POST so that
//will be send as a POST request
httpConnection.setRequestMethod("POST");
//This method is set as true wince we intend to send
//input to the server
httpConnection.setDoInput(true);
//This method implies that we intend to receive data from server.
httpConnection.setDoOutput(true);
//Implies do not use cached data
httpConnection.setUseCaches(false);
//Data that will be sent over the stream to the server.
DataOutputStream dataStreamToServer = new
DataOutputStream( httpConnection.getOutputStream());
dataStreamToServer.writeBytes("username="
+ URLEncoder.encode(username, "UTF-8") + "&password="
+ URLEncoder.encode(password, "UTF-8") + "&type="
+URLEncoder.encode("0", "UTF-8") + "&dlr="
+ URLEncoder.encode("1", "UTF-8") + "&destination="
+ URLEncoder.encode(phn, "UTF-8") + "&source="
+ URLEncoder.encode("TICTOK", "UTF-8") + "&message="
+ URLEncoder.encode(meessage, "UTF-8"));
dataStreamToServer.flush();

dataStreamToServer.close();
//Here take the output value of the server.
BufferedReader dataStreamFromUrl = new BufferedReader( new
InputStreamReader(httpConnection.getInputStream()));String
dataFromUrl = "", dataBuffer = "";
//Writing information from the stream to the buffer
while ((dataBuffer = dataStreamFromUrl.readLine()) != null)
{ dataFromUrl += dataBuffer;
System.out.println("data succ"+dataFromUrl);
}
if(dataFromUrl.contains("1701|")){
//EmployeeShiftLogic.IncreaseCount(details);
	System.out.println("Message Sent");
	json.setType("Text Message");
	List<String> empList = Arrays.asList(json.getSendTo().split(","));
	 int smsCount=empList.size()*json.getMsgCount();
	
	StoreMessageCenter(json,smsCount);
	json.setSendTo("");
}
/**
* Now dataFromUrl variable contains the Response received from the
* server so we can parse the response and process it accordingly.
*/
dataStreamFromUrl.close();
System.out.println("Response: " + dataFromUrl);
} catch (Exception ex) {
ex.printStackTrace();
} finally {
if (httpConnection != null) {
httpConnection.disconnect();
}
}

	
System.out.println("SENDING MESSAGE FOR CUSTOMERS DONE \n");
	  return Response.status(200).entity(json).build();

}

public void StoreMessageCenter(MailJSON json,int smsCount ){
		
		String role="-";
		String name="-";
		Connection connection=null;
		try {
			System.out.println("Storing message center data..........");
			connection=DatabaseUtil.getDBConnection();
		
		String querySelect1=QueryConstants.STORE_MESSAGE_CENTER;
		PreparedStatement preparedStmt1 = connection.prepareStatement(querySelect1);
		preparedStmt1.setString(1,json.getCompanyId());
		preparedStmt1.setString(2,json.getStaffId());
		 preparedStmt1.setString(3,name);
		    preparedStmt1.setString(4,role);
		   
	    preparedStmt1.setString(5,json.getType());
	    preparedStmt1.setString(6,json.getSendTo());
	    preparedStmt1.setString(7,json.getMessage());
	    preparedStmt1.setInt(8,smsCount);
		   
	    preparedStmt1.executeUpdate();
	    connection.close(); 
		}
		catch (Exception e) {
			e.printStackTrace();
		  }finally {
			
		    }
	}
	
	
	
	
}
