import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import Toast from 'components/toast';

import styles from './auth-layout.pcss';

function AuthLayout(props) {
  return (
    <div className={cn(styles.page, props.className)}>
      {props.children}

      <Toast />
    </div>
  );
}

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

AuthLayout.defaultProps = {
  className: null,
};

export default React.memo(AuthLayout);
