import React, { useEffect, useState } from 'react';
import base, { firebaseApp } from './../../services/firebase';

const Admin = () => {

    const [speakerCount, setSpeakerCount ] = useState<number>(0);
    const [sessions, setSessions] = useState<any[] | null>(null);

    useEffect(() => {
        async function getSubmittedSessions(): Promise<void> {
            try {
                const users = await base.fetch('2021', { context: { }, asArray: true });

                const allSessions = users
                    .reduce((acc, user) => {

                        const temp = Object.keys(user['submitted-sessions']).reduce(function (r, k) {
                            return r.concat(user['submitted-sessions'][k]);
                        }, []);


                        return acc?.concat(temp);
                    }, []);

                setSpeakerCount(users.length);
                setSessions(allSessions);
            }
            catch (err) {
                console.error('Error loading submitted sessions', err);
            }
        }

        // Wait until a user has been attached to the firebase app
        const unsubscribe = firebaseApp.auth()
            .onAuthStateChanged((user) => {
                if (user) {
                    getSubmittedSessions();
                }
            });

        // return to clean up subscription to onAuthStateChanged
        return unsubscribe;
    }, []);

    return (
        <div className="container">
            <h1 className="mt-3">2021 Submitted Sessions:</h1>
            { sessions && <h2 className="mb-3">{`${ sessions?.length } Sessions from ${ speakerCount } Speakers`}</h2> }
            {
                sessions && sessions.map((session) => (
                    <div className="card mb-3">
                        <div className="card-header d-flex justify-content-between">
                            <div>
                            <h5 className="card-title">{session.title}</h5>
                            {
                                session.presenters.map(presenter =>
                                    <div className="card-subtitle d-flex align-items-center mb-1">
                                        <h6 className="m-0 mr-2 text-muted">{presenter.firstName} {presenter.lastName}</h6>
                                        <a href={`mailto:${presenter.email}`}>{presenter.email}</a>
                                    </div>)
                            }
                            </div>
                            <div className="text-right">
                                <span>{session.category}</span><br/>
                                <span>{session.targetLevel}</span>
                            </div>
                        </div>
                        <div className="card-body">
                            <p className="card-text">{session.summary}</p>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default Admin;