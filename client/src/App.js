import React, { Component } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import HomePage from './Components/HomePage/homePage'
import LoginPage from './Components/LoginPage/loginPage'
import SignUpPage from './Components/SignUpPage/SignUpPage'
import { history } from './Helper/history.js';
import {Helmet} from 'react-helmet';

class App extends Component {

    state = {
        isLoggedIn: false
    };


    componentDidMount() {

        //check for login

    }

    render() {
        let isLoggedIn = this.state.isLoggedIn;

        return (
            <div className="App">

                <Helmet>
                    <title>DriveUp</title>
                </Helmet>
                <Router history={history}>
                    <Switch>
                        {!isLoggedIn ? <Route exact path="/" component={LoginPage}/> :
                            <Route exact path="/" component={HomePage}/>}
                        {!isLoggedIn ? <Route exact path="/signUp" component={SignUpPage}/> :
                            <Route exact path="/signUp" component={HomePage}/>}
                        {!isLoggedIn ? <Route exact path="/login" component={LoginPage}/> :
                            <Route exact path="/login" component={HomePage}/>}
                        {!isLoggedIn ? <Route path="/home" component={HomePage}/> :
                            <Route path="/home" component={LoginPage}/>}

                        {/*<Route path="*" component={InvalidPage}/>*/}
                    </Switch>
                </Router>

            </div>
        );
    }
}

function mapStateToProps(state) {
    const {simpleReducer} = state;
    return {
        simpleReducer
    };
}

export default connect(mapStateToProps)(App);
