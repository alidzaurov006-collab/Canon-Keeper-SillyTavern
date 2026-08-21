jQuery(function () {

    const STORAGE_KEY = 'canonKeeperRules';
    const ENABLED_KEY = 'canonKeeperEnabled';

    function loadRules() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        } catch (e) {
            console.error('[Canon Keeper] Load error:', e);
            return [];
        }
    }

    function saveRules(rules) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(rules));
    }

    function isEnabled() {
        return localStorage.getItem(ENABLED_KEY) !== 'false';
    }

    function setEnabled(value) {
        localStorage.setItem(ENABLED_KEY, value ? 'true' : 'false');
    }

    function getCanonText() {
        const rules = loadRules();

        if (!rules.length) {
            return '';
        }

        return rules
            .map(function (rule, index) {
                return (index + 1) + '. ' + rule;
            })
            .join('\n');
    }

    function renderRules() {

        const container = $('#canon-keeper-rules');

        if (!container.length) {
            return;
        }

        const rules = loadRules();

        container.empty();

        if (!rules.length) {
            container.append(`
                <div style="
                    padding: 18px;
                    text-align: center;
                    color: #999;
                    font-size: 17px;
                ">
                    Канон пока пуст
                </div>
            `);

            return;
        }

        rules.forEach(function (rule, index) {

            const card = $(`
                <div class="canon-rule-card"
                     style="
                        margin-top: 15px;
                        padding: 18px;
                        background: #242424;
                        border: 1px solid #444;
                        border-radius: 12px;
                     ">

                    <div class="canon-rule-text"
                         style="
                            font-size: 18px;
                            line-height: 1.4;
                            white-space: pre-wrap;
                         ">
                    </div>

                    <div style="
                        display: flex;
                        gap: 10px;
                        margin-top: 15px;
                    ">

                        <button type="button"
                                class="canon-edit-rule"
                                data-index="${index}"
                                style="
                                    flex: 1;
                                    padding: 12px;
                                    border-radius: 10px;
                                    border: 1px solid #555;
                                    background: #333;
                                    color: #eee;
                                    font-size: 16px;
                                ">
                            ✏️ Изменить
                        </button>

                        <button type="button"
                                class="canon-delete-rule"
                                data-index="${index}"
                                style="
                                    flex: 1;
                                    padding: 12px;
                                    border-radius: 10px;
                                    border: 1px solid #555;
                                    background: #333;
                                    color: #eee;
                                    font-size: 16px;
                                ">
                            🗑️ Удалить
                        </button>

                    </div>

                </div>
            `);

            card.find('.canon-rule-text').text(rule);

            container.append(card);
        });
    }

    function updateEnabledUI() {

        const enabled = isEnabled();

        const toggle = $('#canon-keeper-enabled');

        if (!toggle.length) {
            return;
        }

        toggle.prop('checked', enabled);

        $('#canon-keeper-status').text(
            enabled
                ? 'Канон активен'
                : 'Канон выключен'
        );
    }

    function openCanonKeeper() {

        if ($('#canon-keeper-modal').length) {

            $('#canon-keeper-modal').show();

            renderRules();
            updateEnabledUI();

            return;
        }

        const modalHtml = `

            <div id="canon-keeper-modal"
                 style="
                    position: fixed;

                    /*
                     * ВАЖНО:
                     * Окно начинается НИЖЕ верхней панели Tavern.
                     */
                    top: 185px;
                    left: 10px;
                    right: 10px;
                    bottom: 80px;

                    z-index: 99999;

                    background: rgba(0,0,0,0.72);

                    display: flex;
                    align-items: flex-start;
                    justify-content: center;

                    padding: 15px;

                    box-sizing: border-box;

                    overflow-y: auto;
                 ">

                <div style="
                    width: min(700px, 100%);
                    max-height: 100%;
                    overflow-y: auto;

                    background: #171717;
                    color: #eeeeee;

                    border-radius: 18px;

                    padding: 25px;

                    box-sizing: border-box;

                    box-shadow: 0 10px 40px rgba(0,0,0,0.6);
                ">

                    <div style="
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom: 8px;
                    ">

                        <div style="
                            font-size: 28px;
                            font-weight: bold;
                        ">
                            🛡️ Canon Keeper
                        </div>

                        <button type="button"
                                id="canon-keeper-close"
                                style="
                                    width: 45px;
                                    height: 45px;

                                    border: none;
                                    border-radius: 50%;

                                    background: #333;
                                    color: #fff;

                                    font-size: 24px;
                                ">
                            ✕
                        </button>

                    </div>

                    <div style="
                        text-align: center;
                        font-size: 19px;
                        color: #ccc;
                        margin-bottom: 20px;
                    ">
                        Хранитель канона
                    </div>

                    <hr>

                    <h2 style="
                        text-align: center;
                        margin-top: 22px;
                    ">
                        📜 Канон
                    </h2>

                    <div style="
                        display: flex;
                        align-items: center;
                        gap: 12px;

                        padding: 14px;

                        margin: 15px 0;

                        background: #222;
                        border-radius: 12px;
                    ">

                        <input
                            type="checkbox"
                            id="canon-keeper-enabled"
                            style="
                                width: 24px;
                                height: 24px;
                            "
                        >

                        <div>
                            <div id="canon-keeper-status"
                                 style="
                                    font-size: 18px;
                                    font-weight: bold;
                                 ">
                                Канон активен
                            </div>

                            <div style="
                                font-size: 14px;
                                color: #999;
                                margin-top: 4px;
                            ">
                                Правила готовы для использования
                            </div>
                        </div>

                    </div>

                    <textarea
                        id="canon-keeper-input"
                        placeholder="Напиши правило канона..."
                        style="
                            width: 100%;
                            min-height: 140px;

                            box-sizing: border-box;

                            background: #0d0d0d;
                            color: #eeeeee;

                            border: 2px solid #555;
                            border-radius: 12px;

                            padding: 15px;

                            font-size: 18px;

                            resize: vertical;
                        "
                    ></textarea>

                    <button type="button"
                            id="canon-keeper-add"
                            style="
                                width: 100%;

                                margin-top: 12px;

                                padding: 15px;

                                font-size: 20px;

                                border-radius: 12px;
                                border: 2px solid #555;

                                background: #242424;
                                color: #eeeeee;
                            ">
                        ➕ Добавить правило
                    </button>

                    <div id="canon-keeper-rules"
                         style="margin-top: 15px;">
                    </div>

                    <button type="button"
                            id="canon-keeper-copy"
                            style="
                                width: 100%;

                                margin-top: 20px;

                                padding: 15px;

                                font-size: 19px;

                                border-radius: 12px;
                                border: 2px solid #555;

                                background: #242424;
                                color: #eeeeee;
                            ">
                        📋 Скопировать весь канон
                    </button>

                </div>

            </div>
        `;

        $('body').append(modalHtml);

        renderRules();
        updateEnabledUI();

        $('#canon-keeper-close').on('click', function () {
            $('#canon-keeper-modal').hide();
        });

        $('#canon-keeper-enabled').on('change', function () {

            setEnabled($(this).is(':checked'));

            updateEnabledUI();

            console.log(
                '[Canon Keeper] Enabled:',
                isEnabled()
            );
        });

        $('#canon-keeper-add').on('click', function () {

            const input = $('#canon-keeper-input');

            const text = input.val().trim();

            if (!text) {
                return;
            }

            const rules = loadRules();

            rules.push(text);

            saveRules(rules);

            input.val('');

            renderRules();

            console.log(
                '[Canon Keeper] Rule added'
            );
        });

        $('#canon-keeper-copy').on('click', async function () {

            const canon = getCanonText();

            if (!canon) {
                alert('Канон пока пуст.');
                return;
            }

            try {

                await navigator.clipboard.writeText(canon);

                alert('Канон скопирован!');

            } catch (e) {

                console.error(
                    '[Canon Keeper] Copy error:',
                    e
                );

                alert(
                    'Не удалось скопировать канон.'
                );
            }
        });

        $(document)
            .off(
                'click.canonKeeperDelete',
                '.canon-delete-rule'
            )
            .on(
                'click.canonKeeperDelete',
                '.canon-delete-rule',
                function () {

                    const index = Number(
                        $(this).data('index')
                    );

                    const rules = loadRules();

                    if (
                        index >= 0 &&
                        index < rules.length
                    ) {

                        rules.splice(index, 1);

                        saveRules(rules);

                        renderRules();

                    }
                }
            );

        $(document)
            .off(
                'click.canonKeeperEdit',
                '.canon-edit-rule'
            )
            .on(
                'click.canonKeeperEdit',
                '.canon-edit-rule',
                function () {

                    const index = Number(
                        $(this).data('index')
                    );

                    const rules = loadRules();

                    if (
                        index < 0 ||
                        index >= rules.length
                    ) {
                        return;
                    }

                    const newText = prompt(
                        'Изменить правило канона:',
                        rules[index]
                    );

                    if (newText === null) {
                        return;
                    }

                    const cleanText =
                        newText.trim();

                    if (!cleanText) {
                        return;
                    }

                    rules[index] = cleanText;

                    saveRules(rules);

                    renderRules();
                }
            );
    }

    /*
     * Canon Keeper button
     */

    const buttonHtml = `
        <div id="canon-keeper-button"
             class="list-group-item flex-container flexGap5">

            <div class="fa-solid fa-book extensionsMenuExtensionButton"></div>

            Canon Keeper

        </div>
    `;

    if (!$('#canon-keeper-button').length) {
        $('#extensionsMenu').prepend(buttonHtml);
    }

    /*
     * Open Canon Keeper
     */

    $(document)
        .off(
            'click.canonKeeperOpen',
            '#canon-keeper-button'
        )
        .on(
            'click.canonKeeperOpen',
            '#canon-keeper-button',
            function () {

                openCanonKeeper();

            }
        );

    console.log(
        '[Canon Keeper] loaded'
    );

});
