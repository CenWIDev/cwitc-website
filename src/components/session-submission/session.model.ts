import { Presenter } from './presenter.model';
import { SessionLevel } from './session-level.enum';

export class Session {
    public presenters: Presenter[]
    public title: string;
    public summary: string;
    public targetLevel: SessionLevel;
    public acknowledgedTerms: boolean;
}