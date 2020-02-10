import React from 'react';
import PropTypes from 'prop-types';

import * as socketService from 'services/socket.service';

import Toast from 'components/toast';

import Header from './header';
import Footer from './footer';

import styles from './main-layout.pcss';


function MainLayout({ children }) {
  React.useEffect(() => {
    if (socketService.disconnected()) socketService.connect();
  }, []);

  return (
    <div className={styles.page}>
      <Header />

      <div className={styles.main}>
        <div className={styles.content}>
          {children}
        </div>
      </div>

      <Footer />

      <Toast />
    </div>
  );
}

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default React.memo(MainLayout);
