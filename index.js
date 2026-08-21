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

        const content = `
            <div style="padding: 20px; text-align: center;">
                <h2>🛡️ Canon Keeper</h2>
                <p>Хранитель канона</p>
                <hr>
                <p>Окно Canon Keeper успешно открыто.</p>
            </div>
        `;

        const popup = new Popup(
            content,
            POPUP_TYPE.DISPLAY
        );

        popup.show();
    });

    console.log('[Canon Keeper] button added');

});
