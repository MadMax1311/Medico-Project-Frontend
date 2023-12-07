const firebaseConfig = {
    apiKey: "AIzaSyBLLd_bbdwTATUcF2QeQqUtUApdXFMvFqM",
    authDomain: "contectform-6cbeb.firebaseapp.com",
    databaseURL: "https://contectform-6cbeb-default-rtdb.firebaseio.com",
    projectId: "contectform-6cbeb",
    storageBucket: "contectform-6cbeb.appspot.com",
    messagingSenderId: "849233065235",
    appId: "1:849233065235:web:3704a09dc3d741747056e6",
  };

// Your existing Firebase configuration

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Reference your database
// Reference your database
// Your existing Firebase configuration
// ...


// Reference your database
var contactFormDB = firebase.database().ref("contactForm");

document.getElementById("contactForm").addEventListener("submit", submitForm);

function submitForm(e) {
    e.preventDefault();

    var medicineName = getElementVal("medicineName");
    var description = getElementVal("description");
    var dose = getElementVal("dose");
    var type = getElementVal("type");
    var medicinePrice = getElementVal("medicinePrice");
    var medicineImage = document.getElementById("medicineImage").files[0];

    saveMedicineInfo(medicineName ,description, dose, type, medicinePrice, medicineImage);

    // Enable alert
    document.querySelector(".alert").style.display = "block";

    // Remove the alert after 3 seconds
    setTimeout(() => {
        document.querySelector(".alert").style.display = "none";
    }, 3000);

    // Reset the form
    document.getElementById("contactForm").reset();
}

const saveMedicineInfo = (medicineName, description, dose, type ,medicinePrice, medicineImage) => {
    var newContactForm = contactFormDB.push();

    // You can use Firebase Storage to store the image and get its URL
    var storageRef = firebase.storage().ref();
    var imageRef = storageRef.child("medicineImages/" + medicineImage.name);

    imageRef.put(medicineImage).then(function (snapshot) {
        imageRef.getDownloadURL().then(function (downloadURL) {
            newContactForm.set({
                medicineName: medicineName,
                description: description,
                dose: dose,
                type: type,
                medicinePrice: medicinePrice,
                medicineImage: downloadURL, // Store the image URL in the database
            });
        });
    });
};

const getElementVal = (id) => {
    if (id === "type") {
        // Get the selected value from the dropdown
        var select = document.getElementById(id);
        return select.options[select.selectedIndex].value;
    }



    return document.getElementById(id).value;
};