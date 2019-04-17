package organization;



public class OrganizationController {

	public void siteregistration(OrganizationJSON json) {
		// TODO Auto-generated method stub
		
		OrganizationDao dao=new OrganizationDao();
		dao.siteregistration(json);
		
	}

	public static OrganizationJSON CreateSite(OrganizationJSON json) {
		OrganizationDao dao=new OrganizationDao();
		dao.CreateSite(json);
		return json;
	}

}
