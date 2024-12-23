import React from 'react';

const SignInButton = ({ onClick }) => {
    return (
        <button className="btn btn-outline-light" onClick={onClick}>
            Sign In
        </button>
    );
};

export default SignInButton;
