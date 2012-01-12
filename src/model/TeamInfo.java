package model;

import java.util.ArrayList;
import java.util.List;

public class TeamInfo {

   private String teamSize;
   private List teamMembers = new ArrayList();

   public TeamInfo(String teamSize, List<String> teamMembers) {
      this.teamSize = teamSize;
      for (String teamMember : teamMembers) {
         this.teamMembers.add(teamMember);
      }
   }

   public String getTeamSize() {
      return teamSize;
   }

   public List getTeamMembers() {
      return teamMembers;
   }

   public String toString() {
      String returnString = "TeamSize = " + teamSize + "and team members are: ";
      for (Object teamMember : teamMembers) {
         returnString += teamMember;
         returnString += " ";
      }
      return returnString;
   }

}
