jQuery(function () {

    const STORAGE_KEY = 'canonKeeperRules';

    function loadRules() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        } catch (e) {
            console.error('[Canon Keeper] Ошибка загрузки правил:', e);
            return [];
        }
    }

    function saveRules(rules) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(rules));
    }

    function renderRules() {
        const rules = loadRules();
        const container = $('#canon-keeper-rules');

        if (!container.length) return;

        container.empty();

        rules.forEach(function (rule, index) {

            const card = $(`
                <div class="canon-rule-card">
                    <div class="canon-rule-text"></div>

                    <div class="canon-rule-actions">
                        <button type="button"
                                class="canon-edit-rule"
                                data-index="${index}">
                            ✏️ Изменить
                        </button>

                        <button type="button"
                                class="canon-delete-rule"
                                data-index="${index}">
                            🗑️ Удалить
                        </button>
                    </div>
                </div>
            `);

            card.find('.canon-rule-text').text(rule);
            container.append(card);
        });
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

    function openCanonKeeper() {

        if ($('#canon-keeper-modal').length) {
            $('#canon-keeper-modal').show();
            renderRules();
            return;
        }

        const modalHtml = `
            <div id="canon-keeper-modal"
                 style="
                    position: fixed;
                    inset: 0;
                    z-index: 999999;
                    background: rgba(0,0,0,0.75);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 20px;
                 ">

                <div style="
                    width: min(700px, 100%);
                    max-height: 90vh;
                    overflow-y: auto;
                    background: #171717;
                    color: #eeeeee;
                    border-radius: 18px;
                    padding: 28px;
                    box-sizing: border-box;
                ">

                    <div style="
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom: 10px;
                    ">

                        <div style="
                            font-size: 30px;
                            font-weight: bold;
                        ">
                            🛡️ Canon Keeper
                        </div>

                        <button type="button"
                                id="canon-keeper-close"
                                style="
                                    font-size: 25px;
                                    border: none;
                                    background: transparent;
                                    color: #ffffff;
                                ">
                            ✕
                        </button>

                    </div>

                    <div style="
                        text-align: center;
                        font-size: 20px;
                        margin-bottom: 25px;
                    ">
                        Хранитель канона
                    </div>

                    <hr>

                    <h2 style="text-align:center;">
                        📜 Канон
                    </h2>

                    <textarea
                        id="canon-keeper-input"
                        placeholder="Напиши правило канона..."
                        style="
                            width: 100%;
                            min-height: 150px;
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
                                padding: 16px;
                                font-size: 20px;
                                border-radius: 12px;
                                border: 2px solid #555;
                                background: #242424;
                                color: #eeeeee;
                            ">
                        ➕ Добавить правило
                    </button>

                    <div id="canon-keeper-rules"
                         style="margin-top: 20px;">
                    </div>

                    <button type="button"
                            id="canon-keeper-copy"
                            style="
                                width: 100%;
                                margin-top: 20px;
                                padding: 16px;
                                font-size: 20px;
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

        $('#canon-keeper-close').on('click', function () {
            $('#canon-keeper-modal').hide();
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
                console.error('[Canon Keeper] Ошибка копирования:', e);
                alert('Не удалось скопировать канон.');
            }
        });

        $(document).on('click', '.canon-delete-rule', function () {

            const index = Number($(this).data('index'));

            const rules = loadRules();

            if (index >= 0 && index < rules.length) {
                rules.splice(index, 1);
                saveRules(rules);
                renderRules();
            }
        });

        $(document).on('click', '.canon-edit-rule', function () {

            const index = Number($(this).data('index'));

            const rules = loadRules();

            if (index < 0 || index >= rules.length) {
                return;
            }

            const oldText = rules[index];

            const newText = prompt(
                'Изменить правило канона:',
                oldText
            );

            if (newText === null) {
                return;
            }

            const cleanText = newText.trim();

            if (!cleanText) {
                return;
            }

            rules[index] = cleanText;

            saveRules(rules);

            renderRules();
        });
    }

    /*
     * Кнопка Canon Keeper
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
     * Открытие Canon Keeper
     */

    $(document)
        .off('click.canonKeeper', '#canon-keeper-button')
        .on('click.canonKeeper', '#canon-keeper-button', function () {

            openCanonKeeper();

        });

    console.log('[Canon Keeper] loaded');

});
