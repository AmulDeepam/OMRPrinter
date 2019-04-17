package dashboarddisplay;

import saleOrder.SaleOrderDao;

public class dashboardDisplayController {
	
	public dashboardDisplayJSON selectMonth_Data_ForDashboard(dashboardDisplayJSON json) {
		System.out.println("inside controller selectMonth_Data_For Dashboard.......");
		dashboardDisplayDao dao=new dashboardDisplayDao();
		json=dao.selectDashboard_Display_Data(json);		
		return json;
	}

}
