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