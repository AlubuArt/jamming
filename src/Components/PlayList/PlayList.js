import React from 'react';
import './PlayList.css';
import TrackList from '../TrackList/TrackList';



class PlayList extends React.Component {

    constructor(props) {
        super(props)
        this.handleNameChange = this.handleNameChange.bind(this);
    }
    //Use the onNameChange method from App.js to change the name with the value of the <input<
    handleNameChange(event) {
        this.props.onNameChange(event.target.value);
    }

    render() {
        return (
            <div className="Playlist">
                <input defaultValue={"New Playlist"}
                        onChange={this.handleNameChange} />
                <TrackList tracks={this.props.playListTracks} 
                            onRemove={this.props.onRemove} 
                            isRemoval={true}/>

                <button className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</button>
            </div>
        )
    }
}

export default PlayList;
