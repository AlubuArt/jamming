import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import PlayList from '../PlayList/PlayList';
import Spotify from '../../util/Spotify';


class App extends React.Component {

    
    constructor(props) {
    super(props)
    this.state = { 
    searchResults: [],
    playListName: 'MyPlayList',
    playListTracks: []
    };
    //binding the methods to the "this".
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlayListName = this.updatePlayListName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);


    };

    //If the track is not in the PlayList, add the Track to the playList and updste the state of the playlist
    addTrack(track) {
      let tracks = this.state.playListTracks;
      if (tracks.find(savedTrack => savedTrack.id === track.id)) {
        return;
      } else {
        tracks.push(track);
        this.setState({playListTracks: tracks})
      }
    }

    //If the track is in the playList, filter the track out of the playList and update the state of the playList.
    removeTrack(track) {
      let tracks = this.state.playListTracks;
      tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);
      this.setState({playListTracks: tracks});

    }

    //Updates the PlayLists name
    updatePlayListName(name) {
      this.setState({ playListName: name });
    }

    //Save the users playlist to thier spotify account
    savePlaylist() {
      const trackUris = this.state.playListTracks.map(track => track.uri);
      Spotify.savePlaylist(this.state.playListName, trackUris).then(() => {
        this.setState({ playListName : 'New Playlist' , 
                        playListTracks: [] 
                      })
      })
    }

    //Update the searchResults from the users seacrh 
    search(searchTerm){
      /* const searchResults = Spotify.search(searchTerm);
      this.setState({ searchResults: searchResults}) */
      Spotify.search(searchTerm).then(searchResults => {
        this.setState({ searchResults: searchResults })
      }) 
    }

    render() {
      return(
        <div>
          <h1>Ja<span className="highlight">mmm</span>ing</h1>
          <div className="App">
            
            <SearchBar onSearch={this.search}
                      />
            <div className="App-playlist">
          
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} /> 
            <PlayList playListName={this.state.playListName} 
                      playListTracks={this.state.playListTracks} 
                      onRemove={this.removeTrack} 
                      onNameChange={this.updatePlayListName}
                      onSave={this.savePlaylist} />
            </div>
          </div>
        </div>
      )
    };
}
export default App;