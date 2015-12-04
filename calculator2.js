$(document).ready(function(){
  var Calculator = {
    operCodes:     [42, 43, 45, 47, 37],
    numCodes:      [48, 49, 50, 51, 52, 53, 54, 55, 56, 57],
    numButtons:    $('span.button-cell'),
    clrButton:     $('span.clear'),
    eqlButton:     $('span.equals'),
    eqDiv:         $('.equation'),
    pstDiv:        $('.past'),
    rsltDiv:       $('.results'),
    calcBod:       $('.calc-body'),
    dispDiv:       $('.display'),
    calBodMod:     {'padding':'0', 'margin':'0'},
    dispMod:       {'padding': '0', 'margin': '15px'},
    smTxtMod:      {'padding': '0', 'margin': '0 15px', 'font-size': '1em', 'line-height': '100%', 'height': '25%'},
    eqMod:         {'font-size': '1.5em', 'vertical-align': 'middle', 'height': '50%', 'padding': '0'},
    buttonMod:     {'padding': '0'},
    stndButton:    {'line-height': '100px', 'font-size': '24px', 'vertical-align': 'middle', 'height': '100px'},
    
     numClick: function() {
      this.numButtons.click((function(event){
         var element = event.currentTarget;
         this.eqDiv.append($(element).html());
         this.rsltDiv.html(this.calculate(this.eqDiv.html()));
      }).bind(this)); 
    },

    equalsFunc: function() {
      if (this.rsltDiv.html() == undefined){
        eq = this.eqDiv.html();
        this.eqDiv.html(this.calculate(eq));
      } else {
        this.pstDiv.html(this.eqDiv.html());
        this.eqDiv.html(this.rsltDiv.html());
      }
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
      this.resizeDim();
      this.chkSetDims();
    }, 

    calcElmChg: function(target, modObj, parentH, numRow) {
      var cellH = (parentH / numRow) + 'px'                                                           // calculates cell-height in pixels
      var fntSz = cellH / 2 + 'px'                                                                    // Calculates font-size as 50% of cell height  
      target.height(cellH);                                                                           // Sets whatever target element height to cell-height
      target.css(modObj);                                                                             // Sets the modification object styling to target element
      target.css({'line-height': "#{cellH}", 'font-size': "#{fntSz}", 'vertical-align': 'middle'});   // Sets font-sizes and aligns them in the middle. 
    },

    chkSetDims: function() {

      if ($(window).height() < 800) {
        winHeight = $(window).height();

        this.calcBod.height(winHeight + 'px');
        this.calcBod.css(this.calBodMod);
        // buttons
        this.calcElmChg(this.numButtons, this.buttonMod, winHeight, 6);
        this.calcElmChg(this.clrButton, this.buttonMod, winHeight, 6);
        this.calcElmChg(this.eqlButton, this.buttonMod, winHeight, 6);
        
        // display portion
        dispDivHeight = this.dispDiv.height((winHeight / 6));
        this.dispDiv.height(dispDivHeight + 'px');
        this.calcElmChg(this.eqDiv, this.eqMod, dispDivHeight, 2);
        this.calcElmChg(this.rsltDiv, this.smTxtMod, dispDivHeight, 4);
        this.calcElmChg(this.pstDiv, this.smTxtMod, dispDivHeight, 4);
        
        if (winHeight < 300) {
          this.rsltDiv.css('display', 'none');
          this.pstDiv.css('display', 'none');
        }

      } else if ($(window).height() >= 800) {
        this.calcBod.css({'height': '600px', 'width': '400px'});
        this.numButtons.css(this.stndButton);
        this.clrButton.css(this.stndButton);
        this.eqlButton.css({'font-size': '24px', 'width': '100%'});
        this.dispDiv.css('height', '100px');
        this.eqDiv.css({'height': '50px', 'font-size': '30px'});
        this.pstDiv.css({'height': '25px', 'font-size': '16px'});
        this.rsltDiv.css({'height': '25px', 'font-size': '16px'});
      }
    },

    resizeDim: function() {
      $(window).resize((function(event) {
        this.chkSetDims();
      }).bind(this));
    }
  };
  Calculator.calcInit();
});
