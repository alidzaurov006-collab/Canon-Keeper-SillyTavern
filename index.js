jQuery(function () {

    const buttonHtml = `
        <div id="canon-keeper-button"
             class="list-group-item flex-container flexGap5">
            <div class="fa-solid fa-book extensionsMenuExtensionButton"></div>
            Canon Keeper
        </div>
    `;

    $('#extensionsMenu').prepend(buttonHtml);

    $('#canon-keeper-button').on('click', async function () {

        const { Popup, POPUP_TYPE } = SillyTavern.getContext();

        const popup = new Popup(
            `
            <div style="padding: 10px;">
                <h2>🛡️ Canon Keeper</h2>
                <p>Хранитель канона</p>
                <hr>
                <p>Первое настоящее окно Canon Keeper.</p>
            </div>
            `,
            POPUP_TYPE.DISPLAY
        );

        await popup.show();
    });

    console.log('[Canon Keeper] button added');

});
