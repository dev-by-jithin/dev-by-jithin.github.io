const header = document.querySelector("header");
const navbar = document.querySelector(".nav-links");

window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
        header.classList.add("z-up");

        if (navbar.classList.contains("show")) {
            header.classList.add("z-up");
        }

    } else {
        if (navbar.classList.contains("show")) {
            header.classList.add("z-up");
        } else {
            header.classList.remove("z-up");
        }
    }
});


document.querySelector('.toggle').addEventListener('click', function () {
    this.classList.toggle("active");
    navbar.classList.toggle("show");
    if (navbar.classList.contains("show")) {
        header.classList.add("z-up");
    } else {
        if (window.scrollY < 100) {
            header.classList.remove("z-up");
        }

    }
});