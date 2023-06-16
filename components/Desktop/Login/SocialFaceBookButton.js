import React from 'react'
// import SocialLogin from 'react-social-login'
 
class SocialFaceBookButton extends React.Component {
    render() {
        return (
            <button className="btn btn-fb" onClick={this.props.triggerLogin} {...this.props}>
              { this.props.children }
            </button>
        );
    }
}
 export default SocialFaceBookButton;
// export default SocialLogin(SocialFaceBookButton);