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
    // Update chat history with user message
    chatHistory.push({ type: 'sent', message: userMessage });

    const lowerCaseMessage = userMessage.toLowerCase();
    let response = '';
    // Additional keyword categories and responses
        const keywordCategories = [
        {
            keywords: ['laugh', 'joke', 'funny', 'humor'],
            responses: [
                'Why don’t skeletons fight each other? They don’t have the guts!',
                'I’ve got a joke for you: What do you get when you cross a snowman with a vampire? Frostbite!',
                'Here’s something funny: Why did the golfer bring two pairs of pants? In case he got a hole in one!',
                'Humor can brighten anyone’s day. Did you hear about the cheese factory that exploded? There was nothing left but de-brie!',
                'I love a good laugh! Here’s a joke: Why don’t scientists trust atoms? Because they make up everything!',
                'If you need a laugh, here’s one: Why was the math book sad? It had too many problems.',
                'Let me tell you something funny: Why did the bicycle fall over? It was two-tired!',
                'Here’s a humorous thought: Why did the scarecrow win an award? Because he was outstanding in his field!'
            ]
        },
        {
            keywords: ['sad', 'mad', 'upset', 'angry', 'depressed', 'down'],
            responses: [
                'I’m really sorry you’re feeling this way. It’s okay to not be okay, and I’m here to listen.',
                'It’s tough to feel upset, but it’s also okay to let those feelings out. I’m here for you.',
                'Feeling down happens to everyone at times. Remember, after every storm comes a rainbow.',
                'I wish I could give you a big hug right now. Sometimes talking about it can help; I’m here to listen.',
                'It’s okay to feel angry or upset. Sometimes taking a deep breath or a walk can help clear your mind.',
                'I’m really sorry you’re feeling like this. Would you like to talk about what’s bothering you?',
                'I understand that you’re feeling down. Remember that it’s okay to feel what you’re feeling, and you’re not alone.',
                'When you’re feeling low, sometimes doing something you enjoy, even just a little bit, can help. What’s something that usually cheers you up?'
            ]
        },
        {
            keywords: ['happy', 'joy', 'glad', 'excited', 'cheerful'],
            responses: [
                'That’s fantastic! I’m so glad you’re feeling great!',
                'Your happiness is contagious! Keep spreading those good vibes!',
                'Tell me more about what’s making you so happy! I’d love to hear all about it.',
                'I love hearing that you’re in such a good mood! What’s the good news?',
                'It’s great to see you smiling! What’s been going on that’s brought you joy?',
                'Happiness is such a wonderful feeling. What’s something you’re looking forward to?',
                'I’m so happy that you’re happy! Anything special happen today?',
                'It’s wonderful to hear that you’re excited! What’s got you so pumped up?'
            ]
        },
        {
            keywords: ['hello', 'hi', 'greetings', 'hey', 'good morning', 'good afternoon', 'good evening'],
            responses: [
                'Hey there! What’s on your mind today?',
                'Hello! How can I help you?',
                'Hi! What can I do for you today?',
                'Greetings! How’s everything going?',
                'Good morning! How’s your day starting?',
                'Good afternoon! What’s on your agenda today?',
                'Good evening! How’s your day been so far?',
                'Hey! How’s it going? Anything exciting happening?'
            ]
        },
        {
            keywords: ['help', 'assist', 'support', 'problem', 'issue', 'trouble'],
            responses: [
                'I’m here to help! What’s the issue?',
                'Let me know how I can assist you.',
                'If you’re facing a problem, I’m here to help. What seems to be the trouble?',
                'Don’t worry, I’m here to assist you. What do you need help with?',
                'Let’s tackle this together. What problem are you facing?',
                'If you’re having trouble with something, I’ll do my best to support you. What’s going on?',
                'I’m ready to help you out. Just let me know what’s happening.',
                'If you need support, I’m here for you. What do you need assistance with?'
            ]
        },
        {
            keywords: ['love', 'relationship', 'crush', 'dating'],
            responses: [
                'Love is a beautiful thing! How are things going with your special someone?',
                'Relationships can be challenging, but they’re worth it. Do you want to talk about yours?',
                'It sounds like you’ve got someone special in mind! How’s everything going?',
                'Crushes can be exciting and nerve-wracking at the same time! Do you have any plans to share your feelings?',
                'Dating can be fun and full of surprises! Any exciting stories to share?',
                'Relationships take work, but they’re worth every bit of effort. How’s everything on your end?',
                'Love can be complicated, but also wonderful. Are you currently seeing someone?',
                'If you’re in love, it must be an exciting time for you! Want to talk more about it?'
            ]
        },
        {
            keywords: ['food', 'hungry', 'eat', 'meal', 'snack'],
            responses: [
                'What’s your favorite thing to eat? Any cravings right now?',
                'Feeling hungry? Maybe it’s time for a snack. What do you have in mind?',
                'Food is always a good topic! Have you tried any new recipes lately?',
                'If you’re hungry, how about making something simple and delicious? Any ideas?',
                'Eating well is important. What’s your go-to meal when you’re really hungry?',
                'Craving something specific? Maybe I can help you decide what to eat.',
                'Food is life! What’s on your menu today?',
                'If you’re in the mood for something tasty, what’s your favorite dish?'
            ]
        },
        {
            keywords: ['travel', 'vacation', 'holiday', 'trip', 'explore'],
            responses: [
                'Traveling is such an adventure! Any places you want to visit?',
                'A vacation sounds amazing! Do you have any destinations in mind?',
                'Trips are the best way to unwind. Where have you been dreaming of going?',
                'Exploring new places is always exciting! Where’s the last place you traveled?',
                'Holidays are a time to relax and explore. Any favorite destinations?',
                'If you’re planning a trip, where’s the next stop on your journey?',
                'Travel opens up so many opportunities. Where do you want to go next?',
                'Vacations are perfect for recharging. What’s your ideal holiday destination?'
            ]
        },
        {
            keywords: ['hobby', 'interest', 'passion', 'free time', 'spare time'],
            responses: [
                'What do you like to do in your free time? Any hobbies you’re passionate about?',
                'Hobbies are a great way to unwind. What are you currently into?',
                'Everyone needs a hobby. What’s yours?',
                'I’d love to hear about your passions! What keeps you going?',
                'Spare time is perfect for indulging in something you love. What’s your favorite pastime?',
                'Interests and hobbies make life richer. What are you currently working on?',
                'Free time is best spent doing what you enjoy. What’s your go-to activity?',
                'What’s something you’re passionate about? I’m curious to know more!'
            ]
        },
        {
            keywords: ['news', 'latest', 'current events', 'world', 'updates'],
            responses: [
                'The world is constantly changing! Anything specific you’re curious about?',
                'It’s always good to stay informed. What news are you interested in?',
                'A lot is happening in the world right now! Any particular topics on your mind?',
                'Keeping up with the latest updates? What’s caught your attention?',
                'The news can be overwhelming, but it’s important to stay informed. What’s on your mind?',
                'Current events are always changing. Is there anything specific you want to discuss?',
                'Staying updated is key. What news have you been following lately?',
                'The world is full of stories. What news are you interested in today?'
            ]
        },
        {
            keywords: ['music', 'song', 'artist', 'album', 'playlist'],
            responses: [
                'Music is life! What’s your favorite song right now?',
                'Got any favorite artists? I’d love to hear who you’re into!',
                'Music can set the mood. What’s on your playlist?',
                'Songs have a way of capturing emotions. What are you listening to these days?',
                'Albums are like a journey through sound. Any that you’ve been loving?',
                'If you’re into music, what genre do you prefer?',
                'Music connects us all. What’s a song that you can’t stop playing?',
                'Artists put so much into their work. Who’s your favorite?'
            ]
        },
        {
            keywords: ['health', 'wellness', 'fitness', 'exercise', 'workout'],
            responses: [
                'Health is wealth! How do you stay active?',
                'Wellness is a journey. What’s your approach to staying healthy?',
                'Fitness is key to a balanced life. What’s your workout routine like?',
                'Exercise is a great way to relieve stress. Do you have a favorite workout?',
                'Staying fit is important. What’s your go-to exercise?',
                'Wellness includes both mind and body. How do you take care of yourself?',
                'A good workout can do wonders! What’s your favorite way to stay in shape?',
                'Health should always be a priority. How do you keep yourself feeling your best?'
            ]
        },
        {
            keywords: ['tech', 'technology', 'gadgets', 'devices', 'innovation'],
            responses: [
                'Technology is evolving fast! What new gadgets have caught your eye?',
                'The tech world is always buzzing with new innovations. Anything you’re excited about?',
                'Gadgets make life easier. Do you have a favorite device?',
                'Tech is the future! What’s the latest innovation that you’re following?',
                'Devices are becoming smarter every day. What’s something you can’t live without?',
                'Innovation drives the world forward. What’s a tech trend that you’re interested in?',
                'Technology is everywhere. What’s a gadget you use daily?',
                'The future is tech! What’s your favorite piece of technology?'
            ]
        },
        {
            keywords: ['money', 'finance', 'budget', 'saving', 'investment'],
            responses: [
                'Managing money is essential. How do you handle your finances?',
                'Finance can be tricky, but it’s important. Do you have a budget?',
                'Saving money is always a good idea. How do you keep track of your savings?',
                'Investments can grow your wealth. Are you into investing?',
                'Budgeting is key to financial health. Do you have any tips for staying on track?',
                'Finance doesn’t have to be complicated. What’s your approach to managing money?',
                'Money management is crucial. How do you make sure you’re saving enough?',
                'Investing can be rewarding. Are you looking into any new opportunities?'
            ]
        },
        {
            keywords: ['social', 'friends', 'party', 'event', 'gathering', 'meetup'],
            responses: [
                'Social events are great for connecting with others. Got any plans?',
                'Friends make life better. Do you have plans to hang out soon?',
                'Parties are a fun way to unwind! Got any invitations?',
                'Events bring people together. What’s the last event you attended?',
                'Meetups are perfect for catching up with friends. Any scheduled soon?',
                'Socializing is essential for happiness. How do you stay connected?',
                'Friends are the family we choose. Got any close friends you’ll see soon?',
                'Parties and gatherings are always a blast! Anything coming up?'
            ]
        }
    ];

    // Loop through categories to check for keywords
    for (let category of keywordCategories) {
        for (let keyword of category.keywords) {
            if (lowerCaseMessage.includes(keyword)) {
                response = category.responses[Math.floor(Math.random() * category.responses.length)];
                return response;
            }
        }
    }

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

    return response;
}

    function displayMessage(message, type) {
        const messageElement = document.createElement('div');
        messageElement.className = `chat-message ${type}`;
        messageElement.innerHTML = message;
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

