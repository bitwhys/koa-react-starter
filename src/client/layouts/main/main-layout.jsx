import React from 'react';
import PropTypes from 'prop-types';

import Toast from 'components/toast';

import Header from './header';
import Footer from './footer';

import styles from './main-layout.pcss';


function MainLayout(props) {
  return (
    <div className={styles.page}>
      <Header />

      <div className={styles.main}>
        <div className={styles.content}>
          {props.children}
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
