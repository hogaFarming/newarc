import React from 'react';

class Login extends React.Component {
  state = {
    expired: 0
  };
  componentDidMount() {
    setInterval(() => {
      this.setState({ expired: ++this.state.expired });
    }, 1000);
  }
  render() {
    return (
      <div>{this.state.expired}</div>
    );
  }
}

export default Login;
