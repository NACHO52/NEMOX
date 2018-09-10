
loadStudents();
function validateField(event) {
    var lementId = event.target.id;
    var formNode = document.getElementById(lementId);
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
    var lementId = event.target.id;
    var formNode = document.getElementById(lementId);
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
    liNode.id = student.dni;
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
        return;
    }
    localStorage.removeItem(txtDniDelete.value);
    var studentToDelete = document.getElementById(txtDniDelete.value)
    mainList.removeChild(studentToDelete);
    txtDniDelete.value = '';
}

function loadStudents(){
    for(a = 0; a < localStorage.length; a++){
        var key = localStorage.key(a);
        var item = localStorage.getItem(key);
        var student = JSON.parse(item);
        var ulNode = document.getElementById('mainList'); //Container principal
        var liNode = document.createElement('li');  //fila de la lista
        liNode.id = student.dni;
        liNode.className = 'list-group-item';
        var h1Node = document.createElement('h1');
        h1Node.innerHTML = student.firstName + ' ' + student.lastName
        var h3Node = document.createElement('h3');
        h3Node.innerHTML = 'DNI: ' + student.dni;
        liNode.appendChild(h1Node);
        liNode.appendChild(h3Node);
        ulNode.appendChild(liNode);
    }
}