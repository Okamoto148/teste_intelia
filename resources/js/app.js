require('./bootstrap');

var React = require('react');
var ReactDOM = require('react-dom');
var App = require('./components/App').default;

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
