
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
    form.innerHTML ='<h2>Register</h2></br><label for="uname"><b>Email</b></label><input type="text" autocomplete="off" id="email" placeholder="Email" /><label for="uname"><b>First Name</b></label><input type="text" autocomplete="off" id="firstname" placeholder="FirstName" /><label for="uname"><b>Last Name</b></label><input type="text" autocomplete="off" id="lastname" placeholder="LastName" /><label for="psw"><b>Password</b></label><input type="password" autocomplete="off" id="password" placeholder="Password" /><input type="submit" id="submitbtn" value="Submit Form" /></br></br><b id="errorMessage"></b>';
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
    var selectTblPosition = document.getElementById('tbl-showContract');
    selectTblPosition.remove();
}



const addLoginEventListener = () => {
    const form = document.getElementById('login')
    form.addEventListener('submit', login)

    async function login(event) {
        event.preventDefault()
        const email = document.getElementById('email').value
        const password__c = document.getElementById('password').value

        const result = await fetch('/api/contact/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password__c
        })})
        .then((res) => {
            if(res.status == 200) {
                res.json().then((data) => {
                    console.log(data.token)
                    sessionStorage.setItem('token', data.token);
                    sessionStorage.setItem('userId', data.contactId);
                    sessionStorage.setItem('status', 'connecté');
                    
                })
                
            };
        }).then((addIndex) => {
            indexLog();
        });    
    }
}

const addBtnShowContract = () => {
    const logo = document.getElementById('logo')
    const btn = document.createElement("button");
    btn.setAttribute("id","btn-showContract");
    btn.innerText = "Afficher contract"
    btn.addEventListener('click', showContracts);
    logo.after(btn);
    async function showContracts(event) {
        event.preventDefault()
        const result = await fetch('/api/contract/', {
            method: 'GET',
            headers: {
                Authorization: 'Bearer '+sessionStorage.getItem('token')
            }
        }).then((res) => {
            res.json().then((contracts) => {
                console.log(contracts);
                addContractList(contracts);
            }).then((res) => {
                addEventListenerBtn();
                })
            })
    }
    
}

const addContractList = (contracts) => {
    if(typeof(contracts) != 'undefined' && contracts != null) {
        // get the reference for the body
        const positionContract = document.getElementById('btn-showContract')
        try {
            removeExistTbl();
        } catch (error) {
            
        }
        // creates a <table> element and a <tbody> element
        const tblContracts = document.createElement("table");
        tblContracts.setAttribute("id","tbl-showContract");
        tblContracts.setAttribute("class","table");
        const thead = document.createElement("thead");
        thead.setAttribute("class","thead-dark");
        thead.innerHTML = `<tr>
        <th scope="col">Numéro du contrat</th>
        <th scope="col">Date du début</th>
        <th scope="col">Date de fin</th>
        <th scope="col">Temps du contract (en mois)</th>
        <th scope="col">Status</th>
        <th scope="col">Adresse de facturation</th>
    </tr>`
        const tblBody = document.createElement("tbody");
        for(let contract of contracts) {
            const btnSupr = document.createElement("button");
            btnSupr.innerHTML = "Supprimer"
            btnSupr.setAttribute("class","btn btn-outline-danger btn-Supr");
            btnSupr.setAttribute("data",contract.id);
            const btnModif = document.createElement("button");
            btnModif.innerHTML = "Modifier"
            btnModif.setAttribute("class","btn btn-outline-primary btn-Modif");
            btnModif.setAttribute("data",contract.id);
            btnModif.setAttribute("startdate",contract.startdate);
            btnModif.setAttribute("contractterm",contract.contractterm);
            btnModif.setAttribute("status",contract.status);
            btnModif.setAttribute("billingstreet",contract.billingstreet);
            btnModif.setAttribute("billingpostalcode",contract.billingpostalcode);
            btnModif.setAttribute("billingcity",contract.billingcity);
            btnModif.setAttribute("billingcountry",contract.billingcountry);
            const tblParams = [contract.contractnumber , contract.startdate , contract.enddate , contract.contractterm , contract.status , contract.billingstreet+" "+contract.billingpostalcode+" "+contract.billingcity+" "+contract.billingcountry, "btnSupr", "btnModif"];
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
                } else if(param == "btnModif") {
                    console.log("param == modif")
                    cell.appendChild(btnModif);
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
        tblContracts.appendChild(thead);
        tblContracts.appendChild(tblBody);
        // sets the border attribute of tbl to 2;
        positionContract.before(tblContracts)
    }
}

const addEventListenerBtn = () => {
    const btnSuprList = document.querySelectorAll('.btn-Supr');
    for(const btnSupr of btnSuprList ) {
        btnSupr.addEventListener('click', suprContract)
    }
    const btnModifList = document.querySelectorAll('.btn-Modif');
    for(const btnModif of btnModifList ) {
        btnModif.addEventListener('click', addFormModifContract)
    }
}


const addFormModifContract = (event) => {
    event.preventDefault()
    try{
        removeExistForm()
    }catch(error){
        console.log('Pas de formulaire a remove')
    }
        
    const btn = document.querySelector('#btn-showContract');
    var form = document.createElement("form");
    form.setAttribute("id","modifContract");
    form.innerHTML =`<div class="container m-5">
        <form>
            <div class="mb-3">
                <label for="startdate">Début du contrat</label>
                <input type="date" class="form-control" id="startdate" value="`+event.target.attributes.startdate.nodeValue+`">
            </div>
            <div class="mb-3">
                <label for="status">Status</label>
                <select class="form-select" aria-label="Select status" id="status" value="`+event.target.attributes.status.nodeValue+`">
                <option value="Draft">Draft</option>
                <option value="Actived">Actived</option>
                <option value="In Approval Process">In Approval Process</option>
                </select>
            </div>
            <div class="mb-3">
                <label for="contractterm">Temps du contract (en mois)</label>
                <input type="number" class="form-control" id="contractterm" value="`+event.target.attributes.contractterm.nodeValue+`">
            </div>
            <h3>Adresse de facturation :</h3>
            <div class="mb-3">
                <label for="billingstreet">Rue</label>
                <input type="text" class="form-control" id="billingstreet" value="`+event.target.attributes.billingstreet.nodeValue+`">
            </div>
            <div class="mb-3">
                <label for="billingcity">Ville</label>
                <input type="text" class="form-control" id="billingcity" value="`+event.target.attributes.billingcity.nodeValue+`">
            </div>
            <div class="mb-3">
                <label for="billingpostalcode">Code postal</label>
                <input type="text" class="form-control" id="billingpostalcode" value="`+event.target.attributes.billingpostalcode.nodeValue+`">
            </div>
            <div class="mb-3">
                <label for="billingcountry">Pays</label>
                <input type="text" class="form-control" id="billingcountry" value="`+event.target.attributes.billingcountry.nodeValue+`">
            </div>
            <button type="submit" class="btn btn-primary">Modifier ce contrat</button>
        </form>
    </div>`;
    sessionStorage.setItem('contract', event.target.attributes.data.nodeValue);
    form.addEventListener('submit', modifContract)
    btn.before(form);
}

async function suprContract(event) {
    const contract = event.target.attributes[1].nodeValue
    console.log("event :"+event.target)
    console.log("contract :"+contract)
    const result = await fetch('/api/contract/'+contract, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            Authorization: 'Bearer '+sessionStorage.getItem('token')
        },
        params: {
            sfid:contract
        }
    }).then((res) => {
        res.json();
        
    })
    
}

async function modifContract(event) {
    event.preventDefault()
    const contract = sessionStorage.getItem('contract');
    const startdate = document.getElementById('startdate').value
    const status = document.getElementById('status').value
    const contractterm = document.getElementById('contractterm').value
    const billingstreet = document.getElementById('billingstreet').value
    const billingcity = document.getElementById('billingcity').value
    const billingpostalcode = document.getElementById('billingpostalcode').value
    const billingcountry = document.getElementById('billingcountry').value

    const result = await fetch('/api/contract/'+contract, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            Authorization: 'Bearer '+sessionStorage.getItem('token')
        },
        params: {
            sfid:contract
        },
        body: JSON.stringify({
        //     startdate,
        //     status, 
             contractterm,
        //     billingstreet,
        //     billingcity,
        //     billingpostalcode,
        //     billingcountry
        })
    }).then((res) => {
        res.json();
    })
    
}

const indexLog = () => {
    try {
        removeExistForm();
        removeExistBtn();
        addBtnCreateContract();
        modifLogoPosition();
        addBtnShowContract();
    } catch (error) {
        
    }
}

const addBtnCreateContract = () => {
    const logo = document.getElementById('logo')
    const btn = document.createElement("button");
    btn.classList.add("btn-contract")
    btn.innerText = "Nouveau contract"
    btn.addEventListener('click', addFormCreateContract);
    logo.after(btn);
}

const addFormCreateContract = () => {
    try{
        removeExistForm()
    }catch(error){
        console.log('Pas de formulaire a remove')
    }
        
    const btn = document.querySelector('.btn-contract');
    var form = document.createElement("form");
    form.setAttribute("id","createContract");
    form.innerHTML =`<div class="container m-5">
        <form>
            <div class="mb-3">
                <label for="startdate">Début du contrat</label>
                <input type="date" class="form-control" id="startdate" placeholder="2022/01/15">
            </div>
            <div class="mb-3">
                <label for="status">Status</label>
                <select class="form-select" aria-label="Select status" id="status">
                <option selected>Draft</option>
                <option value="1">Actived</option>
                <option value="2">In Approval Process</option>
                </select>
            </div>
            <div class="mb-3">
                <label for="contractterm">Temps du contract (en mois)</label>
                <input type="number" class="form-control" id="contractterm" placeholder="0">
            </div>
            <h3>Adresse de facturation :</h3>
            <div class="mb-3">
                <label for="billingstreet">Rue</label>
                <input type="text" class="form-control" id="billingstreet" placeholder="10 rue du saint racleton">
            </div>
            <div class="mb-3">
                <label for="billingcity">Ville</label>
                <input type="text" class="form-control" id="billingcity" placeholder="RacletteCity">
            </div>
            <div class="mb-3">
                <label for="billingpostalcode">Code postal</label>
                <input type="text" class="form-control" id="billingpostalcode" placeholder="666">
            </div>
            <div class="mb-3">
                <label for="billingcountry">Pays</label>
                <input type="text" class="form-control" id="billingcountry" placeholder="Fromage">
            </div>
            <button type="submit" class="btn btn-primary">Ajouter ce contrat</button>
        </form>
    </div>`;
    form.addEventListener('submit', createContract)
    btn.after(form);

    async function createContract(event) {
        event.preventDefault()
        const startdate = document.getElementById('startdate').value
        const status = document.getElementById('status').value
        const contractterm = document.getElementById('contractterm').value
        const billingstreet = document.getElementById('billingstreet').value
        const billingcity = document.getElementById('billingcity').value
        const billingpostalcode = document.getElementById('billingpostalcode').value
        const billingcountry = document.getElementById('billingcountry').value
        const customersignedid = sessionStorage.getItem('userId')
        const accountid ='0017Q000002OefCQAS'

        const result = await fetch('/api/contract/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                Authorization: 'Bearer '+sessionStorage.getItem('token')
            },
            body: JSON.stringify({
                startdate,
                status, 
                contractterm,
                billingstreet,
                billingcity,
                billingpostalcode,
                billingcountry,
                customersignedid,
                accountid

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
        const password__c = document.getElementById('password').value
        const firstname = document.getElementById('firstname').value
        const lastname = document.getElementById('lastname').value

        const result = await fetch('/api/contact/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password__c,
                firstname,
                lastname
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
    addBtnCreateContract();
    modifLogoPosition();
    addBtnShowContract();
}



