Element.prototype.appendChildAfter = function(element) {
  element.parentNode.insertBefore(this, element.nextSibling);
}

function noop() {} 


function _createModalFooter(buttons = []) {
  if (buttons.length === 0) {
    return document.createElement('div');
  }

  const wrap = document.createElement('div');
  wrap.classList.add('modal-footer');

  buttons.forEach(btn => {
    const $btn = document.createElement('button');
    $btn.textContent = btn.text;
    $btn.classList.add('btn');
    $btn.classList.add(`btn-${btn.type || 'secondary'}`);
    $btn.onclick = btn.handler || noop;

    wrap.appendChild($btn);
  });

  return wrap;
}

function _createModal(options) {
  const DEFAULT_WIDTH = '600px';
  const modal = document.createElement('div');
  modal.classList.add('vmodal');
  modal.insertAdjacentHTML('afterbegin', `
    <div class="modal-overlay" data-close="true">
      <div class="modal-window">
        <div class="modal-header">
          <span class="modal-title">${options.title || 'Default Title'}</span>
          ${options.closable ? `<span class="modal-close" data-close="true">&times;</span>` : ''}
        </div>
        <div class="modal-body" data-content>
          ${options.content || ''}
        </div>
      </div>
    </div>
  `);

  const footer = _createModalFooter(options.footerButtons);
  footer.appendChildAfter(modal.querySelector('[data-content]'));
  document.body.appendChild(modal);

  const modalWindow = document.querySelector('.modal-window');
  modalWindow.style.setProperty('--modal-width', options.width || DEFAULT_WIDTH);

  return modal;
}

$.modal = function(options) {
  const ANIMATION_SPEED = 200;
  const $modal = _createModal(options);
  let closing = false;
  let destroyed = false;

  const modal = {
    open() {
      if (destroyed) {
        return console.log('Modal is destroyed');
      }

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
  };

  const listenerClose =  event => {
    if (event.target.dataset.close) {
      modal.close();
    }
  };

  $modal.addEventListener('click', listenerClose);

  return Object.assign(modal, {
    destroy() {
      if ($modal.parentNode) {
        $modal.parentNode.removeChild($modal);
        $modal.removeEventListener('click', listenerClose);
        destroyed = true;
      } else {
        console.log('Nothing to destroy');
      }
    },
    setContent(html) {
      $modal.querySelector('[data-content]').innerHTML = html;
    }
  }) ;

};