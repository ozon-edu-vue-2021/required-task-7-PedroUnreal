// Index.js - сюда импортим
// Общий список - список всех пользователей
// Details view 
//    - список друзей конкретного пользователя
//    - список НЕдрузей
//    - популярные (отдельный общий шаблон)  

import { getJson } from './getJson.js';
import { renderList } from './list.js';
import { renderPopular } from './popular.js';

window.onload = async function() {
    const json = await getJson();
    renderList(json);
    renderPopular(json);
}