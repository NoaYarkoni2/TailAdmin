import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import React, { useEffect } from 'react';
import DefaultLayout from '../layout/DefaultLayout';
import OrdersData from "./OrdersData";


const Orders = () => {
 

  return (
    <DefaultLayout>     
       <OrdersData />
    </DefaultLayout>
  );
};

export default Orders;
