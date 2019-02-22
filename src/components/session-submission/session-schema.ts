import * as Yup from 'yup';

export const sessionSchema = Yup.object().shape({
    interestedInOpenLab: Yup
        .string()
        .required()
        .label('Open Lab Interest'),
    title: Yup
        .string()
        .required()
        .max(50)
        .label('Session Title'),
    summary: Yup
        .string()
        .required()
        .min(100)
        .max(3000)
        .label('Session Summary'),
    targetLevel: Yup
        .string()
        .required()
        .label('Target Level'),
    acknowledgedTerms: Yup
        .boolean()
        .required('You must acknowledge our terms.'),
    presenters: Yup
        .array(Yup.object().shape({
            firstName: Yup
                .string()
                .required()
                .max(50)
                .label('Presenter First Name'),
            lastName: Yup
                .string()
                .required()
                .max(50)
                .label('Presenter Last Name'),
            bio: Yup
                .string()
                .required()
                .max(1000)
                .label('Presenter Bio'),
            title: Yup
                .string()
                .required()
                .max(50)
                .label('Presenter Title'),
            company: Yup
                .string()
                .required()
                .max(50)
                .label('Presenter Company'),
            phoneNumber: Yup
                .string()
                .required()
                .min(7)
                .max(15)
                .label('Presenter Phone Number'),
            email: Yup
                .string()
                .email()
                .required()
                .max(150)
                .label('Presenter Email'),
        }))
        .min(1, 'You must include at least one presenter')
        .max(4, 'Only up to four presenters are allowed for one session')
});
