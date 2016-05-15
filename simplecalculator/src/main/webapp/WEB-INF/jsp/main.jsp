<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>

<!DOCTYPE html>

<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Simple Calculator</title>
        <link rel="stylesheet"
              href="http://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css">
        <script
        src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
        <script
        src="http://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>
        
        <link href="<c:url value="/resources/calculator.css" />" rel="stylesheet">
        <script src="<c:url value="/resources/scripts.js" />"></script>
        
    </head>

    
    <c:choose>
    <c:when test="${result == 'Syntax ERROR' || result == 'Math ERROR'  }">
        <body onload="Error()">
    </c:when>             
            
    <c:otherwise>    
        <body>
    </c:otherwise>    
    </c:choose>           
        <div class="container">

        <h2>SIMPLE CALCULATOR</h2>

            <div class="row">
                <form role="form">
                    <div class="form-group">
                        <input type="text" class="form-control input-lg display" id="display" onfocus="this.blur();" value="${result}">
                    </div>
                </form>
            </div>   


            <div class="row">
                <div class="col-xs-3"><button type="button" onclick="numberClicked('7')" class="btn btn-default btn-lg btn-block cislo">7</button></div>
                <div class="col-xs-3"><button type="button" onclick="numberClicked('8')" class="btn btn-default btn-lg btn-block cislo">8</button></div>
                <div class="col-xs-3"><button type="button" onclick="numberClicked('9')" class="btn btn-default btn-lg btn-block cislo">9</button></div>
                <div class="col-xs-3"><button type="button" onclick="operatorClicked('divide')" class="btn btn-default btn-lg btn-block signChar">/</button></div>
            </div>
            
            <div class="row">
                <div class="col-xs-3"><button type="button" onclick="numberClicked('4')" class="btn btn-default btn-lg btn-block cislo">4</button></div>
                <div class="col-xs-3"><button type="button" onclick="numberClicked('5')" class="btn btn-default btn-lg btn-block cislo">5</button></div>
                <div class="col-xs-3"><button type="button" onclick="numberClicked('6')" class="btn btn-default btn-lg btn-block cislo">6</button></div>
                <div class="col-xs-3"><button type="button" onclick="operatorClicked('multiply')" class="btn btn-default btn-lg btn-block signChar">*</button></div>
            </div>
            <div class="row">
                <div class="col-xs-3"><button type="button" onclick="numberClicked('1')" class="btn btn-default btn-lg btn-block cislo">1</button></div>
                <div class="col-xs-3"><button type="button" onclick="numberClicked('2')" class="btn btn-default btn-lg btn-block cislo">2</button></div>
                <div class="col-xs-3"><button type="button" onclick="numberClicked('3')" class="btn btn-default btn-lg btn-block cislo">3</button></div>
                <div class="col-xs-3"><button type="button" onclick="operatorClicked('minus')" class="btn btn-default btn-lg btn-block signChar">-</button></div>
            </div>
            
            <div class="row">
                <div class="col-xs-3"><button type="button" onclick="numberClicked('0')" class="btn btn-default btn-lg btn-block cislo">0</button></div>
                <div class="col-xs-3"><button type="button" onclick="numberClicked('.')" class="btn btn-default btn-lg btn-block" id="decimalPoint">.</button></div>
                <div class="col-xs-3"><button type="button" onclick="eqClicked()" class="btn btn-default btn-lg btn-block signChar">=</button></div>
                <div class="col-xs-3"><button type="button" onclick="operatorClicked('plus')" class="btn btn-default btn-lg btn-block signChar">+</button></div>
            </div>
            <div class="row">
                <div class="col-xs-3"><button type="button" onclick="reset()" class="btn btn-default btn-lg btn-block">Clear</button></div>
            </div>
        
            <br><br>
            <h3>Calculation history</h3>
            <a href="#" onClick="window.location = 'delete.html'"><span class="glyphicon glyphicon-trash"></span> Clean the history</a>
            <table class="table">
                <thead>
                    <tr>
                        <th>Date and time</th>
                        <th>Formula</th>
                        <th>Result</th>
                    </tr>
                </thead>
                <tbody>

                    <c:forEach items="${calculations}" var="calculation" varStatus="idx">                     
                        <tr>
                            <td><c:out value="${calculation.time}"/></td>
                            <td><c:out value="${calculation.formula}"/></td>
                            <td><c:out value="${calculation.result}"/></td>
                        </tr>
                    </c:forEach>                     

                </tbody>
            </table> 
            <div class="row">
                <form role="form">
                    <div class="form-group">
                        <input type="hidden" class="form-control input-lg" id="hidden_number">
                        <input type="hidden" class="form-control input-lg" id="hidden_operator">
                        <input type="hidden" class="form-control input-lg" id="hidden_text" value="${result}">
                        <input type="hidden" class="form-control input-lg" id="hidden_status" value="eq" >
                    </div>
                </form>
            </div> 
        </div>
        
    </body>
</html>
