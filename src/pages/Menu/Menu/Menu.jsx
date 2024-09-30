
import { Helmet } from 'react-helmet-async';
import Cover from '../../shared/Cover';

import MenuImg from '../../../assets/menu/banner3.jpg'
import dessertImg from '../../../assets/menu/dessert-bg.jpeg'
import pizzaImg from '../../../assets/menu/pizza-bg.jpg'
import saladImg from '../../../assets/menu/salad-bg.jpg'
import soupImg from '../../../assets/menu/soup-bg.jpg'
import useMenu from '../../../hooks/useMenu';   
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
import MenuCategory from '../MenuCategory/MenuCategory';


const Menu = () => {

    const [menu] = useMenu()

    const dessert = menu.filter(item => item.category === 'dessert')
    const pizza = menu.filter(item => item.category === 'pizza')
    const soup = menu.filter(item => item.category === 'soup')
    const salad = menu.filter(item => item.category === 'salad')
    const offered = menu.filter(item => item.category === 'offered')






    return (
        <div>
            <Helmet>
                <title>Bistro Boss || Menu</title>

            </Helmet>
            <Cover img={MenuImg} title="Our Menu"></Cover>
            {/* main cover */}




            <SectionTitle subHeading={"Don't Miss"}
            heading={"Today's offer"}
            ></SectionTitle>
            {/* offered menu items */}

            <MenuCategory items={offered}></MenuCategory>

            {/* dessert menu items */}


            <MenuCategory 
            items={dessert}
            title="dessert"
            coverImg={dessertImg}
            ></MenuCategory>


            <MenuCategory 
            items={salad}
            title="salad"
            coverImg={saladImg}
            ></MenuCategory>


            <MenuCategory 
            items={soup}
            title="soup"
            coverImg={soupImg}
            ></MenuCategory>


            <MenuCategory 
            items={pizza}
            title="pizza"
            coverImg={pizzaImg}
            ></MenuCategory>

        </div>
    );
};

export default Menu;