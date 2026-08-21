jQuery(function () {

    // =========================
    // Canon Keeper — кнопка меню
    // =========================

    const buttonHtml = `
        <div id="canon-keeper-button"
             class="list-group-item flex-container flexGap5">
            <div class="fa-solid fa-shield extensionsMenuExtensionButton"></div>
            Canon Keeper
        </div>
    `;

    if ($('#canon-keeper-button').length === 0) {
        $('#extensionsMenu').prepend(buttonHtml);
    }


    // =========================
    // Безопасный вывод текста
    // =========================

    function escapeHtml(text) {
        return $('<div>').text(text).html();
    }


    // =========================
    // Отображение правил
    // =========================

    function renderRules() {

        const container = $('#canon-rules');

        if (!container.length) {
            return;
        }

        container.empty();

        const savedRules = JSON.parse(
            localStorage.getItem('canonKeeperRules') || '[]'
        );

        savedRules.forEach(function (rule, index) {

            container.append(`
                <div class="canon-rule"
                     data-rule-index="${index}"
                     style="
                        background:#222;
                        border:1px solid #444;
                        border-radius:10px;
                        padding:15px;
                        margin-top:10px;
                        font-size:18px;
                     ">

                    <div style="
                        margin-bottom:15px;
                        line-height:1.4;
                    ">
                        ${escapeHtml(rule)}
                    </div>

                    <div style="
                        display:flex;
                        gap:10px;
                    ">

                        <button
                            type="button"
                            class="canon-edit-rule"
                            data-index="${index}"
                            style="
                                flex:1;
                                padding:10px;
                                background:#333;
                                color:#eee;
                                border:1px solid #555;
                                border-radius:8px;
                                font-size:16px;
                            ">
                            ✏️ Изменить
                        </button>

                        <button
                            type="button"
                            class="canon-delete-rule"
                            data-index="${index}"
                            style="
                                flex:1;
                                padding:10px;
                                background:#333;
                                color:#eee;
                                border:1px solid #555;
                                border-radius:8px;
                                font-size:16px;
                            ">
                            🗑️ Удалить
                        </button>

                    </div>

                </div>
            `);

        });
    }


    // =========================
    // Открытие Canon Keeper
    // =========================

    $(document).off(
        'click.canonKeeperOpen',
        '#canon-keeper-button'
    );

    $(document).on(
        'click.canonKeeperOpen',
        '#canon-keeper-button',
        function () {

            const modalHtml = `
                <div id="canon-keeper-modal"
                     style="
                        position:fixed;
                        left:50%;
                        top:50%;
                        transform:translate(-50%,-50%);
                        width:90%;
                        max-width:760px;
                        max-height:90vh;
                        overflow-y:auto;
                        background:#171717;
                        color:#eee;
                        padding:32px;
                        border-radius:20px;
                        z-index:99999;
                        box-shadow:0 10px 40px rgba(0,0,0,.7);
                     ">

                    <button
                        id="canon-keeper-close"
                        type="button"
                        style="
                            position:absolute;
                            right:15px;
                            top:15px;
                            font-size:24px;
                            background:none;
                            border:0;
                            color:#fff;
                        ">
                        ×
                    </button>

                    <h1 style="text-align:center;">
                        🛡️ Canon Keeper
                    </h1>

                    <div style="
                        text-align:center;
                        font-size:22px;
                        margin-bottom:30px;
                    ">
                        Хранитель канона
                    </div>

                    <hr>

                    <h2 style="text-align:center;">
                        📜 Канон
                    </h2>

                    <textarea
                        id="canon-rule-input"
                        placeholder="Напиши правило канона..."
                        style="
                            width:100%;
                            min-height:180px;
                            box-sizing:border-box;
                            background:#0d0d0d;
                            color:#eee;
                            border:1px solid #555;
                            border-radius:10px;
                            padding:15px;
                            font-size:18px;
                            resize:vertical;
                        "></textarea>

                    <button
                        id="canon-add-rule"
                        type="button"
                        style="
                            width:100%;
                            margin-top:20px;
                            padding:14px;
                            background:#222;
                            color:#eee;
                            border:1px solid #555;
                            border-radius:10px;
                            font-size:20px;
                        ">
                        ➕ Добавить правило
                    </button>

                    <div
                        id="canon-rules"
                        style="margin-top:25px;">
                    </div>

                </div>
            `;

            $('#canon-keeper-modal').remove();

            $('body').append(modalHtml);

            renderRules();
        }
    );


    // =========================
    // Закрытие окна
    // =========================

    $(document).off(
        'click.canonKeeperClose',
        '#canon-keeper-close'
    );

    $(document).on(
        'click.canonKeeperClose',
        '#canon-keeper-close',
        function () {

            $('#canon-keeper-modal').remove();

        }
    );


    // =========================
    // Добавление правила
    // =========================

    $(document).off(
        'click.canonKeeperAdd',
        '#canon-add-rule'
    );

    $(document).on(
        'click.canonKeeperAdd',
        '#canon-add-rule',
        function (event) {

            event.preventDefault();
            event.stopPropagation();

            const input = $('#canon-rule-input');
            const rule = input.val().trim();

            if (!rule) {

                alert('Сначала напиши правило.');

                return;
            }

            const savedRules = JSON.parse(
                localStorage.getItem('canonKeeperRules') || '[]'
            );

            savedRules.push(rule);

            localStorage.setItem(
                'canonKeeperRules',
                JSON.stringify(savedRules)
            );

            input.val('');

            renderRules();

            console.log(
                '[Canon Keeper] rule added:',
                rule
            );
        }
    );


    // =========================
    // Изменение правила
    // =========================

    $(document).off(
        'click.canonKeeperEdit',
        '.canon-edit-rule'
    );

    $(document).on(
        'click.canonKeeperEdit',
        '.canon-edit-rule',
        function (event) {

            event.preventDefault();
            event.stopPropagation();

            const index = Number(
                $(this).data('index')
            );

            const savedRules = JSON.parse(
                localStorage.getItem('canonKeeperRules') || '[]'
            );

            if (
                index < 0 ||
                index >= savedRules.length
            ) {
                return;
            }

            const newRule = prompt(
                'Изменить правило:',
                savedRules[index]
            );

            if (newRule === null) {
                return;
            }

            const cleanedRule = newRule.trim();

            if (!cleanedRule) {

                alert('Правило не может быть пустым.');

                return;
            }

            savedRules[index] = cleanedRule;

            localStorage.setItem(
                'canonKeeperRules',
                JSON.stringify(savedRules)
            );

            renderRules();

            console.log(
                '[Canon Keeper] rule edited:',
                cleanedRule
            );
        }
    );


    // =========================
    // Удаление правила
    // =========================

    $(document).off(
        'click.canonKeeperDelete',
        '.canon-delete-rule'
    );

    $(document).on(
        'click.canonKeeperDelete',
        '.canon-delete-rule',
        function (event) {

            event.preventDefault();
            event.stopPropagation();

            const index = Number(
                $(this).data('index')
            );

            const savedRules = JSON.parse(
                localStorage.getItem('canonKeeperRules') || '[]'
            );

            if (
                index < 0 ||
                index >= savedRules.length
            ) {
                return;
            }

            const confirmed = confirm(
                'Удалить это правило?'
            );

            if (!confirmed) {
                return;
            }

            savedRules.splice(index, 1);

            localStorage.setItem(
                'canonKeeperRules',
                JSON.stringify(savedRules)
            );

            renderRules();

            console.log(
                '[Canon Keeper] rule deleted:',
                index
            );
        }
    );


    console.log('[Canon Keeper] loaded');

});
