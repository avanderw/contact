const supported = 'contacts' in navigator;

async function checkProperties() {
    document.getElementById("fieldSupport").classList.remove("d-none");
    const supportedProperties = await navigator.contacts.getProperties();
    if (supportedProperties.includes('name')) {
        console.log("name supported");
        document.getElementById("nameSupported").innerText = "Supported";
        document.getElementById("nameSupported").classList.add("success");
        document.getElementById("nameSupported").classList.remove("warning");
    }
    if (supportedProperties.includes('email')) {
        console.log("email supported");
        document.getElementById("emailSupported").innerText = "Supported";
        document.getElementById("emailSupported").classList.add("success");
        document.getElementById("emailSupported").classList.remove("warning");
    }
    if (supportedProperties.includes('tel')) {
        console.log("telephone number supported");
        document.getElementById("telSupported").innerText = "Supported";
        document.getElementById("telSupported").classList.add("success");
        document.getElementById("telSupported").classList.remove("warning");
    }
    if (supportedProperties.includes('address')) {
        console.log("address supported");
        document.getElementById("addressSupported").innerText = "Supported";
        document.getElementById("addressSupported").classList.add("success");
        document.getElementById("addressSupported").classList.remove("warning");
    }
    if (supportedProperties.includes('icon')) {
        console.log("avatar supported");
        document.getElementById("iconSupported").innerText = "Supported";
        document.getElementById("iconSupported").classList.add("success");
        document.getElementById("iconSupported").classList.remove("warning");
    }
}

async function enableContacts() {
    document.getElementById("buttonPanel").classList.remove("d-none");
    document.getElementById("contactBtn").addEventListener("click", getContacts);
}

const props = ['name', 'email', 'tel', 'address', 'icon'];
const opts = { multiple: true };

async function getContacts() {
    try {
        const contacts = await navigator.contacts.select(props, opts);
        const contactsDiv = document.getElementById("contactsDiv");
        for (const contact of contacts) {
            if (contact.name) {
                const name = document.createElement("h2");
                name.innerText = contact.name;
                contactsDiv.appendChild(name);
            }
            if (contact.email) {
                const email = document.createElement("a");
                email.href = "mailto:" + contact.email;
                email.innerText = contact.email;
                contactsDiv.appendChild(email);
            }
            if (contact.tel) {
                const tel = document.createElement("a");
                tel.href = "tel:" + contact.tel;
                tel.innerText = contact.tel;
                contactsDiv.appendChild(tel);
            }
            if (contact.address) {
                const address = document.createElement("p");
                address.innerText = contact.address;
                contactsDiv.appendChild(address);
            }
            if (contact.icon) {
                const icon = document.createElement("img");
                const urlCreator = window.URL || window.webkitURL;
                icon.src = urlCreator.createObjectURL(contact.icon);
                contactsDiv.appendChild(icon);
            }
        }
        document.getElementById("contactsDiv").innerHTML = text;
    } catch (ex) {
        console.log(ex);
    }
}

/**
 * Warn the page must be served over HTTPS
 * The `beforeinstallprompt` event won't fire if the page is served over HTTP.
 * Installability requires a service worker with a fetch event handler, and
 * if the page isn't served over HTTPS, the service worker won't load.
 */
if (window.location.protocol === 'http:') {
    const requireHTTPS = document.getElementById('requireHTTPS');
    const link = requireHTTPS.querySelector('a');
    link.href = window.location.href.replace('http://', 'https://');
    requireHTTPS.classList.remove("d-none");
} else {
    if (supported) {
        checkProperties();
        enableContacts();
    } else {
        document.getElementById("supportWarning").classList.remove("d-none");
    }
}