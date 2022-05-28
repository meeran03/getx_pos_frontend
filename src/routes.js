import Dashboard from '@material-ui/icons/Dashboard'
import Person from '@material-ui/icons/Person'
import CategoryIcon from '@material-ui/icons/Category'
import Notifications from '@material-ui/icons/Notifications'
import Home from '@material-ui/icons/Home'
import CustomerIcon from '@material-ui/icons/Group'
import RiderIcon from '@material-ui/icons/DirectionsBike'
// core components/views for Admin layout
import DashboardPage from 'views/Dashboard/Dashboard.js'
import UserProfile from 'views/UserProfile/UserProfile.js'
import ViewCarousel from '@material-ui/icons/ViewCarousel'
import Map from '@material-ui/icons/Map'
import Explore from '@material-ui/icons/Explore'
import SubdirectoryArrowRightIcon from '@material-ui/icons/SubdirectoryArrowRight'
import ShopIcon from '@material-ui/icons/Shop'
import ChatBubbleIcon from '@material-ui/icons/ChatBubble'
import CardMembershipSharpIcon from '@material-ui/icons/CardMembershipSharp'
import StoreMallDirectorySharpIcon from '@material-ui/icons/StoreMallDirectorySharp'
import BlockRoundedIcon from '@material-ui/icons/BlockRounded'
import ShoppingCartRoundedIcon from '@material-ui/icons/ShoppingCartRounded'
import AllInclusiveRoundedIcon from '@material-ui/icons/AllInclusiveRounded'

// Getx's Components
import Login from 'views/Auth/Login'
// import SendNotifications from 'views/SendNotifications/SendNotifications.js'
// //Stores
// import Stores from 'views/Stores/Stores'
// import ViewStore from 'views/Stores/ViewStore'
// import UpdateStore from 'views/Stores/UpdateStore'
//Customers
import Customers from 'views/Customers/Customers'
import ViewCustomer from 'views/Customers/ViewCustomer'
import UpdateCustomer from 'views/Customers/UpdateCustomer'
//Suppliers
import Suppliers from 'views/Supplier/Suppliers'
import ViewSupplier from 'views/Supplier/ViewSupplier'
import UpdateSupplier from 'views/Supplier/UpdateSupplier'
// //DeliveryBoys
// import DeliveryBoys from 'views/DeliveryBoys/DeliveryBoys'
// import ViewDeliveryBoy from 'views/DeliveryBoys/ViewDeliveryBoy'
// import UpdateDeliveryBoy from 'views/DeliveryBoys/UpdateDeliveryBoy'
//Categories
import Categories from 'views/Categories/Categories'
//Banners
import Roles from 'views/Roles/Roles'
//Areas
// import Areas from 'views/Areas/Areas'
//Subareas
// import Subareas from 'views/SubAreas/SubAreas'
// Products
import Products from 'views/Products/Products'
import AddProduct from 'views/Products/AddProduct'
import UpdateProduct from 'views/Products/UpdateProducts'
// Purchases
import Purchases from 'views/Purchases/Purchases'
import PurchaseDetail from 'views/Purchases/PurchaseDetail'
// //Complains
// import Complains from 'views/Complains/Complains'
// import ComplainDetail from 'views/Complains/ComplainDetail'
// //Credit
// import Credit from 'views/Credit/Credit'
//Unit
import Units from 'views/Units/Units'
//Discounts
import Discounts from 'views/Discounts/Discounts'
//Subscriptions
// import Subscriptions from 'views/Subscriptions/Subscriptions'
// import SubscriptionsDetail from 'views/Subscriptions/SubscriptionsDetail'
// //SubscriptionTypes
// import SubscriptionTypes from 'views/SubscriptionTypes/SubscriptionTypes'

//CancelledPurchases
// import CancelledPurchases from 'views/CancelledPurchases/CancelledPurchases'
import { AcUnitOutlined, AndroidSharp, ContactSupportOutlined, MeetingRoomTwoTone, MoneyOffOutlined } from '@material-ui/icons'
import Analytics from 'views/Analytics'
import AddPurchase from 'views/Purchases/AddPurchase'

const dashboardRoutes = [
  {
    path: '/',
    name: 'Dashboard',
    rtlName: 'لوحة القيادة',
    icon: Dashboard,
    component: DashboardPage,
    layout: '/admin',
  },
  {
    path: '/analytics',
    name: 'Analytics',
    icon: AndroidSharp,
    component: Analytics,
    layout: '/admin',
  },
  {
    path: '/roles',
    name: 'Roles',
    icon: MeetingRoomTwoTone,
    component: Roles,
    layout: '/admin',
  },
  // {
  //   path: '/areas',
  //   name: 'Areas',
  //   icon: Map,
  //   component: Areas,
  //   layout: '/admin',
  // },
  // {
  //   path: '/subareas',
  //   name: 'Subareas',
  //   icon: Explore,
  //   component: Subareas,
  //   layout: '/admin',
  // },
  {
    path: '/categories',
    name: 'Categories',
    icon: CategoryIcon,
    component: Categories,
    layout: '/admin',
  },
  {
    path: '/units',
    name: 'Units',
    icon: AcUnitOutlined,
    component: Units,
    layout: '/admin',
  },
  {
    path: '/discounts',
    name: 'Discounts',
    icon: AcUnitOutlined,
    component: Discounts,
    layout: '/admin',
  },
  {
    path: '/products',
    name: 'Products',
    icon: ShopIcon,
    component: Products,
    layout: '/admin',
  },
  // {
  //   path: '/credit-requests',
  //   name: 'Credit Requests',
  //   icon: MoneyOffOutlined,
  //   component: Credit,
  //   layout: '/admin',
  // },
  {
    path: '/products/add',
    name: 'Add Product',
    icon: CustomerIcon,
    component: AddProduct,
    layout: '/admin',
    invisible: true,
  },
  {
    path: '/products/update/:id',
    name: 'Update Product',
    icon: CustomerIcon,
    component: UpdateProduct,
    layout: '/admin',
    invisible: true,
  },
  {
    path: '/customers',
    name: 'Customers',
    icon: CustomerIcon,
    component: Customers,
    layout: '/admin',
  },
  {
    path: '/customers/update/:id',
    name: 'Update Customer',
    icon: RiderIcon,
    component: UpdateCustomer,
    layout: '/admin',
    invisible: true,
  },
  {
    path: '/customers/:id',
    name: 'View Customer',
    icon: RiderIcon,
    component: ViewCustomer,
    layout: '/admin',
    invisible: true,
  },
  {
    path: '/suppliers',
    name: 'Suppliers',
    icon: ContactSupportOutlined,
    component: Suppliers,
    layout: '/admin',
  },
  {
    path: '/suppliers/update/:id',
    name: 'Update Supplier',
    icon: RiderIcon,
    component: UpdateSupplier,
    layout: '/admin',
    invisible: true,
  },
  {
    path: '/suppliers/:id',
    name: 'View Supplier',
    icon: RiderIcon,
    component: ViewSupplier,
    layout: '/admin',
    invisible: true,
  },
  // {
  //   path: '/stores',
  //   name: 'Stores',
  //   icon: StoreMallDirectorySharpIcon,
  //   component: Stores,
  //   layout: '/admin',
  // },
  // {
  //   path: '/stores/update/:id',
  //   name: 'Update Store',
  //   icon: StoreMallDirectorySharpIcon,
  //   component: UpdateStore,
  //   layout: '/admin',
  //   invisible: true,
  // },
  // {
  //   path: '/deliveryboys',
  //   name: 'Delivery Boys',
  //   icon: RiderIcon,
  //   component: DeliveryBoys,
  //   layout: '/admin',
  // },
  // {
  //   path: '/stores/:id',
  //   name: 'View Store',
  //   icon: StoreMallDirectorySharpIcon,
  //   component: ViewStore,
  //   layout: '/admin',
  //   invisible: true,
  // },
  // {
  //   path: '/deliveryboys/update/:id',
  //   name: 'Update Delivery Boy',
  //   icon: RiderIcon,
  //   component: UpdateDeliveryBoy,
  //   layout: '/admin',
  //   invisible: true,
  // },
  // {
  //   path: '/deliveryboys/:id',
  //   name: 'View Delivery Boy',
  //   icon: RiderIcon,
  //   component: ViewDeliveryBoy,
  //   layout: '/admin',
  //   invisible: true,
  // },
  {
    path: '/purchases',
    name: 'Purchases',
    icon: ShoppingCartRoundedIcon,
    component: Purchases,
    layout: '/admin',
  },
  // {
  //   path: '/cancelled-purchases',
  //   name: 'Cancelled Purchases',
  //   icon: BlockRoundedIcon,
  //   component: CancelledPurchases,
  //   layout: '/admin',
  // },
  {
    path: '/purchases/add',
    name: 'Add Purchase Order',
    icon: ShoppingCartRoundedIcon,
    component: AddPurchase,
    layout: '/admin',
    invisible: true,
  },
  {
    path: '/purchases/view/:id',
    name: 'View Purchase Detail',
    icon: ShoppingCartRoundedIcon,
    component: PurchaseDetail,
    layout: '/admin',
    invisible: true,
  },
  // {
  //   path: '/subscriptions',
  //   name: 'Subscriptions',
  //   icon: CardMembershipSharpIcon,
  //   component: Subscriptions,
  //   layout: '/admin',
  // },
  // {
  //   path: '/subscriptions/:id',
  //   name: 'View Subscription Detail',
  //   icon: CardMembershipSharpIcon,
  //   component: SubscriptionsDetail,
  //   layout: '/admin',
  //   invisible: true,
  // },
  // {
  //   path: '/subscription-types',
  //   name: 'SubscriptionTypes',
  //   icon: AllInclusiveRoundedIcon,
  //   component: SubscriptionTypes,
  //   layout: '/admin',
  // },
  // {
  //   path: '/send-notifications',
  //   name: 'Send Notifications',
  //   icon: Notifications,
  //   component: SendNotifications,
  //   layout: '/admin',
  // },
  // {
  //   path: '/complains',
  //   name: 'See Customer Complains',
  //   icon: ChatBubbleIcon,
  //   component: Complains,
  //   layout: '/admin',
  // },
  // {
  //   path: '/complains/:id',
  //   name: 'Complain Detail',
  //   icon: ChatBubbleIcon,
  //   component: ComplainDetail,
  //   layout: '/admin',
  //   invisible: true,
  // },
]

export default dashboardRoutes
