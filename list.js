import { onPersonClick } from './details.js';

export function renderList(json) {
  const ul = document.querySelector(".contacts-list");

  json.forEach(function (person) {
    let strong = document.createElement("strong");
    let li = document.createElement("li");

    li.onclick = () => onPersonClick(person, json);

    ul.appendChild(li);
    li.appendChild(strong).innerText = person.name;
  });
}
