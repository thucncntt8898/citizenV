import axios from "axios";

export default function({app, redirect}) {
    if (!app.$auth.loggedIn) {
        return redirect('/login')
    }

    axios.defaults.headers['Authorization'] = window.localStorage.getItem('access_token')
}
