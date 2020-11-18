// выпадающее меню для сортировки Price and Age

let priceSort = document.getElementById('priceSort');
let priceElemLink = priceSort.querySelector('.productList__title-priceLink');

priceElemLink.onclick = function() {
    priceSort.classList.toggle('open');
}

let ageSort = document.getElementById('ageSort');
let ageElemLink = ageSort.querySelector('.productList__title-ageLink');

ageElemLink.onclick = function() {
    ageSort.classList.toggle('open');
}


// сортировка товара по цене
// let sortBlocks = document.getElementById('sortBlocks');
// replacedNode = sortBlocks.replaceChild(sortBlocks.children[1], sortBlocks.children[0]); // вырезаем + запоминаем
// sortBlocks.appendChild(replacedNode); // перезаписываем то что запомнили

document.getElementById('increment').onclick = sort;
document.getElementById('decrease').onclick = sortDecr;

function sort() {
    let sortBlocks = document.getElementById('sortBlocks');
    for (let i = 0; i < sortBlocks.children.length; i++) {
        for (let k = i; k < sortBlocks.children.length; k++) {
            if (+sortBlocks.children[i].getAttribute('data-price') > +sortBlocks.children[k].getAttribute('data-price')) {
                replacedNode = sortBlocks.replaceChild(sortBlocks.children[k], sortBlocks.children[i]);
                insertAfter(replacedNode, sortBlocks.children[i]);
            }        
        }
    }
}

function sortDecr() {
    let sortBlocks = document.getElementById('sortBlocks');
    for (let i = 0; i < sortBlocks.children.length; i++) {
        for (let k = i; k < sortBlocks.children.length; k++) {
            if (+sortBlocks.children[i].getAttribute('data-price') < +sortBlocks.children[k].getAttribute('data-price')) {
                replacedNode = sortBlocks.replaceChild(sortBlocks.children[k], sortBlocks.children[i]);
                insertAfter(replacedNode, sortBlocks.children[i]);
            }        
        }
    }
}

function insertAfter(elem, refElem) {
    return refElem.parentNode.insertBefore(elem, refElem.nextSibling);
}

// задаем скролл наверх

let scrollUp = document.getElementById('scrollUp');
let logo = document.getElementById('logo');

scrollUp.onclick = function() {
    logo.scrollIntoView({block: "center", behavior: "smooth"});
}


// адаптив меню 

let adaptiveMenu = document.getElementById('adaptiveMenu');
let mainMenu = adaptiveMenu.querySelector('.header__topContent-blockNavigation-nav');

adaptiveMenu.onclick = function() {
    mainMenu.classList.toggle('open');
}