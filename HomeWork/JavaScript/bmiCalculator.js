    function calculateBMI() {
      var weight = parseFloat(document.getElementById("weight").value);
      var height = parseFloat(document.getElementById("height").value) / 100;
      var bmi = weight / (height * height);
      var result = document.getElementById("result");

      if (isNaN(bmi)) {
        result.textContent = "Please enter valid values.";
      } else {
        result.textContent = "Your BMI: " + bmi.toFixed(2);
      }
    }
