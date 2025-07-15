/* Given objects from WDD 231: Week 01 home page */
// As instructed I altered each "completed" as true if I had completed the course.
const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: false
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: false
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: false
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
]

/* Course Filter */
// This script filters courses based on the subject and calculates total credits for completed courses

// This added event listener waits for the DOM to be fully loaded before executing the script
document.addEventListener('DOMContentLoaded', () => {
    // This selects all buttons in the document and adds a click event listener to each button
    document.querySelectorAll('.buttons button').forEach(button => {
        // When a button is clicked, it retrieves the class name of the button
        button.addEventListener('click', () => {
            // Variable to hold the class name of the clicked button
            const className = button.className;

            // This filters the courses array based on the class name
            // If the class name is 'all', it includes all courses
            let filtered;
            if (className == 'all') {
                filtered = courses;
            }
            else {
                filtered = courses.filter(course =>
                    course.subject === className);
            }

            // This calculates the total credits for completed courses
            // It uses reduce to add up the credits of courses that are marked as completed (true)
            // It initializes with 0 and adds the credits of each completed course (true)
            const creditTotal = filtered.reduce((addCredits, course) => {
                if (course.completed) {
                    return addCredits + course.credits;
                }
                else {
                    return addCredits;
                }
            }, 0);
            
            // This sets the variable 'html' to a string of HTML buttons for each course
            // Each button displays the course subject and number, and has an HTML id set to the course
            // CSS will use the value of the completed property to style the button and will add a checkmark if completed
            const html = filtered.map(course =>
                `<button class="${course.subject}${course.number}" id="${course.completed}">${course.subject} ${course.number}</button>`).join("");
            
            // This updates the inner text of the HTML class 'totalCredits' to display the total credits
            document.querySelector(".totalCredits").innerText = creditTotal;
            // This updates the inner HTML of the HTML class 'selection' to display the buttons for each course
            document.querySelector(".selection").innerHTML = html;

            // I added these console logs to help debug the script
           //console.log(className);
            //console.log(creditTotal);
            //console.log(filtered);

            // Getting this part to work this way seemed much more difficult than I thought it whould be. I think I'm missing sothing in my understanding.
            // It works and I get how and why, but it seems there should have been a more simple way to do it. It most likely has to do with how I did 
            // the original half of the assingment for the home page.

            // This selects all buttons in the document and adds a click event listener to each button
            document.querySelectorAll('.selection button').forEach(button => {
                // When a button is clicked, it retrieves the class name of the button
                button.addEventListener('click', () => {
                    // Variable to hold the class name of the clicked button
                    const className = button.className;
                    //console.log(className);

                    // Split class name into subject and number
                    const getCourse = className.match(/^([A-Za-z]+)(\d+)$/);
                    
                    if (getCourse) {
                        const subject = getCourse[1];
                        const courseNumber = getCourse[2];
                        //console.log(subject, courseNumber);

                        filtered = courses.filter(course =>
                            course.subject == subject && course.number == courseNumber);
                        
                        //console.log(filtered);

                        const courseDetails = document.getElementById('course-details');

                        function displayCourseDetails(course) {
                            courseDetails.innerHTML = '';
                            courseDetails.innerHTML = `
                                <button id="closeModal">❌</button>
                                <h2>${course.subject} ${course.number}</h2>
                                <h3>${course.title}</h3>
                                <p><strong>Credits</strong>: ${course.credits}</p>
                                <p><strong>Certificate</strong>: ${course.certificate}</p>
                                <p>${course.description}</p>
                                <p><strong>Technologies</strong>: ${course.technology.join(', ')}</p>
                            `;
                            courseDetails.showModal();
                        
                            closeModal.addEventListener("click", () => {
                                courseDetails.close();
                            });    
                        }
                            
                        displayCourseDetails(filtered[0]);                       
                    }
                });
            });
        });
    });  
});