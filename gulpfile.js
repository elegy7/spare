var config = require('./package.json').js;
var config_css = require('./package.json').css;
var config_img = require('./package.json').img;
var gulp = require('gulp');
var cmd = require( 'gulp-seajs-package-diy' );
var concat = require("gulp-concat");
var less = require('gulp-less');
var coffee = require('gulp-coffee');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var logger = require('gulp-logger');
var uglify = require('gulp-uglify');
var cssmin = require('gulp-cssmin');
var imagemin = require('gulp-imagemin');
var watch = require('gulp-watch');

config.base = config.base.replace('./','')

var cmds = [],
    concats = []
config.source.forEach(function(one){
    cmds.push(config.base+'/'+one)
})

config.commons.forEach(function(one){
    concats.push(one)
})

//seajs打包--整体打包方案
gulp.task('transport', function(){
    return gulp.src(cmds, {base: config.base})
        .pipe( cmd({
            basePath: __dirname+'/'+config.base,
            ignore: config.ignore,
            only: true
        }))
        .pipe(concat(config.output))
        .pipe(gulp.dest(config.dest))
}) 

gulp.task('merge', function(){
    return gulp.src(concats)
    .pipe(concat('common.js'))
    .pipe(gulp.dest(config.dest))
})

gulp.task('min', function(){
    return gulp.src(config.dest+'/*.js')
        .pipe(uglify())
        .pipe(gulp.dest(config.dest))
})

gulp.task('fix', ['transport', 'merge'])

//seajs打包--入口文件打包方案
gulp.task('default',['merge'], function(){
    for(var key in config.apps){
        var one = config.apps[key]
        gulp.src(config.base+'/'+one, {base: config.base})
        .pipe( cmd({
            basePath: __dirname+'/'+config.base,
            ignore: config.ignore
        }))
        .pipe(concat(key+'.js'))
        .pipe(gulp.dest(config.dest))
    }
}) 

//less打包
gulp.task('less', function(){
    return gulp
        .src(config_css.base +'/**/*.less')
        .pipe(less())
        .pipe(autoprefixer(autoprefixer({
            browsers: ['last 2 versions', 'Safari', 'Explorer <= 9','Chrome','Firefox <= 12']
        })))
        .pipe(cssmin())
        .pipe(gulp.dest(config_css.dest));
}) 

//图片压缩
gulp.task('imagemin', function () {
    gulp.src(config_img.base +'/**/*.{jpg,png,gif}')
        .pipe(imagemin({
            optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
            interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
            multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
        }))
        .pipe(gulp.dest(config_img.dest));
});
gulp.task('watch', function() {
    watch(__dirname+'/{css,js,assets}/**/*.{less,coffee,js,jpg,gif,png}',{events:['add', 'change']}, function(event){
        if(/.less/.test(event.path)){
            return gulp
                .src(config_css.base +'/**/*.less')
                .pipe(plumber())
                .pipe(logger({
                    before: 'Starting less...',
                    after: 'less complete!',
                    extname: '.css',
                    showChange: true
                }))
                .pipe(less())
                .pipe(autoprefixer(autoprefixer({
                    browsers: ['last 2 versions', 'Safari', 'Explorer <= 9','Chrome','Firefox <= 12']
                })))
                .pipe(gulp.dest(config_css.dest));
        }        
        if(/.coffee/.test(event.path)){
            return gulp
                .src(event.path)
                .pipe(plumber())
                .pipe(logger({
                    before: 'Starting coffee...',
                    after: 'coffee complete!',
                    extname: '.js',
                    showChange: true
                }))
                .pipe(coffee())
                .pipe(gulp.dest(config.dest));
        }
        if(/.js/.test(event.path)){
            gulp.start('default')
        }
        if(/.jpg|.png|.gif/.test(event.path)){
            return gulp.src(event.path)
                .pipe(imagemin({
                    optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
                    progressive: true //类型：Boolean 默认：false 无损压缩jpg图片
                }))
                .pipe(gulp.dest(config_img.dest));
        }
    });
})
