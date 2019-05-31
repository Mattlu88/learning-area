function smallestCommons(arr) {
  function lcm(n1, n2) {
    let lar = Math.max(n1, n2);
    let small = Math.min(n1, n2);

    let comMul = lar; 
    let findLCM;
    do {
      findLCM = true;
      for (let i = small; i < lar; i++) {
        if (comMul % i !== 0) {
          findLCM = false; 
          break;
        } 
      }
      if (findLCM === false) {
        comMul += lar;
      }
    }
    while (findLCM === false);
    return comMul; 
  }
  return lcm(arr[0], arr[1]);
}


console.log(smallestCommons([23, 18]));

