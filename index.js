(function () {
    'use strict';

    const extensionName = 'canon-keeper';

    function init() {
        if (document.getElementById('canon-keeper-button')) {
            return;
        }

        const button = document.createElement('div');
        button.id = 'canon-keeper-button';
        button.textContent = '📖 Canon Keeper';

        button.addEventListener('click', () => {
            alert('Canon Keeper запущен!');
        });

        document.body.appendChild(button);

        console.log('[Canon Keeper] Extension loaded');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
