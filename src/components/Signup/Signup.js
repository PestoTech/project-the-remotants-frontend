import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Field } from 'react-final-form';

import validations from '../../helpers/authValidation';

class Signup extends Component {
  onSignup = async (formData) => {
    try {
      await this.props.registerUser(formData);
    } catch (e) {
      console.log(e);
    }
  }
  render() {
    const { auth: { errors } } = this.props;
    return (
      <Form
        onSubmit={this.onSignup}
        validate={validations.validateInput}
        render={({
          handleSubmit, form, submitting, pristine,
        }) => (
          <form onSubmit={handleSubmit}>
            <Field name="email">
              {({ input, meta }) => (
                <div>
                  <input {...input} type="email" placeholder="Enter your email" />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                  {errors && <span>{errors.email}</span>}
                </div>
              )}
            </Field>
            <Field name="password">
              {({ input, meta }) => (
                <div>
                  <input {...input} type="password" placeholder="Enter your password" />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                  {errors && <span>{errors.password}</span>}
                </div>
              )}
            </Field>
            <div className="buttons">
              <button type="submit" disabled={submitting}>
                Signup
              </button>
              <button
                type="button"
                onClick={form.reset}
                disabled={submitting || pristine}
              >
                Reset
              </button>
            </div>
          </form>
        )}
      />
    );
  }
}

Signup.propTypes = {
  auth: PropTypes.shape({
    errors: PropTypes.shape({}),
  }).isRequired,
  registerUser: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Signup;
