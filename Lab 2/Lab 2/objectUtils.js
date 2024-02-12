/* Todo: Implment the functions below and then export them
      using the ES6 exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

let areObjectsEqual = (...args) => {

      // console.log(typeof args)
      //checking if input exists
      if(args.length==0){
            throw 'No input parameters passed'
      }
      for(let i=0;i<args.length;i++){
            if(typeof args[i]!='object'){
                  throw 'Input should be type object'
            }
            if(Array.isArray(args[i])){
                  throw 'Input must not be an array'
            }
      }
      if(args.length<2){
            throw 'Pass atlest 2 objects'
      }

      //checking if input is an object



      
      let obj1={},obj2={},temp={}
      for(let i=0;i<args.length-1;i++){
            obj1=args[i]
            obj2=args[i+1]
            if(Object.keys(obj1).length==Object.keys(obj2).length){
                  for(let [key,value] of Object.entries(obj1)){
                        if(key in obj2){
                              if(typeof obj1[key]=='object'){
                                    let obj1_obj=obj1[key], obj2_obj=obj2[key]
                                    if(Object.keys(obj1_obj).length==Object.keys(obj2_obj).length){
                                          for(let [key1,value1] of Object.entries(obj1_obj)){
                                                if(key1 in obj2_obj){
                                                      if(obj2_obj[key1]==value1){
                                                            temp[key1]=value
                                                      }
                                                      else{
                                                            return false
                                                      }
                                                }
                                          }
                                    }
                              }
                              else if(obj2[key]==value){
                                    temp[key]=value
                              }
                              else{
                                    return false
                              }
                        }
                  }
            } 
            else{
                  return false
            } 
      }
      return true
};

let calculateObject = (object, funcs) => {
      //checking if object exists
      if(object==undefined){
            throw 'No object passed for input'
      }

      //checking if object is of proper type
      if(typeof object!='object' | Array.isArray(object)){
            throw 'object input should be of type object'
      }

      //checking if funcs exists
      if(funcs===undefined){
            throw 'No input passed for functions'
      }

      //checking if funcs is of type array
      if(!Array.isArray(funcs)){
            throw 'funcs must be of type array'
      }

      //checking if atleast one function is passed
      if(funcs.length==0){
            throw 'Pass atleast 1 element for funcs'
      }

      for(let [key,value] of Object.entries(object)){
            //checking if all object values are numbers
            if(typeof value!='number'){
                  throw 'values of objects must be a number and valid'
            }

            //checking if value is a valid number
            if(isNaN(value)){
                  throw 'invalid input for values(provided Nan)'
            }

            if(value==='null' | value==='Null' |value==='NULL'){
                  throw 'Null value passed for object value'
            }
      }

      for(let i=0;i<funcs.length;i++){
            //checking if all elements in funcs are of type function
            if(typeof funcs[i]!='function'){
                  throw 'Elements of funcs must be of type function'
            }

            for(let [key,value] of Object.entries(object)){
                  object[key]=funcs[i](value).toFixed(2)
            }                    
      }
      return object    
};

let combineObjects = (...args) => {

      //checking if there are atleast 2 parameters
      if(args.length<2){
            throw 'Provide atleast 2 objects'
      }

      //checking if each object is of proper type and has atleast 1 key
      let type_check = (check1)=>{
            if(typeof check1!='object'|typeof check1===undefined | typeof check1===null){
                  throw 'objects should be of type object'
            }
            else if(Array.isArray(check1))
            {
                  throw 'object is of type array'
            }
            else{
                  let count=0
                  for(let i in check1){
                        count+=1
                  }

                  if(count==0){
                        throw 'Each object should have atleast 1 key'
                  }
            }
      }
      for(let i=0;i<args.length;i++){            
             type_check(args[i])
      }

      let compare=args[0]
      let final_result={}
      let common = (obj2)=>{
            for(let [key,value] in obj2){
                  if(key in compare==false){
                        compare[key]=obj2[key]
                  }
                  else{
                        final_result[key]=compare[key]
                  }
            }
            return final_result
      }

      let result={}
      for(let i=1;i<args.length;i++){
            result=common(args[i])
      }
      return result
};

export {areObjectsEqual,calculateObject,combineObjects}