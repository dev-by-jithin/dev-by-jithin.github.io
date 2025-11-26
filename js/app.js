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

function generateConfetti(confettiConfigObj, canvasId = "confetti") {
    const canvasEl = document.querySelector(`#${canvasId}`);

    if (canvasEl === null) {
        console.error(`Canvas with id "${canvasId}" not found.`);
        return;
    };

    const ctx = canvasEl.getContext("2d");
    const confettiArray = [];

    function resizeCanvas() {
        canvasEl.width = window.innerWidth;
        canvasEl.height = window.innerHeight;
    };
    resizeCanvas();

    window.addEventListener("resize", resizeCanvas);

    function createConfetti() {
        for (let i = 0; i < confettiConfigObj.quantity; i += 1) {
            confettiArray.push({
                x: Math.random() * canvasEl.width,
                y: Math.random() * canvasEl.height - canvasEl.height,
                size: Math.random() * (confettiConfigObj.maxSize - confettiConfigObj.minSize) + confettiConfigObj.minSize,
                color: confettiConfigObj.colorsArray[Math.floor(Math.random() * confettiConfigObj.colorsArray.length)],
                velocityX: Math.random() * 2 - 1,
                velocityY: Math.random() * 3 + 2,
                rotation: Math.random() * 360,
                rotationSpeed: Math.random() * 10 - 5,
                shape: Math.floor(Math.random() * 3),
                depth: Math.random() * 3
            });
        };
    };

    function drawConfetti(confettiObj) {
        ctx.save();
        ctx.translate(confettiObj.x, confettiObj.y);
        ctx.rotate((confettiObj.rotation * Math.PI) / 180);
        ctx.scale(1, Math.cos(confettiObj.rotation * Math.PI / 180));
        ctx.fillStyle = confettiObj.color;

        if (confettiObj.shape === 0) {
            ctx.fillRect(-confettiObj.size / 2, -confettiObj.size / 2, confettiObj.size, confettiObj.size);
        } else if (confettiObj.shape === 1) {
            ctx.beginPath();
            ctx.arc(0, 0, confettiObj.size / 2, 0, Math.PI * 2);
            ctx.fill();
        } else {
            ctx.beginPath();
            ctx.moveTo(-confettiObj.size / 2, confettiObj.size / 2);
            ctx.lineTo(confettiObj.size / 2, confettiObj.size / 2);
            ctx.lineTo(confettiObj.size / 4, -confettiObj.size / 2);
            ctx.lineTo(-confettiObj.size / 4, -confettiObj.size / 2);
            ctx.closePath();
            ctx.fill();
        };
        ctx.restore();
    };

    function animateConfetti() {
        ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);

        for (let confettiObj of confettiArray) {
            confettiObj.velocityY += confettiConfigObj.velocity;
            confettiObj.x += Math.sin(confettiObj.y / 30) * 0.5;
            confettiObj.rotation += confettiObj.rotationSpeed;
            confettiObj.x += confettiObj.velocityX;
            confettiObj.y += confettiObj.velocityY;

            if (confettiObj.y > canvasEl.height) {
                if (confettiConfigObj.infiniteLoop === true) {
                    confettiObj.y = -10;
                    confettiObj.x = Math.random() * canvasEl.width;
                    confettiObj.velocityY = Math.random() * 3 + 2;
                    confettiObj.size = Math.random() * (confettiConfigObj.maxSize - confettiConfigObj.minSize) + confettiConfigObj.minSize;
                    confettiObj.color = confettiConfigObj.colorsArray[Math.floor(Math.random() * confettiConfigObj.colorsArray.length)];
                    confettiObj.depth = Math.random() * 3;
                    confettiObj.rotation = Math.random() * 360;
                } else {
                    confettiArray.splice(confettiArray.indexOf(confettiObj), 1);
                };
            };

            ctx.globalAlpha = (1 - confettiObj.depth / 3) * confettiConfigObj.minOpacity + Math.random() * (confettiConfigObj.maxOpacity - confettiConfigObj.minOpacity);

            drawConfetti(confettiObj);
        };

        ctx.globalAlpha = 1;
        requestAnimationFrame(animateConfetti);
    };

    createConfetti();
    animateConfetti();
};

    
$("#contactForm").validate({
    rules: {
        name: {
            required: true,
            minlength: 2
        },
        email: {
            required: true,
            email: true
        },
        message: {
            required: true,
            minlength: 10
        }
    },
    messages: {
        name: {
            required: "Please enter your name",
            minlength: "Your name must consist of at least 2 characters"
        },
        email: {
            required: "Please enter your email address",
            email: "Please enter a valid email address"
        },
        message: {
            required: "Please enter a message",
            minlength: "Your message must be at least 10 characters long"
        }
    },
    submitHandler: function(form) {
        // This function runs when the form is valid
        // alert("Thank you! I will revert you soon");
        // You can add your AJAX submission code here, e.g.:
        // form.submit();
        document.querySelector('.alert-success').style.display="inline-flex";

        generateConfetti({
            colorsArray: ["rgba(243, 130, 137, 1)", "rgba(255, 207, 159, 1)", "rgba(248, 248, 160, 1)", "rgba(147, 255, 171, 1)", "rgba(157, 209, 248, 1)", "rgba(195, 154, 250, 1)"],
            velocity: 0.025,
            quantity: 750,
            minSize: 4,
            maxSize: 12,
            minOpacity: 0.75,
            maxOpacity: 1,
            infiniteLoop: false
        }, "confetti");
        
        return false;
        
    }
});


