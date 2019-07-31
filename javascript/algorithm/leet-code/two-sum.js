/* Given an array of integers, return indices of the two numbers such that they add up to a specific target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

Example:

Given nums = [2, 7, 11, 15], target = 9,

Because nums[0] + nums[1] = 2 + 7 = 9,
return [0, 1].

*/

/*   First attempt by nesting two loops */
var twoSum1 = function(nums, target) {
  for (i=0; i<nums.length; i++) {
    for (j=i+1; j<nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
};

/*  Second attempt by using hash table   */
var twoSum2 = function(nums, target) {
  let map = new Map();
  for (i=0; i<nums.length; i++){
    map.set(nums[i], i);
  }
  let pairNum;
  for (i=0; i<nums.length; i++) {
    pairNum = target - nums[i];
    if (map.get(pairNum) >= 0 && map.get(pairNum) !== i) {
      return [i, map.get(pairNum)];
    }
  }
  return `No pair found`;
};

/*  Third attempt by one-pass hash table  */
/*  try to find the pair num of the element from the hash table */
/*  before insert the element into hash table */
var twoSum =  function(nums, target) {
  const map = new Map();
  let pairNum;
  for (i=0; i<nums.length; i++){
    pairNum = target - nums[i];
    if (map.get(pairNum) >= 0) {
      return [map.get(pairNum), i]; 
    }
    map.set(nums[i], i);
  }
  return `No nums found`;
}

//const nums = [11, 4, 2, 15, 7]; 
//const nums = [2, 4, 11, 15, 7]; 
const nums = [3, 2, 4]
const target = 6;
console.log(twoSum(nums, target));