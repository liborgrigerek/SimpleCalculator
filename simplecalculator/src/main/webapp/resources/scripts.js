/**
 * 
 */
/* 
 * JavaScript Functions.
 */
////////////////////////////////////////////////////////////////////////////////
// Function called when some number or decimal point is pressed
// 
// 
function numberClicked(number) {
    status = document.getElementById("hidden_status").value ;
    
    if (status == 'eq') {
        number_new =  number;
        document.getElementById("hidden_text").value ='';
        document.getElementById("hidden_status").value ='ok';
    }
    else if (status == 'operator') {
        number_new =  number;
        document.getElementById("hidden_status").value ='ok';
    }    
    else{
        number_prev = document.getElementById("display").value;
        number_new = number_prev + number;        
    }
    

    document.getElementById("display").value = number_new;

    addText(number);

    // decimal point can be only once
    if (number == '.') {
        disableDecimalPoint(true);
    }

}

////////////////////////////////////////////////////////////////////////////////
// Called when = is pressed
// 
// 
function eqClicked() {
    calculateResult();
    printText();
    deleteText();
}


function calculateResult() {
    display_number = document.getElementById("display").value;
    backup_number = document.getElementById("hidden_number").value;
    backup_operator = document.getElementById("hidden_operator").value;
    status = document.getElementById("hidden_status").value ;


    // ready to calculate
    if (status != 'operator') {
        switch (backup_operator) {
            case "plus":
                result = (parseFloat(backup_number) + parseFloat(display_number));
                break;
            case "minus":
                result = (parseFloat(backup_number) - parseFloat(display_number));
                break;
            case "multiply":
                result = (parseFloat(backup_number) * parseFloat(display_number));       
                break;
            case "divide":
                result = (parseFloat(backup_number) / parseFloat(display_number));
  
                if (parseFloat(display_number) == 0) {
                    result = 'Math ERROR';
                    disableDecimalPoint(true);
                    disableNumbers(true);
                    disableZnamenka(true);
                }
                break;
            default:
                result = display_number;
        }

        document.getElementById("hidden_operator").value = '';
        document.getElementById("hidden_number").value = '';
        document.getElementById("display").value = result;
        document.getElementById("hidden_status").value ='eq';
        //disableDecimalPoint(true);
        //disableNumbers(true);

    }
    // required second operator not found
    else {
        result = 'Syntax ERROR';
        document.getElementById("hidden_operator").value = '';
        document.getElementById("hidden_number").value = '';
        document.getElementById("display").value = result;
        disableDecimalPoint(true);
        disableNumbers(true);
        disableZnamenka(true);
    }



}
////////////////////////////////////////////////////////////////////////////////
// Called when some operator is pressed
// 
// 
function operatorClicked(operator) {
    display_number = document.getElementById("display").value;
    backup_number = document.getElementById("hidden_number").value;
    backup_operator = document.getElementById("hidden_operator").value;
    disableDecimalPoint(false);
    disableNumbers(false);

    addText(operator);

    // multiple pressing of operators without pressing =
    if (backup_operator != '' 
            && backup_number != '' 
            && display_number != '' 
            && display_number !=  backup_number) {
        calculateResult();
        display_number = document.getElementById("display").value;
        backup_number = document.getElementById("hidden_number").value;
        backup_operator = document.getElementById("hidden_operator").value;

        document.getElementById("hidden_operator").value = operator;
        document.getElementById("hidden_number").value = display_number;
        //document.getElementById("display").value = '';
        document.getElementById("hidden_status").value ='operator';
        disableDecimalPoint(false);
        disableNumbers(false);
    }


    // some value is displayed
    else if (display_number != '') {
        document.getElementById("hidden_operator").value = operator;
        document.getElementById("hidden_number").value = display_number;
        //document.getElementById("display").value = '';
        document.getElementById("hidden_status").value ='operator';        
    }

    // operator change
    else if (display_number == backup_number) {
        document.getElementById("hidden_operator").value = operator;
    }

}

// reset function
function reset() {
    document.getElementById("display").value = '';
    document.getElementById("hidden_number").value = '';
    document.getElementById("hidden_operator").value = '';
    deleteText();
    disableDecimalPoint(false);
    disableNumbers(false);
    disableZnamenka(false);
}

////////////////////////////////////////////////////////////////////////////////
// Function for activation / deactiovation of buttons
// 
// Activation / deactivation of number buttons
function disableNumbers(Status) {

    var elems = document.getElementsByClassName("btn btn-default btn-lg btn-block number");
    var len = elems.length;

    for (var i = 0; i < len; i++) {
        elems[i].disabled = Status;
    }
}

// Activation / deactivation of operator buttons
function disableZnamenka(Status) {
    var elems = document.getElementsByClassName("btn btn-default btn-lg btn-block signChar");
    var len = elems.length;

    for (var i = 0; i < len; i++) {
        elems[i].disabled = Status;
    }
}

// Activation / deactivation of decimal point button
function disableDecimalPoint(Status) {
    document.getElementById("decimalPoint").disabled = Status;
}

function Error() {
        disableDecimalPoint(true);
        disableNumbers(true);
        disableZnamenka(true);  
}

function Normal() {
        //disableDecimalPoint(true);
        //disableNumbers(true);  
}
////////////////////////////////////////////////////////////////////////////////
// Funtion for printing 
// 
// Adds the text
function addText(text) {
    
    // previous text for printing
    var previousOne = document.getElementById("hidden_text").value;

    // remove the last operator in case of operator changes only
    if (text == 'plus' || text == 'minus' || text == 'multiply' || text == 'divide') {
        var n = previousOne.length;
        if (previousOne.charAt(n - 2) == '+' || previousOne.charAt(n - 2) == '-') {
            previousOne = previousOne.substring(0, n - 3)
        }
        else if (previousOne.charAt(n - 2) == '*' || previousOne.charAt(n - 2) == '/') {
            previousOne = previousOne.substring(1, n - 4)
        }
    }

    switch (text) {
        case "plus":
            var newOne = previousOne + ' + ';
            break;
        case "minus":
            var newOne = previousOne + ' - ';
            break;
        case "multiply":
            var newOne = '(' + previousOne + ') * ';
            break;
        case "divide":
            var newOne = '(' + previousOne + ') / ';
            break
        default:
            var newOne = previousOne + text;
    }
    // new text for printing
    document.getElementById("hidden_text").value = newOne;

}

// Printing to 'paragon - it means stores the calculation into DB
function printText() {
    var text = document.getElementById("hidden_text").value;
    var display = document.getElementById("display").value;


    var textModif = text.split("+").join("plus");

    //GET
    //window.location = 'eq.html?zadani='+textModif+'&result='+display;

    //POST
    var form = document.createElement("form");
    var input1 = document.createElement("input");
    var input2 = document.createElement("input");

    form.action = "eq.html";
    form.method = "post"

    input1.name = "formula";
    input1.value = textModif;
    form.appendChild(input1);

    input2.name = "result";
    input2.value = display;
    form.appendChild(input2);

    document.body.appendChild(form);
    form.submit();
}

function deleteText() {
    var display = document.getElementById("display").value;
    document.getElementById("hidden_text").value = display;
}