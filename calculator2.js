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
      this.numButtons.click((function(event){
         var element = event.currentTarget;
         this.eqDiv.append($(element).html());
         this.rsltDiv.html(this.calculate(this.eqDiv.html()));
      }).bind(this)); 
    },

    equalsFunc: function() {
      this.pstDiv.html(this.eqDiv.html());
      this.eqDiv.html(this.rsltDiv.html());
    }, 

    clearFunc: function() {
      this.eqDiv.html('');
      this.rsltDiv.html('');
    },

    fullClear: function() {
      this.clearFunc();
      this.pstDiv.html('');
    },

    typeDisp: function() {
      $(document).keypress((function(event) {
        if(this.operCodes.indexOf(event.which) != -1) {
          this.eqDiv.append(String.fromCharCode(event.which));
        } else if (this.numCodes.indexOf(event.which) != -1) {
          this.eqDiv.append(String.fromCharCode(event.which));
          this.rsltDiv.html(this.calculate(this.eqDiv.text()));
        } else if (event.which == 99) {
          this.clearFunc();
        } else if (event.which == 67) {
          this.fullClear();
        } else if (event.which == 13) {
          this.equalsFunc();
        }
      }).bind(this));
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
      this.typeDisp();
      this.eqlButton.click(this.equalsFunc.bind(this));
      this.clrButton.click(this.clearFunc.bind(this));
      this.clrButton.dblclick(this.fullClear.bind(this));
    }, 

    adjWidth: function() {
      $(window).resize((function(event) {
        var win = event.currentTarget;
        if ($(win).width() < 425) {
          console.log($(win).width());
        };
      }).bind(this));
    }
  };
  Calculator.calcInit();
  Calculator.adjWidth();
});