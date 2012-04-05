package model;

import java.util.ArrayList;
import java.util.List;

public class TeamInformation {

   private String teamSize;
   private List teamList = new ArrayList();

   public TeamInformation(String teamSize, List<String> teamMembers) {
      this.teamSize = teamSize;
      for (String teamMember : teamMembers) {
         this.teamList.add(teamMember);
      }
   }

   public String getTeamSize() {
      return teamSize;
   }

   public List getTeamList() {
      return teamList;
   }

   // Use is<method_name> to get boolean values in JSP using expression language
   public boolean isTeamCreated(){
      return true;
   }

   public String toString() {
      String returnString = "TeamSize = " + teamSize + "and team members are: ";
      for (Object teamMember : teamList) {
         returnString += teamMember;
         returnString += " ";
      }
      return returnString;
   }

}
