import { Presenter } from './presenter.model';
import { OpenLabInterest } from './open-lab-interest.enum';
import { SessionLevel } from './session-level.enum';

export class Session {
    public presenters: Presenter[]
    public interestedInOpenLab?: OpenLabInterest;
    public title: string;
    public summary: string;
    public targetLevel: SessionLevel;
    public tags: string[];
    public acknowledgedTerms: boolean;
}