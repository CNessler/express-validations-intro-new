module.exports =
function (name, hobbyOrid, obj) {
    var emptyName = 'Fill in your name';
    var emptyHobby = 'Fill in second input field';
    var noSpaces = 'No spaces in input fields';
    var noNumbers = 'No numbers in Name';
    var noNumbersTwo = 'No numbers in second input field';
    var length = 'ID must have at least three numbers';
    var validation = [];
    if (name === ''){
      validation.push(emptyName);
    }
    if (hobbyOrid === ''){
      validation.push(emptyHobby);
    }
    if (name.match(/\s/i) || hobbyOrid.match(/\s/i)){
      validation.push(noSpaces);
    }
    if (name.match(/[0-9]/i)){
      validation.push(noNumbers)
    }
    if (obj.people){
      if (hobbyOrid.match(/[0-9]/i)){
      validation.push(noNumbersTwo)
    }
    }
    if (obj.puppy){
      if (hobbyOrid.length < 3){
      validation.push(length);
    } }
    return validation
  }
