function ValidateEmail() {
        var email = document.getElementById("email").value;
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (email.match(mailformat)) {
          if (document.getElementById("email_check").checked) {
            return true;
          } else {
            alert("Please select the checkbox");
            return false;
          }
        } else {
          alert("Please enter a valid email address!");
          document.getElementById("email").focus();
          return false;
        }
      }

      function ValidatePhone() {
        var phone = document.getElementById("phone").value;
        if (phone != '') {
          if (document.getElementById("phone_check").checked) {
            if (phone.length == 10 && !'1234560'.includes(phone[0])) {
              return true;
            } else {
              alert("Enter a valid Contact Number");
              document.getElementById("phone").focus();
              return false;
            }
          } else {
            alert("Please select the checkbox");
            return false;
          }
        } else {
          alert("Enter Mobile Number");
          document.getElementById("phone").focus();
          return false;
        }
      }

      function ValidateBoth() {
        var email = document.getElementById("email1").value;
        var phone = document.getElementById("phone1").value;
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (email != '' && phone != '') {
          if (document.getElementById("agreement").checked) {
            if (email.match(mailformat)) {
              if (phone.length == 10 && !'1234560'.includes(phone[0])) {
                return true;
              } else {
                alert("Enter a valid Contact Number");
                document.getElementById("phone1").focus();
                return false;
              }
            } else {
              alert("Please enter a valid email address!");
              document.getElementById("email1").focus();
              return false;
            }
          } else {
            alert("Please select the checkbox");
            return false;
          }
        } else {
          alert("Enter Email and Mobile Number");
          document.getElementById("email1").focus();
          return false;
        }
      }