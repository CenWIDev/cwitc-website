import React, { Component, ReactNode } from 'react';
import { graphql, StaticQuery } from 'gatsby';
import { Session } from './session.model';
import { Presenter } from './presenter.model';
import { SessionLevels } from './session-level.enum';
import { SessionCategories } from './session-categories';
import { Formik, FieldArray, Field, ArrayHelpers, ErrorMessage, FormikErrors, FormikTouched, getIn } from 'formik';
import { sessionSchema } from './session-schema';
import base from './../../services/firebase';
import { AuthService } from './../../services/authentication'
import { NavigationConfirm } from '../navigation-confirm/navigationConfirm';
import RichText from './../richText/richText';

type SessionSubmissionState = {
    session: Session;
    validSubmission: boolean;
    submissionError?: string;
};

export default class SessionSubmission extends Component {

    private defaultState: SessionSubmissionState = {
        session: this.buildEmptySession(),
        validSubmission: false,
        submissionError: undefined
    };

    public state: SessionSubmissionState = this.defaultState;

    public resetForm(): void {
        const defaultStateCopy = {...this.defaultState };
        defaultStateCopy.session.presenters = this.state.session.presenters;
        this.setState({...defaultStateCopy});
    }

    public showNavigationConfirmation(touched: any): boolean {
        return !this.state.validSubmission && touched && Object.keys(touched).length > 0;
    }

    public render(): ReactNode {
        return (
            <StaticQuery
                query={ submitSessionQuery }
                render={ ({ global, content }) => this.renderForm(global.currentYear, content) } />
        );
    }

    public renderForm(currentYear: string, { title, termsAndConditionsAgreement, submissionConfirmation }: any): ReactNode {
        return (
            <div className="container">
                {
                    this.state.validSubmission ?
                        <>
                            <div className="row justify-content-center">
                                <div className="col-12 col-md-10 mt-5">
                                    <RichText richText={ submissionConfirmation.json } />
                                </div>
                            </div>
                            <div className="row justify-content-center">
                                <div className="col-12 col-md-10 mt-5">
                                    <button className="btn btn-primary" onClick={() => this.resetForm()}>Submit Another Session</button>
                                </div>
                            </div>
                        </> :
                        <>
                            <h1 className="mt-5">{ title }</h1>
                            <hr />
                            <Formik
                                initialValues={this.state.session}
                                validationSchema={sessionSchema}
                                onSubmit={async (values, { setSubmitting }) => {
                                    try {
                                        // only allow alphanumeric characters and spaces in the path
                                        const scrubbedTitle: string = values.title.replace(/[^A-Za-z0-9 ]/g, '');

                                        (values as any).thisDoesntBelong = 'i dont belong here';

                                        await base.post(
                                            `${currentYear}/${ AuthService.getUser().userId }/submitted-sessions/${ scrubbedTitle }`, {
                                                data: values
                                            });

                                        this.setState({
                                            ...this.state,
                                            session: values,
                                            validSubmission: true
                                        });
                                    } catch (error) {
                                        // tslint:disable-next-line:no-console
                                        console.error(error);

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
                                    return (
                                        <form onSubmit={handleSubmit}>
                                            {
                                                this.showNavigationConfirmation(touched) ? <NavigationConfirm /> : null
                                            }
                                            <FieldArray
                                                name="presenters"
                                                render={(arrayHelpers: ArrayHelpers) => (
                                                    <>
                                                        {values.presenters && values.presenters.length > 0 ? (
                                                            values.presenters.map((presenter, index) => this.renderPresenterForm(index, arrayHelpers, errors, touched, values.presenters.length > 1, index === values.presenters.length - 1))
                                                        ) : undefined}
                                                        <div className="form-row mt-3">
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
                                            <div className="row">
                                                <div className="col-md-4"><h2>Session Information</h2></div>
                                                <div className="col-md-8">
                                                    <div className="form-row">
                                                        <div className="col-sm-12">
                                                            <div className="form-group">
                                                                <label htmlFor="title">Session Title</label>
                                                                <Field
                                                                    className={`form-control ${getValidationClass('title')}`}
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
                                                                    rows="10"
                                                                    placeholder="Provide at least 100 characters to describe your session"
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
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label className="d-block">Category</label>
                                                                <Field name="category" component="select" className={`custom-select ${getValidationClass('category')}`}>
                                                                    <option value="null">Select a Category</option>
                                                                    {SessionCategories.map((category) => (
                                                                        <option key={category} value={category}>{category}</option>
                                                                    ))}
                                                                </Field>
                                                                <div style={{ display: 'block' }} className="invalid-feedback">
                                                                    <ErrorMessage name="category" />
                                                                </div>
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
                                                </div>
                                            </div>
                                            <hr/>
                                            <div className="row">
                                                <div className="col-md-4"><h2>Terms Agreement</h2></div>
                                                <div className="col-md-8">
                                                    <div className={`form-row form-group ${getValidationClass('acknowledgedTerms')}`}>
                                                        <div className="col-sm-12">
                                                            <label>
                                                                <RichText richText={ termsAndConditionsAgreement.json } />
                                                            </label>
                                                        </div>
                                                        <div className="col-sm-12 d-flex align-items-center flex-column">
                                                            <div className="form-check form-check-inline w-100">
                                                                {/* tslint:disable-next-line:jsx-boolean-value */}
                                                                <Field type="checkbox" className="form-check-input" name="acknowledgedTerms" defaultChecked={values.acknowledgedTerms === true} id={`acknowledgedTerms${true}`} />
                                                                <label className="form-check-label" htmlFor={`acknowledgedTerms${true}`}>Yes, I agree</label>
                                                            </div>
                                                            <div className="invalid-feedback d-block">
                                                                <ErrorMessage name="acknowledgedTerms" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="row">
                                                <div className="col d-flex justify-content-end">
                                                    <button className="btn btn-success" type="submit" disabled={isSubmitting}>
                                                        {isSubmitting ?
                                                            <div className="spinner-border" role="status">
                                                                <span className="sr-only">Loading...</span>
                                                            </div> :
                                                            'Submit Talk for Review'}
                                                    </button>
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
        touched: FormikTouched<Session>,
        enableRemove: boolean,
        isLast: boolean): any {
        const firstNamePath: string = `presenters.${index}.firstName`;
        const lastNamePath: string = `presenters.${index}.lastName`;
        const bioPath: string = `presenters.${index}.bio`;
        const titlePath: string = `presenters.${index}.title`;
        const companyPath: string = `presenters.${index}.company`;
        const phoneNumberPath: string = `presenters.${index}.phoneNumber`;
        const emailPath: string = `presenters.${index}.email`;

        return (
            <React.Fragment key={index}>
                <div className="row">
                    <div className="col-md-4">
                        <h2>{ index === 0 ? 'Speaker Information' : 'Co-Speaker Information' }</h2>
                    </div>
                    <div className="col-md-8">
                        <div className="form-row">
                            <div className="col-sm-12 col-md-6">
                                <div className="form-group">
                                    <label htmlFor={firstNamePath}>First Name</label>
                                    <Field
                                        className={`form-control ${getValidationClass(firstNamePath)}`}
                                        name={firstNamePath} id={firstNamePath} />
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
                                        name={lastNamePath} id={lastNamePath} />
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
                                        placeholder="A short description about yourself"
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
                                        name={titlePath} id={titlePath} />
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
                                        name={companyPath} id={companyPath} />
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
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col d-flex justify-content-end">
                        {
                            isLast ?
                                <button className="btn btn-outline-secondary" type="button" onClick={() => arrayHelpers.push(this.buildEmptyPresenter())}>Add Additional Speaker</button> : null
                        }
                        {
                            enableRemove ?
                                <button className="btn btn-outline-primary ml-3" type="button" onClick={() => arrayHelpers.remove(index)}>Remove Presenter</button> : null
                        }
                    </div>
                </div>
                <hr />
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
            title: '',
            summary: '',
            acknowledgedTerms: false,
            targetLevel: SessionLevels.UNSELECTED,
            category: '',
            presenters: [
                this.buildEmptyPresenter()
            ]
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
        global: contentfulGlobalSiteSettings {
            currentYear: conferenceStartDateTime(formatString: "YYYY")
        }
        content: contentfulSubmitSessionPageLayout {
            title
            termsAndConditionsAgreement {
                json
            }
            submissionConfirmation {
                json
            }
        }
    }
`;