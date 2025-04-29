// ==UserScript==
// @name         POSCREDIT MOD
// @namespace    http://tampermonkey.net/
// @version      0.1.1
// @description  Мод для POSCREDIT
// @author       wofiku
// @match        https://*.b2pos.ru/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=b2pos.ru
// @grant        window.onurlchange
// ==/UserScript==

(function() {
    'use strict';

	// ОБЩИЕ НАСТРОЙКИ
	// На каком сайте сейчас
	const current_site = document.location.href.replace('https://', '').replace('http://', '').split('/')[0]

	// УБРАТЬ ЛОГАУТ
	//const logout_window = document.querySelector('.logoutWindow');
	//if (logout_window) {
	//	logout_window.remove()
	//}

	// ----
	// BANK
	// ----
	if (current_site == 'bank.b2pos.ru') {
		// КАСТОМНОЕ МЕНЮ
		// Поле ввода номера заявки
		const mod_menu_field_blank_id = `
			<div class="mod_menu_field_blank_id main_field mobile_radius">
				<label class="main_field__label">Провалиться в заявку</label>
				<input type="text" class="main_field__input" id="mod_menu_field_blank_id" placeholder="Введите номер">
			</div>`;

		// + кнопка "провалиться в заявку"
		const mod_menu_blank_jump_to = `
			<li class="mod_menu_blank_jump_to phoneBlock">${mod_menu_field_blank_id}
				<div class="blank-jump-link verify_mobile_button" href="#">
					<img src="/assets/images/loop.svg" alt="Провалиться (+РЦ+ЮЛ+ТТ)">
				</div>
			</li>`;

		// Находим шапку, к которой будем добавлять новую менюшку
		const bank_header = document.querySelector('.header');

		// event listener для кнопки "провалиться в заявку": проваливаемся в заявку по введенному номеру заявки
		function __mod_menu_field_blank_id_input(event) {
			event.preventDefault();
			const __input_blank_id = document.getElementById('mod_menu_field_blank_id').value;
			if (__input_blank_id) {
				window.location.href = `/search/profile${__input_blank_id}/`;
			} else {
				alert('[POSCREDIT MOD]\nНе указал номер заявки, в которую хочешь провалиться\nНе стыдно?');
			}
		}

		// MAIN: Кастомное меню
		if (bank_header) {
			bank_header.insertAdjacentHTML('afterend', `
				<div>
					<div class="header_wrapper">
						<ul id="menu mod_menu">
							${mod_menu_blank_jump_to}
						</ul>
					</div>
				</div>`);
			document.querySelector('.blank-jump-link').addEventListener('click', __mod_menu_field_blank_id_input)
			console.log("Кастомное меню загружено");
		}
    }

})();