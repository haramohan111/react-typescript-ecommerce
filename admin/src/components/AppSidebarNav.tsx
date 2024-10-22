import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { CBadge } from '@coreui/react';

interface Badge {
  color: string;
  text: string;
}

interface NavItem {
  component: React.ElementType;
  name: string;
  to?: string;
  icon?: React.ReactNode;
  badge?: Badge;
  items?: NavItem[];
}

interface AppSidebarNavProps {
  items: NavItem[];
}

export const AppSidebarNav: React.FC<AppSidebarNavProps> = ({ items }) => {
  const location = useLocation();
  
  const navLink = (name: string, icon?: React.ReactNode, badge?: Badge) => {
    return (
      <>
        {icon && icon}
        {name && name}
        {badge && (
          <CBadge color={badge.color} className="ms-auto">
            {badge.text}
          </CBadge>
        )}
      </>
    );
  };

  const navItem = (item: NavItem, index: number) => {
    const { component, name, badge, icon, ...rest } = item;
    const Component = component;
    return (
      <Component
        {...(rest.to && !rest.items && { component: NavLink })}
        key={index}
        {...rest}
      >
        {navLink(name, icon, badge)}
      </Component>
    );
  };

  const navGroup = (item: NavItem, index: number) => {
    const { component, name, icon, to, ...rest } = item;
    const Component = component;
    return (
      <Component
        idx={String(index)}
        key={index}
        toggler={navLink(name, icon)}
        visible={location.pathname.startsWith(to || '')}
        {...rest}
      >
        {item.items?.map((subItem, subIndex) =>
          subItem.items ? navGroup(subItem, subIndex) : navItem(subItem, subIndex)
        )}
      </Component>
    );
  };

  return (
    <React.Fragment>
      {items && items.map((item, index) => 
        item.items ? navGroup(item, index) : navItem(item, index)
      )}
    </React.Fragment>
  );
};
