const user = {
  name: "John Doe",

  sayNameRegular: function () {
    console.log(this.name);
    setTimeout(function() {
      console.log(this.name);
    }
    , 1000);
  }
}

function sayNameArrow() {
  var name = "John Doe";
  // var self = this.name;
  console.log(name);
  setTimeout(() => {
    console.log(name);
  }, 1000);
}

sayNameArrow();