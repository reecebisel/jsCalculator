$(document).ready(function(){
  var Calculator = {
    operCodes:  [42, 43, 45, 47, 37],
    numCodes:   [48, 49, 50, 51, 52, 53, 54, 55, 56, 57],
    numButtons: $('span.button-cell'),
    clrButton:  $('span.clear'),
    eqlButton:  $('span.equals'),
    eqDiv:      $('.equation'),
    pstDiv:     $('.past'),
    rsltDiv:    $('.results'),

    numClick: function() {
      Calculator.numButtons.click(function(){
         Calculator.eqDiv.append($(this).html());
         eq = Calculator.eqDiv.html();
         answer = Calculator.calculate(eq);
         Calculator.rsltDiv.html(answer);
      }); 
    }, 

    equalsFunc: function() {
      eq = Calculator.eqDiv.html();
      prevAns = Calculator.rsltDiv.html();
      Calculator.pstDiv.html(eq);
      Calculator.eqDiv.html(prevAns);
    }, 

    eqlClick: function() {
      Calculator.eqlButton.click(function(){
        Calculator.equalsFunc();
      });
    },

    clearFunc: function() {
      Calculator.eqDiv.html('');
      Calculator.rsltDiv.html('');
    },

    clrClick: function() {
      Calculator.clrButton.click(function() {
        Calculator.clearFunc();
      });
    },

    fullClear: function() {
      Calculator.clearFunc();
      Calculator.pstDiv.html('');
    },

    clrDbl: function() {
      Calculator.clrButton.dblclick(function(){
        Calculator.fullClear();
      });
    },
      
    typeDisp: function() {
      $(document).keypress(function(event) {
        if (Calculator.operCodes.indexOf(event.which) != -1) {
          Calculator.eqDiv.append(String.fromCharCode(event.which));
        } else if (Calculator.numCodes.indexOf(event.which) != -1) {
          Calculator.eqDiv.append(String.fromCharCode(event.which));
          answer = Calculator.calculate(Calculator.eqDiv.text());
          Calculator.rsltDiv.html(answer);
        } else if (event.which == 99) {
          Calculator.clearFunc();
        } else if (event.which == 13) {
          Calculator.equalsFunc();
        } else if (event.which == 67) {
          Calculator.fullClear();
        }
      });
    },

    newError: function(errorMsg) {
      alert(errorMsg);
    },

    chkInput: function(input) {
      for (var i = 0; i < input.length; i++) {
        if (input[0].match(/[\/\+\*\%]/)) {                                                                                            
          Calculator.newError('Invalid operator at the start');
        } else if ((input[i].match(/[\/\+\-\*\%]/)) && (input[i + 1].match(/[\/\+\-\*\%]/))) {
          Calculator.newError("You can't have double operators bro. You just Can't.");
        }
      }
    }, 

    calculate: function(input) {
      Calculator.chkInput(input);
      lastInput = input.length - 1;
      
      if (input[lastInput].match(/\d/)) {
        answer = eval(input);
      }
      return answer;
    },

    calcInit: function() {
      this.numClick();
      this.eqlClick();
      this.clrClick();
      this.clrDbl();
      this.typeDisp();
    }
  };
  Calculator.calcInit();
});