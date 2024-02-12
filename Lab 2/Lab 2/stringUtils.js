/* Todo: Implment the functions below and then export them
      using the ES6 exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

let palindromes = (string) => {

      //checking if the array exists
      if(string==undefined){
            throw 'Missing input array'
      }

      //checking if the array is of proper type (meaning, it's an array)
      if(!Array.isArray(string)){
            throw 'Provided input is not an array'
      }

      //checking if the array is not empty
      if(string.length==0){
            throw 'Input array is Empty'
      }

      for(let i=0;i<string.length;i++){
            //checking if each array element in the array is a string (No strings with empty spaces)
            if(typeof string[i]!='string'){
                  throw 'array should only consist of strings'
            }
            if(string[i].trim().length==0)
            {
                  throw 'array has strings with empty spaces'
            }
            //checking if each array element in the array consists of at least one alphanumeric character (No strings consisting of only non-alphanumeric characters)
            if((string[i].replace(/[^a-z0-9]/gi)).length==0){
                  throw 'string should have atleast one alphanumeric character(alphabet or number)'
            }

            //checking if each string element exists
            if(string[i]==undefined){
                  throw 'Given array has an undefined string'
            }
      }

      let result={}
      for(let i=0;i<string.length;i++){
            if(typeof string[i]!='string'){
                  throw 'Array element is not of type String'
            }
            string[i]=string[i].toLowerCase().replace(/[^a-z0-9]/gi,'')
            if(string[i]===''){
                  throw 'Array has a string with empty spaces'
            }

            let temp=string[i].split("").reverse().join("")
            if(temp===string[i]){
                  result[string[i]]= true
            }
            else{
                  result[string[i]]=false
            }
      }
      return result
};

let censorWords = (string, badWordsList) => {

      string=string.toLowerCase()


      //checking if the input string exists
      if(string==undefined){
            throw 'Input string not provided'
      }
      
      //checking if the input is a string
      if(!typeof string=='string'){
            throw 'Input string is not of type string'
      }

      //checking if the input is not a string of empty spaces
      if(string.trim().length==0){
            throw 'String with only empty spaces is provided'
      }

      //checking if badWordsList exists
      if(badWordsList==undefined){
            throw 'badWordsList not provided as input'
      }

      //checking if badwordsList is an array
      if(!Array.isArray(badWordsList)){
            throw 'badwordsList should be of type array'
      }
      
      for(let i=0;i<badWordsList.length;i++){
            badWordsList[i]=badWordsList[i].toLowerCase()
            //checking if all elements of badWordsList are strings
            if(typeof badWordsList[i]!=='string'){
                  throw 'badWordsList elements should be of type string'
            }

            //checking if there are no empty strings in badWordsList
            if(badWordsList[i].trim().length==0){
                  throw 'badWordsList element should not be an empty string'
            }
      }
      
      let censor=['!','@','$','#']
      let result=''
      let words=string.split(" ")
      let c=0
      let s=-1
      let bad_string=""
      let present={}
      for(let i=0;i<words.length;i++){
            for(let j=0;j<badWordsList.length;j++){
                  s=words[i].search(badWordsList[j])
                  if(s>-1){
                        present[badWordsList[i]]=true
                        bad_string=""
                        while(bad_string.length!=badWordsList[j].length){
                              bad_string+=censor[c]
                              c+=1
                              if(c>3){
                                    c=0
                              }
                        }
                        words[i]=words[i].replace(badWordsList[j],bad_string)
                  } 
                  else{
                        present[badWordsList[i]]=false
                  }
            }
      }

      
      //checking if each element in badwordsList is present in the input string
      for(let [key,value] in present){
            if(present[key]===false){
                  throw 'All elements in badWordsList should be present in the given string'
            }    
            
      }
      result= words.join(" ")
      return result
};

let distance = (string, word1, word2) => {

      if(string===undefined){
            throw 'Invalid input for string'
      }

      string=string.toLowerCase()
      word1=word1.toLowerCase()
      word2=word2.toLowerCase()

      //checking if string, word1, and word2 exist
      if(string==undefined | word1==undefined | word2==undefined){
            throw 'Missing parameters in input'
      }

      //checking if string, word1, and word2 are of type string
      if(typeof string!='string' & typeof word1!='string' & typeof word2!='string'){
            throw 'No arguments passed for word1 and word2'
      }

      //checking if string, word1, and word2 are empty strings
      if(string.trim().length==0 | word1.trim().length==0 | word2.trim().length==0){
            throw 'Empty strings passed in input'
      }

      //checking if string, word1, and word2 are not just strings made of punctuation symbols
      if((string.replace(/[^a-z0-9]/gi,'').length)==0 | (word1.replace(/[^a-z0-9]/gi,'').length==0) | (word2.replace(/[^a-z0-9]/gi,'').length==0)){
            throw 'Input strings only contain punctuation symbols'
      }

      //checking if string is at least two words long
      if(string.split(" ").length==1){
            throw 'string should contain atleast 2 words'
      }

      //checking if word1 and word2 are different
      if(word1==word2){
            throw 'word1 and word2 should be different'
      }

      let first=-1,second=-1
      let words=string.split(" ")
      for(let i=0;i<words.length;i++){
            words[i]=words[i].replace(/[^a-z0-9]/gi,'')
      }
      
      word1=word1.split(" ")
      word2=word2.split(" ")
      if(word1.length==1 & word2.length==1){

            
      first = words.indexOf(word1[0])
      second = words.indexOf(word2[0])

      //checking if word1 and word2 exist in the string
      if(words.indexOf(word1[0])==-1 & words.indexOf(word2[0])==-1){
            throw 'word1 and word2 not present in given string'
      }
      else if(words.indexOf(word1)>=0 & words.indexOf(word2)==-1){
            throw 'word2 not present in given string'
      }
      else if(words.indexOf(word1)==-1 & words.indexOf(word2)>0){
            throw 'word1 not present in given string'
      }

      if(second-first>0){
            return second-first
      }
      else{
            throw 'word1 should be present before word2'
      }

      
      

}

else if(word1.length>1|word2.length>1){
      let word1_join=word1.join("")
      let present={}
      for(let i=0;i<words.length-word1.length;i++){
            let compare1="",count=i,compare2=""
            if(word1.length>1){
                  for(let j=0;j<word1.length;j++){
                        compare1+=words[count]
                        count+=1                       
                  }
            }
            if(compare1==word1_join){
                  present[compare1]=true
            }
      }

      if(!(word1_join in present)){
            throw 'word1 not present in given input string'
      }
      else{
            first=words.indexOf(word1[word1.length-1])
      }

      
      let word2_join=word2.join("")
      for(let i=0;i<words.length-word2.length;i++){
            let compare1="",count=i,compare2=""
            if(word2.length>1){
                  for(let j=0;j<word2.length;j++){
                        compare1+=words[count]
                        count+=1                       
                  }
            }
            if(compare1==word2_join){
                  present[compare1]=true
            }
      }

      if(!(word2_join in present)){
            throw 'word2 not present in given input string'
      }
      else{
            second=words.indexOf(word2[0])
      }
      if(second-first>0){
            return second-first
      }
      else{
            throw 'word1 should be present before word2'
      }
}

};

export {palindromes, censorWords, distance}