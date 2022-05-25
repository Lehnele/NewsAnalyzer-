import React from 'react';
import './Layout.css';
import Header from '../../components/header/header';

export const Color = ['#9BABEE','#A9A9A9','#A270A2','#8AB98D','#F4EF75','#DACCD0','#E69F42','#F7EF5D','#D1CD86','#D5F694','#BC8F8F','#A9A9A9','#CD5C5C','#F08080','#B22222','#00FF7F','#3CB371','#DA6A6C','#A9A6D6','#EF90E7','#AF91AC','#6B8E23','#7B68EE','#F4A460','#C0D6C2','#F666DB','#D892F3','#F1B785','#DDA0DD','#BCF567FF','#7CC065',]

const Layout = (props) => {
  return (
    <div className='Layout'>
      <Header/>
      <main>
        { props.children }
      </main>
    </div>
  );
};

export default Layout;