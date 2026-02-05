const awardsItems = document.querySelectorAll('.awards__info');
awardsItems.forEach(item => {
    const sliderLine = item.querySelector('.awards__info-slider');
    const nextBtn = item.querySelector('.awards__info-slider-next');
    const prevBtn = item.querySelector('.awards__info-slider-prev');
    const paginationEl = item.querySelector('.awards__info-slider-pagination');
    new Swiper(sliderLine, {
        loop: false,
        spaceBetween: 20,
        slidesPerView: 1,
        navigation: {
            nextEl: nextBtn,
            prevEl: prevBtn,
        },
        pagination: {
            el: paginationEl,
            clickable: true,
        },
    });
});



new Swiper('.hero__slider', {
    loop: true,
    spaceBetween: 20,
    autoplay: { delay: 3000, disableOnInteraction: false },
    navigation: {
        nextEl: '.hero__slider-next',
        prevEl: '.hero__slider-prev',
    },
    pagination: {
        el: '.hero__pagination',
        clickable: true,
    },
});

new Swiper('.news__swiper', {
    loop: true,
    spaceBetween: 12,
    slidesPerView: 1,
    breakpoints: {
        481: {
            slidesPerView: 2,
            spaceBetween: 18
        },
        1025: {
            slidesPerView: 3,
            spaceBetween: 23
        },
    }
});

let swiperInstance = null;
function initOrDestroySwiper() {
    const windowWidth = window.innerWidth;
    const sliderSelector = '.article__latest-block';
    if (windowWidth <= 1024) {
        if (!swiperInstance) {
            swiperInstance = new Swiper(sliderSelector, {
                loop: true,
                spaceBetween: 12,
                slidesPerView: 1,
                breakpoints: {
                    481: {
                        slidesPerView: 2,
                        spaceBetween: 18
                    },
                }
            });
        }
    } else {
        if (swiperInstance) {
            swiperInstance.destroy(true, true);
            swiperInstance = null;
        }
    }
}

window.addEventListener('load', initOrDestroySwiper);
window.addEventListener('resize', initOrDestroySwiper);

document.addEventListener('click', function (event) {
    const supportBlock = document.querySelector('.header__support');
    const supportSelected = document.querySelector('.header__support-selected');
    if (supportSelected.contains(event.target)) {
        supportBlock.classList.toggle('active');
    } 
    else if (!supportBlock.contains(event.target)) {
        supportBlock.classList.remove('active');
    }
});

document.addEventListener('click', function (event) {
    const footerSupport = document.querySelector('.footer__support');
    const footerSupportSelected = document.querySelector('.footer__support-selected');
    if (footerSupportSelected.contains(event.target)) {
        footerSupport.classList.toggle('active');
    } 
    else if (!footerSupport.contains(event.target)) {
        footerSupport.classList.remove('active');
    }
});


if(document.querySelector('.feedback-more')){
    const inputField = document.querySelector('.feedback-more');
    const formBlock = document.querySelector('.contact__form-block');
    const reasonSpans = document.querySelectorAll('.feedback-reason span');
    function toggleDropdown() {
        if (inputField.value.trim() === "") {
            inputField.classList.add('active');
        } else {
            inputField.classList.remove('active');
        }
    }

    inputField.addEventListener('focus', toggleDropdown);
    inputField.addEventListener('input', () => {
        if (inputField.value.length > 0) {
            inputField.classList.remove('active');
        } else {
            inputField.classList.add('active');
        }
    });
    reasonSpans.forEach(span => {
        span.addEventListener('mousedown', (e) => {
            const text = span.childNodes[0].textContent.trim();
        
            if (!text.includes("Інше")) {
                inputField.value = text;
                inputField.classList.remove('active');
                inputField.blur();
            }
        });
    });
    document.addEventListener('mousedown', (e) => {
        if (!formBlock.contains(e.target)) {
            inputField.classList.remove('active');
        }
    });
}


document.querySelectorAll('.support__info-copy').forEach(copyBtn => {
    copyBtn.addEventListener('click', function() {
        const parentInfo = this.closest('.support__info-info');
        const tempNode = parentInfo.cloneNode(true);
        const btnInClone = tempNode.querySelector('.support__info-copy');
        if (btnInClone) btnInClone.remove();
        const textToCopy = tempNode.innerText.trim();
        navigator.clipboard.writeText(textToCopy).then(() => {
            parentInfo.classList.add('active');
            setTimeout(() => {
                parentInfo.classList.remove('active');
            }, 2000);
        }).catch(err => {
            console.error(err);
        });
    });
});

const infoTitles = document.querySelectorAll('.support__info-name');
infoTitles.forEach(title => {
    title.addEventListener('click', function() {
        const parentBlock = this.closest('.support__info-block');
        if (parentBlock) {
            parentBlock.classList.toggle('active');
        }
    });
});

const reportsTitles = document.querySelectorAll('.reports__info-name');
reportsTitles.forEach(title => {
    title.addEventListener('click', function() {
        const reportsBlock = this.closest('.reports__info-block');
        if (reportsBlock) {
            reportsBlock.classList.toggle('active');
        }
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const networkBlock = document.querySelector('.network__block');
    const networkLine = document.querySelector('.network-line');
    const lineIcon = document.querySelector('.network-line-icon');
    const networkItems = document.querySelectorAll('.network__item');

    window.addEventListener('scroll', () => {
        if (!networkBlock || !lineIcon) return;

        const rect = networkBlock.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        let progress = (windowHeight / 1.8 - rect.top) / rect.height;
        progress = Math.max(0, Math.min(1, progress));
        const percentage = progress * 98;

        lineIcon.style.top = `${percentage}%`;
        networkLine.style.setProperty('--line-height', `${percentage + 0.4}%`);

        const iconCenterY = lineIcon.getBoundingClientRect().top + (lineIcon.offsetHeight / 2);

        networkItems.forEach((item) => {
            const itemContent = item.querySelector('.network__item-content');
            const itemRect = item.getBoundingClientRect();
            const itemMidPoint = itemRect.top + (itemRect.height / 2);
            if (iconCenterY >= itemMidPoint) {
                item.classList.add('is-active');
                if (itemContent) itemContent.classList.add('is-active');
            } else {
                item.classList.remove('is-active');
                if (itemContent) itemContent.classList.remove('is-active');
            }
        });
    });
});


document.querySelectorAll('.menu-item-has-children > a span').forEach(arrow => {
    arrow.addEventListener('click', function(e) {
        if (window.innerWidth < 1025) {
            e.preventDefault();
            e.stopPropagation();
            const parentLi = this.closest('.menu-item-has-children');
            parentLi.classList.toggle('active');
        }
    });
});

const burger = document.querySelector('.header__burger');
const menu = document.querySelector('.header__menu');
const closeBtn = document.querySelector('.header__menu-close');
if (burger && menu) {
    burger.addEventListener('click', () => {
        menu.classList.add('active');
    });
}
if (closeBtn && menu) {
    closeBtn.addEventListener('click', () => {
        menu.classList.remove('active');
    });
}