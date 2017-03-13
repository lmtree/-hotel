/**
 * Created by w on 2016/12/19.
 */
const gulp = require('gulp');
// //将sass转css
// gulp.task('aaa',function () {
//     console.log('你好');
// })
//转less
var less = require('gulp-less');
var path = require('path');
gulp.task('less', function () {//任务名随意
    return gulp.src('./src/less/*.less')//src找要编译的文件
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))//转
        .pipe(gulp.dest('./src/css'))
        .pipe(browserSync.reload({
            stream:true
        }));//转好后放路径
});
// gulp.task('less:watch', function () {
//     gulp.watch('./src/less/*.less', ['less']);//当./src/less/*.less'路径的文件变化后，自动执行less任务
// })
// 转scss
const sass = require('gulp-sass');
gulp.task('sass', function () {
    return gulp.src('./src/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./src/css'))
        .pipe(browserSync.reload({
            stream:true
        }));
});

// gulp.task('sass:watch', function () {
//     gulp.watch('./src/scss/*.scss', ['sass']);
// })

//浏览器自动刷新

const browserSync = require('browser-sync');
// / 打开browserSync服务
gulp.task('browserSync',function () { //browserSync没有意义，名字更专业
    browserSync.init({//browserSync前面const定义过了
        server:{
            baseDir:"./src"//src是开发文件
        }
    })
});

//给css自动添加css3浏览器前缀
const autoprefixer = require('gulp-autoprefixer');
gulp.task('autoprefixer', function () {
    gulp.src('./src/css/*.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0'],
            cascade: true, //是否美化属性值 默认：true 像这样：
            //-webkit-transform: rotate(45deg);
            //        transform: rotate(45deg);
            remove:true //是否去掉不必要的前缀 默认：true
        }))
        .pipe(gulp.dest('./src/css'));
});
//runsequence  一步一步执行任务
const runSequence = require('run-sequence');
gulp.task('sass_runSequence', function(callback) {
    runSequence('sass' , 'autoprefixer', callback);
});
// //删除文件夹
// const del = require('del');
// gulp.task('del', function (callback) {
//     del(['./src/css/*.css'], callback);
// })

//开发
gulp.task('dev',['browserSync'] ,function () {
    gulp.watch('./src/less/*.less', ['less'] );
    gulp.watch('./src/scss/*.scss', ['sass_runSequence']);
    gulp.watch('./src/*.html', browserSync.reload);//只有开启服务才能刷新
})
// all sass:watch sass 随意

