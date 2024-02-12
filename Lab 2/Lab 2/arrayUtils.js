/* Todo: Implment the functions below and then export them
      using the ES6 exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/


let sortAndFilter = (array, sortBy1, sortBy2, filterBy, filterByTerm) => {
  let count1=0,count2=0,sort1=sortBy1[0],sort2=sortBy2[0]

  //checking if array parameter exists
  for(let i=0;i<array.length;i++){
    if(typeof array[i]!='object'){
      throw 'array not provided in input'
    }
    if(Object.keys(array[i]).length===0){
      throw 'Empty object provided'
    }
    for(let j in array[i]){
      if(typeof array[i][j]!='string'){
        throw 'Values of objects should be strings'
      }

      if(array[i][j].trim("").length==0){
        throw 'Empty string provided for object value'
      }
    }
  }


  //checking if array is of type array
  if(!Array.isArray(array)){
    throw 'Input array should be of type Array'
  }

  if(array.length==0){
    throw 'Empty array given as input'
  }

  if(array.length<2){
    throw 'Provide atleast 2 objects in array'
  }

  if(sortBy1==undefined | !Array.isArray(sortBy1)){
    throw 'sortBy1 input missing'
  }

  if(sortBy1.length<2){
    throw 'Missing parameters in sortBy1'
  }

  if(sortBy1.length>2){
    throw 'sortBy1 should have only 2 parameters'
  }

  if(typeof sortBy1[1]!='string'){
    throw 'second parameter of sortBy1 should be string'
  }

  if(sortBy1[1].trim().length==0){
    throw 'second parameter of sortBy1 is an empty string'
  }

  if(!(sortBy1[1]!=='asc' | sortBy1[1]!=='desc')){
    throw 'second parameter of sortBy1 can only be asc or desc'
  }

  if(sortBy2==undefined | !Array.isArray(sortBy2)){
    throw 'sortBy2 input missing'
  }

  if(sortBy2.length<2){
    throw 'Missing parameters in sortBy2'
  }

  if(sortBy2.length>2){
    throw 'sortBy2 should have only 2 parameters'
  }

  if(typeof sortBy2[1]!='string'){
    throw 'second parameter of sortBy2 should be string'
  }

  if(sortBy2[1].trim().length==0){
    throw 'second parameter of sortBy2 is an empty string'
  }

  if(!(sortBy2[1]!=='asc' | sortBy2[1]!=='desc')){
    throw 'second parameter of sortBy2 can only be asc or desc'
  }

  if(filterBy===undefined){
    throw 'Missing parameter for filterBy'
  }

  if(filterByTerm===undefined){
    throw 'Missing parameter for filterByTerm'
  }

  for(let i=0;i<array.length;i++){
    let myObj=array[i]
    for(let i in myObj){
      if(i==sortBy1[0]){
        count1+=1
      }
      else if(i==sortBy2[0]){
        count2+=1
      }
    }    
  }

  //checking if both sortBy keys are present in the given input array
  if(count1<1|count2<1){
    throw 'sortBy key not present in given input array'
  }

    array.sort((a,b)=>{
      if(a[sort1]<b[sort1]){
        return -1
      }
      else if(a[sort1]>b[sort1]){
        return 1
      }
      else{
        return 0
      }

    })

    if(sort1[1]==='desc'){
      array=array.reverse()
    }

    // console.log(array,array.reverse(),"reversed")

    array.sort((a,b)=>{
      if(a[sort2]<=b[sort2]){
        return -1
      }
      else{
        return 1
      }
    })

    if(sortBy2[1]==='desc'){
      array=array.reverse()
    }
    

  let filtered_array=[]
  for(let i in array){
    if(array[i][filterBy]==filterByTerm){
      filtered_array.push(array[i])
    }
  }

  return filtered_array
};

let merge = (...args) => {

  //checking if atleast 1 array is provided as input
  if(args.length==0){
    throw 'Provide atleast 1 array'
  }
  
  for(let i=0;i<args.length;i++){
    //checking if each input is an array
    if(!Array.isArray(args[i])){
      throw 'Input must be of type array'
    }

    //checking if each array has atleast 1 element
    if(args[i].length==0){
      throw 'Array should have atleast 1 element'
    }
  }

  let merged=[]
  let merging = (array1)=>{
    for(let i=0;i<array1.length;i++)
    {
      //checking if each element of array is either a number or string or array of numbers or strings
      if(typeof array1[i]!='object'){
        if(isNaN(array1[i]) & typeof array1[i]!='string'){
          throw 'Invalid input. Should be a valid number, string or array of numbers or strings'
        }
        if(array1[i]=='Infinity'){
          throw 'Invalid input provided. value cannot be Infinity'
        }
        merged.push(array1[i])
      }
      else{
        merging(array1[i])
      }
    }
    return merged    
  }

  for(let i=0;i<args.length;i++){
    merging(args[i])
  }

  let num_array=[],char_array=[]
    for(let i=0;i<merged.length;i++){
      if(typeof merged[i]=='number')  {
        num_array.push(merged[i])
        num_array=num_array.sort(function(a,b){return a-b})
      }    
      else if(typeof merged[i]=='string'){
        char_array.push(merged[i])
      }
    }
    char_array=char_array.sort()
    let result=num_array.concat(char_array)
  return result
};

let matrixMultiply = (...args) => {

  //checking if there are at least two inputs
  if(args.length<2){
    throw 'Provide atleast 2 matrices'
  }

  for(let i=0;i<args.length;i++){
    //checking if each input is an array
    if(!Array.isArray(args[i])){
      throw 'invalid matrix input. Matrix should be of type array'
    }
    
    //checking if each array is not empty
    if(args[i].length==0){
      throw 'Empty matrix provided'
    }
    
    for(let j=0;j<args[i].length;j++){
      //checking if each array has only arrays
      if(!Array.isArray(args[i][j])){
        throw 'Every outer Array should have only arrays'
      }

      for(let k=0;k<args[i][j].length;k++){
        //checking if inner arrays have only numbers
        if(typeof args[i][j][k]!='number'){
          throw 'Every inner array should have only numbers'
        }

      } 
       
    } 
  }

  //checking if each inner array is of same length
  for(let i=0;i<args.length;i++){
    for(let j=0;j<args[i].length-1;j++){
  if(args[i][j].length!=args[i][j+1].length){
    throw 'Inconsistent size of rows'
  }
}
    
}

  let matrix1=args[0]
  let matrix2=args[1]
  for(let a=0;a<args.length-1;a++){
    matrix2=args[a+1]
    let m1=matrix1.length
    let n1=matrix1[0].length
    let m2=matrix2.length
    let n2=matrix2[0].length

    var result=new Array(matrix1.length)
    for(let i=0;i<matrix1.length;i++){
      result[i]=new Array(matrix2[matrix2.length-1].length)
    }

    if(n1==m2){
      for(let i=0;i<m1;i++){
        for(let j=0;j<n2;j++){
          result[i][j]=0
          for(let k=0;k<n1;k++){
            result[i][j]+=matrix1[i][k]*matrix2[k][j]

          }
        }
      }
      matrix1=result
      console.log()
    }
    else{
      throw 'Matrix multiplication not possible'
    }
    
  }
  return result;
    //this function takes in a variable number of arrays that's what the ...args signifies
};

export {sortAndFilter, merge, matrixMultiply};
