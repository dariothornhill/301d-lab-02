

function Animal({image_url,title, description, keyword, horns }) {
  this.src = image_url;
  this.title = title;
  this.description = description;
  this.keyword = keyword;
  this.horns = horns;
}

function displayImages(data) {
  const template = $('#photo-template');
  data.forEach(item => {
    const element = $(`<div data-keyword='${item.keyword}'></div>`);
    element.html($(template.html()));
    $(element).find('h2').text(item.title);
    $(element).find('img').attr({ src: item.src, alt: item.description});
    $(element).find('p').text('Horns: ' + item.horns);
    $('main').append(element);
  });
}

function populateOptions(data) {
  const options = [...new Set(data.map(item => item.keyword))];
  const selectControl = $('#filterSelector');
  const optionElements = options.map(o => $(`<option value='${o}'>${o}</option>`));
  selectControl.append(optionElements);
  selectControl.on('change', (event) => {
    const keyword = event.currentTarget.value;
    $('main div').hide();
    $(`[data-keyword='${keyword}']`).show();
  });
}

$(function () {
  $.ajax('/data/page-1.json').then(data => {
    const animals = data.map(item => new Animal(item));
    displayImages(animals);
    populateOptions(animals);
  });
});
