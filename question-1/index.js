function handlerLongestCommonPrefix(strArr) {
  if (strArr.length === 0) return '';

  let strFirst = strArr[0];
  for (let i = 1; i < strArr.length; i++) {
      if (strArr[i].length < strFirst.length) {
          strFirst = strArr[i];
      }
  }

  let prefix = '';
  for (let i = 0; i < strFirst.length; i++) {
      for (let j = 0; j < strArr.length; j++) {
          if (strFirst[i] !== strArr[j][i]) {
              return prefix;
          }
      }
      prefix += strFirst[i];
  }

  return prefix;
}

// usage function
const strArr1 = ["flower","flow","flight"];
console.log(handlerLongestCommonPrefix(strArr1)); // Output: "fl"

const strArr2 = ["dog","racecar","car"];
console.log(handlerLongestCommonPrefix(strArr2)); // Output: ""

const strArr3 = ["car", "cat"];
console.log(handlerLongestCommonPrefix(strArr3));