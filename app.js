const header = document.querySelector("header");

window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
        header.classList.add("z-up");
    } else {
        header.classList.remove("z-up");
    }
});