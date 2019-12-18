var gulp = require('gulp'),
	rename = require('gulp-rename'),
	sass = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	sourcemaps = require('gulp-sourcemaps'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglifyjs'),
	cssnano = require('gulp-cssnano'),
	del = require('del'),
	imagemin = require('gulp-imagemin'),
	pug = require('gulp-pug'),
	browserSync = require('browser-sync').create();

// ПРЕОБРАЗОВАНИЕ SASS ФАЙЛОВ В CSS

function sassTask(done) {
	gulp.src('./app/sass/style.sass')
	.pipe(sourcemaps.init())
	.pipe(sass({
		errorLogToConsole: true,
		outputStyle: 'compressed'
	}))
	.on('error', console.error.bind(console))
	.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
	.pipe(rename({suffix:".min"}))
	.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest('./app/css/'))
	.pipe(browserSync.stream());

	done();
}

// ОБЪЕДИНЕНИЕ СКРИПТОВ В ОДИН ФАЙЛ

function scripts(done){
	gulp.src('./app/libs/**/*.js')
	.pipe(concat('libs.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('./app/js'));

	done();
}

// ОБЪЕДИНЕНИЕ СТИЛЕЙ В ОДИН ФАЙЛ

function styles(done){
	 gulp.src('./app/libs/**/*.css')
	.pipe(cssnano())
	.pipe(concat('libs.min.css'))
	.pipe(gulp.dest('./app/css'));

	done();
}

// ОПТИМИЗАЦИЯ ИЗОБРАЖЕНИЙ

function img(done){
	 gulp.src('./app/img/**.*')
    .pipe(imagemin())
    .pipe(gulp.dest('./app/img/'))

	done();
}

/* ------------ Pug compile ------------- */
function buildHTML(done){
	gulp.src('app/template/index.pug')
		.pipe(pug({
			pretty: true
		}))
		.on('error', console.error.bind(console))
		.pipe(gulp.dest('app'))
		.pipe(browserSync.stream());

	done();
}

// BROWSER SYNC

function browserWatch(done){
	browserSync.init({
		server: {
			baseDir: './app/'
		},
		port: 3000
	});

	done()
}

function browserReload(done) {
	browserSync.reload();

	done();
}

// ОЧИСТКА ПАПКИ DIST

function clean(done){
	del.sync('dist/**/*');

	done();
}

// ОТСЛЕЖИВАНИЕ ФАЙЛОВ

function track() {
	gulp.watch('app/template/**/*', buildHTML);
	gulp.watch("./app/sass/**/*", sassTask);
	gulp.watch("./app/**/*.html", browserReload);
	gulp.watch("./app/**/*.js", browserReload);
	gulp.watch("./app/**/*.php", browserReload);
}

// СБОРКА ПРОЕКТА

function build(done){
	var buildCss = gulp.src('./app/css/**/*.css')
	.pipe(gulp.dest('./dist/css/'));

	var buildFonts = gulp.src('./app/fonts/**/*')
	.pipe(gulp.dest('./dist/fonts/'));

	var buildJs = gulp.src('./app/js/**/*.js')
	.pipe(gulp.dest('./dist/js/'));

	var buildHtml = gulp.src('./app/*.html')
	.pipe(gulp.dest('./dist/'));

	var buildImg = gulp.src('./app/img/**/*')
	.pipe(gulp.dest('./dist/img/'));

	done();
}

gulp.task('default', gulp.parallel(browserWatch, track, scripts, styles));
gulp.task('project', gulp.series(clean, img, scripts, styles, build));
