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
        
            // New API configuration
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
                    console.log('API Response:', result); // Debug log
            
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
                messageElement.innerHTML = message;
        
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
                    }, 3000); // Simulasi waktu mengetik 3 detik
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

