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
  
  class BooksList {
    constructor() {
      const thisBooksList = this;
      thisBooksList.getData();
      thisBooksList.render();
      thisBooksList.initActions();
    }

    getData() {
      const thisBooksList = this;
      thisBooksList.data = dataSource.books;
    }


    render (){
      const thisBooksList = this;
    const booksContainer = document.querySelector(select.books.list);
    for (let book of thisBooksList.data){
      const ratingBgc = thisBooksList.determineRatingBgc(book.rating);
      book.ratingBgc = ratingBgc;
      const ratingWidth = book.rating * 10;
      book.ratingWidth = ratingWidth;
      const generatedHTML = templates.book(book);
      const generatedDOM = utils.createDOMFromHTML(generatedHTML);
      booksContainer.appendChild(generatedDOM);
    }
  }



  initActions(){
    const thisBooksList = this;
    const favoriteBooks = [];
    const booksList = document.querySelector(select.books.list);
    thisBooksList.filters = [];
    const filtersForm = document.querySelector(select.books.filters);
    booksList.addEventListener('dblclick', function(event){
      event.preventDefault();
      if(event.target.offsetParent.classList.contains('book__image')){
        const imageId = event.target.offsetParent.getAttribute('data-id');
        if (!favoriteBooks.includes(imageId)){
          event.target.offsetParent.classList.add('favorite');
          favoriteBooks.push(imageId);
        }else{
          event.target.offsetParent.classList.remove('favorite');
          favoriteBooks.splice(favoriteBooks.indexOf(imageId));
        }
        console.log(favoriteBooks);
      }
    });  

    filtersForm.addEventListener('click', function(event){
      if(event.target.type === 'checkbox' && event.target.name === 'filter' && event.target.tagName === 'INPUT'){
        if(event.target.checked){
          thisBooksList.filters.push(event.target.value);
        }else{
          thisBooksList.filters.splice(thisBooksList.filters.indexOf(event.target.value));
        }
      }
      thisBooksList.filterBooks();
    });
  }

  filterBooks() {
    const thisBooksList = this;
    const books = thisBooksList.data;
    for (const book of books){
      let shouldBeHidden = false;
      for (const filter of thisBooksList.filters){
        if(!book.details[filter]){shouldBeHidden = true; break;}
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

  determineRatingBgc(rating){
    let ratingBgc = '';
    if (rating < 6){ratingBgc = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%);'}
    else if (rating > 6 && rating <= 8){ratingBgc = 'linear-gradient(to bottom, #b4df5a 0%, #b4df5b 100%);'}
    else if (rating > 8 && rating <= 9){ratingBgc = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%);'}
    else {ratingBgc = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%);'}
    return ratingBgc;
    }
  }
  new BooksList();
}