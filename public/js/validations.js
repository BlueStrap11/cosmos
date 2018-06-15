function HideAlert() {
  document.getElementById('message').setAttribute( "style", "display: none" );
}

function CheckSubscriber(subscriber) {
  var bool = false;
  $.ajax({
    async: false,
    type: 'GET',
    contentType: 'application/json',
    data: { 
      subscriberEmail: subscriber.email, 
      subscriberPhone: subscriber.phone
    },
    url: window.location.origin+'/api/subscribers/one',
    success: function(data) {
        console.log('success');
        console.log(JSON.stringify(data));
        bool = true;
    },
    error: function (error) {
      console.log(error.status);
      console.log(error.responseText);
      document.getElementById('message').setAttribute( "style", "display: inline-block" );
      document.getElementById('email1').setAttribute( "style", "border: 1px red solid" );
      document.getElementById('phone1').setAttribute( "style", "border: 1px red solid" );
      alert("User already exists");
      bool = false;
    }
  });
  return bool; 
}

function CheckSubscriberEmail(email) {
  var bool = false;
  $.ajax({
    async: false,
    type: 'GET',
    contentType: 'application/json',
    url: window.location.origin+'/api/subscribers/byEmail/'+email,
    success: function(data) {
        console.log('success');
        console.log(JSON.stringify(data));
        bool = true;
    },
    error: function (error) {
      console.log(error.status);
      console.log(error.responseText);
      document.getElementById('message').setAttribute( "style", "display: inline-block" );
      document.getElementById('email').setAttribute( "style", "border: 1px red solid" );
      alert("User already exists");
      bool = false;
    }
  });
  return bool; 
}

function CheckSubscriberPhone(phone) {
  var bool = false;
  $.ajax({
    async: false,
    type: 'GET',
    contentType: 'application/json',
    url: window.location.origin+'/api/subscribers/byPhone/'+phone,
    success: function(data) {
        console.log('success');
        console.log(JSON.stringify(data));
        bool = true;
    },
    error: function (error) {
      console.log(error.status);
      console.log(error.responseText);
      document.getElementById('message').setAttribute( "style", "display: inline-block" );
      document.getElementById('phone').setAttribute( "style", "border: 1px red solid" );
      alert("User already exists");
      bool = false;
    }
  });
  return bool; 
}

function ValidateEmail() {
  var email = document.getElementById("email").value;
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (email.match(mailformat)) {
    if (document.getElementById("email_check").checked) {
      return CheckSubscriberEmail(email);
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
      if (phone.length == 10 && !'123450'.includes(phone[0])) {
        return CheckSubscriberPhone(phone);
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
  var subscriber = {};
  subscriber.email = document.getElementById("email1").value;
  subscriber.phone = document.getElementById("phone1").value;
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (subscriber.email != '' && subscriber.phone != '') {
    if (document.getElementById("agreement").checked) {
      if (subscriber.email.match(mailformat)) {
        if (subscriber.phone.length == 10 && !'123450'.includes(subscriber.phone[0])) {
          return CheckSubscriber(subscriber);
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
