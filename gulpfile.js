var gulp = require("gulp"),
    source = require("vinyl-source-stream"),
    gutil = require("gulp-util"),
    uglify = require("gulp-uglify"),
    buffer = require("vinyl-buffer");

gulp.task("watch", function () {
    var watchify = require("watchify"),
        browserify = require("browserify"),
        babelify = require("babelify");

    var getBundler = function () {
            return watchify(browserify("./src/js/app.js", {
                cache: {},
                packageCache: {},
                ignoreWatch: true,
                // fullPaths: true,
                debug: true,
                insertGlobals: true
            }).transform(babelify, {
                optional: ["es7.classProperties"]
            }));
        },
        bundler = getBundler();

    function rebundle() {
        var t = Date.now();

        return bundler
            .bundle()
            .pipe(source("bundle.js"))
            .pipe(gulp.dest("./dist/js"))
            .on("end", function () {
                gutil.log("Finished bundling after:", gutil.colors.magenta(Date.now() - t + " ms"));
            });
    }
    bundler.on("update", rebundle);

    return rebundle();
});

gulp.task("build", function () {
    var browserify = require("browserify"),
        babelify = require("babelify");

    return browserify("./src/js/app.js", {
        cache: {},
        packageCache: {},
        ignoreWatch: true,
        // fullPaths: true,
        insertGlobals: true
    }).transform(babelify, {
        optional: ["es7.classProperties"]
    }).bundle()
        .pipe(source("bundle.js"))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest("./dist/js"))
        .on("end", function () {
            gutil.log("Finished bundling");
        });
});
