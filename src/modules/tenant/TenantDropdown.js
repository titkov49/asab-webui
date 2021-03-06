import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
	UncontrolledDropdown,
	Dropdown,
	DropdownItem,
	DropdownMenu, 
	DropdownToggle,
	Nav, NavItem, NavLink
} from 'reactstrap';

import {
	AppAsideToggler,
	AppHeaderDropdown,
	AppNavbarBrand,
	AppSidebarToggler
} from '@coreui/react';

import {types} from './actions';

class TenantDropdown extends Component {

	constructor(props) {
		super(props);

		this.TenantService = props.app.locateService("TenantService");

		this.state = {
			tenantDropdownOpen: false
		}

		this.toggleTenantDropdown = this.toggleTenantDropdown.bind(this);
		this.changeTenant = this.changeTenant.bind(this);
	}

	toggleTenantDropdown() {
		this.setState(prevState => ({
			tenantDropdownOpen: !prevState.tenantDropdownOpen
		}));
	}

	changeTenant(id){
		this.props.changeTenant(id);
	}

	render() {
		return (
			<UncontrolledDropdown direction="down" className="pr-3">
				<DropdownToggle nav caret>
					<i className="cil-apps pr-2"></i>
					<TenantLabel tenant={this.props.current}/>
				</DropdownToggle>
				{ (this.props.tenants && this.props.tenants.length > 0) ?
					<DropdownMenu right
						modifiers={{
							setMaxHeight: {
								enabled: true,
								order: 890,
								fn: (data) => {
									return {
										...data,
										styles: {
											...data.styles,
											overflow: 'auto',
											maxHeight: '400px',
										},
									};
								},
							},
						}}
					>
						<DropdownItem header>Tenants</DropdownItem>
						{this.props.tenants.map((tenant, i) => (
							<DropdownItem key={i} tag="a" href={'?tenant='+tenant._id+'#/'}>
								<TenantLabel tenant={tenant}/>
							</DropdownItem>
						))}
					</DropdownMenu>
				 : null}
			</UncontrolledDropdown>
		);
	}
}


class TenantLabel extends Component {

	render() {
		return (
			<React.Fragment>{this.props.tenant._id}</React.Fragment>
		);
	}
}


const mapStateToProps = state => {
	return {
		current: state.tenant.current,
		tenants: state.tenant.tenants,
	};
};

export default connect(
	mapStateToProps,
	null
)(TenantDropdown);
