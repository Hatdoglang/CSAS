import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

// After a successful login:
const auth = getAuth();

signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        const userId = user.uid;
        
        // Fetch user role from Firestore to determine redirect
        firestore.collection("Users").doc(userId).get()
            .then(doc => {
                if (doc.exists) {
                    const role = doc.data().role;
                    // Redirect to the appropriate dashboard based on the user's role
                    redirectToDashboard(role);
                }
            })
            .catch(error => {
                console.error("Error fetching user role:", error);
            });
    })
    .catch((error) => {
        console.error("Error during login:", error);
    });

// Redirect to Dashboard after successful login
function redirectToDashboard(role) {
    switch (role) {
        case 'Resort Owner':
            window.location.href = 'resort-owner-dashboard.html'; // Redirect to Resort Owner Dashboard
            break;
        case 'Tourism Officer':
            window.location.href = 'tourism-officer-dashboard.html'; // Redirect to Tourism Officer Dashboard
            break;
        case 'Administrator':
            window.location.href = 'admin-dashboard.html'; // Redirect to Admin Dashboard
            break;
        default:
            console.error("Role not defined:", role);
    }
}
