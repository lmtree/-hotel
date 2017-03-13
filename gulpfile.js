const gulp = require('gulp');

//转less
const less = require('gulp-less');
const path = require('path');
gulp.task('less', function () {
    return gulp.src('./src/less/*.less') //src 找到要编译的文件  **表示所有文件夹的less
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        })) //转
        .pipe(gulp.dest('./src/css')) //转好后放xxxxx路径
        .pipe(browserSync.reload({
            stream: true
        }));
});

//开启browserSync服务
const browserSync = require('browser-sync');
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: "./src"
        }
    });
});
//给css自动添加css3浏览器前缀
const autoprefixer = require('gulp-autoprefixer');
gulp.task('autoprefixer', function () {
    gulp.src('./src/css/*.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0'],
            cascade: true,
            remove:true
        }))
        .pipe(gulp.dest('./src/css'));
});
//runSequence
const runSequence = require('run-sequence');
gulp.task('less_runsequence', function(callback) {
    runSequence('less', 'autoprefixer', callback);
});
//开发
gulp.task('dev',['browserSync'], function () {
    gulp.watch('./src/*.html', browserSync.reload); //只有开启服务后 才能自动刷新
    gulp.watch('./src/js/*.js', browserSync.reload);
    gulp.watch('./src/css/*.css', browserSync.reload);
    gulp.watch('./src/less/*.less',['less_runsequence']);
});
