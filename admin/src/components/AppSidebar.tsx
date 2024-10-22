import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react';
import CIcon from '@coreui/icons-react';

import { AppSidebarNav } from './AppSidebarNav';

import { logoNegative } from '../assets/brand/logo-negative';
import { sygnet } from '../assets/brand/sygnet';

import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

import navigation from '../_nav';
import { NavLink } from 'react-router-dom';

interface RootState {
  sidebarUnfoldable: boolean;
  sidebarShow: boolean;
}

const AppSidebar: React.FC = () => {
  const dispatch = useDispatch();
  const unfoldable = useSelector((state: RootState) => state.sidebarUnfoldable);
  const sidebarShow = useSelector((state: RootState) => state.sidebarShow);

  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible: boolean) => {
        dispatch({ type: 'set', sidebarShow: visible });
      }}
    >
      <NavLink to="/">
      <CSidebarBrand className="d-none d-md-flex">
        <CIcon className="sidebar-brand-full" icon={logoNegative} height={35} />
        <CIcon className="sidebar-brand-narrow" icon={sygnet} height={35} />
      </CSidebarBrand>
      </NavLink>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={navigation} />
        </SimpleBar>
      </CSidebarNav>
      {/* <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
      /> */}
    </CSidebar>
  );
}

export default React.memo(AppSidebar);
