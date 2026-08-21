jQuery(function () {

    const buttonHtml = `
        <div id="canon-keeper-button"
             class="list-group-item flex-container flexGap5">
            <div class="fa-solid fa-book extensionsMenuExtensionButton"></div>
            Canon Keeper
        </div>
    `;

    $('#extensionsMenu').prepend(buttonHtml);

    $('#canon-keeper-button').on('click', function () {
        alert('Canon Keeper работает!');
    });

    console.log('[Canon Keeper] button added');
});
