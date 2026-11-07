// Get the parking permit form
const permitForm = document.getElementById("permitForm");

// Handle form submission
permitForm.addEventListener("submit", function (event) {
// Stop the page from refreshing
event.preventDefault();

// Get student details from the form
const studentName = document.getElementById("studentName").value.trim();
const studentId = document.getElementById("studentId").value.trim();
const vehicleNumber = document.getElementById("vehicleNumber").value.trim().toUpperCase();
const vehicleType = document.getElementById("vehicleType").value;
const parkingZone = document.getElementById("parkingZone").value;

// Create a unique permit ID
const permitId = "CPMS-" + Date.now();

// Create a permit record
const permit = {
    permitId: permitId,
    studentName: studentName,
    studentId: studentId,
    vehicleNumber: vehicleNumber,
    vehicleType: vehicleType,
    parkingZone: parkingZone,
    status: "Pending"
};

// Get previously saved permits
let permits = JSON.parse(localStorage.getItem("parkingPermits")) || [];

// Prevent duplicate applications for the same vehicle
const duplicateVehicle = permits.some(function (item) {
    return item.vehicleNumber === vehicleNumber;
});

if (duplicateVehicle) {
    document.getElementById("permitMessage").textContent =
        "This vehicle already has a permit application.";
    return;
}

// Save the new permit
permits.push(permit);
localStorage.setItem("parkingPermits", JSON.stringify(permits));

// Show confirmation
document.getElementById("permitMessage").textContent =
    "Application submitted! Your Permit ID is " + permitId +
    ". Status: Pending.";

// Clear the form
permitForm.reset();

console.log("Saved permit:", permit);

});