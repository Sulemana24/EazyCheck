/* const icon = document.querySelector(".icon");
    const ul = document.querySelector(".nav-menu ul");
    const bar = document.getElementById("bar");
    
    icon.addEventListener("click", () =>{
        console.log(ul);
        ul.classList.toggle("showMenu");
        
        if (ul.classList.contains("showMenu")) {
            bar.className = "fa-solid fa-xmark";
        } else {
            bar.className = "fa-solid fa-bars";
        }
    } )

   
    const courseDisplay = document.getElementById("course-display");
    const checkBtn = document.querySelector(".check-btn");
    const gpa = document.querySelector(".gpa");
    const cgpa = document.querySelector(".cgpa");
    const currentClass = document.querySelector(".class span");
    const gradeForm = document.getElementById("grade-form");
    const courseInput = document.getElementById("course-input");
    const grade = document.getElementById("grade");
    const creditHours = document.getElementById("credit-hours");
    
    

    gradeForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const entry = document.createElement('li');
      const paragraph = document.createElement('p');
      const CHP = document.createElement('p');
      
      CHP.textContent = creditHours.value;
      
      paragraph.textContent = courseInput.value;
      entry.innerHTML = grade.value;
      const flexWrapper = document.createElement('div');
      flexWrapper.classList.add('flex-wrapper');
      flexWrapper.append(entry);
      flexWrapper.append(CHP);
      
      flexWrapper.append(paragraph);
      courseDisplay.append(flexWrapper);
      gradeForm.reset();
      
    });

    letterGrade = grade.value;
    let totalPoints = 0;
    let totalCredits = 0;
    
    function convertGradeToPoint(letterGrade) {
      switch (letterGrade) {
          case 'A':

              return 4.0;
          case 'B+':
              return 3.5;
          case 'B':
              return 3.0;
          case 'C+':
              return 2.5;
          case 'C':
              return 2.0;
          case 'D+':
              return 1.5;
          case 'D':
              return 1.0;
          case 'E':
              return 0;
          default:
              return null; 
      }
  }

  


 */

  const icon = document.querySelector(".icon");
  const ul = document.querySelector(".nav-menu ul");
  const bar = document.getElementById("bar");
  
  // Toggle menu functionality
  icon.addEventListener("click", () => {
      ul.classList.toggle("showMenu");
      bar.className = ul.classList.contains("showMenu")
          ? "fa-solid fa-xmark"
          : "fa-solid fa-bars";
  });
  
  // Select form elements
  const courseDisplay = document.getElementById("course-display");
  const gpa = document.querySelector(".gpa span");
  const currentClass = document.querySelector(".class span");
  const gradeForm = document.getElementById("grade-form");
  const courseInput = document.getElementById("course-input");
  const grade = document.getElementById("grade");
  const creditHours = document.getElementById("credit-hours");
  const checkBtn = document.querySelector(".check-btn");
  const resetButton = document.getElementById('reset');
  
  let courses = [];
  
  // Convert grade to point
  function convertGradeToPoint(letterGrade) {
      switch (letterGrade) {
          case "A": return 4.0;
          case "B+": return 3.5;
          case "B": return 3.0;
          case "C+": return 2.5;
          case "C": return 2.0;
          case "D+": return 1.5;
          case "D": return 1.0;
          case "E": return 0;
          default: return null;
      }
  }
  
  // Calculate GPA
  function calculateGPA() {
      let totalPoints = 0;
      let totalCredits = 0;
  
      courses.forEach(course => {
          const gradePoint = convertGradeToPoint(course.grade);
          const credits = parseFloat(course.creditHours);
          if (gradePoint !== null && credits > 0) {
              totalPoints += gradePoint * credits;
              totalCredits += credits;
          }
      });
  
      if (totalCredits === 0) return 0; // Avoid division by zero
      return (totalPoints / totalCredits).toFixed(2);
  }
  
  // Add course and update GPA
  gradeForm.addEventListener("submit", function (e) {
      e.preventDefault();
  
      // Validation
      if (!creditHours.value || !grade.value) {
          alert("Please fill out all fields before submitting.");
          return;
      }
  
      // Create a new course object
      const newCourse = {
          id: Date.now(),
          name: courseInput.value || "Untitled",
          grade: grade.value,
          creditHours: parseFloat(creditHours.value), // Parse as number
      };
      courses.push(newCourse);
  
      // Add course data to display
      const entry = document.createElement("p");
      const paragraph = document.createElement("p");
      const CHP = document.createElement("p");
      CHP.textContent = `Credits: ${newCourse.creditHours}`;
      paragraph.textContent = `Course: ${newCourse.name}`;
      entry.textContent = `Grade: ${newCourse.grade}`;
      const flexWrapper = document.createElement("div");
      flexWrapper.setAttribute("data-id", newCourse.id);
      flexWrapper.classList.add("flex-wrapper");
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.classList.add("delete-btn");

      deleteButton.addEventListener("click", function () {
        const courseId = flexWrapper.getAttribute("data-id");
        courses = courses.filter(course => course.id !== parseInt(courseId)); // Remove from the array
        flexWrapper.remove(); // Remove from the DOM
        gpa.textContent = calculateGPA(); // Update GPA
      });


      flexWrapper.append(paragraph);
      flexWrapper.append(CHP);
      flexWrapper.append(entry);
      flexWrapper.append(deleteButton);
      courseDisplay.append(flexWrapper);

      // Reset form
      gradeForm.reset();
  });
  
  // Display GPA on button click
  checkBtn.addEventListener("click", function () {
    
      const gpaValue = calculateGPA();
      gpa.textContent = gpaValue;
      if (gpaValue >= 3.5){
        currentClass.textContent = "First Class";
      } else if(gpaValue >= 3){
        currentClass.textContent = "Second Class Upper";
      } else if(gpaValue >= 2.5) {
        currentClass.textContent = "Second Class Lower";
      } else if(gpaValue >= 2) {
        currentClass.textContent = "Third Class";
      } else{
        currentClass.textContent = "Pass";
      }
      
  });

  resetButton.addEventListener('click', () => {
    if (courses.length === 0) {
      alert('No courses to reset!');
      return;
    }
    courseDisplay.innerHTML = ''; 
    currentClass.innerHTML = '';
    gpa.innerHTML = '';
    courses = [];
  });
  