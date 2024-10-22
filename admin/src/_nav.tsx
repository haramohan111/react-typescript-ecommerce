import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'
interface NavBadge {
  color: string;
  text: string;
}

interface NavItemBase {
  component: React.ElementType;
  name: string;
  icon?: React.ReactNode;
  badge?: NavBadge;
  items?: NavItem[];
}

interface NavItemWithTo extends NavItemBase {
  to: string;
}

type NavItem = NavItemWithTo | NavItemBase;
const _nav: NavItem[] = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavGroup,
    name: 'category',
    to: '/category',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Add Category',
        to: '/category/addcategory',
      },
      {
        component: CNavItem,
        name: 'Manage Category',
        to: '/category/managecategory',
      },

    ],
  },
  {
    component: CNavGroup,
    name: 'Subcategory',
    to: '/subcategory',
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Add Subcategory',
        to: '/subcategory/addsubcategory',
      },
      {
        component: CNavItem,
        name: 'Manage Subcategory',
        to: '/subcategory/managesubcategory',
      },

    ],
  },
  {
    component: CNavGroup,
    name: 'List Subcategory',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Add List subcategory',
        to: '/listsubcategory/addlistsubcategory',
      },
      {
        component: CNavItem,
        name: 'Manage Listsubcategory',
        to: '/listsubcategory/managelistsubcategory',
      },

    ],
  },

  {
    component: CNavGroup,
    name: 'Products',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Add Product',
        to: '/products/addproducts',
        badge: {
          color: 'success',
          text: 'NEW',
        },
      },
      {
        component: CNavItem,
        name: 'Manage Product',
        to: '/products/manageproducts',
      },

    ],
  },
  {
    component: CNavGroup,
    name: 'Order',
    icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Manage Order',
        to: '/order/manageorder',
      }
    ]
  },

  {
    component: CNavGroup,
    name: 'Size',
    to: '/size',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Add Size',
        to: '/size/addsize',
      },
      {
        component: CNavItem,
        name: 'Manage Size',
        to: '/size/managesize',
      },

    ],
  },
  {
    component: CNavGroup,
    name: 'Brand',
    to: '/brand',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Add Brand',
        to: '/brand/addbrand',
      },
      {
        component: CNavItem,
        name: 'Manage Brand',
        to: '/brand/managebrand',
      },

    ],
  },
  {
    component: CNavGroup,
    name: 'Color',
    to: '/color',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Add Color',
        to: '/color/addcolor',
      },
      {
        component: CNavItem,
        name: 'Manage Color',
        to: '/color/managecolor',
      },

    ],
  },
  {
    component: CNavGroup,
    name: 'Seller',
    to: '/seller',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Add Seller',
        to: '/seller/addseller',
      },
      {
        component: CNavItem,
        name: 'Manage Seller',
        to: '/seller/manageseller',
      },

    ],
  },
  {
    component: CNavGroup,
    name: 'Delivery boy',
    to: '/delivery',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Add Deliveryboy',
        to: '/delivery/adddeliveryboy',
      },
      {
        component: CNavItem,
        name: 'Manage Deliveryboy',
        to: '/delivery/managedelivery',
      },

    ],
  },
  {
    component: CNavGroup,
    name: 'User',
    to: '/user',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Add User',
        to: '/user/adduser',
      },
      {
        component: CNavItem,
        name: 'Manage User',
        to: '/user/manageuser',
      },

    ],
  },

]

export default _nav
