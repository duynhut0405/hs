import React from 'react'
// import SocialLogin from 'react-social-login'
 
class SocialFaceBookButtonModal extends React.Component {
    render() {
        return (
            <button className="btn btn-fb" style={{minWidth:"100%"}} onClick={this.props.triggerLogin} {...this.props}>
              { this.props.children }
            </button>
        );
    }
}
 export default SocialFaceBookButtonModal;
// export default SocialLogin(SocialFaceBookButtonModal);