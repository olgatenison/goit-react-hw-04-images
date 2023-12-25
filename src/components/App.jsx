import { useState, useEffect } from 'react';
import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import axios from 'axios';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Ключ для доступу до Pixabay API
const KEY = '40311007-381e26539f6c0a156243500cd';
const perPage = 12;

const App = () => {
  // Стан для зберігання значення пошукового запиту
  const [searchName, setSearchName] = useState('');
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  // Ефект, що викликається при зміні значень searchName або currentPage
  useEffect(() => {
    // Якщо searchName порожній, немає сенсу виконувати запит
    if (searchName === '') {
      return;
    }
    // Функція для виконання запиту до Pixabay API
    const fetchData = async () => {
      try {
        const URL = `https://pixabay.com/api/?q=${searchName}&page=${currentPage}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`;
        // Початок завантаження
        setLoading(true);

        const response = await axios.get(URL);
        const data = response.data;
        const newImages = data.hits;

        // Виконання запиту за допомогою axios
        if (newImages.length === 0 || !searchName) {
          toast.info('Sorry image not found...', {
            position: toast.POSITION.TOP_RIGHT,
          });
          return;
        }
        // Оновлення стану зображень та обчислення загальної кількості сторінок
        setImages(prevImages => [...prevImages, ...newImages]);
        setTotalPages(Math.ceil(data.totalHits / 12));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        // Завершення завантаження, навіть якщо виникла помилка
        setLoading(false);
      }
    };
    // Виклик функції для виконання запиту
    fetchData();
  }, [searchName, currentPage]);

  // Обробник подачі форми пошукового запиту
  const handleSubmit = searchQuery => {
    // Оновлення стану для searchName, обнулення зображень та сторінки
    setSearchName(searchQuery);
    setImages([]);
    setCurrentPage(1);
  };

  // Обробник кнопки "Завантажити більше"
  const onLoadMoreButton = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  // Повертає розмітку для відображення на сторінці
  return (
    <>
      <ToastContainer transition={Slide} />
      <SearchBar onSubmit={handleSubmit} />
      <ImageGallery images={images}></ImageGallery>
      {images.length > 0 && totalPages !== currentPage && (
        <Button onLoadMoreButton={onLoadMoreButton} />
      )}
      {loading && <Loader />}
    </>
  );
};

export default App;
