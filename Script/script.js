// Initialize variables
let currentStep = 1;
const totalSteps = 8;
let userName = "My Love";


// Initialize particles.js
particlesJS("particles-js", {
    "particles": {
        "number": {
            "value": 40,
            "density": {
                "enable": true,
                "value_area": 800
            }
        },
        "color": {
            "value": "#f06292"
        },
        "shape": {
            "type": "circle",
            "stroke": {
                "width": 0,
                "color": "#000000"
            }
        },
        "opacity": {
            "value": 0.6,
            "random": true,
            "anim": {
                "enable": true,
                "speed": 1,
                "opacity_min": 0.1,
                "sync": false
            }
        },
        "size": {
            "value": 6,
            "random": true,
            "anim": {
                "enable": true,
                "speed": 2,
                "size_min": 0.1,
                "sync": false
            }
        },
        "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#f8bbd0",
            "opacity": 0.4,
            "width": 1.5
        },
        "move": {
            "enable": true,
            "speed": 1.5,
            "direction": "none",
            "random": true,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
                "enable": true,
                "rotateX": 600,
                "rotateY": 1200
            }
        }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": {
                "enable": true,
                "mode": "grab"
            },
            "onclick": {
                "enable": true,
                "mode": "push"
            },
            "resize": true
        },
        "modes": {
            "grab": {
                "distance": 160,
                "line_linked": {
                    "opacity": 1
                }
            },
            "push": {
                "particles_nb": 6
            }
        }
    },
    "retina_detect": true
});

// Initialize GSAP animations
document.addEventListener('DOMContentLoaded', function() {
    showStep(currentStep);
    createPetals();
    
    // Animate the heart message
    const heartMessage = document.getElementById('heartMessage');
    document.getElementById('interactiveHeart').addEventListener('click', function() {
        setTimeout(() => {
            heartMessage.classList.add('show');
        }, 500);
    });
    
    // Set countdown (example: next 24 hours)
    setCountdown();
});

// Function to show current step
function showStep(step) {
    // Hide all steps
    document.querySelectorAll('.step').forEach(el => {
        el.classList.remove('active');
    });
    
    // Show current step
    const currentStepEl = document.getElementById(`step${step}`);
    currentStepEl.classList.add('active');
    
    // Update progress bar
    const progressPercentage = ((step - 1) / (totalSteps - 1)) * 100;
    gsap.to("#progressBarLine", {
        width: `${progressPercentage}%`,
        duration: 1,
        ease: "power2.out"
    });
    
    // Special animations for each step
    switch(step) {
        case 1:
            // Animate envelope
            gsap.from("#envelope", {
                y: 100,
                opacity: 0,
                duration: 1,
                ease: "back.out(1.7)"
            });
            break;
        case 2:
            // Animate input
            gsap.from(".name-input", {
                scale: 0.5,
                opacity: 0,
                duration: 0.8,
                ease: "elastic.out(1, 0.5)"
            });
            break;
        case 3:
            // Animate heart
            gsap.from("#interactiveHeart", {
                scale: 0.5,
                rotation: 180,
                duration: 1,
                ease: "elastic.out(1, 0.5)"
            });
            document.getElementById('heartName').textContent = userName;
            break;
        case 4:
            // Animate polaroids
            gsap.from(".polaroid", {
                y: 100,
                opacity: 0,
                stagger: 0.2,
                duration: 1,
                ease: "back.out(1.7)"
            });
            break;
        case 5:
            // Create fireworks
            createFireworks();
            // Animate final heart
            gsap.from(".heart", {
                scale: 0,
                duration: 1.5,
                ease: "elastic.out(1, 0.5)"
            });
            break;
        case 6:
            // Type out message
            typeMessage();
            // Animate photo frame
            gsap.from(".photo-frame", {
                y: 50,
                rotation: -10,
                opacity: 0,
                duration: 1,
                ease: "back.out(1.7)"
            });
            break;
    }
}

// Function to go to next step
function nextStep() {
    if (currentStep < totalSteps) {
        currentStep++;
        showStep(currentStep);
        
        // Open envelope if on step 1
        if (currentStep === 2) {
            document.getElementById('envelope').classList.add('open');
        }
    }
}

// Function to save name
function saveName() {
    const nameInput = document.getElementById('nameInput').value.trim();
    if (nameInput) {
        userName = nameInput;
        document.getElementById('displayName').textContent = userName;
        document.getElementById('finalName').textContent = userName;
        document.getElementById('heartName').textContent = userName;
        nextStep();
        
        // Animate success
        gsap.to(".name-input", {
            backgroundColor: "#e8f5e9",
            borderColor: "#81c784",
            duration: 0.5,
            yoyo: true,
            repeat: 1
        });
    } else {
        // Animate error
        gsap.to(".name-input", {
            backgroundColor: "#ffebee",
            borderColor: "#e53935",
            duration: 0.5,
            yoyo: true,
            repeat: 1
        });
        alert("Please enter your beautiful name to continue");
    }
}

// Function to create floating hearts
function createHearts() {
    const container = document.getElementById('floatingHearts');
    const colors = ['#ff4081', '#f06292', '#f8bbd0', '#d81b60', '#ff80ab'];
    
    for (let i = 0; i < 25; i++) {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        heart.innerHTML = '❤';
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.color = colors[Math.floor(Math.random() * colors.length)];
        heart.style.animationDuration = `${3 + Math.random() * 3}s`;
        heart.style.fontSize = `${20 + Math.random() * 25}px`;
        heart.style.top = `${60 + Math.random() * 30}%`;
        
        container.appendChild(heart);
        
        // Remove heart after animation completes
        setTimeout(() => {
            heart.remove();
        }, 4000);
    }
    
    // Animate heart click
    gsap.to("#interactiveHeart", {
        scale: 1.3,
        duration: 0.3,
        yoyo: true,
        repeat: 1
    });
}

// Function to create falling petals
function createPetals() {
    const container = document.getElementById('petalsContainer');
    const petalColors = ['#ffcdd2', '#f8bbd0', '#fce4ec', '#f48fb1'];
    
    for (let i = 0; i < 15; i++) {
        const petal = document.createElement('div');
        petal.classList.add('petal');
        
        // Random petal shape
        const petalType = Math.floor(Math.random() * 3);
        let petalShape;
        switch(petalType) {
            case 0:
                petalShape = "M50,0 C60,15 60,30 50,45 C40,30 40,15 50,0";
                break;
            case 1:
                petalShape = "M50,0 C70,20 70,40 50,50 C30,40 30,20 50,0";
                break;
            case 2:
                petalShape = "M50,0 C55,10 55,25 50,35 C45,25 45,10 50,0";
                break;
        }
        
        petal.style.width = `${10 + Math.random() * 20}px`;
        petal.style.height = `${10 + Math.random() * 20}px`;
        petal.style.left = `${Math.random() * 100}%`;
        petal.style.top = `-20px`;
        petal.style.fill = petalColors[Math.floor(Math.random() * petalColors.length)];
        petal.style.opacity = 0.7 + Math.random() * 0.3;
        
        // Create SVG for petal
        petal.innerHTML = `
            <svg viewBox="0 0 100 50" width="100%" height="100%">
                <path d="${petalShape}" fill="${petalColors[Math.floor(Math.random() * petalColors.length)]}" />
            </svg>
        `;
        
        container.appendChild(petal);
        
        // Animate petal falling
        const duration = 10 + Math.random() * 20;
        const delay = Math.random() * 15;
        const sway = 50 + Math.random() * 100;
        
        gsap.to(petal, {
            y: window.innerHeight + 50,
            x: `+=${sway}`,
            rotation: 360,
            duration: duration,
            delay: delay,
            ease: "none",
            onComplete: () => {
                // Reset petal to top
                petal.style.top = `-20px`;
                petal.style.left = `${Math.random() * 100}%`;
                // Repeat animation
                gsap.to(petal, {
                    y: window.innerHeight + 50,
                    x: `+=${sway}`,
                    rotation: 360,
                    duration: duration,
                    ease: "none",
                    onComplete: () => {
                        petal.remove();
                    }
                });
            }
        });
    }
}

// Function to type out message
function typeMessage() {
    const messages = [
        "Hey Birthday Girl, 🎂✨",
        "Oru sila peru namma life-la romba special person-na iruppanga... 💖",
        "Avangala paakum pothum sari !, Avangala pathi nenaikkum pothum sari ! 😊💕",
        "Manasukkulla avvolavu Happy-ah irukkum... 🌸💫",
        "Avanga happy-ya irukkuratha pathe, Nammaloda pirachanaiyalaam marathu nammalum Happy aayduvom... 😇🤍",
        "Aana ithula irukka Beauty ennanaa..? ✨💭",
        "Antha special person-ke theriyathu, Namma santhosatha paathu innoru ithaiyam santhosham paduthunu.. ! 💓🥹",
        "Antha ithaiyathukku vena athu theriyama irukkalaam, Aana Intha ithaiyam enrum avalai marakkathu.. ! 💞🌷",
        "Kadaisi varaikkum entha ithir paarpukalum illama antha ithaiyam kathurukkum.. ! 🕊❤",
        "So eppavume Happy-ah iru 😊",
        "Ellame nallapadiyaa nadakkum 🙏✨",
        "Happy Birthday, Sasmitha! ❤🎉"
    ];
    
    const typingText = document.getElementById('typingText');
    let messageIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentMessage = messages[messageIndex];
        
        if (isDeleting) {
            typingText.innerHTML = currentMessage.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingText.innerHTML = currentMessage.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentMessage.length) {
            isDeleting = true;
            typingSpeed = 1500; // Pause at end of message
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            messageIndex = (messageIndex + 1) % messages.length;
            typingSpeed = 500; // Pause before next message
        }
        
        setTimeout(type, typingSpeed);
    }
    
    // Start typing after a short delay
    setTimeout(() => {
        document.getElementById('typedMessage').classList.add('show');
        type();
    }, 500);
}

// Function to create fireworks
function createFireworks() {
    // Create initial fireworks
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            createFirework();
        }, i * 800);
    }
    
    // Continue with occasional fireworks
    setInterval(() => {
        if (Math.random() > 0.7) {
            createFirework();
        }
    }, 2000);
}

function createFirework() {
    const colors = ['#ff4081', '#f06292', '#f8bbd0', '#d81b60', '#ff80ab', '#ffcdd2'];
    
    // Create firework center
    const firework = document.createElement('div');
    firework.classList.add('firework');
    firework.style.color = colors[Math.floor(Math.random() * colors.length)];
    firework.style.setProperty('--x', `${Math.random() * window.innerWidth}px`);
    firework.style.setProperty('--y', `${Math.random() * window.innerHeight * 0.8}px`);
    firework.style.setProperty('--x-end', `${(Math.random() - 0.5) * 20}px`);
    firework.style.setProperty('--y-end', `${(Math.random() - 0.5) * 20}px`);
    
    document.body.appendChild(firework);
    
    // Create particles
    setTimeout(() => {
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.classList.add('firework-particle');
            particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            particle.style.left = firework.style.getPropertyValue('--x');
            particle.style.top = firework.style.getPropertyValue('--y');
            particle.style.setProperty('--tx', `${Math.cos(i * 0.2) * 100}px`);
            particle.style.setProperty('--ty', `${Math.sin(i * 0.2) * 100}px`);
            
            document.body.appendChild(particle);
            
            // Remove after animation
            setTimeout(() => {
                particle.remove();
            }, 1000);
        }
        
        firework.remove();
    }, 1000);
}

// Function to set countdown
function setCountdown() {
    // Set target date (next 24 hours from now)
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 1);
    
    function updateCountdown() {
        const now = new Date();
        const diff = targetDate - now;
        
        if (diff <= 0) {
            document.getElementById('countdown').innerHTML = "<span>Happy Birthday!</span>";
            return;
        }
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}



// Function to share on social media
function shareOnSocial(platform) {
    let url = '';
    const text = `Check out this beautiful birthday wish for ${userName}! ${window.location.href}`;
    
    switch(platform) {
        case 'facebook':
            url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
            break;
        case 'twitter':
            url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
            break;
        case 'whatsapp':
            url = `https://wa.me/?text=${encodeURIComponent(text)}`;
            break;
    }
    
    window.open(url, '_blank', 'width=600,height=400');
    
    // Animate share button
    gsap.to(`.social-icon:nth-child(${['facebook', 'twitter', 'whatsapp'].indexOf(platform) + 1})`, {
        scale: 1.3,
        duration: 0.3,
        yoyo: true,
        repeat: 1
    });
}

// Global variables
      let candlesBlown = 0;
      const totalCandles = 5;
      let allCandlesBlown = false;

      // Initialize the page when it loads
      document.addEventListener("DOMContentLoaded", function () {
        createCandles();
        createBalloons();
        createConfetti();
        createDecorations();

        // Add event listeners for candle interaction
        document.querySelectorAll(".candle").forEach((candle) => {
          candle.addEventListener("click", blowOutCandle);
          candle.addEventListener("touchstart", blowOutCandle); // Better for mobile
          candle.addEventListener("mouseover", function (e) {
            if (e.buttons === 0) {
              // Only trigger on hover when not clicking
              blowOutCandle.call(this);
            }
          });
        });

        // For better mobile experience with touch
        document.addEventListener("touchmove", function (e) {
          const touch = e.touches[0];
          const element = document.elementFromPoint(
            touch.clientX,
            touch.clientY
          );
          if (
            element &&
            element.classList.contains("candle") &&
            !element.classList.contains("blown")
          ) {
            blowOutCandle.call(element);
          }
        });

        // Optional: Listen for keyboard input
        document.addEventListener("keypress", function (e) {
          if (e.key === "b" || e.key === "B") {
            // Press 'b' to simulate blowing
            blowRandomCandle();
          }
        });
      });

      // Create candles for the cake
      function createCandles() {
        const candleContainer = document.getElementById("candleContainer");

        for (let i = 0; i < totalCandles; i++) {
          const candle = document.createElement("div");
          candle.className = "candle";

          const flame = document.createElement("div");
          flame.className = "flame";

          const smoke = document.createElement("div");
          smoke.className = "smoke";

          candle.appendChild(flame);
          candle.appendChild(smoke);
          candleContainer.appendChild(candle);
        }
      }

      // Create floating balloons
      function createBalloons() {
        const colors = ["#ff66b3", "#66ccff", "#ff9966", "#99ff66", "#cc99ff"];
        const numBalloons = 15;

        for (let i = 0; i < numBalloons; i++) {
          const balloon = document.createElement("div");
          balloon.className = "";
          balloon.style.backgroundColor =
            colors[Math.floor(Math.random() * colors.length)];
          balloon.style.left = `${Math.random() * 100}%`;
          balloon.style.animationDuration = `${15 + Math.random() * 10}s`;
          balloon.style.animationDelay = `${Math.random() * 5}s`;
          document.body.appendChild(balloon);
        }
      }

      // Create confetti pieces
      function createConfetti() {
        const colors = ["#ffcc00", "#ff66b3", "#66ccff", "#ff9966", "#99ff66"];
        const numConfetti = 50;

        for (let i = 0; i < numConfetti; i++) {
          const confetti = document.createElement("div");
          confetti.className = "confetti";
          confetti.style.backgroundColor =
            colors[Math.floor(Math.random() * colors.length)];
          confetti.style.left = `${Math.random() * 100}%`;
          confetti.style.width = `${5 + Math.random() * 5}px`;
          confetti.style.height = `${5 + Math.random() * 10}px`;
          confetti.style.animationDuration = `${3 + Math.random() * 4}s`;
          confetti.style.animationDelay = `${Math.random() * 5}s`;
          document.body.appendChild(confetti);
        }
      }

      // Create cake decorations
      function createDecorations() {
        const cake = document.querySelector(".cake");
        const colors = ["#ff3366", "#ffcc00", "#66ccff", "#ff9966", "#99ff66"];
        const numDecorations = 10;

        for (let i = 0; i < numDecorations; i++) {
          const decoration = document.createElement("div");
          decoration.className = "decoration";
          decoration.style.backgroundColor =
            colors[Math.floor(Math.random() * colors.length)];
          decoration.style.top = `${-20 - Math.random() * 50}px`;
          decoration.style.left = `${Math.random() * 100}%`;
          cake.appendChild(decoration);
        }
      }

      // Blow out a candle when clicked or hovered
      function blowOutCandle() {
        if (!this.classList.contains("blown")) {
          this.classList.add("blown");
          candlesBlown++;

          // Create sparkle effect
          createSparkleEffect(this);

          // Check if all candles are blown
          if (candlesBlown === totalCandles && !allCandlesBlown) {
            allCandlesBlown = true;
            setTimeout(showWishMessage, 1000);
          }
        }
      }

      // Simulate blowing a random candle
      function blowRandomCandle() {
        const unblownCandles = Array.from(
          document.querySelectorAll(".candle:not(.blown)")
        );
        if (unblownCandles.length > 0) {
          const randomCandle =
            unblownCandles[Math.floor(Math.random() * unblownCandles.length)];
          blowOutCandle.call(randomCandle);
        }
      }

      // Create sparkle effect around the blown candle
      function createSparkleEffect(candle) {
        const numSparkles = 10;
        const candleRect = candle.getBoundingClientRect();

        for (let i = 0; i < numSparkles; i++) {
          const sparkle = document.createElement("div");
          sparkle.className = "sparkle";
          sparkle.style.left = `${
            candleRect.left + Math.random() * candleRect.width
          }px`;
          sparkle.style.top = `${
            candleRect.top + Math.random() * (candleRect.height / 2)
          }px`;
          sparkle.style.animation = `sparkle ${
            0.5 + Math.random() * 0.5
          }s forwards`;
          document.body.appendChild(sparkle);

          // Remove sparkle after animation
          setTimeout(() => {
            sparkle.remove();
          }, 1000);
        }
      }

      // Show the wish message when all candles are blown
      function showWishMessage() {
        document.getElementById("wishMessage").classList.add("show");
        createFireworks();
      }

      // Close the wish message
      function closeWishMessage() {
        document.getElementById("wishMessage").classList.remove("show");
      }

      // Create fireworks effect
      function createFireworks() {
        const numFireworks = 10;
        const colors = ["#ff3366", "#ffcc00", "#66ccff", "#ff9966", "#99ff66"];

        for (let i = 0; i < numFireworks; i++) {
          setTimeout(() => {
            const firework = document.createElement("div");
            firework.className = "firework";
            firework.style.left = `${10 + Math.random() * 80}%`;
            firework.style.top = `${10 + Math.random() * 60}%`;
            firework.style.backgroundColor =
              colors[Math.floor(Math.random() * colors.length)];
            firework.style.animation = `firework ${
              1 + Math.random()
            }s forwards`;
            document.body.appendChild(firework);

            // Remove firework after animation
            setTimeout(() => {
              firework.remove();
            }, 2000);
          }, i * 300);
        }
      }