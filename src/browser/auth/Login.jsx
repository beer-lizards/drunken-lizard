import React from 'react';
import {
   Card,
   CardActions,
   CardTitle,
   CardText,
} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import { grey200 } from 'material-ui/styles/colors';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';

import * as authActions from '../../common/auth/actions';
import { fields } from '../../common/lib/redux-fields';
import { focusInvalidField } from '../../common/lib/validation';

const styles = {
  paper: {
    backgroundColor: `${grey200}`,
    display: 'inline-block',
    height: 100,
    margin: 'auto, 20',
    textAlign: 'center',
    width: 400,
  },
};

class Login extends React.Component {

  static propTypes = {
    auth: React.PropTypes.object.isRequired,
    fields: React.PropTypes.object.isRequired,
    location: React.PropTypes.object.isRequired,
    login: React.PropTypes.func.isRequired,
    msg: React.PropTypes.object.isRequired,
    replace: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    // Read why we bind event handlers explicitly.
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  async onFormSubmit(e) {
    e.preventDefault();
    const { login, fields } = this.props;
    const result = await login(fields.$values());
    if (result.error) {
      focusInvalidField(this, result.payload);
      return;
    }
    this.redirectAfterLogin();
  }

  handleChange = (event, value) => this.setState({ [event.target.name]: value });

  redirectAfterLogin() {
    const { location, replace } = this.props;
    const nextPathname = location.state && (location.state.nextPathname || '/');
    replace(nextPathname);
  }

  render() {
    const { auth, fields, msg } = this.props;

    return (
      <Paper style={styles.paper} zDepth={0}>
        <form onSubmit={this.onFormSubmit} disabled={auth.formDisabled}>
          <Card>
            <CardTitle title="Login" />
            <CardText>
              <TextField
                floatingLabelText="Email"
                fullWidth
                hintText={msg.placeholder.email}
                name="email"
                onChange={this.handleChange}
                type="email"
                {...fields.email}
              />

              <TextField
                floatingLabelText="Password"
                fullWidth
                hintText={msg.placeholder.password}
                name="password"
                onChange={this.handleChange}
                type="password"
                {...fields.password}
              />
            </CardText>
            <CardActions>
              <RaisedButton
                label={msg.button.login}
                type="submit"
              />
              <RaisedButton label="Forgot Password" />
            </CardActions>
          </Card>
        </form>
      </Paper>
    );
  }

}

const login = fields(Login, {
  path: 'auth',
  fields: ['email', 'password'],
});

export default connect(state => ({
  auth: state.auth,
  msg: state.intl.msg.auth.form,
}), { ...authActions, replace })(login);
