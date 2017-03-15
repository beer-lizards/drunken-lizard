import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';
import { connect } from 'react-redux';
import { grey200 } from 'material-ui/styles/colors';
import { replace } from 'react-router-redux';
import bunyan from 'bunyan';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import React from 'react';
import TextField from 'material-ui/TextField';

import * as authActions from '../../common/auth/actions';

const log = bunyan.createLogger({ name: 'lizard' });

const styles = {
  paper: {
    backgroundColor: `${grey200}`,
    display: 'inline-block',
    height: 100,
    margin: 'auto, 20',
    width: 400,
  },
};

class SignUp extends React.Component {

  static propTypes = {
    auth: React.PropTypes.object.isRequired,
    location: React.PropTypes.object.isRequired,
    login: React.PropTypes.func.isRequired,
    msg: React.PropTypes.object.isRequired,
    replace: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  async onFormSubmit(e) {
    e.preventDefault();
    const { login, fields } = this.props;
    const result = await login(fields.$values());
    log.info(`signup result - ${result}`);
    this.redirectAfterSignUp();
  }

  handleChange = (event, value) => this.setState({ [event.target.name]: value });

  redirectAfterSignUp() {
    const { location, replace } = this.props;
    const nextPathname = location.state && (location.state.nextPathname || '/');
    replace(nextPathname);
  }

  render() {
    const { auth, msg } = this.props;

    return (
      <Paper style={styles.paper} zDepth={0}>
        <form onSubmit={this.onFormSubmit} disabled={auth.formDisabled}>
          <Card>
            <CardTitle title={msg.title} />
            <CardText>
              <TextField
                floatingLabelText={msg.labels.email}
                fullWidth
                hintText={msg.placeholders.email}
                onChange={this.handleChange}
                type="email"
              />

              <TextField
                floatingLabelText={msg.labels.password}
                fullWidth
                hintText={msg.placeholders.password}
                onChange={this.handleChange}
                type="password"
              />
            </CardText>
            <CardActions>
              <RaisedButton
                label={msg.buttons.register}
                type="submit"
              />
            </CardActions>
          </Card>
        </form>
      </Paper>
    );
  }

}

export default connect(state => ({
  auth: state.auth,
  msg: state.intl.msg.signup,
}), { ...authActions, replace })(SignUp);
