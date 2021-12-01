document.querySelector(".back").onclick = function () {
    document.querySelector("#container .details-view").style = "z-index: 0";
};

const START_FRIENDS_INDEX = 2; //чтобы подстроится под предложенную верстку с nth-child
const START_NOT_FRIENDS_INDEX = 6;

export function onPersonClick(person, json) {
  document.querySelector("#container .details-view").style = "z-index: 2";
  document.querySelector(".current-person").innerHTML = person.name;

  printFriends(person.friends, json);
  printNotFriends(person.friends, json);
}

function printFriends(arrOfFriends, json) {
  let friendIndex = START_FRIENDS_INDEX;
  arrOfFriends.forEach(function (id) {
    const name = json.filter((item) => item.id === id)[0].name;
    const li = document.querySelector(
      `#container .details-view li:nth-child(${friendIndex})`
    );
    li.querySelector("span").innerText = name;
    friendIndex++;
  });
}

function printNotFriends(friends, json) {
  const arrOfNotFriends = arrNotIncludes(friends, json);
  const top3NotFriends = arrOfNotFriends.slice(0, 3);

  let notFriendsIndex = START_NOT_FRIENDS_INDEX;
  top3NotFriends.forEach(function ({ id }) {
    const name = json.filter((item) => item.id === id)[0].name;
    const li = document.querySelector(
      `#container .details-view li:nth-child(${notFriendsIndex})`
    );
    li.querySelector("span").innerText = name;
    notFriendsIndex++;
  });
}

function arrNotIncludes(friends, json) {
  const friendsIds = [...friends];
  const notFriendsArr = [];

  let itemIndex = 0;

  while (friendsIds.length > 0) {
    const item = json[itemIndex];
    const foundIndex = friendsIds.indexOf(item.id);

    if (foundIndex === -1) {
        notFriendsArr.push(item);
    } else {
        friendsIds.splice(foundIndex, 1)
    }
    itemIndex++;
  }
  return notFriendsArr;
}
