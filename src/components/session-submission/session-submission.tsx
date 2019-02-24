import React, { Component, ReactNode } from 'react';
import { graphql, StaticQuery } from 'gatsby';
import { Session } from './session.model';
import { Presenter } from './presenter.model';
import { SessionLevels } from './session-level.enum';
import { OpenLabInterests } from './open-lab-interest.enum';
import { Formik, FieldArray, Field, ArrayHelpers, ErrorMessage, FormikErrors, FormikTouched, getIn } from 'formik';
import { sessionSchema } from './session-schema';
import { WithContext as ReactTags } from 'react-tag-input';
import base from './../../services/firebase';
import { AuthService } from './../../services/authentication'

const KeyCodes = {
    comma: 188,
    enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];
type SessionSubmissionState = {
    session: Session;
    validSubmission: boolean;
    formTouched: boolean;
    submissionError?: string;
};

export default class SessionSubmission extends Component {

    constructor(props: any, context?: any) {
      super(props, context);
      window.onbeforeunload = () => {
          return this.state && this.state.formTouched ? 'Are you sure you are ready to leave?' : undefined;
      }
    }

    public state: SessionSubmissionState = {
        session: this.buildEmptySession(),
        validSubmission: false,
        formTouched: false,
        submissionError: undefined
    };

    public render(): ReactNode {
        return (
            <StaticQuery
                query={ submitSessionQuery }
                render={ ({ content }) => this.renderForm(content) } />
        );
    }

    public renderForm({ title, termsAndConditionsAgreement, submissionConfirmation }: any): ReactNode {
        return (
            <div className="container">
                {
                    this.state.validSubmission ?
                        <div className="row justify-content-center">
                            <div className="col-12 col-md-10 mt-5" dangerouslySetInnerHTML={{ __html: submissionConfirmation.childContentfulRichText.html }} />
                        </div> :
                        <>
                            <h1>{ title }</h1>
                            <Formik
                                initialValues={this.state.session}
                                validationSchema={sessionSchema}
                                onSubmit={async (values, { setSubmitting }) => {
                                    try {
                                        await base.post(
                                            `2019/${AuthService.getUser().userId}/submitted-sessions/${values.title}`, {
                                                data: values
                                            });
                                        this.setState({
                                            ...this.state,
                                            validSubmission: true
                                        });
                                    } catch (error) {
                                        this.setState({
                                            ...this.state,
                                            submissionError: 'There was an error trying to submit your session. Please try again.'
                                        });
                                    } finally {
                                        setSubmitting(false);
                                    }
                                }}
                            >
                                {({
                                    values,
                                    errors,
                                    touched,
                                    handleSubmit,
                                    isSubmitting,
                                    setFieldValue
                                }) => {
                                    if (touched !== this.state.formTouched) {
                                      this.setState({
                                        ...this.state,
                                        formTouched: touched
                                      });
                                    }

                                    return (
                                        <form onSubmit={handleSubmit}>
                                            <FieldArray
                                                name="presenters"
                                                render={(arrayHelpers: ArrayHelpers) => (
                                                    <>
                                                        {values.presenters && values.presenters.length > 0 ? (
                                                            values.presenters.map((presenter, index) => this.renderPresenterForm(index, arrayHelpers, errors, touched))
                                                        ) : undefined}
                                                        <div className="form-row mt-3">
                                                            {
                                                                (values.presenters && values.presenters.length < 4) ?
                                                                    <div className="col-sm-12 ">
                                                                        <div className="d-flex justify-content-end">
                                                                            <button className="btn btn-outline-secondary" type="button" onClick={() => arrayHelpers.push(this.buildEmptyPresenter())}>Add Presenter</button>
                                                                        </div>
                                                                    </div> :
                                                                    undefined
                                                            }
                                                            {
                                                                (errors && typeof errors.presenters === 'string') ?
                                                                    <div className="col-sm-12 ">
                                                                        <div className="d-flex justify-content-center">
                                                                            <div style={{ display: 'block' }} className="invalid-feedback">
                                                                                <ErrorMessage name="presenters" />
                                                                            </div>
                                                                        </div>
                                                                    </div> :
                                                                    undefined
                                                            }
                                                        </div>
                                                    </>
                                                )}
                                            />
                                            <div className="form-row mt-5">
                                                <div className="col-sm-12 col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="title">Session Title</label>
                                                        <Field
                                                            className={`form-control ${getValidationClass('title')}`}
                                                            placeholder="How To Do Amazing Things"
                                                            name="title" id="title" />
                                                        <div className="invalid-feedback">
                                                            <ErrorMessage name="title" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-sm-12">
                                                    <div className="form-group">
                                                        <label htmlFor="summary">Summary</label>
                                                        <Field
                                                            className={`form-control ${getValidationClass('summary')}`}
                                                            component="textarea"
                                                            placeholder="I will be talking about how to blank with blank"
                                                            name="summary" id="summary" />
                                                        <div className="invalid-feedback">
                                                            <ErrorMessage name="summary" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-row">
                                                <div className="col-md-6">
                                                    <div className={`form-group ${getValidationClass('targetLevel')}`} >
                                                        <label className="d-block">Target Level</label>
                                                        {['100', '200', '300', '400'].map((level) => (
                                                            <div key={level} className="form-check form-check-inline">
                                                                <Field type="radio" className="form-check-input" name="targetLevel" defaultChecked={values.targetLevel === level} id={`targetLevel${level}`} value={level} />
                                                                <label className="form-check-label" htmlFor={`targetLevel${level}`}>{level}</label>
                                                            </div>
                                                        ))}
                                                        <div style={{ display: 'block' }} className="invalid-feedback">
                                                            <ErrorMessage name="targetLevel" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-sm-12 col-md-6">
                                                    <div className={`form-group ${getValidationClass('interestedInOpenLab')}`} >
                                                        <label className="d-block">Are you interested in hosting an Open Lab?</label>
                                                        {['Yes', 'No', 'Maybe'].map((interestOption) => (
                                                            <div key={interestOption} className="form-check form-check-inline">
                                                                <Field type="radio" className="form-check-input" name="interestedInOpenLab" defaultChecked={values.interestedInOpenLab === interestOption} id={`interestedInOpenLab${interestOption}`} value={interestOption} />
                                                                <label className="form-check-label" htmlFor={`interestedInOpenLab${interestOption}`}>{interestOption}</label>
                                                            </div>
                                                        ))}
                                                        <div style={{ display: 'block' }} className="invalid-feedback">
                                                            <ErrorMessage name="interestedInOpenLab" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-sm-12 col-md-6">
                                                    <div className="form-group">
                                                        <label htmlFor="tags">Session Tags</label>
                                                        <ReactTags
                                                            inline
                                                            id="tags"
                                                            tags={values.tags}
                                                            suggestions={[]}
                                                            classNames={{
                                                                tag: 'btn btn-primary btn-sm mr-1 mb-2',
                                                                remove: 'ml-2',
                                                                tagInputField: 'form-control'
                                                            }}
                                                            delimiters={delimiters}
                                                            handleAddition={(tag) => setFieldValue('tags', [...values.tags, tag])}
                                                            handleDelete={(i) => setFieldValue('tags', values.tags.filter((tag, index) => index !== i))} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-row">
                                                <div className="col-sm-12">
                                                    <div className="form-group">
                                                        <label htmlFor="summary">Additional Notes or Comments</label>
                                                        <Field
                                                            className={`form-control ${getValidationClass('notes')}`}
                                                            component="textarea"
                                                            name="notes" id="notes" />
                                                        <div className="invalid-feedback">
                                                            <ErrorMessage name="notes" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={`form-row form-group ${getValidationClass('acknowledgedTerms')}`}>
                                                <div className="col-sm-12 col-md-6">
                                                    <label dangerouslySetInnerHTML={{ __html: termsAndConditionsAgreement.childContentfulRichText.html}} />
                                                </div>
                                                <div className="col-sm-12 col-md-6 d-flex align-items-center">
                                                    <div className="row w-100 no-gutters">
                                                        <div className="col-6 d-flex flex-column justify-content-center">
                                                            <div className="form-check form-check-inline w-50">
                                                                {/* tslint:disable-next-line:jsx-boolean-value */}
                                                                <Field type="checkbox" className="form-check-input" name="acknowledgedTerms" defaultChecked={values.acknowledgedTerms === true} id={`acknowledgedTerms${true}`} />
                                                                <label className="form-check-label" htmlFor={`acknowledgedTerms${true}`}>Yes, I agree</label>
                                                            </div>
                                                            <div className="invalid-feedback d-block">
                                                                <ErrorMessage name="acknowledgedTerms" />
                                                            </div>
                                                        </div>
                                                        <div className="col-6 d-flex justify-content-end">
                                                            <button className="btn btn-secondary" type="submit" disabled={isSubmitting}>
                                                                {isSubmitting ?
                                                                    <div className="spinner-border" role="status">
                                                                        <span className="sr-only">Loading...</span>
                                                                    </div> :
                                                                    'Submit Talk for Review'}
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-row mt-3">
                                                <div className="col-sm-12 ">
                                                    <div className="d-flex justify-content-center invalid-feedback">
                                                        { this.state.submissionError }
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    );
                                    function getValidationClass(path: string): string | void {
                                        if (getIn(touched, path.split('.'))) {
                                            if (getIn(errors, path.split('.'))) {
                                                return 'is-invalid';
                                            } else {
                                                return 'is-valid'
                                            }
                                        }
                                    }
                                }
                                }
                            </Formik>
                        </>
                }
            </div>
        );
    }

    public renderPresenterForm(
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
                            <Field
                                className={`form-control ${getValidationClass(bioPath)}`}
                                placeholder="I am a blank at blank working mostly with...."
                                component="textarea" name={bioPath} id={bioPath} />
                            <div className="invalid-feedback">
                                <ErrorMessage name={bioPath} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form-row">
                    <div className="col-sm-12 col-md-6">
                        <div className="form-group">
                            <label htmlFor={titlePath}>Title</label>
                            <Field
                                className={`form-control ${getValidationClass(titlePath)}`}
                                placeholder="Lead Doer of Stuff" name={titlePath} id={titlePath} />
                            <div className="invalid-feedback">
                                <ErrorMessage name={titlePath} />
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-6">
                        <div className="form-group">
                            <label htmlFor={companyPath}>Company</label>
                            <Field
                                className={`form-control ${getValidationClass(companyPath)}`}
                                placeholder="Some Startup" name={companyPath} id={companyPath} />
                            <div className="invalid-feedback">
                                <ErrorMessage name={companyPath} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form-row">
                    <div className="col-sm-12 col-md-6">
                        <div className="form-group">
                            <label htmlFor={phoneNumberPath}>Phone Number</label>
                            <Field
                                className={`form-control ${getValidationClass(phoneNumberPath)}`}
                                type="phone" placeholder="715-123-4567" name={phoneNumberPath} id={phoneNumberPath} />
                            <div className="invalid-feedback">
                                <ErrorMessage name={phoneNumberPath} />
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-6">
                        <div className="form-group">
                            <label htmlFor={emailPath}>Email</label>
                            <Field
                                className={`form-control ${getValidationClass(emailPath)}`}
                                type="email" placeholder="email@gmail.com" name={emailPath} id={emailPath} />
                            <div className="invalid-feedback">
                                <ErrorMessage name={emailPath} />
                            </div>
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
    }

    private buildEmptySession(): Session {
        return {
            interestedInOpenLab: OpenLabInterests.UNSELECTED,
            title: '',
            summary: '',
            acknowledgedTerms: false,
            targetLevel: SessionLevels.UNSELECTED,
            presenters: [
                this.buildEmptyPresenter()
            ],
            tags: []
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

const submitSessionQuery = graphql`
    query SubmitSessionQuery {
        content: contentfulSubmitSessionPageLayout {
            title
            termsAndConditionsAgreement {
                childContentfulRichText {
                    html
                }
            }
            submissionConfirmation {
                childContentfulRichText {
                    html
                }
            }
        }
    }
`;