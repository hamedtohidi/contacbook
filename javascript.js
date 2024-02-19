const contactInput = document.querySelectorAll('.contact input')
const contactsUl = document.querySelector('footer ul')
const Inputsubmit = document.querySelector('.submit')
const nameInput = document.querySelector('#fname')
const lnameInput = document.querySelector('#lname')
const telInput = document.querySelector('#phone')
const emailInput = document.querySelector('#email')
const addressInput = document.querySelector('#address')
const updatecontact = document.querySelector('.update-contact')
const updatesubmit = document.querySelector('.update-submit')
const icon = document.querySelector('button')
let currentContactIndex = null;

let contacts = [
    {
        fristName: 'hamed',
        lastName: 'tohidi',
        phoneNamber: '09127165236',
        email: 'www.hamed@gmail.com',
        address: 'alborz',
    },
    {
        fristName: 'mahshid',
        lastName: 'hadarpor',
        phoneNamber: '09127165236',
        email: 'www.mahshid@gmail.com',
        address: 'alborz',
    },
]
function renderContact(value, index) {
    const spanfristName = document.createElement('span')
    spanfristName.innerText = value.fristName
    spanfristName.classList.add('fristName')
    
    const spanlastName = document.createElement('span')
    spanlastName.innerText = value.lastName
    spanlastName.classList.add('lastName')

    const spanphoneNamber = document.createElement('span')
    spanphoneNamber.innerText = value.phoneNamber
    spanphoneNamber.classList.add('phoneNamber')

    const spanemail = document.createElement('span')
    spanemail.innerText = value.email
    spanemail.classList.add('email')
 
    const spanaddress = document.createElement('span')
    spanaddress.innerText = value.address
    spanaddress.classList.add('address')

    const spandelete = document.createElement('button')
    spandelete.innerHTML = '<i class="fa fa-trash" style="font-size:24px; color:red"></i>'
    spandelete.classList.add('delete')
    spandelete.addEventListener('click', function (e) {
        e.preventDefault()
        const index = contacts.findIndex(function (contact) {
            return contact.lastName == value.lastName
        })

        contacts.splice(index, 1)
        renderContacts()
    })

    const spanEdit = document.createElement('button')
    spanEdit.innerHTML = '<i class="fa fa-pencil" style="font-size:24px; color:blue"></i>'
    spanEdit.classList.add('edit')
    spanEdit.addEventListener('click', function (e) {
        e.preventDefault();
        currentContactIndex = index;
        document.querySelector('.update-input #fname').value = value.fristName;
        document.querySelector('.update-input #lname').value = value.lastName;
        document.querySelector('.update-input #phone').value = value.phoneNamber;
        document.querySelector('.update-input #email').value = value.email;
        document.querySelector('.update-input #address').value = value.address;
        document.querySelector('.update-contact').style.display = 'block';
        backdrop.style.display = 'block';
    });
    const li = document.createElement('li')
    li.appendChild(spanfristName)
    li.appendChild(spanlastName)
    li.appendChild(spanphoneNamber)
    li.appendChild(spanemail)
    li.appendChild(spanaddress)
    li.appendChild(spanEdit)
    li.appendChild(spandelete)
    return li
}
function renderContacts() {
    contactsUl.innerHTML = ''
    for (let i in contacts) {
        const li = renderContact(contacts[i], i)
        contactsUl.appendChild(li)
    }
}
renderContacts()
Inputsubmit.addEventListener('click', function (e) {
    e.preventDefault()
    if (nameInput.value && lnameInput.value && telInput.value && emailInput.value && addressInput.value)
     {
        const errorMessage = document.querySelector('#error-message');
        if (!validatePhoneNumber(telInput.value)) {
            alert('');
            return;
        }

        if (!validateEmail(emailInput.value)) {
            errorMessage.style.display = 'inline'; // نمایش پیغام خطا
            return;
        } else {
            errorMessage.style.display = 'none'; // مخفی کردن پیغام خطا
        
        }

        const Contact = {
            fristName: nameInput.value,
            lastName: lnameInput.value,
            phoneNamber: telInput.value,
            email: emailInput.value,
            address: addressInput.value,
        };
        localStorage.setItem('contacts', JSON.stringify(contacts));
        contacts.push(Contact)
        document.querySelector('footer').style.display = 'block'
        renderContacts()
    }
    nameInput.value = ''
    lnameInput.value = ''
    telInput.value = ''
    emailInput.value = ''
    addressInput.value = ''

})
updatesubmit.addEventListener('click', function (e) {
    e.preventDefault()
    if (
        document.querySelector('.update-input #fname').value &&
        document.querySelector('.update-input #lname').value &&
        document.querySelector('.update-input #phone').value &&
        document.querySelector('.update-input #email').value &&
        document.querySelector('.update-input #address').value) {
        const Contacte = {
            fristName: document.querySelector('.update-input #fname').value,
            lastName: document.querySelector('.update-input #lname').value,
            phoneNamber: document.querySelector('.update-input #phone').value,
            email: document.querySelector('.update-input #email').value,
            address: document.querySelector('.update-input #address').value,
        };
        contacts[currentContactIndex] = Contacte;
        document.querySelector('.update-contact').style.display = 'none',
        backdrop.style.display = 'none';
            renderContacts()
    }

})
icon.addEventListener('click', function (e) {
    document.querySelector('.update-contact').style.display = 'none'
    renderContacts()
})
function validatePhoneNumber(phoneNumber) {
    const regex = /^098(\+\d{}[- ]?)?\d{4,11}$/;
    return regex.test(phoneNumber);
}

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const backdrop = document.createElement('div');
backdrop.style.display = 'none';
backdrop.style.position = 'fixed';
backdrop.style.top = '0';
backdrop.style.left = '0';
backdrop.style.width = '100%';
backdrop.style.height = '100%';
backdrop.style.backgroundColor = 'rgba(0,0,0,0.5)';
backdrop.style.zIndex = '1'; 
document.body.appendChild(backdrop);
updatecontact.style.zIndex = '2'; 



