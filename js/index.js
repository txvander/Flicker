const dynamicQuotes = [
"What brings you here today?",
"Whats up",
"Nice To See You today",
"What's on your mind?",
"Ready to dive in?",
"How can I assist you today?",
];

function getPersonalizedQuotes(userName) {
if (!userName) return dynamicQuotes;

return [
`Nice to see you today, ${userName}`,
`Whats up, ${userName}`,
`What brings you here today, ${userName}?`,
`What's on your mind, ${userName}?`,
`Ready to dive in, ${userName}?`,
`How can I assist you today, ${userName}?`,
];
}

function getRandomQuote() {
const currentUser = JSON.parse(localStorage.getItem('flickerCurrentUser') || 'null');
const userName = currentUser ? currentUser.name.split(' ')[0] : null;
const quotes = getPersonalizedQuotes(userName);

const randomIndex = Math.floor(Math.random() * quotes.length);
return quotes[randomIndex];
}

function updateQuote() {
const quoteElement = document.getElementById('dynamic-quote');
if (!quoteElement) return;

const newQuote = getRandomQuote();
if (newQuote === quoteElement.textContent) {
updateQuote();
return;
}

quoteElement.classList.add('quote-changing');

setTimeout(() => {
quoteElement.textContent = newQuote;
quoteElement.classList.remove('quote-changing');
quoteElement.classList.add('quote-entering');

setTimeout(() => {
quoteElement.classList.remove('quote-entering');
}, 600);
}, 300);
}

function initializeQuotes() {
const quoteElement = document.getElementById('dynamic-quote');
if (quoteElement) {
quoteElement.textContent = getRandomQuote();


setInterval(updateQuote, 10000);


document.addEventListener('visibilitychange', () => {
if (!document.hidden) {
updateQuote();
}
});
}
}

(function() {
try {
const sidebarClosed = localStorage.getItem('sidebarClosed') === 'true';
const style = document.createElement('style');
style.id = 'sidebar-initial-state';

if (sidebarClosed) {
style.innerHTML = '#sidebar{width:60px!important;padding:5px!important;transition:none!important}#toggle-btn svg{transform:rotate(180deg)!important;transition:none!important}#sidebar .btn-text,#sidebar .chat-title,#sidebar .chat-item,#sidebar .sidebar-footer-text{display:none!important}#sidebar .sidebar-footer-copyright{display:block!important}main,.main-content,#main-content{margin-left:0px!important;transition:none!important}';
} else {
style.innerHTML = 'main,.main-content,#main-content{margin-left:80px!important;transition:none!important}';
}

const head = document.head || document.getElementsByTagName('head')[0];
head.insertBefore(style, head.firstChild);
} catch (e) {
console.log('Error setting initial sidebar state:', e);
}
})();

const input = document.getElementById('input');
const inputArea = document.getElementById('input-area');

if (input && inputArea) {
input.addEventListener('focus', () => {
inputArea.classList.add('no-transition');
});

input.addEventListener('blur', () => {
inputArea.classList.remove('no-transition');
});
}

const sendButton = document.getElementById('send');
const boxes = document.querySelectorAll('.placeholder-box');

const revealBoxes = () => {
boxes.forEach(box => {
const boxTop = box.getBoundingClientRect().top;
const windowHeight = window.innerHeight;
if (boxTop < windowHeight - 50) {
box.style.opacity = 1;
box.style.transform = 'translateY(0)';
}
});
};

window.addEventListener('scroll', revealBoxes);
window.addEventListener('load', () => {
boxes.forEach(box => {
box.style.opacity = 0;
box.style.transform = 'translateY(40px)';
box.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
box.style.willChange = 'transform, opacity';
});
revealBoxes();
});

document.querySelectorAll('.nav-button').forEach(button => {
button.style.cursor = 'pointer';
button.addEventListener('mouseenter', () => {
button.style.background = 'rgba(255, 255, 255, 0.15)';
button.style.transform = 'scale(1.1)';
button.style.boxShadow = '0 0 12px 2px rgba(255, 255, 255, 0.3)';
});
button.addEventListener('mouseleave', () => {
button.style.background = 'transparent';
button.style.transform = 'scale(1)';
button.style.boxShadow = 'none';
});
});

boxes.forEach(box => {
box.style.cursor = 'pointer';
box.style.marginBottom = '14px';
box.style.borderRadius = '12px';
box.style.background = 'rgba(255, 255, 255, 0.015)';
box.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), background 0.4s ease';

const icon = box.querySelector('.box-icon');
if (icon) {
icon.style.transition = 'transform 0.4s ease';
icon.style.display = 'inline-block';
icon.style.verticalAlign = 'middle';
icon.style.transformOrigin = 'center center';
icon.style.transform = 'translateY(-50%)';
}

box.addEventListener('mouseenter', () => {
box.style.transform = 'scale(1.05)';
box.style.background = 'rgba(255, 255, 255, 0.07)';
if (icon) {
icon.style.transform = 'translateY(-50%)';
}
});

box.addEventListener('mouseleave', () => {
box.style.transform = 'scale(1)';
box.style.background = 'rgba(255, 255, 255, 0.015)';
if (icon) {
icon.style.transform = 'translateY(-50%)';
}
});
});

function saveSidebarState(isClosed) {
try {
localStorage.setItem('sidebarClosed', isClosed.toString());
} catch (error) {
console.warn('Could not save sidebar state:', error);
}
}

function getSidebarState() {
try {
return localStorage.getItem('sidebarClosed') === 'true';
} catch (error) {
console.warn('Could not get sidebar state:', error);
return false;
}
}

function toggleSidebar() {
const sidebar = document.getElementById('sidebar');
const toggleBtn = document.getElementById('toggle-btn');
const mainContent = document.querySelector('main') || document.querySelector('.main-content') || document.querySelector('#main-content') || document.body;

if (!sidebar || !toggleBtn) return;

const tempStyle = document.getElementById('sidebar-initial-state');
if (tempStyle) {
tempStyle.remove();
}

sidebar.classList.toggle('close');
toggleBtn.classList.toggle('rotated');

const isClosed = sidebar.classList.contains('close');

if (isClosed) {
mainContent.style.marginLeft = '0px';
mainContent.style.transition = 'margin-left 0.2s cubic-bezier(0.4, 0, 0.2, 1)';
} else {
mainContent.style.marginLeft = '80px';
mainContent.style.transition = 'margin-left 0.2s cubic-bezier(0.4, 0, 0.2, 1)';
}

saveSidebarState(isClosed);
}

function initializeSidebarLayout() {
const sidebar = document.getElementById('sidebar');
const mainContent = document.querySelector('main') || document.querySelector('.main-content') || document.querySelector('#main-content') || document.body;

if (!sidebar || !mainContent) return;

const tempStyle = document.getElementById('sidebar-initial-state');
if (tempStyle) {
tempStyle.remove();
}

const sidebarClosed = localStorage.getItem('sidebarClosed') === 'true';

if (sidebarClosed) {
mainContent.style.marginLeft = '0px';
} else {
mainContent.style.marginLeft = '80px';
}

mainContent.style.transition = 'margin-left 0.2s cubic-bezier(0.4, 0, 0.2, 1)';
}

function refreshQuotes() {
const quoteElement = document.getElementById('dynamic-quote');
if (quoteElement) {
updateQuote();
}
}

document.addEventListener('DOMContentLoaded', function() {
initializeQuotes();

const sidebar = document.getElementById('sidebar');
const toggleBtn = document.getElementById('toggle-btn');

const tempStyle = document.getElementById('sidebar-initial-state');
if (tempStyle) {
tempStyle.remove();
}

if (sidebar && toggleBtn) {
const savedState = getSidebarState();
if (savedState) {
sidebar.classList.add('close');
toggleBtn.classList.add('rotated');
}
}

initializeSidebarLayout();

const signinBtn = document.getElementById('signin-btn');
if (signinBtn) {
signinBtn.addEventListener('click', function() {
window.location.href = 'Auth/signin.html';
});
}
});

window.toggleSidebar = toggleSidebar;
window.initializeSidebarLayout = initializeSidebarLayout;
window.refreshQuotes = refreshQuotes;