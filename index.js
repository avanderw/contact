const supported = 'contacts' in navigator;

async function checkProperties() {
    document.getElementById("fieldSupport").classList.remove("d-none");
    const supportedProperties = await navigator.contacts.getProperties();
    if (supportedProperties.includes('name')) {
        console.log("name supported");
        document.getElementById("nameSupported").innerText = "Supported";
    }
    if (supportedProperties.includes('email')) {
        console.log("email supported");
        document.getElementById("emailSupported").innerText = "Supported";
    }
    if (supportedProperties.includes('tel')) {
        console.log("telephone number supported");
        document.getElementById("telSupported").innerText = "Supported";
    }
    if (supportedProperties.includes('address')) {
        console.log("address supported");
        document.getElementById("addressSupported").innerText = "Supported";
    }
    if (supportedProperties.includes('icon')) {
        console.log("avatar supported");
        document.getElementById("iconSupported").innerText = "Supported";
    }
}

const props = ['name', 'email', 'tel', 'address', 'icon'];
const opts = { multiple: true };

async function getContacts() {
    try {
        const contacts = await navigator.contacts.select(props, opts);
        handleResults(contacts);
    } catch (ex) {
        console.log(ex);
    }
}

if (supported) {
    checkProperties();
} else {
    document.getElementById("supportWarning").classList.remove("d-none");
}