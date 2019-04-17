package taskmapping;

import java.util.ArrayList;



public class TaskMappingJSON {
	private String roleName;
	private String permission;
	private String authorization;
	private String companyId;
	private int avoidAttendance=2;
	private int supervisorAuthority=2;
	private ArrayList<TaskMappingJSON> roleRetrievelist;
	private ArrayList<TaskMappingJSON> employeePermisionlist;
	private ArrayList<TaskMappingJSON> permisionlist;
	
	

	public String getCompanyId() {
		return companyId;
	}
	public void setCompanyId(String companyId) {
		this.companyId = companyId;
	}
	public ArrayList<TaskMappingJSON> getPermisionlist() {
		return permisionlist;
	}
	public void setPermisionlist(ArrayList<TaskMappingJSON> permisionlist) {
		this.permisionlist = permisionlist;
	}
	public int getAvoidAttendance() {
		return avoidAttendance;
	}
	public void setAvoidAttendance(int avoidAttendance) {
		this.avoidAttendance = avoidAttendance;
	}
	public String getAuthorization() {
		return authorization;
	}
	public void setAuthorization(String authorization) {
		this.authorization = authorization;
	}
	public int getSupervisorAuthority() {
		return supervisorAuthority;
	}
	public void setSupervisorAuthority(int supervisorAuthority) {
		this.supervisorAuthority = supervisorAuthority;
	}
	public String getPermission() {
		return permission;
	}
	public void setPermission(String permission) {
		this.permission = permission;
	}
	public String getRoleName() {
		return roleName;
	}
	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}
	public ArrayList<TaskMappingJSON> getRoleRetrievelist() {
		return roleRetrievelist;
	}
	public void setRoleRetrievelist(ArrayList<TaskMappingJSON> roleRetrievelist) {
		this.roleRetrievelist = roleRetrievelist;
	}
	public ArrayList<TaskMappingJSON> getEmployeePermisionlist() {
		return employeePermisionlist;
	}
	public void setEmployeePermisionlist(ArrayList<TaskMappingJSON> employeePermisionlist) {
		this.employeePermisionlist = employeePermisionlist;
	}
	
	

}
