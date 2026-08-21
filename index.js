jQuery(function () {

    // =========================================================
    // CANON KEEPER
    // =========================================================

    const buttonHtml = `
        <div id="canon-keeper-button"
             class="list-group-item flex-container flexGap5">
            <div class="fa-solid fa-book extensionsMenuExtensionButton"></div>
            Canon Keeper
        </div>
    `;

    // Не создаём кнопку повторно
    if ($('#canon-keeper-button').length === 0) {
        $('#extensionsMenu').prepend(buttonHtml);
    }


    // =========================================================
    // CSS
    // =========================================================

    if ($('#canon-keeper-style').length === 0) {

        $('head').append(`
            <style id="canon-keeper-style">

                /* Затемнение фона */
                #canon-keeper-overlay {
                    position: fixed;
                    inset: 0;
                    z-index: 99990;

                    background: rgba(0, 0, 0, 0.55);

                    display: flex;
                    justify-content: center;
                    align-items: flex-start;

                    /*
                     * Оставляем место для верхней панели Tavern.
                     */
                    padding-top: 175px;
                    padding-left: 12px;
                    padding-right: 12px;
                    padding-bottom: 20px;

                    box-sizing: border-box;
                }


                /* Само окно */
                #canon-keeper-modal {

                    position: relative;

                    width: min(680px, 100%);
                    max-width: 680px;

                    /*
                     * Окно никогда не будет выше экрана.
                     */
                    max-height: calc(100vh - 195px);

                    box-sizing: border-box;

                    background: #171717;
                    color: #eeeeee;

                    border: 1px solid #292929;
                    border-radius: 22px;

                    box-shadow:
                        0 15px 50px rgba(0,0,0,0.75);

                    overflow: hidden;

                    display: flex;
                    flex-direction: column;
                }


                /*
                 * Верхняя часть окна.
                 * Она НЕ прокручивается.
                 */
                #canon-keeper-header {

                    flex: 0 0 auto;

                    padding:
                        22px
                        22px
                        16px
                        22px;

                    text-align: center;

                    background: #171717;
                }


                #canon-keeper-header h2 {

                    margin: 0;

                    font-size: 34px;
                    line-height: 1.2;

                    color: #eeeeee;
                }


                #canon-keeper-header .canon-subtitle {

                    margin-top: 12px;

                    font-size: 22px;
                    line-height: 1.3;

                    color: #dddddd;
                }


                #canon-keeper-header hr {

                    margin-top: 18px;
                    margin-bottom: 0;

                    border: 0;
                    border-top: 1px solid #333333;
                }


                /*
                 * Крестик
                 */
                #canon-keeper-close {

                    position: absolute;

                    top: 12px;
                    right: 12px;

                    width: 42px;
                    height: 42px;

                    border: 0;
                    border-radius: 50%;

                    background: #eeeeee;
                    color: #222222;

                    font-size: 25px;
                    font-weight: bold;

                    display: flex;
                    align-items: center;
                    justify-content: center;

                    z-index: 10;

                    cursor: pointer;
                }


                /*
                 * Прокручиваемая часть.
                 *
                 * ВАЖНО:
                 * теперь прокручивается только содержимое окна,
                 * а верхняя панель и крестик остаются на месте.
                 */
                #canon-keeper-content {

                    flex: 1 1 auto;

                    min-height: 0;

                    overflow-y: auto;
                    overflow-x: hidden;

                    padding:
                        0
                        22px
                        25px
                        22px;

                    box-sizing: border-box;

                    -webkit-overflow-scrolling: touch;
                }


                /* Заголовок "Канон" */
                #canon-keeper-content .canon-section-title {

                    text-align: center;

                    font-size: 30px;
                    font-weight: bold;

                    margin:
                        8px
                        0
                        18px
                        0;
                }


                /*
                 * Поле ввода
                 */
                #canon-keeper-input {

                    width: 100%;
                    min-height: 150px;

                    box-sizing: border-box;

                    resize: vertical;

                    padding: 18px;

                    border-radius: 14px;
                    border: 2px solid #444444;

                    background: #0e0e0e;
                    color: #eeeeee;

                    font-size: 20px;
                    line-height: 1.45;

                    outline: none;
                }


                #canon-keeper-input:focus {

                    border-color: #777777;
                }


                #canon-keeper-input::placeholder {

                    color: #777777;
                }


                /*
                 * Кнопка "Добавить правило"
                 */
                #canon-keeper-add {

                    width: 100%;

                    margin-top: 16px;

                    min-height: 60px;

                    border-radius: 14px;
                    border: 2px solid #444444;

                    background: #242424;
                    color: #eeeeee;

                    font-size: 21px;
                    font-weight: bold;

                    cursor: pointer;
                }


                #canon-keeper-add:active {

                    transform: scale(0.98);
                }


                /*
                 * Карточка правила
                 */
                .canon-keeper-rule {

                    margin-top: 18px;

                    padding: 20px;

                    border-radius: 16px;

                    border: 2px solid #3c3c3c;

                    background: #202020;

                    box-sizing: border-box;
                }


                .canon-keeper-rule-text {

                    font-size: 21px;
                    line-height: 1.45;

                    color: #eeeeee;

                    white-space: pre-wrap;

                    word-break: break-word;
                }


                /*
                 * Кнопки правила
                 */
                .canon-keeper-rule-buttons {

                    display: flex;

                    gap: 12px;

                    margin-top: 16px;
                }


                .canon-keeper-rule-buttons button {

                    flex: 1;

                    min-height: 54px;

                    border-radius: 12px;

                    border: 1px solid #555555;

                    background: #303030;
                    color: #eeeeee;

                    font-size: 18px;

                    cursor: pointer;
                }


                .canon-keeper-rule-buttons button:active {

                    transform: scale(0.98);
                }


                /*
                 * Кнопка копирования всего канона
                 */
                #canon-keeper-copy {

                    width: 100%;

                    margin-top: 22px;

                    min-height: 58px;

                    border-radius: 14px;

                    border: 2px solid #444444;

                    background: #242424;
                    color: #eeeeee;

                    font-size: 20px;
                    font-weight: bold;

                    cursor: pointer;
                }


                /*
                 * На маленьких экранах
                 */
                @media (max-width: 600px) {

                    #canon-keeper-overlay {

                        padding-top: 175px;
                        padding-left: 8px;
                        padding-right: 8px;
                        padding-bottom: 12px;
                    }


                    #canon-keeper-modal {

                        width: 100%;

                        max-height: calc(100vh - 187px);

                        border-radius: 18px;
                    }


                    #canon-keeper-header {

                        padding:
                            18px
                            18px
                            14px
                            18px;
                    }


                    #canon-keeper-header h2 {

                        font-size: 30px;
                    }


                    #canon-keeper-header .canon-subtitle {

                        font-size: 20px;
                    }


                    #canon-keeper-content {

                        padding-left: 16px;
                        padding-right: 16px;
                        padding-bottom: 20px;
                    }


                    #canon-keeper-content .canon-section-title {

                        font-size: 27px;
                    }


                    #canon-keeper-input {

                        min-height: 140px;

                        font-size: 19px;
                    }


                    .canon-keeper-rule-text {

                        font-size: 19px;
                    }
                }

            </style>
        `);
    }


    // =========================================================
    // ОТКРЫТИЕ CANON KEEPER
    // =========================================================

    $('#canon-keeper-button')
        .off('click.canonKeeper')
        .on('click.canonKeeper', function () {

            openCanonKeeper();

        });


    // =========================================================
    // ОСНОВНАЯ ФУНКЦИЯ
    // =========================================================

    function openCanonKeeper() {

        // Если окно уже открыто — ничего не создаём второй раз
        if ($('#canon-keeper-overlay').length) {
            return;
        }


        // -----------------------------------------------------
        // Получаем сохранённые правила
        // -----------------------------------------------------

        let rules = [];

        try {

            rules = JSON.parse(
                localStorage.getItem('canonKeeperRules') || '[]'
            );

            if (!Array.isArray(rules)) {
                rules = [];
            }

        } catch (e) {

            console.error(
                '[Canon Keeper] Ошибка чтения правил:',
                e
            );

            rules = [];
        }


        // -----------------------------------------------------
        // Создаём окно
        // -----------------------------------------------------

        const overlay = $(`
            <div id="canon-keeper-overlay">

                <div id="canon-keeper-modal">

                    <button
                        id="canon-keeper-close"
                        type="button">
                        ×
                    </button>


                    <div id="canon-keeper-header">

                        <h2>🛡️ Canon Keeper</h2>

                        <div class="canon-subtitle">
                            Хранитель канона
                        </div>

                        <hr>

                    </div>


                    <div id="canon-keeper-content">

                        <div class="canon-section-title">
                            📜 Канон
                        </div>


                        <textarea
                            id="canon-keeper-input"
                            placeholder="Напиши правило канона..."
                        ></textarea>


                        <button
                            id="canon-keeper-add"
                            type="button">
                            ➕ Добавить правило
                        </button>


                        <div id="canon-keeper-rules"></div>


                        <button
                            id="canon-keeper-copy"
                            type="button">
                            📋 Скопировать весь канон
                        </button>

                    </div>

                </div>

            </div>
        `);


        $('body').append(overlay);


        // -----------------------------------------------------
        // Рендер правил
        // -----------------------------------------------------

        function renderRules() {

            const container = $('#canon-keeper-rules');

            container.empty();


            if (rules.length === 0) {
                return;
            }


            rules.forEach(function (rule, index) {

                const card = $(`
                    <div class="canon-keeper-rule">

                        <div class="canon-keeper-rule-text"></div>

                        <div class="canon-keeper-rule-buttons">

                            <button
                                type="button"
                                class="canon-keeper-edit">
                                ✏️ Изменить
                            </button>

                            <button
                                type="button"
                                class="canon-keeper-delete">
                                🗑️ Удалить
                            </button>

                        </div>

                    </div>
                `);


                card.find('.canon-keeper-rule-text')
                    .text(rule);


                // Изменить
                card.find('.canon-keeper-edit')
                    .on('click', function () {

                        const newRule = prompt(
                            'Измени правило канона:',
                            rule
                        );


                        if (
                            newRule !== null &&
                            newRule.trim() !== ''
                        ) {

                            rules[index] = newRule.trim();

                            saveRules();
                            renderRules();
                        }

                    });


                // Удалить
                card.find('.canon-keeper-delete')
                    .on('click', function () {

                        if (
                            confirm(
                                'Удалить это правило из канона?'
                            )
                        ) {

                            rules.splice(index, 1);

                            saveRules();
                            renderRules();
                        }

                    });


                container.append(card);

            });

        }


        // -----------------------------------------------------
        // Сохранение
        // -----------------------------------------------------

        function saveRules() {

            try {

                localStorage.setItem(
                    'canonKeeperRules',
                    JSON.stringify(rules)
                );

            } catch (e) {

                console.error(
                    '[Canon Keeper] Ошибка сохранения:',
                    e
                );

                alert(
                    'Не удалось сохранить канон.'
                );
            }
        }


        // -----------------------------------------------------
        // Добавить правило
        // -----------------------------------------------------

        $('#canon-keeper-add')
            .on('click', function () {

                const input =
                    $('#canon-keeper-input');

                const text =
                    input.val().trim();


                if (!text) {

                    alert(
                        'Сначала напиши правило канона.'
                    );

                    input.focus();

                    return;
                }


                rules.push(text);

                saveRules();

                input.val('');

                renderRules();

            });


        // -----------------------------------------------------
        // Копировать весь канон
        // -----------------------------------------------------

        $('#canon-keeper-copy')
            .on('click', async function () {

                if (rules.length === 0) {

                    alert(
                        'Канон пока пуст.'
                    );

                    return;
                }


                const canonText =
                    rules
                        .map(function (rule, index) {
                            return (
                                (index + 1) +
                                '. ' +
                                rule
                            );
                        })
                        .join('\n');


                try {

                    await navigator.clipboard.writeText(
                        canonText
                    );

                    alert(
                        'Канон скопирован!'
                    );

                } catch (e) {

                    // Запасной вариант
                    const textarea =
                        $('<textarea>')
                            .val(canonText)
                            .appendTo('body');

                    textarea[0].select();

                    document.execCommand('copy');

                    textarea.remove();

                    alert(
                        'Канон скопирован!'
                    );
                }

            });


        // -----------------------------------------------------
        // Закрытие
        // -----------------------------------------------------

        $('#canon-keeper-close')
            .on('click', function () {

                $('#canon-keeper-overlay')
                    .remove();

            });


        // Закрытие по нажатию вне окна
        $('#canon-keeper-overlay')
            .on('click', function (event) {

                if (
                    event.target ===
                    this
                ) {

                    $(this).remove();

                }

            });


        // -----------------------------------------------------
        // Первичный вывод
        // -----------------------------------------------------

        renderRules();


        console.log(
            '[Canon Keeper] окно открыто'
        );
    }


    console.log(
        '[Canon Keeper] готов'
    );

});     // =========================================================
    // ПЛАВАЮЩИЙ ВИДЖЕТ CANON KEEPER
    // =========================================================

    if ($('#canon-keeper-floating-widget').length === 0) {

        // -----------------------------------------------------
        // CSS виджета
        // -----------------------------------------------------

        if ($('#canon-keeper-floating-style').length === 0) {

            $('head').append(`
                <style id="canon-keeper-floating-style">

                    #canon-keeper-floating-widget {

                        position: fixed;

                        width: 58px;
                        height: 58px;

                        right: 18px;
                        bottom: 90px;

                        z-index: 999999;

                        display: flex;
                        align-items: center;
                        justify-content: center;

                        border-radius: 50%;

                        background: #242424;

                        border: 2px solid #555;

                        box-shadow:
                            0 5px 18px rgba(0,0,0,0.55);

                        color: #eeeeee;

                        font-size: 28px;

                        cursor: grab;

                        user-select: none;
                        -webkit-user-select: none;

                        touch-action: none;

                        transition:
                            transform 0.12s ease,
                            box-shadow 0.12s ease;
                    }


                    #canon-keeper-floating-widget:active {

                        cursor: grabbing;

                    }


                    #canon-keeper-floating-widget.canon-dragging {

                        cursor: grabbing;

                        transform: scale(1.08);

                        box-shadow:
                            0 8px 25px rgba(0,0,0,0.7);
                    }

                </style>
            `);
        }


        // -----------------------------------------------------
        // Создаём виджет
        // -----------------------------------------------------

        const floatingWidget = $(`
            <div
                id="canon-keeper-floating-widget"
                title="Canon Keeper">

                📖

            </div>
        `);


        $('body').append(floatingWidget);


        // -----------------------------------------------------
        // Восстанавливаем положение
        // -----------------------------------------------------

        try {

            const savedPosition =
                JSON.parse(
                    localStorage.getItem(
                        'canonKeeperWidgetPosition'
                    ) || 'null'
                );


            if (
                savedPosition &&
                typeof savedPosition.left === 'number' &&
                typeof savedPosition.top === 'number'
            ) {

                floatingWidget.css({
                    left: savedPosition.left + 'px',
                    top: savedPosition.top + 'px',
                    right: 'auto',
                    bottom: 'auto'
                });

            }

        } catch (error) {

            console.log(
                '[Canon Keeper] Не удалось восстановить положение виджета'
            );

        }


        // -----------------------------------------------------
        // Перемещение / тап
        // -----------------------------------------------------

        let pointerStartX = 0;
        let pointerStartY = 0;

        let widgetStartLeft = 0;
        let widgetStartTop = 0;

        let isDragging = false;

        let longPressTimer = null;

        let pointerDownTime = 0;


        floatingWidget.on(
            'pointerdown',
            function (event) {

                event.preventDefault();


                const rect =
                    this.getBoundingClientRect();


                pointerStartX =
                    event.clientX;

                pointerStartY =
                    event.clientY;


                widgetStartLeft =
                    rect.left;

                widgetStartTop =
                    rect.top;


                pointerDownTime =
                    Date.now();


                isDragging = false;


                /*
                 * Захватываем pointer,
                 * чтобы движение не потерялось.
                 */
                try {

                    this.setPointerCapture(
                        event.pointerId
                    );

                } catch (e) {}


                /*
                 * Если пользователь держит палец,
                 * включаем режим перемещения.
                 */
                longPressTimer =
                    setTimeout(function () {

                        isDragging = true;

                        floatingWidget.addClass(
                            'canon-dragging'
                        );

                    }, 400);

            }
        );


        floatingWidget.on(
            'pointermove',
            function (event) {

                if (
                    pointerStartX === 0 &&
                    pointerStartY === 0
                ) {
                    return;
                }


                const deltaX =
                    event.clientX -
                    pointerStartX;


                const deltaY =
                    event.clientY -
                    pointerStartY;


                /*
                 * Если палец заметно сдвинулся,
                 * считаем это перемещением,
                 * даже если 400 мс ещё не прошли.
                 */
                if (
                    Math.abs(deltaX) > 8 ||
                    Math.abs(deltaY) > 8
                ) {

                    isDragging = true;

                    clearTimeout(
                        longPressTimer
                    );

                    floatingWidget.addClass(
                        'canon-dragging'
                    );
                }


                if (!isDragging) {
                    return;
                }


                const widgetWidth =
                    floatingWidget.outerWidth();


                const widgetHeight =
                    floatingWidget.outerHeight();


                let newLeft =
                    widgetStartLeft +
                    deltaX;


                let newTop =
                    widgetStartTop +
                    deltaY;


                /*
                 * Не даём виджету уйти
                 * за края экрана.
                 */
                const maxLeft =
                    window.innerWidth -
                    widgetWidth;


                const maxTop =
                    window.innerHeight -
                    widgetHeight;


                newLeft =
                    Math.max(
                        0,
                        Math.min(
                            newLeft,
                            maxLeft
                        )
                    );


                newTop =
                    Math.max(
                        0,
                        Math.min(
                            newTop,
                            maxTop
                        )
                    );


                floatingWidget.css({

                    left: newLeft + 'px',
                    top: newTop + 'px',

                    right: 'auto',
                    bottom: 'auto'

                });

            }
        );


        floatingWidget.on(
            'pointerup pointercancel',
            function (event) {

                clearTimeout(
                    longPressTimer
                );


                const wasDragging =
                    isDragging;


                const pressDuration =
                    Date.now() -
                    pointerDownTime;


                /*
                 * Если перемещали — сохраняем позицию.
                 */
                if (wasDragging) {

                    const rect =
                        this.getBoundingClientRect();


                    try {

                        localStorage.setItem(
                            'canonKeeperWidgetPosition',
                            JSON.stringify({
                                left: rect.left,
                                top: rect.top
                            })
                        );

                    } catch (error) {

                        console.log(
                            '[Canon Keeper] Не удалось сохранить положение виджета'
                        );

                    }


                    floatingWidget.removeClass(
                        'canon-dragging'
                    );

                }


                /*
                 * Если это был обычный короткий тап,
                 * открываем Canon Keeper.
                 */
                if (
                    !wasDragging &&
                    pressDuration < 400
                ) {

                    openCanonKeeper();

                }


                pointerStartX = 0;
                pointerStartY = 0;

                isDragging = false;

            }
        );


        console.log(
            '[Canon Keeper] плавающий виджет создан'
        );
            }
