(function () {
    'use strict';

    const extensionName = 'canon-keeper';

    function init() {
        console.log('[Canon Keeper] init');

        if (document.getElementById('canon-keeper-button')) {
            console.log('[Canon Keeper] button already exists');
            return;
        }

        const button = document.createElement('div');

        button.id = 'canon-keeper-button';
        button.textContent = '📖 Canon Keeper';

        button.addEventListener('click', function (event) {
            event.preventDefault();
            event.stopPropagation();

            console.log('[Canon Keeper] CLICK');

            alert('Canon Keeper works!');
        });

        document.body.appendChild(button);

        console.log('[Canon Keeper] button created');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
