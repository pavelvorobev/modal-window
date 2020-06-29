'use strict';

let options = {
  title: 'Modal title',
  content: `<p>Lorem ipsum dolor sit.</p>
            <p>Lorem ipsum dolor sit.</p>`,
  width: '600px',
  closable: true // нужно реализовать
};

let {title, content, width, closable} = options;



function _createModal(options) {
  
  const modal = document.createElement('div');
  modal.classList.add('vmodal');
  modal.insertAdjacentHTML('afterbegin', `
    <div class="modal-overlay">
      <div class="modal-window">
        <div class="modal-header">
          <span class="modal-title">${title}</span>
          <span class="modal-close">&times;</span>
        </div>
        <div class="modal-body">
          ${content}
        </div>
        <div class="modal-footer">
          <button>Ok</button>
          <button>Cancel</button>
        </div>
      </div>
    </div>
  `);
  document.body.appendChild(modal);
  const modalWindow = document.querySelector('.modal-window');

  
  modalWindow.style.setProperty('--modal-width', width);

  return modal;
}

$.modal = function(options) {
  const ANIMATION_SPEED = 200;
  const $modal = _createModal(options);
  let closing = false;

  return {
    open() {
      if (!closing) {
        $modal.classList.add('open');
      }
    },
    close() { 
      closing = true;
      $modal.classList.remove('open');
      $modal.classList.add('hide');
      setTimeout(() => {
        $modal.classList.remove('hide');
        closing = false; 
      }, ANIMATION_SPEED);
    },
    destroy() {}
  }; 

};