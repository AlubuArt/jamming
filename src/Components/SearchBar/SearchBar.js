import React from 'react';
import './SearchBar.css';



class SearchBar extends React.Component {

    constructor(props) {
        super(props);
        //Binding the methods to this
        this.search = this.search.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    //passing "this.state.searchTerm" to the props that was passed down in App.js to the SearchBar component. 
    search() {
        this.props.onSearch(this.state.searchTerm);
    }

    //Sets the state of the searchbars term, to the event targets value. 
    handleTermChange(event) {

        let value = event.target.value;
        this.setState({ searchTerm: value })

    }

    handleKeyPress(event) {
        if (event.key === 'Enter') {
            this.props.onSearch(this.state.searchTerm);
        }
    }

    render() {
        return(
            <div className="SearchBar">
                <input placeholder="Enter A Song, Album, or Artist" 
                        onChange={this.handleTermChange}
                        onKeyPress={this.handleKeyPress}/> 
                        {/* when the input of the field changes, use the handleTermChange method. */}
                <button className="SearchButton" onClick={this.search}>SEARCH</button>
            </div>
        )
    }
}

export default SearchBar;
