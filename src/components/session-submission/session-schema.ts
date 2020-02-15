import * as Yup from 'yup';

export const sessionSchema = Yup.object().shape({
    title: Yup
        .string()
        .required()
        .max(100)
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
        .oneOf([true], 'You must acknowledge our terms.')
        .required('You must acknowledge our terms.'),
    notes: Yup
        .string()
        .max(3000)
        .label('Additional Notes or Comments'),
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
                .min(10)
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
