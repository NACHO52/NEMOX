
function validateField(event) {
    var lementId = event.target.id;
    var formNode = document.getElementById(lementId);
    if(formNode.value === '' || formNode.value == undefined || formNode.value === null) {
        formNode.classList.add('is-invalid');
        formNode.classList.add('incomplete');
    } else {
        formNode.classList.add('is-valid');
        formNode.classList.remove('incomplete');
    }
}
function resetValidator(event) {
    var lementId = event.target.id;
    var formNode = document.getElementById(lementId);
    formNode.classList.remove('is-invalid');
    formNode.classList.remove('is-valid');
}
function addStudent() {
    var invalids = document.getElementsByClassName('incomplete');
    if(invalids.length != 0) {
        alert('Debe un nombre y DNI válidos.');
        return;
    }
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
}