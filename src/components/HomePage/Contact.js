import React from "react";
import Wrapper from "../../wrappers/Contact";

const Contact = () => {
  return (
    <Wrapper>
      <div className="section section-center">
        <h3>Join our newsletter and get 20% off</h3>
        <div className="content">
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deserunt,
            dolore! Minima accusamus nihil libero, labore temporibus ullam
            eligendi error soluta.
          </p>
          <form
            className="contact-form"
            action="https://formspree.io/f/mpzedpqy"
            method="POST"
          >
            <input
              type="email"
              className="form-input"
              placeholder="enter email"
              name="email"
            />
            <button type="submit" className="submit-btn">
              subscribe
            </button>
          </form>
        </div>
      </div>
    </Wrapper>
  );
};

export default Contact;
