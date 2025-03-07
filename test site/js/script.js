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

// Вызываем функцию после загрузки страницы
document.addEventListener('DOMContentLoaded', scrollActiveMenuItemToPosition);

// Обработчики для мобильного меню и статус-бара
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const statusBar = document.querySelector('.status-bar');
    const body = document.body;
    let lastScrollTop = 0;

    // Показываем кнопку меню после небольшой задержки
    setTimeout(() => {
        menuToggle.classList.add('visible');
    }, 500);

    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
        body.classList.toggle('menu-active');
        menuToggle.classList.toggle('active');
    });

    // Обработка скролла для статус-бара
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

    // Закрытие меню при клике вне его
    document.addEventListener('click', (e) => {
        if (!sidebar.contains(e.target) && 
            !menuToggle.contains(e.target) && 
            sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
            body.classList.remove('menu-active');
            menuToggle.classList.remove('active');
        }
    });

    // Добавляем класс home для главной страницы
    if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
        document.body.classList.add('home');
    }

    // Управление хедером на мобильных
    if (window.innerWidth <= 768) {
        const header = document.querySelector('header');
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

    const mobileMenuButton = document.querySelector('.mobile-menu-toggle');

    if (mobileMenuButton && sidebar) {
        mobileMenuButton.addEventListener('click', function() {
            this.classList.toggle('active');
            sidebar.classList.toggle('active');
            body.classList.toggle('menu-active');
        });

        // Закрытие при клике вне меню
        document.addEventListener('click', function(e) {
            if (!sidebar.contains(e.target) && 
                !mobileMenuButton.contains(e.target) && 
                sidebar.classList.contains('active')) {
                mobileMenuButton.classList.remove('active');
                sidebar.classList.remove('active');
                body.classList.remove('menu-active');
            }
        });
    }
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

// Добавляем класс fade-in к элементам, которые нужно анимировать
document.addEventListener('DOMContentLoaded', function() {
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
});

document.addEventListener('DOMContentLoaded', function() {
    // Находим элементы
    const burger = document.querySelector('.burger-menu');
    const menu = document.querySelector('.sidebar');
    
    // Проверяем, что элементы найдены
    console.log('Burger:', burger);
    console.log('Menu:', menu);

    // Добавляем обработчик
    if (burger && menu) {
        burger.addEventListener('click', function(e) {
            // Останавливаем всплытие события
            e.preventDefault();
            e.stopPropagation();
            
            // Логируем клик
            console.log('Burger clicked!');
            
            // Переключаем классы
            burger.classList.toggle('active');
            menu.classList.toggle('active');
            
            // Проверяем состояние после клика
            console.log('Burger active:', burger.classList.contains('active'));
            console.log('Menu active:', menu.classList.contains('active'));
        });
    }
});


// Ждем полной загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
    // Обработка кликов по карточкам
    const typeGrid = document.querySelector('.type-grid');
    if (typeGrid) {
        typeGrid.addEventListener('click', function(e) {
            const card = e.target.closest('.type-card');
            if (!card) return;

            console.log('Card clicked:', card); // Отладочный лог

            if (card.classList.contains('expanded')) {
                card.classList.remove('expanded');
            } else {
                // Закрываем все открытые карточки
                document.querySelectorAll('.type-card.expanded').forEach(expandedCard => {
                    expandedCard.classList.remove('expanded');
                });
                // Открываем текущую карточку
                card.classList.add('expanded');
            }
        });
    }

    // Обработка мобильного меню
    const menuToggle = document.querySelector('.burger-menu');
    const sidebar = document.querySelector('.sidebar');
    const body = document.body;

    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            menuToggle.classList.toggle('active');
            sidebar.classList.toggle('active');
            body.classList.toggle('menu-open');
        });

        // Закрытие меню при клике вне его
        document.addEventListener('click', (e) => {
            if (!sidebar.contains(e.target) && !menuToggle.contains(e.target) && sidebar.classList.contains('active')) {
                menuToggle.classList.remove('active');
                sidebar.classList.remove('active');
                body.classList.remove('menu-open');
            }
        });
    }
}); 
