import decode from 'jwt-decode';

// Create a new class to instantiate a new Autg object
class AuthService {
    // Get User Data
    getProfile() {
        return decode(this.getToken());
    };

    // Check if user is logged in
    loggedIn() {
        // Check if we have a token and then if it is still valid
        const token = this.getToken();
        // Use type coersion to check if token is not defined and token not expired
        return !!token && !this.isTokenExpired(token);
    };

    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) {
                return true;
            }
            else {
                return false;
            }
        } catch (err) {
            return false;
        }
    };

    getToken() {
        // Retrieves the user token from localStore
        return localStorage.getItem('id_token');
    };

    login(idToken) {
        // Save user to local storage
        localStorage.setItem('id_token', idToken);
        window.location.assign('/home');
    };

    logout() {
        // Clear user token and profile data from localStorage
        localStorage.removeItem('id_token');
        // Reload window
        window.location.assign('/login');
    };

}

export default new AuthService();