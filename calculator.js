
// var a, b, op, result;
// var operations = [
//   ['+', 'add'],
//   ['-', 'subtract'],
//   ['*', 'multiply'],
//   ['/', 'divide'],
//   ['%', 'modulate']
// ];
// var opers = ['+', '-', '/', '*', '%' ];

// assign 
function checkInput(input) {
  for (var i = 0; i < input.length - 1; i++) {                                              //loops over the input characters 
    if (input[0].match(/[\/\+\*\%]/)) {                                                     // matches the first character against the operators
      console.log('Invalid Operator at the start');                                         
      newError('Invalid Operator at the start');                                            // Alerts user that they can't put certian operators at the start of the equation.
    }    
    if ((input[i].match(/[\/\+\-\*\%]/)) && (input[i + 1].match(/[\/\+\-\*\%]/))) {         // If the iteration and the next itteration match the operators
      console.log('terrible maths');                                                        // it throws an error that you are terrible at math.
      newError("You're terrible at the maths");
    }
  }
};

function calculate(input) {
  checkInput(input);
  var result;
  var equation = input.toString();
  var last = equation.length - 1;
  for (var i = 0; i < equation.length - 1; i++) {
    console.log(equation.length - 1);
    if (equation[last].match(/-?\d+/)) {                                                             // checks the last itteration is a digit
      result = eval(equation);                                                                       // evaluates the input string 
    }
  }
  return result;
};

function equalsFunc() {
  prevAns = $('.results').html();
  prevEq = $('.equation').html();
  $('.past').html(prevEq);
  $('.equation').html(prevAns);
  $('.results').html('');
};

function clearFunc() {
  $('.equation').html('');
  $('.results').html('');
};

function typeDisplay() {
  results = $('.results');
  past = $('.past');
  eqObj = $('.equation');
  $(document).keypress(function(event) {
    if ((event.which >= 48) && (event.which <= 57)) {                                                           // standard non-numpad number keys 0-9
      eqObj.append(String.fromCharCode(event.which));                                                           // appends the character from the type event. 
      answer = calculate(eqObj.text());
      results.html(answer);
    }
    if (event.which == 43) {                                                                                    // 
      eqObj.append(String.fromCharCode(event.which));
    }
    if (event.which == 45) {
      eqObj.append(String.fromCharCode(event.which));
    }
    if (event.which == 47) {
      eqObj.append(String.fromCharCode(event.which));
    }
    if (event.which == 42) {
      eqObj.append(String.fromCharCode(event.which));
    }
    if (event.which == 37) {
      eqObj.append(String.fromCharCode(event.which));
    }
    if (event.which == 13) {
      equalsFunc();
    }
    if (event.which == 99) {
      clearFunc();
    };
  });
};

function numClick() {
  $('span.button-cell').click(function(){
     $('.equation').append($(this).html());
     eq = $('.equation').html();
     answer = calculate(eq);
     $('.results').html(answer);
  }); 
};

function equalsClick() {
  $('span.equals').click(function() {
    equalsFunc();
  });
};

function clearClick() {
  $('span.clear').click(function() {
    $('.equation').html('');
    $('.results').html('');
  });
};

function fullClear() {
  $('span.clear').dblclick(function() {
    clearFunc();
    $('.past').html('');
  });
};

function newError(string) {
  alert('Error: ' + string);
};

function calcInit() {
  numClick();
  equalsClick();
  clearClick();
  fullClear();
  typeDisplay();
};

$(document).ready(function() {
  calcInit();
});
