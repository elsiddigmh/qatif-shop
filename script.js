
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav a');
const form = document.querySelector('.contact-form');
const formMessage = document.querySelector('.form-message');
const yearEl = document.getElementById('year');

if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
}

if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
        nav.classList.toggle('open');
        navToggle.classList.toggle('active');
    });

    navLinks.forEach((link) => {
        link.addEventListener('click', () => {
            nav.classList.remove('open');
            navToggle.classList.remove('active');
        });
    });
}

if (form) {
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = form.name.value.trim();
        const phone = form.phone.value.trim();
        const message = form.message.value.trim();
        const phonePattern = /^(\+?966|0)?5\d{8}$/;

        if (name.length < 3) {
            showFormMessage('error', 'الرجاء إدخال اسم صالح مكون من 3 أحرف على الأقل.');
            return;
        }

        if (!phonePattern.test(phone)) {
            showFormMessage('error', 'يرجى إدخال رقم جوال سعودي بصيغة صحيحة.');
            return;
        }

        if (message.length < 10) {
            showFormMessage('error', 'من فضلك اكتب رسالة أو طلب مكون من 10 أحرف على الأقل.');
            return;
        }

        showFormMessage('success', 'تم إرسال طلبك بنجاح! سنتواصل معك في أقرب وقت.');
        form.reset();
    });
}

function showFormMessage(type, text) {
    if (!formMessage) return;
    formMessage.textContent = text;
    formMessage.className = `form-message ${type}`;
}

const sections = document.querySelectorAll('.section');
if ('IntersectionObserver' in window && sections.length) {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.2 }
    );

    sections.forEach((section) => observer.observe(section));
} else {
    sections.forEach((section) => section.classList.add('visible'));
}
