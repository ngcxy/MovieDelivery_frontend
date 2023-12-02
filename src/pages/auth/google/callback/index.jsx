import axios from "axios";
import React from "react";

export default class CallBackPage extends React.Component {

    componentDidMount() {

        let hash = window.location.hash;
        //#state=pass-through%20value&access_token=ya29.a0AfB_byDsWDBfmyyakI8ZQ1YIMjrgNMPvW0lYuooeVM_BClxmVvyRIMztVfcoPZHx00ZvGs7ZbwsF0fmeJ0coYeKQeGvPJtSlt72DlotRq6ToDk8wlQtJoXRo9tILRSBXRwhew1TugdDreaae0OaeAmYqEwrTY46JtQaCgYKAfgSARMSFQHGX2MiQurj6iuK_2qFOuplfynjlw0169&token_type=Bearer&expires_in=3599&scope=email%20profile%20openid%20https://www.googleapis.com/auth/userinfo.email%20https://www.googleapis.com/auth/userinfo.profile&authuser=0&prompt=consent
        if (hash) {
            // get access_token 
            let access_token = hash.split('&')[1].split('=')[1];
            console.log(access_token);

            let url = "https://www.googleapis.com/oauth2/v2/userinfo?access_token="+access_token;

            axios.get(url).then((res) => {
                window.localStorage.setItem('user', JSON.stringify(res.data));
                window.location.replace('/');
            })
        }

    }

    render() {
        return (
            <div>loading...</div>
        ); 
    }
}
