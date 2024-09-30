import React from 'react';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';

import featuredimg from '../../../assets/home/featured.jpg'
import './Featured.css'

const Featured = () => {
    return (
        <div className='featured-item bg-fixed text-white pt-8 my-10'>
            <SectionTitle 
            heading={'Featured Item'}
            subHeading={'Check it out'}></SectionTitle>

            <div className='md:flex justify-center bg-slate-500 bg-opacity-50 items-center py-20 px-36'>
                <div>
                    <img src={featuredimg} alt="" />
                </div>
                <div className='md:ml-10 space-y-2'>
                    <p>Aug 20,2020</p>
                    <p className='uppercase'>Where can i get some</p>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. A corporis adipisci amet accusantium, aspernatur ut dolore facere, reiciendis velit nostrum, hic ipsam. Aliquam odio distinctio eum voluptatum voluptate iusto cupiditate.</p>
                    <button className="btn btn-outline border-0 border-b-4 mt-5">Default</button>


                </div>
            </div>


        </div>
        
    );
};

export default Featured;