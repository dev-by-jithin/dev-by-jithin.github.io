const header = document.querySelector("header"),
	navbar = document.querySelector(".nav-links");
function generateConfetti(confettiConfigObj, canvasId = "confetti") {
	const canvasEl = document.querySelector(`#${canvasId}`);
	if (null === canvasEl) 
		return void console.error(`Canvas with id "${canvasId}" not found.`);
	
	const ctx = canvasEl.getContext("2d"),
		confettiArray = [];
	function resizeCanvas() {
		(canvasEl.width = window.innerWidth),
		(canvasEl.height = window.innerHeight);
	}
	function createConfetti() {
		for (let i = 0; i < confettiConfigObj.quantity; i += 1) 
			confettiArray.push({
				x: Math.random() * canvasEl.width,
				y: Math.random() * canvasEl.height - canvasEl.height,
				size: Math.random() * (confettiConfigObj.maxSize - confettiConfigObj.minSize) + confettiConfigObj.minSize,
				color: confettiConfigObj.colorsArray[Math.floor(Math.random() * confettiConfigObj.colorsArray.length)],
				velocityX: 2 * Math.random() - 1,
				velocityY: 3 * Math.random() + 2,
				rotation: 360 * Math.random(),
				rotationSpeed: 10 * Math.random() - 5,
				shape: Math.floor(3 * Math.random()),
				depth: 3 * Math.random()
			});
		
	}
	function drawConfetti(confettiObj) {
		ctx.save(),
		ctx.translate(confettiObj.x, confettiObj.y),
		ctx.rotate((confettiObj.rotation * Math.PI) / 180),
		ctx.scale(1, Math.cos((confettiObj.rotation * Math.PI) / 180)),
		(ctx.fillStyle = confettiObj.color),
		0 === confettiObj.shape ? ctx.fillRect(- confettiObj.size / 2, - confettiObj.size / 2, confettiObj.size, confettiObj.size) : 1 === confettiObj.shape ? (ctx.beginPath(), ctx.arc(0, 0, confettiObj.size / 2, 0, 2 * Math.PI), ctx.fill()) : (ctx.beginPath(), ctx.moveTo(- confettiObj.size / 2, confettiObj.size / 2), ctx.lineTo(confettiObj.size / 2, confettiObj.size / 2), ctx.lineTo(confettiObj.size / 4, - confettiObj.size / 2), ctx.lineTo(- confettiObj.size / 4, - confettiObj.size / 2), ctx.closePath(), ctx.fill()),
		ctx.restore();
	}
	function animateConfetti() {
		ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
		for (let confettiObj of confettiArray) 
			(confettiObj.velocityY += confettiConfigObj.velocity),
			(confettiObj.x += 0.5 * Math.sin(confettiObj.y / 30)),
			(confettiObj.rotation += confettiObj.rotationSpeed),
			(confettiObj.x += confettiObj.velocityX),
			(confettiObj.y += confettiObj.velocityY),
			confettiObj.y > canvasEl.height && (!0 === confettiConfigObj.infiniteLoop ? ((confettiObj.y = -10), (confettiObj.x = Math.random() * canvasEl.width), (confettiObj.velocityY = 3 * Math.random() + 2), (confettiObj.size = Math.random() * (confettiConfigObj.maxSize - confettiConfigObj.minSize) + confettiConfigObj.minSize), (confettiObj.color = confettiConfigObj.colorsArray[Math.floor(Math.random() * confettiConfigObj.colorsArray.length)]), (confettiObj.depth = 3 * Math.random()), (confettiObj.rotation = 360 * Math.random())) : confettiArray.splice(confettiArray.indexOf(confettiObj), 1)),
			(ctx.globalAlpha =( 1 - confettiObj.depth / 3) * confettiConfigObj.minOpacity + Math.random() * (confettiConfigObj.maxOpacity - confettiConfigObj.minOpacity)),
			drawConfetti(confettiObj);
		
		(ctx.globalAlpha = 1),
		requestAnimationFrame(animateConfetti);
	}
	resizeCanvas(),
	window.addEventListener("resize", resizeCanvas),
	createConfetti(),
	animateConfetti();
}
window.addEventListener("scroll", () => {
	window.scrollY > 100 ? (header.classList.add("z-up"), navbar.classList.contains("show") && header.classList.add("z-up")) : navbar.classList.contains("show") ? header.classList.add("z-up") : header.classList.remove("z-up");
}),
document.querySelector(".toggle").addEventListener("click", function () {
	this.classList.toggle("active"),
	navbar.classList.toggle("show"),
	navbar.classList.contains("show") ? header.classList.add("z-up") : window.scrollY < 100 && header.classList.remove("z-up");
}),
$("#contactForm").validate({
  rules: {
    // NOTE: The 'name' attributes in rules must match your HTML
    Name: {
      required: true,
      minlength: 2
    },
    Email: {
      required: true,
      email: true
    },
    Message: {
      required: true,
      minlength: 10
    }
  },
  messages: {
    Name: {
      required: "Please enter your name",
      minlength: "Your name must consist of at least 2 characters"
    },
    Email: {
      required: "Please enter your email address",
      email: "Please enter a valid email address"
    },
    Message: {
      required: "Please enter a message",
      minlength: "Your message must be at least 10 characters long"
    }
  },
  // --- REVISED SUBMIT HANDLER ---
  submitHandler: function (form) {
    const $form = $(form);
    const formUrl = $form.attr("action"); // Get the Google Apps Script URL
    const formData = $form.serialize();   // Serialize the form data for POST request
    
    // Disable the button and show a loading state (optional)
    const $submitButton = $form.find('#send');
    $submitButton.prop('disabled', true).text('Sending...'); 

    // Send data via AJAX
    $.ajax({
      url: formUrl,
      type: "POST",
      data: formData,
      dataType: "json", // Expecting a JSON response from the Apps Script
      success: function (response) {
        // --- Success Actions ---
        
        // 1. Show the success alert and reset the form
        document.querySelector(".alert-success").style.display = "inline-flex";
        form.reset(); 
        
        // 2. Trigger the Confetti
        generateConfetti({
          colorsArray: [
            "rgba(243, 130, 137, 1)",
            "rgba(255, 207, 159, 1)",
            "rgba(248, 248, 160, 1)",
            "rgba(147, 255, 171, 1)",
            "rgba(157, 209, 248, 1)",
            "rgba(195, 154, 250, 1)",
          ],
          velocity: 0.025,
          quantity: 750,
          minSize: 4,
          maxSize: 12,
          minOpacity: 0.75,
          maxOpacity: 1,
          infiniteLoop: false // Use !1 for boolean false in shorthand JS if preferred
        }, "confetti");
        
        // 3. Reset button state after a small delay (optional)
        setTimeout(() => {
            $submitButton.prop('disabled', false).text('Send');
        }, 3000); 

      },
      error: function (xhr, status, error) {
        // --- Error Handling (Optional) ---
        console.error("Form submission error:", status, error);
        alert("There was an issue sending your message. Please try again.");
        $submitButton.prop('disabled', false).text('Send'); // Re-enable button
      }
    });

    // IMPORTANT: Return FALSE to prevent the default form submission (page refresh)
    return false;
  }
});

