import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Component } from 'react';
import classes from './error-boundary.module.scss';

export class ErrorBoundary extends Component {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    constructor(props) {
        super(props);
        this.state = { error: '' };
    }

    componentDidCatch(error: { name: any; message: any }) {
        this.setState({ error: `${error.name}: ${error.message}` });
    }

    render() {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        const { error } = this.state;
        if (error) {
            return (
                <div className={classes.container}>
                    <FontAwesomeIcon icon={faExclamationTriangle} />
                    <h1>Unexpected Error</h1>
                    <p>
                        Please contact me at itay@lisaey.com with more details.
                    </p>
                </div>
            );
        } else {
            return <>{this.props.children}</>;
        }
    }
}
