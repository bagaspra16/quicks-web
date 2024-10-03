        document.addEventListener('DOMContentLoaded', function () {
            const sidebar = document.getElementById('offcanvasSidebar');
            const toggleButton = document.getElementById('navbarToggle');
            let sidebarOpen = false;

            function toggleSidebar() {
                sidebarOpen = !sidebarOpen;
                sidebar.classList.toggle('open', sidebarOpen);
                toggleButton.classList.toggle('toggled', sidebarOpen);
            }

            toggleButton.addEventListener('click', function () {
                toggleSidebar();
            });

            window.showSection = function (sectionId) {
                const sections = document.querySelectorAll('.container');
                sections.forEach(section => {
                    if (section.id === sectionId) {
                        section.classList.remove('d-none');
                    } else {
                        section.classList.add('d-none');
                    }
                });
            };
        });

        const questions = [            
            "How are you feeling right now?",
            "What did you enjoy today?",
            "Did you try something new today?",
            "What's your next big goal?",
            "Are you happy with your progress today?",
            "What are you grateful for today?",
            "Have you taken a short break yet?",
            "Did you read something interesting today?",
            "What made you smile today?",
            "Did you discover anything fun today?",
            "Have you learned anything exciting today?",
            "What made today different for you?",
            "Did you accomplish something special today?",
            "How did you spend your free time?",
            "What inspired you today?",
            "Did you help anyone today?",
            "What was your best moment today?",
            "What was the hardest part of today?",
            "Did you find any new challenges?",
            "What was your focus today?",
            "What do you feel proud of today?",
            "Did you complete your to-do list?",
            "What's your plan for tomorrow?",
            "How did you start your morning?",
            "What did you enjoy doing most?",
            "What surprised you today?",
            "What was your favorite task today?",
            "What made today productive for you?",
            "Did you learn a new skill today?",
            "What did you do for yourself today?",
            "Did you work on any projects today?",
            "How do you feel about today?",
            "Did you stay focused on your goals?",
            "What fun thing did you plan today?",
            "Did you try a new hobby today?",
            "What is your biggest achievement today?",
            "How did you solve problems today?",
            "Did you challenge yourself today?",
            "What did you create today?",
            "How did you relax today?",
            "What motivated you to keep going?",
            "What made today special for you?",
            "How did you manage stress today?",
            "What went well for you today?",
            "Did you share ideas with anyone today?",
            "How was your energy throughout the day?",
            "Did you connect with someone today?",
            "What made today feel successful?",
          ];

          const funFacts = [
            "Did you know? Honey never spoils.",
            "Fun fact: Bananas are berries.",
            "Did you know? Strawberries aren’t berries.",
            "Fun fact: Cows have best friends.",
            "Did you know? Koalas sleep 20 hours daily.",
            "Fun fact: A shrimp's heart is in its head.",
            "Did you know? Seahorses mate for life.",
            "Fun fact: Giraffes sleep for 30 minutes.",
            "Did you know? Polar bear skin is black.",
            "Fun fact: Turtles breathe through their butts.",
            "Did you know? Elephants can't jump.",
            "Fun fact: Sloths move very slowly.",
            "Did you know? Octopuses have three hearts.",
            "Fun fact: Crocodiles can't stick their tongues out.",
            "Did you know? A jellyfish is mostly water.",
            "Fun fact: Cats can't taste sweetness.",
            "Did you know? Frogs drink through their skin.",
            "Fun fact: Snails can sleep for years.",
            "Did you know? Horses sleep standing up.",
            "Fun fact: Kangaroos can't walk backward.",
            "Did you know? Dolphins sleep with one eye open.",
            "Fun fact: Apples float in water.",
            "Did you know? Oysters change gender often.",
            "Fun fact: Starfish have no brains.",
            "Did you know? Penguins can drink salt water.",
            "Fun fact: Mosquitoes love banana eaters.",
            "Did you know? Sea otters hold hands.",
            "Fun fact: A sneeze moves at 100 mph.",
            "Did you know? A group of owls is a parliament.",
            "Fun fact: Octopuses have blue blood.",
            "Did you know? Some frogs can freeze alive.",
            "Fun fact: A woodpecker pecks 20 times per second.",
            "Did you know? Flamingos eat with heads upside down.",
            "Fun fact: Venus has longer days than years.",
            "Did you know? A shrimp's heart is in its head.",
            "Fun fact: Sloths digest food very slowly.",
            "Did you know? Bees can sting other bees.",
            "Fun fact: Frogs have transparent eyelids."
          ];
          
          
          let isQuestion = true;
          let currentIndex = 0;
          let cycles = 0;
          
          function getRandomText() {
            const textArray = isQuestion ? questions : funFacts;
            const text = textArray[currentIndex % textArray.length];
            isQuestion = !isQuestion; // Toggle between questions and fun facts
            currentIndex++;
            return text;
          }
          
          function typeText(text, callback) {
            const futuristicText = document.getElementById('futuristicText');
            futuristicText.style.display = 'inline-block';
            futuristicText.textContent = ''; // Clear current content
            let charIndex = 0;
          
            function typeChar() {
              if (charIndex < text.length) {
                futuristicText.textContent += text.charAt(charIndex);
                charIndex++;
                setTimeout(typeChar, 100); // Typing speed, faster now
              } else {
                setTimeout(callback, 8000); // Hold the text for 8 seconds before backspacing
              }
            }
          
            typeChar(); // Start typing
          }
          
          function backspaceText(callback) {
            const futuristicText = document.getElementById('futuristicText');
            let currentText = futuristicText.textContent;
            let charIndex = currentText.length;
          
            function removeChar() {
              if (charIndex > 0) {
                futuristicText.textContent = currentText.slice(0, --charIndex);
                setTimeout(removeChar, 50); // Backspacing speed, faster now
              } else {
                callback(); // After backspacing, show new text
              }
            }
          
            removeChar(); // Start backspacing
          }
          
          function showNewText() {
            const newText = getRandomText();
            typeText(newText, () => {
              setTimeout(() => {
                backspaceText(() => {
                  cycles++;
                  if (cycles % 5 === 0) {
                    showTitleAndDesc();
                  } else {
                    showNewText();
                  }
                });
              }, 2000); // Hold the backspace for 2 seconds before typing new text
            });
          }
          
          function showTitleAndDesc() {
            const homeTitle = document.getElementById('homeTitle');
            const homeDesc = document.getElementById('homeDesc');
            const futuristicText = document.getElementById('futuristicText');
          
            // Hide futuristicText
            futuristicText.style.display = 'none';
          
            // Show title and desc
            homeTitle.style.opacity = 1;
            homeDesc.style.opacity = 1;
          
            // After 15 seconds, hide title and desc, and show futuristicText again
            setTimeout(() => {
              homeTitle.style.opacity = 0;
              homeDesc.style.opacity = 0;
              setTimeout(showNewText, 3000); // Continue with futuristicText after fade out
            }, 15000);
          }
          
          function startCycle() {
            // Hide initial "Quicks" and "home-desc"
            document.getElementById('homeTitle').style.opacity = 0;
            document.getElementById('homeDesc').style.opacity = 0;
          
            // Show first futuristic text after fade out
            setTimeout(() => {
              showNewText();
            }, 3000); // Delay to allow fade out effect
          }
          
          // Start after 15 seconds
          setTimeout(startCycle, 15000);
          

        document.addEventListener('DOMContentLoaded', function() {

            const currentSection = localStorage.getItem('currentSection') || 'homeSection';
        
            document.getElementById('homeSection').classList.add('d-none');
            document.getElementById('gamesSection').classList.add('d-none');
            document.getElementById('settingsSection').classList.add('d-none');
        
            document.getElementById(currentSection).classList.remove('d-none');
        });
        
        function showSection(sectionId) {
        
            document.getElementById('homeSection').classList.add('d-none');
            document.getElementById('gamesSection').classList.add('d-none');
            document.getElementById('settingsSection').classList.add('d-none');
        
            document.getElementById(sectionId).classList.remove('d-none');
        
            localStorage.setItem('currentSection', sectionId);
        }
        

        tsParticles.load("tsparticles", {
            "particles": {
                "number": {
                    "value": 30,  
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#808080"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    }
                },
                "opacity": {
                    "value": 0.5,
                    "random": false,
                    "anim": {
                        "enable": false,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 4,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#808080",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": false
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 100,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 0.8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    },
                    "drag": {
                        "enable": true,
                        "mode": "particles",
                        "particle": {
                            "move": {
                                "speed": 10
                            }
                        }
                    }
                }
            },
            "retina_detect": true
        });
        
        document.addEventListener('DOMContentLoaded', (event) => {
            tsParticles.load("tsparticles2", {
                "particles": {
                    "number": {
                        "value": 50,
                        "density": {
                            "enable": true,
                            "value_area": 800
                        }
                    },
                    "color": {
                        "value": "#FFD700" 
                    },
                    "shape": {
                        "type": "star", 
                        "stroke": {
                            "width": 0,
                            "color": "#000000"
                        },
                        "polygon": {
                            "nb_sides": 5
                        }
                    },
                    "opacity": {
                        "value": 0.8,
                        "random": true,
                        "anim": {
                            "enable": true,
                            "speed": 1,
                            "opacity_min": 0.3,
                            "sync": false
                        }
                    },
                    "size": {
                        "value": 5,
                        "random": true,
                        "anim": {
                            "enable": true,
                            "speed": 2,
                            "size_min": 0.5,
                            "sync": false
                        }
                    },
                    "line_linked": {
                        "enable": false
                    },
                    "move": {
                        "enable": true,
                        "speed": 1,
                        "direction": "top",
                        "random": true,
                        "straight": false,
                        "out_mode": "out",
                        "bounce": false
                    }
                },
                "interactivity": {
                    "detect_on": "canvas",
                    "events": {
                        "onhover": {
                            "enable": true,
                            "mode": "bubble"
                        },
                        "onclick": {
                            "enable": true,
                            "mode": "repulse"
                        },
                        "resize": true
                    },
                    "modes": {
                        "bubble": {
                            "distance": 250,
                            "size": 6,
                            "duration": 2,
                            "opacity": 0.8,
                            "speed": 3
                        },
                        "repulse": {
                            "distance": 200,
                            "duration": 0.4
                        }
                    }
                },
                "retina_detect": true
            });
        });
        

         let currentSlide = 0;
        const gameTitles = ['Tic Tac Toe', 'Breakout', 'Game 3'];
        const titleClasses = ['title-home', 'title-games', 'title-settings'];

        function showSlide(index) {
            const items = document.querySelectorAll('.carousel-item');
            items[currentSlide].classList.remove('active');
            currentSlide = (index + items.length) % items.length;
            items[currentSlide].classList.add('active');

            const titleElement = document.getElementById('games-title');
            titleElement.textContent = gameTitles[currentSlide];
            titleElement.className = `mt-5 ${titleClasses[currentSlide]}`;
        }

        function prevSlide() {
            showSlide(currentSlide - 1);
        }

        function nextSlide() {
            showSlide(currentSlide + 1);
        }

        showSlide(0);

        const ticTacToeBoard = Array(9).fill(null);
        let currentPlayer = 'X';

        function makeMove(button, index) {
            if (ticTacToeBoard[index] || checkWinner()) return;

            ticTacToeBoard[index] = currentPlayer;
            button.textContent = currentPlayer;
            button.classList.add(currentPlayer.toLowerCase());

            if (checkWinner()) {
                Swal.fire({
                    title: `Player ${currentPlayer} Wins!`,
                    text: 'Congratulations!',
                    icon: 'success',
                    background: '#333',
                    color: '#fff',
                    confirmButtonColor: '#f1c40f',
                    confirmButtonText: 'Play Again',
                    onClose: resetBoard
                }).then(() => resetBoard());
            } else if (ticTacToeBoard.every(cell => cell)) {
                Swal.fire({
                    title: 'Draw!',
                    text: 'No one wins!',
                    icon: 'info',
                    background: '#333',
                    color: '#fff',
                    confirmButtonColor: '#f1c40f',
                    confirmButtonText: 'Play Again',
                    onClose: resetBoard
                }).then(() => resetBoard());
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
        }

        function checkWinner() {
            const winPatterns = [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                [0, 4, 8],
                [2, 4, 6]
            ];

            return winPatterns.some(pattern => {
                const [a, b, c] = pattern;
                return ticTacToeBoard[a] && ticTacToeBoard[a] === ticTacToeBoard[b] && ticTacToeBoard[a] === ticTacToeBoard[c];
            });
        }

        function resetBoard() {
            ticTacToeBoard.fill(null);
            document.querySelectorAll('.tic-tac-toe button').forEach(button => {
                button.textContent = '';
                button.classList.remove('x', 'o');
            });
            currentPlayer = 'X';
        }

        document.addEventListener('DOMContentLoaded', () => {
            const playButton = document.querySelector('.breakout-play-button');
            const playAgainButton = document.querySelector('.breakout-play-again-button');
            const breakoutCanvas = document.getElementById('breakoutCanvas');
            const gameOverMessage = document.getElementById('gameOverMessage');
            const gameOverText = document.getElementById('gameOverText');
            const howToPlayContainer = document.getElementById('howToPlay');
            const howToPlayButton = document.getElementById('howToPlayButton');
        
            let lastTouchX = 0;
            let mainBall = null;
        
            function startBreakoutGame() {
                howToPlayContainer.style.display = 'none'; 
                breakoutCanvas.style.filter = 'none';
                const canvas = document.getElementById("breakoutCanvas");
                const ctx = canvas.getContext("2d");
        
                canvas.width = canvas.offsetWidth;
                canvas.height = canvas.offsetHeight;
        
                let ballRadius = 5;
                mainBall = {
                    x: canvas.width / 2,
                    y: canvas.height - 30,
                    dx: Math.random() * 4 - 2,
                    dy: -Math.random() * 4 - 2,
                    color: "#FFA500"
                };
                let balls = [mainBall];
        
                let paddleHeight = 10;
                let paddleWidth = 100;
                let paddleX = (canvas.width - paddleWidth) / 2;
        
                let brickRowCount = Math.floor(Math.random() * 5) + 5;
                let brickColumnCount = Math.floor(Math.random() * 6) + 6;
                let brickWidth = Math.floor(canvas.width / brickColumnCount) - 10;
                let brickHeight = 15;
                let brickPadding = 5;
                let brickOffsetTop = 30;
                let brickOffsetLeft = 30;
        
                let bricks = [];
                for (let c = 0; c < brickColumnCount; c++) {
                    bricks[c] = [];
                    for (let r = 0; r < brickRowCount; r++) {
                        bricks[c][r] = {
                            x: (c * (brickWidth + brickPadding)) + brickOffsetLeft,
                            y: (r * (brickHeight + brickPadding)) + brickOffsetTop,
                            status: 1
                        };
                    }
                }
        
                let particles = [];
                let rightPressed = false;
                let leftPressed = false;
        
                function keyDownHandler(e) {
                    if (e.key === "Right" || e.key === "ArrowRight") {
                        rightPressed = true;
                    } else if (e.key === "Left" || e.key === "ArrowLeft") {
                        leftPressed = true;
                    }
                }
        
                function keyUpHandler(e) {
                    if (e.key === "Right" || e.key === "ArrowRight") {
                        rightPressed = false;
                    } else if (e.key === "Left" || e.key === "ArrowLeft") {
                        leftPressed = false;
                    }
                }
        
                function touchStartHandler(e) {
                    const touch = e.touches[0];
                    lastTouchX = touch.clientX - canvas.getBoundingClientRect().left;
                }
        
                function touchMoveHandler(e) {
                    e.preventDefault();
                    const touch = e.touches[0];
                    const touchX = touch.clientX - canvas.getBoundingClientRect().left;
                    const deltaX = touchX - lastTouchX;
                    paddleX = Math.min(canvas.width - paddleWidth, Math.max(0, paddleX + deltaX));
                    lastTouchX = touchX;
                }
        
                function setupEventListeners() {
                    document.addEventListener("keydown", keyDownHandler);
                    document.addEventListener("keyup", keyUpHandler);
                    canvas.addEventListener("touchstart", touchStartHandler);
                    canvas.addEventListener("touchmove", touchMoveHandler);
                }
        
                function removeEventListeners() {
                    document.removeEventListener("keydown", keyDownHandler);
                    document.removeEventListener("keyup", keyUpHandler);
                    canvas.removeEventListener("touchstart", touchStartHandler);
                    canvas.removeEventListener("touchmove", touchMoveHandler);
                }
        
                function drawBall() {
                    for (let i = 0; i < balls.length; i++) {
                        ctx.beginPath();
                        ctx.arc(balls[i].x, balls[i].y, ballRadius, 0, Math.PI * 2);
                        ctx.fillStyle = balls[i].color;
                        ctx.fill();
                        ctx.closePath();
                    }
                }
        
                function drawPaddle() {
                    ctx.beginPath();
                    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
                    ctx.fillStyle = "#3498db";
                    ctx.fill();
                    ctx.closePath();
                }
        
                function drawBricks() {
                    let bricksRemaining = 0;
                    for (let c = 0; c < brickColumnCount; c++) {
                        for (let r = 0; r < brickRowCount; r++) {
                            if (bricks[c][r].status === 1) {
                                bricksRemaining++;
                                const brickX = bricks[c][r].x;
                                const brickY = bricks[c][r].y;
                                ctx.beginPath();
                                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                                ctx.fillStyle = "#BA55D3";
                                ctx.fill();
                                ctx.closePath();
                            }
                        }
                    }
                    return bricksRemaining;
                }
        
                function drawParticles() {
                    for (let i = 0; i < particles.length; i++) {
                        let p = particles[i];
                        ctx.beginPath();
                        ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
                        ctx.fillStyle = "#F0E68C";
                        ctx.fill();
                        ctx.closePath();
                        p.y += p.dy;
        
                        if (p.y > canvas.height) {
                            particles.splice(i, 1);
                            i--;
                        }
                    }
                }

                function collisionDetection() {
                    for (let i = 0; i < balls.length; i++) {
                        for (let c = 0; c < brickColumnCount; c++) {
                            for (let r = 0; r < brickRowCount; r++) {
                                let b = bricks[c][r];
                                if (b.status === 1) {
                                    if (balls[i].x > b.x && balls[i].x < b.x + brickWidth && balls[i].y > b.y && balls[i].y < b.y + brickHeight) {
                                        balls[i].dy = -balls[i].dy;
                                        b.status = 0;
        
                                        if (Math.random() < 0.1) {
                                            particles.push({
                                                x: b.x + brickWidth / 2,
                                                y: b.y + brickHeight / 2,
                                                dy: 1
                                            });
                                        }
                                    }
                                }
                            }
        
                            for (let j = 0; j < particles.length; j++) {
                                let p = particles[j];
                                if (p.x > paddleX && p.x < paddleX + paddleWidth && p.y + 4 > canvas.height - paddleHeight) {
                                    particles.splice(j, 1);
                                    j--;
                                    balls.push({
                                        x: paddleX + paddleWidth / 2,
                                        y: canvas.height - paddleHeight - 10,
                                        dx: Math.random() * 4 - 2,
                                        dy: -Math.random() * 4 - 2,
                                        color: "#FFA500" 
                                    });
                                }
                            }
                        }
                    }
                }
        
                function draw() {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    drawBricks();
                    drawBall();
                    drawPaddle();
                    drawParticles();
                    collisionDetection();
        
                    let allBallsOut = true;
                    for (let i = 0; i < balls.length; i++) {
                        let b = balls[i];
                        if (b.x + b.dx > canvas.width - ballRadius || b.x + b.dx < ballRadius) {
                            b.dx = -b.dx;
                        }
                        if (b.y + b.dy < ballRadius) {
                            b.dy = -b.dy;
                        } else if (b.y + b.dy > canvas.height - ballRadius) {
                            if (b.x > paddleX && b.x < paddleX + paddleWidth) {
                                b.dy = -b.dy;
                            } else {
                                particles.push({
                                    x: b.x,
                                    y: b.y,
                                    size: ballRadius,
                                    dx: b.dx / 2,
                                    dy: b.dy / 2,
                                    alpha: 1
                                });
                                balls.splice(i, 1);
                                i--;
                                continue;
                            }
                        }
        
                        b.x += b.dx;
                        b.y += b.dy;
        
                        if (b.x > -ballRadius && b.x < canvas.width + ballRadius &&
                            b.y > -ballRadius && b.y < canvas.height + ballRadius) {
                            allBallsOut = false;
                        }
                    }
        
                    if (rightPressed && paddleX < canvas.width - paddleWidth) {
                        paddleX += 7;
                    } else if (leftPressed && paddleX > 0) {
                        paddleX -= 7;
                    }
        
                    let bricksRemaining = drawBricks();
                    if (bricksRemaining === 0) {
                        gameOver("You Win!");
                    } else if (allBallsOut) {
                        gameOver("Game Over");
                    } else {
                        requestAnimationFrame(draw);
                    }
                }
        
                function gameOver(message) {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    gameOverText.textContent = message;
                    gameOverMessage.style.display = "block";
                    removeEventListeners();
                }
        
                setupEventListeners();
                draw();
            }
        
            howToPlayButton.addEventListener('click', () => {
                howToPlayContainer.style.display = 'none';
                document.querySelector('.breakout-play-container').style.display = 'block';
            });
        
            playButton.addEventListener('click', () => {
                document.querySelector('.breakout-play-container').style.display = 'none';
                breakoutCanvas.style.display = 'block';
                startBreakoutGame();
            });
        
            playAgainButton.addEventListener('click', () => {
                gameOverMessage.style.display = "none";
                startBreakoutGame();
            });
        });
        
        
             
                
        const mainBtn = document.getElementById('mainBtn');
        const talkBtn = document.getElementById('talkBtn');
        const inboxBtn = document.getElementById('taskBtn');
        const talkLabel = document.getElementById('talkLabel'); 
        const inboxLabel = document.getElementById('taskLabel');
        const talkModal = document.getElementById('talkModal');
        const inboxModal = document.getElementById('taskModal');

        let isOpen = false;

        mainBtn.addEventListener('click', () => {
            isOpen = !isOpen;
            if (isOpen) {
                talkBtn.classList.add('active');
                taskBtn.classList.add('active');
                talkLabel.classList.add('active');
                taskLabel.classList.add('active');
            } else {
                talkBtn.classList.remove('active');
                taskBtn.classList.remove('active');
                talkLabel.classList.remove('active');
                taskLabel.classList.remove('active');
            }
        });

        talkBtn.addEventListener('click', () => {
            taskModal.style.display = 'none';
            toggleModal(talkModal, talkBtn, talkLabel);
        });

        taskBtn.addEventListener('click', () => {
            talkModal.style.display = 'none';
            toggleModal(taskModal, taskBtn, taskLabel);
        });

        function toggleModal(modal, button, label) {
            const isModalOpen = modal.style.display === 'block';

            modal.style.display = isModalOpen ? 'none' : 'block';

            if (isModalOpen) {
                button.style.backgroundColor = '#ffffff';
                label.style.display = 'inline';
            } else {
                button.style.backgroundColor = '#4F4F4F'; 
                label.style.display = 'none';
            }
        }

        window.addEventListener('click', function (event) {
            if (!talkBtn.contains(event.target) && !talkModal.contains(event.target)) {
                talkModal.style.display = 'none';
                talkBtn.style.backgroundColor = '#ffffff';
                talkLabel.style.display = 'inline';
            }
            if (!taskBtn.contains(event.target) && !taskModal.contains(event.target)) {
                taskModal.style.display = 'none';
                taskBtn.style.backgroundColor = '#ffffff';
                taskLabel.style.display = 'inline';
            }
        });

        document.addEventListener('DOMContentLoaded', function () {
            const chatContainer = document.getElementById('chatContainer');
            const sendMessageButton = document.querySelector('.send-btn');
            const chatInput = document.querySelector('.chat-input');
            const typingIndicator = document.getElementById('typingIndicator');
        
            const apiConfig = {
                apiKey: '18c4b2fd16msh32d393319e95b02p1ebdb6jsncda25d8eb8d3',
                apiHost: 'meta-llama-fast-api.p.rapidapi.com',
                apiBaseUrl: 'https://meta-llama-fast-api.p.rapidapi.com',
                apiEndpoint: '/mistralchat',
            };
        
            async function getResponse(userMessage) {
                const url = `${apiConfig.apiBaseUrl}${apiConfig.apiEndpoint}`;
            
                const options = {
                    method: 'POST',
                    headers: {
                        'x-rapidapi-key': apiConfig.apiKey,
                        'x-rapidapi-host': apiConfig.apiHost,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        message: userMessage
                    })
                };
            
                try {
                    const response = await fetch(url, options);
                    if (!response.ok) {
                        throw new Error('Network response was not ok: ' + response.statusText);
                    }
            
                    const result = await response.text();
                    console.log('API Response:', result); 
            
                    if (result) {
                        return result;
                    } else {
                        return "No response from the API.";
                    }
                } catch (error) {
                    console.error('Error fetching response:', error);
                    return "Oops! Something went wrong.";
                }
            }
            
            function displayMessage(message, type) {
                const messageElement = document.createElement('div');
                messageElement.className = `chat-message ${type}`;
            
                const formattedMessage = message
                    .replace(/"/g, '') 
                    .replace(/\n/g, '')
                    .replace(/\t/g, '')
                    .replace(/\n\n/g, '')
                    .replace(/\\/g, ''); 
            
                messageElement.innerHTML = formattedMessage;
            
                const timeElement = document.createElement('div');
                timeElement.className = 'message-time';
                const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                timeElement.textContent = currentTime;
            
                messageElement.appendChild(timeElement);
                chatContainer.appendChild(messageElement);
                chatContainer.scrollTop = chatContainer.scrollHeight;
            }
                                
            sendMessageButton.addEventListener('click', async () => {
                const userMessage = chatInput.value.trim();
                if (userMessage) {
                    displayMessage(userMessage, 'sent');
                    chatInput.value = '';
        
                    typingIndicator.style.display = 'block';
        
                    setTimeout(async () => {
                        const botResponse = await getResponse(userMessage);
                        displayMessage(botResponse, 'received');
                        typingIndicator.style.display = 'none';
                    }, 3000); 
                }
            });
        
            chatInput.addEventListener('keypress', (event) => {
                if (event.key === 'Enter') {
                    sendMessageButton.click();
                }
            });
        });
        
        
document.addEventListener('DOMContentLoaded', function () {
    const taskInput = document.getElementById('taskInput');
    const taskTimer = document.getElementById('taskTimer');
    const addTaskButton = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    let activeTimers = {};

    function createTaskElement(taskText, timer) {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item d-flex justify-content-between align-items-center position-relative';
        listItem.innerHTML = `
            <div class="task-content rounded-3">
                <span class="task-text">${taskText}</span>
                <span> - </span>
                <span class="timer" id="timer-${Date.now()}">${formatTime(timer)}</span>
            </div>
            <div>
                <button class="btn btn-success btn-sm me-2 complete-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 256 256" class="my-1 svg-icon">
                        <g fill="#e0e0e0">
                            <g transform="scale(5.33333,5.33333)">
                                <path d="M40.6,12.1l-23.6,23.6l-9.6,-9.6l-2.8,2.9l12.4,12.3l26.4,-26.4z"></path>
                            </g>
                        </g>
                    </svg>
                </button>
                <button class="btn btn-danger btn-sm delete-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 256 256" class="my-1 svg-icon">
                        <g fill="#e0e0e0">
                            <g transform="scale(8,8)">
                                <path d="M15,4c-0.52344,0 -1.05859,0.18359 -1.4375,0.5625c-0.37891,0.37891 -0.5625,0.91406 -0.5625,1.4375v1h-6v2h1v16c0,1.64453 1.35547,3 3,3h12c1.64453,0 3,-1.35547 3,-3v-16h1v-2h-6v-1c0,-0.52344 -0.18359,-1.05859 -0.5625,-1.4375c-0.37891,-0.37891 -0.91406,-0.5625 -1.4375,-0.5625zM15,6h4v1h-4zM10,9h14v16c0,0.55469 -0.44531,1 -1,1h-12c-0.55469,0 -1,-0.44531 -1,-1zM12,12v11h2v-11zM16,12v11h2v-11zM20,12v11h2v-11z"></path>
                        </g>
                    </svg>    
                </button>   
            </div>
        `;

        if (timer > 0) {
            startTimer(listItem.querySelector('.timer'), timer, taskText);
        }

        return listItem;
    }

    function formatTime(minutes) {
        const seconds = minutes * 60;
        return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
    }

    function startTimer(timerElement, minutes, taskText) {
        let timeLeft = minutes * 60; 

        function updateTimer() {
            if (timeLeft <= 0) {
                clearInterval(activeTimers[timerElement.id]);
                timerElement.innerText = 'Time is up!';
                notifyUser(`Task Timer: ${taskText}`, `Your task "${taskText}" has finished.`);
                return;
            }

            const minutesLeft = Math.floor(timeLeft / 60);
            const secondsLeft = timeLeft % 60;
            timerElement.innerText = `${String(minutesLeft).padStart(2, '0')}:${String(secondsLeft).padStart(2, '0')}`;
            timeLeft--;
        }

        const timerInterval = setInterval(updateTimer, 1000);
        activeTimers[timerElement.id] = timerInterval;
        updateTimer(); 
    }

    function notifyUser(title, message) {
    Swal.fire({
        title: title,
        text: message,
        icon: 'info',
        confirmButtonText: 'OK',
        allowOutsideClick: false, 
        allowEscapeKey: false,    
        customClass: {
            popup: 'dark-swal-popup',
            confirmButton: 'dark-swal-button' 
        }
    });
}

    function addTask() {
        const taskText = taskInput.value.trim();
        const timerValue = parseInt(taskTimer.value.trim(), 10) || 0;

        if (taskText) {
            const taskElement = createTaskElement(taskText, timerValue);
            taskList.appendChild(taskElement);
            taskInput.value = '';
            taskTimer.value = '';
        }
    }

    addTaskButton.addEventListener('click', addTask);

    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    taskList.addEventListener('click', (event) => {
        if (event.target.closest('.complete-btn')) {
            const listItem = event.target.closest('.list-group-item');
            const timerElement = listItem.querySelector('.timer');
            const timerId = timerElement.id;

            clearInterval(activeTimers[timerId]);
            delete activeTimers[timerId]; 
            listItem.querySelector('.task-text').style.textDecoration = 'line-through';
            event.target.disabled = true;

        } else if (event.target.closest('.delete-btn')) {
            event.stopPropagation(); 
            const listItem = event.target.closest('.list-group-item');
            const timerElement = listItem.querySelector('.timer');
            const timerId = timerElement.id;

            if (activeTimers[timerId]) {
                clearInterval(activeTimers[timerId]);
                delete activeTimers[timerId];
            }

            taskList.removeChild(listItem);
        }
    });

    if (Notification.permission === 'default') {
        Notification.requestPermission();
    }
});

