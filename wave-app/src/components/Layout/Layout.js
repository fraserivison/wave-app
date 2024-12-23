import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className="container-fluid px-4 py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10 col-xl-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;


