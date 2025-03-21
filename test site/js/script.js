// Главный скрипт для всех страниц сайта

// Добавляем функцию для прокрутки меню
function scrollActiveMenuItemToPosition() {
    const sidebar = document.querySelector('.section-nav');
    const activeItem = document.querySelector('.section-nav .active');
    
    if (!activeItem) return;
    
    const sidebarHeight = sidebar.offsetHeight;
    const itemHeight = activeItem.offsetHeight;
    const itemPosition = activeItem.offsetTop;
    const desiredPosition = itemHeight;
    
    const maxScroll = sidebar.scrollHeight - sidebarHeight;
    let scrollTo = itemPosition - desiredPosition;
    
    if (scrollTo > maxScroll) {
        scrollTo = maxScroll;
    } else if (scrollTo < 0) {
        scrollTo = 0;
    }
    
    sidebar.scrollTop = scrollTo;
}

// Основной обработчик загрузки страницы
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded');
    
    // === БУРГЕР-МЕНЮ ===
    const burger = document.querySelector('.burger-menu');
    const menu = document.querySelector('.sidebar');
    
    if (burger && menu) {
        console.log('Burger menu elements found');
        burger.addEventListener('click', function(e) {
            e.preventDefault();
            burger.classList.toggle('active');
            menu.classList.toggle('active');
        });
    }
    
    // === ПРОКРУТКА АКТИВНОГО ПУНКТА МЕНЮ ===
    scrollActiveMenuItemToPosition();
    
    // === МОБИЛЬНОЕ МЕНЮ И СТАТУС-БАР ===
    const menuToggle = document.querySelector('.menu-toggle');
    const statusBar = document.querySelector('.status-bar');
    const body = document.body;
    let lastScrollTop = 0;

    // Показываем кнопку меню после небольшой задержки
    if (menuToggle) {
        setTimeout(() => {
            menuToggle.classList.add('visible');
        }, 500);

        menuToggle.addEventListener('click', () => {
            if (sidebar) {
                sidebar.classList.toggle('active');
                body.classList.toggle('menu-active');
                menuToggle.classList.toggle('active');
            }
        });
    }

    // Обработка скролла для статус-бара
    if (statusBar) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Скрываем/показываем статус-бар
            if (scrollTop > lastScrollTop && scrollTop > 44) {
                statusBar.classList.add('hidden');
            } else {
                statusBar.classList.remove('hidden');
            }
            
            lastScrollTop = scrollTop;
        });
    }

    // Закрытие меню при клике вне его
    if (menu) {
        document.addEventListener('click', (e) => {
            if (!menu.contains(e.target) && 
                (menuToggle && !menuToggle.contains(e.target)) && 
                menu.classList.contains('active')) {
                menu.classList.remove('active');
                body.classList.remove('menu-active');
                if (menuToggle) menuToggle.classList.remove('active');
            }
        });
    }

    // Добавляем класс home для главной страницы
    if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
        document.body.classList.add('home');
    }

    // Управление хедером на мобильных
    if (window.innerWidth <= 768) {
        const header = document.querySelector('header');
        if (header) {
            let lastScroll = 0;

            window.addEventListener('scroll', () => {
                const currentScroll = window.pageYOffset;

                if (currentScroll > lastScroll && currentScroll > 100) {
                    // Прокрутка вниз - скрываем хедер
                    header.classList.add('hidden');
                } else {
                    // Прокрутка вверх - показываем хедер
                    header.classList.remove('hidden');
                }

                lastScroll = currentScroll;
            });
        }
    }

    const mobileMenuButton = document.querySelector('.mobile-menu-toggle');

    if (mobileMenuButton && menu) {
        mobileMenuButton.addEventListener('click', function() {
            this.classList.toggle('active');
            menu.classList.toggle('active');
            body.classList.toggle('menu-active');
        });

        // Закрытие при клике вне меню
        document.addEventListener('click', function(e) {
            if (!menu.contains(e.target) && 
                !mobileMenuButton.contains(e.target) && 
                menu.classList.contains('active')) {
                mobileMenuButton.classList.remove('active');
                menu.classList.remove('active');
                body.classList.remove('menu-active');
            }
        });
    }
    
    // === АНИМАЦИИ ЭЛЕМЕНТОВ ПРИ ПРОКРУТКЕ ===
    // Заголовки
    document.querySelectorAll('h1, h2, h3').forEach(el => {
        el.classList.add('fade-in');
    });

    // Параграфы
    document.querySelectorAll('p').forEach(el => {
        el.classList.add('fade-in');
    });

    // Карточки
    document.querySelectorAll('.section-card').forEach(el => {
        el.classList.add('fade-in');
    });

    // Кнопки в hero секции
    document.querySelectorAll('.hero-buttons .button').forEach(el => {
        el.classList.add('fade-in');
    });

    // Запускаем анимации
    handleScrollAnimations();
    
    // === КАРТОЧКИ ТИПОВ ОТНОШЕНИЙ ===
    const typeCards = document.querySelectorAll('.type-card');
    
    if (typeCards.length > 0) {
        typeCards.forEach(card => {
            card.addEventListener('click', function() {
                // Если карточка уже развернута, сворачиваем её
                if (this.classList.contains('expanded')) {
                    this.classList.remove('expanded');
                } else {
                    // Сворачиваем все карточки
                    typeCards.forEach(c => c.classList.remove('expanded'));
                    // Разворачиваем текущую карточку
                    this.classList.add('expanded');
                }
            });
        });
    }

    // === ПЛАВНАЯ ПРОКРУТКА ДЛЯ ЯКОРНЫХ ССЫЛОК ===
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});

// Функция для анимации элементов при прокрутке
function handleScrollAnimations() {
    const elements = document.querySelectorAll('.fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    elements.forEach(element => {
        observer.observe(element);
    });
} 
