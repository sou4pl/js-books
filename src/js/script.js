/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

{
  'use strict';

  const select = {
    templateOf: {
      book: '#template-book',
    },
    books: {
      list: '.books-list',
      image: '.book__image',
      filters: '.filters'
    },
  };

  const templates = {
    book: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML),
  };
    
  function render (){
    const booksContainer = document.querySelector(select.books.list);
    for (let book of dataSource.books){
      const generatedHTML = templates.book(book);
      const generatedDOM = utils.createDOMFromHTML(generatedHTML);
      booksContainer.appendChild(generatedDOM);
    }
  }

  const favoriteBooks = [];
  const booksList = document.querySelector(select.books.list);
  const filters = [];
  const filtersForm = document.querySelector(select.books.filters);

  function initActions(){
    booksList.addEventListener('dblclick', function(event){
      event.preventDefault();
      if(event.target.offsetParent.classList.contains('book__image')){
        const imageId = event.target.offsetParent.getAttribute('data-id');
        if (!favoriteBooks.includes(imageId)){
          event.target.offsetParent.classList.add("favorite");
          favoriteBooks.push(imageId);
        }else{
          event.target.offsetParent.classList.remove("favorite");
          favoriteBooks.splice(favoriteBooks.indexOf(imageId));
        }
      console.log(favoriteBooks);
      }
    });  

    filtersForm.addEventListener('click', function(event){
      if(event.target.type === 'checkbox' && event.target.name === 'filter' && event.target.tagName === 'INPUT'){
        if(event.target.checked){
          filters.push(event.target.value);
        }else{
          filters.splice(filters.indexOf(event.target.value));
        }
      }
      filterBooks();
  })
  }

  function filterBooks() {
    const books = dataSource.books;
    for (const book of books){
      let shouldBeHidden = false;
        for (filter of filters){
          if(!book.details[filter]){shouldBeHidden = true; break}
        }
        const id = book.id;
        const bookItem = document.querySelector('.book__image[data-id="'+id+'"]');
        if (shouldBeHidden == true){
          bookItem.classList.add('hidden');
        }else{
          bookItem.classList.remove('hidden');
        }
      }
    }

  render();
  initActions();
};