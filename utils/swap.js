export function swap(array, first, second) {
  var tmp = array[second];
  array[second] = array[first];
  array[first] = tmp;
  return array; 
}