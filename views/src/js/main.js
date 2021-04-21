// global variables :
const randomCode = ("" + Math.random()).substring(2, 8);

// login function 
function loginIn() {
    const email = document.querySelector('#em').value
    const password = document.querySelector('#ps').value

    fetch("http://localhost:3000/api/admins/login", {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
            email : email
        })
    }).then(res => {
        return res.json()
    }).then(data => {
        //console.log(data.token)
        if(data.token) {
            fetch("http://localhost:3000/api/admins/all").then(res => {
                return res.json()
            }).then(data => {
                data.map(i => {
                    if(i.email == email && i.password == password) {
                        window.location.href = "agentHome.html"
                    } else {
                        alert("Mot de Passe ou Email Inccorect")
                        location.reload()
                    }
                })
            })
        } else {
            alert("Error")
            location.reload()
        }
        // data.map(i => {
        //     if(i.email == email && i.password == password) {
        //         console.log(i)
        //         window.location.href = "agentHome.html"
        //     } else {
        //         alert("Error !!!")
        //     }
        // })
    })
}

// add new employee
function addNewEmployee () {
    const name = document.querySelector('#name').value
    const email = document.querySelector('#em').value
    const password = document.querySelector('#ps').value
    const cin = document.querySelector('#cin').value
    const birth = document.querySelector('#birth').value

    //console.log(name, email, password, cin, birth)
    fetch("http://localhost:3000/api/employees/addEmployee", {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
            name : name,
            mail : email,
            password : password,
            cin : cin,
            dateOfBirth : birth,
            registration_number : randomCode
        })
    }).then(res => {
        return res.json()
    }).then(data => {
        if(data) {
            location.reload()
        } else {
            alert("Error In Operation")
        }
    })
}

// render employees data in table
function renderEmployeesData () {
    fetch("http://localhost:3000/api/employees/getEmployee").then(res => {
        return res.json()
    }).then(data => {
        data.map(i => {
            const html = `
                <td>${i.id}</td>
                <td>${i.name}</td>
                <td>${i.mail}</td>
                <td>${i.cin}</td>
                <td>${i.dateOfBirth}</td>
                <td>${i.registration_number}</td>
            `
            document.querySelector('#employees_data').innerHTML += html
        })
    })
}

renderEmployeesData()

function logOut () {
    localStorage.clear()
    window.location.href = "index.html"
}