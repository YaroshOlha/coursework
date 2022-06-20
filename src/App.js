/* eslint-disable no-loop-func */
/* eslint-disable default-case */
/* eslint-disable no-unused-expressions */
import './App.css';
import $ from 'jquery';
import { useEffect, useState } from 'react';

function App() {
  const [activeTab, setActiveTab] = useState('paintings');
  const [activePainting, setActivePainting] = useState(null);
  const [activePaintingText, setActivePaintingText] = useState('');
  const [paintings, setPaintings] = useState([]);
  const [count, setCount] = useState(5);

  const click_on_menu = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    fetch('data.txt').then(r => r.text()).then(data => {
      setPaintings(data.trim().split('\n'));
    })
  }, []);

  const load_more_paintings = () => {
    if(count + 5 > paintings.length) {
      setCount(paintings.length);
      return;
    }

    setCount(count + 5);
  };

  const click_on_painting = (painting) => {
    setActivePainting(painting);
  };

  useEffect(() => {
    if(!activePainting) return;

    fetch(`data/text/${activePainting}.txt`).then(r => r.text()).then(data => {
      setActivePaintingText(data);
    });
  }, [activePainting])

  const Painting = ({painting}) => {
    const [text, setText] = useState('Loading...');

    fetch(`data/text/${painting}.txt`).then(r => r.text()).then(data => {
      setText(data);
    });

    return (
    <div className="col-md-6 col-lg-4">               
      <div className="p-2 painting" onClick={() => {click_on_painting(painting)}}>                  
        <img src={`data/img/${painting}.jpeg`} className="w-100" alt={painting} />                  
        <div className="bg-primary text-center">{text}</div>               
      </div>        
    </div>
    )
  }

  return (
    <>
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6"
      crossorigin="anonymous"
    />
    <div className="container-fluid">
    {activePainting &&
    <div className='paintingModal'>
        <div className='row'> 
          {activePainting}

          <div onClick={() => {setActivePainting(null); click_on_menu('paintings')}}>
            X
          </div>
        </div>

        <img src={`data/img/${activePainting}.jpeg`} className="w-100" alt={activePainting} />

        <p>
        {activePaintingText}
        </p>
    </div>
}
      <div className="row">
        <div className="col-lg-3 col-md-4 col-sm-5 px-3 pt-2 pb-0" id="menu">
          <div className="navbar-brand d-flex fs-4 text-primary align-items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              fill="currentColor"
              className="bi bi-globe"
              viewBox="0 0 16 16"
            >
              <path
                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z"
              ></path>
            </svg>
            <span className="ms-2" href="/">Мистецька галерея</span>
          </div>
          <hr className="my-2" />
          <ul className="nav nav-pills flex-column">
            <li
className={`nav-item ${activeTab == 'home' && 'active'} nav-link align-items-center`}              id="menu_home"
              onClick={() => {click_on_menu('home')}}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                fill="currentColor"
                className="bi bi-house-door me-2"
                viewBox="0 0 16 16"
              >
                <path
                  d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5z"
                />
              </svg>
              
            </li>
            <li
              className={`nav-item ${activeTab == 'paintings' && 'active'} nav-link align-items-center`}
              id="menu_painting"
              onClick={() => {click_on_menu('paintings')}}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                fill="currentColor"
                className="bi bi-image me-2"
                viewBox="0 0 16 16"
              >
                <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                <path
                  d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z"
                />
              </svg>
              <span>Породи</span>
            </li>
            <li
              className={`nav-item nav-link d-flex align-items-center ${activeTab == 'random' && 'active'}`}
              id="menu_random"
              onClick={() => {
                click_on_menu('random');
                setActivePainting(paintings[Math.floor(Math.random() * paintings.length)])}}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                fill="currentColor"
                className="bi bi-star me-2"
                viewBox="0 0 16 16"
              >
                <path
                  d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"
                />
              </svg>
              <span>Випадкова картина</span>
            </li>
            <li
              className={`nav-item nav-link d-flex align-items-center ${activeTab == 'task' && 'active'}`}
              id="menu_task"
              onClick={() => {click_on_menu('task')}}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                fill="currentColor"
                className="bi bi-list-task me-2"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M2 2.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5V3a.5.5 0 0 0-.5-.5H2zM3 3H2v1h1V3z"
                />
                <path
                  d="M5 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM5.5 7a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 4a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9z"
                />
                <path
                  fill-rule="evenodd"
                  d="M1.5 7a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5V7zM2 7h1v1H2V7zm0 3.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5H2zm1 .5H2v1h1v-1z"
                />
              </svg>
              <span>Завдання</span>
            </li>
          </ul>
          <hr className="my-2" />
        </div>
        <div className="col-lg-9 col-md-8 col-sm-7" id="context">
          <div id="div_galery" className="container-fluid p-0 my-3" hidden={activeTab != 'paintings'}>
            <div className="row g-3 px-2" id="paintings">
              {paintings.slice(0, count).map((painting, index) => (<Painting painting={painting} />))}
            </div>

            {paintings.length !== count && <div
              className="my-3 mx-2 btn btn-outline-primary d-block"
              id="load"
              onClick={() => {load_more_paintings()}}
            >
              Показати більше картин
            </div>
            }
          </div>
          <div id="div_task" hidden={activeTab != 'task'}>
            <h2 className="text-center m-3">
              Варіант №20 - Сайт місцевої мистецької галереї
            </h2>
            <hr />
            <ul>
              <li>
                Навігація - бокове меню
                <ul>
                  <li>Головна сторінка</li>
                  <li>Картини</li>
                  <li>Випадкова картина</li>
                  <li>Завдання</li>
                </ul>
              </li>
              <br />
              <li>Головна сторінка - перехід на index.html</li>
              <li>Картини - відображення списку картин галереї</li>
              <li>Випадкова картина - відображення випадкової картини</li>
              <li>Завдання - відображення варіанту завдання студента</li>
              <br />
              <li>Картини у списку відображаються по 4 шт.</li>
              <li>Картина має назву, автора, зображення та опис</li>
              <li>
                Є можливість відобразити ще 4 і т.д. за допомогою кнопки
                "відобразити більше картин"
              </li>
              <li>
                При виборі картини, вона відображається у модальному вікні
              </li>
              <li>Загальна кількість картин - 11</li>
              <li>Дані зберігаються у папці /data</li>
              <li>
                Інформація про список картин зберігається у файлі data.txt
              </li>
              <li>Стиль оформлення сайту - на вибір студента</li>
              <li>Для верстки сайту використовується Bootstrap_5</li>
              <li>Для роботи з Ajax використовується jQuery_3</li>
              <li>Bootstrap та jQuery підключаються за допомогою CDN</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    </>
  );
}

export default App;
