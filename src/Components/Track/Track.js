import React from 'react';
import './Track.css';


class Track extends React.Component {

    constructor(props) {
        super(props)

        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);


    }
    //render two button elements with each its onClick function
    renderAction() {

        if (this.props.isRemoval) {
            return <button className="Track-Action" onClick={this.removeTrack}>-</button>
        } else {
            return <button className="Track-Action" onClick={this.addTrack}>+</button>
        }
    }
    //Use the addTrack method from App.js to push the track to PlayList
    addTrack() {

        this.props.onAdd(this.props.track);
        
    }
    //Use the removeTrack method from App.js to filter out the track from the playList
    removeTrack() {
        this.props.onRemove(this.props.track);

    }
    //Render the track
    render() {
        return (
            <div className="Track">
                    <div className="Track-information">
                        <h3>{this.props.track.name}</h3>
                        <p>{this.props.track.artist} | {this.props.track.album}</p>
                    </div>
                    {this.renderAction()}
            </div>
        )
    }
}



export default Track;
