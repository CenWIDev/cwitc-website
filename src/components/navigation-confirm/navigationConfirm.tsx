import { Component, ReactNode } from 'react';

type NavigationConfirmProps = {
    enable: boolean;
    message?: string;
};

export class NavigationConfirm extends Component {

    private beforeUnloadHandler: () => void = () => {
        return (this.props.message ? this.props.message : 'Are you sure you are ready to leave?');
    }

    public props: NavigationConfirmProps & any;

    constructor(props: any, context?: any) {
        super(props, context);
        window.onbeforeunload = this.beforeUnloadHandler;
    }

    public render(): ReactNode {
        return null;
    }

}