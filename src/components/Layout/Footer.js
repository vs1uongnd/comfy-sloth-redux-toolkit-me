import React from "react";
import Wrapper from "../../wrappers/Footer";

const Footer = () => {
  return (
    <Wrapper>
      <h5>
        &copy; {new Date().getFullYear()} <span>ComfySloth</span>
      </h5>
      <h5>All rights reserved</h5>
    </Wrapper>
  );
};

export default Footer;
