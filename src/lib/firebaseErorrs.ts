const handleFirebaseError = (error: any) => {
    // Firebase error object contains a 'code' and 'message'
    const errorCode = error.code;
    const errorMessage = error.message;

    switch (errorCode) {
        case 'auth/email-already-in-use':
            return ("This email is already in use.");
        case 'auth/invalid-email':
            return ("Invalid email format.");
        case 'auth/weak-password':
            return ("The password is too weak.");
        case 'auth/user-not-found':
            return ("No user found with this email.");
        case 'auth/wrong-password':
            return ("Incorrect password.");
        case 'auth/operation-not-allowed':
            return ("Operation not allowed. Please enable this sign-in method in the Firebase console.");
        case 'auth/too-many-requests':
            return ("Too many requests. Please try again later.");
        case 'auth/invalid-password':
            return ("The password provided is invalid.");
        case 'auth/invalid-credential':
            return ("The email or password provided is invalid.");
        default:
            return ("An unknown error occurred:" + errorMessage);
    }
};

export default handleFirebaseError