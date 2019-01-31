import React, { Component, ReactNode } from 'react';
import AuthService, { User } from '../../services/auth'
import { Session } from './session.model';
import { Presenter } from './presenter.model';
import { SessionLevels } from './session-level.enum';
import { OpenLabInterests } from './open-lab-interest.enum';
import { Formik, FieldArray, Field, ArrayHelpers, ErrorMessage, FormikErrors, FormikTouched, getIn } from 'formik';

type SessionSubmissionState = {
  session: Session;
};

export default class SessionSubmission extends Component {

  public state: SessionSubmissionState = {
    session: this.buildEmptySession()
  };

  public get user(): User {
    return AuthService.getUser();
  }

  public handlePresenterChange = (event: any, i: number) => {
    if (event.target) {
      const updatedPresenter: Presenter = {
        ...this.state.session.presenters[i],
        [event.target.name]: event.target.value
      };

      const updatedState: SessionSubmissionState = {
        ...this.state,
      };

      updatedState.session.presenters[i] = updatedPresenter;

      this.setState(updatedState);
    }

  };

  public handleChange = (event: any) => {
    if (event.target) {
      const updatedSubmission = {
        ...this.state.session,
        [event.target.name]: event.target.value
      };

      this.setState({
        session: updatedSubmission
      });
    }
  };

  public handleTagsChange = (event: any) => {
    if (event.target) {
      this.setState({
        ...this.state.session,
        session: {
          tags: event.target.value.split(',').map((v: string) => v.trim())
        }
      });
    }
  }

  public render(): ReactNode {
    return (
      <div className="container">
        <h1>Submit Session</h1>
        {
          <Formik
            initialValues={this.state.session}
            validate={values => {
              const errors: any = {};
              if (!values.title) {
                  errors.title = 'Title is required';
              }

              if (!errors.presenters) {
                errors.presenters = [];
              }
              if (!errors.presenters[0]) {
                errors.presenters[0] = {};
              }

              if (values.presenters && values.presenters[0]) {
                if (!values.presenters[0].firstName) {
                  errors.presenters[0].firstName = 'First Name is required';
                }
                if (!values.presenters[0].lastName) {
                  errors.presenters[0].lastName = 'Last Name is required';
                }
              }

              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
              }, 400);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              /* and other goodies */
            }) => (
                <form onSubmit={handleSubmit}>

                  <FieldArray
                    name="presenters"
                    render={(arrayHelpers: ArrayHelpers) => (
                      <>
                        {values.presenters && values.presenters.length > 0 ? (
                          values.presenters.map((presenter, index) => this.renderPresenterForm(presenter, index, arrayHelpers, errors, touched))
                        ) : (<></>)}
                        <div className="form-row mt-3">
                          <div className="col-sm-12 ">
                            <div className="d-flex justify-content-center">
                              <button className="btn btn-outline-primary" type="button" onClick={() => arrayHelpers.push(this.buildEmptyPresenter())}>Add Presenter</button>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  />
                  <div className="form-row mt-5">
                    <div className="col-sm-12 col-md-6">
                      <div className="form-group">
                        <label htmlFor="title">Session Title</label>
                        <Field className={`form-control ${touched.title && errors.title ? 'is-invalid' : 'is-valid'}`} placeholder="How To Do Amazing Things" name="title" id="title" />
                        <div className="invalid-feedback">
                          <ErrorMessage name="title" />
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-12">
                      <div className="form-group">
                        <label htmlFor="summary">Summary</label>
                        <Field component="textarea" className="form-control" placeholder="I am a blank at blank working mostly with...." name="summary" id="summary" />
                      </div>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Target Level</label>
                        {['100', '200', '300', '400'].map((level) => (
                          <div key={level} className="form-check">
                            <Field type="radio" className="form-check-input" name="targetLevel" id={`targetLevel${level}`} value={level} />
                            <label className="form-check-label" htmlFor={`targetLevel${level}`}>{level}</label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="col-sm-12 col-md-6">
                      <div className="form-check">
                        <label>Are you interested in hosting an Open Lab?</label>
                        {['Yes', 'No', 'Maybe'].map((interestOption) => (
                          <div key={interestOption} className="form-check">
                            <Field type="radio" className="form-check-input" name="interestedInOpenLab" id={`interestedInOpenLab${interestOption}`} value={interestOption} />
                            <label className="form-check-label" htmlFor={`interestedInOpenLab${interestOption}`}>{interestOption}</label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="form-row mt-3">
                    <div className="col-sm-12 ">
                      <div className="d-flex justify-content-center">
                        <button className="btn btn-outline-primary" type="submit" disabled={isSubmitting}>
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              )}
          </Formik>
        }
      </div>
    );
  }

  public renderPresenterForm(
      presenter: Presenter,
      index: number,
      arrayHelpers: ArrayHelpers,
      errors: FormikErrors<Session>,
      touched: FormikTouched<Session>): any {
    const firstNamePath: string = `presenters.${index}.firstName`;
    const lastNamePath: string = `presenters.${index}.lastName`;
    const bioPath: string = `presenters.${index}.bio`;
    const titlePath: string = `presenters.${index}.title`;
    const companyPath: string = `presenters.${index}.company`;
    const phoneNumberPath: string = `presenters.${index}.phoneNumber`;
    const emailPath: string = `presenters.${index}.email`;

    return (
      <React.Fragment key={index}>
        <div className="form-row">
          <div className="col-sm-12 col-md-6">
            <div className="form-group">
              <label htmlFor={firstNamePath}>First Name</label>
              <Field
                className={`form-control ${getValidationClass(firstNamePath)}`}
                placeholder="John" name={firstNamePath} id={firstNamePath} />
              <div className="invalid-feedback">
                <ErrorMessage name={firstNamePath} />
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-6">
            <div className="form-group">
              <label htmlFor={lastNamePath}>Last Name</label>
              <Field
                className={`form-control ${getValidationClass(lastNamePath)}`}
                placeholder="Doe" name={lastNamePath} id={lastNamePath} />
              <div className="invalid-feedback">
                <ErrorMessage name={lastNamePath} />
              </div>
            </div>
          </div>
        </div>
        <div className="form-row">
          <div className="col-sm-12">
            <div className="form-group">
              <label htmlFor={bioPath}>Bio</label>
              <Field component="textarea" className="form-control" placeholder="I am a blank at blank working mostly with...." name={bioPath} id={bioPath} />
            </div>
          </div>
        </div>
        <div className="form-row">
          <div className="col-sm-12 col-md-6">
            <div className="form-group">
              <label htmlFor={titlePath}>Title</label>
              <Field className="form-control" placeholder="Lead Doer of Stuff" name={titlePath} id={titlePath} />
            </div>
          </div>
          <div className="col-sm-12 col-md-6">
            <div className="form-group">
              <label htmlFor={companyPath}>Company</label>
              <Field className="form-control" placeholder="Some Startup" name={companyPath} id={companyPath} />
            </div>
          </div>
        </div>
        <div className="form-row">
          <div className="col-sm-12 col-md-6">
            <div className="form-group">
              <label htmlFor={phoneNumberPath}>Phone Number</label>
              <Field type="phone" className="form-control" placeholder="715-123-4567" name={phoneNumberPath} id={phoneNumberPath} />
            </div>
          </div>
          <div className="col-sm-12 col-md-6">
            <div className="form-group">
              <label htmlFor={emailPath}>Email</label>
              <Field type="email" className="form-control" placeholder="email@gmail.com" name={emailPath} id={emailPath} />
            </div>
          </div>
        </div>
        <div className="form-row">
          <div className="col-sm-12 ">
            <div className="d-flex justify-content-end">
              <button className="btn btn-outline-primary" type="button" onClick={() => arrayHelpers.remove(index)}>Remove Presenter</button>
            </div>
          </div>
        </div>
      </React.Fragment>
    )

    function getValidationClass(path: string): string | void {
      if (getIn(touched, path.split('.'))) {
        if (getIn(errors, path.split('.'))) {
          return 'is-invalid';
        } else {
          return 'is-valid'
        }
      }
    }

    function isInvalid(path: string): boolean {
      return getIn(touched, path.split('.')) && getIn(errors, path.split('.'))
    }
  }

  private buildEmptySession(): Session {
    return {
      interestedInOpenLab: OpenLabInterests.MAYBE,
      title: '',
      summary: '',
      acknowledgedTerms: false,
      targetLevel: SessionLevels[100],
      presenters: [
        this.buildEmptyPresenter()
      ],
      tags: ['']
    };
  }

  private buildEmptyPresenter(): Presenter {
    return {
      firstName: '',
      lastName: '',
      email: '',
      bio: '',
      title: '',
      company: '',
      phoneNumber: ''
    };
  }
}