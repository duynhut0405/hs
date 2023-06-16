import React from 'react'
// import SocialLogin from 'react-social-login'
 
class SocialGoogleButton extends React.Component {
    render() {
        return (
            <button className="btn btn-gg" style={{minWidth:"100%"}} onClick={this.props.triggerLogin} {...this.props}>
              { this.props.children }
            </button>
        );
    }
}

export default SocialGoogleButton
// export default SocialLogin(SocialGoogleButton);