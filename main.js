let error = document.getElementById('validate');
let label = document.getElementsByTagName("label");

document.getElementById("name")
  .addEventListener("keyup", function(e) {
    if (e.keyCode === 13) {
        e.preventDefault();
      next("name", "email");
    }
  });

  document.getElementById("email")
  .addEventListener("keyup", function(e) {
    if (e.keyCode === 13) {
        e.preventDefault();
        next('email','phone');
    }
  });

  document.getElementById("phone")
  .addEventListener("keyup", function(e) {
    if (e.keyCode === 13) {
        e.preventDefault();
        next('phone','age');
    }
  });

  document.getElementById("age")
  .addEventListener("keyup", function(e) {
    if (e.keyCode === 13) {
        e.preventDefault();
      next('age','address');
    }
  });
 

function next(from, to) {
    error.innerHTML = "";
    let value = document.getElementById(from).children[1].value;
    if(!value || value === "") {
        error.innerHTML = "Please enter a value";
    }
    else {
        error.innerHTML = "";
        document.getElementById(from).classList.remove('is-visible');
        document.getElementById(to).classList.add('is-visible');
    }
}

function previous(from , to) {
    error.innerHTML = "";
    console.log();
    document.getElementById(from).classList.remove('is-visible');
    document.getElementById(to).classList.add('is-visible');
}