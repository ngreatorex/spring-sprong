package demo;

import org.springframework.stereotype.Controller;
import demo.model.*;

@Controller
public class RequestController
{
	public Response handle(Request request) {
		return new Response("OK");
	}
}
