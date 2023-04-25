const modal = document.querySelector('.modal');
const backdrop = document.querySelector('.back-drop');

const publicPosts = ({id, name, title, content, created_at, votes, user_id}) => {
    const postBox = document.createElement('div');
    postBox.classList.add('post-box');
    postBox.id = id;
    const postCard = document.createElement('div');
    postCard.classList.add('post-card');
    const deletePostBtn = document.createElement('i');
    deletePostBtn.className = "fa-regular fa-rectangle-xmark";
    const votesbox = document.createElement('div');
    votesbox.classList.add('votes-box');
    const arrowUp = document.createElement('i');
    arrowUp.className = "fa-sharp fa-solid fa-arrow-up ";
    const arrowDown = document.createElement('i');
    arrowDown.className = "fa-sharp fa-solid fa-arrow-down ";
    const userAnchor = document.createElement('a');
    userAnchor.href = `profile.html?id=${user_id}&name=${name}`;
    userAnchor.setAttribute('data-ref', user_id)
    const votesEl = document.createElement('span');
    votesEl.classList.add('votes');
    votesEl.textContent = votes
    const user = document.createElement('h6');
    user.textContent = `created by ${name}`
    user.classList.add('user-name');
    user.id = user_id;
    userAnchor.append(user);
    const postTitle = document.createElement('h4');
    postTitle.textContent = title;
    const postContent = document.createElement('p');
    postContent.textContent = content;
    postContent.classList.add('post-content');
    const postDate = document.createElement('h5');
    postDate.textContent = created_at.slice(0, 10)
    postCard.append(userAnchor, postTitle, postContent, postDate,deletePostBtn);
    votesbox.append(arrowUp, votesEl, arrowDown);
    postBox .append(votesbox, postCard);

    return postBox;
  
  }

  const modalHandler = async function () {
  modal.classList.toggle('hidden');
  backdrop.classList.toggle('hidden');
  
};

const logoutHandler = async function() {
  const resp = await fetch('/logout');
  const result = await resp.json();
  
}
 
  export {publicPosts, modalHandler, logoutHandler};