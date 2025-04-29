// ==UserScript==
// @name         POSCREDIT MOD
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Мод для POSCREDIT
// @author       wofiku
// @match        https://bank.b2pos.ru/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=b2pos.ru
// @grant        window.onurlchange
// ==/UserScript==

(function() {
    'use strict';

    // Новая шапка с менюшкой
	const bank_header = document.querySelector('.header');
	if (bank_header) {
	const mod_menu_blank_id = '<div class="main_field mod_menu_blank_id"><label class="main_field__label">Номер заявки</label><input type="text" class="main_field__input" id="mod_menu_blank_id" placeholder="00000000"></div>'
		const mod_menu_app_jump_to = `<li class="mod_menu_app_jump_to">${mod_menu_blank_id}<a class="jump-link" style="color:var(--color-main);" href="#">Провалиться (+РЦ+ЮЛ+ТТ)</a></li>`
		bank_header.insertAdjacentHTML('afterend', `<div class="header"><div class="header_wrapper"><ul id="menu">${mod_menu_app_jump_to}</ul></div></div>`);
		function mod_menu_blank_id_input(__event) {
			__event.preventDefault();
			const __blank_id = document.getElementById('mod_menu_blank_id').value;
			if (__blank_id) {
				window.location.href = `/search/profile${__blank_id}/`;
			} else {
				alert('[POSCREDIT MOD]\nНеобходимо указать номер заявки, в которую нужно перепрыгнуть');
			}
		}
		document.querySelector('.jump-link').addEventListener('click', mod_menu_blank_id_input)
	}

})();