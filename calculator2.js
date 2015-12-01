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
    this.numButtons.click(function(){
       this.eqDiv.append($(this).html());
       eq = this.eqDiv.html();
       answer = this.calculate(eq);
       this.rsltDiv.html(answer);
    }); 
  }, 

  equalsFunc: function() {
    eq = this.eqDiv.html();
    prevAns = this.rsltDiv.html();
    this.pstDiv.html(eq);
    this.eqDiv.html(prevAns);
  }, 

  eqlClick: function() {
    this.eqlButton.click(function(){
      this.equalsFunc();
    });
  },

  clearFunc: function() {
    this.eqDiv.html('');
    this.rsltDiv.html('');
  },

  clrClick: function() {
    this.clrButton.click(function() {
      this.clearFunc();
    });
  },

  fullClear: function() {
    this.clrButton.dblclick(function(){
      this.clearFunc();
      this.pstDiv.html('');
    });
  },

  typeDisp: function() {
    $(document).keypress(function(event) {
      if (this.operCodes.indexOf(event.which) != -1) {
        this.eqDiv.append(String.fromCharCode(event.which));
      } else if (this.numCodes.indexOf(event.which) != -1) {
        this.eqDiv.append(String.fromCharCode(event.which));
        answer = this.calculate(this.eqDiv.text());
        this.rsltDiv.html(answer);
      } else if (event.which == 99) {
        this.clearFunc();
      } else if (event.which == 13) {
        this.equalsFunc();
      }
    });
  },

  newError: function(errorMsg) {
    alert(errorMsg);
  },

  chkInput: function(input) {
    for (var i = 0; i < input.length; i++) {
      if (input[0].match(/[\/\+\*\%]/)) {                                                                                            
        this.newError('Invalid operator at the start');
      } else if ((input[i].match(/[\/\+\-\*\%]/)) && (input[i + 1].match(/[\/\+\-\*\%]/))) {
        this.newError("You can't have double operators bro. You just Can't.");
      }
    }
  }, 

  calculate: function(input) {
    this.chkInput(input);
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
    this.fullClear();
    this.typeDisp();
  }
};

$(document).ready(Calculator.calcInit());
