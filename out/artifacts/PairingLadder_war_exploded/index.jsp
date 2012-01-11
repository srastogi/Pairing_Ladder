<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<html>
<head>
    <script type="text/javascript" src="js/jquery-1.7.1.min.js"></script>
    <script type="text/javascript" src="js/createInformationPage.js"></script>

    <title>Pairing Ladder</title>
</head>
<body>
<h1 align="center">Pairing Ladder Information Page</h1>
what the hell is going on!
<form id="form" method="POST" action="CreateLadder.do">
    Number of people on the team:
    <input type="text" id="teamSize" name="teamSize">
    <br/>
    <button type="button" id="teamSizeSubmit" onclick="generateNameBlock()"> Submit</button>
    <br/>

    <div class="nameBlock"></div>
    <input id="formSubmitButton" type="SUBMIT" value="Submit form">
</form>
</body>
</html>