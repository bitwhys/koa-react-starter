import React from 'react';
import { Link } from 'react-router-dom';
import { FaBell } from 'react-icons/fa';

import { routes } from 'routes';
import Logo from 'static/images/logo.svg';

import Menu from './components/menu';
import Search from './components/search';
import UserMenu from './components/user-menu';
import styles from './header.styles';


const Header = () => {
  return (
    <div className={styles.header}>
      <Link className={styles.title} to={routes.home.url()}>
        <Logo />
      </Link>

      <Menu className={styles.menuList} />
      <Search className={styles.search} />

      <FaBell size={20} className={styles.notificationsBtn} />

      <UserMenu />
    </div>
  );
};

export default Header;
