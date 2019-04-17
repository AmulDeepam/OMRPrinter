package organization;

import java.text.ParseException;

import javax.annotation.Resource;
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





@Path(value="/SiteRegistration")
public class OrganizationWebService {
	@Resource(name = "java:jboss/mail/Gmail")

	Session session;
	/*
	 * API for registering and adding new customer	
	 */
		
		    @POST
		    @Produces(value="application/json" )
		    @Path(value="/RegisterSite")
		    @Consumes(value="application/json")
		 
		 public Response siteregistration(OrganizationJSON json) throws ParseException {
		    	int otp=0;
				String to=json.getEmailId();
				System.out.println("Registering The Organization... ");
				OrganizationJSON org1=new OrganizationJSON();
				org1=OrganizationController.CreateSite(json);
			   	if(org1.getOtp()!=0) {
			   		String subject="Email Id Verification By ThroughApps";
			   		
					System.out.println("MAILING THE OTP \n");
					
					String body="	\n" + 
					  		" \n" + 
					  		"Hello ," + to +
					  		"\n \n" + 
					  		"\n \n" + 
					  		"Kindly  enter the OTP for completing the Registration process\n" + 
					  		"\n \n" + 
					  		"Your OTP is :\n"+
					  		 "\n \n" + org1.getOtp() +
					  		"\n" + 
					  		"\n \n" + 
					  		"\n \n" + 
					  		"Thank you,\n\n" + 
					  		"ThroughApps\n" + 
					  		" 	\n" + 
					  		" \n" + 
					  		"	\n" ;
					
					try {
				    	
						Message message=new MimeMessage(session);
						Multipart MultiPart = new MimeMultipart();
						message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(to));
						message.setSubject(subject);
						
						System.out.println("Sending Mail to "+to+"\n");
						
						// BodyPart for Sending Alert message 
						MimeBodyPart messageBodyPart = new MimeBodyPart();
						messageBodyPart.setContent(body,"text/plain");
						MultiPart.addBodyPart(messageBodyPart);
					
						message.setContent(MultiPart);
						Transport.send(message);
					    System.out.println("Mail Sent Successfully to "+to+"\n");
				    	 
						} catch (MessagingException e) {
							e.printStackTrace();
							
						}	
					json.setResponse("Mailed_Otp");
				    	}else {
				    		System.out.println("ORGANIZATION ALREADY EXIST \n");
				    				
				    	}
			    
			   	
				return Response.status(200).entity(org1).build();
	}
			/*
			 * API for registering and adding new customer	
			 */
				
				    @POST
				    @Produces(value="application/json" )
				    @Path(value="/InsertSite")
				    @Consumes(value="application/json")
				 
				 public Response insertsite(OrganizationJSON json) throws ParseException {
				    	System.out.println("going to send email to throughapps.......");
				    	String to="throughapps@gmail.com";
				    	
				    	OrganizationController mas=new OrganizationController();
				    	mas.siteregistration(json);
				    	if(json.getLicenseKey()!=null) {
					   		String subject="Email Id Verification By ThroughApps";
					   		
							System.out.println("MAILING THE OTP \n");
							
							String body="	\n" + 
							  		" \n" + 
							  		"Hello ," + json.getEmailId() +
							  		"\n \n" + 
							  		"\n \n" + 
							  		"Kindly  enter the license key for your Organization\n" + 
							  		"\n \n" + 
							  		"Your LICENSE KEY is :\n"+
							  		 "\n \n" + json.getLicenseKey() +
							  		"\n" + 
							  		"\n \n" + 
							  		"\n \n" + 
							  		"Thank you,\n\n" + 
							  		"ThroughApps\n" + 
							  		" 	\n" + 
							  		" \n" + 
							  		"	\n" ;
							
							try {
						    	
								Message message=new MimeMessage(session);
								Multipart MultiPart = new MimeMultipart();
								message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(to));
								message.setSubject(subject);
								
								System.out.println("Sending Mail to "+to+"\n");
								
								// BodyPart for Sending Alert message 
								MimeBodyPart messageBodyPart = new MimeBodyPart();
								messageBodyPart.setContent(body,"text/plain");
								MultiPart.addBodyPart(messageBodyPart);
							
								message.setContent(MultiPart);
								Transport.send(message);
							    System.out.println("Mail Sent Successfully to "+to+"\n");
						    	 
								} catch (MessagingException e) {
									e.printStackTrace();
									
								}	
							json.setResponse("Mailed_Otp");
						    	}else {
						    		System.out.println("ORGANIZATION ALREADY EXIST \n");
						    				
						    	}
				    	
				    	System.out.println(json);
				     	return Response.status(200).entity(json).build();
			}
				

}
