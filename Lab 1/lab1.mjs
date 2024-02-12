export const questionOne = (arr) => {
  let sum=0
  for(let i=0;i<arr.length;i++){
    sum+=Math.pow(arr[i],3)
  }
  let count=0
  for(let i=1;i<=sum;i++){
    if(sum%i==0){
      count+=1
    }
    else if(count>=3){
      break
    }
    else{
      continue
    }
  }
  let prime=(count==2)?true:false
  let result={}
  let key_sum=sum.toString()
  result[key_sum]=prime;
  return result; //return result
};

export const questionTwo = (numArray) => {
  let result=[]  
    for(let i=0;i<numArray.length;i++){

      if(numArray[i]>numArray[i+1]){
        result.push(false)
        result.push(i)
        result.push(i+1)
        break
      }
    }

  if(result.length==0){
    result.push(true)
  }
  return result; //return result
};

export const questionThree = (obj1, obj2) => {
  let result={}
  for(let i in obj1){
    for(let j in obj2){
      if(i==j){
        result[i]=true
      }
    }
    if(!(i in result)){
      result[i]=false
    }
  }
  for(let i in obj2){
    if(!(i in result)){
      result[i]=false
    }
  }
  return result; //return result
};

export const questionFour = (string) => {
  let result = string.split("\n")
  let final_result = []
  for(let i in result){
    final_result.push(result[i].split(','))
  }
  return final_result; //return result
};

export const studentInfo = {
  firstName: 'Sri Naga Hansi',
  lastName: 'Mamidi',
  studentId: '20012906'
};
