import * as React from 'react';
import './App.css';

import logo from './beoi.svg';

import ProblemList from './components/ProblemList';
import SubmissionList from './components/SubmissionList';
import { theme } from './constants/theme';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { Button, withStyles, Grid } from '@material-ui/core';
import TopTable from './components/TopTable';

const AppMenu = withStyles({
  button: {
    margin: theme.spacing.unit,
  },
})((props: any) => {
  const { classes } = props;
  return (
    <div id="AppMenu">
      <Link to="/"><Button className={classes.button} size="large">Top Contestants</Button></Link>
      <Link to="/problems"><Button className={classes.button} size="large">Problems</Button></Link>
      <Link to="/submissions"><Button className={classes.button} size="large">Recent Activity</Button></Link>
    </div>
  );
});

class App extends React.Component {
  public render() {
    return (
      <BrowserRouter>
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">
              Welcome to <span dangerouslySetInnerHTML={{ __html: logo }} />
            </h1>
          </header>
          <AppMenu />
          <Route exact path="/" component={() => (
            <Grid container justify="center">
              <TopTable />
            </Grid>
          )} />
          <Route exact path="/problems" component={() => (
            <Grid container justify="center">
              <ProblemList />
            </Grid>
          )} />
          <Route exact path="/submissions" component={() => (
            <Grid container justify="center">
              <SubmissionList />
            </Grid>
          )} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
