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
});                            ×
                        </button>

                    </div>

                    <div class="ck-status">

                        <div>
                            <span>ВСЕЛЕННАЯ</span>
                            <b>Не определена</b>
                        </div>

                        <div>
                            <span>СОСТОЯНИЕ</span>
                            <b class="ck-good">
                                🟢 Канон стабилен
                            </b>
                        </div>

                    </div>

                    <div class="ck-body">

                        <aside class="ck-sidebar">

                            <button class="active" type="button">
                                🏠 Обзор
                            </button>

                            <button type="button">
                                👥 Персонажи
                            </button>

                            <button type="button">
                                🌍 Мир
                            </button>

                            <button type="button">
                                ⏳ Временная линия
                            </button>

                            <button type="button">
                                🧠 Знания
                            </button>

                            <button type="button">
                                ⚠️ Нарушения
                            </button>

                            <button type="button">
                                📚 Канон
                            </button>

                            <button type="button">
                                🔀 Изменения
                            </button>

                        </aside>

                        <main class="ck-content">

                            <section class="ck-hero">

                                <div class="ck-hero-icon">
                                    🛡️
                                </div>

                                <div>
                                    <h1>
                                        Добро пожаловать в Canon Keeper
                                    </h1>

                                    <p>
                                        Здесь будет храниться отдельный канон
                                        и состояние этой ролевой.
                                    </p>
                                </div>

                            </section>

                            <div class="ck-grid">

                                <div class="ck-card">
                                    <h3>👥 Персонажи</h3>
                                    <strong>0</strong>
                                    <span>персонажей</span>
                                </div>

                                <div class="ck-card">
                                    <h3>🌍 Мир</h3>
                                    <strong>0</strong>
                                    <span>фактов мира</span>
                                </div>

                                <div class="ck-card">
                                    <h3>📜 События</h3>
                                    <strong>0</strong>
                                    <span>событий</span>
                                </div>

                                <div class="ck-card">
                                    <h3>⚠️ Нарушения</h3>
                                    <strong>0</strong>
                                    <span>обнаружено</span>
                                </div>

                            </div>

                        </main>

                    </div>

                </div>

            </div>
        `;

        $('body').append(panelHtml);

        $('#ck-close').on('click', function () {
            $('#canon-keeper-panel').remove();
        });
    }

    console.log('[Canon Keeper] button added');

});
