import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import CardList from '../Components/CardList';
import SearchBox from '../Components/SearchBox';
import Scroll from '../Components/Scroll';
import ErrorBoundary from '../Components/ErrorBoundary';

import { setSearchField, requestRobots } from '../actions';

const mapStateToProps = state => {
    return {
        searchField: state.searchRobots.searchField,
        robots: state.requestRobots.robots,
        isPending: state.requestRobots.isPending,
        error: state.requestRobots.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
        onRequestRobots: () => dispatch(requestRobots())
    }
}

class App extends Component {
    componentDidMount() {
        this.props.onRequestRobots();
    }

    render() {
        const filteredRobots = this.props.robots.filter(robot => {
            return robot.name.toLowerCase().includes(this.props.searchField.toLowerCase());
        })
        if (this.props.robots.length === 0) {
            return <h1 className='tc'>Loading...</h1>
        } else {
            return (
                <div className='tc'>
                    <h1>RoboFriends</h1>
                    <SearchBox searchChange={this.props.onSearchChange} />
                    <ErrorBoundary>
                        <CardList robots={filteredRobots} />
                    </ErrorBoundary>
                </div>
            );
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);