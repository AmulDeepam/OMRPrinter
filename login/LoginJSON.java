package login;

import java.util.ArrayList;


public class LoginJSON {

	String emailId;
	String contactNo;
	String password;
	String permission;
	String roleName; 
	String staffId;
	String companyAddress;
	String companyId;
	String companyName;
	String licenseKey;
	String status;
	String date;
	String companyEmailId;
	String staffName;
	String landlineNo;
	String feedbackNo;
	String doorNo="-";
	String floor="-";
	String street="-";
	String place="-";
	String state="-";
	
	private  ArrayList<LoginJSON> permissionList;
	private ArrayList<LoginJSON> employeePermisionlist;
	private ArrayList<LoginJSON> employeeRolelist;
	private ArrayList<LoginJSON> employeeList;
	
	
	
	
	public String getLandlineNo() {
		return landlineNo;
	}
	public void setLandlineNo(String landlineNo) {
		this.landlineNo = landlineNo;
	}
	public String getFeedbackNo() {
		return feedbackNo;
	}
	public void setFeedbackNo(String feedbackNo) {
		this.feedbackNo = feedbackNo;
	}
	public String getStaffName() {
		return staffName;
	}
	public void setStaffName(String staffName) {
		this.staffName = staffName;
	}
	public String getDoorNo() {
		return doorNo;
	}
	public void setDoorNo(String doorNo) {
		this.doorNo = doorNo;
	}
	public String getFloor() {
		return floor;
	}
	public void setFloor(String floor) {
		this.floor = floor;
	}
	public String getStreet() {
		return street;
	}
	public void setStreet(String street) {
		this.street = street;
	}
	public String getPlace() {
		return place;
	}
	public void setPlace(String place) {
		this.place = place;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	public String getCompanyEmailId() {
		return companyEmailId;
	}
	public void setCompanyEmailId(String companyEmailId) {
		this.companyEmailId = companyEmailId;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}

	public String getLicenseKey() {
		return licenseKey;
	}
	public void setLicenseKey(String licenseKey) {
		this.licenseKey = licenseKey;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getCompanyName() {
		return companyName;
	}
	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}
	public String getCompanyId() {
		return companyId;
	}
	public void setCompanyId(String companyId) {
		this.companyId = companyId;
	}
	public String getCompanyAddress() {
		return companyAddress;
	}
	public void setCompanyAddress(String companyAddress) {
		this.companyAddress = companyAddress;
	}
	public ArrayList<LoginJSON> getPermissionList() {
		return permissionList;
	}
	public void setPermissionList(ArrayList<LoginJSON> permissionList) {
		this.permissionList = permissionList;
	}
	public ArrayList<LoginJSON> getEmployeePermisionlist() {
		return employeePermisionlist;
	}
	public void setEmployeePermisionlist(ArrayList<LoginJSON> employeePermisionlist) {
		this.employeePermisionlist = employeePermisionlist;
	}
	public ArrayList<LoginJSON> getEmployeeRolelist() {
		return employeeRolelist;
	}
	public void setEmployeeRolelist(ArrayList<LoginJSON> employeeRolelist) {
		this.employeeRolelist = employeeRolelist;
	}
	public ArrayList<LoginJSON> getEmployeeList() {
		return employeeList;
	}
	public void setEmployeeList(ArrayList<LoginJSON> employeeList) {
		this.employeeList = employeeList;
	}
	public String getStaffId() {
		return staffId;
	}
	public void setStaffId(String staffId) {
		this.staffId = staffId;
	}
	public String getRoleName() {
		return roleName;
	}
	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}
	public String getPermission() {
		return permission;
	}
	public void setPermission(String permission) {
		this.permission = permission;
	}
	public String getEmailId() {
		return emailId;
	}
	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}
	public String getContactNo() {
		return contactNo;
	}
	public void setContactNo(String contactNo) {
		this.contactNo = contactNo;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	
	
}
