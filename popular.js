export function renderPopular(json) {
    const ulDetails = document.querySelector("#container .details-view ul");
    const popularNamesArr = popNames(json);
    
    popularNamesArr.forEach((name) => {
        let elem = document.createElement("li");
        elem.append(tmpl1.content.cloneNode(true));
        elem.querySelector("span").innerText = name;
    
        ulDetails.append(elem);
    });
}

function popNames(json) {
  let arrOfFriends = json.map((item) => item.friends).flat(Infinity); //массив id всех друзей
  let pairs = arrOfFriends.reduce(function (acc, el) {
    //пары: "ID: количество"
    acc[el] = (acc[el] || 0) + 1;
    return acc;
  }, {});

  let i = 0;
  let namedPairs = {}; //пары: "Имя: количество"
  for (let value in pairs) {
    namedPairs[json[i].name] = pairs[value];
    i++;
  }

  let resultPopName = Object.entries(namedPairs).sort(function (a, b) {
    //сортированые по имени пары: "Имя: количество"
    return a[0] > b[0] ? 1 : -1;
  });
  resultPopName = Object.fromEntries(resultPopName);

  resultPopName = Object.keys(resultPopName).sort(function (a, b) {
    //сортированые по количеству пары: "Имя: количество"
    return resultPopName[b] - resultPopName[a];
  });

  resultPopName = resultPopName.splice(0, 3);
  return resultPopName;
}
