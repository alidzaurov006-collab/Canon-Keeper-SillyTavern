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

        const content = `
            <div style="padding: 10px;">

                <h2 style="text-align: center;">
                    🛡️ Canon Keeper
                </h2>

                <p style="text-align: center;">
                    Хранитель канона
                </p>

                <hr>

                <h3>📜 Канон</h3>

                <textarea
                    id="canon-keeper-input"
                    placeholder="Напиши правило канона..."
                    style="
                        width: 100%;
                        min-height: 100px;
                        resize: vertical;
                        box-sizing: border-box;
                    "
                ></textarea>

                <button
                    id="canon-keeper-add"
                    class="menu_button"
                    style="margin-top: 10px; width: 100%;"
                >
                    ➕ Добавить правило
                </button>

                <div
                    id="canon-keeper-list"
                    style="margin-top: 15px;"
                >
                </div>

            </div>
        `;

        const popup = new Popup(
            content,
            POPUP_TYPE.DISPLAY,
            '',
            {
                wide: true,
            }
        );

        await popup.show();

        $('#canon-keeper-add').on('click', function () {

            const input = $('#canon-keeper-input');
            const text = input.val().trim();

            if (!text) {
                return;
            }

            $('#canon-keeper-list').append(`
                <div style="
                    padding: 10px;
                    margin-top: 8px;
                    border-radius: 8px;
                    background: rgba(255,255,255,0.05);
                ">
                    📌 ${text}
                </div>
            `);

            input.val('');
        });
    });

    console.log('[Canon Keeper] button added');

});
