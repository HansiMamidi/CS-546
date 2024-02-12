// In this file, you must perform all client-side validation for every single form input (and the role dropdown) on your pages. The constraints for those fields are the same as they are for the data functions and routes. Using client-side JS, you will intercept the form's submit event when the form is submitted and If there is an error in the user's input or they are missing fields, you will not allow the form to submit to the server and will display an error on the page to the user informing them of what was incorrect or missing.  You must do this for ALL fields for the register form as well as the login form. If the form being submitted has all valid data, then you will allow it to submit to the server for processing. Don't forget to check that password and confirm password match on the registration form!

(function () {

    function registerValidation(firstName, lastName, emailAddress, password, confirmPassword, role) {
    if(!firstName) throw 'Provide First Name'
    if(!lastName) throw 'Provide Last Name'
    if(!emailAddress) throw 'Please enter Email Address'
    if(!password) throw 'Please enter a password'
    if(!role) throw 'Please enter a role'

    if(firstName.trim().length===0) throw 'First Name should not be a string of empty spaces'
    if(!firstName.match(/^[a-z ,.'-]+$/gi)){
      throw "First Name shouldn't contain numbers"
    }
    if(!(firstName.length>1 | firstName.length<26)) throw ' First Name should contain atleast 2 characters and less than 26 characters'

    if(lastName.trim().length===0) throw 'Last Name should not be a string of empty spaces'
    if(!lastName.match(/^[a-z ,.'-]+$/gi)){
      throw "Last Name shouldn't contain numbers"
    }
    if(!(lastName.length>1 | lastName.length<26)) throw 'Last Name should contain atleast 2 characters and less than 26 characters'

    emailAddress=emailAddress.toLowerCase().trim()
    if(emailAddress.length===0) throw 'email address should not be a string of empty spaces'
    if(!emailAddress.match(/^[\w._-]+[+]?[\w._-]+@[\w.-]+\.[a-zA-Z]{2,6}$/gi))
    throw 'Invalid email address'
    
    if(password.trim().length===0) throw 'Password is a string of empty spaces'
    if(!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/))
    throw 'Invalid Password format. Password should contain a minimum of 8 characters, atleast 1 uppercase letter, atleast 1 lowercase letter, 1 number and 1 special character'

    if(confirmPassword.trim().length===0) throw 'Confirm Password is a string of empty spaces'
    if(!confirmPassword.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/))
    throw 'Invalid Password format. Confirm Password should contain a minimum of 8 characters, atleast 1 uppercase letter, atleast 1 lowercase letter, 1 number and 1 special character'

    // if(confirmPassword.trim().length===0) throw 'Password is a string of empty spaces'
    // if(confirmPassword.trim().length<8) throw 'Password should contain atleast 8 characters'
    // if(!confirmPassword.match(/\s/g).length===0) throw 'Password should not contain spaces'
    // if(!confirmPassword.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g)) 
    // throw 'Invalid Password format. Password should contain a minimum of 8 characters, atleast 1 uppercase letter, atleast 1 lowercase letter, 1 number and 1 special character'
    if(!(password===confirmPassword)) throw "passwords don't match"

    role=role.trim().toLowerCase()
    if(role.length===0) throw ' Role is a string of empty spaces'
    if(!(role==="admin" | role==="user")) throw 'Invalid role entered. Enter "admin" or "user" for role'

    
        return true;
      }

      function loginValidation( emailAddress, password){
        emailAddress=emailAddress.toLowerCase().trim()
        if(emailAddress.length===0) throw 'email address should not be a string of empty spaces'
        if(!emailAddress.match(/^[\w._-]+[+]?[\w._-]+@[\w.-]+\.[a-zA-Z]{2,6}$/gi))
        throw 'Invalid email address'
        
        if(password.trim().length===0) throw 'Password is a string of empty spaces'
        if(!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/))
        throw 'Invalid Password format. Password should contain a minimum of 8 characters, atleast 1 uppercase letter, atleast 1 lowercase letter, 1 number and 1 special character'

        return true;

      }
    const staticForm = document.getElementById('registration-form');
    const loginForm = document.getElementById('login-form');
  
    if (staticForm) {
      // We can store references to our elements; it's better to
      // store them once rather than re-query the DOM traversal each time
      // that the event runs.
        let firstNameInput = document.getElementById('firstNameInput');
        let lastNameInput = document.getElementById('lastNameInput');
        let emailAddressInput = document.getElementById('emailAddressInput');
        let passwordInput = document.getElementById('passwordInput');
        let confirmPasswordInput = document.getElementById('confirmPasswordInput');
        let roleInput = document.getElementById('roleInput');
  
      let errorContainer = document.getElementById('error-container');
      let errorTextElement = errorContainer.getElementsByClassName('text-goes-here')[0];
  
      // We can take advantage of functional scoping; our event listener has access to its outer functional scope
      // This means that these variables are accessible in our callback
      staticForm.addEventListener('submit', (event) => {
        event.preventDefault();
  
        try {
          // hide containers by default
          errorContainer.classList.remove('hidden');
  
          // Values come from inputs as strings, no matter what :(
          let firstName = firstNameInput.value;
            let lastName = lastNameInput.value;
            let emailAddress = emailAddressInput.value;
            let password = passwordInput.value;
            let confirmPassword = confirmPasswordInput.value;
            let role = roleInput.value;
        
            let result = registerValidation(firstName, lastName, emailAddress, password, confirmPassword, role)
            staticForm.submit();

        } catch (e) {
          const message = typeof e === 'string' ? e : e.message;
          errorTextElement.textContent = e;
          errorContainer.hidden= False;
        }
      });
    }
    if (loginForm) {
        // We can store references to our elements; it's better to
        // store them once rather than re-query the DOM traversal each time
        // that the event runs.
          
          let emailAddressInput = document.getElementById('emailAddressInput');
          let passwordInput = document.getElementById('passwordInput');
    
        let errorContainer = document.getElementById('error-container');
        let errorTextElement = errorContainer.getElementsByClassName('text-goes-here')[0];
    
        // We can take advantage of functional scoping; our event listener has access to its outer functional scope
        // This means that these variables are accessible in our callback
        loginForm.addEventListener('submit', (event) => {
          event.preventDefault();
    
          try {
            // hide containers by default
            errorContainer.classList.remove('hidden');
    
            // Values come from inputs as strings, no matter what :(
            
              let emailAddress = emailAddressInput.value;
              let password = passwordInput.value;
              
          
              let result = loginValidation( emailAddress, password)
              loginForm.submit();
  
          } catch (e) {
            const message = typeof e === 'string' ? e : e.message;
            errorTextElement.textContent = e;
            errorContainer.hidden= False;
          }
        });
      }
    
  })();
  