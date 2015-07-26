package demo.model;

public class Response
{
	private String status;
	
	public Response(String status) {
		this.status = status;
	}
	
	public String getStatus() {
		return status;
	}
	
	public void setStatus(String value) {
		status = value;
	}
}
