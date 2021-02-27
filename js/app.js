

function Animal({image_url,title, description, keyword, horns }) {
  this.src = image_url;
  this.title = title;
  this.description = description;
  this.keyword = keyword;
  this.horns = horns;
}

$(function () {
  $.ajax('/data/page-1.json').then(data => {
    const animals = data.map(item => new Animal(item));
    const template = $('#photo-template');
    animals.forEach(animal => {
      const e = $(`<div></div>`);
      e.html($(template.html()));
      $(e).find('h2').text(animal.title);
      $(e).find('img').attr({ src: animal.src, alt: animal.description });
      $(e).find('p').text('Horns: ' + animal.horns);
      $('main').append(e);
    });
  });
});
