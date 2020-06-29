const fruits = [
  {id: 1, title: 'Яблоки' , price: 20, img: 'https://esh-derevenskoe.ru/image/cache/catalog/product/3032/57b370-370x370.jpg?v=1' },
  {id: 2, title: 'Апельсины', price: 30, img: 'https://esh-derevenskoe.ru/image/cache/catalog/product/2737/c7d6ae-370x370.jpg?v=1' },
  {id: 3, title: 'Черешня', price: 40, img: 'https://esh-derevenskoe.ru/image/cache/catalog/product/3179/10ed5f-370x370.JPG?v=1'}
];

const toHTML = fruit => `
  <div class="col">
    <div class="card">
      <img class="card-img-top" src="${fruit.img}" style="height: 250px" alt="${fruit.title}">
      <div class="card-body">
        <h5 class="card-title">${fruit.title}</h5>
        <a href="#" class="btn btn-primary" data-btn="price" data-id="${fruit.id}">Посмотреть цену</a>
        <a href="#" class="btn btn-danger" data-btn="remove" data-id="${fruit.id}">Удалить</a>
      </div>
    </div>
  </div>
`;

function render() {
  const html = fruits.map(fruit => toHTML(fruit)).join('');
  document.querySelector('#fruits').innerHTML = html;
}

render();

const priceModal = $.modal({
  title:  'Стоимость',
  closable: true,
  width: '400px',
  footerButtons: [ 
    {text: 'Ok', type: 'primary', handler() {
      priceModal.close();
    }}
  ]
});

/* const confirmModal = $.modal({
  title:  'Вы уверены?',
  closable: true,
  width: '400px',
  footerButtons: [ 
    {text: 'Удалить', type: 'danger', handler() {
      confirmModal.close();
    }},
    {text: 'Отмена', type: 'secondary', handler() {
      confirmModal.close();
    }}
  ]
}); */

document.addEventListener('click', event => {
  event.preventDefault();
  const btnType = event.target.dataset.btn;
  const id = +event.target.dataset.id;
  const fruit = fruits.find(item => item.id === id);

  if (btnType === 'price') {
    priceModal.setContent(`
      <p>Цена на ${fruit.title}: <strong>${fruit.price}</strong> рублей за кг</p>
    `);
    priceModal.open();
  } else if (btnType === 'remove') {
    $.confirm({
      title: 'Вы уверены?',
      content: `<p>Удалить фрукт: <strong>${fruit.title}</strong></p>`
    }).then(() => {
      console.log('Remove');
    }).catch(() => {
      console.log('Cancel');
    });
    /* confirmModal.setContent(`
      <p>Удалить фрукт: <strong>${fruit.title}</strong></p>
    `);
    confirmModal.open(); */
  }
});









