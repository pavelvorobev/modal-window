'use strict';

const modal = $.modal();
const modalClose = document.querySelector('.modal-close');
const modalOverlay = document.querySelector('.modal-overlay');

modalClose.addEventListener('click', () => {
    modal.close();
});

modalOverlay.addEventListener('click', () => {
    modal.close();
});
