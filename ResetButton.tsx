import React, { Component } from 'react';
import { Button } from '@mui/material';

class ResetButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMessage: '',
            successMessage: '',
        };
    }

    handleReset = () => {
        const { sessionId } = this.props;
        const requestUrl = `https://localhost:7013/api/sessions/reset-session?sessionId=${encodeURIComponent(sessionId)}`;

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        };

        fetch(requestUrl, requestOptions)
            .then(async response => {
                // Check for response status
                if (!response.ok) {
                    const errorText = await response.text(); // Get error text if response is not ok
                    throw new Error(errorText || 'Error resetting session');
                }

                // Process JSON response
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();

                this.setState({ successMessage: 'Session reset successfully!' });
                alert('Session reset successfully!');
            })
            .catch(error => {
                this.setState({ errorMessage: error.toString() });
                console.error('Error resetting session:', error);
                alert(`Error resetting session: ${error.message || error}`);
            });
    };

    render() {
        return (
            <Button
                variant="contained"
                color="secondary"
                onClick={this.handleReset}
            >
                Reset a Call
            </Button>
        );
    }
}

export default ResetButton;
