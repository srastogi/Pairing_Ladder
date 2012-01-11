package web;

import model.TeamInfo;

import javax.servlet.RequestDispatcher;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class CreateLadderAction extends javax.servlet.http.HttpServlet {
   protected void doPost(javax.servlet.http.HttpServletRequest request, javax.servlet.http.HttpServletResponse response) throws javax.servlet.ServletException, IOException {
      response.setContentType("text/html");
      String teamSize = request.getParameter("teamSize");
      List memberList = new ArrayList();
      for (int i = 1; i <= Integer.parseInt(teamSize); i++) {
         memberList.add(request.getParameter("team_member_" + i));
      }
      TeamInfo teamInfo = new TeamInfo(teamSize, memberList);
      request.setAttribute("teamInfo", teamInfo);
      RequestDispatcher view = request.getRequestDispatcher("pairingLadder.jsp");
      view.forward(request, response);
   }

   protected void doGet(javax.servlet.http.HttpServletRequest request, javax.servlet.http.HttpServletResponse response) throws javax.servlet.ServletException, IOException {

   }
}
