createList();
loadStudents();
function createList(){
    var existing = localStorage.getItem('StudentList');
    if(existing) {
        return;
    } else {
        var students = [];
        var studentJSON = JSON.stringify(students);
        localStorage.setItem('StudentList', studentJSON);
    }
}
function loadStudents(){
    var obj = localStorage.getItem('StudentList');
    var alumno = JSON.parse(obj);
    for(a = 0; a < alumno.length; a++){
        var item =  alumno[a];
        createNewElement(item);
    }
}
function createNewElement(item) {
    var ulNode = document.getElementById('mainList');
    var liNode = document.createElement('li');
    liNode.id = 'saved-' + item.dni;
    liNode.className = 'list-group-item';
    var h1Node = document.createElement('h1');
    h1Node.innerHTML = item.firstName + ' ' + item.lastName;
    var h3Node = document.createElement('h3');
    h3Node.innerHTML = 'DNI: ' + item.dni;
    var h4Node = document.createElement('h4');
    h4Node.innerHTML = 'E-mail: ' + item.email;
    liNode.appendChild(h1Node);
    liNode.appendChild(h3Node);
    liNode.appendChild(h4Node);
    ulNode.appendChild(liNode);
}
function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}
function validateField(event) {
    var elementId = event.target.id;
    var formNode = document.getElementById(elementId);
    if((formNode.id === 'txtEmail' && validateEmail(txtEmail.value) === false) || formNode.value === '' || (formNode.id === 'txtDni' && formNode.value <= 0)){
        formNode.classList.add('is-invalid');
        formNode.classList.add('incomplete');
        document.getElementById('btnAddStudent').disabled = true;
    }
    else {
        formNode.classList.add('is-valid');
        formNode.classList.remove('incomplete');
        var invalids = document.getElementsByClassName('incomplete');
        if(invalids.length === 0) {
            document.getElementById('btnAddStudent').disabled = false;
        }
    }
}
function resetValidator(event) {
    var elementId = event.target.id;
    var formNode = document.getElementById(elementId);
    formNode.classList.remove('is-invalid');
    formNode.classList.remove('is-valid');
}
function Student(firstName, lastName, dni, email) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.dni = dni;
    this.email = email;
}
function addStudent() {
    if(txtDni.value < 0) {
        alert('DNI inválido.');
        return;
    }
    var obj = localStorage.getItem('StudentList');
    var students = JSON.parse(obj);
    var existing = students.filter(s => s.dni === txtDni.value);
    if(existing.length != 0) {
        alert('Los datos ingresados ya pertenecen a un alumno,\n por favor modifiquelos e intente nuevamente');
        return;
    }
    var student = new Student(txtFirstName.value, txtLastName.value, txtDni.value, txtEmail.value);
    students.push(student);
    localStorage.setItem('StudentList', JSON.stringify(students));
    createNewElement(student);
    txtDni.value = '';
    txtDni.classList.remove('is-valid');
    txtDni.classList.remove('is-invalid');
    txtEmail.classList.remove('is-valid');
    txtEmail.classList.remove('is-invalid');
    txtFirstName.classList.remove('is-valid');
    txtFirstName.classList.remove('is-invalid');
    txtLastName.classList.remove('is-valid');
    txtLastName.classList.remove('is-invalid');
    txtFirstName.value = '';
    txtLastName.value = '';
    txtEmail.value = '';
    document.getElementById('btnAddStudent').disabled = true;
}
function checkStudent(a) {
    return a.dni === txtDniDelete.value;
}
function deleteStudent() {
    if(txtDniDelete.value === '') {
        alert('Debe ingresar un número de DNI.');
        return;
    } 
    var obj = localStorage.getItem('StudentList');
    var students = JSON.parse(obj);
    var existing = students.filter(checkStudent);
    if(existing.length == 0) {
        alert('No se encontró a ningún alumno con ese DNI, porfavor verifique los datos ingresados e intente nuevamente.');
        return;
    }
    students.splice(students.findIndex(e => e.dni === txtDniDelete.value),1);
    localStorage.setItem('StudentList', JSON.stringify(students));
    txtDniDelete.value = '';
    var ulNode = document.getElementById('mainList');
    var liNode = document.getElementById('saved-' + existing[0].dni);
    ulNode.removeChild(liNode);
}
function searchStudent() {
    var name = txtSearchStudent.value.toLowerCase();
    var ulNode = document.getElementById('mainList');
    if(name === '') {
        ulNode.innerHTML = '';
        loadStudents();
        return;
    }
    ulNode.innerHTML = '';
    var obj = localStorage.getItem('StudentList');
    var studentList = JSON.parse(obj);
    var matchesList = [];
    studentList.forEach(function(item) {
        var fullNameSpaced = item.firstName.toLowerCase() + ' ' + item.lastName.toLowerCase();
        var fullName = item.firstName.toLowerCase() + item.lastName.toLowerCase();
        if(fullNameSpaced.indexOf(name) != -1 || fullName.indexOf(name) != -1) {
            matchesList.push(item);
        }
    });
    matchesList.forEach(function(item) {
        createNewElement(item);
    });
}