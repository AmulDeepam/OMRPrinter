package saleOrder;
import saleOrder.SaleOrderDao;
import saleOrder.SaleOrderJSON;

public class SaleOrderController {

	public SaleOrderJSON selectcustomer(SaleOrderJSON json) {
		System.out.println("inside controller.......");
		SaleOrderDao dao=new SaleOrderDao();
		json=dao.selectCustomer(json);		
		return json;
		
	}

	public SaleOrderJSON selectindividualsaleproduct(SaleOrderJSON json) {
		System.out.println("inside controller.......");
		SaleOrderDao dao=new SaleOrderDao();
		json=dao.selectindividualsaleproduct(json);		
		System.out.println("Dao Call returned...");
		return json;
	}

	public void addsaleorder(SaleOrderJSON json) {
		System.out.println("inside controller.......");
		SaleOrderDao dao=new SaleOrderDao();
		dao.addsaleorder(json);	
		
	}

	public SaleOrderJSON selectinvoiceNo(SaleOrderJSON json) {
		System.out.println("inside controller.......");
		SaleOrderDao dao=new SaleOrderDao();
		json=dao.selectinvoiceNo(json);		
		System.out.println("Dao Call returned...");
		return json;
	}

	public SaleOrderJSON estimateinvoiceNo(SaleOrderJSON json) {
		System.out.println("inside controller.......");
		SaleOrderDao dao=new SaleOrderDao();
		json=dao.estimateinvoiceNo(json);		
		System.out.println("Dao Call returned...");
		return json;
	}

	public void addestimateorder(SaleOrderJSON json) {
		SaleOrderDao dao=new SaleOrderDao();
		dao.addestimateorder(json);	
	}

	public SaleOrderJSON saleinvoicereport(SaleOrderJSON json) {
		System.out.println("inside controller.......");
		SaleOrderDao dao=new SaleOrderDao();
		json=dao.saleinvoicereport(json);		
		return json;
		
	}

	public SaleOrderJSON estimateinvoicereport(SaleOrderJSON json) {
		System.out.println("inside controller.......");
		SaleOrderDao dao=new SaleOrderDao();
		json=dao.estimateinvoicereport(json);		
		return json;
	}

	
}
