/**
 * Packages
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {
  /**
   * Render
   */
  renderContent() {
    console.log(this.props.auth);
    switch (this.props.auth) {
      // On attend la réponse d'axios
      case null:
        return;
      // Utilisateur pas connecté
      case false:
        return (
          <li>
            <a href="/auth/google/">Login With Google</a>
          </li>
        );
      // Utilisateur connecté
      default:
        return (
          <li>
            <a href="/api/logout">Logout</a>
          </li>
        );
    }
  }

  render() {
    const { auth } = this.props;
    return (
      <nav>
        <div className="nav-wrapper light-blue darken-2">
          <Link to={auth ? '/surveys' : '/'} className="left brand-logo">
            Emaily
          </Link>
          <ul className="right hide-on-med-and-down">{this.renderContent()}</ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps({ auth }) {
  return {
    auth
  };
}

export default connect(mapStateToProps)(Header);
