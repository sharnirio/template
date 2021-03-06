'use strict';
// запуск и использование проекта
// #home
// 0. если необходима особая сетка, сменить рабочую папку в переменной path.Project.pathProject для файла smart-grid.scss!
// 0.1.настроить сетку под себя можно в самом конце!что бы бысто попасть используй поиск #smart
// 0.2. добавить свои файлы шрифтов фонтело в /fonts/fontello/ вместе со стилями и переименовать fontello-codes.css  в fontello-codes.scss
// если что то не выходит проверить пути к шрифту в файле \src\style\libs\_fontello.scss
// 1. npm i
// 2. если необходима сетка не по умолчанию обратись к пункту 0.1 и используй команду gulp smartgrid
// 3. gulp all
// 4. в дальнейшем запуск проекта возможен по команде - gulp
// 5. (если не используеш автоматизированое разворачивание)для деплоя создай файл с переменными pass.js вида
// module.exports = {
//     host: '91.236.118.160',
//     login: 'login',
//     password: 'password',
//     globsPath: 'production/css/main.css', // какой  файл
//     newerFolder: 'production/css/', // непрописывать папку
//     path: '/public_html/wp-content/themes/svit-express/css/', //папка на продакшене
// };
// 5.1. используй команду gulp prod и после gulp ftp
// 6. папка source для исходников(макеты, шрифты)
// 7. перед сдачей проекта проверить и отключить неиспользуемые плагины и библиотеки
// как js так и scss файлы смотреть папку libs
// --------------------------------Task------------------------------------------
// gulp - task to buld and watch  testing project ('build', 'webserver', 'watch')
// gulp all - task to all build testing project ('clean', 'sprite', 'cleancache', 'build', 'watch', 'webserver')
// gulp allProd - task to all production project ('cleanProd', 'spriteProd', 'cleancacheProd', 'buildProd', 'watchProd', 'webserverProd')
//
//

var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    notify = require("gulp-notify"),
    gcmq = require('gulp-group-css-media-queries'),
    cleanCSS = require('gulp-clean-css'),
    plumber = require('gulp-plumber'),
    rigger = require('gulp-rigger'),
    uglify = require('gulp-uglify'),
    del = require('del'),
    cache = require('gulp-cache'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    spritesmith = require('gulp.spritesmith'),
    watch = require('gulp-watch'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require("browser-sync"),
    smartgrid = require('smart-grid'),
    gulpRemoveHtml = require('gulp-remove-html'),
    ftp = require('vinyl-ftp'),
    reload = browserSync.reload;


// variables ways

var path = {
    Project: {
        pathProject: '/home-project/template/'
    },
    build: {
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/img/',
        fonts: 'build/fonts/'
    },
    production: {
        html: 'production/',
        js: 'production/js/',
        css: 'production/css/',
        img: 'production/img/',
        fonts: 'production/fonts/',
    },
    src: {
        html: ['src/**/*.html', '!src/module/**/*.*', '!src/moduleWork/**/*.*', '!src/template/**/*.html', '!src/img/svg/template/*.*', '!src/fonts/**/*.html'],
        htmlProd: ['src/**/*.html', '!src/module.html', '!src/moduleWork/**/*.*', '!src/module/**/*.*', '!src/template/**/*.html', '!src/img/svg/template/*.*', '!src/fonts/**/*.html'],
        js:  ['src/js/main.js'],
        jsMap:  ['src/js/google-map.js'],
        jsLibs: ['src/js/libs.js'],
        jsDev:  ['src/js/development.js'],
        style: 'src/style/main.scss',
        styleDev: 'src/style/development.scss',
        img: ['src/img/**/*.*','!src/img/sprite-icon/**/*.*', '!src/img/svg/template/*.*'],
        imgProd: ['src/img/**/*.*','!src/img/sprite-icon/**/*.*', '!src/img/svg/template/*.*', '!src/img/template/**/*.*'],
        spriteSass: 'src/style/component/',
        spriteOrigin: 'src/img/sprite-icon/*.+(JPG|jpg|jpeg|png)',
        spriteImgPath: 'src/img/',
        spriteimgName: '../img/sprite/sprite.png',
        fonts: 'src/fonts/**/*.+(eot|woff2|woff|ttf|svg)',
        // ------ to support the retina uncommented bottom line
        ////spriteretinaSrcFilter: 'src/img/sprite-icon/*@2x.png',
        ////spriteimgNameRet: '../img/sprite/sprite-2x.png',
    },
    watch: {
        html: 'src/**/*.html',
        js: ['src/js/component/**/*.js', 'src/moduleWork/**/*.js'],
        jsLibs: 'src/js/libs/**/*.js',
        style: ['src/style/**/*.+(scss|sass)', 'src/moduleWork/**/*.+(scss|sass)'],
        img: 'src/img/**/*.+(jpg|JPG|jpeg|png|svg|gif|ico)',
        fonts: 'src/fonts/**/*.+(eot|woff2|woff|ttf|svg)',
    },
    module: {
        src: {
            style: 'src/module/module.scss',
            js: 'src/module/module.js',
            html: ['src/module.html'],
        },
        build: {
            style: 'build/css/module/',
            js: 'build/js/module/',
            html: 'build/',
        },
        watch: {
            style: 'src/module/**/*.+(scss|sass)',
            js: 'src/module/**/*.js',
            html: ['src/module/**/*.html','src/module.html'],
        },
    },
    clean: './build',
    cleanProd: './production',

};

// task for deploy on production
// незабудь заменить данные для входа в файле pass.js
const pass = require('./pass.js');
gulp.task( 'ftp-task', function() {
    var conn = ftp.create( {
        host:     pass.host,
        user:     pass.login,
        password: pass.password,
        // port: 21,
        // parallel: 1,
        // maxConnections:1
    } );
    return gulp.src(pass.globsPath)
        .pipe( conn.newer(pass.newerFolder) ) // only upload newer files
        .pipe( conn.dest(pass.path) );

} );

// task for deploy on production wiht time out
gulp.task('ftp', ['css:buildProd'], function (cb) {
    setTimeout(function () {
        gulp.start('ftp-task')
        cb();
    }, 2000);
});

// variables for browserSync

var config = {
    server: {
        baseDir: "./build",
        index: "home.html",
        reloadDelay: 300,
    },
    tunnel: false,
    host: 'localhost',
    port: 666,
    logPrefix: "sharnirio"
};

// task webserver for browserSync

gulp.task('webserver', function() {
    browserSync(config);
});

// task for clean
//сменить папку для удаления

gulp.task('clean', function() {
 return del.sync(path.clean);
});

// task for clearcache

gulp.task('cleancache', function () {
    return cache.clearAll();
});

// bild css file

gulp.task('css:build', function() {
    gulp.src(path.src.style)
        .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 10 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({ stream: true }));
});

// bild css buildProd

gulp.task('css:buildDev', function() {
    gulp.src(path.src.styleDev)
        .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 10 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({ stream: true }));
});

// bild js file

gulp.task('js:build', function() {
    gulp.src(path.src.js)
        .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
        .pipe(sourcemaps.init())
        .pipe(rigger())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({ stream: true }));
});

gulp.task('jsMap:build', function() {
    gulp.src(path.src.jsMap)
        .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
        .pipe(rigger())
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({ stream: true }));
});

gulp.task('jsLibs:build', function() {
    gulp.src(path.src.jsLibs)
        .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
        .pipe(sourcemaps.init())
        .pipe(rigger())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({ stream: true }));
});

gulp.task('jsDev:build', function() {
    gulp.src(path.src.jsDev)
        .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
        .pipe(rigger())
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({ stream: true }));
});
// bild html file
// #todo подумать о возможности убирать коментарии при компиляции

gulp.task('html:build', function() {
    gulp.src(path.src.html)
        .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
        .pipe(rigger())
        .pipe(gulp.dest(path.build.html))
        .on('end', browserSync.reload);
});

// bild fonts file

gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
        .pipe(gulp.dest(path.build.fonts))
});

// image minimise

gulp.task('image:build', function() {
    gulp.src(path.src.img)
        .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
        .pipe(cache(imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            use: [pngquant()],
            interlaced: true
        })))
        .pipe(gulp.dest(path.build.img))
        .pipe(reload({ stream: true }));
});

//  bild sprite

gulp.task('sprite', function generateSpritesheets() {
    var spriteData = gulp.src(path.src.spriteOrigin)
        .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
        .pipe(spritesmith({
            // ------ to support the retina uncommented bottom line (add images twice larger and prefiks ...@2x.png)
          //retinaSrcFilter: [path.src.spriteretinaSrcFilter],
          //retinaImgName: path.src.spriteimgNameRet,
            imgName: path.src.spriteimgName,
            cssName: '_sprite.scss',
            algorithm: 'binary-tree',
            padding: 5,
        }));
    spriteData.img.pipe(gulp.dest(path.src.spriteImgPath));
    spriteData.css.pipe(gulp.dest(path.src.spriteSass));
});

//  bild to all code

gulp.task('build', [
    'html:build',
    'js:build',
    'css:build',
    'css:buildDev',
    'fonts:build',
    'image:build'
]);

// Notify Task

gulp.task('watch', function () {
    notify("Watcher is START!").write('');
    gulp.watch([path.watch.html], ['html:build']).on('change', function () {
        notify("HTML file was changed!").write('');
    });
    gulp.watch([path.watch.style], ['css:build', 'css:buildDev']).on('change', function () {
        notify("CSS file was changed!").write('');
    });
    gulp.watch([path.watch.js], ['js:build']).on('change', function () {
        notify("JS file was changed!").write('');
    });
    gulp.watch([path.watch.jsLibs], ['jsLibs:build', 'jsDev:build']).on('change', function () {
        notify("JS-LIBS file was changed!").write('');
    });
    gulp.watch([path.watch.fonts], ['fonts:build']).on('change', function () {
        notify("FONTS file was changed!").write('');
    });
    gulp.watch([path.watch.img], ['image:build']).on('change', function () {
        notify("IMG file was changed!").write('');
    });
});


// task to all build testing project

gulp.task('all', ['clean', 'sprite', 'smartgrid'], function () {
    gulp.start('cleancache', 'build', 'jsLibs:build','jsMap:build', 'jsDev:build', 'watch', 'mod', 'webserver');
});


// task to buld and watch  testing project

gulp.task('default', [ 'build', 'jsLibs:build', 'jsDev:build', 'watch', 'mod', 'webserver']);


//  task to config webserver for browserSync

var configProd = {
    server: {
        baseDir: "./production",
        index: "home.html",
        reloadDelay: 300,
    },
    tunnel: false,
    host: 'localhost',
    port: 999,
    logPrefix: "sharnirioProd"
};

// task webserver for browserSync

gulp.task('webserverProd', function() {
    browserSync(configProd);
});

// task for cleanProd

gulp.task('cleanProd', function() {
 return del.sync(path.cleanProd);
});

// bild css buildProd

gulp.task('css:buildProd', function() {
    gulp.src(path.src.style)
        .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 16 versions'],
            cascade: false
        }))
        .pipe(gcmq())
        .pipe(cleanCSS({debug: true}, function(details) {
            console.log(details.name + ': ' + details.stats.originalSize);
            console.log(details.name + ': ' + details.stats.minifiedSize);
        }))
        .pipe(gulp.dest(path.production.css))
        .pipe(reload({ stream: true }));
});


// bild js file

gulp.task('js:buildProd', function() {
    gulp.src(path.src.js)
        .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
        .pipe(rigger())
        .pipe(uglify())
        .pipe(gulp.dest(path.production.js))
        .pipe(reload({ stream: true }));
});
gulp.task('jsMap:buildProd', function() {
    gulp.src(path.src.jsMap)
        .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
        .pipe(rigger())
        .pipe(gulp.dest(path.production.js))
        .pipe(reload({ stream: true }));
});
gulp.task('jsLibs:buildProd', function() {
    gulp.src(path.src.jsLibs)
        .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
        .pipe(sourcemaps.init())
        .pipe(rigger())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.production.js))
        .pipe(reload({ stream: true }));
});
// bild html file

gulp.task('html:buildProd', function() {
    gulp.src(path.src.htmlProd)
        .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
        .pipe(rigger())
        .pipe(gulpRemoveHtml())
        .pipe(gulp.dest(path.production.html))
        .on('end', browserSync.reload);
});

// bild fonts file

gulp.task('fonts:buildProd', function() {
    gulp.src(path.src.fonts)
        .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
        .pipe(gulp.dest(path.production.fonts))
});

// image minimise
// to do настроить плагины а то неочень сжимает

gulp.task('image:buildProd', function() {
    gulp.src(path.src.imgProd)
        .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
        .pipe(cache(imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            use: [pngquant()],
            interlaced: true
        })))
        .pipe(gulp.dest(path.production.img))
        .pipe(reload({ stream: true }));
});

gulp.task('buildProd', [
    'html:buildProd',
    'js:buildProd',
    'css:buildProd',
    'fonts:buildProd',
    'image:buildProd'
]);

// task to all production project

gulp.task('prod', ['cleanProd', 'sprite'], function () {
    gulp.start('buildProd', 'jsMap:buildProd', 'jsLibs:buildProd', 'webserverProd');
});



// #smart
/* It's principal settings in smart grid project */
var settings = {
    outputStyle: 'scss', /* less || scss || sass || styl */
    columns: 12, /* number of grid columns */
    offset: "30px", /* gutter width px || % */
    container: {
        maxWidth: '1200px', /* max-width оn very large screen */
        fields: '15px' /* side fields */
    },
    breakPoints: {
        lg: {
            'width': '1100px', /* -> @media (max-width: 1100px) */
            'fields': '15px' /* side fields */
        },
        md: {
            'width': '960px',
            'fields': '15px'
        },
        sm: {
            'width': '768px',
            'fields': '15px'
        },
        xs: {
            'width': '480px',
            'fields': '15px'
        },
        c: {
            'width': '320px',
            'fields': '15px'
        }
        /*
        We can create any quantity of break points.

        some_name: {
            some_width: 'Npx',
            some_offset: 'N(px|%)'
        }
        */
    }
};


//task gulp smartgrid

gulp.task('smartgrid', function() {
smartgrid(path.Project.pathProject + 'src/style/libs', settings);
});

// #end

//----------------------#module block start

// module css file
gulp.task('css:Modbuild', function() {
    gulp.src(path.module.src.style)
        .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 10 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.module.build.style))
        .pipe(reload({ stream: true }));
});

// module js file

gulp.task('js:Modbuild', function() {
    gulp.src(path.module.src.js)
        .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
        .pipe(sourcemaps.init())
        .pipe(rigger())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.module.build.js))
        .pipe(reload({ stream: true }));
});

// module html file
gulp.task('html:Modbuild', function() {
    gulp.src(path.module.src.html)
        .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
        .pipe(rigger())
        .pipe(gulpRemoveHtml())
        .pipe(gulp.dest(path.module.build.html))
        .on('end', browserSync.reload);
});

gulp.task('Modbuild', [
    'html:Modbuild',
    'js:Modbuild',
    'css:Modbuild',
    // 'image:buildMod'
]);

gulp.task('Modwatch', function () {
    notify("Watcher is START!").write('');
    gulp.watch([path.module.watch.style], ['css:Modbuild']).on('change', function () {
        notify("CSS:Mod file was changed!").write('');
    });
    gulp.watch([path.module.watch.js], ['js:Modbuild']).on('change', function () {
        notify("JS:Mod file was changed!").write('');
    });
    gulp.watch([path.module.watch.html], ['html:Modbuild']).on('change', function () {
        notify("HTML:Mod file was changed!").write('');
    });

});

// task to all production project

gulp.task('mod',  function () {
    gulp.start('build', 'Modbuild', 'Modwatch'/*, 'webserver'*/);
});