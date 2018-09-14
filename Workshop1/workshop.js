
loadStudents();
function validateField(event) {
    var elementId = event.target.id;
    var formNode = document.getElementById(elementId);
    if(formNode.id === 'txtEmail' && (formNode.value.indexOf('@') === -1 || formNode.value.indexOf('.') === -1)) {
        formNode.classList.add('is-invalid');
        formNode.classList.add('incomplete');
        return;
    }
    if(formNode.value === '' || formNode.value == undefined || formNode.value === null) {
        formNode.classList.add('is-invalid');
        formNode.classList.add('incomplete');
    } else {
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
function addStudent() {
    if(txtDni.value < 0) {
        alert('DNI inválido.');
        return;
    }
    if(localStorage.getItem(txtDni.value)) {
        alert('El alumno ingresado ya existe.');
        return;
    }
    var student = new Student(txtFirstName.value, txtLastName.value, txtDni.value, txtEmail.value);
    var studentJSON = JSON.stringify(student);
    localStorage.setItem(student.dni, studentJSON);
    var ulNode = document.getElementById('mainList'); //Container principal
    var liNode = document.createElement('li');  //fila de la lista
    liNode.id = 'saved-' + student.dni;
    liNode.className = 'list-group-item';
    var h1Node = document.createElement('h1');
    h1Node.innerHTML = student.firstName + ' ' + student.lastName
    var h3Node = document.createElement('h3');
    h3Node.innerHTML = 'DNI: ' + student.dni;
    liNode.appendChild(h1Node);
    liNode.appendChild(h3Node);
    ulNode.appendChild(liNode);
    txtDni.value = '';
    txtFirstName.value = '';
    txtLastName.value = '';
    txtEmail.value = '';
}
function Student(firstName, lastName, dni, email) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.dni = dni;
    this.email = email;
}
function deleteStudent() {
    if(txtDniDelete.value === '') {
        alert('Debe ingresar un número de DNI.');
        return;
    }
    if(!localStorage.getItem(txtDniDelete.value)) {
        alert('El DNI ingresado no existe.');
        return;
    }
    localStorage.removeItem(txtDniDelete.value);
    var studentToDelete = document.getElementById('saved-' + txtDniDelete.value)
    mainList.removeChild(studentToDelete);
    txtDniDelete.value = '';
    alert('Se ha eliminado al alumno.');
}
function loadStudents(){
    for(a = 0; a < localStorage.length; a++){
        var key = localStorage.key(a);
        var item = localStorage.getItem(key);
        var student = JSON.parse(item);
        var ulNode = document.getElementById('mainList');
        var liNode = document.createElement('li');
        liNode.id = 'saved-' + student.dni;
        liNode.className = 'list-group-item';
        var h1Node = document.createElement('h1');
        h1Node.innerHTML = student.firstName + ' ' + student.lastName;
        var h3Node = document.createElement('h3');
        h3Node.innerHTML = 'DNI: ' + student.dni;
        liNode.appendChild(h1Node);
        liNode.appendChild(h3Node);
        ulNode.appendChild(liNode);
    }
}
function searchStudent() {
    var ulNode = document.getElementById('searchList');
    ulNode.innerHTML = '';
    if(txtSearchStudent.value === '') {
        return;
    }
    var name = txtSearchStudent.value.toLowerCase();
    for(a = 0; a < localStorage.length; a++){
        var key = localStorage.key(a);
        var item = localStorage.getItem(key);
        var student = JSON.parse(item);
        if(student.firstName.toLowerCase().indexOf(name) != -1 || student.lastName.toLowerCase().indexOf(name) != -1) {
            var liNode = document.createElement('li');
            liNode.id = 'result-' + student.dni;
            liNode.className = 'list-group-item';
            var h1Node = document.createElement('h1');
            h1Node.innerHTML = student.firstName + ' ' + student.lastName;
            var h3Node = document.createElement('h3');
            h3Node.innerHTML = 'DNI: ' + student.dni;
            liNode.appendChild(h1Node);
            liNode.appendChild(h3Node);
            ulNode.appendChild(liNode);
        }
    }
    txtSearchStudent.value = '';
}