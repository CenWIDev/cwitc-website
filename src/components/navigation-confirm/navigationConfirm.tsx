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

    public componentDidMount() {
        window.onbeforeunload = this.beforeUnloadHandler;
    }

    public componentWillUnmount() {
        window.onbeforeunload = null;
    }

    public render(): ReactNode {
        return null;
    }
}