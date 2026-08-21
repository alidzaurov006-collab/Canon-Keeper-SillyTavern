(function () {
    'use strict';

    function init() {
        console.log('[Canon Keeper] INIT STARTED');

        if (document.getElementById('canon-keeper-button')) {
            return;
        }

        const button = document.createElement('div');

        button.id = 'canon-keeper-button';
        button.textContent = '📖 Canon Keeper';

        button.addEventListener('click', function () {
            alert('Canon Keeper работает!');
        });

        document.body.appendChild(button);

        console.log('[Canon Keeper] BUTTON CREATED');
    }

    // Запускаем стороннее расширение самостоятельно
    if (window.jQuery) {
        jQuery(init);
    } else {
        window.addEventListener('DOMContentLoaded', init);
    }
})();
