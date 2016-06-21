export function equals(first, second) {
  
  let firstString = new String(JSON.stringify(first)).valueOf();
  let secondString = new String(JSON.stringify(second)).valueOf();

  return firstString == secondString; 
}