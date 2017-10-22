import React from 'react';
import NavigationBar from './components/NavigationBar';
import PageContent from './PageContent';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <NavigationBar/>
        <PageContent/>
      </div>
    )
  }
};
