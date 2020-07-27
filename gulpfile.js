const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');

gulp.task('sass', () => {
    return gulp.src([
            'node_modules/bootstrap/scss/bootstrap.scss',
            'src/scss/*.scss'
        ])
        .pipe(sass({ outputStyle: 'compressed' })) //Salida comprimida del scss a css
        .pipe(gulp.dest('src/css')) //En que carpeta se copiara el css de salida
        .pipe(browserSync.stream()); //Refrescar el navegador
});

gulp.task('js', () => {
    return gulp.src([
            'node_modules/bootstrap/dist/js/bootstrap.min.js',
            'node_modules/jquery/dist/jquery.min.js',
            'node_modules/popper.js/dist/umd/popper.min.js'
        ])
        .pipe(gulp.dest('src/js'))
        .pipe(browserSync.stream());
});

gulp.task('font-awesome', gulp.series(() => {
    return gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
        .pipe(gulp.dest('src/css'))
}));

gulp.task('fonts', gulp.series(() => {
    return gulp.src('node_modules/font-awesome/font/*')
        .pipe(gulp.dest('src/fonts'))
}));

gulp.task('serve', gulp.series(['sass'], () => {
    browserSync.init({
        server: { baseDir: './src' }
    });
}));

gulp.watch([
    'node_modules/bootstrap/scss/bootstrap.scss',
    'src/scss/*.scss'
], gulp.parallel(['sass']));

gulp.watch('src/*.html').on('change', browserSync.reload);

gulp.task('default', gulp.series(['font-awesome', 'fonts', 'js', 'serve']));