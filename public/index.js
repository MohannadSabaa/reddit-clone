
import { publicPosts, modalHandler, logoutHandler, profilePosts, messagesHandler} from "./renderHandlers.js";
const postsContainer = document.querySelector('.posts-container');
const userPosts = document.querySelector('.user-posts');
const showModalBtn = document.querySelector('.show-modal');
const addPostBtn = document.querySelector('#add');
const postContent = document.getElementById('content');
const closeModal = document.querySelector('.fa-circle-xmark');
const loginBtn = document.querySelector('#login');
const email = document.querySelector('.email');
const password = document.querySelector('.password');
let status = 0;
document.addEventListener('DOMContentLoaded', async () => {
    
if(document.getElementById('home')) { 

    const resp = await fetch('/api/v1/posts');
    const result = await resp.json();
   result.forEach(p => postsContainer.append(publicPosts(p)))
   const loginResp = await fetch('/',{method: 'POST'});
   if(loginResp.ok) {
    status = 1;
    showModalBtn.textContent = 'logout';
       }
   postsContainer.addEventListener('click', async  (e) => {
       const postBox = e.target.closest('.post-box');
       const id = postBox.id;
       const votes = postBox.querySelector('.votes');
       
       if(e.target.classList.contains('fa-arrow-up')) {
           
           const resp = await fetch(`/api/v1/posts/inc/${id}`, {
               method: 'PUT',
               headers: {"Content-Type": "application/json"},
            });
            
            if(resp.ok) {
                const result = await resp.json();
                votes.textContent = result[0].votes;
            }
            else {
                modalHandler();
            }
            
        }
        if(e.target.classList.contains('fa-arrow-down')) {    
            const resp = await fetch(`/api/v1/posts/dec/${id}`, {
                method: 'PUT',
                headers: {"Content-Type": "application/json"},
            });
            if(resp.ok) {
                const result = await resp.json();
                votes.textContent = result[0].votes;
            }
            else {
                modalHandler();
            }
            
        }
        if(e.target.classList.contains('fa-rectangle-xmark')) {
            const resp = await fetch(`/api/v1/posts/${id}`, {
                method:'DELETE',
                headers: {'Content-Type': 'application/json'},
            })
            const delResult = await resp.json();
            const box = e.target.closest('.post-box');
            const message = document.createElement('div');
            message.classList.add(`message-${resp.ok ? 'success' : 'fail'}`);
            message.textContent = delResult.message;
            box.append(message);
            setTimeout(() => message.classList.add('hidden'), 600);
            resp.ok ? 
            setTimeout(() => postsContainer.removeChild(box), 400) : -1;
                
  
        }
    })
    showModalBtn.addEventListener('click', async () => {
    
        if(status === 0) {
            modalHandler();
            return;
        }
        if(status === 1) {
            logoutHandler()
            status = 0;
            showModalBtn.textContent = 'log in';
        }
    });
    
    addPostBtn.addEventListener('click', async () => {
        
        const resp = await fetch('/api/v1/posts', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({content: postContent.value})
        })
        
        if(resp.ok) {
            const resp = await fetch('/api/v1/posts');
            const result = await resp.json();
            postsContainer.innerHTML = '';
            postContent.value = '';
            result.forEach(p => postsContainer.append(publicPosts(p)));
        }
        else {
            modalHandler();
        }
    })
    loginBtn.addEventListener('click', async (e) => {
        
        e.preventDefault();
        console.log(email.value, password.value)
        const resp = await fetch('/login', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email: email.value, password: password.value})
        });
        const result = await resp.json();
        if(resp.ok) {
            
            status = 1;
            showModalBtn.textContent = 'log out';
            modalHandler();
            
        }
        
        
    })
    closeModal.addEventListener('click', modalHandler);

}    

if(document.getElementById('profile')) {
    const params = new URL(document.location.href).searchParams;
    if(params.has('id') && params.has('name')) {
        const name = params.get('name');
        const id = params.get('id');
        document.title = `Reddit | ${name.toUpperCase()}`;
        const resp = await fetch(`/api/v1/posts/${id}/${name}`);
        const posts = await resp.json();
        posts.forEach(p => userPosts.append(profilePosts(p)));
        const loginResp = await fetch('/',{method: 'POST'});
        if(loginResp.ok) {
         status = 1;
         showModalBtn.textContent = 'logout';
            }
        showModalBtn.addEventListener('click', async () => {
            if(status === 0) {
                    modalHandler();
                }
            if(status === 1) {
             logoutHandler()
                status = 0;
                showModalBtn.textContent = 'log in';
                }
            });
            closeModal.addEventListener('click', modalHandler);
            
        }
    }

       
    })
