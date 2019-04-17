package vendorOrder;

import saleOrder.SaleOrderDao;

public class VendorOrderController {
	public VendorOrderJSON selectvendor(VendorOrderJSON json) {
		System.out.println("inside controller.......");
		VendorOrderDao dao=new VendorOrderDao();
		json=dao.selectvendor(json);		
		return json;
		
	}
	
	public VendorOrderJSON selectindividualsaleproduct(VendorOrderJSON json) {
		System.out.println("inside controller.......");
		VendorOrderDao dao=new VendorOrderDao();
		json=dao.selectindividualsaleproduct(json);		
		System.out.println("Dao Call returned...");
		return json;
	}

	public void addpurchaseorder(VendorOrderJSON json) {
		VendorOrderDao dao=new VendorOrderDao();
		dao.addpurchaseorder(json);	
		
	}

	public VendorOrderJSON selectinvoiceNo(VendorOrderJSON json) {
		System.out.println("inside controller.......");
		VendorOrderDao dao=new VendorOrderDao();
		json=dao.selectinvoiceNo(json);		
		System.out.println("Dao Call returned...");
		return json;
	}
	public VendorOrderJSON purchaseinvoicereport(VendorOrderJSON json) {
		System.out.println("inside controller.......");
		VendorOrderDao dao=new VendorOrderDao();
		json=dao.purchaseinvoicereport(json);		
		return json;
	}

	

}
