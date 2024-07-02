import React, { useEffect, useState } from 'react'
import Chat from './Chat'
import Header from '../Components/Header/Header'
import AOS from "aos";
import "aos/dist/aos.css";
import { useSelector } from 'react-redux';

const ChatCard = () => {

    const [theme, setTheme] = useState(
        localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
      );
      const element = document.documentElement;
    
      useEffect(() => {
        if (theme === "dark") {
          element.classList.add("dark");
          localStorage.setItem("theme", "dark");
        } else {
          element.classList.remove("dark");
          localStorage.setItem("theme", "light");
        }
      }, [theme]);
    
      React.useEffect(() => {
        AOS.init({
          offset: 100,
          duration: 800,
          easing: "ease-in-sine",
          delay: 100,
        });
        AOS.refresh();
      }, []);
    
      const {userInfo} = useSelector((state) => state.auth)
    
    

  return (
    <div  className="bg-white dark:bg-black dark:text-white text-black overflow-x-hidden">
        <Header theme={theme} setTheme={setTheme} />
        <Chat theme={theme} />
    </div>
  )
}

export default ChatCard