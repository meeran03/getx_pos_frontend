import { Avatar } from '@material-ui/core'
import {
  CreateNewFolderOutlined,
  MoneySharp,
  MoneyTwoTone,
  Storefront,
} from '@material-ui/icons'
import DirectionsBike from '@material-ui/icons/DirectionsBike'
import Store from '@material-ui/icons/Store'
import React from 'react'
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  LineChart,
  Line,
  ResponsiveContainer,
  text,
  PieChart,
  Pie,
  Cell,
} from 'recharts'

import MilkShopImage from '../../assets/img/milkshop.png'

const year = [
  {
    earned: 150000,
    year: 2021,
    data: [
      {
        name: 'January',
        sales: 2400,
        revenue: "15K",
        cancelled: 100,
        complains: 20
      },
      {
        name: 'February',
        sales: 1398,
        revenue: "15K",
        cancelled: 100,
        complains: 20
      },
      {
        name: 'March',
        sales: 9800,
        revenue: "15K",
        cancelled: 100,
        complains: 20
      },
      {
        name: 'April',
        sales: 3908,
        revenue: "15K",
        cancelled: 100,
        complains: 20
      },
      {
        name: 'May',
        sales: 4800,
        revenue: "15K",
        cancelled: 100,
        complains: 20
      },
      {
        name: 'June',
        sales: 3800,
        revenue: "15K",
        cancelled: 100,
        complains: 20
      },
      {
        name: 'July',
        sales: 4300,
        revenue: "15K",
        cancelled: 100,
        complains: 20
      },
      {
        name: 'August',
        sales: 4300,
        revenue: "15K",
        cancelled: 100,
        complains: 20
      },
      {
        name: 'September',
        sales: 4300,
        revenue: "15K",
        cancelled: 100,
        complains: 20
      },
      {
        name: 'October',
        sales: 4300,
        revenue: "15K",
        cancelled: 100,
        complains: 20
      },
      {
        name: 'November',
        sales: 4300,
        revenue: "15K",
        cancelled: 100,
        complains: 20
      },
      {
        name: 'December',
        sales: 4300,
        revenue: "15K",
        cancelled: 100,
        complains: 20
      },
    ]
  }]

const dataArea = [
  {
    name: 'Johar Town',

  },
  {
    name: 'Iqbal Town',
    sales: 1398,
  },
  {
    name: 'Judicial Colony',
    sales: 9800,
  },
  {
    name: 'Shahdra',
    sales: 3908,
  },
  {
    name: 'Faisal Town',
    sales: 4800,
  },
  {
    name: 'Model Town',
    sales: 3800,
  },
  {
    name: 'Wapda Town',
    sales: 2300,
  },
  {
    name: 'Defense',
    sales: 1335,
  },
  {
    name: 'Pak Arab',
    sales: 1300,
  },
  {
    name: 'Ichra',
    sales: 1700,
  },
  {
    name: 'Anarkali',
    sales: 1300,
  },
  {
    name: 'Muslim Town',
    sales: 300,
  },
]

const storeData = [
  {
    name: 'January',
    sales: 1298,
    storeName: 'J Block',
    revenue: '128K'
  },
  {
    name: 'February',
    sales: 1398,
    storeName: 'J2 Block',
    revenue: '128K'
  },
  {
    name: 'March',
    sales: 9800,
    storeName: 'Q Block',
    revenue: '128K'
  },
  {
    name: 'April',
    sales: 3908,
    storeName: 'Q Block',
    revenue: '128K'
  },
  {
    name: 'May',
    sales: 4800,
    storeName: 'Q Block',
    revenue: '128K'
  },
  {
    name: 'June',
    sales: 3800,
    storeName: 'Q Block',
    revenue: '128K'
  },
  {
    name: 'July',
    sales: 4300,
    storeName: 'Q Block',
    revenue: '128K'
  },
  {
    name: 'August',
    sales: 4300,
    storeName: 'Q Block',
    revenue: '128K'
  },
  {
    name: 'September',
    sales: 4300,
    storeName: 'Q Block',
    revenue: '128K'
  },
  {
    name: 'October',
    sales: 4300,
    storeName: 'R Block',
    revenue: '128K'
  },
  {
    name: 'November',
    sales: 4300,
    storeName: 'L Block',
    revenue: '128K'
  },
  {
    name: 'December',
    sales: 4300,
    storeName: 'M Block',
    revenue: '128K'
  },
]

const productData = [
  {
    name: 'January',
    productSales: 2400,
    productName: 'Milk',
  },
  {
    name: 'February',
    productSales: 1398,
    productName: 'Bread',
  },
  {
    name: 'March',
    productSales: 9800,
    productName: 'Nestle Doodh',
  },
  {
    name: 'April',
    productSales: 3908,
    productName: 'Tumeric',
  },
  {
    name: 'May',
    productSales: 4800,
    productName: 'Potatos',
  },
  {
    name: 'June',
    productSales: 3800,
    productName: 'Icecream',
  },
  {
    name: 'July',
    productSales: 4300,
    productName: 'Getx Butter',
  },
  {
    name: 'August',
    productSales: 4300,
    productName: 'Black Powdered',
  },
  {
    name: 'September',
    productSales: 4300,
    productName: 'Red Chilli',
  },
  {
    name: 'October',
    productSales: 4300,
    productName: 'Doodhwala Milk',
  },
  {
    name: 'November',
    productSales: 210,
    productName: 'Blue Grapes',
  },
  {
    name: 'December',
    productSales: 3000,
    productName: 'Red Chilli',
  },
]

const deliverBoyInfo = [
  {
    name: 'January',
    delivered: 200,
    canceled: 7,
    person: 'Asif',
    revenue: '50K'
  },
  {
    name: 'February',
    delivered: 190,
    canceled: 8,
    person: 'Fakhar',
    revenue: '50K'
  },
  {
    name: 'March',
    delivered: 100,
    canceled: 9,
    person: 'Babar',
    revenue: '50K'
  },
  {
    name: 'April',
    delivered: 97,
    canceled: 10,
    person: 'Shoaib',
    revenue: '50K'
  },
  {
    name: 'May',
    delivered: 56,
    canceled: 11,
    person: 'Malik',
    revenue: '50K'
  },
  {
    name: 'June',
    delivered: 110,
    canceled: 10,
    person: 'Hafeez',
    revenue: '50K'
  },
  {
    name: 'July',
    delivered: 100,
    canceled: 12,
    person: 'Hasan',
    revenue: '50K'
  },
  {
    name: 'August',
    delivered: 130,
    canceled: 10,
    person: 'Awais',
    revenue: '50K'
  },
  {
    name: 'September',
    delivered: 100,
    canceled: 10,
    person: 'Subhan',
    revenue: '50K'
  },
  {
    name: 'October',
    delivered: 100,
    canceled: 10,
    person: 'Meeran',
    revenue: '50K'
  },
  {
    name: 'November',
    delivered: 210,
    canceled: 10,
    person: 'Farooq',
    revenue: '50K'
  },
  {
    name: 'December',
    delivered: 150,
    canceled: 10,
    person: 'Awais',
    revenue: '50K'
  },
]
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

const RADIAN = Math.PI / 180

class CustomizedLabel extends React.PureComponent {
  render() {
    const { x, y, stroke, value } = this.props

    return (
      <text x={x} y={y} dy={-4} fill={stroke} fontSize={10} textAnchor="middle">
        {value}
      </text>
    )
  }
}

function Analytics() {

  const [activeSale, setActiveSale] = React.useState(year[0].data)

  const [salesYear, setSalesYear] = React.useState(2021)

  const [activeRider, setActiveRider] = React.useState(deliverBoyInfo[0]);
  const [activeStore, setActiveStore] = React.useState(storeData[0]);
  return (
    <div class="container mx-auto">

      <div class="grid grid-flow-row grid-cols-3 gap-4">
        <div class="col-span-2 shadow-lg p-4 bg-white rounded">
          <p class="text-lg py-2 font-serif font-semibold ">Sales Per Month</p>
          <div class="form-control w-1/3 ">
            <label class="label">
              <span class="label-text">Select Year</span>
            </label>
            <input type="number" min="1900" max="2099" step="1" value={salesYear} onChange={e => setSalesYear(e.target.value)} class="input input-sm" />
          </div>
          {year.find(it => it.year == salesYear) && <BarChart onMouseMove={e => e.activePayload && setActiveSale(e.activePayload[0].payload)} width={650} height={280} data={year.find(it => it.year == salesYear).data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            {/* <Legend /> */}
            <Bar dataKey="sales" fill="#8884d8" />
          </BarChart>}

          {year.find(it => it.year == salesYear) && <div className="container" >
            <p class="text-gray-900 text-4xl font-extrabold" >{activeSale.name}, {salesYear}</p>
            <ul class="p-4" >
              <li className="flex flex-row justify-between items-center">Sales : <span>{activeSale.sales}</span></li>
              <li className="flex flex-row justify-between items-center">Revenue : <span>{activeSale.revenue}</span></li>
              <li className="flex flex-row justify-between items-center">Cancelled Purchases : <span>{activeSale.cancelled}</span></li>
              <li className="flex flex-row justify-between items-center">Complains : <span>{activeSale.complains}</span></li>
            </ul>
          </div>}
        </div>
        <div class="col-span-1">
          <div class="grid grid-rows-3 gap-4">
            <div class="row-span-1 p-4 shadow-lg bg-white rounded">
              <p className="text-4xl font-extrabold text-primary">Rs.{year.find(it => it.year == salesYear) && year.find(it => it.year == salesYear).earned}</p>
              Earned This Year
            </div>
            {/* <div class="row-span-2 p-4 shadow-2xl bg-white rounded">
              <p class="text-lg py-2 font-serif font-semibold ">
                Average Store Earning
              </p>
              <LineChart width={300} height={200} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="sales" stroke="#8884d8" />
              </LineChart>
            </div> */}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 my-2">
        <div class="col-span-1 shadow-2xl rounded p-4 bg-white ">
          <Storefront /> Best Performing Store
          <BarChart onMouseMove={e => e.activePayload && setActiveStore(e.activePayload[0].payload)} width={300} height={250} data={storeData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="sales" fill="#8884d8" />
            <Bar dataKey="storeName" fill="#82ca9d" />
          </BarChart>

          {year.find(it => it.year == salesYear) && <div className="container" >
            <p class="text-gray-900 text-4xl font-extrabold" >{activeStore.name}, {salesYear}</p>
            <ul class="p-4" >
              <li className="flex flex-row justify-between items-center">Name : <span>{activeStore.storeName}</span></li>
              <li className="flex flex-row justify-between items-center">Sales : <span>{activeStore.sales}</span></li>
              <li className="flex flex-row justify-between items-center">Revenue : <span>{activeStore.revenue}</span></li>
            </ul>
          </div>}
        </div>

        <div class="col-span-1 shadow-2xl rounded p-4 bg-white ">
          <CreateNewFolderOutlined /> Best Performing Product
          <LineChart width={300} height={250} data={productData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="productName" stroke="#8884d8" />
            <Line type="monotone" dataKey="productSales" stroke="#82ca9d" />
          </LineChart>
        </div>

        <div class="col-span-1 shadow-2xl rounded p-4 bg-white ">
          <Store /> Store of the Month
          <div className="justify-center flex items-center">
            <img src={MilkShopImage} width="150" height="150" />
          </div>
          <div class="stat">
            <div class="stat-figure text-primary">JT Branch</div>
            <div class="stat-title">Total Sales This Month</div>
            <div class="stat-value text-primary">25.6K</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 my-2">
        <div class="col-span-2 shadow-2xl rounded p-4 bg-white ">
          <DirectionsBike /> Best Performing Delivery Boy
          <LineChart onMouseMove={e => e.activePayload && setActiveRider(e.activePayload[0].payload)} width={600} height={350} data={deliverBoyInfo}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" height={60} />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="delivered"
              stroke="#8884d8"
              label={<CustomizedLabel />}
            />
            <Line type="monotone" dataKey="canceled" stroke="red" />
            <Line type="monotone" dataKey="person" stroke="#82ca9d" />
          </LineChart>

          <div className="container" >
            <p class="text-gray-900 text-4xl font-extrabold" >{activeRider.name}, {salesYear}</p>
            <ul class="p-4" >
              <li className="flex flex-row justify-between items-center">Name : <span>{activeRider.person}</span></li>
              <li className="flex flex-row justify-between items-center">Revenue : <span>{activeRider.revenue}</span></li>
              <li className="flex flex-row justify-between items-center">Cancelled Purchases : <span>{activeRider.canceled}</span></li>
              <li className="flex flex-row justify-between items-center">Delivered : <span>{activeRider.delivered}</span></li>
            </ul>
          </div>
        </div>

        <div class="col-span-1 shadow-2xl rounded p-4 bg-white ">
          <MoneySharp /> Sales Distribution By Area
          <div class="flex items-center justify-center">
            <PieChart
              class="flex items-center justify-center"
              width={300}
              height={400}
            >
              <Pie
                data={dataArea}
                dataKey="sales"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={120}
                fill="#8884d8"
              >
                {year[0].data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics
