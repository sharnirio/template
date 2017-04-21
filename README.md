#запуск и использование проекта

 0. сменить рабочую папку в переменной path.Project.pathProject для
файла smart-grid.scss настроить сетку под себя можно в самом конце
что бы бысто попасть используй поиск #smart
0.1. добавить свои файлы шрифтов фонтело в /fonts/fontello/ вместе со стилями и переименовать fontello-codes.css  в fontello-codes.scss
если что то не выходит проверить пути к шрифту в файле \src\style\libs\_fontello.scss
1. npm i
2. gulp smartgrid
3. gulp all
4. в дальнейшем запуск проекта возможен по команде - gulp
5. для деплоя создай файл с переменными pass.js вида
module.exports = {
     host: '91.236.118.160',
     login: 'login',
     password: 'password',
     globsPath: 'production/css/main.css', // какой  файл
     newerFolder: 'production/css/', // непрописывать папку
    path: '/public_html/wp-content/themes/svit-express/css/', //папка на продакшене
};
5.1. используй команду gulp prod и после gulp ftp
6. папка layout для макетов

---Task---
gulp - task to buld and watch  testing project ('build', 'webserver', 'watch')
gulp all - task to all build testing project ('clean', 'sprite', 'cleancache', 'build', 'watch', 'webserver')
gulp allProd - task to all production project ('cleanProd', 'spriteProd', 'cleancacheProd', 'buildProd', 'watchProd', 'webserverProd')

