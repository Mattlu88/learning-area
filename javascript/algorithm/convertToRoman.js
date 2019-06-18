function convertToRoman(num) {
  var decimalValue = [ 1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1 ];
  var romanNumeral = [ 'M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I' ];

  let romanized = "";
  for (let i = 0; i < decimalValue.length; i++) {
    while (decimalValue[i] <= num) {
      romanized += romanNumeral[i];
      num -= decimalValue[i];
    }
  }
  return romanized;
 }

 function convertToRoman(num) {
    var romans = ["I", "V", "X", "L", "C", "D", "M"],
        ints = [],
        romanNumber = [],
        numeral = "";
     while (num) {
       ints.push(num % 10);
       num = Math.floor(num/10);
     }
     for (i=0; i<ints.length; i++){
         units(ints[i]);
     }
     function units(){
       numeral = romans[i*2];
       switch(ints[i]) {
         case 1:
           romanNumber.push(numeral);
           break;
         case 2:
           romanNumber.push(numeral.concat(numeral));
           break;
         case 3:
           romanNumber.push(numeral.concat(numeral).concat(numeral));
           break;
         case 4:
           romanNumber.push(numeral.concat(romans[(i*2)+1]));
           break;
         case 5:
           romanNumber.push(romans[(i*2)+1]);
           break;
         case 6:
           romanNumber.push(romans[(i*2)+1].concat(numeral));
           break;
         case 7:
           romanNumber.push(romans[(i*2)+1].concat(numeral).concat(numeral));
           break;
         case 8:
           romanNumber.push(romans[(i*2)+1].concat(numeral).concat(numeral).concat(numeral));
           break;
         case 9:
           romanNumber.push(romans[i*2].concat(romans[(i*2)+2]));
         }
       }
     return romanNumber.reverse().join("").toString();
   }


 
 console.log(convertToRoman(36));