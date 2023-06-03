import { BsFillCalendar2DateFill, BsGrid3X3 } from 'react-icons/bs';
import {
  FaChartBar,
  FaUsers,
  FaCalendarAlt,
  FaMoneyBill,
  FaSuitcase,
  FaMoneyCheckAlt,
  FaPlus,
  FaMoneyBillWave,
  FaUserFriends,
  FaFileInvoice,
  FaFlag,
  FaTasks,
  FaTag,
  FaBuilding,
} from 'react-icons/fa';
import { FcComboChart } from 'react-icons/fc';
import { IoMdAdd } from 'react-icons/io';
import { MdAddShoppingCart, MdFlightTakeoff, MdGroup } from 'react-icons/md';
import { TbBeach } from 'react-icons/tb';
import { VscSignOut } from 'react-icons/vsc';

const departmentLinks = [
  {
    name: 'Show all',
    link: 'dashboard/department',
    icon: <FcComboChart />,
  },
  {
    name: 'Create new specialization',
    link: 'dashboard/add-new-department',
    icon: <IoMdAdd />,
  },
  {
    name: 'The job site',
    link: 'dashboard/department-the-job-site',
    icon: <BsGrid3X3 />,
  },
];
const employeeLinks = [
  {
    name: 'Show all',
    link: 'dashboard/employees',
    icon: <FcComboChart />,
  },
  {
    name: 'Create new employee',
    link: 'dashboard/add-new-employee',
    icon: <IoMdAdd />,
  },
];
const vacationLinks = [
  {
    name: 'Show all',
    link: 'dashboard/vacation',
    icon: <FcComboChart />,
  },
  {
    name: 'Create new vacation',
    link: 'dashboard/add-new-vacation',
    icon: <IoMdAdd />,
  },
];
const leaveLinks = [
  {
    name: 'Show all',
    link: 'dashboard/leaving',
    icon: <FcComboChart />,
  },
  {
    name: 'Create new leaving',
    link: 'dashboard/add-new-leaving',
    icon: <IoMdAdd />,
  },
];
const expenseLinks = [
  {
    name: 'Show all',
    link: 'dashboard/expense',
    icon: <FcComboChart />,
  },
  {
    name: 'Create new expense',
    link: 'dashboard/add-new-expense',
    icon: <IoMdAdd />,
  },
];
const holidayLinks = [
  {
    name: 'Show all',
    link: 'dashboard/holidays',
    icon: <FcComboChart />,
  },
  {
    name: 'Create new holiday',
    link: 'dashboard/add-new-holiday',
    icon: <IoMdAdd />,
  },
];
const OccuptionLinks = [
  {
    name: 'Show all',
    link: 'dashboard/occuptions',
    icon: <FcComboChart />,
  },
  {
    name: 'Create new occuptions',
    link: 'dashboard/add-new-occuption',
    icon: <IoMdAdd />,
  },
];
const customersLinks = [
  {
    name: 'Show all',
    link: 'dashboard/customers',
    icon: <FcComboChart />,
  },
  {
    name: 'Create new customer',
    link: 'dashboard/add-new-customer',
    icon: <IoMdAdd />,
  },
];
const salariesLinks = [
  {
    name: 'Show all',
    link: 'dashboard/salaries',
    icon: <FcComboChart />,
  },
  {
    name: 'Create new salaries',
    link: 'dashboard/add-new-salaries',
    icon: <IoMdAdd />,
  },
];
const invoicesLinks = [
  {
    name: 'Show all',
    link: 'dashboard/invoices',
    icon: <FcComboChart />,
  },
  {
    name: 'Create new invoices',
    link: 'dashboard/add-new-invoices',
    icon: <IoMdAdd />,
  },
];
const tasksLinks = [
  {
    name: 'Show all',
    link: 'dashboard/tasks',
    icon: <FcComboChart />,
  },
  {
    name: 'Create new task',
    link: 'dashboard/add-new-task',
    icon: <IoMdAdd />,
  },
];

export const navLinks = [
  {
    name: 'Add a Product',
    link: 'dashboard/add-product',
    icon: <FaPlus />,
  },
  {
    name: 'Add Tasks',
    children: tasksLinks,
    icon: <FaTasks />,
  },
  {
    name: 'Advances',
    link: 'dashboard/advances',
    icon: <FaMoneyCheckAlt />,
  },
  {
    name: 'Calendar',
    link: 'dashboard/calendar',
    icon: <FaCalendarAlt />,
  },
  {
    name: 'Customers',
    icon: <FaUserFriends />,
    children: customersLinks,
  },
  {
    name: 'Dashboard',
    link: '/dashboard',
    icon: <FaChartBar />,
  },
  {
    name: 'Department',
    icon: <FaBuilding />,
    children: departmentLinks,
  },
  {
    name: 'Departures',
    icon: <MdFlightTakeoff />,
    link: 'dashboard/departures',
  },
  {
    name: 'Employees',
    icon: <FaUsers />,
    children: employeeLinks,
  },
  {
    name: 'Expense',
    icon: <FaMoneyBill />,
    children: expenseLinks,
  },
  {
    name: 'Holidays',
    icon: <TbBeach />,
    children: holidayLinks,
  },
  {
    name: 'Occuption',
    icon: <TbBeach />,
    children: OccuptionLinks,
  },
  {
    name: 'Invoices',
    icon: <FaFileInvoice />,
    children: invoicesLinks,
  },
  {
    name: 'Leave',
    icon: <VscSignOut />,
    children: leaveLinks,
  },
  {
    name: 'Mission',
    link: 'dashboard/mission',
    icon: <FaFlag />,
  },
  {
    name: 'New Order',
    link: 'dashboard/new-order',
    icon: <MdAddShoppingCart />,
  },
  {
    name: 'Price Offer',
    link: 'dashboard/price-offer',
    icon: <FaTag />,
  },
  {
    name: 'Salaries',
    icon: <FaMoneyBillWave />,
    children: salariesLinks,
  },
  {
    name: 'Vacation',
    icon: <FaSuitcase />,
    children: vacationLinks,
  },
  {
    name: 'Working Groups',
    link: 'dashboard/working-groups',
    icon: <MdGroup />,
  },
];
export const HolidaysColumns = [
  {
    field: 'rowNumber',
    headerName: '',
    renderCell: (params) => <div>{params.id}.</div>,
    sortable: false,
    filterable: false,
  },
  {
    field: 'holiday',
    headerName: 'Holiday day',
    flex: 1,
    headerClassName: 'datagrid-header',
    cellClassName: 'datagrid-cell',
  },
  {
    field: 'type',
    headerName: 'Holiday type',
    flex: 1,
    headerClassName: 'datagrid-header',
    cellClassName: 'datagrid-cell',
  },
  {
    field: 'startDate',
    headerName: 'Start date',
    flex: 1,
    headerClassName: 'datagrid-header',
    cellClassName: 'datagrid-cell',
  },
  {
    field: 'endDate',
    headerName: 'End date',
    flex: 1,
    headerClassName: 'datagrid-header',
    cellClassName: 'datagrid-cell',
  },
  {
    field: 'days',
    headerName: 'Numbers of days',
    flex: 1,
    headerClassName: 'datagrid-header',
    cellClassName: 'datagrid-cell',
  },
];
export const HolidaysRows = [
  {
    id: 1,
    holiday: 'Christmas',
    type: 'Public',
    startDate: '2023-12-24',
    endDate: '2023-12-26',
    days: 3,
  },
  {
    id: 2,
    holiday: 'New Year',
    type: 'Public',
    startDate: '2023-12-31',
    endDate: '2024-01-01',
    days: 2,
  },
  {
    id: 3,
    holiday: 'New Year',
    type: 'Public',
    startDate: '2023-12-31',
    endDate: '2024-01-01',
    days: 2,
  },
  {
    id: 4,
    holiday: 'New Year',
    type: 'Public',
    startDate: '2023-12-31',
    endDate: '2024-01-01',
    days: 2,
  },
  {
    id: 5,
    holiday: 'New Year',
    type: 'Public',
    startDate: '2023-12-31',
    endDate: '2024-01-01',
    days: 2,
  },
  {
    id: 6,
    holiday: 'New Year',
    type: 'Public',
    startDate: '2023-12-31',
    endDate: '2024-01-01',
    days: 2,
  },
  {
    id: 7,
    holiday: 'New Year',
    type: 'Public',
    startDate: '2023-12-31',
    endDate: '2024-01-01',
    days: 2,
  },
  {
    id: 8,
    holiday: 'New Year',
    type: 'Public',
    startDate: '2023-12-31',
    endDate: '2024-01-01',
    days: 2,
  },
  {
    id: 9,
    holiday: 'New Year',
    type: 'Public',
    startDate: '2023-12-31',
    endDate: '2024-01-01',
    days: 2,
  },
  {
    id: 10,
    holiday: 'New Year',
    type: 'Public',
    startDate: '2023-12-31',
    endDate: '2024-01-01',
    days: 2,
  },
];
export const OccuptionsColumns = [
  {
    field: 'rowNumber',
    headerName: '',
    renderCell: (params) => <div>{params.id}.</div>,
    sortable: false,
    filterable: false,
  },
  {
    field: 'Occuption',
    headerName: 'Occuption',
    flex: 1,
    headerClassName: 'datagrid-header',
    cellClassName: 'datagrid-cell',
  },
  {
    field: 'Name',
    headerName: 'Name',
    flex: 1,
    headerClassName: 'datagrid-header',
    cellClassName: 'datagrid-cell',
  },
  {
    field: 'Customer Id',
    headerName: 'Customer Id',
    flex: 1,
    headerClassName: 'datagrid-header',
    cellClassName: 'datagrid-cell',
  },
];
export const OccuptionsRows = [
  {
    id: 1,
    Name: 'Occuption',
    CustomerId: '2344322',
    description: 'description',
  },
  {
    id: 2,
    Name: 'Occuption1',
    CustomerId: '23445543',
    description: 'description1',
  },
  {
    id: 3,
    Name: 'Occuption2',
    CustomerId: '2343',
    description: 'description2',
  },
  {
    id: 4,
    Name: 'Occuption3',
    CustomerId: '245343',
    description: 'description4',
  },
];

export const DepartmentColumns = [
  {
    field: 'rowNumber',
    headerName: '',
    width: 80,
    renderCell: (params) => <div>{params.id}</div>,
    sortable: false,
    filterable: false,
  },
  {
    field: 'id',
    headerName: 'ID',
    flex: 1,
    headerClassName: 'datagrid-header',
    cellClassName: 'datagrid-cell',
  },
  {
    field: 'name',
    headerName: 'Name',
    flex: 1,
    headerClassName: 'datagrid-header',
    cellClassName: 'datagrid-cell',
  },
  {
    field: 'description',
    headerName: 'Description',
    flex: 1,
    headerClassName: 'datagrid-header',
    cellClassName: 'datagrid-cell',
  },
  {
    field: 'status',
    headerName: 'Status',
    flex: 1,
    headerClassName: 'datagrid-header',
    cellClassName: 'datagrid-cell',
    renderCell: (params) => {
      const status = params.value;
      const isActive = status === 'active';
      const backgroundColor = isActive ? 'bg-green-500/60' : 'bg-red-400/60';
      const textColor = isActive ? 'text-green-500' : 'text-red-500';

      return (
        <div
          className={`${backgroundColor} ${textColor} font-semibold rounded-full px-3 py-2`}
        >
          <span>{status}</span>
        </div>
      );
    },
  },
];

export const DepartmentRows = [
  {
    id: 1,
    name: 'Department 1',
    description: 'This is the first department',
    status: 'active',
  },
  {
    id: 2,
    name: 'Department 2',
    description: 'This is the second department',
    status: 'inactive',
  },
  {
    id: 3,
    name: 'Department 3',
    description: 'This is the third department',
    status: 'active',
  },
  {
    id: 4,
    name: 'Department 4',
    description: 'This is the fourth department',
    status: 'inactive',
  },
  {
    id: 5,
    name: 'Department 5',
    description: 'This is the fifth department',
    status: 'active',
  },
];
