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

            // Toggle the modal display
            modal.style.display = isModalOpen ? 'none' : 'block';

            // Toggle the button color and label visibility
            if (isModalOpen) {
                button.style.backgroundColor = '#ffffff';
                label.style.display = 'inline';
            } else {
                button.style.backgroundColor = '#4F4F4F'; // Warna yang sama dengan ikon
                label.style.display = 'none';
            }
        }

        // Close modal if click outside
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
        
    // Simple contextual chat history
    let chatHistory = [];

    // Function to get bot response based on user input
    function getBotResponse(userMessage) {
        chatHistory.push({ type: 'sent', message: userMessage });
    
        const lowerCaseMessage = userMessage.toLowerCase();
        let response = '';
        const isQuestion = userMessage.trim().endsWith('?');
    
        const keywordCategories = [
            {
                keywords: ['laugh', 'joke', 'funny', 'humor', 'giggle', 'comedy', 'chuckle', 'pun'],
                questions: [
                    'Why did the chicken join a band? To get to the other side!',
                    'What do you call fake spaghetti? An impasta!',
                    'Here’s a joke: What did the grape do when he got stepped on? Nothing but let out a little wine!',
                    'Want to hear something funny? Why can’t you give Elsa a balloon? Because she will let it go!',
                    'Ever heard this one? Why did the stadium get hot after the game? All the fans left!'
                ],
                statements: [
                    'That joke never gets old!',
                    'Humor is the best medicine, don’t you think?',
                    'Laughing always brightens the day!',
                    'You have a great sense of humor!',
                    'Laughter is contagious!'
                ]
            },
            {
                keywords: ['sad', 'mad', 'upset', 'angry', 'depressed', 'down', 'unhappy', 'frustrated', 'annoyed', 'distressed'],
                questions: [
                    'I’m really sorry you’re feeling this way. Want to talk about what’s bothering you?',
                    'It’s okay to feel upset. What’s on your mind?',
                    'Feeling down can be tough. Do you want to share what’s going on?',
                    'I’m here for you. What’s making you feel this way?',
                    'Do you want to discuss what’s causing your frustration?'
                ],
                statements: [
                    'It’s okay to not be okay sometimes.',
                    'Your feelings are valid, and it’s important to acknowledge them.',
                    'I’m here to listen whenever you’re ready to talk.',
                    'You’re not alone in this; I’m here for you.',
                    'Sometimes, talking things out can really help.'
                ]
            },
            {
                keywords: ['happy', 'joy', 'glad', 'excited', 'cheerful', 'thrilled', 'delighted', 'content', 'satisfied'],
                questions: [
                    'That’s wonderful to hear! What’s making you so happy?',
                    'I love hearing that you’re in a good mood! What’s the reason?',
                    'Excitement is in the air! What’s got you feeling this way?',
                    'Joy is contagious! What’s the good news?',
                    'What’s bringing you so much happiness today?'
                ],
                statements: [
                    'It’s great to see you so happy!',
                    'Your joy is really infectious!',
                    'I’m glad you’re feeling so good!',
                    'Happiness looks good on you!',
                    'It’s always nice to hear someone is doing well!'
                ]
            },
            {
                keywords: ['hello', 'hi', 'greetings', 'hey', 'good morning', 'good afternoon', 'good evening', 'what’s up', 'howdy'],
                questions: [
                    'Hey there! How’s your day going?',
                    'Hello! What’s new with you today?',
                    'Hi! Anything exciting happening?',
                    'Greetings! How can I assist you today?',
                    'What’s up? How are things on your end?'
                ],
                statements: [
                    'Hi there! Nice to hear from you!',
                    'Hello! I’m here to help you with anything you need.',
                    'Good to see you online!',
                    'Hey! I’m ready to chat whenever you are.',
                    'Greetings! How can I make your day better?'
                ]
            },
            {
                keywords: ['help', 'assist', 'support', 'problem', 'issue', 'trouble', 'challenge', 'difficulty', 'question'],
                questions: [
                    'How can I assist you with that?',
                    'What’s the issue you’re facing? I’m here to help.',
                    'How can I support you in solving this?',
                    'What challenge are you dealing with?',
                    'Do you need help with something specific?'
                ],
                statements: [
                    'I’m here to help!',
                    'Let’s work on this together.',
                    'I’ll do my best to assist you.',
                    'I’m ready to help with any problems you have.',
                    'Supporting you is what I’m here for!'
                ]
            },
            {
                keywords: ['love', 'relationship', 'crush', 'dating', 'romance', 'partner', 'affection', 'feelings', 'heart'],
                questions: [
                    'Love can be complicated. How’s everything going?',
                    'How are things with your special someone?',
                    'What’s been happening in your relationship lately?',
                    'Any romantic plans coming up?',
                    'How do you feel about your crush?'
                ],
                statements: [
                    'Love is a beautiful thing!',
                    'Relationships can be both rewarding and challenging.',
                    'It’s great that you have someone special in your life.',
                    'Crushes can be really exciting!',
                    'Romance is in the air!'
                ]
            },
            {
                keywords: ['food', 'hungry', 'eat', 'meal', 'snack', 'dinner', 'breakfast', 'lunch', 'cuisine', 'craving'],
                questions: [
                    'What are you in the mood to eat?',
                    'Feeling hungry? What sounds good right now?',
                    'Got any food cravings?',
                    'What’s your favorite meal of the day?',
                    'Any particular cuisine you’re craving?'
                ],
                statements: [
                    'Food is always a good idea!',
                    'Eating well is so important.',
                    'Cravings can really hit hard sometimes!',
                    'A good meal can really lift your spirits.',
                    'Snacks are the best part of the day!'
                ]
            },
            {
                keywords: ['travel', 'vacation', 'holiday', 'trip', 'explore', 'journey', 'adventure', 'destination', 'wanderlust'],
                questions: [
                    'Any exciting travel plans coming up?',
                    'Where would you like to go on your next vacation?',
                    'What’s your dream travel destination?',
                    'Been on any trips lately?',
                    'What’s your idea of the perfect holiday?'
                ],
                statements: [
                    'Traveling is such an enriching experience!',
                    'A vacation can really recharge your batteries.',
                    'Exploring new places is always fun!',
                    'Trips create the best memories!',
                    'Wanderlust can take you to amazing places!'
                ]
            },
            {
                keywords: ['hobby', 'interest', 'passion', 'free time', 'spare time', 'activity', 'craft', 'skill', 'project'],
                questions: [
                    'What hobbies do you enjoy?',
                    'Any new interests you’ve picked up lately?',
                    'What’s something you’re passionate about?',
                    'How do you spend your free time?',
                    'Working on any projects right now?'
                ],
                statements: [
                    'Hobbies are a great way to relax!',
                    'It’s awesome to have a passion for something.',
                    'Free time is perfect for exploring new interests.',
                    'Crafting and creating can be so fulfilling!',
                    'Skills you develop from hobbies can last a lifetime!'
                ]
            },
            {
                keywords: ['news', 'latest', 'current events', 'world', 'updates', 'headline', 'breaking', 'trending', 'media'],
                questions: [
                    'Any particular news stories you’re following?',
                    'What’s the latest headline that caught your attention?',
                    'Keeping up with current events?',
                    'What’s trending in the world right now?',
                    'Interested in any specific news topics?'
                ],
                statements: [
                    'The world is full of news!',
                    'Staying informed is so important.',
                    'There’s always something happening in the world!',
                    'Current events can be really eye-opening.',
                    'The news cycle never stops!'
                ]
            },
            {
                keywords: ['music', 'song', 'artist', 'album', 'playlist', 'band', 'tune', 'melody', 'genre'],
                questions: [
                    'What’s your favorite song right now?',
                    'Been listening to any new artists?',
                    'What’s your go-to playlist?',
                    'Any albums you’ve been enjoying lately?',
                    'What genre of music do you like best?'
                ],
                statements: [
                    'Music really sets the mood!',
                    'Songs can bring back so many memories.',
                    'Artists put their heart and soul into their work.',
                    'A good playlist can make your day!',
                    'Melodies can be so soothing.'
                ]
            },
            {
                keywords: ['health', 'wellness', 'fitness', 'exercise', 'workout', 'diet', 'nutrition', 'well-being', 'routine'],
                questions: [
                    'How do you stay fit and healthy?',
                    'What’s your favorite way to exercise?',
                    'Any wellness routines you follow?',
                    'How do you approach your diet?',
                    'What’s your secret to staying in shape?'
                ],
                statements: [
                    'Health is wealth!',
                    'Wellness is a journey, not a destination.',
                    'Fitness routines can be really rewarding.',
                    'Nutrition plays a big role in overall well-being.',
                    'Taking care of yourself is so important.'
                ]
            },
            {
                keywords: ['thanks', 'thank you', 'appreciate', 'grateful', 'gratitude', 'thankful', 'bye'],
                questions: [
                    'You’re very welcome! Is there anything else you need?',
                    'I’m glad I could help! Anything else on your mind?',
                    'It’s my pleasure! Need assistance with anything else?',
                    'I appreciate your gratitude! What else can I do for you?',
                    'You’re welcome! How can I help you further?'
                ],
                statements: [
                    'You’re welcome!',
                    'Happy to help!',
                    'It’s great to hear that!',
                    'I appreciate your kind words!',
                    'Glad I could assist you!'
                ]
            }
        ];
    
        for (let category of keywordCategories) {
            for (let keyword of category.keywords) {
                if (lowerCaseMessage.includes(keyword)) {
                    if (isQuestion) {
                        response = category.statements[Math.floor(Math.random() * category.statements.length)];
                    } else {
                        response = category.questions[Math.floor(Math.random() * category.questions.length)];
                    }
                    break;
                }
            }
            if (response) break;
        }
    
        if (!response) {
            const undefinedResponses = [
                // Statements
                'That’s totally fair.',
                'I see what you mean.',
                'That’s something to think about.',
                'I couldn’t agree more.',
                'Absolutely, that’s a good point.',
                'Makes perfect sense to me.',
                'I’m right there with you on that.',
                'Totally on board with that.',
                'That’s definitely one way to look at it.',
                'I get the vibe you’re going for.',
                
                // Acknowledgments
                'Right, gotcha.',
                'Noted!',
                'Sure thing.',
                'Understood.',
                'Copy that!',
                'Makes sense.',
                'Cool, cool.',
                'Alright, noted.',
                'Fair enough!',
                'I hear you!',
                
                // Casual Phrases
                'No worries!',
                'You’re good!',
                'All good here.',
                'No stress!',
                'No biggie!',
                'It’s all good.',
                'That’s chill.',
                'It’s whatever!',
                'We’re cool.',
                'No problem at all.',
                
                // Brief Reactions
                'Oh, really?',
                'Ah, I see!',
                'Hmm, got it.',
                'Interesting...',
                'Oh, okay!',
                'Well, that’s something!',
                'Ah, makes sense now.',
                'I didn’t see that coming!',
                'Huh, that’s new.',
                'Oh, for sure!',
                
                // Filler Responses
                'Uh-huh, I get you.',
                'Yeah, totally.',
                'Mmm, I see.',
                'Right, right...',
                'Oh yeah?',
                'Is that so?',
                'Wow, really?',
                'Okay, I’m with you.',
                'Yeah, I feel that.',
                'Got it, got it.',
                
                // Encouragement
                'You’ve got this!',
                'Keep it up!',
                'You’re doing great!',
                'I’m here with you!',
                'Stay strong!',
                'You’re on the right track!',
                'That’s the spirit!',
                'Let’s keep moving forward!',
                'You’re killing it!',
                'Keep pushing!',
                
                // Affirmative
                'Definitely!',
                'For sure!',
                'Absolutely!',
                'Without a doubt!',
                'Of course!',
                'No doubt about it!',
                'You bet!',
                'Exactly!',
                'Yup, exactly.',
                'True that!',
                
                // Casual Positive
                'Sounds good to me!',
                'I’m down with that!',
                'That’s awesome!',
                'Nice one!',
                'Sweet!',
                'That’s great!',
                'Love it!',
                'Perfect!',
                'That’s solid!',
                'Right on!',
                
                // Neutral Reactions
                'Could be!',
                'It’s possible.',
                'Maybe so.',
                'Could go either way.',
                'Who knows?',
                'Anything’s possible.',
                'That’s one way to see it.',
                'Could be worth a shot.',
                'I guess we’ll see.',
                'Time will tell.',
                
                // Closing Remarks
                'Let’s wrap this up.',
                'That’s about it!',
                'Let’s leave it there for now.',
                'That covers it!',
                'We’re all set.',
                'That’s all I got.',
                'Let’s call it a day.',
                'That’s a wrap!',
                'We’re good here!',
                'Let’s tie this up!',
        
                // Apologies for Not Understanding
            'I’m sorry, I didn’t quite get that.',
            'My bad, I missed that.',
            'Sorry, can you say that in another way?',
            'Oops, I’m not sure what you mean.',
            'Apologies, I didn’t catch that.',
            'Sorry about that, could you explain a bit more?',
            'I’m still learning, sorry for the confusion!',
            'Sorry, I’m a bit lost here.',
            'I apologize, that went over my head.',
            'I’m sorry, I don’t fully understand.',
            'My apologies, could you clarify that?',
            'Sorry, I didn’t follow that.',
            'I’m sorry, I’m not sure I got that right.',
            'Sorry, I might have misunderstood you.',
            'I’m sorry if I’m missing something here.',
            'Apologies, I’m still trying to get it.',
            'I’m sorry, that’s a bit beyond me.',
            'I’m sorry, I might need some more context.',
            'I’m afraid I didn’t catch what you meant.',
            'Sorry, I didn’t understand that part.'
            ];
            
        
            // Randomly select a response from the list
            response = undefinedResponses[Math.floor(Math.random() * undefinedResponses.length)];
        }
    
        chatHistory.push({ type: 'received', message: response });
        return response;
    
}

function displayMessage(message, type) {
    const messageElement = document.createElement('div');
    messageElement.className = `chat-message ${type}`;
    messageElement.innerHTML = message;

    const timeElement = document.createElement('div');
    timeElement.className = 'message-time';
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    timeElement.textContent = currentTime;

    messageElement.appendChild(timeElement);
    chatContainer.appendChild(messageElement);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

sendMessageButton.addEventListener('click', () => {
    const userMessage = chatInput.value.trim();
    if (userMessage) {
        displayMessage(userMessage, 'sent'); // Display user message
        chatInput.value = '';

        // Show the typing indicator
        typingIndicator.style.display = 'block';

        // Delay the bot response
        setTimeout(() => {
            // Get and display bot response
            const botResponse = getBotResponse(userMessage);
            displayMessage(botResponse, 'received');

            // Hide the typing indicator
            typingIndicator.style.display = 'none';
        }, 3000); // 3 seconds delay
    }
});

// Optional: Handle Enter key for sending messages
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
    let activeTimers = {}; // To store active timers and their intervals

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
        let timeLeft = minutes * 60; // Convert minutes to seconds

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
        updateTimer(); // Initial update
    }

    function notifyUser(title, message) {
    Swal.fire({
        title: title,
        text: message,
        icon: 'info',
        confirmButtonText: 'OK',
        allowOutsideClick: false, // Prevents closing on outside click
        allowEscapeKey: false,    // Prevents closing on ESC key
        customClass: {
            popup: 'dark-swal-popup',   // Adds custom class for dark theme
            confirmButton: 'dark-swal-button' // Custom class for the button
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
            delete activeTimers[timerId]; // Stop the timer but do not delete the task
            listItem.querySelector('.task-text').style.textDecoration = 'line-through';
            event.target.disabled = true;

        } else if (event.target.closest('.delete-btn')) {
            event.stopPropagation(); // Prevents the modal from closing
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

    // Request notification permission on page load
    if (Notification.permission === 'default') {
        Notification.requestPermission();
    }
});

