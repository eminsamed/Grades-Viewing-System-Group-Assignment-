let lessonClassArray = ['All Class','Class A','Class B', 'Class C']
/**
 * this function creates rows for student tables
 * @param {*} pArray 
 * @param {*} pStudentName 
 * @returns 
 */
const studentRow = (pArray, pStudentName) => pArray.filter((studentName) => studentName.name == pStudentName)
                                                  .map((student) => student.lessons.map((lesson) =>{
                                                    return `
                                                      <tr>
                                                          <td> ${lesson.lessonName}</td>
                                                          <td> ${lesson.lessonScore}</td>
                                                      </tr>
                                                          `
                                                    }).join('')).join('')
/**
 * this function creates student tables
 * @param {*} pArray 
 * @param {*} pClassContainer 
 */
const classRender = (pArray,pClassContainer) => {
  pClassContainer.innerHTML = `<h3 class=' mb-3 shadow p-3  border-bottom'> Class ${pArray.map((student) =>student.className)[0]} -
            ( ${pArray.map((student) =>student.className).length} Student)</h3> `
          + pArray.map((student) => { student.name  
              return `
              <div class="col-lg-3 col-md-6 col-sm-12 mb-3">
                <div class="card shadow">             
                  <div class="card-body bg-success text-white">
                    <h5 class="card-title  d-flex ">${student.name} ${student.lessons.length} Lessons <i onclick='deleteStudent(${student.id})' class="fas fa-trash-alt ms-auto"></i></h5>
                  </div>              
                    <table class="table table-striped table-bordered m-0">
                      <thead>
                        <tr>
                          <th scope="col">Lesson Name</th>
                          <th scope="col">Score</th>
                        </tr>
                      </thead>
                      <tbody id='classALessonList'>               
                        ${studentRow(pArray, student.name)}        
                      </tbody>
                    </table>        
                </div>
              </div>        
              `
          }).join('')
}
/**
 * This function prints the average of the lessons according to the grades of the students.
 * @param {*} pArray 
 * @param {*} pLessonName 
 * @returns 
 */
const lessonAverageRender = (pArray, pLessonName) => {
  const scoreList = []
    const averageList = pArray.forEach(student => {
      student.lessons.forEach(lesson => {
        if(lesson.lessonName == pLessonName){
        scoreList.push(lesson.lessonScore)}})      
    });
    const average = scoreList.reduce((score,total) => score + total) / scoreList.length    
      return `
        <div class="alert alert-primary col-lg-3 col-md-6 col-sm-12 role="alert">
          <span class="badge badge-pill badge-primary  text-dark">${pLessonName} 
          average <i class="fas fa-arrow-circle-right me-3"></i> ${average}</span>
        </div>            
       `
}
/**
 * this function generates headers for mean tables
 * @param {} pClassAverageContainer 
 * @param  {...any} args 
 */
const renderAverageTitle = (pClassAverageContainer,...args) =>{
  pClassAverageContainer.innerHTML += (`<h3 class='mt-5 mb-3 shadow p-3  border-bottom'> Class Avereges</h3>`+ args.join(''))

}

/**
 * This function calculates the averages of the courses according to the grades of the students.
 * @param {*} pArray 
 * @param {*} pLessonName 
 * @returns 
 */
const lessonAverage = (pArray, pLessonName) => {
  const scoreList = []
    const averageList = pArray.forEach(student => {
      student.lessons.forEach(lesson => {
        if(lesson.lessonName == pLessonName){
        scoreList.push(lesson.lessonScore)}})      
    });
    const average = scoreList.reduce((score,total) => score + total) / scoreList.length  
    return average
}

/**
 * this function puts the lessons taken by the students in the class into the array
 * @param {*} pClassName 
 * @returns 
 */
const getLessonNameList = (pClassName) =>{
    const  classsLessonsList = []
    pClassName.forEach( student => student.lessons.forEach(lesson => {
      if(!classsLessonsList.includes(lesson.lessonName)){
        classsLessonsList.push(lesson.lessonName)
      }
    }))
    return classsLessonsList
}
/**
 * This function finds the grade point average of the students in the class according to the courses.
 * @param {*} pClassName 
 * @returns 
 */
const getClassReport = (pClassName) =>{
  const classsLessonsList = getLessonNameList(pClassName)
  const lessonAverageArray = classsLessonsList.map(lesson =>lessonAverage(pClassName,lesson))
   return lessonAverageArray
}
/**
 * this function generates graphs with grades of students in the class
 * @param {*} pClassName 
 * @param {*} pChartName 
 * @returns 
 */
const chartJS = (pClassName,pChartName) =>{ 

  const myChart =  new Chart(pChartName, {    
    type: 'bar',
    data: {
        labels: getLessonNameList(pClassName),
        datasets: [{
            label: ` Class Name ${lessonClassArray.map((studentClassName ) => studentClassName)}
            total Student ${pClassName.length}`,
            data:getClassReport(pClassName),
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
return myChart
}
/**
 * this function fills the html content when the page is loaded
 */
function renderHomePage(){
  studentListA.innerHTML = `<div class='container text-center '> 
                               <h2> Hicoders Advence JavaScript Module</h2>
                               <div class ='mt-5'>
                                  <img src = './image/crest.png' alt ='HiCoders Logo' > 
                               </div>                                
                            </div>`  
  
  classAverageContainer.classList.remove('visible')
  classAverageContainer.classList.add('invisible')
  classReport.classList.remove('visible')
  classReport.classList.add('invisible')
  studentListA.classList.remove('invisible')
  studentListA.classList.add('visible')
}




renderHomePage()
