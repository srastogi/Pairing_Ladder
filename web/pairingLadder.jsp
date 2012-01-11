<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c" %>

<html>
<head>
    <script type="text/javascript" src="js/jquery-1.7.1.min.js"></script>
    <script type="text/javascript" src="js/createPairingLadder.js"></script>

    <title>Pairing Ladder</title>
</head>
<body onload="createPairingLadder()">

<h1 align="center">Pairing Ladder</h1>

<div id="teamMembers"><c:out value="${teamInfo.teamMembers}"></c:out></div>
<div id="teamSize"><c:out value="${teamInfo.teamSize}"></c:out></div>

<c:forEach var="member" items="${teamInfo.teamMembers}">
    <c:out value="${member}"></c:out>
</c:forEach>
<div class="pairingLadderBlock">
    <table class="pairingLadder" border="1">
        <tr class="emptyRowToBeCloned noDisplay">
            <td class="emptyColumnToBeCloned noDisplay"></td>
        </tr>
    </table>
</div>

</body>
</html>