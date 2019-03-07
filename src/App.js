import React, { Component } from 'react';
import { connect } from "react-redux";
import { Route, withRouter } from "react-router-dom";
import Login from './auth/Login.js'
import Vote from './components/Vote.js'
import Breeds from './components/Breeds.js'
import ImageSearch from './components/ImageSearch'
import Favs from './components/Favs'

import firebase from 'firebase';
import './custom.css'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
});


class App extends Component {
  constructor(){
    super();
    this.state = {
      value: 0,
      selected: 'tab-1'
    };
  }

	logout = (event) => {
		event.preventDefault()
		firebase.auth().signOut();
	}

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  moveTab = (tab) => {
    this.setState({
      selected: tab,
    })
  }

  render() {
    const { classes, theme } = this.props;
    return (
      <div>
      		{this.props.auth.isEmpty === true ? (
							<Route path="/" component={Login} />
      			) : (
      				<div className="container"> 

                <div className={classes.root}>
                <p onClick={() => {firebase.auth().signOut();}}>Sign Out</p>
                  <AppBar position="static" color="default">
                    <Tabs
                      value={this.state.value}
                      onChange={this.handleChange}
                      indicatorColor="primary"
                      textColor="primary"
                      variant="fullWidth"
                    >
                      <Tab label="VOTE" />
                      <Tab label="BREEDS" />
                      <Tab label="SEARCH" />
                      <Tab label="FAVS" />
                      <Tab label="UPLOAD" />
                    </Tabs>
                  </AppBar>
                  <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={this.state.value}
                    onChangeIndex={this.handleChangeIndex}
                  >
                    <TabContainer dir={theme.direction}><Vote/></TabContainer>
                    <TabContainer dir={theme.direction}><Breeds/></TabContainer>
                    <TabContainer dir={theme.direction}><ImageSearch/></TabContainer>
                    <TabContainer dir={theme.direction}><Favs/></TabContainer>
                    <TabContainer dir={theme.direction}>Item FIVE</TabContainer>
                  </SwipeableViews>
                </div>
      				</div>   
      			)}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { auth: state.firebase.auth };
};

App.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withRouter(connect(mapStateToProps,null)(withStyles(styles, { withTheme: true })(App)));