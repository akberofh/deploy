import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import './style.css';
import { FaHeart } from 'react-icons/fa';
import { useSelector } from "react-redux";

const ProductCard = () => {
  const [notes, setNotes] = useState([]);
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/notes');
        setNotes(response.data.allNotes);
      } catch (error) {
        console.error('Notları getirirken hata oluştu:', error);
      }
    };

    fetchNotes();
  }, []);

  const addToBasket = async (product_id) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Kullanıcı oturum açmamış');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:8000/api/products/products',
        { product_id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(`Sepete eklendi: ${product_id}`, response.data);
    } catch (error) {
      console.error('Sepete eklerken hata oluştu:', error);
    }
  };

  const addToWishlist = async (id) => {
    try {
      console.log(`Favorilere eklendi: ${id}`);
      setNotes(notes.filter((note) => note._id !== id));
    } catch (error) {
      console.error('Favorilere ekleme hatası:', error);
    }
  };

  return (
    <Swiper
      effect={'coverflow'}
      grabCursor={true}
      centeredSlides={true}
      slidesPerView={'auto'}
      coverflowEffect={{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      }}
      pagination={false}
      modules={[EffectCoverflow, Pagination]}
      className="mySwiper"
    >
      {notes.map((note) => (
        <SwiperSlide key={note._id}>
          <div className="p-3 relative group flex flex-col items-center overflow-hidden bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg">
            <div className="w-full h-[250px] relative overflow-hidden rounded-lg">
              {note.thumbnail && (
                <img
                  src={note.thumbnail}
                  alt="thumbnail"
                  className="w-full h-full object-cover transition-transform duration-500 transform group-hover:scale-105"
                  style={{ backgroundColor: 'transparent' }}
                />
              )}
              <button
                onClick={() => addToBasket(note._id)}
                className="bg-primary text-white py-2 px-4 rounded-md absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition duration-300 hover:bg-primary-dark"
              >
                Sepete Ekle
              </button>
            </div>
            <div className="space-y-2 w-full text-center mt-3">
              <h1 className="text-primary dark:text-primary-light font-semibold text-lg">{note.title}</h1>
              <div className="flex justify-center items-center text-xl font-semibold space-x-2 text-gray-900 dark:text-gray-100">
                <p>${note.price}</p>
                <span className="text-sm text-gray-600 dark:text-gray-400">{note.description}</span>
              </div>
            </div>
            <p className="text-xl font-semibold absolute top-0 left-3 bg-white dark:bg-gray-800 px-2 py-1 rounded-lg shadow-lg text-gray-900 dark:text-gray-100">
              {note.distance}
            </p>
            <button
              onClick={() => addToWishlist(note._id)}
              className="group opacity-0 hover:opacity-100 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full p-2 hover:bg-gray-200 dark:hover:bg-gray-600 transition duration-300 absolute top-2 right-2"
            >
              <FaHeart size="1.5em" />
            </button>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ProductCard;
