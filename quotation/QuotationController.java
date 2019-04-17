package quotation;

import saleOrder.SaleOrderDao;

public class QuotationController {

	public QuotationJSON selectcustomer(QuotationJSON json) {
		System.out.println("inside controller.......");
		QuotationDao dao=new QuotationDao();
		json=dao.selectCustomer(json);		
		return json;
		
	}

	public QuotationJSON selectindividualsaleproduct(QuotationJSON json) {
		System.out.println("inside controller.......");
		QuotationDao dao=new QuotationDao();
		json=dao.selectindividualsaleproduct(json);		
		System.out.println("Dao Call returned...");
		return json;
	}

	public void addgstquotationorder(QuotationJSON json) {
		QuotationDao dao=new QuotationDao();
		dao.addgstquotationorder(json);	
		
	}

	public QuotationJSON selectinvoiceNo(QuotationJSON json) {
		System.out.println("inside controller.......");
		QuotationDao dao=new QuotationDao();
		json=dao.selectinvoiceNo(json);		
		System.out.println("Dao Call returned...");
		return json;
	}

	public QuotationJSON withoutgstinvoiceNo(QuotationJSON json) {
		System.out.println("inside controller.......");
		QuotationDao dao=new QuotationDao();
		json=dao.withoutgstinvoiceNo(json);		
		System.out.println("Dao Call returned...");
		return json;
	}

	public void addwithoutgstquotationorder(QuotationJSON json) {
		QuotationDao dao=new QuotationDao();
		dao.addwithoutgstquotationorder(json);	
	}

	public QuotationJSON gstquotationreport(QuotationJSON json) {
		System.out.println("inside controller.......");
		QuotationDao dao=new QuotationDao();
		json=dao.gstquotationreport(json);		
		return json;
	}

	public QuotationJSON withoutgstquotationreport(QuotationJSON json) {
		System.out.println("inside controller.......");
		QuotationDao dao=new QuotationDao();
		json=dao.withoutgstquotationreport(json);		
		return json;
	}


}
