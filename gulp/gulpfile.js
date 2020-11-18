let gulp = require('gulp'); // присвоили для переменной весь package.json
let sass = require('gulp-sass');
let browserSync  = require('browser-sync');
let uglify = require('gulp-uglify');
let concat = require('gulp-concat');
let rename = require('gulp-rename');
let del = require('del');
let autoprefixer = require('gulp-autoprefixer');


// пишем таск для очистки файлов, которые удаляем в процессе работы
gulp.task('clean', async function(){
    del.sync('dist');
});

gulp.task('scss', function(){ // задаем функцию для конвертации scss в sass
    return gulp.src('app/scss/**/*.scss') // .src- метод | **/* - заходит в папку проверит абсолютно все папки и возьмет из нех все файлы .scss
        .pipe(sass({outputStyle: 'compressed'})) // внутри sass() пишутся настройки, которые нужны на выходе конвертации (сжатие и д.р., 
        // expanded - красивый стиль, как мы верстаем обычно (не сжатый))
        .pipe(autoprefixer())
        .pipe(rename({suffix: '.min'})) // переименование на мин при сжатии
        .pipe(gulp.dest('app/css')) // dev - метод, в котором прописываем путь, куда будут идти готовые, сконвертированные, файлы
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('css', function(){
    return gulp.src([
        'node_modules/normalize.css/normalize.css',
        'node_modules/slick-carousel/slick/slick.css'
    ])
    .pipe(concat('_libs.scss'))
    .pipe(gulp.dest('app/scss'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('html', function(){
    return gulp.src('app/**/*.html')
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('script', function(){
    return gulp.src('app/js/*.js')
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('js', function(){
    return gulp.src([
        'node_modules/slick-carousel/slick/slick.js'
    ])
        .pipe(concat('libs.min.js')) // сделали объединение
        .pipe(uglify()) // сразу же сжали то что объединили
        .pipe(gulp.dest('app/js'))
        .pipe(browserSync.reload({stream: true}))
});

// browser sync - плагин, который позволяет поддерживать автообновление страницы, при написании кода. Устанавливаем
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "app/"
        }
    });
});

// пишем таск для dist
gulp.task('export', function(){
    let buildHtml = gulp.src('app/**/*.html')
        .pipe(gulp.dest('dist'));

    let buildCss = gulp.src('app/css/**/*.css')
        .pipe(gulp.dest('dist/css'));

    let buildJs = gulp.src('app/js/**/*.js')
        .pipe(gulp.dest('dist/js'));

    let buildFonts = gulp.src('app/fonts/**/*.*')
        .pipe(gulp.dest('dist/fonts'));

    let buildImg = gulp.src('app/img/**/*.*')
        .pipe(gulp.dest('dist/img'));
});

// пишем такс, который работает автоматом и сам конвертирует
gulp.task('watch', function(){
    gulp.watch('app/scss/**/*.scss', gulp.parallel('scss')),
    gulp.watch('app/*.html', gulp.parallel('html')),
    gulp.watch('app/js/*.js', gulp.parallel('script'))
});

gulp.task('build', gulp.series('clean', 'export'));

gulp.task('default', gulp.parallel('css', 'scss', 'js', 'browser-sync', 'watch'));

