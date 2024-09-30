import React from 'react';
import { useLoaderData } from 'react-router-dom';

const UpdateItem = () => {
    const menuItem = useLoaderData()
    const {name,price,recipe,image} = menuItem 
    console.log(menuItem);
    return (
        <div>
            update
        </div>
    );
};

export default UpdateItem;