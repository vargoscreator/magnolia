const header = document.querySelector('header');
let lastScrollTop = 0;
function handleHeader() {
  const currentScroll = window.scrollY;
  const windowWidth = window.innerWidth;
  if (windowWidth > 1024) {
    header.classList.remove('header-scrolled');
    if (currentScroll < lastScrollTop) {
      header.classList.remove('header-scrolled-pc');
    } 
    else if (currentScroll > 100) {
      header.classList.add('header-scrolled-pc');
    }
  } else {
    header.classList.remove('header-scrolled-pc');
    
    if (currentScroll > 50) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }
  }

  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
}

window.addEventListener('load', handleHeader);
window.addEventListener('scroll', handleHeader);
window.addEventListener('resize', handleHeader);

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
    speed: 800,
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
        769: {
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
    // 1. Ищем нажатый элемент-переключатель (selected)
    const toggle = event.target.closest('.header__support-selected, .header__lang-selected');
    
    // 2. Ищем родительский контейнер (весь блок меню)
    const currentBlock = event.target.closest('.header__support, .header__lang');

    if (toggle && currentBlock) {
        // Если кликнули по переключателю — переключаем класс 'active' у родителя
        currentBlock.classList.toggle('active');
    }

    // 3. Закрываем все остальные блоки при клике вовне
    document.querySelectorAll('.header__support, .header__lang').forEach(block => {
        if (block !== currentBlock) {
            block.classList.remove('active');
        }
    });
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


document.querySelectorAll('.support__info-info').forEach(infoBlock => {
    infoBlock.addEventListener('click', function() {
        const textToCopy = this.innerText.trim();
        navigator.clipboard.writeText(textToCopy).then(() => {
            this.classList.add('active');
            setTimeout(() => {
                this.classList.remove('active');
            }, 2000);
        }).catch(err => {
            console.error('Ошибка копирования:', err);
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
        const isMobile = window.innerWidth < 769;
        let progress = (windowHeight / 1.8 - rect.top) / rect.height;
        progress = Math.max(0, Math.min(1, progress));
        const percentage = progress * 98;
        lineIcon.style.top = `${percentage}%`;
        networkLine.style.setProperty('--line-height', `${percentage + 0.4}%`);
        const iconCenterY = lineIcon.getBoundingClientRect().top + (lineIcon.offsetHeight / 2);
        networkItems.forEach((item) => {
            const itemContent = item.querySelector('.network__item-content');
            const itemRect = item.getBoundingClientRect();
            const triggerPoint = isMobile 
                ? itemRect.top 
                : itemRect.top + (itemRect.height / 2);

            if (iconCenterY >= triggerPoint) {
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



document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.contact__form-page');
    const contactSection = document.querySelector('.contact');
    const contactInner = document.querySelector('.contact__inner');
    function handleFormPosition() {
        const windowWidth = window.innerWidth;
        if (windowWidth < 769) {
            if (form.parentElement !== contactSection) {
                contactSection.appendChild(form);
            }
        } else {
            if (form.parentElement !== contactInner) {
                contactInner.appendChild(form);
            }
        }
    }

    handleFormPosition();
    window.addEventListener('resize', handleFormPosition);
});


document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.contact__form-page');
    const contactSection = document.querySelector('.contact');
    const contactInner = document.querySelector('.contact__inner');
    function handleResponsiveElements() {
        const windowWidth = window.innerWidth;
        if (form && contactSection && contactInner) {
            if (windowWidth < 768) {
                if (form.parentElement !== contactSection) contactSection.appendChild(form);
            } else {
                if (form.parentElement !== contactInner) contactInner.appendChild(form);
            }
        }
    }
    handleResponsiveElements();
    window.addEventListener('resize', handleResponsiveElements);
});


document.addEventListener('DOMContentLoaded', function() {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        initScrollAnimations();
    }
});

function initScrollAnimations() {
    gsap.utils.toArray("form").forEach(form => {
        const fields = form.querySelectorAll(".contact__form-block");
        if (fields.length > 0) {
            gsap.from(fields, {
                scrollTrigger: {
                    trigger: form,
                    start: "top 85%",
                    toggleActions: "play none none none"
                },
                opacity: 0,
                y: 15,
                stagger: 0.1,
                duration: 0.5,
                ease: "power2.out",
                clearProps: "all" 
            });
        }
    });

    const aboutTl = gsap.timeline();
    aboutTl.from(".about__bg", { opacity: 0, scale: 1.1, duration: 1.5, ease: "power2.out" })
           .from(".about__title", { opacity: 0, y: 30, duration: 1 }, "-=0.8");

    gsap.from(".aboutblock__block", {
        scrollTrigger: { trigger: ".aboutblock", start: "top 80%" },
        opacity: 0, x: -50, stagger: 0.3, duration: 1, ease: "power2.out"
    });

    gsap.from(".aboutblock__image", {
        scrollTrigger: { trigger: ".aboutblock", start: "top 70%" },
        opacity: 0, x: 50, duration: 1.2
    });

    gsap.from(".valuables__item", {
        scrollTrigger: { trigger: ".valuables__block", start: "top 85%" },
        opacity: 0, y: 20, stagger: 0.1, duration: 0.6, ease: "back.out(1.7)"
    });

    gsap.utils.toArray(".history__block").forEach((block) => {
        gsap.from(block, {
            scrollTrigger: { trigger: block, start: "top 90%", toggleActions: "play none none none" },
            opacity: 0, y: 50, duration: 1, ease: "power2.out"
        });
    });

    gsap.from(".team__item", {
        scrollTrigger: { trigger: ".team__content", start: "top 80%" },
        opacity: 0, scale: 0.9, stagger: 0.15, duration: 0.8, ease: "power1.out"
    });

    gsap.from(".activity__title", { duration: 1, y: -30, opacity: 0, ease: "power2.out" });

    gsap.utils.toArray(".activity__item").forEach((item) => {
        gsap.from(item, {
            scrollTrigger: { trigger: item, start: "top 85%", toggleActions: "play none none none" },
            opacity: 0, y: 50, duration: 1, ease: "power2.out"
        });
        const activityImg = item.querySelector(".activity__item-image img");
        if (activityImg) {
            gsap.from(activityImg, {
                scrollTrigger: { trigger: item, start: "top 80%" },
                scale: 0.8, duration: 1.2, ease: "back.out(1.7)"
            });
        }
    });

    gsap.fromTo(".reports__info-btn", 
        { opacity: 0, scale: 0.5, y: 20 },
        {
            scrollTrigger: { trigger: ".reports__info-reports", start: "top 90%" },
            opacity: 1, scale: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "back.out(1.7)", overwrite: "auto"
        }
    );

    const newsHeader = gsap.timeline();
    newsHeader.from(".breadcrumps__inner", { opacity: 0, x: -10, stagger: 0.1, duration: 0.5 })
              .from(".news__title", { opacity: 0, y: 20, duration: 0.6 }, "-=0.3");

    gsap.from(".news__swiper .news__item", {
        scrollTrigger: {
            trigger: ".news__swiper",
            start: "top 85%",
        },
        opacity: 0,
        y: 30,
        stagger: 0.15,
        duration: 1,
        ease: "power2.out",
        clearProps: "transform, opacity",
        onComplete: () => {
            if (document.querySelector('.news__swiper').swiper) {
                document.querySelector('.news__swiper').swiper.update();
            }
        }
    });

    gsap.from(".contact__bg img", { scale: 1.2, duration: 2, ease: "power2.out" });

    const contactTL = gsap.timeline({ defaults: { ease: "power2.out" } });
    contactTL.from(".breadcrumps__inner li", { opacity: 0, x: -20, stagger: 0.1, duration: 0.5 })
             .from(".contact__title", { opacity: 0, y: 30, duration: 0.7 }, "-=0.3")
             .from(".contact__info-descr", { opacity: 0, y: 20, stagger: 0.15, duration: 0.6 }, "-=0.4")
             .from(".contact__socials", { opacity: 0, y: 20, duration: 0.6 }, "-=0.4")
             .from(".contact__socials-block a", { opacity: 0, scale: 0.5, stagger: 0.1, duration: 0.5, ease: "back.out(1.7)" }, "-=0.2");

    gsap.from(".contact__form-page", {
        opacity: 0, x: 50, duration: 1, ease: "power3.out", delay: 0.5
    });

    gsap.from(".map__inner", {
        scrollTrigger: { trigger: ".map", start: "top 80%" },
        opacity: 0, y: 40, duration: 1, ease: "power2.out"
    });

    const heroTL = gsap.timeline({ defaults: { ease: "power3.out", duration: 1 } });
    heroTL.from(".hero__slide-bg img", { scale: 1.3, duration: 2.5 })
          .from(".hero__slide-logo", { opacity: 0, y: 50 }, "-=1.5")
          .from(".hero__slide-btn", { opacity: 0, y: 30 }, "-=1.2");

    document.querySelectorAll(".results__item-name span").forEach(item => {
        gsap.from(item, {
            scrollTrigger: { trigger: ".results", start: "top 75%" },
            innerText: 0, duration: 2, snap: { innerText: 1 }, ease: "power1.out"
        });
    });

    if (document.querySelector(".partner-slider-inner")) {
        gsap.to(".partner-slider-inner", { xPercent: -50, repeat: -1, duration: 20, ease: "none" });
    }

    gsap.utils.toArray(".partners__block").forEach((block) => {
        gsap.from(block.querySelectorAll(".partners__image"), {
            scrollTrigger: { trigger: block, start: "top 85%" },
            opacity: 0, scale: 0.8, y: 20, stagger: { amount: 1, grid: "auto", from: "start" }, duration: 0.6, ease: "power2.out"
        });
    });

    const feedbackTL = gsap.timeline({
        scrollTrigger: { trigger: ".feedback", start: "top 70%" }
    });
    feedbackTL.from(".feedback__image", { x: -50, opacity: 0, duration: 1, ease: "power2.out" })
              .from(".feedback__form", { x: 50, opacity: 0, duration: 1, ease: "power2.out" }, "-=0.8");

    const supportTL = gsap.timeline();
    supportTL.from(".support__content > *", { y: 30, opacity: 0, stagger: 0.2, duration: 0.8, ease: "power2.out" })
             .from(".support__image", { scale: 0.9, opacity: 0, duration: 1 }, "-=0.5")
             .from(".support__mono", { y: 40, opacity: 0, duration: 0.8, ease: "back.out(1.7)" }, "-=0.3");

    document.querySelectorAll(".support__info-copy").forEach(btn => {
        btn.addEventListener("click", function() {
            const textToCopy = this.parentElement.innerText.trim();
            navigator.clipboard.writeText(textToCopy).then(() => {
                gsap.to(this, { scale: 1.3, duration: 0.2, yoyo: true, repeat: 1, ease: "power1.inOut" });
            });
        });
    });
}