/*eslint-disable*/
import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Icon from "@material-ui/core/Icon";
// core components
import AdminNavbarLinks from "components/Navbars/AdminNavbarLinks.js";
import RTLNavbarLinks from "components/Navbars/RTLNavbarLinks.js";

import styles from "assets/jss/material-dashboard-react/components/sidebarStyle.js";

const useStyles = makeStyles(styles);

export default function Sidebar(props) {
	const classes = useStyles();
	// verifies if routeName is the one active (in browser input)
	function activeRoute(routeName) {
		return window.location.href.indexOf(routeName) > -1 ? true : false;
	}
	const { color, logo, image, logoText, routes } = props;
	var links = (
		<ul className='menu flex flex-col p-4 pt-0 compact'>
			{/* <li class="mt-4 menu-title">
        <span>
            Users
        </span>
    </li> */}
			{routes.map((prop, key) => {
				let listItemClasses = classNames({
					["capitalize " + 'active nuxt-link-active']: activeRoute(prop.layout + prop.path)
				});
				return (

					<li className='my-2' >
						<NavLink
							to={prop.layout + prop.path}
							className={listItemClasses}
							// activeClassName="active nuxt-link-active"
							key={key}
						>
							{typeof prop.icon === "string" ? (
								<Icon
									className={'inline-block mr-2 stroke-current capitalize'}
								>
									{prop.icon}
								</Icon>
							) : (
								<prop.icon
									className={'inline-block mr-2 stroke-current capitalize'}
								/>
							)}
							{prop.name}
						</NavLink>
					</li>
				);
			})}
		</ul>
	);
	var brand = (
		<div
			class="sticky inset-x-0 top-0 z-50 hidden w-full py-1 transition duration-200 ease-in-out border-b lg:block border-base-200 bg-base-100">
			<div class="mx-auto space-x-1 navbar max-w-none">
				<div class="flex items-center flex-none">
					<div class="avatar">
						<div class="mb-8 rounded-btn w-14 h-14">
							<img src={logo} />
						</div>
					</div>
					<a href="#" aria-label="Homepage" class="items-center px-2 flex-0 btn btn-ghost md:px-4 nuxt-link-active">
						<div class="inline-block text-3xl font-title text-primary">
							<span class="lowercase">{logoText}</span>
						</div>
					</a>
				</div>
			</div>
		</div>
	);


	return (
		<div class="drawer-side"><label for="main-menu" class="drawer-overlay"></label>
			<aside class="flex flex-col justify-between border-r border-base-200 bg-base-100 text-base-content w-80">
				{brand}
				<div>

					{links}
					{/* <ul class="menu flex flex-col p-4 pt-2 compact">
					<li class="mt-4 menu-title">
						<span>
							Users
						</span>
					</li>


					<li>
						<a href="/web/customers" class="capitalize">
						<i class="fas fa-users inline-block mr-2 stroke-current" class="capitalize" ></i>	
							Customers
						</a>
					</li>

					<li>
						<a href="/web/stores" class="capitalize">
						<i class="fas fa-store-alt inline-block mr-2 stroke-current" class="capitalize" ></i>	
							Stores
						</a>
					</li>

					<li>
						<a href="/web/deliveryboys" class="capitalize">
						<i class="fas fa-biking inline-block mr-2 stroke-current" class="capitalize" ></i>	
							Delivery Boys
						</a>
					</li>
				</ul>
				<ul class="menu flex flex-col p-4 pt-0 compact">
					<li class="menu-title"><span>
							Components
						</span></li>
					<li class=""><a href="/web/banners" class="justify-between capitalize">
							Banners</a></li>
					<li class=""><a href="/web/products" class="justify-between capitalize">
							Products</a></li>
					<li class=""><a href="/web/orders" class="justify-between capitalize">
							Purchases</a></li>
					<li class="">
						<a href="/web/banners/stack" class="justify-between capitalize">
							stack
						<span class="lowercase badge badge-sm">new</span>
						</a>
					</li>
				</ul>


				<ul class="menu flex flex-col p-4 pt-0 compact">
					<li class="menu-title"><span>
							Categories
						</span></li>
					<li class=""><a href="/web/banners/alert" class="justify-between capitalize">
							Main Category</a></li>
					<li class=""><a href="/web/banners/artboard" class="justify-between capitalize">
							Sub Category</a></li>
				</ul>


				<ul class="menu flex flex-col p-4 pt-0 compact">
					<li class="menu-title"><span>
							Subscriptions
						</span></li>
					<li class=""><a href="/web/banners/alert" class="justify-between capitalize">
							All Subscriptions</a></li>
					<li class=""><a href="/web/banners/artboard" class="justify-between capitalize">
							Subscription Types</a></li>
				</ul>


				<ul class="menu flex flex-col p-4 pt-0 compact">
					<li class="menu-title"><span>
							Regions
						</span></li>
						<li class=""><a href="/web/banners/alert" class="justify-between capitalize">
							Cities</a></li>
						<li class=""><a href="/web/banners/alert" class="justify-between capitalize">
							Areas</a></li>
					<li class=""><a href="/web/banners/artboard" class="justify-between capitalize">
							Sub Areas</a></li>
				</ul>


				<ul class="menu flex flex-col p-4 pt-0 compact">
					<li class="mt-4 menu-title">
						<span>
							Services
						</span>
					</li>
					<li>
						<a href="/web/docs/install" class="capitalize">
						<i class="fas fa-headset inline-block mr-2 stroke-current" class="capitalize" ></i>	
							Customer Complains
						</a>
					</li>

					<li>
						<a href="/web/docs/install" class="capitalize">
						<i class="fas fa-bell inline-block mr-2 stroke-current" class="capitalize" ></i>	
							Send Notifications
						</a>
					</li>

					<li>
						<a href="/web/docs/install" class="capitalize">
						<i class="fas fa-credit-card inline-block mr-2 stroke-current" class="capitalize" ></i>	
							Credit requests
						</a>
					</li>
				</ul> */}

				</div>
			</aside>
		</div>
	);
}

Sidebar.propTypes = {
	rtlActive: PropTypes.bool,
	handleDrawerToggle: PropTypes.func,
	bgColor: PropTypes.oneOf(["purple", "blue", "green", "orange", "red"]),
	logo: PropTypes.string,
	image: PropTypes.string,
	logoText: PropTypes.string,
	routes: PropTypes.arrayOf(PropTypes.object),
	open: PropTypes.bool
};
