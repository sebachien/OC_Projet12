
async function registerUser(event) {
    event.preventDefault()
    try {
        removeExistForm();
    } catch (error) {
        
    }
    addNewFormRegister();
    addRegisterEventListener();
}

async function loginUser(event) {
    event.preventDefault()
    try {
        removeExistForm();
    } catch (error) {
        
    }
    addNewFormLogin();
    addLoginEventListener();
}

const addNewFormRegister = () => {
    var selectFormPosition = document.querySelector("#logo");
    var form = document.createElement("form");
    form.setAttribute("id","reg-form");
    form.innerHTML ='<h2>Register</h2></br><label for="uname"><b>Email</b></label><input type="text" autocomplete="off" id="email" placeholder="Email" /><label for="psw"><b>Password</b></label><input type="password" autocomplete="off" id="password" placeholder="Password" /><input type="submit" id="submitbtn" value="Submit Form" /></br></br><b id="errorMessage"></b>';
    selectFormPosition.after(form);
}

const addNewFormLogin = () => {
    var selectFormPosition = document.querySelector("#logo");
    var form = document.createElement("form");
    form.setAttribute("id","login");
    form.innerHTML ='<h2>Login</h2></br><label for="uname"><b>Email</b></label><input type="text" autocomplete="off" id="email" placeholder="Email" /><label for="psw"><b>Password</b></label><input type="password" autocomplete="off" id="password" placeholder="Password" /><input type="submit" id="submitbtn" value="Submit Form" />';
    selectFormPosition.after(form);
}


const removeExistForm = () => {
    var selectFormPosition = document.querySelector('form');
    selectFormPosition.remove();
}

const removeExistBtn = () => {
    var selectBtnPosition = document.querySelector('.container');
    selectBtnPosition.remove();
}
const removeExistTbl = () => {
    var selectTblPosition = document.getElementById('tbl-showContact');
    selectTblPosition.remove();
}



const addLoginEventListener = () => {
    const form = document.getElementById('login')
    form.addEventListener('submit', login)

    async function login(event) {
        event.preventDefault()
        const email = document.getElementById('email').value
        const password = document.getElementById('password').value

        const result = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
        })})
        .then((res) => {
            if(res.status == 200) {
                res.json().then((data) => {
                    console.log(data.token)
                    sessionStorage.setItem('token', data.token);
                    sessionStorage.setItem('userId', data.userId);
                    sessionStorage.setItem('status', 'connecté');
                    
                })
                
            };
        }).then((addIndex) => {
            indexLog();
        });    
    }
}

const addBtnShowContact = () => {
    const logo = document.getElementById('logo')
    const btn = document.createElement("button");
    btn.setAttribute("id","btn-showContact");
    btn.innerText = "Afficher contact"
    btn.addEventListener('click', showContacts);
    logo.after(btn);
    async function showContacts(event) {
        event.preventDefault()
        const result = await fetch('/api/contact/', {
            method: 'GET',
            headers: {
                //Authorization: 'Bearer '+sessionStorage.getItem('token')
            }
        }).then((res) => {
            console.log("res :"+res);
            //res.json().then((contacts) => {
            //    addContactList(contacts);
            //}).then((res) => {
            //    addEventListenerBtn();
            //    })
        })
        console.log('result ='+ result)
    }
    
}

const addContactList = (contacts) => {
    if(typeof(contacts) != 'undefined' && contacts != null) {
        // get the reference for the body
        const positionContact = document.getElementById('btn-showContact')
        try {
            removeExistTbl();
        } catch (error) {
            
        }
        // creates a <table> element and a <tbody> element
        const tblContacts = document.createElement("table");
        tblContacts.setAttribute("id","tbl-showContact");
        const tblBody = document.createElement("tbody");
        for(let contact of contacts) {
            const btnSupr = document.createElement("button");
            btnSupr.innerHTML = "Supprimer"
            btnSupr.setAttribute("class","btn-Supr");
            btnSupr.setAttribute("data",contact._id);
            const tblParams = ["Email : "+contact.email , "FirstName : "+contact.firstName , "LastName : "+contact.lastName , "userId : "+contact.userId, "Id : "+contact._id, "btnSupr"];
            const row = document.createElement("tr");
            for (let param of tblParams) {
                // Create a <td> element and a text node, make the text
                // node the contents of the <td>, and put the <td> at
                // the end of the table row
                var cell = document.createElement("td");

                if(param == "btnSupr") {
                    console.log("param == supr")
                    cell.appendChild(btnSupr);
                    row.appendChild(cell);
                } else {
                    let newText = document.createTextNode(param);
                    cell.appendChild(newText);
                    row.appendChild(cell);
                }
              }
              // add the row to the end of the table body
              tblBody.appendChild(row);
        }
        
        // put the <tbody> in the <table>
        tblContacts.appendChild(tblBody);
        // sets the border attribute of tbl to 2;
        positionContact.before(tblContacts)
    }
}

const addEventListenerBtn = () => {
    const btnSuprList = document.querySelectorAll('.btn-Supr');
    console.log(btnSuprList);
    for(const btnSupr of btnSuprList ) {
        console.log(btnSupr);
        btnSupr.addEventListener('click', suprContact)
    }
}

async function suprContact(event) {
    const contact = event.target.attributes[1].nodeValue
    const result = await fetch('/api/contact/'+contact, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            Authorization: 'Bearer '+sessionStorage.getItem('token')
        },
        params: {
            id:contact
        }
    }).then((res) => {
        res.json()
    })
    
}

const indexLog = () => {
    try {
        removeExistForm();
        removeExistBtn();
        addBtnCreateContact();
        modifLogoPosition();
        addBtnShowContact();
    } catch (error) {
        
    }
}

const addBtnCreateContact = () => {
    const logo = document.getElementById('logo')
    const btn = document.createElement("button");
    btn.classList.add("btn-contact")
    btn.innerText = "Nouveau contact"
    btn.addEventListener('click', addFormCreateContact);
    logo.after(btn);
}

const addFormCreateContact = () => {
    try{
        removeExistForm()
    }catch(error){
        console.log('Pas de formulaire a remove')
    }
        
    const btn = document.querySelector('.btn-contact');
    var form = document.createElement("form");
    form.setAttribute("id","createContact");
    form.innerHTML ='<h2>Nouveau contact</h2></br><label for="mail"><b>Email</b></label><input type="text" autocomplete="off" id="email" placeholder="Email" /><label for="firstname"><b>Firstname</b></label><input type="test" autocomplete="off" id="firstname" placeholder="first name" /><label for="lastname"><b>Lastname</b></label><input type="test" autocomplete="off" id="lastname" placeholder="last name" /><input type="submit" id="submitbtn" value="Créer le contact" />';
    form.addEventListener('submit', createContact)
    btn.after(form);

    async function createContact(event) {
        event.preventDefault()
        const email = document.getElementById('email').value
        const firstname = document.getElementById('firstname').value
        const lastname = document.getElementById('lastname').value
        const userId = sessionStorage.getItem('userId')
        console.log(email, firstname, lastname, userId)
        const result = await fetch('/api/contact/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                Authorization: 'Bearer '+sessionStorage.getItem('token')
            },
            body: JSON.stringify({
                firstname,
                lastname, 
                email,
                userId

            })
        }).then((res) => {
            res.json()
        })
    }
    
}

const modifLogoPosition = () => {
    const logo = document.getElementById('logo');
    logo.style.textAlign = 'left';
    logo.style.width = '300px';

}


const addRegisterEventListener = () => {
    const form = document.getElementById('reg-form')
    form.addEventListener('submit', registerUser)

    async function registerUser(event) {
        event.preventDefault()
        const email = document.getElementById('email').value
        const password = document.getElementById('password').value

        const result = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        }).then((res) => res.json())
        console.log(result);
        if (result.message == "Utilisateur crée !") {
            var message = document.getElementById('errorMessage');
            message.innerHTML = "Utilisateur crée !";
        } else if (result.error.message == "User validation failed: email: Error, expected `email` to be unique. Value: `"+email+"`") {
            var message = document.getElementById('errorMessage');
            message.innerHTML = "Utilisateur déjà existant";
        }
    } 
}


const login = document.getElementById('login')
const register = document.getElementById('register')
if(sessionStorage.getItem('status') != 'connecté') {
    login.addEventListener('click', loginUser)
    register.addEventListener('click', registerUser)
    sessionStorage.setItem('status', 'déconnecté');
} else if (sessionStorage.getItem('status') == 'connecté') {
    removeExistBtn();
    addBtnCreateContact();
    modifLogoPosition();
    addBtnShowContact();
}



