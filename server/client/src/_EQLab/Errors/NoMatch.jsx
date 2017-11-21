import React from 'react';

class NoMatch extends React.PureComponent {
  render() {
    return (
      <div>
        <div>
          <section>
            <div>
              <h1>404</h1>
              <h2><span>Page Not Found</span></h2>
            </div>
            <p>The Page You Requested Could Not Be Found</p>
          </section>
        </div>
      </div>
    );
  }
}

export default NoMatch;