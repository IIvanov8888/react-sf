import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import './App.css';

class Layout extends Component {
  constructor(props, context) {
    super(props);

    this.state = {
      showingHomeOnly: false
    };

    context.store.subscribe(()=>{
      let state = context.store.getState();
    });

    this.renderLink = this.renderLink.bind(this);
  }

  renderLink(pathname, linkname) {
    if(pathname === '' || !this.state.showingHomeOnly) {
      return <li className={this.props.location.pathname === `/${pathname}` ? "active" : ""}><Link to={`/${pathname}`}>{linkname}</Link></li>
    }
  }

  render() {

    return (
      <div className="container">
        <div className="navbar navbar-inverse">
          <div className="navbar-header">
            <span className="navbar-brand">React<span className="sf-blue">Salesforce</span></span>
          </div>
          <ul className="nav navbar-nav navbar-right">
            {this.renderLink('','Home')}
            {this.renderLink('about','About')}

          </ul>
        </div>
        <div className="main-container">
          {this.props.children}
        </div>
      </div>
    )
  }
}

Layout.propTypes = {
  children: PropTypes.node
};

Layout.contextTypes = {
  store: PropTypes.object
};

class App extends Component {
  render() {
    return (
      /*
      <BrowserRouter>
        <Route component={Layout}>
          <Route path="/" component={Home}/>
          <Route path="/about" component={About}/>
        </Route>
      </BrowserRouter>
      */
     <Router>
        {/* If path is / then load the Home component */}
            <Switch>
                <Layout>
                  <Route path="/" component={Home}/>
                  <Route path="/about" component={About}/>
                </Layout>
            </Switch>
      </Router>
    );
  }
}

export default App;
