package web;

import model.TeamInformation;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class BuildLadderController extends javax.servlet.http.HttpServlet {
   protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
      response.setContentType("text/html");
      String teamSize = request.getParameter("teamSize");
      List memberList = new ArrayList();
      for (int i = 1; i <= Integer.parseInt(teamSize); i++) {
         memberList.add(request.getParameter("team_member_" + i));
      }
      TeamInformation teamInformation = new TeamInformation(teamSize, memberList);
      request.setAttribute("teamInformation", teamInformation);
      RequestDispatcher view = request.getRequestDispatcher("pairingLadder.jsp");
      view.forward(request, response);
   }

   protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

   }
}
