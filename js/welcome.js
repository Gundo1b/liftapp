let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function showSlide(index) {
    slides.forEach((slide, i) => {
        if(i === index){
            slide.classList.add('active');
        } else {
            slide.classList.remove('active');
        }
    });
}

function gotoNextSlide() {
    if (currentSlide === slides.length - 1) {
        gotoLogin();
    } else {
        currentSlide++;
        showSlide(currentSlide);
    }
}

// Initialize the first slide as active on page load
showSlide(currentSlide);

function gotoLogin() {
    window.location.href = 'aouth/login.html';
}
