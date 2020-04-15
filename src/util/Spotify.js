const clientId = 'e3b9ad4c20124731bdc1d664b1d19f32';
const redirectURI = "http://localhost:3000/";


let accessToken;


const Spotify = {

    getAccessToken() {
        //if the accesstoken already there. return the accesstoken
        if (accessToken) {
            return accessToken;

        } 

        //check for access token match
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        if (accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);

            //wipe the access token and URL parameters
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;

        }

        else {
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
            window.location = accessUrl;
        }


        
    },
    //search for a track with the Spotify API. provided a searchterm by the user. 
    //convert the response to a JOSN object.
    //if the response (search) is empty, return an enpty array.
    //if the response is not empty, return a json object with name, id, artist, album and uri.
    search(searchTerm) {
        const accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`, 
        { 
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then(response => {
            return response.json();
        }).then(jsonResponse => {
            if(!jsonResponse.tracks) {
                return [];
            }
            return jsonResponse.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri,

            }));
        });
    },
    
    //save the playlist to the users spotify account. parameters are the playlist NAME and the tracks URI´s.
    //
    savePlaylist(name, trackUris ) {
        //if the playlist have no names or no tracks, then return.
        if (!name || !trackUris.length) {
            return ;        
        }
        //define the tokens to be used
        const accessToken = Spotify.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}` };
        let userId;

        // make a request to the spotify api, convert the response to a JSON object, and set the id of the response to the userID
        //Do the same with the playlistID. 
       return fetch('https://api.spotify.com/v1/me', {
           headers: headers
       }).then(response => 
           response.json()
       ).then(jsonResponse => {
        userId = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
            headers: headers,
            method: 'POST',
            body: JSON.stringify( { name: name })
        }).then(response => response.json()
        ).then(jsonResponse => {
            const playlistId = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
                headers: headers,
                method: 'POST',
                body: JSON.stringify( { uris: trackUris})
            })
        })
       })
       

       

    }
    
    
};

export default Spotify;



