import React from 'react';
import SimpleBar from 'simplebar-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBook,
  faBoxOpen,
  faChartPie,
  faCog,
  faFileAlt,
  faHandHoldingUsd,
  faSignOutAlt,
  faTable,
  faTimes,
  faCalendarAlt,
  faMapPin,
  faInbox,
  faRocket,
} from '@fortawesome/free-solid-svg-icons';
import {
  Nav,
  Badge,
  Image,
  Button,
  Dropdown,
  Accordion,
  Navbar,
} from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';

const Sidebar = (props = {}) => {
  const NavItem = (props) => {
    const { title, link, icon } = props;

    return (
      <Nav.Item className='d-flex justify-content-start align-items-center justify-content-between p-1'>
        <span>
          {icon ? (
            <span className='sidebar-icon pe-1'>
              <FontAwesomeIcon icon={icon} />{' '}
            </span>
          ) : null}
          <span className='sidebar-text'>{title}</span>
        </span>
      </Nav.Item>
    );
  };

  return (
    <>
      <SimpleBar className={'collapse sidebar d-sm-block bg-primary text-white'}>
        <div className='sidebar-inner px-4 pt-3'>
          <Nav className='flex-column pt-3 pt-md-0'>
            <NavItem title='Kafka Monitor' />
            <Dropdown.Divider className='my-3 border-white' />
            <NavItem title='Overview' icon={faChartPie} />
            <NavItem title='Consumer' icon={faInbox} />
            <NavItem title='Producer' icon={faHandHoldingUsd} />
            <NavItem title='Topics' icon={faCog} />
            <NavItem title='Zookeeper' icon={faCalendarAlt} />
            <NavItem title='Host' icon={faCalendarAlt} />
          </Nav>
        </div>
      </SimpleBar>
    </>
  );
};

export default Sidebar;
