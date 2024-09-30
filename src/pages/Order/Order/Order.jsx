
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import orderCover from '../../../assets/shop/banner2.jpg'
import Cover from '../../shared/Cover';
import { useState } from 'react';
import useMenu from '../../../hooks/useMenu';

import OrderTab from '../OrderTab/OrderTab';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Order = () => {

    const categories = ['salad','pizza','soup','dessert','drinks']

    const {category} = useParams()
    const initialIndex = categories.indexOf(category)
    const [tabIndex,setTabIndex] = useState(initialIndex)

    console.log(category);

    const [menu] = useMenu();

    const dessert = menu.filter(item => item.category === 'dessert')
    const pizza = menu.filter(item => item.category === 'pizza')
    const soup = menu.filter(item => item.category === 'soup')
    const salad = menu.filter(item => item.category === 'salad')
   
    const drinks = menu.filter(item => item.category === 'offered')





    return (
        <div>
            <Helmet>
                <title>Bistro Boss || Order</title>

            </Helmet>
            <Cover img={orderCover} title={"Order Food"}></Cover>
            <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                <TabList className='flex gap-4 mb-4'>
                    <Tab className='btn btn-outline'>Salad</Tab>
                    <Tab className='btn btn-outline'>Pizza</Tab>
                    <Tab className='btn btn-outline'>Soup</Tab>
                    <Tab className='btn btn-outline'>Dessert</Tab>
                    <Tab className='btn btn-outline'>Drinks</Tab>
                </TabList>
                <TabPanel>
                    <OrderTab items={salad}></OrderTab>
                </TabPanel>
                <TabPanel>
                <OrderTab items={pizza}></OrderTab>
                </TabPanel>
                <TabPanel>
                <OrderTab items={soup}></OrderTab>
                </TabPanel>
                <TabPanel>
                <OrderTab items={dessert}></OrderTab>
                </TabPanel>
                <TabPanel>
                <OrderTab items={drinks}></OrderTab>
                </TabPanel>
            </Tabs>




        </div>
    );
};

export default Order;