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
  // ПРойтись по всему json и составить мапу с каунтом
  // person -> 5
  const numberOfFriendsMap = new Map();

  json.forEach((user) => {
    user.friends.forEach((friendId) => {
      if (!numberOfFriendsMap.has(friendId)) {
        numberOfFriendsMap.set(friendId, 1);
      } else {
        const currentCount = numberOfFriendsMap.get(friendId);
        numberOfFriendsMap.set(friendId, currentCount + 1);
      }
    });
  }); // 36

  // Отсортировать по значениям, можно применить алгоритм
  const sortedByFriends = [...numberOfFriendsMap.entries()].sort((a, b) => {
    if (a[1] === b[1]) {
      const aUserName = json.find((user) => user.id === a[0]).name;
      const bUserName = json.find((user) => user.id === b[0]).name;
      return aUserName > bUserName ? 1 : -1;
    }

    return a[1] > b[1] ? -1 : 1;
  });

  const top3PopularUsers = sortedByFriends
    .slice(0, 3)
    .map((userInfo) => json.find((user) => user.id === userInfo[0]).name);

  return top3PopularUsers;
}
