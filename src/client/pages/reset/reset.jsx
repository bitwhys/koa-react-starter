import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, Redirect } from 'react-router-dom';

import { routes } from 'routes';

import * as userActions from 'resources/user/user.actions';

import AuthLayout from 'layouts/auth';

import Input from 'components/input';
import Button from 'components/button';

import styles from './reset.pcss';

function Reset() {
  const dispatch = useDispatch();
  const history = useHistory();

  const searchParams = new URLSearchParams(window.location.search);
  const token = searchParams.get('token');

  const [pending, setPending] = React.useState(false);
  const [errors, setErrors] = React.useState({}); 

  const [password, setPassword] = React.useState('');

  async function sumbit(event) {
    event.preventDefault();

    try {
      setPending(true);
      await dispatch(userActions.reset({ password, token }));
      history.push(routes.home.path);
    } catch (error) {
      setErrors(error.data.errors);
    } finally {
      setPending(false);
    }
  }

  if (!token) {
    return (
      <Redirect to={routes.notFound.url()} />
    );
  }

  return (
    <AuthLayout>
      <form
        onSubmit={sumbit}
        noValidate
        className={styles.container}
      >
        <h1 className={styles.title}>
          Reset Password
        </h1>
        <p className={styles.description}>
          Please choose your new password
        </p>
        <div className={styles.row}>
          <Input
            type="password"
            value={password}
            onChange={setPassword}
            errors={errors.password}
            placeholder="New Password"
            disabled={pending}
          />
        </div>
        <div className={styles.row}>
          <Button
            type="submit"
            color="green"
            disabled={pending || !password}
          >
            Save New Password
          </Button>
        </div>
      </form>
    </AuthLayout>
  );
}

export default React.memo(Reset);
