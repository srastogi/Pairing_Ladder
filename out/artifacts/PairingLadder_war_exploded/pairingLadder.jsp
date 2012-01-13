<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c" %>

<html>
<head>
    <link rel="stylesheet" href="css/pairingLadder.css" type="text/css"/>
    <script type="text/javascript" src="js/jquery-1.7.1.min.js"></script>
    <script type="text/javascript" src="js/buildLadder.js"></script>

    <title>Pairing Ladder</title>
</head>
<body onload="createPairingLadder()">

<h1 align="center">Pairing Ladder</h1>

<div class="noDisplay" id="teamMembers"><c:out value="${teamInformation.teamList}"></c:out></div>
<div class="noDisplay" id="teamSize"><c:out value="${teamInformation.teamSize}"></c:out></div>

<table class="pairingLadder" border="1" align="center">
    <tr class="emptyRowToBeCloned noDisplay">
        <td class="emptyColumnToBeCloned noDisplay"></td>
    </tr>
</table>

</body>
</html>