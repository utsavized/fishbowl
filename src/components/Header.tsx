import * as React from 'react';
import { Link } from 'react-router-dom';

export default class Header extends React.Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-toggleable-md navbar-light bg-faded">
                    <Link className="nav-link" to="/">Home</Link>
                </nav>
            </div>
        );
    }
}