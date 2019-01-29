import React, { Component, ReactNode } from 'react';
import AuthService, { User } from '../../services/auth'
import { Session } from './session.model';
import { Presenter } from './presenter.model';
import { SessionLevels } from './session-level.enum';
import { OpenLabInterests } from './open-lab-interest.enum';

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
            <>
                <h1>Submit Session</h1>
                <form>
                    <div className="row">
                        {
                            this.state.session.presenters.map((presenter: Presenter, i: number) => (
                                <React.Fragment key={i}>
                                    <div className="col-sm-12 col-lg-6">
                                        <label>
                                            <span className="input-label">First Name</span>
                                            <input name="firstName" onChange={(e) => this.handlePresenterChange(e, i)} value={presenter.firstName} type="text" placeholder="First Name" />
                                        </label>
                                    </div>
                                    <div className="col-sm-12 col-lg-6">
                                        <label>
                                            <span className="input-label">Last Name</span>
                                            <input name="lastName" onChange={(e) => this.handlePresenterChange(e, i)} value={presenter.lastName} type="text" placeholder="Last Name" />
                                        </label>
                                    </div>
                                    <div className="col-sm-12 col-lg-6">
                                        <label>
                                            <span className="input-label">Bio</span>
                                            <textarea name="bio" onChange={(e) => this.handlePresenterChange(e, i)} value={presenter.bio} placeholder="Speaker Bio" />
                                        </label>
                                    </div>
                                    <div className="col-sm-12 col-lg-6">
                                        <label>
                                            <span className="input-label">Job Title</span>
                                            <input name="title" onChange={(e) => this.handlePresenterChange(e, i)} value={presenter.title} type="text" placeholder="Title" />
                                        </label>
                                    </div>
                                    <div className="col-sm-12 col-lg-6">
                                        <label>
                                            <span className="input-label">Company</span>
                                            <input name="company" onChange={(e) => this.handlePresenterChange(e, i)} value={presenter.company} type="text" placeholder="Company" />
                                        </label>
                                    </div>
                                    <div className="col-sm-12 col-lg-6">
                                        <label>
                                            <span className="input-label">Phone Number</span>
                                            <input name="phoneNumber" onChange={(e) => this.handlePresenterChange(e, i)} value={presenter.phoneNumber} type="text" placeholder="Phone Number" />
                                        </label>
                                    </div>
                                    <div className="col-sm-12 col-lg-6">
                                        <label>
                                            <span className="input-label">Email</span>
                                            <input name="email" onChange={(e) => this.handlePresenterChange(e, i)} value={presenter.email} type="text" placeholder="Email" />
                                        </label>
                                    </div>
                                </React.Fragment>
                            ))
                        }
                        <div className="col-sm-12 col-lg-6">
                            <button className="btn btn-outline-primary" onClick={(e) => this.onAddPresenter(e)}>Add Presenter</button>
                        </div>
                    </div>
                    <input name="interestedInOpenLab" onChange={this.handleChange} value={this.state.session.interestedInOpenLab} type="checkbox" />
                    <input name="title" onChange={this.handleChange} value={this.state.session.title} type="text" placeholder="Session Title" />
                    <input name="tags" onChange={this.handleTagsChange} value={this.state.session.tags.join(',')} type="text" placeholder="JavaScript, React, SASS" />
                </form>
            </>
        );
    }

    public onAddPresenter(e: React.MouseEvent): void {
        const updatedSession: Session = {
            ...this.state.session
        };

        updatedSession.presenters.push(this.buildEmptyPresenter());

        this.setState({
            session: updatedSession
        });
        e.preventDefault();
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