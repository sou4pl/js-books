/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

{
    'use strict';

    const select = {
        templateOf: {
            book: '#template-book',
        },

        listOf: {
            booksList: '.books-list',
        }
    }

    const templates = {
        book: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML),
    }

    function render (){
        for (let book of dataSource.books){
            //console.log(book);
            const generatedHTML = templates.book(book);
            //console.log(generatedHTML);
            const generatedDOM = utils.createDOMFromHTML(generatedHTML);
            //console.log('dom', generatedDOM);
            const booksContainer = document.querySelector(select.listOf.booksList);
            //console.log('wrapper', booksContainer);
            booksContainer.appendChild(generatedDOM);
        }
    }

    render();
}