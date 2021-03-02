

function Animal({image_url,title, description, keyword, horns }) {
  this.src = image_url;
  this.title = title;
  this.description = description;
  this.keyword = keyword;
  this.horns = horns;
}

function clear() {
  $('main').empty();
}

function displayImages(data, cols = 4) {
  const template = $('#photo-template');
  let row = $('<div class="row"></div>');
  data.forEach((item, index) => {
    const element = $(`<div class="col-1-4 left card" data-keyword='${item.keyword}'></div>`);
    element.html($(template.html()));

    $(element).find('h2').text(item.title);
    $(element).find('img').attr({ src: item.src, alt: item.description});
    $(element).find('span').text('Horns: ' + item.horns);
    $(element).find('p').text(item.description);

    $(row).append(element);
    if (index % cols === cols - 1 || index === data.length-1) {
      $('main').append(row);
      row = $('<div class="row"></div>');
    }
  });
}

function populateOptions(data) {
  const options = [...new Set(data.map(item => item.keyword))];
  const optionElements = options.map(item => $(`<option value='${item}'>${item}</option>`));

  const selectControl = $('#filterSelector');
  selectControl.append(optionElements);
  selectControl.on('change', (event) => {
    const keyword = event.currentTarget.value;
    $('main div.row div').hide();
    $(`[data-keyword='${keyword}']`).show();
    const filtered = (keyword === 'default') ? data : data.filter(d => (d.keyword === keyword));
    clear();
    console.log(filtered);
    displayImages(filtered, 4);
  });
}

function sortByName(animals) {
  return animals.sort((a, b) => {
    if(a.title > b.title) {
      return 1;
    }

    if (a.title === b.title) {
      return 0;
    }

    if (a.title < b.title) {
      return -1;
    }
  });
}

function sortByHorns(animals) {
  return animals.sort((a, b) => {
    if(a.horns > b.horns) {
      return 1;
    }

    if (a.horns === b.horns) {
      return 0;
    }

    if (a.horns < b.horns) {
      return -1;
    }
  });
}


$(function () {
  const state = {};

  $.ajax('/data/page-1.json').then(data => {
    state.animals = data.map(item => new Animal(item));
    const sorted = sortByName(state.animals);
    console.log(sorted);
    displayImages(sorted, 4);
    populateOptions(sorted);
  });

  $('#btnNameSort').on('click', () => {
    const sorted = sortByName(state.animals);
    clear();
    displayImages(sorted, 4);
  });

  $('#btnHornSort').on('click', () => {
    const sorted = sortByHorns(state.animals);
    clear();
    displayImages(sorted, 4);
  });

});
